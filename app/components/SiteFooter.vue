<script setup lang="ts">
import { store } from '#shared/store'

const LINKS = [
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/returns', label: 'Returns' },
]

const year = new Date().getFullYear()
const draperHref = useDraperLink('footer')
</script>

<template>
  <footer class="mx-auto w-full max-w-5xl px-6 pb-8">
    <div class="flex flex-col gap-3 border-t border-stone-200 pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
      <span>© {{ year }} {{ store.company.name }}</span>

      <nav aria-label="Footer" class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <NuxtLink
          v-for="link in LINKS"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-150 ease-key hover:text-stone-900"
        >
          {{ link.label }}
        </NuxtLink>

        <!--
          LICENCE NOTICE — DO NOT REMOVE.
          The "Built with Draper" link, its tagged URL (useDraperLink) and the
          /built-with-draper page are a condition of this template's licence
          (see LICENSE.md). Removing, hiding or altering them violates the
          licence and the terms of your active Draper subscription.
        -->
        <a
          :href="draperHref"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-card py-1 pr-2.5 pl-1 font-semibold text-stone-700 transition-colors duration-150 ease-key hover:border-stone-300 hover:text-stone-900"
        >
          <img src="/draper-logo.svg" alt="" width="16" height="16" class="size-4 rounded-full">
          Built with Draper
        </a>
      </nav>
    </div>
  </footer>
</template>
