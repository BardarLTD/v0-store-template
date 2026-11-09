<script setup lang="ts">
import {
  bespokePrice,
  bespokeSelection,
  finishOptions,
  formatWholePrice,
  parseFinish,
  parseSize,
  sizeOptions,
  type FinishKey,
  type SizeKey,
} from '#shared/painting-options'
import { store } from '#shared/store'
import { localSrcset } from '#shared/srcset'

const ROOM_IMAGE = '/rooms/af-klint-ten-largest-no-7-room.webp'

const route = useRoute()
const size = ref<SizeKey>(parseSize(route.query.size))
const finish = ref<FinishKey>(parseFinish(route.query.finish))
const price = computed(() => bespokePrice(size.value, finish.value))

const sizeChoices = computed(() => sizeOptions.map(option => ({
  ...option,
  price: formatWholePrice(bespokePrice(option.key, finish.value)),
})))
const finishChoices = computed(() => finishOptions.map(option => ({
  ...option,
  price: formatWholePrice(bespokePrice(size.value, option.key)),
})))

const tracking = useTracking()
const trackedItem = computed(() => ({ id: 'bespoke', name: 'Bespoke painting', value: price.value }))
const { pending, error, start } = useCheckout()

function buy() {
  start({ selection: bespokeSelection(size.value, finish.value), trackedItem: trackedItem.value })
}

onMounted(() => tracking.viewProduct(trackedItem.value))

const DESCRIPTION = `Send us any painting you love and we'll have it hand-painted in oil on canvas. From ${formatWholePrice(bespokePrice('medium', 'rolled'))}, with free delivery across Australia.`

useSeoMeta({
  title: 'Bespoke hand-painted oil paintings',
  description: DESCRIPTION,
  ogTitle: `Bespoke paintings · ${store.company.name}`,
  ogDescription: DESCRIPTION,
  ogImage: ROOM_IMAGE,
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col pt-6 pb-14 lg:px-6 md:pb-20">
    <div class="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
      <img
        :src="ROOM_IMAGE"
        :srcset="localSrcset(ROOM_IMAGE)"
        sizes="(min-width: 1024px) 480px, 100vw"
        alt="A hand-painted oil painting hanging above a sofa in a living room"
        width="1080"
        height="1350"
        fetchpriority="high"
        class="aspect-[4/5] w-full object-cover lg:sticky lg:top-6 lg:rounded-md"
      >

      <div class="flex flex-col gap-6 px-6 lg:px-0">
        <div class="flex flex-col gap-3">
          <h1 class="font-serif text-3xl leading-tight font-bold tracking-display text-balance italic md:text-4xl">
            Any painting you like, hand-painted in oil.
          </h1>
          <p class="text-base leading-relaxed text-pretty">
            Send us an image of a painting you love and we&apos;ll have it painted by hand on canvas. Pay here, then email the image to
            <a href="mailto:hello@cavalletto.com.au" class="underline underline-offset-2">hello@cavalletto.com.au</a>.
            We confirm the details with you before the painter starts.
          </p>
        </div>

        <p class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="text-3xl font-bold" aria-live="polite">{{ formatWholePrice(price) }}</span>
          <span class="text-sm">Free delivery in Australia</span>
        </p>

        <OptionGroup v-model="size" legend="Size" name="size" :options="sizeChoices" />
        <OptionGroup v-model="finish" legend="Finish" name="finish" :options="finishChoices" />

        <div class="flex flex-col gap-3">
          <button
            type="button"
            :disabled="pending"
            class="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-base font-bold text-white transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active disabled:cursor-progress disabled:opacity-70"
            @click="buy"
          >
            <span
              v-if="pending"
              aria-hidden="true"
              class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
            {{ pending ? 'Opening checkout…' : `Buy · ${formatWholePrice(price)}` }}
          </button>
          <p v-if="error" role="alert" class="flex items-center gap-2 text-sm">
            <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-danger" />
            {{ error }}
          </p>
          <p class="text-center text-xs leading-relaxed text-pretty">
            Visa, Mastercard, Amex, Apple Pay or Google Pay. Airwallex handles payment, so your card details never reach our site.
          </p>
        </div>

        <PaintingPromises />
      </div>
    </div>

    <section aria-labelledby="timeline-heading" class="flex flex-col gap-5 px-6 pt-14 lg:px-0 lg:pt-20">
      <h2 id="timeline-heading" class="text-2xl font-bold tracking-display">
        What happens after you order
      </h2>
      <OrderTimeline />
    </section>
  </div>
</template>
