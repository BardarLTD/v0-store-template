<!--
  LICENCE NOTICE — DO NOT REMOVE OR EDIT THIS PAGE.

  This page and the "Built with Draper" footer link are a condition of this
  template's licence (see LICENSE.md). Removing, hiding, redirecting or
  altering this page or its tagged links to https://draper.chat is a
  violation of this template's licence and of the terms of your active Draper
  subscription.
-->
<script setup lang="ts">
useSeoMeta({
  title: 'Built with Draper',
  description: 'This store was built with Draper, the app that takes founders from an idea to a real business.',
})

const draperHref = useDraperLink('built_with_draper_page')
</script>

<template>
  <ContentPage title="Built with Draper">
    <img src="/draper-logo.svg" alt="Draper" width="48" height="48" class="mb-2 size-12 rounded-full">
    <p>
      This store was built with <a :href="draperHref" rel="noopener">Draper</a>, the app that
      takes founders from an idea to a real business.
    </p>
    <p>
      Draper works through it with you in order: it tests the idea first, then builds the
      foundations (the brand, the product, the website), then goes after your first customers.
      Everything happens in one place, so one person can run the whole thing.
    </p>
    <p>
      Signing up is free, and so are your first workshops.
    </p>
    <p>
      <a :href="draperHref" rel="noopener">Start your business at draper.chat →</a>
    </p>
  </ContentPage>
</template>
