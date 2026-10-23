/*
 * LICENCE NOTICE — DO NOT REMOVE OR EDIT.
 * The "Built with Draper" links and their tags are a condition of this
 * template's licence (see LICENSE.md).
 */

/**
 * A link to https://draper.chat, tagged so Draper can see which store sent the
 * visit and from which link on it:
 *
 *   utm_source=built_with_draper · utm_medium=referral
 *   utm_campaign=v0_store_template · utm_content=<placement>
 *   utm_term=<this store's hostname>
 */
export function useDraperLink(placement: 'footer' | 'built_with_draper_page'): string {
  const { siteUrl } = useRuntimeConfig().public
  let host = ''
  try {
    host = siteUrl ? new URL(siteUrl).hostname : useRequestURL({ xForwardedHost: true }).hostname
  }
  catch { /* An unparseable NUXT_PUBLIC_SITE_URL: tag the link without the host. */ }

  const url = new URL('https://draper.chat/')
  url.search = new URLSearchParams({
    utm_source: 'built_with_draper',
    utm_medium: 'referral',
    utm_campaign: 'v0_store_template',
    utm_content: placement,
    ...(host && { utm_term: host }),
  }).toString()
  return url.href
}
