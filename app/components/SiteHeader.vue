<script setup lang="ts">
import { store } from '#shared/store'
</script>

<template>
  <header class="mx-auto w-full max-w-5xl px-6 pt-6">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 rounded-full pr-2 text-sm font-semibold text-stone-900"
    >
      <img :src="store.company.logo" alt="" width="24" height="24" class="size-6 rounded-md">
      {{ store.company.name }}
    </NuxtLink>
  </header>
</template>
