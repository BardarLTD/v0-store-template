/**
 * Ad pixels: the Meta Pixel and the Google tag (Google Ads and/or Google
 * Analytics 4). Each loads only when its ID is set (see .env.example), so the
 * site runs without either. The snippets render into the page's <head> on the
 * server, which is where Meta's and Google's setup checkers look for them.
 *
 * Page views: both libraries count the first one here and follow route
 * changes on their own (Meta's history tracking, GA4's enhanced measurement),
 * so nothing sends them per route. The store's events (view the product,
 * start checkout, purchase) are in `app/composables/useTracking.ts`.
 */
export default defineNuxtPlugin(() => {
  const { metaPixelId, googleTagIds } = trackingIds()

  if (metaPixelId) {
    useHead({ script: [{
      key: 'meta-pixel',
      innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`
        + `fbq('init',${JSON.stringify(metaPixelId)});fbq('track','PageView');`,
    }] })
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
