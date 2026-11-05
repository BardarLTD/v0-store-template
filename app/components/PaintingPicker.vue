<script setup lang="ts">
import type { Painting } from '#shared/catalogue'

defineProps<{ paintings: Painting[] }>()
const selected = defineModel<string>({ required: true })
const emit = defineEmits<{ chosen: [id: string] }>()

function choose(id: string) {
  selected.value = id
  emit('chosen', id)
}
</script>

<template>
  <fieldset>
    <legend class="sr-only">Choose a painting</legend>
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <label
        v-for="painting in paintings"
        :key="painting.id"
        class="group flex cursor-pointer flex-col gap-3 rounded-md has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-accent"
      >
        <input
          :checked="painting.id === selected"
          type="radio"
          name="painting"
          :value="painting.id"
          class="sr-only"
          @change="choose(painting.id)"
        >
        <PaintingFigure :painting="painting" :selected="painting.id === selected" />
      </label>
    </div>
  </fieldset>
</template>
