<script setup lang="ts">
import { formatPrice } from '#shared/store'

/**
 * The one action on the page. It asks the server for a PaymentIntent, then
 * sends the buyer to Airwallex's hosted checkout, which collects their card,
 * name, email and delivery address and returns them to /thank-you.
 */

interface Preorder {
  intentId: string
  clientSecret: string
  currency: string
  countryCode: string
  logoUrl: string
}

const { public: { airwallexEnv } } = useRuntimeConfig()
const tracking = useTracking()

const pending = ref(false)
const error = ref('')

/** The site's accent as a hex colour, which is all Airwallex accepts. */
function accentColour(): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  return /^#[0-9a-f]{6}$/i.test(value) ? value : '#42A5F5'
}

async function preorder() {
  pending.value = true
  error.value = ''
  tracking.beginCheckout()
  try {
    const order = await $fetch<Preorder>('/api/preorder', { method: 'POST' })
    const { init } = await import('@airwallex/components-sdk')
    const { payments } = await init({
      env: airwallexEnv === 'prod' ? 'prod' : 'demo',
      enabledElements: ['payments'],
    })
    if (!payments) throw new Error('Airwallex payments element failed to load')
    const origin = window.location.origin
    payments.redirectToCheckout({
      intent_id: order.intentId,
      client_secret: order.clientSecret,
      currency: order.currency,
      country_code: order.countryCode,
      successUrl: `${origin}/thank-you?id=${order.intentId}`,
      logoUrl: order.logoUrl,
      requiredBillingContactFields: ['name', 'email', 'address'],
      // The checkout's buttons match the site's accent (app/assets/css/main.css).
      appearance: { variables: { colorBrand: accentColour() } },
    })
  }
  catch (err) {
    console.error('[preorder] checkout failed to open', err)
    const message = (err as { data?: { message?: string } }).data?.message
    error.value = message ?? 'Checkout didn’t open. Please try again.'
    pending.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <button
      type="button"
      :disabled="pending"
      class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-white transition-colors duration-150 ease-key hover:bg-accent-hover active:bg-accent-active disabled:cursor-progress disabled:opacity-70 sm:w-auto"
      @click="preorder"
    >
      <span
        v-if="pending"
        aria-hidden="true"
        class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
      />
      {{ pending ? 'Opening checkout…' : `Preorder · ${formatPrice()}` }}
    </button>

    <p v-if="error" role="alert" class="flex items-center gap-2 text-sm text-stone-700">
      <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-danger" />
      {{ error }}
    </p>
  </div>
</template>
