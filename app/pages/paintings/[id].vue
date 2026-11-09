<script setup lang="ts">
import { collection, findPainting, paintings, type Painting } from '#shared/catalogue'
import { faqs } from '#shared/faqs'
import {
  curatedHighPrice,
  curatedLowPrice,
  curatedOfferCount,
  curatedPrice,
  curatedSelection,
  finishOptions,
  formatWholePrice,
  frameChoices,
  frameLabel,
  parseFinish,
  parseFrame,
  parseSize,
  sizeOptions,
  type FinishKey,
  type FrameKey,
  type SizeKey,
} from '#shared/painting-options'
import { store } from '#shared/store'

definePageMeta({
  middleware: to => (findPainting(to.params.id) ? undefined : navigateTo('/collection', { redirectCode: 302 })),
})

const PRODUCTION_ORIGIN = 'https://cavalletto.com.au'
const FAQ_QUESTIONS = [
  'Is this a print?',
  'What if I don’t like the preview?',
  'Rolled or framed: which should I choose?',
  'Will it look exactly like the original?',
]

const route = useRoute()
const painting = computed(() => findPainting(route.params.id) as Painting)

const size = ref<SizeKey>(parseSize(route.query.size))
const finish = ref<FinishKey>(parseFinish(route.query.finish))
const frameStyle = ref<FrameKey>(parseFrame(route.query.frame))
const price = computed(() => curatedPrice(size.value, finish.value))

const sizeChoices = computed(() => sizeOptions.map(option => ({
  ...option,
  price: formatWholePrice(curatedPrice(option.key, finish.value)),
})))
const finishChoices = computed(() => finishOptions.map(option => ({
  ...option,
  price: formatWholePrice(curatedPrice(size.value, option.key)),
})))

const summary = computed(() => {
  const sizeLabel = sizeOptions.find(option => option.key === size.value)!.label
  const finishLabel = finish.value === 'framed'
    ? `${frameLabel(frameStyle.value).toLowerCase()} frame`
    : finishOptions.find(option => option.key === finish.value)!.label.toLowerCase()
  return `${sizeLabel}, ${finishLabel} · ${formatWholePrice(price.value)}`
})

const pageFaqs = FAQ_QUESTIONS.map(question => faqs.find(item => item.question === question)).filter(item => item !== undefined)

const related = computed(() => {
  const others = paintings.filter(item => item.id !== painting.value.id)
  const sameFeel = others.filter(item => item.feel === painting.value.feel)
  const rest = others.filter(item => item.feel !== painting.value.feel)
  return [...sameFeel, ...rest].slice(0, 4)
})

const tracking = useTracking()
const trackedItem = computed(() => ({ id: painting.value.id, name: painting.value.title, value: price.value }))
const { pending, error, start } = useCheckout()

function buy() {
  start({
    selection: curatedSelection(size.value, finish.value),
    paintingId: painting.value.id,
    frameStyleId: finish.value === 'framed' ? frameStyle.value : undefined,
    trackedItem: trackedItem.value,
  })
}

onMounted(() => tracking.viewProduct(trackedItem.value))
watch(() => painting.value.id, () => tracking.viewProduct(trackedItem.value))

// The sticky bar shows once the main Buy button has scrolled up out of view, and hides near the footer.
const buyButton = ref<HTMLElement | null>(null)
const barVisible = ref(false)
let frame = 0

function updateBar() {
  frame = 0
  const buyBottom = buyButton.value?.getBoundingClientRect().bottom ?? Infinity
  const footerTop = document.querySelector('body footer')?.getBoundingClientRect().top ?? Infinity
  barVisible.value = buyBottom < 0 && footerTop > window.innerHeight
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateBar)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateBar()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})

const description = computed(() =>
  `${painting.value.description} Hand-painted in oil on canvas, from ${formatWholePrice(curatedLowPrice)}. Free delivery in Australia.`,
)
const roomImageUrl = computed(() => new URL(painting.value.roomImage, `${PRODUCTION_ORIGIN}/`).href)
const pageTitle = computed(() => `${painting.value.title} by ${painting.value.artist}, hand-painted in oil`)

