/**
 * The store: everything you change to make this page yours.
 *
 * The page, the checkout and the server all read from here, so the price a
 * buyer sees is the price Airwallex charges.
 *
 * Images: give `logo` and `image` as hosted HTTPS URLs. Airwallex's checkout
 * shows both (the logo at the top, the image beside the product in the order
 * summary), and it can only load images from the public internet. A path
 * under `public/` works too, but only shows on the checkout once the site is
 * deployed on HTTPS.
 */
export interface Store {
  company: {
    name: string
    /** Hosted HTTPS URL (or path under `public/`). Small in the header; top of the checkout. */
    logo: string
    /** Where buyers write to about their preorder. */
    email: string
  }
  product: {
    name: string
    /** One sentence under the name. */
    tagline: string
    /** Hosted HTTPS URL (or path under `public/`). One image: the product, on its own. */
    image: string
    imageAlt: string
    /** In whole currency units, e.g. 4 = $4.00 and 24.5 = $24.50. */
    price: number
    /** Three-letter ISO currency code your Airwallex account accepts. */
    currency: string
    /** Two-letter ISO code of the country you sell from. */
    countryCode: string
    /** When a preorder ships, said plainly. */
    shipping: string
  }
}

export const store: Store = {
  company: {
    name: 'Peel & Co.',
    logo: '/logo.svg',
    email: 'hello@example.com',
  },
  product: {
    name: 'The Banana',
    tagline: 'Picked ripe and posted the day it’s ready.',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=1200&q=80&fm=jpg',
    imageAlt: 'A single ripe yellow banana on a white background',
    price: 4,
    currency: 'USD',
    countryCode: 'US',
    shipping: 'Ships in 6–8 weeks',
  },
}

/** The product's price in the store's currency, e.g. "$4.00". */
export function formatPrice(amount: number = store.product.price): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: store.product.currency,
  }).format(amount)
}
