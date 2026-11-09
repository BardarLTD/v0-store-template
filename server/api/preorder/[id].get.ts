/**
 * Confirm a preorder after checkout: read the PaymentIntent back from
 * Airwallex rather than trusting the redirect.
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id?.startsWith('int_')) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown preorder' })
  }

  const intent = await retrievePaymentIntent(event, id)
  const metadata = intent.metadata ?? {}
  return {
    // The ad pixels' content id: the painting bought, or "bespoke" (matching ViewContent and InitiateCheckout).
    itemId: metadata.artwork_id || (metadata.style && metadata.style !== 'Curated' ? 'bespoke' : ''),
    paid: intent.status === 'SUCCEEDED',
    status: intent.status,
    amount: intent.amount,
    currency: intent.currency,
  }
})
