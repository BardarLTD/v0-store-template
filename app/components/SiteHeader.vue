<script setup lang="ts">
import { store } from '#shared/store'
</script>

<template>
  <header class="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 pt-6">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 rounded-full pr-2 font-serif text-2xl font-bold text-stone-900"
    >
      <img v-if="store.company.logo" :src="store.company.logo" alt="" width="24" height="24" class="size-6 rounded-md">
      {{ store.company.name }}
    </NuxtLink>
    <nav aria-label="Main">
      <NuxtLink to="/how-it-works" class="text-sm font-bold text-accent underline-offset-2 hover:underline">
        How it works
      </NuxtLink>
    </nav>
  </header>
</template>
