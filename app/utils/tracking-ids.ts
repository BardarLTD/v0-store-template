/**
 * The pixel IDs from the environment, checked. A value that isn't shaped like
 * an ID (a typo, a pasted snippet) is dropped with a warning rather than
 * written into the page, so a bad paste can't break or inject into it.
 */

const META_PIXEL_ID = /^\d{6,20}$/
/** G- (Analytics), AW- (Ads), GT- (a combined Google tag), DC- (Floodlight). */
const GOOGLE_TAG_ID = /^(?:G|AW|GT|DC)-[A-Z0-9]{4,20}$/i
/** A Google Ads conversion's "send to": `AW-123456789/AbCdEfGhIjK`. */
const GOOGLE_ADS_CONVERSION = /^(AW-\d{4,20})\/[\w-]{4,40}$/

export interface TrackingIds {
  metaPixelId: string
  /** Every Google tag to configure; the Ads conversion's AW- tag included. */
  googleTagIds: string[]
  googleAdsConversion: string
}

function checked(value: unknown, pattern: RegExp, name: string): string {
  const id = String(value ?? '').trim()
  if (!id) return ''
  if (pattern.test(id)) return id
  console.warn(`[tracking] ${name} "${id}" doesn't look like one, so it's ignored. See .env.example.`)
  return ''
}

export function trackingIds(): TrackingIds {
  const config = useRuntimeConfig().public
  const metaPixelId = checked(config.metaPixelId, META_PIXEL_ID, 'NUXT_PUBLIC_META_PIXEL_ID')
  const googleAdsConversion = checked(config.googleAdsConversion, GOOGLE_ADS_CONVERSION, 'NUXT_PUBLIC_GOOGLE_ADS_CONVERSION')

  // Several tags may be given, comma-separated (an Analytics G- and an Ads
  // AW-). The conversion's own AW- tag is added if it isn't listed, so an
  // Ads-only store needs nothing but the conversion.
  const googleTagIds = String(config.googleTagId ?? '')
    .split(',')
    .map(id => checked(id, GOOGLE_TAG_ID, 'NUXT_PUBLIC_GOOGLE_TAG_ID'))
    .filter(Boolean)
  const adsTag = googleAdsConversion.match(GOOGLE_ADS_CONVERSION)?.[1]
  if (adsTag && !googleTagIds.includes(adsTag)) googleTagIds.push(adsTag)

  return { metaPixelId, googleTagIds, googleAdsConversion }
}
