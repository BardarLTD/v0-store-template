import type { Selection } from '#shared/store'
import type { TrackedItem } from './useTracking'

/**
 * Starts a preorder: asks the server for a PaymentIntent, then sends the buyer
 * to Airwallex's hosted checkout, which collects their card, name, email and
 * delivery address and returns them to /thank-you.
 */

interface Preorder {
  intentId: string
  clientSecret: string
  currency: string
  countryCode: string
  logoUrl: string
}

export interface CheckoutOrder {
  selection: Selection
  paintingId?: string
  frameStyleId?: string
  brief?: string
  /** Sent with InitiateCheckout in place of the generic product. */
  trackedItem?: TrackedItem
}

/** The site's accent as a hex colour, which is all Airwallex accepts. */
function accentColour(): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  return /^#[0-9a-f]{6}$/i.test(value) ? value : '#42A5F5'
}

export function useCheckout() {
  const { public: { airwallexEnv } } = useRuntimeConfig()
  const tracking = useTracking()

  const pending = ref(false)
  const error = ref('')

  async function start(order: CheckoutOrder) {
    if (pending.value) return
    pending.value = true
    error.value = ''
    tracking.beginCheckout(order.trackedItem)
    try {
      const preorder = await $fetch<Preorder>('/api/preorder', {
        method: 'POST',
        body: {
          size: order.selection.size,
          style: order.selection.style,
          frame: order.selection.frame,
          ...(order.frameStyleId ? { frameStyle: order.frameStyleId } : {}),
          ...(order.paintingId ? { painting: order.paintingId } : {}),
          ...(order.brief !== undefined ? { brief: order.brief } : {}),
        },
      })
      const { init } = await import('@airwallex/components-sdk')
      const { payments } = await init({
        env: airwallexEnv === 'prod' ? 'prod' : 'demo',
        enabledElements: ['payments'],
      })
      if (!payments) throw new Error('Airwallex payments element failed to load')
      const origin = window.location.origin
      payments.redirectToCheckout({
        intent_id: preorder.intentId,
        client_secret: preorder.clientSecret,
        currency: preorder.currency,
        country_code: preorder.countryCode,
        successUrl: `${origin}/thank-you?id=${preorder.intentId}`,
        logoUrl: preorder.logoUrl,
        requiredBillingContactFields: ['name', 'email', 'address'],
        // The checkout's buttons match the site's accent (app/assets/css/main.css).
        appearance: { variables: { colorBrand: accentColour() } },
      })
    }
    catch (err) {
      console.error('[preorder] checkout failed to open', err)
      const message = (err as { data?: { message?: string } }).data?.message
      error.value = message ?? 'Checkout didn’t open. Please try again.'
      pending.value = false
    }
  }

  return { pending, error, start }
}
