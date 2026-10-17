<script setup lang="ts">
import { store, formatPrice } from '#shared/store'

const { company, product } = store

useSeoMeta({
  title: `${product.name} · ${company.name}`,
  description: product.tagline,
  ogTitle: `${product.name} · ${company.name}`,
  ogDescription: product.tagline,
  ogImage: product.image,
})
</script>

<template>
  <section class="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-16">
    <div class="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <img
        :src="product.image"
        :alt="product.imageAlt"
        width="1200"
        height="1200"
        class="aspect-square w-full object-contain"
      >
    </div>

    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-5xl font-bold tracking-display text-stone-900 md:text-6xl">
          {{ product.name }}
        </h1>
        <p class="max-w-md text-lg text-stone-600">
          {{ product.tagline }}
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <p class="flex items-baseline gap-3">
          <span class="text-2xl font-semibold text-stone-900">{{ formatPrice() }}</span>
          <span class="text-sm text-stone-500">{{ product.shipping }}</span>
        </p>
        <PreorderButton />
        <p class="text-xs text-stone-500">
          You’re charged when you preorder. See our
          <NuxtLink to="/returns" class="underline underline-offset-2 hover:text-stone-900">returns policy</NuxtLink>.
        </p>
      </div>
    </div>
  </section>
</template>
