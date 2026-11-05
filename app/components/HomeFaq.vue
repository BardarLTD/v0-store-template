<script setup lang="ts">
import { faqs } from '#shared/faqs'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  <section id="faq" aria-labelledby="faq-heading" class="mx-auto grid w-full max-w-5xl gap-8 px-6 md:grid-cols-12 md:gap-16">
    <div class="flex flex-col gap-3 md:col-span-4">
      <h2 id="faq-heading" class="text-4xl font-bold tracking-display text-balance">
        Questions
      </h2>
      <p class="text-base leading-relaxed text-pretty">
        Something not covered? Email
        <a href="mailto:hello@cavalletto.com.au" class="underline underline-offset-2">hello@cavalletto.com.au</a>
        and you&apos;ll hear back from us in Sydney.
      </p>
    </div>
    <div class="flex flex-col md:col-span-8">
      <details
        v-for="item in faqs"
        :key="item.question"
        class="group border-b-[1.5px] border-line first:border-t-[1.5px]"
      >
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
          {{ item.question }}
          <span aria-hidden="true" class="shrink-0 text-2xl leading-none font-normal transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
        </summary>
        <p class="max-w-2xl pb-5 text-base leading-relaxed text-pretty">
          {{ item.answer }}
        </p>
      </details>
    </div>
  </section>
</template>
