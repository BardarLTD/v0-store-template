<script setup lang="ts">
import type { Painting } from '#shared/catalogue'

const props = defineProps<{ painting: Painting }>()

interface View {
  key: 'room' | 'original' | 'closeup'
  label: string
  src: string
  alt: string
}

const views = computed<View[]>(() => {
  const { painting } = props
  const list: View[] = [
    {
      key: 'room',
      label: 'In a room',
      src: painting.roomImage,
      alt: `${painting.title} by ${painting.artist}, hanging in a room. The room is a mock-up.`,
    },
    { key: 'original', label: 'The original', src: painting.image, alt: painting.imageAlt },
  ]
  if (painting.closeUp) {
    list.push({
      key: 'closeup',
      label: 'Close-up',
      src: painting.closeUp,
      alt: `Close-up of the brushstrokes on a hand-painted ${painting.title}`,
    })
  }
  return list
})

const track = ref<HTMLElement | null>(null)
const active = ref(0)

function onScroll() {
  const el = track.value
  if (!el || !el.clientWidth) return
  active.value = Math.round(el.scrollLeft / el.clientWidth)
}

function show(index: number) {
  const el = track.value
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left: index * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  active.value = index
}

watch(() => props.painting.id, () => {
  active.value = 0
  track.value?.scrollTo({ left: 0 })
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="relative">
      <ul
        ref="track"
        class="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Views of the painting"
        @scroll.passive="onScroll"
      >
        <li
          v-for="(view, index) in views"
          :key="view.key"
          class="flex size-full shrink-0 snap-center items-center justify-center bg-sunk"
          :class="view.key === 'original' ? 'p-8' : ''"
          :aria-label="`${index + 1} of ${views.length}: ${view.label}`"
        >
          <img
            :src="view.src"
            :alt="view.alt"
            :width="view.key === 'original' ? 800 : 1080"
            :height="view.key === 'original' ? 800 : 1350"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            :class="view.key === 'original' ? 'soft-shadow max-h-full max-w-full object-contain' : 'size-full object-cover'"
          >
        </li>
      </ul>
      <span
        v-if="views[active]?.key === 'room'"
        class="pointer-events-none absolute top-3 left-3 rounded-sm bg-cream/90 px-2 py-1 text-xs font-bold text-stone-900"
      >
        In a room (mock-up)
      </span>
    </div>

    <div class="flex gap-3 px-6 lg:px-0" role="group" aria-label="Choose a view">
      <button
        v-for="(view, index) in views"
        :key="view.key"
        type="button"
        class="flex w-16 flex-col items-center gap-1 text-xs leading-tight"
        :aria-pressed="active === index"
        @click="show(index)"
      >
        <span
          class="flex size-16 items-center justify-center overflow-hidden rounded-sm border-2 bg-sunk transition-colors duration-150"
          :class="active === index ? 'border-accent' : 'border-transparent'"
        >
          <img
            :src="view.src"
            alt=""
            width="64"
            height="64"
            loading="lazy"
            :class="view.key === 'original' ? 'max-h-12 max-w-12 object-contain' : 'size-full object-cover'"
          >
        </span>
        <span :class="active === index ? 'font-bold' : ''">{{ view.label }}</span>
      </button>
    </div>
  </div>
</template>
