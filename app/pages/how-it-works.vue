<script setup lang="ts">
import { store } from '#shared/store'

useSeoMeta({ title: `How it works · ${store.company.name}` })

const STEPS = [
  {
    title: 'You order',
    text: 'Choose your size, style and frame, and pay at checkout. For a bespoke painting, email your reference photo to hello@cavalletto.com.au after you pay.',
    time: 'Day 0',
  },
  {
    title: 'We paint it',
    text: 'Your painting is made to order, by hand, in oil.',
    time: '1 to 2 weeks',
  },
  {
    title: 'You see a preview',
    text: 'We send you a photo of your finished painting before it ships. Approve it, or tell us what to change.',
    time: 'At the end of week 1 to 2',
    highlight: true,
  },
  {
    title: 'We ship it',
    text: 'Once you approve your preview, we ship within 2 to 3 business days.',
    time: '2 to 3 business days',
  },
  {
    title: 'It arrives',
    text: "Free delivery within Australia. Unframed paintings arrive rolled, so you'll need to stretch and frame them locally before hanging.",
    time: 'About 1 to 2 weeks',
  },
]
</script>

<template>
  <article class="mx-auto flex w-full max-w-2xl flex-col gap-14 px-6 pt-6 pb-14 md:pt-12 md:pb-24">
    <header class="flex flex-col gap-3">
      <h1 class="text-4xl font-bold tracking-display text-stone-900 text-balance">
        How it works
      </h1>
      <p class="text-base leading-relaxed text-stone-700 text-pretty">
        Every painting is made to order. Here is what happens after you buy.
      </p>
    </header>

    <ol class="flex flex-col">
      <li
        v-for="(step, index) in STEPS"
        :key="step.title"
        class="relative flex gap-6"
      >
        <span
          v-if="index < STEPS.length - 1"
          aria-hidden="true"
          class="absolute top-4 bottom-0 left-[5px] w-[1.5px] bg-stone-900"
        />
        <span
          aria-hidden="true"
          class="relative mt-1.5 size-3 shrink-0 rounded-full border-[1.5px]"
          :class="step.highlight ? 'border-terracotta bg-terracotta' : 'border-stone-900 bg-background'"
        />
        <div class="flex flex-col gap-1 pb-10">
          <p class="text-sm italic text-stone-700">
            <span class="sr-only">Step {{ index + 1 }}, </span>{{ step.time }}
          </p>
          <h2 class="text-xl font-bold text-stone-900 text-balance">
            {{ step.title }}
          </h2>
          <p class="text-base leading-relaxed text-stone-700 text-pretty">
            {{ step.text }}
          </p>
        </div>
      </li>
    </ol>

    <section aria-labelledby="total-heading" class="flex flex-col gap-2 border-t-[1.5px] border-stone-900 pt-8">
      <h2 id="total-heading" class="text-xl font-bold text-stone-900">
        How long in total
      </h2>
      <p class="text-base leading-relaxed text-stone-700 text-pretty">
        About 2 to 4 weeks from order to your door. The time you take to approve your preview is on top of that.
      </p>
    </section>

    <section aria-labelledby="preview-heading" class="flex flex-col gap-3">
      <h2 id="preview-heading" class="text-xl font-bold text-stone-900">
        The preview
      </h2>
      <p class="text-base leading-relaxed text-stone-700 text-pretty">
        You see your painting before it ships. If something is off, tell us what to change and we&apos;ll work with you to put it right. Once you approve it, it ships.
      </p>
      <NuxtLink to="/returns" class="w-fit text-accent underline underline-offset-2">
        Read our Pre-order &amp; Refund Policy
      </NuxtLink>
    </section>

    <div>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3.5 text-base font-bold text-white transition-colors duration-150 ease-key hover:bg-accent-hover active:bg-accent-active"
      >
        Back to the painting
      </NuxtLink>
    </div>
  </article>
</template>
