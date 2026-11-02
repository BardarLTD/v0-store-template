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

const { company, product } = store

const optionNames = Object.keys(productOptions) as OptionName[]
const selection = reactive<Selection>({ ...defaultSelection })
const price = computed(() => priceFor(selection) ?? product.price)

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
        :src="product.image"
        :alt="product.imageAlt"
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
        <PreorderButton :selection="selection" :price="price" />
        <p class="text-xs text-stone-500">
          Pictured: a sample from the range. For a Bespoke painting, we email you after you order to ask for your idea and any reference images, and send you a photo preview to approve before it ships.
        </p>
      </div>
    </div>
  </section>
</template>
