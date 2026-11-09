<script setup lang="ts">
import { collection, findPainting, type Painting } from '#shared/catalogue'

const featuredIds = [
  'van-gogh-almond-blossom',
  'monet-poppy-field',
  'vermeer-little-street',
  'klimt-music',
  'gallen-kallela-lake-keitele',
  'klee-castle-and-sun',
]

const featured = featuredIds.map(id => findPainting(id)).filter((painting): painting is Painting => Boolean(painting))
</script>

<template>
  <section aria-labelledby="collection-heading" class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 md:gap-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <h2 id="collection-heading" class="text-3xl font-bold tracking-display text-balance md:text-5xl">
        {{ collection.name }}
      </h2>
      <p class="max-w-sm text-base leading-relaxed text-pretty">
        Eighteen classics, picked for how they look in a home. Here are six of them.
      </p>
    </div>
    <ul class="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
      <li v-for="painting in featured" :key="painting.id">
        <PaintingCard :painting="painting" />
      </li>
    </ul>
    <NuxtLink
      to="/collection"
      class="inline-flex w-full items-center justify-center self-center rounded-md border-[1.5px] border-accent px-6 py-3.5 font-bold text-accent transition-colors duration-150 hover:bg-accent hover:text-cream md:w-auto"
    >
      See all 18 paintings
    </NuxtLink>
  </section>
</template>
