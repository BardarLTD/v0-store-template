import tailwindcss from '@tailwindcss/vite'

let sitemapPaths: string[] = []

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
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Figtree:ital,wght@0,400;0,700;1,400&display=swap' },
      ],
    },
  },

  routeRules: {
    '/thank-you': { headers: { 'X-Robots-Tag': 'noindex' } },
  },

  // Hands the app's static page paths to server/routes/sitemap.xml.ts, so the
  // sitemap always matches the pages that exist (including any blog posts).
  hooks: {
    'pages:extend'(pages) {
      const paths = new Set<string>()
      const collect = (list: typeof pages, prefix = '') => {
        for (const page of list) {
          const path = page.path.startsWith('/') ? page.path : `${prefix}/${page.path}`
          if (!path.includes(':')) paths.add(path.replace(/\/+$/, '') || '/')
          if (page.children) collect(page.children, path)
        }
      }
      collect(pages)
      sitemapPaths = [...paths].sort()
    },
    'nitro:config'(config) {
      config.virtual = {
        ...config.virtual,
        '#sitemap-paths': () => `export default ${JSON.stringify(sitemapPaths)}`,
      }
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
      // Cavalletto's pixel. It only loads on cavalletto.com.au (app/plugins/tracking.ts).
      metaPixelId: '1468386975385734',
      googleTagId: '',
      googleAdsConversion: '',
    },
  },
})
