<script setup lang="ts">
import { store } from '#shared/store'

useSeoMeta({ title: `Privacy Policy · ${store.company.name}` })
</script>

<!--
  Placeholder copy. Replace it with your own Privacy Policy before you take preorders.
  If you turn on the Meta Pixel or Google tag (see README), say so here: that the site
  shares visits and purchases with Meta and Google for advertising.
-->
<template>
  <ContentPage title="Privacy Policy" lead="Last updated: [date]">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue
      laoreet rutrum faucibus dolor auctor. Cum sociis natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus.
    </p>
    <h2>Lorem ipsum</h2>
    <p>
      Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac,
      vestibulum at eros. Sed posuere consectetur est at lobortis.
    </p>
    <h2>Dolor sit amet</h2>
    <p>
      Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo
      luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    </p>
    <h2>Consectetur</h2>
    <p>
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Questions? Write to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
  </ContentPage>
</template>
