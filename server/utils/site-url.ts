import type { H3Event } from 'h3'

/**
 * The site's public origin, e.g. "https://peel.example". Images given as a
 * path under `public/` are served from it, so Airwallex's checkout can only
 * load them once it is reachable over HTTPS (not on localhost).
 * NUXT_PUBLIC_SITE_URL wins; otherwise the request's own origin (behind a
 * proxy, from the X-Forwarded headers).
 */
export function siteUrl(event: H3Event): string {
  const configured = useRuntimeConfig(event).public.siteUrl
  if (configured) return configured.replace(/\/+$/, '')
  return getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin
}

/** A path under `public/` (or an absolute URL, unchanged) as an absolute URL. */
export function absoluteUrl(event: H3Event, path: string): string {
  return new URL(path, `${siteUrl(event)}/`).href
}

const IMAGE_EXTENSION = /\.(?:jpe?g|png|gif|webp|avif|svg)$/i

/**
 * An image URL Airwallex's hosted checkout will display. It only renders an
 * image whose URL ends in an image extension, which CDN links
 * (`…/photo-123?w=1200&fm=jpg`) often don't. A `#.jpg` fragment satisfies
 * it without changing the request: browsers never send the fragment, so
 * signed and CDN URLs still load.
 */
export function checkoutImageUrl(event: H3Event, path: string): string {
  const url = absoluteUrl(event, path)
  return IMAGE_EXTENSION.test(url) ? url : `${url.split('#')[0]}#.jpg`
}
