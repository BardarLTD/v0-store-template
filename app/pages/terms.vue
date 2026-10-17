<script setup lang="ts">
import { store } from '#shared/store'

useSeoMeta({ title: `Terms of Service · ${store.company.name}` })
</script>

<!-- Placeholder copy. Replace it with your own Terms of Service before you take preorders. -->
<template>
  <ContentPage title="Terms of Service" lead="Last updated: [date]">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante
      venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.
    </p>
    <h2>Lorem ipsum</h2>
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus
      auctor fringilla. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis
      euismod semper.
    </p>
    <h2>Dolor sit amet</h2>
    <p>
      Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
      scelerisque nisl consectetur et. Curabitur blandit tempus porttitor. Etiam porta sem
      malesuada magna mollis euismod.
    </p>
    <h2>Consectetur</h2>
    <p>
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
      massa justo sit amet risus. Questions? Write to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
  </ContentPage>
</template>
