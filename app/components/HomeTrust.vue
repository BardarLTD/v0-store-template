<script setup lang="ts">
const items = [
  { label: 'Painted from scratch in oil', icon: 'brush' },
  { label: 'Approve a photo before it ships', icon: 'photo' },
  { label: 'Free delivery, about 3 weeks', icon: 'box' },
  { label: 'Run from Darlinghurst, Sydney', icon: 'pin' },
] as const
</script>

<template>
  <section aria-label="Why Cavalletto" class="mx-auto w-full max-w-5xl px-6 pt-8! pb-0! md:pt-12!">
    <ul class="grid grid-cols-2 gap-x-4 gap-y-5 border-y-[1.5px] border-line py-5 text-sm leading-snug md:grid-cols-4 md:py-6">
      <li v-for="item in items" :key="item.label" class="flex items-start gap-2.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          class="mt-px size-5 shrink-0 text-terracotta"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <template v-if="item.icon === 'brush'">
            <path d="M14.5 4.5l5 5L11 18l-5-5z" />
            <path d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5-1 1.5-3.5 1.5-3.5" />
          </template>
          <template v-else-if="item.icon === 'photo'">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <path d="M8 12.5l2.5 2.5L16 9.5" />
          </template>
          <template v-else-if="item.icon === 'box'">
            <path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" />
            <path d="M3 7.5L12 12l9-4.5M12 12v9" />
          </template>
          <template v-else>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </template>
        </svg>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>
