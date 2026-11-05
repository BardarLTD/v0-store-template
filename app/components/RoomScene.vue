<script setup lang="ts">
import type { FrameStyle } from '#shared/store'
import type { Room } from '#shared/rooms'

const props = defineProps<{
  room: Room
  src: string
  alt: string
  widthCm: number
  heightCm: number
  frame?: FrameStyle
}>()

/** Moulding width in cm; a rolled painting is shown stretched, with no frame. */
const FRAME_CM = 4

const placement = computed(() => {
  const border = props.frame ? FRAME_CM : 0
  const outerW = props.widthCm + border * 2
  const outerH = props.heightCm + border * 2
  const k = props.room.cmToPercent
  // The photo is square, so a percentage of its width equals the same share of its height.
  return {
    box: {
      left: `${props.room.hang.x - (outerW * k) / 2}%`,
      top: `${props.room.hang.y - outerH * k}%`,
      width: `${outerW * k}%`,
      height: `${outerH * k}%`,
    },
    canvas: {
      left: `${(border / outerW) * 100}%`,
      top: `${(border / outerH) * 100}%`,
      width: `${(props.widthCm / outerW) * 100}%`,
      height: `${(props.heightCm / outerH) * 100}%`,
    },
  }
})
</script>

<template>
  <figure class="relative aspect-square w-full overflow-hidden rounded-2xl bg-sunk">
    <img
      :src="room.image"
      :alt="room.alt"
      width="1024"
      height="1024"
      fetchpriority="high"
      class="absolute inset-0 size-full object-cover"
    >
    <div
      class="hung absolute transition-all duration-500 ease-out motion-reduce:transition-none"
      :style="{ ...placement.box, backgroundImage: frame?.moulding }"
    >
      <img
        :src="src"
        :alt="alt"
        class="absolute max-w-none object-cover transition-all duration-500 ease-out motion-reduce:transition-none"
        :style="placement.canvas"
      >
    </div>
  </figure>
</template>

<style scoped>
/* A cast shadow on the wall, so the painting sits in the photo rather than on top of it. */
.hung {
  filter: drop-shadow(0.4em 0.6em 0.5em rgb(20 14 8 / 0.35));
}
</style>
