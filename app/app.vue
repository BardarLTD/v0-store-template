<script setup lang="ts">
import { store } from '#shared/store'

const PRODUCTION_ORIGIN = 'https://cavalletto.com.au'

const route = useRoute()
const siteUrl = (useRuntimeConfig().public.siteUrl || PRODUCTION_ORIGIN).replace(/\/+$/, '')
const pageUrl = computed(() => `${siteUrl}${route.path}`)
const productImage = new URL(store.product.image, `${PRODUCTION_ORIGIN}/`).href

// The tab icons are set in nuxt.config.ts (app.head).
useHead({
  titleTemplate: '%s · Cavalletto',
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Cavalletto',
        'url': PRODUCTION_ORIGIN,
        'logo': `${PRODUCTION_ORIGIN}/apple-touch-icon.png`,
      }),
    },
  ],
})

useSeoMeta({
  ogUrl: pageUrl,
  ogSiteName: 'Cavalletto',
  ogType: 'website',
  ogLocale: 'en_AU',
  ogImage: productImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
