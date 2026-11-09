<script setup lang="ts">
import { paintings, collection, feels, type Feel } from '#shared/catalogue'
import { store, formatPrice, catalogue } from '#shared/store'

const fromPrice = Math.min(...catalogue.filter(item => item.style === 'Curated').map(item => item.price))

const filter = ref<Feel | 'all'>('all')
const filters = [['all', 'All'], ...Object.entries(feels)] as [Feel | 'all', string][]
const shown = computed(() =>
  filter.value === 'all' ? paintings : paintings.filter(painting => painting.feel === filter.value),
)

const DESCRIPTION = `${collection.intro} From ${formatPrice(fromPrice)}, with free delivery across Australia.`

useSeoMeta({
  title: collection.name,
  description: DESCRIPTION,
  ogTitle: `${collection.name} · ${store.company.name}`,
  ogDescription: DESCRIPTION,
  ogImage: paintings[0]?.image,
})
</script>

<template>
  <section class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pt-6 pb-12 md:pt-12 md:pb-16">
    <div class="flex flex-col gap-4">
      <h1 class="text-5xl font-bold tracking-display text-balance text-stone-900 md:text-6xl">
        {{ collection.name }}
      </h1>
      <p class="max-w-xl text-lg leading-relaxed text-stone-900">
        {{ collection.intro }} Two sizes, rolled or framed, from {{ formatPrice(fromPrice) }}.
      </p>
      <p class="max-w-xl text-base leading-relaxed text-stone-900">
        Looking for something else?
        <NuxtLink to="/?style=bespoke" class="font-bold text-accent underline underline-offset-2">Order a bespoke painting</NuxtLink>
        of anything you like.
      </p>
    </div>

    <fieldset class="flex flex-wrap gap-2">
      <legend class="sr-only">Filter by feel</legend>
      <label
        v-for="[value, label] in filters"
        :key="value"
        class="cursor-pointer rounded-md border-[1.5px] border-stone-900 px-4 py-2 text-sm transition-colors duration-150 has-checked:border-accent has-checked:bg-accent has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
      >
        <input v-model="filter" type="radio" name="feel" :value="value" class="sr-only">
        {{ label }}
      </label>
    </fieldset>

    <ul class="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
      <li v-for="painting in shown" :key="painting.id">
        <NuxtLink
          :to="`/paintings/${painting.id}`"
          class="flex flex-col gap-3 rounded-md"
        >
          <PaintingFigure :painting="painting" />
          <span class="text-sm font-bold text-accent underline underline-offset-2">Choose this painting</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