useSeoMeta({
  title: pageTitle,
  description,
  ogTitle: () => `${pageTitle.value} · ${store.company.name}`,
  ogDescription: description,
  ogImage: roomImageUrl,
  ogType: 'product' as 'website',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': `${painting.value.title}, hand-painted oil reproduction`,
        'description': painting.value.description,
        'image': [roomImageUrl.value, new URL(painting.value.image, `${PRODUCTION_ORIGIN}/`).href],
        'url': `${PRODUCTION_ORIGIN}/paintings/${painting.value.id}`,
        'sku': painting.value.id,
        'brand': { '@type': 'Brand', 'name': store.company.name },
        'offers': {
          '@type': 'AggregateOffer',
          'lowPrice': curatedLowPrice,
          'highPrice': curatedHighPrice,
          'offerCount': curatedOfferCount,
          'priceCurrency': store.product.currency,
          'availability': 'https://schema.org/PreOrder',
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col pb-24 lg:px-6 lg:pb-0">
    <NuxtLink
      to="/collection"
      class="inline-flex w-fit items-center gap-1 px-6 pt-4 pb-4 text-sm font-bold text-accent lg:px-0 lg:pt-6"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m15 18-6-6 6-6" />
      </svg>
      {{ collection.name }}
    </NuxtLink>

    <div class="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
      <div class="lg:sticky lg:top-6">
        <PaintingGallery :painting="painting" />
      </div>

      <div class="flex flex-col gap-6 px-6 lg:px-0">
        <div class="flex flex-col gap-2">
          <h1 class="font-serif text-3xl leading-tight font-bold tracking-display text-balance italic md:text-4xl">
            {{ painting.title }}
          </h1>
          <p class="text-base">
            {{ painting.artist }}, {{ painting.year }} · {{ painting.style }}
          </p>
        </div>

        <p class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="text-3xl font-bold" aria-live="polite">{{ formatWholePrice(price) }}</span>
          <span class="text-sm">Free delivery in Australia</span>
        </p>

        <OptionGroup v-model="size" legend="Size" name="size" :options="sizeChoices">
          <p class="text-sm leading-relaxed">
            The painter adjusts the composition slightly to fit your canvas, so nothing important gets cut.
          </p>
        </OptionGroup>

        <OptionGroup v-model="finish" legend="Finish" name="finish" :options="finishChoices" />
        <OptionGroup v-if="finish === 'framed'" v-model="frameStyle" legend="Frame" name="frame" :options="frameChoices" />

        <div ref="buyButton" class="flex flex-col gap-3">
          <button
            type="button"
            :disabled="pending"
            class="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-base font-bold text-white transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active disabled:cursor-progress disabled:opacity-70"
            @click="buy"
          >
            <span
              v-if="pending"
              aria-hidden="true"
              class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
            {{ pending ? 'Opening checkout…' : `Buy · ${formatWholePrice(price)}` }}
          </button>
          <p v-if="error" role="alert" class="flex items-center gap-2 text-sm">
            <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-danger" />
            {{ error }}
          </p>
          <p class="text-center text-xs leading-relaxed text-pretty">
            Visa, Mastercard, Amex, Apple Pay or Google Pay. Airwallex handles payment, so your card details never reach our site.
          </p>
        </div>

        <PaintingPromises />
      </div>
    </div>

    <div class="flex flex-col gap-14 px-6 pt-14 pb-14 lg:px-0 lg:pt-20 md:pb-20">
      <section aria-labelledby="about-heading" class="flex max-w-2xl flex-col gap-3">
        <h2 id="about-heading" class="text-2xl font-bold tracking-display">
          About the painting
        </h2>
        <p class="text-base leading-relaxed text-pretty">
          {{ painting.description }}
        </p>
        <p class="text-base leading-relaxed">
          <span class="font-bold">Suits:</span> {{ painting.suits }}
        </p>
        <p class="text-sm">
          The original is in the {{ painting.originalLocation }}.
        </p>
      </section>

      <section aria-labelledby="timeline-heading" class="flex flex-col gap-5">
        <h2 id="timeline-heading" class="text-2xl font-bold tracking-display">
          What happens after you order
        </h2>
        <OrderTimeline />
      </section>

      <section aria-labelledby="questions-heading" class="flex max-w-2xl flex-col gap-4">
        <h2 id="questions-heading" class="text-2xl font-bold tracking-display">
          Questions
        </h2>
        <div class="flex flex-col">
          <details
            v-for="(item, index) in pageFaqs"
            :key="item.question"
            :open="index === 0"
            class="group border-b-[1.5px] border-line first:border-t-[1.5px]"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold [&::-webkit-details-marker]:hidden">
              {{ item.question }}
              <span aria-hidden="true" class="shrink-0 text-2xl leading-none font-normal transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
            </summary>
            <p class="pb-4 text-base leading-relaxed text-pretty">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </section>

      <section aria-labelledby="more-heading" class="flex flex-col gap-5">
        <h2 id="more-heading" class="text-2xl font-bold tracking-display">
          More from {{ collection.name }}
        </h2>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          <li v-for="item in related" :key="item.id">
            <PaintingCard :painting="item" />
          </li>
        </ul>
      </section>
    </div>

    <StickyBuyBar
      :painting="painting"
      :summary="summary"
      :visible="barVisible"
      :pending="pending"
      @buy="buy"
    />
  </div>
</template>
