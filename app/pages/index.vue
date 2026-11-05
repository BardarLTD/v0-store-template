<script setup lang="ts">
import {
  store,
  catalogue,
  formatPrice,
  defaultSelection,
  priceFor,
  frameStyles,
  findFrameStyle,
  type FrameStyle,
  type Selection,
} from '#shared/store'
import { paintings, collection, findPainting } from '#shared/catalogue'
import { lookbook } from '#shared/lookbook'

const { company, product } = store

const route = useRoute()
const linkedPainting = findPainting(route.query.painting)

const selection = reactive<Selection>({
  ...defaultSelection,
  style: route.query.style === 'bespoke' ? 'Bespoke' : 'Curated',
})
const price = computed(() => priceFor(selection) ?? product.price)
const isBespoke = computed(() => selection.style === 'Bespoke')

const paintingId = ref(linkedPainting?.id ?? paintings[0]?.id ?? '')
const chosenPainting = computed(() =>
  isBespoke.value ? undefined : findPainting(paintingId.value),
)

const sizeChoices = [
  { value: '16x20 in', label: 'Medium', detail: '16 × 20 in · 40 × 50 cm' },
  { value: '18x24 in', label: 'Large', detail: '18 × 24 in · 45 × 60 cm' },
] as const

const frameChoices = [
  { value: 'Unframed', label: 'Rolled', detail: 'Posted rolled in a tube, ready for a local framer' },
  { value: 'Framed', label: 'Framed', detail: 'Stretched and framed, ready to hang' },
] as const

const frameStyleId = ref<FrameStyle['id']>(frameStyles[0].id)
const isFramed = computed(() => selection.frame === 'Framed')
const chosenFrame = computed(() =>
  isFramed.value ? findFrameStyle(frameStyleId.value) : undefined,
)

const heroShot = lookbook.find((shot) => shot.id === 'fireplace-arc') ?? lookbook[0]
const roomShots = lookbook.filter((shot) => shot !== heroShot)
const heroPainting = heroShot ? findPainting(heroShot.paintingId) : undefined
const fromPrice = formatPrice(Math.min(...catalogue.map((item) => item.price)))

/**
 * On desktop the preview sits beside the form, so the section top shows both.
 * On mobile the preview stacks above, so jump past it to the chosen painting,
 * with Size and Finish directly below.
 */
function scrollToOptions() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isWide = window.matchMedia('(min-width: 768px)').matches
  const target = document.getElementById(isWide ? 'order' : 'painting-choice') ?? document.getElementById('order')
  nextTick(() => target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }))
}

function chooseFromLookbook(id: string) {
  selection.style = 'Curated'
  paintingId.value = id
  scrollToOptions()
}

/** Dimensions follow the painting's orientation: landscape reads width first. */
function sizeDetail(detail: string): string {
  if (chosenPainting.value?.orientation !== 'landscape') return detail
  return detail.replace(/(\d+) × (\d+)/g, '$2 × $1')
}

const BRIEF_MAX = 500
const brief = ref('')

const quoteHref = `mailto:${company.email}?subject=${encodeURIComponent('Bespoke painting: size quote')}`

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
          'url': 'https://cavalletto.com.au',
          'price': product.price,
          'priceCurrency': product.currency,
          'availability': 'https://schema.org/PreOrder',
        },
      }),
    },
  ],
})

const tracking = useTracking()
onMounted(() => tracking.viewProduct())

const choiceClass = 'relative flex cursor-pointer flex-col gap-0.5 rounded-md border-[1.5px] border-line px-4 py-3 hover:border-stone-900 text-sm transition-colors duration-150 has-checked:border-accent has-checked:bg-accent has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent'
</script>

