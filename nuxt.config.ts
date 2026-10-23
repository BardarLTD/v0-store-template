import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    // Loaded on click, so pre-bundle it rather than reload the page in dev.
    optimizeDeps: { include: ['@airwallex/components-sdk'] },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&display=swap' },
      ],
    },
  },

  /*
   * Airwallex credentials. Set them as environment variables (see .env.example);
   * the server reads them, the browser never sees the key.
   *   NUXT_AIRWALLEX_CLIENT_ID · NUXT_AIRWALLEX_API_KEY
   *   NUXT_PUBLIC_AIRWALLEX_ENV — 'demo' (sandbox, the default) or 'prod'
   *   NUXT_PUBLIC_SITE_URL — the site's public HTTPS origin; Airwallex's
   *     checkout loads the logo and product image from it (defaults to the
   *     request's origin)
   *
   * Ad pixels, each optional (see .env.example and app/plugins/tracking.ts):
   *   NUXT_PUBLIC_META_PIXEL_ID — the Meta Pixel (dataset) ID, digits only
   *   NUXT_PUBLIC_GOOGLE_TAG_ID — a Google tag ID (G-…, AW-… or GT-…);
   *     several comma-separated
   *   NUXT_PUBLIC_GOOGLE_ADS_CONVERSION — the Google Ads purchase
   *     conversion's "send to", AW-…/…
   */
  runtimeConfig: {
    airwallexClientId: '',
    airwallexApiKey: '',
    public: {
      airwallexEnv: 'demo',
      siteUrl: '',
      metaPixelId: '',
      googleTagId: '',
      googleAdsConversion: '',
    },
  },
})
