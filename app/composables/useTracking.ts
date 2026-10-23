import { store } from '#shared/store'

/**
 * The store's three ad events, sent to whichever pixels are set up
 * (`app/plugins/tracking.ts`). Each is the platform's standard event, so Meta
 * and Google recognise it without custom conversions:
 *
 * | Moment                      | Meta             | Google                      |
 * | --------------------------- | ---------------- | --------------------------- |
 * | The product page is seen    | ViewContent      | view_item                   |
 * | Preorder is pressed         | InitiateCheckout | begin_checkout              |
 * | The payment is confirmed    | Purchase         | purchase (+ Ads conversion) |
 *
 * Purchase fires on /thank-you only after the server has confirmed the
 * payment with Airwallex, with the amount Airwallex charged, once per order.
 * Optimise Meta and Google Ads campaigns for it.
 */

type Fbq = (...args: unknown[]) => void
type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
    gtag?: Gtag
  }
}

/** One id for the product in both platforms' reports, e.g. "the-banana". */
const PRODUCT_ID = store.product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product'

function send(meta?: (fbq: Fbq) => void, google?: (gtag: Gtag) => void) {
  if (import.meta.server) return
  try {
    if (window.fbq && meta) meta(window.fbq)
    if (window.gtag && google) google(window.gtag)
  }
  catch (error) {
    // Tracking must never get in the way of a sale.
    console.warn('[tracking] event not sent', error)
  }
}

function product(value: number, currency: string) {
  return {
    meta: { content_ids: [PRODUCT_ID], content_name: store.product.name, content_type: 'product', value, currency },
    google: { currency, value, items: [{ item_id: PRODUCT_ID, item_name: store.product.name, price: value, quantity: 1 }] },
  }
}

export function useTracking() {
  const { googleAdsConversion } = trackingIds()

  return {
    viewProduct() {
      const { meta, google } = product(store.product.price, store.product.currency)
      send(fbq => fbq('track', 'ViewContent', meta), gtag => gtag('event', 'view_item', google))
    },

    beginCheckout() {
      const { meta, google } = product(store.product.price, store.product.currency)
      send(
        fbq => fbq('track', 'InitiateCheckout', { ...meta, num_items: 1 }),
        gtag => gtag('event', 'begin_checkout', google),
      )
    },

    /** `id` is the Airwallex PaymentIntent: the order's id in every report. */
    purchase(order: { id: string, amount: number, currency: string }) {
      // A reload of /thank-you must not count the sale twice.
      const key = `tracked-purchase:${order.id}`
      try {
        if (localStorage.getItem(key)) return
        localStorage.setItem(key, '1')
      }
      catch { /* Storage blocked: send anyway; the ids below dedupe it. */ }

      const { meta, google } = product(order.amount, order.currency)
      send(
        // eventID lets Meta dedupe against a server-side (Conversions API) Purchase with the same id.
        fbq => fbq('track', 'Purchase', { ...meta, num_items: 1 }, { eventID: order.id }),
        (gtag) => {
          gtag('event', 'purchase', { ...google, transaction_id: order.id })
          if (googleAdsConversion) {
            gtag('event', 'conversion', {
              send_to: googleAdsConversion,
              value: order.amount,
              currency: order.currency,
              transaction_id: order.id,
            })
          }
        },
      )
    },
  }
}
