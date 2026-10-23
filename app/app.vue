<script setup lang="ts">
import { store } from '#shared/store'

// The browser tab shows the store's own logo, so changing it in
// shared/store.ts is enough.
useHead({ link: [{ rel: 'icon', href: store.company.logo }] })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
