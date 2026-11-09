<script setup lang="ts">
const STEPS = [
  { time: 'Day 1', title: 'You order' },
  { time: 'Weeks 1 and 2', title: 'We paint it' },
  { time: 'End of week 2', title: 'You see a preview' },
  { time: 'Around week 3', title: 'It arrives' },
]
</script>

<template>
  <ol class="flex flex-col">
    <li v-for="(step, index) in STEPS" :key="step.title" class="flex gap-4">
      <div class="flex flex-col items-center" aria-hidden="true">
        <span class="mt-1.5 size-3 shrink-0 rounded-full bg-accent" />
        <span v-if="index < STEPS.length - 1" class="w-px flex-1 bg-line" />
      </div>
      <div class="flex flex-col gap-0.5 pb-6">
        <span class="text-xs font-bold tracking-label uppercase">{{ step.time }}</span>
        <span class="font-serif text-lg font-bold">{{ step.title }}</span>
      </div>
    </li>
  </ol>
</template>
