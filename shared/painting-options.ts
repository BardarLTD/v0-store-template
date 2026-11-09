import { catalogue, priceFor, store, type Selection } from './store'

/**
 * The choices on a painting page, mapped onto the catalogue in `store.ts`, which
 * stays the only source of prices. `key` is what appears in the URL
 * (?size=medium&finish=framed).
 */
export const sizeOptions = [
  { key: 'medium', value: '16x20 in', label: 'Medium', detail: '50 × 40 cm · 20 × 16 in' },
  { key: 'large', value: '18x24 in', label: 'Large', detail: '60 × 45 cm · 24 × 18 in' },
] as const

export const finishOptions = [
  { key: 'rolled', value: 'Unframed', label: 'Rolled', detail: 'Posted in a tube, for your framer' },
  { key: 'framed', value: 'Framed', label: 'Framed', detail: 'Stretched and framed, ready to hang' },
] as const

export type SizeKey = (typeof sizeOptions)[number]['key']
export type FinishKey = (typeof finishOptions)[number]['key']

export function parseSize(value: unknown): SizeKey {
  return sizeOptions.find(option => option.key === value)?.key ?? 'medium'
}

export function parseFinish(value: unknown): FinishKey {
  return finishOptions.find(option => option.key === value)?.key ?? 'rolled'
}

export function curatedSelection(size: SizeKey, finish: FinishKey): Selection {
  return {
    size: sizeOptions.find(option => option.key === size)!.value,
    style: 'Curated',
    frame: finishOptions.find(option => option.key === finish)!.value,
  }
}

export function curatedPrice(size: SizeKey, finish: FinishKey): number {
  return priceFor(curatedSelection(size, finish)) ?? store.product.price
}

export function bespokeSelection(size: SizeKey, finish: FinishKey): Selection {
  return { ...curatedSelection(size, finish), style: 'Bespoke' }
}

export function bespokePrice(size: SizeKey, finish: FinishKey): number {
  return priceFor(bespokeSelection(size, finish)) ?? store.product.price
}

const curatedPrices = catalogue.filter(item => item.style === 'Curated').map(item => item.price)
export const curatedLowPrice = Math.min(...curatedPrices)
export const curatedHighPrice = Math.max(...curatedPrices)
export const curatedOfferCount = curatedPrices.length

/** A whole-dollar price in the store's currency, e.g. "A$300". */
export function formatWholePrice(amount: number): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: store.product.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
