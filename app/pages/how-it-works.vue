<script setup lang="ts">
import { store } from '#shared/store'

useSeoMeta({ title: `How it works · ${store.company.name}` })

const STEPS = [
  {
    title: 'You order',
    text: 'Choose your size, style and frame, and pay at checkout. For a bespoke painting, email your reference photo to hello@cavalletto.com.au after you pay.',
    time: 'DAY 0',
  },
  {
    title: 'We paint it',
    text: 'Your painting is made to order, by hand, in oil.',
    time: '1 TO 2 WEEKS',
  },
  {
    title: 'You see a preview',
    text: 'We send you a photo of your finished painting before it ships. Approve it, or tell us what to change.',
    time: 'AT THE END OF WEEK 1 TO 2',
    highlight: true,
  },
  {
    title: 'We ship it',
    text: 'Once you approve your preview, we ship within 2 to 3 business days.',
    time: '2 TO 3 BUSINESS DAYS',
  },
  {
    title: 'It arrives',
    text: "Free delivery within Australia. Unframed paintings arrive rolled, so you'll need to stretch and frame them locally before hanging.",
    time: 'ABOUT 1 TO 2 WEEKS',
  },
]
</script>

<template>
  <article class="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pt-6 pb-14 md:pt-12 md:pb-24">
    <header class="flex flex-col gap-3">
      <h1 class="text-4xl font-bold tracking-display text-stone-900 text-balance">
        How it works
      </h1>
      <p class="text-base leading-relaxed text-stone-700 text-pretty">
        Every painting is made to order. Here is what happens after you buy.
      </p>
    </header>

    <ol class="relative flex flex-col gap-6 lg:grid lg:grid-cols-5 lg:gap-4">
      <span aria-hidden="true" class="absolute top-5 bottom-5 left-5 w-[1.5px] -translate-x-1/2 bg-stone-900 lg:hidden" />
      <span aria-hidden="true" class="absolute top-5 right-[10%] left-[10%] hidden h-[1.5px] -translate-y-1/2 bg-stone-900 lg:block" />

      <li
        v-for="(step, index) in STEPS"
        :key="step.title"
        class="relative flex items-start gap-4 lg:flex-col lg:items-center"
      >
        <span
          aria-hidden="true"
          class="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white"
        >
          {{ index + 1 }}
        </span>
        <div
          class="flex w-full flex-1 flex-col gap-2 rounded-sm bg-card p-5 text-left"
          :class="step.highlight ? 'border-2 border-accent' : 'border-[1.5px] border-stone-900'"
        >
          <span class="sr-only">Step {{ index + 1 }}:</span>
          <span
            v-if="step.highlight"
            class="w-fit rounded-sm bg-terracotta px-2 py-0.5 text-xs font-bold tracking-widest text-white"
          >
            YOU APPROVE
          </span>
          <h2 class="text-lg font-bold text-stone-900 text-balance">
            {{ step.title }}
          </h2>
          <p class="text-sm leading-relaxed text-stone-700">
            {{ step.text }}
          </p>
          <p class="mt-auto pt-2 text-xs font-bold tracking-widest text-stone-900">
            {{ step.time }}
          </p>
        </div>
      </li>
    </ol>

    <section aria-labelledby="total-heading" class="flex flex-col gap-2 rounded-sm border-[1.5px] border-stone-900 bg-card p-6">
      <h2 id="total-heading" class="text-xl font-bold text-stone-900">
        How long in total
      </h2>
      <p class="text-base leading-relaxed text-stone-700">
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
