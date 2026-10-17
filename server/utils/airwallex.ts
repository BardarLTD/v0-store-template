import type { H3Event } from 'h3'

/**
 * A thin Airwallex client: log in with the account's client ID and API key,
 * then create and read PaymentIntents. Docs: https://www.airwallex.com/docs/api
 */

const HOSTS = {
  demo: 'https://api.sandbox.airwallex.com',
  prod: 'https://api.airwallex.com',
} as const

export interface PaymentIntent {
  id: string
  client_secret: string
  status: string
  amount: number
  currency: string
  merchant_order_id: string
}

interface Credentials {
  clientId: string
  apiKey: string
  host: string
}

// Access tokens last 30 minutes; reuse one until a minute before it expires.
let cachedToken: { value: string, expiresAt: number } | null = null

function credentials(event: H3Event): Credentials {
  const config = useRuntimeConfig(event)
  if (!config.airwallexClientId || !config.airwallexApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Payments are not set up',
      message: 'Preorders open once the store’s Airwallex keys are added.',
    })
  }
  const env = config.public.airwallexEnv === 'prod' ? 'prod' : 'demo'
  return { clientId: config.airwallexClientId, apiKey: config.airwallexApiKey, host: HOSTS[env] }
}

async function accessToken({ clientId, apiKey, host }: Credentials): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) return cachedToken.value

  const { token, expires_at } = await $fetch<{ token: string, expires_at: string }>(
    `${host}/api/v1/authentication/login`,
    { method: 'POST', headers: { 'x-client-id': clientId, 'x-api-key': apiKey } },
  )
  cachedToken = { value: token, expiresAt: Date.parse(expires_at) }
  return token
}

async function paymentIntentRequest(
  event: H3Event,
  path: string,
  body?: Record<string, unknown>,
): Promise<PaymentIntent> {
  const creds = credentials(event)
  try {
    const token = await accessToken(creds)
    return await $fetch<PaymentIntent>(`${creds.host}${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
  }
  catch (error) {
    // Airwallex explains a rejection in the response body ({ code, message }).
    console.error(`[airwallex] ${path} failed`, (error as { data?: unknown }).data ?? '', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Payment provider error',
      message: 'We couldn’t reach checkout. Please try again in a moment.',
    })
  }
}

export interface PreorderItem {
  name: string
  description: string
  price: number
  currency: string
  /** Absolute HTTPS URL: the checkout shows it as the item's thumbnail. */
  imageUrl: string
  /** Absolute URL of the product page. */
  url: string
}

/** A PaymentIntent for one of the item, with the item attached as the order. */
export function createPaymentIntent(event: H3Event, item: PreorderItem): Promise<PaymentIntent> {
  return paymentIntentRequest(event, '/api/v1/pa/payment_intents/create', {
    request_id: crypto.randomUUID(),
    merchant_order_id: `preorder-${crypto.randomUUID()}`,
    amount: item.price,
    currency: item.currency,
    descriptor: item.name.slice(0, 32),
    metadata: { type: 'preorder' },
    order: {
      products: [{
        code: 'preorder',
        name: item.name,
        desc: item.description,
        quantity: 1,
        unit_price: item.price,
        type: 'physical_good',
        image_url: item.imageUrl,
        url: item.url,
      }],
    },
  })
}

export function retrievePaymentIntent(event: H3Event, id: string): Promise<PaymentIntent> {
  return paymentIntentRequest(event, `/api/v1/pa/payment_intents/${encodeURIComponent(id)}`)
}
