<script setup lang="ts">
import type { LookbookShot } from '#shared/lookbook'
import type { Painting } from '#shared/catalogue'

defineProps<{
  shot: LookbookShot
  painting: Painting
  fromPrice: string
}>()
const emit = defineEmits<{ choose: [paintingId: string] }>()

const promises = [
  'Painted from scratch on canvas',
  'Approve a photo before it ships',
  'Delivered free in about 3 weeks',
  'A Sydney business you can call',
]
</script>

<template>
  <section aria-labelledby="hero-heading" class="mx-auto grid w-full max-w-5xl items-center gap-8 px-6 pt-6! pb-14! md:pt-10! md:pb-20! lg:grid-cols-12 lg:gap-12">
    <div class="flex flex-col gap-7 lg:order-first lg:col-span-6">
      <div class="flex flex-col gap-5">
        <h1 id="hero-heading" class="max-w-2xl text-5xl leading-[1.04] font-bold tracking-display text-balance md:text-6xl lg:text-5xl xl:text-[3.5rem]">
          Famous paintings, hand-painted in oil for your home.
        </h1>
        <p class="max-w-md text-lg leading-relaxed text-pretty">
          Choose one of 18 classics, from Vermeer to van Gogh, or send us a painting you love. A trained painter copies it by hand in oil on real canvas, at the size you pick.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="#order"
          class="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 font-bold text-cream transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active"
        >
          Choose your painting
        </a>
        <span class="text-sm">From {{ fromPrice }}</span>
      </div>

      <ul class="flex flex-col gap-2 border-t-[1.5px] border-line pt-5 text-sm">
        <li v-for="line in promises" :key="line" class="flex items-center gap-3">
          <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-terracotta" />
          {{ line }}
        </li>
      </ul>
    </div>

    <figure class="order-first flex flex-col gap-2 lg:order-last lg:col-span-6">
      <img
        :src="shot.image"
        :alt="shot.alt"
        width="1024"
        height="1024"
        fetchpriority="high"
        class="aspect-[4/5] max-h-[78svh] w-full rounded-md object-cover object-[50%_40%] md:aspect-[3/2] lg:aspect-[6/7]"
      >
      <figcaption class="flex justify-between gap-4 text-xs">
        <span>{{ shot.room }}</span>
        <button
          type="button"
          class="text-right underline-offset-2 hover:underline"
          @click="emit('choose', painting.id)"
        >
          On the wall: <span class="font-serif font-bold italic">{{ painting.title }}</span>
        </button>
      </figcaption>
    </figure>
  </section>
</template>
