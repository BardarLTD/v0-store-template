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
  <section class="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-16">
    <div class="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <img
        :src="mainImage"
        :alt="mainImageAlt"
        width="1200"
        height="1200"
        fetchpriority="high"
        class="aspect-square w-full object-contain"
      >
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
        <PreorderButton :selection="selection" :price="price" :painting-id="chosenPainting?.id" />
        <p class="text-xs text-stone-500">
          Pictured: a sample from the range. For a Bespoke painting, we email you after you order to ask for your idea and any reference images, and send you a photo preview to approve before it ships.
        </p>
      </div>
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
