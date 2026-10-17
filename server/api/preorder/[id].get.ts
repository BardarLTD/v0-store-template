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
  return {
    paid: intent.status === 'SUCCEEDED',
    status: intent.status,
    amount: intent.amount,
    currency: intent.currency,
  }
})
