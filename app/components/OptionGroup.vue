<script setup lang="ts" generic="K extends string">
defineProps<{
  legend: string
  name: string
  options: ReadonlyArray<{ key: K, label: string, detail: string, price: string }>
}>()

const model = defineModel<K>({ required: true })
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <legend class="mb-2 text-sm font-bold">
      {{ legend }}
    </legend>
    <div class="grid grid-cols-2 gap-3">
      <label
        v-for="option in options"
        :key="option.key"
        class="flex cursor-pointer flex-col gap-1 rounded-md border-2 border-line p-3 transition-colors duration-150 has-checked:border-accent has-checked:bg-card has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
      >
        <input v-model="model" type="radio" :name="name" :value="option.key" class="sr-only">
        <span class="flex items-baseline justify-between gap-2">
          <span class="font-bold">{{ option.label }}</span>
          <span class="text-sm">{{ option.price }}</span>
        </span>
        <span class="text-sm leading-snug">{{ option.detail }}</span>
      </label>
    </div>
    <slot />
  </fieldset>
</template>
