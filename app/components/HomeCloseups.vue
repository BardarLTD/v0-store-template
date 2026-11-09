<script setup lang="ts">
import { store } from '#shared/store'
import { cloudinarySrcset } from '#shared/srcset'

const { product } = store

// The close-ups are crops of the commission photo, so they are only ~350px wide.
// Swap in larger close-up photos (with -480/-768/-1080 variants) when available.
const closeups = [
  { src: '/closeups/commission-trees.webp', width: 335, height: 334, alt: 'Close-up of thick oil brushstrokes in the trees of a hand-painted landscape' },
  { src: '/closeups/commission-grass.webp', width: 395, height: 334, alt: 'Close-up of layered oil paint in the grass of a hand-painted landscape' },
]
</script>

<template>
  <section aria-labelledby="closeups-heading" class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <h2 id="closeups-heading" class="text-3xl font-bold tracking-display text-balance md:text-5xl">
        Up close, it&apos;s real paint.
      </h2>
      <p class="max-w-sm text-base leading-relaxed text-pretty">
        Close-ups of a recent commission, photographed at the studio before framing. Real photos, not mock-ups.
      </p>
    </div>
    <ul class="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
      <li v-for="shot in closeups" :key="shot.src">
        <img
          :src="shot.src"
          :alt="shot.alt"
          :width="shot.width"
          :height="shot.height"
          loading="lazy"
          decoding="async"
          class="aspect-square w-full rounded-md object-cover"
        >
      </li>
      <li class="hidden md:block">
        <img
          :src="product.image"
          :srcset="cloudinarySrcset(product.image) || undefined"
          sizes="(min-width: 1200px) 384px, 33vw"
          :alt="product.imageAlt"
          width="1080"
          height="1080"
          loading="lazy"
          decoding="async"
          class="aspect-square w-full rounded-md object-cover"
        >
      </li>
    </ul>
  </section>
</template>
