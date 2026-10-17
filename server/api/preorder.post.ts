import { store } from '#shared/store'

/**
 * Start a preorder: create an Airwallex PaymentIntent for one of the product
 * and hand the browser what it needs to open Airwallex's hosted checkout.
 * The amount comes from `shared/store.ts`, never from the request. The
 * product (with its image) rides on the intent so the checkout can show it.
 */
export default defineEventHandler(async (event) => {
  const { company, product } = store
  const intent = await createPaymentIntent(event, {
    name: product.name,
    description: product.tagline,
    price: product.price,
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
