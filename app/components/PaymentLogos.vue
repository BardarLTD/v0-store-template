<script setup lang="ts">
const METHODS = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'americanexpress', label: 'American Express' },
  { id: 'applepay', label: 'Apple Pay' },
  { id: 'googlepay', label: 'Google Pay' },
]
</script>

<template>
  <div class="flex flex-col gap-2">
    <ul class="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
      <li
        v-for="method in METHODS"
        :key="method.id"
        class="flex h-8 w-12 items-center justify-center rounded-sm border border-line bg-card"
      >
        <img :src="`/payments/${method.id}.svg`" :alt="method.label" width="24" height="24" class="h-5 w-auto">
      </li>
    </ul>
    <p class="text-xs leading-relaxed text-stone-500">
      Secure checkout by Airwallex. Your card details never touch our site.
    </p>
  </div>
</template>
