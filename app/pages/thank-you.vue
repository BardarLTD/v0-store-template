<script setup lang="ts">
import { store } from '#shared/store'

// Airwallex sends the buyer here after checkout; the server confirms the
// payment with Airwallex before we say thank you. Airwallex appends its own
// `id` to the success URL as well as ours, so `id` can arrive twice.
const route = useRoute()
const ids = [route.query.id].flat()
const id = typeof ids[0] === 'string' ? ids[0] : ''

const { data, error } = await useFetch(`/api/preorder/${id}`, { immediate: id.startsWith('int_') })

// The ad pixels' Purchase: only once Airwallex has confirmed the payment.
const tracking = useTracking()
onMounted(() => {
  if (data.value?.paid) tracking.purchase({ id, amount: data.value.amount, currency: data.value.currency, itemId: data.value.itemId })
})

// Only buyers land here: keep it out of search results.
useSeoMeta({ title: 'Thank you', robots: 'noindex' })
</script>

<template>
  <ContentPage v-if="data?.paid" title="Thanks, your order is in.">
    <p>
      In about two weeks we’ll email you a photo of your finished painting to approve. Once you’re happy, it ships within 3 business days.
    </p>
    <p>
      If you chose Bespoke, please email the image you’d like painted to
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a>.
    </p>
    <p>
      Any questions, email that address or call Tom on
      <a :href="`tel:${store.company.phone.replace(/\s/g, '')}`">{{ store.company.phone }}</a>.
    </p>
    <p><NuxtLink to="/">← Back to the store</NuxtLink></p>
  </ContentPage>

  <ContentPage v-else title="We couldn’t confirm your order.">
    <p>
      <template v-if="error">Something went wrong checking your payment.</template>
      <template v-else>Your payment hasn’t gone through.</template>
      If you’ve been charged anyway, email
      <a :href="`mailto:${store.company.email}`">{{ store.company.email }}</a> or call Tom on
      <a :href="`tel:${store.company.phone.replace(/\s/g, '')}`">{{ store.company.phone }}</a> and we’ll sort it out.
    </p>
    <p><NuxtLink to="/">← Back to the store</NuxtLink></p>
  </ContentPage>
</template>
