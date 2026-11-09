<script setup lang="ts">
const PROMISES = [
  {
    icon: 'photo',
    title: 'You approve a photo first',
    text: 'About two weeks in, we email you a photo of your painting. Nothing ships until you say yes.',
  },
  {
    icon: 'truck',
    title: 'Shipped straight to your door',
    text: 'Once you approve the preview, we ship it straight to your door, where it should arrive within 1–2 weeks. Delivery is free.',
  },
  {
    icon: 'brush',
    title: 'Painted from scratch',
    text: 'By hand, in oil, on real canvas. Up close you can see the brushstrokes.',
  },
] as const
</script>

<template>
  <ul class="flex flex-col gap-5 rounded-md bg-sunk p-5">
    <li v-for="item in PROMISES" :key="item.title" class="flex gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mt-0.5 size-5 shrink-0 text-terracotta"
      >
        <template v-if="item.icon === 'photo'">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="m21 16-5-5-8 8" />
        </template>
        <template v-else-if="item.icon === 'truck'">
          <path d="M3 6h11v10H3z" />
          <path d="M14 10h4l3 3v3h-7" />
          <circle cx="7" cy="17.5" r="1.5" />
          <circle cx="17" cy="17.5" r="1.5" />
        </template>
        <template v-else>
          <path d="M14 4l6 6-8 8-6-6z" />
          <path d="M6 12l-2 6 6-2" />
        </template>
      </svg>
      <div class="flex flex-col gap-1">
        <span class="font-bold">{{ item.title }}</span>
        <span class="text-sm leading-relaxed">{{ item.text }}</span>
      </div>
    </li>
  </ul>
</template>
