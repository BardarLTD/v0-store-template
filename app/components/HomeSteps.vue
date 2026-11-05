<script setup lang="ts">
const steps = [
  {
    title: 'Choose',
    body: 'Pick a painting from Collection one, or send us your own. Then choose a size and whether it comes rolled or framed.',
  },
  {
    title: 'Approve',
    body: 'A trained painter at our partner studio copies it by hand in oil. We email you a photo of the finished canvas to approve before it ships.',
  },
  {
    title: 'Hang',
    body: 'It arrives about three weeks after you order, with free delivery anywhere in Australia.',
  },
]
</script>

<template>
  <section aria-labelledby="steps-heading" class="w-full bg-accent text-cream">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
      <h2 id="steps-heading" class="max-w-xl text-3xl font-bold tracking-display text-balance text-cream md:text-4xl">
        A real painting, without the gallery prices.
      </h2>
      <ol class="grid gap-8 md:grid-cols-3 md:gap-10">
        <li v-for="(step, index) in steps" :key="step.title" class="flex flex-col gap-3 border-t-[1.5px] border-cream/30 pt-5">
          <p class="flex items-baseline gap-3">
            <span class="font-serif text-sm opacity-70">{{ index + 1 }}</span>
            <span class="font-serif text-2xl font-bold">{{ step.title }}</span>
          </p>
          <p class="max-w-xs text-base leading-relaxed opacity-90">
            {{ step.body }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
