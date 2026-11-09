<script setup lang="ts">
import type { Painting } from '#shared/catalogue'

defineProps<{
  painting: Painting
  summary: string
  visible: boolean
  pending: boolean
}>()

defineEmits<{ buy: [] }>()
</script>

<template>
  <div
    class="bar-shadow fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-cream pb-[env(safe-area-inset-bottom)] transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden"
    :class="visible ? 'translate-y-0' : 'translate-y-full'"
    :inert="!visible"
    :aria-hidden="!visible"
  >
    <div class="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
      <img
        :src="painting.image"
        alt=""
        width="40"
        height="40"
        loading="lazy"
        class="size-10 shrink-0 rounded-sm bg-sunk object-contain"
      >
      <div class="flex min-w-0 flex-1 flex-col">
        <span class="truncate font-serif font-bold italic">{{ painting.title }}</span>
        <span class="truncate text-sm">{{ summary }}</span>
      </div>
      <button
        type="button"
        class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-accent px-6 font-bold text-white transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active disabled:cursor-progress disabled:opacity-70"
        :disabled="pending"
        @click="$emit('buy')"
      >
        Buy
      </button>
    </div>
  </div>
</template>
