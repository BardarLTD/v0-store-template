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
  <ul class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
    <li
      v-for="({ shot, painting }, index) in items"
      :key="shot.id"
      :class="index === 0 ? 'col-span-2 md:row-span-2' : ''"
    >
      <figure class="group flex flex-col gap-2">
        <button
          type="button"
          class="block overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          :aria-label="`Choose ${painting.title} by ${painting.artist}`"
          @click="emit('choose', painting.id)"
        >
          <img
            :src="shot.image"
            :alt="shot.alt"
            width="1024"
            height="1024"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            class="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          >
        </button>
        <figcaption class="flex flex-col text-sm leading-snug text-stone-900">
          <span class="text-xs text-stone-500">{{ shot.room }}</span>
          <span>
            <span class="font-serif font-bold italic">{{ painting.title }}</span>,
            {{ painting.artist }}
          </span>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>
