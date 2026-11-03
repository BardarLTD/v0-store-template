import { store, priceFor, describeSelection, findFrameStyle, type Selection } from '#shared/store'
import { paintings, findPainting } from '#shared/catalogue'

/**
 * Start a preorder: create an Airwallex PaymentIntent for one of the product
 * and hand the browser what it needs to open Airwallex's hosted checkout.
 * The browser sends only the chosen options; the amount is looked up in the
 * catalogue in `shared/store.ts`, never taken from the request. The product
 * (with its image) rides on the intent so the checkout can show it.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Record<keyof Selection | 'painting' | 'brief' | 'frameStyle', unknown>>>(event).catch(() => null)
  const selection = {
    size: body?.size,
    style: body?.style,
    frame: body?.frame,
  }
  const price = priceFor(selection)
  if (price === undefined) {
    throw createError({ statusCode: 400, message: 'That combination isn’t available. Please choose again.' })
  }

  // Each choice is recorded as its own field on the order so it can be read
  // straight off the payment in Airwallex.
  const orderDetails: Record<string, string> = {
    size: String(selection.size),
    style: String(selection.style),
    finish: String(selection.frame),
  }

  let paintingSuffix = ''
  if (selection.style === 'Curated' && paintings.length > 0) {
    const painting = findPainting(body?.painting)
    if (!painting) {
      throw createError({ statusCode: 400, message: 'That painting isn’t available. Please choose again.' })
    }
    paintingSuffix = `: ${painting.title}`
    orderDetails.artwork = painting.title
    orderDetails.artwork_id = painting.id
  }

  let frameSuffix = ''
  if (selection.frame === 'Framed') {
    const frameStyle = findFrameStyle(body?.frameStyle)
    if (!frameStyle) {
      throw createError({ statusCode: 400, message: 'That frame isn’t available. Please choose again.' })
    }
    frameSuffix = ` (${frameStyle.label} frame)`
    orderDetails.frame = frameStyle.label
    orderDetails.frame_id = frameStyle.id
  }

  // The buyer's optional note is free text: it is recorded on the order but
  // never feeds into the price. Full requirements arrive by email.
  let brief = ''
  if (selection.style === 'Bespoke') {
    brief = typeof body?.brief === 'string' ? body.brief.trim().slice(0, 500) : ''
  }

  const { company, product } = store
  const options = `${describeSelection(selection as Selection)}${frameSuffix}${paintingSuffix}`
  const intent = await createPaymentIntent(event, {
    name: `${product.name}, ${options}`,
    description: brief
      ? `${product.name}, ${options}. Description: ${brief}`
      : `${product.name}, ${options}. ${product.tagline}`,
    metadata: brief ? { ...orderDetails, description: brief } : orderDetails,
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
