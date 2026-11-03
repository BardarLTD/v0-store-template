import { store, priceFor, describeSelection, type Selection } from '#shared/store'
import { paintings, findPainting } from '#shared/catalogue'

/**
 * Start a preorder: create an Airwallex PaymentIntent for one of the product
 * and hand the browser what it needs to open Airwallex's hosted checkout.
 * The browser sends only the chosen options; the amount is looked up in the
 * catalogue in `shared/store.ts`, never taken from the request. The product
 * (with its image) rides on the intent so the checkout can show it.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Record<keyof Selection | 'painting' | 'brief', unknown>>>(event).catch(() => null)
  const selection = {
    size: body?.size,
    style: body?.style,
    frame: body?.frame,
  }
  const price = priceFor(selection)
  if (price === undefined) {
    throw createError({ statusCode: 400, message: 'That combination isn’t available. Please choose again.' })
  }

  let paintingSuffix = ''
  if (selection.style === 'Curated' && paintings.length > 0) {
    const painting = findPainting(body?.painting)
    if (!painting) {
      throw createError({ statusCode: 400, message: 'That painting isn’t available. Please choose again.' })
    }
    paintingSuffix = `: ${painting.title}`
  }

  // The buyer's description is free text: it is recorded on the order but
  // never feeds into the price, which comes from the catalogue above.
  let brief = ''
  if (selection.style === 'Bespoke') {
    brief = typeof body?.brief === 'string' ? body.brief.trim().slice(0, 500) : ''
    if (!brief) {
      throw createError({ statusCode: 400, message: 'Please describe your painting.' })
    }
  }

  const { company, product } = store
  const options = `${describeSelection(selection as Selection)}${paintingSuffix}`
  const intent = await createPaymentIntent(event, {
    name: `${product.name}, ${options}`,
    description: brief
      ? `${product.name}, ${options}. Description: ${brief}`
      : `${product.name}, ${options}. ${product.tagline}`,
    metadata: brief ? { description: brief } : undefined,
    price,
    currency: product.currency,
    imageUrl: checkoutImageUrl(event, product.image),
    url: absoluteUrl(event, '/'),
  })

  return {
    intentId: intent.id,
    clientSecret: intent.client_secret,
    currency: intent.currency,
    countryCode: product.countryCode,
    logoUrl: checkoutImageUrl(event, company.logo),
  }
})
