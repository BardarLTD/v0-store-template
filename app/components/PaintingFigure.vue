<script setup lang="ts">
import type { Painting } from '#shared/catalogue'

defineProps<{ painting: Painting, selected?: boolean }>()
</script>

<template>
  <span
    class="flex aspect-square items-center justify-center rounded-2xl border bg-sunk p-5 transition-colors duration-150"
    :class="selected ? 'border-accent outline-2 outline-offset-2 outline-accent' : 'border-stone-200'"
  >
    <img
      :src="painting.image"
      :alt="painting.imageAlt"
      width="600"
      height="600"
      loading="lazy"
      class="max-h-full max-w-full object-contain"
    >
  </span>
  <span class="flex flex-col gap-1">
    <span class="font-serif text-lg font-bold italic leading-snug text-stone-900">{{ painting.title }}</span>
    <span class="text-sm text-stone-900">{{ painting.artist }}, {{ painting.year }}</span>
    <span class="text-sm leading-relaxed text-stone-900"><span class="font-bold">Suits:</span> {{ painting.suits }}</span>
    <span v-if="selected" class="text-sm font-bold text-accent">Selected</span>
  </span>
</template>
