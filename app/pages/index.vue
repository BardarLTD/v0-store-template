<script setup lang="ts">
import { store } from '#shared/store'
import { findPainting } from '#shared/catalogue'
import { lookbook } from '#shared/lookbook'

const { company, product } = store

// Old order-panel links (/?painting=<id>) now go to that painting's own page.
const route = useRoute()
const linkedPainting = findPainting(route.query.painting)
if (linkedPainting) {
  await navigateTo(`/paintings/${linkedPainting.id}`, { redirectCode: 301, replace: true })
}

// The hash never reaches the server, so the old #order and #range anchors redirect here.
onMounted(() => {
  if (window.location.hash === '#order' || window.location.hash === '#range') {
    navigateTo('/collection', { replace: true })
  }
})

const heroShot = lookbook.find(shot => shot.id === 'sitting-room-fireplace') ?? lookbook[0]
const heroPainting = heroShot ? findPainting(heroShot.paintingId) : undefined

const PAGE_TITLE = 'Hand-Painted Oil Paintings, Made to Order'
const PAGE_DESCRIPTION = 'Oil paintings painted by hand to order, from Collection one or your own idea. Free delivery across Australia.'

useSeoMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ogTitle: `${PAGE_TITLE} · ${company.name}`,
  ogDescription: PAGE_DESCRIPTION,
  ogImage: product.image,
  twitterCard: 'summary_large_image',
})

useHead({
  link: heroShot ? [{ rel: 'preload', as: 'image', href: heroShot.image, fetchpriority: 'high' }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'description': PAGE_DESCRIPTION,
        'image': new URL(product.image, 'https://cavalletto.com.au/').href,
        'brand': { '@type': 'Brand', 'name': 'Cavalletto' },
        'offers': {
          '@type': 'Offer',
          'url': 'https://cavalletto.com.au/collection',
          'price': product.price,
          'priceCurrency': product.currency,
          'availability': 'https://schema.org/PreOrder',
          'shippingDetails': {
            '@type': 'OfferShippingDetails',
            'shippingRate': {
              '@type': 'MonetaryAmount',
              'value': 0,
              'currency': product.currency,
            },
            'shippingDestination': {
              '@type': 'DefinedRegion',
              'addressCountry': product.countryCode,
            },
            // Made to order: preview within 2 weeks, then ships within 3 business days of approval.
            'deliveryTime': {
              '@type': 'ShippingDeliveryTime',
              'handlingTime': { '@type': 'QuantitativeValue', 'minValue': 3, 'maxValue': 17, 'unitCode': 'DAY' },
              'transitTime': { '@type': 'QuantitativeValue', 'minValue': 2, 'maxValue': 7, 'unitCode': 'DAY' },
            },
          },
          // Change-of-mind returns aren't accepted; faulty items are covered under the Australian Consumer Law.
          'hasMerchantReturnPolicy': {
            '@type': 'MerchantReturnPolicy',
            'applicableCountry': product.countryCode,
            'returnPolicyCategory': 'https://schema.org/MerchantReturnNotPermitted',
            'merchantReturnLink': 'https://cavalletto.com.au/returns',
          },
        },
      }),
    },
  ],
})
</script>

<template>
  <HomeHero v-if="heroShot && heroPainting" :shot="heroShot" :painting="heroPainting" />
  <HomeTrust />
  <HomeCloseups />
  <HomeRooms />
  <HomeCollection />
  <HomeSteps />
  <HomeBespoke />
  <HomeAbout />
  <HomeFaq />
</template>
