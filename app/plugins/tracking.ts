/**
 * Ad pixels: the Meta Pixel and the Google tag (Google Ads and/or Google
 * Analytics 4). Each loads only when its ID is set (see .env.example), so the
 * site runs without either. The snippets render into the page's <head> on the
 * server, which is where Meta's and Google's setup checkers look for them.
 *
 * The Meta Pixel only loads on the live site (META_PIXEL_HOST), so preview
 * deployments and local builds never send test traffic into the ads data.
 *
 * Page views: Meta's own history tracking is switched off and PageView is sent
 * here on every client-side route change instead, so each page counts exactly
 * once. GA4 follows route changes itself (enhanced measurement). The store's
 * events (view the product, start checkout, purchase) are in
 * `app/composables/useTracking.ts`.
 */
const META_PIXEL_HOST = /^(?:www\.)?cavalletto\.com\.au$/

export default defineNuxtPlugin(() => {
  const { metaPixelId, googleTagIds } = trackingIds()

  if (metaPixelId && META_PIXEL_HOST.test(useRequestURL().hostname)) {
    const id = JSON.stringify(metaPixelId)
    useHead({
      script: [{
        key: 'meta-pixel',
        // The hostname is checked again in the browser in case a page rendered for the live site is served elsewhere.
        innerHTML: `if(${META_PIXEL_HOST}.test(location.hostname)){`
          + `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`
          + `fbq.disablePushState=true;fbq('init',${id});fbq('track','PageView');}`,
      }],
      noscript: [{
        key: 'meta-pixel-noscript',
        tagPosition: 'bodyOpen',
        innerHTML: `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1">`,
      }],
    })

    if (import.meta.client) {
      const router = useRouter()
      // The first page's PageView is sent by the snippet above.
      let lastPath = router.resolve(window.location.pathname + window.location.search).path
      router.afterEach((to, _from, failure) => {
        if (failure || to.path === lastPath) return
        lastPath = to.path
        try {
          window.fbq?.('track', 'PageView')
        }
        catch (error) {
          console.warn('[tracking] PageView not sent', error)
        }
      })
    }
  }

  if (googleTagIds.length) {
    useHead({ script: [
      { key: 'google-tag', src: `https://www.googletagmanager.com/gtag/js?id=${googleTagIds[0]}`, async: true },
      {
        key: 'google-tag-config',
        innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());`
          + googleTagIds.map(id => `gtag('config',${JSON.stringify(id)});`).join(''),
      },
    ] })
  }
})