<template>
  <HomeHero
    v-if="heroShot && heroPainting"
    :shot="heroShot"
    :painting="heroPainting"
    :from-price="fromPrice"
    @choose="chooseFromLookbook"
  />

  <section id="lookbook" aria-labelledby="lookbook-heading" class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-4! md:pt-8!">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <h2 id="lookbook-heading" class="max-w-lg text-4xl font-bold tracking-display text-balance md:text-5xl">
        Rooms worth coming home to.
      </h2>
      <p class="max-w-sm text-base leading-relaxed text-pretty">
        The rug, the lamp, the books you keep. A real painting is often what pulls it together. Tap any room to choose the painting in it.
      </p>
    </div>
    <LookbookGrid :shots="roomShots" @choose="chooseFromLookbook" />
  </section>

  <HomeSteps />

  <section id="order" aria-labelledby="order-heading" class="mx-auto grid w-full max-w-5xl scroll-mt-4 items-start gap-10 px-6 md:grid-cols-2 md:gap-16">
    <div class="flex flex-col gap-3 md:sticky md:top-8">
      <div
        v-if="chosenPainting"
        class="flex items-center justify-center rounded-md bg-line/40 p-8 md:p-12"
      >
        <FramedPainting
          :key="chosenPainting.id"
          :src="chosenPainting.image"
          :alt="chosenFrame ? `${chosenPainting.imageAlt}, shown in a ${chosenFrame.label.toLowerCase()} frame` : chosenPainting.imageAlt"
          :frame="chosenFrame"
        />
      </div>
      <div v-else class="overflow-hidden rounded-md">
        <img
          :src="product.image"
          :alt="product.imageAlt"
          width="1200"
          height="960"
          loading="lazy"
          class="aspect-[5/4] w-full origin-[55%_50%] scale-[1.12] object-cover"
        >
      </div>
      <p class="text-xs leading-relaxed">
        <template v-if="chosenPainting">
          Reference image of the original. Each reproduction is painted by hand, so small variations are part of the piece.
        </template>
        <template v-else>
          Pictured: a bespoke commission. Yours is painted from your own reference, and you approve a photo preview before it ships.
        </template>
      </p>
    </div>

    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-bold uppercase tracking-label text-terracotta">
          Order yours
        </p>
        <h2 id="order-heading" class="text-4xl font-bold tracking-display text-balance md:text-5xl">
          {{ product.name }}
        </h2>
      </div>

      <fieldset class="flex flex-col gap-3">
        <legend class="mb-2 text-sm font-bold text-stone-900">
          1. Choose your painting
        </legend>
        <div class="grid grid-cols-2 gap-2">
          <label :class="choiceClass">
            <input v-model="selection.style" type="radio" name="style" value="Curated" class="sr-only">
            <span class="font-bold">{{ collection.name }}</span>
            <span class="opacity-80">Pick from our curated range</span>
          </label>
          <label :class="choiceClass">
            <input v-model="selection.style" type="radio" name="style" value="Bespoke" class="sr-only">
            <span class="font-bold">Bespoke</span>
            <span class="opacity-80">Any painting you like</span>
          </label>
        </div>

        <div v-if="chosenPainting" id="painting-choice" class="flex scroll-mt-6 flex-col gap-2 pt-2" aria-live="polite">
          <p class="text-base text-stone-900">
            <span class="font-serif text-xl font-bold italic">{{ chosenPainting.title }}</span>
            <span class="block text-sm">{{ chosenPainting.artist }}, {{ chosenPainting.year }} · {{ chosenPainting.style }}</span>
          </p>
          <p class="max-w-md text-sm leading-relaxed text-stone-900">
            {{ chosenPainting.description }}
          </p>
          <p class="max-w-md text-sm leading-relaxed text-stone-900">
            <span class="font-bold">Suits:</span> {{ chosenPainting.suits }}
          </p>
          <a href="#range" class="text-sm font-bold text-accent underline underline-offset-2">
            Choose a different painting
          </a>
        </div>

        <div v-else class="flex max-w-md flex-col gap-2 pt-2 text-sm leading-relaxed text-stone-900">
          <p>
            Buy a bespoke painting below, then email your reference image and requirements to
            <a :href="`mailto:${company.email}`" class="font-bold text-accent underline underline-offset-2">{{ company.email }}</a>
            from the address you ordered with. We&apos;ll confirm the details and send a photo preview to approve before it ships.
          </p>
        </div>
      </fieldset>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-bold text-stone-900">
          2. Size
        </legend>
        <div class="grid grid-cols-2 gap-2">
          <label v-for="size in sizeChoices" :key="size.value" :class="choiceClass">
            <input v-model="selection.size" type="radio" name="size" :value="size.value" class="sr-only">
            <span class="font-bold">{{ size.label }}</span>
            <span class="opacity-80">{{ sizeDetail(size.detail) }}</span>
          </label>
        </div>
        <p v-if="chosenPainting" class="text-xs leading-relaxed text-stone-500">
          Each painting is adapted by hand to fit the canvas you choose, so nothing important is lost.
        </p>
        <p v-else class="text-xs leading-relaxed text-stone-500">
          Need a different size? <a :href="quoteHref" class="font-bold text-accent underline underline-offset-2">Email us before you order</a> and we&apos;ll quote you.
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-bold text-stone-900">
          3. Finish
        </legend>
        <div class="grid grid-cols-2 gap-2">
          <label v-for="frame in frameChoices" :key="frame.value" :class="choiceClass">
            <input v-model="selection.frame" type="radio" name="frame" :value="frame.value" class="sr-only">
            <span class="font-bold">{{ frame.label }}</span>
            <span class="opacity-80">{{ frame.detail }}</span>
          </label>
        </div>

        <Transition
          enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
          enter-from-class="-translate-y-1 opacity-0"
          leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
          leave-to-class="-translate-y-1 opacity-0"
        >
          <fieldset v-if="isFramed" class="mt-2 flex flex-col gap-2 rounded-md border border-stone-200 bg-sunk p-4">
            <legend class="sr-only">
              Frame style
            </legend>
            <p class="text-sm font-bold text-stone-900" aria-hidden="true">
              Choose your frame
            </p>
            <div class="grid grid-cols-3 gap-2">
              <label
                v-for="style in frameStyles"
                :key="style.id"
                class="flex cursor-pointer flex-col items-center gap-2 rounded-md border-[1.5px] border-transparent px-2 py-3 text-center text-sm text-stone-900 transition-colors duration-150 hover:border-stone-300 has-checked:border-accent has-checked:bg-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
              >
                <input v-model="frameStyleId" type="radio" name="frame-style" :value="style.id" class="sr-only">
                <span
                  aria-hidden="true"
                  class="frame-swatch flex size-12 items-center justify-center rounded-sm"
                  :style="{ backgroundImage: style.moulding }"
                >
                  <span class="size-6 rounded-[2px] bg-stone-100 shadow-inner" />
                </span>
                <span class="flex flex-col">
                  <span class="font-bold leading-snug">{{ style.label }}</span>
                  <span class="text-xs text-stone-500">{{ style.detail }}</span>
                </span>
              </label>
            </div>
            <p class="text-xs leading-relaxed text-stone-500">
              {{ chosenPainting ? 'The preview shows your painting in the frame you pick.' : 'Your bespoke painting will be framed in the style you pick.' }}
            </p>
          </fieldset>
        </Transition>
      </fieldset>

      <div v-if="isBespoke" class="flex flex-col gap-2">
        <label for="brief" class="text-sm font-bold text-stone-900">
          What would you like painted? <span class="font-normal">(optional)</span>
        </label>
        <textarea
          id="brief"
          v-model="brief"
          name="brief"
          rows="3"
          :maxlength="BRIEF_MAX"
          aria-describedby="brief-help"
          class="w-full rounded-md border-[1.5px] border-stone-900 bg-transparent px-4 py-3 text-base leading-relaxed text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <p id="brief-help" class="flex justify-between gap-4 text-xs text-stone-500">
          <span>A quick note helps. Send the full details and reference image by email after you order.</span>
          <span aria-hidden="true">{{ brief.length }}/{{ BRIEF_MAX }}</span>
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <p class="flex flex-col gap-1">
          <span class="text-2xl font-semibold text-stone-900" aria-live="polite">{{ formatPrice(price) }}</span>
          <span class="text-sm text-stone-500">{{ product.shipping }}</span>
        </p>
        <PreorderButton
          :selection="selection"
          :price="price"
          :painting-id="chosenPainting?.id"
          :frame-style-id="chosenFrame?.id"
          :brief="isBespoke ? brief : undefined"
        />
        <p class="max-w-md text-base leading-relaxed text-stone-900">
          Hand-painted in oil on canvas, to order. They cost more than a print and less than an original. Look closely and the brushwork shows.
        </p>
      </div>

      <section aria-labelledby="delivery-heading" class="flex flex-col gap-2">
        <h2 id="delivery-heading" class="text-xl font-bold tracking-display text-stone-900">
          Delivery
        </h2>
        <p class="max-w-md text-base leading-relaxed text-stone-900">
          Free delivery within Australia. Rolled paintings are posted in a tube, so you&apos;ll need to stretch and frame them locally before hanging. Framed paintings arrive ready to hang. Either way, you approve a photo preview before your painting ships.
        </p>
      </section>
    </div>
  </section>

  <section v-if="!isBespoke" id="range" aria-labelledby="range-heading" class="mx-auto flex w-full max-w-5xl scroll-mt-8 flex-col gap-6 px-6 pt-0!">
    <div class="flex flex-col gap-2">
      <h2 id="range-heading" class="text-3xl font-bold tracking-display text-stone-900">
        {{ collection.name }}
      </h2>
      <p class="max-w-xl text-base leading-relaxed text-stone-900">
        {{ collection.intro }} Tap one to choose it.
      </p>
    </div>
    <PaintingPicker v-model="paintingId" :paintings="paintings" @chosen="scrollToOptions" />
  </section>
</template>

<style scoped>
.frame-swatch {
  box-shadow:
    inset 1px 1px 2px rgb(255 255 255 / 0.4),
    inset -1px -1px 2px rgb(0 0 0 / 0.35),
    0 2px 4px rgb(0 0 0 / 0.2);
}
</style>
