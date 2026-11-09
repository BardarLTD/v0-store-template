<script setup lang="ts">
import { formatPrice, type Selection } from '#shared/store'

const props = defineProps<{
  selection: Selection
  price: number
  paintingId?: string
  frameStyleId?: string
  brief?: string
  disabled?: boolean
}>()

/** The one action on the page. See `useCheckout` for the checkout flow. */
const { pending, error, start } = useCheckout()

function preorder() {
  start({
    selection: props.selection,
    paintingId: props.paintingId,
    frameStyleId: props.frameStyleId,
    brief: props.brief,
  })
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <button
      type="button"
      :disabled="pending || props.disabled"
      class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-white transition-colors duration-150 ease-key hover:bg-accent-hover active:bg-accent-active disabled:opacity-70 sm:w-auto"
      :class="pending ? 'disabled:cursor-progress' : 'disabled:cursor-not-allowed disabled:hover:bg-accent'"
      @click="preorder"
    >
      <span
        v-if="pending"
        aria-hidden="true"
        class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
      />
      {{ pending ? 'Opening checkout…' : `Buy ${formatPrice(props.price)}` }}
    </button>

    <p v-if="error" role="alert" class="flex items-center gap-2 text-sm text-stone-700">
      <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-danger" />
      {{ error }}
    </p>
  </div>
</template>
