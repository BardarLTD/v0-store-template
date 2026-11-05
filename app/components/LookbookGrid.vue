<script setup lang="ts">
import { findPainting } from '#shared/catalogue'
import type { LookbookShot } from '#shared/lookbook'

const props = defineProps<{ shots: LookbookShot[] }>()
const emit = defineEmits<{ choose: [paintingId: string] }>()

const items = computed(() =>
  props.shots.flatMap((shot) => {
    const painting = findPainting(shot.paintingId)
    return painting ? [{ shot, painting }] : []
  }),
)
</script>

<template>
  <ul class="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
    <li
      v-for="({ shot, painting }, index) in items"
      :key="shot.id"
      :class="index === 0 ? 'col-span-2' : ''"
    >
      <figure class="group flex flex-col gap-2">
        <button
          type="button"
          class="relative block overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          :class="index === 0 ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[4/5]'"
          :aria-label="`Choose ${painting.title} by ${painting.artist}`"
          @click="emit('choose', painting.id)"
        >
          <img
            :src="shot.image"
            :alt="shot.alt"
            width="1024"
            height="1024"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 ease-key group-hover:scale-[1.03] motion-reduce:transition-none"
          >
          <span
            aria-hidden="true"
            class="absolute right-3 bottom-3 rounded-md bg-cream px-3 py-1.5 text-xs font-bold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Choose this painting
          </span>
        </button>
        <figcaption class="flex items-baseline justify-between gap-3 text-sm leading-snug">
          <span>
            <span class="font-serif font-bold italic">{{ painting.title }}</span>
            <span class="text-xs">, {{ painting.artist }}</span>
          </span>
          <span class="hidden shrink-0 text-xs opacity-70 md:inline">{{ shot.room }}</span>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>
