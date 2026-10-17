<script setup lang="ts">
/** A plain reading page: a title, an optional line under it, then prose. */
defineProps<{
  title: string
  lead?: string
}>()
</script>

<template>
  <article class="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
    <header class="mb-10 flex flex-col gap-3">
      <h1 class="text-4xl font-bold tracking-display text-stone-900">
        {{ title }}
      </h1>
      <p v-if="lead" class="text-sm text-stone-500">
        {{ lead }}
      </p>
    </header>
    <div class="content-page__prose flex flex-col gap-4 text-base/7 text-stone-700">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.content-page__prose :deep(h2) {
  margin-top: 1.5rem;
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-stone-900);
}

.content-page__prose :deep(a) {
  color: var(--color-stone-900);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
