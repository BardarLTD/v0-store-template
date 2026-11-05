<script setup lang="ts">
useSeoMeta({
  title: 'How Our Paintings Are Made and Delivered',
  description: 'From order to your wall in about 3 weeks: painted by hand, a photo preview, then free delivery across Australia.',
})

const STEPS = [
  {
    title: 'You order',
    text: 'Choose your painting, size and finish, then pay at checkout. For a bespoke painting, email the image you want painted to hello@cavalletto.com.au after you pay.',
    time: 'Day 1',
  },
  {
    title: 'We paint it',
    text: 'A trained painter at our partner studio paints your canvas by hand in oil, starting from a blank canvas.',
    time: 'Week 1 to 2',
  },
  {
    title: 'You see a preview',
    text: 'We email you a photo of your finished painting. Approve it, or tell us what to change.',
    time: 'End of week 2',
    highlight: true,
  },
  {
    title: 'It arrives',
    text: 'We ship within 3 business days of your approval, free within Australia. Rolled paintings come in a tube, so a framer will need to stretch and frame them before you hang them.',
    time: 'Around week 3',
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
        We paint every canvas after you order. Here&apos;s what happens once you buy.
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
        About 3 weeks from order to your door, plus however long you take to approve the preview.
      </p>
    </section>

    <section aria-labelledby="preview-heading" class="flex flex-col gap-3">
      <h2 id="preview-heading" class="text-xl font-bold text-stone-900">
        The preview
      </h2>
      <p class="text-base leading-relaxed text-stone-700 text-pretty">
        Nothing ships until you&apos;ve seen it. If something looks off, tell us what to change and we&apos;ll work with you to fix it. Once you approve the photo, it ships within 3 business days.
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
