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
    legalName: string
    registration: string
    address: string
    phone: string
  }
  product: {
    name: string
    /** One sentence under the name. */
    tagline: string
    /** Hosted HTTPS URL (or path under `public/`). One image: the product, on its own. */
    image: string
    imageAlt: string
    /** Price of the default selection, from `catalogue`. In whole currency units. */
    price: number
    /** Three-letter ISO currency code your Airwallex account accepts. */
    currency: string
    /** Two-letter ISO code of the country you sell from. */
    countryCode: string
    /** When a preorder ships, said plainly. */
    shipping: string
  }
}

/** The choices a buyer makes on the product page, in the order shown. */
export const productOptions = {
  size: ['16x20 in', '18x24 in'],
  style: ['Curated', 'Bespoke'],
  frame: ['Unframed', 'Framed'],
} as const

export type OptionName = keyof typeof productOptions

export type Selection = { [K in OptionName]: (typeof productOptions)[K][number] }

export const optionLabels: Record<OptionName, string> = {
  size: 'Size',
  style: 'Style',
  frame: 'Frame',
}

export const defaultSelection: Selection = {
  size: '16x20 in',
  style: 'Curated',
  frame: 'Unframed',
}

/** Every combination on sale, in whole AUD. The only source of prices. */
export const catalogue: ReadonlyArray<Selection & { price: number }> = [
  { size: '16x20 in', style: 'Curated', frame: 'Unframed', price: 300 },
  { size: '16x20 in', style: 'Curated', frame: 'Framed', price: 500 },
  { size: '16x20 in', style: 'Bespoke', frame: 'Unframed', price: 375 },
  { size: '16x20 in', style: 'Bespoke', frame: 'Framed', price: 575 },
  { size: '18x24 in', style: 'Curated', frame: 'Unframed', price: 400 },
  { size: '18x24 in', style: 'Curated', frame: 'Framed', price: 600 },
  { size: '18x24 in', style: 'Bespoke', frame: 'Unframed', price: 475 },
  { size: '18x24 in', style: 'Bespoke', frame: 'Framed', price: 675 },
]

/** The catalogue price for a selection, or undefined if it isn't on sale. */
export function priceFor(selection: { size?: unknown, style?: unknown, frame?: unknown }): number | undefined {
  return catalogue.find(item =>
    item.size === selection.size
    && item.style === selection.style
    && item.frame === selection.frame,
  )?.price
}

/** e.g. "16x20 in, Curated, Unframed" */
export function describeSelection(selection: Selection): string {
  return `${selection.size}, ${selection.style}, ${selection.frame}`
}

export const store: Store = {
  company: {
    name: 'Cavalletto',
    logo: '',
    email: 'hello@cavalletto.com.au',
    legalName: 'Bardar Pty Ltd',
    registration: 'ABN 61 664 482 384',
    address: '163a Palmer Street, Darlinghurst NSW 2010',
    phone: '0481 263 226',
  },
  product: {
    name: 'Hand-painted oil painting',
    tagline: 'A home with depth.',
    image: 'https://res.cloudinary.com/sunrise-cache/image/upload/w_1568,c_limit,q_auto:good,f_auto/v1793598856/sunrise-chat/3c7d275b-4941-4cdd-8cf8-6937f9745a97/2c30f979-7e73-4b0e-b253-b6b3e2efd1c9.jpg',
    imageAlt: 'Hand-painted oil landscape of two trees above fields and hills',
    price: priceFor(defaultSelection)!,
    currency: 'AUD',
    countryCode: 'AU',
    shipping: 'Made to order. Preview photo within 1 to 2 weeks, then delivery in 1 to 2 weeks. Free delivery within Australia.',
  },
}

/** The product's price in the store's currency, e.g. "$4.00". */
export function formatPrice(amount: number = store.product.price): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: store.product.currency,
  }).format(amount)
}
