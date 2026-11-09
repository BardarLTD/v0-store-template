<script setup lang="ts">
import type { LookbookShot } from '#shared/lookbook'
import type { Painting } from '#shared/catalogue'
import { curatedLowPrice, formatWholePrice } from '#shared/painting-options'

defineProps<{
  shot: LookbookShot
  painting: Painting
}>()
</script>

<template>
  <section aria-labelledby="hero-heading" class="mx-auto grid w-full max-w-5xl items-center gap-7 px-6 pt-6! pb-0! md:pt-10! lg:grid-cols-12 lg:gap-12">
    <div class="flex flex-col gap-6 lg:col-span-6">
      <div class="flex flex-col gap-4 md:gap-5">
        <h1 id="hero-heading" class="max-w-2xl text-4xl leading-[1.08] font-bold tracking-display text-balance md:text-6xl lg:text-5xl xl:text-[3.5rem]">
          Famous paintings, hand-painted in oil for your home.
        </h1>
        <p class="max-w-md text-base leading-relaxed text-pretty md:text-lg">
          Choose one of 18 classics, or send us a painting you love. A trained painter copies it by hand in oil on real canvas.
        </p>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <NuxtLink
          to="/collection"
          class="inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 font-bold text-cream transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active md:w-auto"
        >
          Choose your painting
        </NuxtLink>
        <span class="text-center text-sm md:text-left">From {{ formatWholePrice(curatedLowPrice) }} · Free delivery in Australia</span>
      </div>
    </div>

    <figure class="-mx-6 flex flex-col gap-2 md:mx-0 lg:col-span-6">
      <img
        :src="shot.image"
        :alt="shot.alt"
        :width="shot.width"
        :height="shot.height"
        loading="eager"
        fetchpriority="high"
        class="h-[300px] w-full object-cover object-[50%_22%] md:h-auto md:aspect-[3/2] md:rounded-md lg:aspect-[6/7]"
      >
      <figcaption class="px-6 text-xs md:px-0">
        On the wall:
        <NuxtLink :to="`/paintings/${painting.id}`" class="underline-offset-2 hover:underline">
          <span class="font-serif font-bold italic">{{ painting.title }}</span>, {{ painting.artist }}
        </NuxtLink>
      </figcaption>
    </figure>
  </section>
</template>
