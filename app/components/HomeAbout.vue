<script setup lang="ts">
import { store } from '#shared/store'

const { company, product } = store
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
        A recent commission, photographed at the studio before framing. Real photo, not a mock-up.
      </figcaption>
    </figure>

    <div class="flex flex-col gap-6 md:col-span-7">
      <h2 id="about-heading" class="text-4xl font-bold tracking-display text-balance md:text-5xl">
        Run from Sydney, painted by specialists in China.
      </h2>
      <div class="flex max-w-lg flex-col gap-4 text-base leading-relaxed text-pretty">
        <p>
          I&apos;m Tom, and I run Cavalletto from Darlinghurst in Sydney. I choose the paintings and look after every order. If you email, you&apos;ll get me.
        </p>
        <p>
          The painting is done by a studio of trained artists in China that I work with directly. Copying classic paintings in oil is their speciality, and they&apos;ve been doing it for years. Working with them is how I can sell a hand-painted oil from A$300. I check every canvas against the original before you see your preview.
        </p>
      </div>
      <ul class="flex flex-col gap-2 border-t-[1.5px] border-line pt-5 text-sm [&_.font-bold]:mr-1">
        <li>
          <span class="font-bold">Email:</span>
          <a :href="`mailto:${company.email}`" class="underline underline-offset-2">{{ company.email }}</a>
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
