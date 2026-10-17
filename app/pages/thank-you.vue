<script setup lang="ts">
import { store } from '#shared/store'

// Airwallex sends the buyer here after checkout; the server confirms the
// payment with Airwallex before we say thank you. Airwallex appends its own
// `id` to the success URL as well as ours, so `id` can arrive twice.
const route = useRoute()
const ids = [route.query.id].flat()
const id = typeof ids[0] === 'string' ? ids[0] : ''

const { data, error } = await useFetch(`/api/preorder/${id}`, { immediate: id.startsWith('int_') })

useSeoMeta({ title: `Thank you · ${store.company.name}` })
</script>

<template>
  <ContentPage v-if="data?.paid" title="You’re on the list.">
    <p>
      Your preorder for {{ store.product.name }} is confirmed. {{ store.product.shipping }}, and
      we’ll email you when it’s on its way.
    </p>
    <p>
      Questions? Write to <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
    <p><NuxtLink to="/">← Back to the store</NuxtLink></p>
  </ContentPage>

  <ContentPage v-else title="We couldn’t confirm your preorder.">
    <p v-if="error">
      Something went wrong checking your payment. If you were charged, write to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a> and we’ll sort it out.
    </p>
    <p v-else>
      Your payment hasn’t gone through yet. If you were charged, write to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
    <p><NuxtLink to="/">← Back to the store</NuxtLink></p>
  </ContentPage>
</template>
