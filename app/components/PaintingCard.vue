<script setup lang="ts">
import type { Painting } from '#shared/catalogue'
import { curatedLowPrice, formatWholePrice } from '#shared/painting-options'
import { localSrcset } from '#shared/srcset'

defineProps<{ painting: Painting }>()
</script>

<template>
  <NuxtLink :to="`/paintings/${painting.id}`" class="group flex flex-col gap-3 rounded-md">
    <span class="flex aspect-square items-center justify-center rounded-md bg-sunk p-5">
      <img
        :src="painting.image"
        :srcset="localSrcset(painting.image, 960)"
        sizes="(min-width: 1200px) 340px, (min-width: 768px) 30vw, 45vw"
        :alt="painting.imageAlt"
        width="600"
        height="600"
        loading="lazy"
        decoding="async"
        class="card-shadow max-h-full max-w-full object-contain"
      >
    </span>
    <span class="flex flex-col gap-0.5">
      <span class="font-serif text-lg leading-snug font-bold italic group-hover:underline">{{ painting.title }}</span>
      <span class="text-sm">{{ painting.artist }}, {{ painting.year }}</span>
      <span class="text-sm font-bold">From {{ formatWholePrice(curatedLowPrice) }}</span>
    </span>
  </NuxtLink>
</template>

<style scoped>
.card-shadow {
  box-shadow:
    0 1px 2px rgb(74 51 34 / 0.22),
    0 8px 18px rgb(74 51 34 / 0.14);
}
</style>
