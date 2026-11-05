<script setup lang="ts">
import { store } from '#shared/store'

const { company, product } = store
const phoneHref = `tel:+61${company.phone.replace(/\s/g, '').replace(/^0/, '')}`
</script>

<template>
  <section aria-labelledby="about-heading" class="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 md:grid-cols-12 md:gap-16">
    <figure class="flex flex-col gap-2 md:col-span-5">
      <img
        :src="product.image"
        :alt="product.imageAlt"
        width="1200"
        height="960"
        loading="lazy"
        class="aspect-[4/5] w-full rounded-md object-cover"
      >
      <figcaption class="text-xs leading-relaxed">
        A recent commission, photographed in the studio before framing. Real photo, not a mock-up.
      </figcaption>
    </figure>

    <div class="flex flex-col gap-6 md:col-span-7">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-bold uppercase tracking-label text-terracotta">
          Who we are
        </p>
        <h2 id="about-heading" class="text-4xl font-bold tracking-display text-balance md:text-5xl">
          A small Sydney business, with real painters behind it.
        </h2>
      </div>
      <div class="flex max-w-lg flex-col gap-4 text-base leading-relaxed text-pretty">
        <p>
          Cavalletto is run from Darlinghurst in Sydney. We choose the paintings, look after every order and answer every email ourselves.
        </p>
        <p>
          The painting itself is done by a studio of trained artists in China we work with directly. They have spent years copying the classics in oil, and it&apos;s how we keep the price well under what an original costs. Every canvas is checked against the reference before you see your preview.
        </p>
      </div>
      <ul class="flex flex-col gap-2 border-t-[1.5px] border-line pt-5 text-sm [&_.font-bold]:mr-1">
        <li>
          <span class="font-bold">Email:</span>
          <a :href="`mailto:${company.email}`" class="underline underline-offset-2">{{ company.email }}</a>
        </li>
        <li>
          <span class="font-bold">Phone:</span>
          <a :href="phoneHref" class="underline underline-offset-2">{{ company.phone }}</a>
        </li>
        <li>
          <span class="font-bold">Instagram:</span>
          <a :href="company.instagram" target="_blank" rel="noopener" class="underline underline-offset-2">@cavallettoart</a>
        </li>
        <li>
          <span class="font-bold">Business:</span>
          {{ company.legalName }}, {{ company.registration }}
        </li>
      </ul>
    </div>
  </section>
</template>
