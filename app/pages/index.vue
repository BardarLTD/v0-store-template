<script setup lang="ts">
import {
  store,
  formatPrice,
  productOptions,
  optionLabels,
  defaultSelection,
  priceFor,
  type OptionName,
  type Selection,
} from '#shared/store'
import { paintings } from '#shared/catalogue'

const { company, product } = store

const optionNames = Object.keys(productOptions) as OptionName[]
const selection = reactive<Selection>({ ...defaultSelection })
const price = computed(() => priceFor(selection) ?? product.price)

const paintingId = ref(paintings[0]?.id ?? '')
const showRange = computed(() => paintings.length > 0 && selection.style === 'Curated')
const chosenPainting = computed(() =>
  showRange.value ? paintings.find(painting => painting.id === paintingId.value) : undefined,
)
const mainImage = computed(() => chosenPainting.value?.image ?? product.image)
const mainImageAlt = computed(() => chosenPainting.value?.imageAlt ?? product.imageAlt)

const BRIEF_MAX = 500
const brief = ref('')
const isBespoke = computed(() => selection.style === 'Bespoke')
const briefMissing = computed(() => isBespoke.value && brief.value.trim() === '')

useSeoMeta({
  title: `${product.name} · ${company.name}`,
  description: product.tagline,
  ogTitle: `${product.name} · ${company.name}`,
  ogDescription: product.tagline,
  ogImage: product.image,
  twitterCard: 'summary_large_image',
})

const tracking = useTracking()
onMounted(() => tracking.viewProduct())
</script>

<template>
  <section class="mx-auto grid w-full max-w-5xl flex-1 items-start gap-10 px-6 pt-6 pb-12 md:grid-cols-2 md:gap-16 md:pt-12 md:pb-16">
    <div class="flex flex-col gap-3 md:sticky md:top-8">
      <div class="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <img
          :src="mainImage"
          :alt="mainImageAlt"
          width="1200"
          height="960"
          fetchpriority="high"
          class="aspect-[5/4] w-full origin-[55%_50%] scale-[1.12] object-cover"
        >
      </div>
      <p class="text-xs text-stone-500">
        Pictured: a sample from the range. For a Bespoke painting, we email you after you order to ask for your idea and any reference images, and send you a photo preview to approve before it ships.
      </p>
    </div>

    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-5xl font-bold tracking-display text-stone-900 md:text-6xl">
          {{ product.name }}
        </h1>
        <p class="max-w-md text-lg text-stone-600">
          {{ product.tagline }}
        </p>
      </div>

      <div class="flex flex-col gap-5">
        <p v-if="chosenPainting" class="text-sm text-stone-900" aria-live="polite">
          <span class="font-bold">{{ chosenPainting.title }}</span>
          <span class="text-stone-500">, {{ chosenPainting.artist }}</span>
        </p>
        <fieldset v-for="name in optionNames" :key="name" class="flex flex-col gap-2">
          <legend class="mb-2 text-sm font-bold text-stone-900">
            {{ optionLabels[name] }}
          </legend>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="value in productOptions[name]"
              :key="value"
              class="relative inline-flex cursor-pointer items-center rounded-md border-[1.5px] border-stone-900 px-4 py-2 text-sm transition-colors duration-150 has-checked:border-accent has-checked:bg-accent has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
            >
              <input
                v-model="selection[name]"
                type="radio"
                :name="name"
                :value="value"
                class="sr-only"
              >
              {{ value }}
            </label>
          </div>
        </fieldset>
      </div>

      <div class="flex flex-col gap-4">
        <p class="flex items-baseline gap-3">
          <span class="text-2xl font-semibold text-stone-900" aria-live="polite">{{ formatPrice(price) }}</span>
          <span class="text-sm text-stone-500">{{ product.shipping }}</span>
        </p>
        <p v-if="isBespoke" class="max-w-md text-sm leading-relaxed text-stone-900">
          After you pay, email your reference photo to hello@cavalletto.com.au from the address you ordered with. We'll confirm your order and send a photo preview to approve before it ships.
        </p>
        <div v-if="isBespoke" class="flex flex-col gap-2">
          <label for="brief" class="text-sm font-bold text-stone-900">Describe your painting</label>
          <textarea
            id="brief"
            v-model="brief"
            name="brief"
            rows="4"
            required
            :maxlength="BRIEF_MAX"
            aria-describedby="brief-help"
            class="w-full rounded-md border-[1.5px] border-stone-900 bg-transparent px-4 py-3 text-base leading-relaxed text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <p id="brief-help" class="flex justify-between gap-4 text-sm text-stone-500">
            <span>Tell us any specific requirements, and email your reference photo to hello@cavalletto.com.au</span>
            <span aria-hidden="true">{{ brief.length }}/{{ BRIEF_MAX }}</span>
          </p>
        </div>
        <PreorderButton
          :selection="selection"
          :price="price"
          :painting-id="chosenPainting?.id"
          :brief="isBespoke ? brief : undefined"
          :disabled="briefMissing"
        />
        <p class="max-w-md text-base leading-relaxed text-stone-900">
          A painting makes a home feel like yours. Ours are hand-painted in oil, to order, from a small range of classics or your own idea. They cost more than a print and less than an original. Look closely and the brushwork shows.
        </p>
      </div>

      <section aria-labelledby="delivery-heading" class="flex flex-col gap-2">
        <h2 id="delivery-heading" class="text-xl font-bold tracking-display text-stone-900">
          Delivery
        </h2>
        <p class="max-w-md text-base leading-relaxed text-stone-900">
          Free delivery within Australia. Unframed paintings are posted rolled, so you'll need to stretch and frame them locally before hanging. A local framer, or a staple gun and a stretcher frame, will do it. You approve a photo preview before your painting ships.
        </p>
      </section>
    </div>
  </section>

  <section v-if="showRange" aria-labelledby="range-heading" class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-12 md:pb-16">
    <h2 id="range-heading" class="text-3xl font-bold tracking-display text-stone-900">
      The range
    </h2>
    <fieldset>
      <legend class="sr-only">Choose a painting</legend>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <label
          v-for="painting in paintings"
          :key="painting.id"
          class="flex cursor-pointer flex-col gap-3 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
        >
          <input
            v-model="paintingId"
            type="radio"
            name="painting"
            :value="painting.id"
            class="sr-only"
          >
          <span
            class="overflow-hidden rounded-2xl border border-stone-200 bg-white"
            :class="painting.id === paintingId ? 'outline-2 outline-offset-2 outline-accent' : ''"
          >
            <img
              :src="painting.image"
              :alt="painting.imageAlt"
              width="600"
              height="600"
              loading="lazy"
              class="aspect-square w-full object-contain"
            >
          </span>
          <span class="flex flex-col">
            <span class="text-sm font-bold text-stone-900">{{ painting.title }}</span>
            <span class="text-sm text-stone-500">{{ painting.artist }}</span>
          </span>
        </label>
      </div>
    </fieldset>
  </section>
</template>
