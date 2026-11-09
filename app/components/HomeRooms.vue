<script setup lang="ts">
import { findPainting } from '#shared/catalogue'
import { localSrcset } from '#shared/srcset'

const rooms = [
  { paintingId: 'af-klint-ten-largest-no-7', room: 'Living room, overcast afternoon' },
  { paintingId: 'van-gogh-almond-blossom', room: 'Nursery, morning' },
  { paintingId: 'whistler-nocturne-blue-and-gold', room: 'Lounge, evening' },
  { paintingId: 'klee-castle-and-sun', room: 'Dining corner, morning' },
  { paintingId: 'gallen-kallela-lake-keitele', room: 'Bedroom, overcast' },
]

const items = rooms.flatMap(({ paintingId, room }) => {
  const painting = findPainting(paintingId)
  return painting ? [{ painting, room }] : []
})
</script>

<template>
  <section aria-labelledby="rooms-heading" class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 md:gap-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <h2 id="rooms-heading" class="text-3xl font-bold tracking-display text-balance md:text-5xl">
        How they look at home.
      </h2>
      <p class="max-w-sm text-base leading-relaxed text-pretty">
        <span class="md:hidden">Swipe the rooms. Tap one to choose its painting.</span>
        <span class="hidden md:inline">Tap a room to choose the painting in it.</span>
      </p>
    </div>

    <ul class="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-8 md:overflow-visible md:px-0">
      <li
        v-for="({ painting, room }, index) in items"
        :key="painting.id"
        class="w-[290px] shrink-0 snap-start md:w-auto"
        :class="index === 0 ? 'md:col-span-2' : ''"
      >
        <NuxtLink
          :to="`/paintings/${painting.id}`"
          class="group flex flex-col gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            class="relative block aspect-[4/5] overflow-hidden rounded-md"
            :class="index === 0 ? 'md:aspect-[16/9]' : 'md:aspect-square'"
          >
            <img
              :src="painting.roomImage"
              :srcset="localSrcset(painting.roomImage)"
              :sizes="index === 0 ? '(min-width: 1200px) 1152px, (min-width: 768px) 100vw, 290px' : '(min-width: 1200px) 566px, (min-width: 768px) 50vw, 290px'"
              :alt="`${painting.title} by ${painting.artist}, shown on the wall of a ${room.split(',')[0]?.toLowerCase()} (mock-up)`"
              width="1080"
              height="1350"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-700 ease-key group-hover:scale-[1.03] motion-reduce:transition-none"
              :class="index === 0 ? 'md:object-[50%_38%]' : ''"
            >
            <span
              aria-hidden="true"
              class="absolute right-3 bottom-3 hidden rounded-md bg-cream px-3 py-1.5 text-xs font-bold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
            >
              Choose this painting
            </span>
          </span>
          <span class="flex flex-col gap-0.5 leading-snug">
            <span class="font-serif text-lg font-bold italic">{{ painting.title }}</span>
            <span class="text-sm">{{ room }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
