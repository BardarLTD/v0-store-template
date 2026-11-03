<script setup lang="ts">
import type { FrameStyle } from '#shared/store'

defineProps<{
  src: string
  alt: string
  frame?: FrameStyle
}>()
</script>

<template>
  <span
    class="inline-flex max-w-full transition-[padding,box-shadow] duration-300 ease-out motion-reduce:transition-none"
    :class="frame ? 'frame-moulding p-3 sm:p-4' : 'p-0'"
    :style="frame ? { backgroundImage: frame.moulding } : undefined"
  >
    <img
      :src="src"
      :alt="alt"
      width="960"
      height="768"
      fetchpriority="high"
      class="block max-h-[30rem] w-auto max-w-full object-contain"
      :class="frame ? 'frame-inner' : ''"
    >
  </span>
</template>

<style scoped>
.frame-moulding {
  box-shadow:
    inset 2px 2px 3px rgb(255 255 255 / 0.35),
    inset -2px -2px 4px rgb(0 0 0 / 0.35),
    0 14px 28px -12px rgb(0 0 0 / 0.45);
}

.frame-inner {
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.35), inset 0 0 6px rgb(0 0 0 / 0.4);
}
</style>
