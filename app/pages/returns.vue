<script setup lang="ts">
import { store } from '#shared/store'

useSeoMeta({ title: `Returns · ${store.company.name}` })
</script>

<!-- Placeholder copy. Replace it with your own returns and refunds policy before you take preorders. -->
<template>
  <ContentPage title="Returns" lead="Last updated: [date]">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna
      mollis euismod. Nulla vitae elit libero, a pharetra augue.
    </p>
    <h2>Lorem ipsum</h2>
    <p>
      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta
      felis euismod semper. Donec sed odio dui.
    </p>
    <h2>Dolor sit amet</h2>
    <p>
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce
      dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
    </p>
    <h2>Consectetur</h2>
    <p>
      Sed posuere consectetur est at lobortis. Questions? Write to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
  </ContentPage>
</template>
