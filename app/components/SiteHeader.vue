<script setup lang="ts">
import { store } from '#shared/store'

const DESKTOP_LINKS = [
  { to: '/collection', label: 'Collection one' },
  { to: '/bespoke', label: 'Bespoke' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/faq', label: 'FAQ' },
]
const MENU_LINKS = [
  { to: '/collection', label: 'Collection one' },
  { to: '/bespoke', label: 'Bespoke' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/faq', label: 'Questions' },
]

const menu = ref<HTMLDialogElement | null>(null)

function openMenu() {
  menu.value?.showModal()
}

function closeMenu() {
  menu.value?.close()
}

const route = useRoute()
watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header class="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 pt-6">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 rounded-full pr-2 font-serif text-2xl font-bold text-stone-900"
    >
      <img v-if="store.company.logo" :src="store.company.logo" alt="" width="24" height="24" class="size-6 rounded-md">
      {{ store.company.name }}
    </NuxtLink>

    <nav aria-label="Main" class="hidden items-center gap-5 md:flex">
      <NuxtLink
        v-for="link in DESKTOP_LINKS"
        :key="link.to"
        :to="link.to"
        class="text-sm font-bold text-accent underline-offset-2 hover:underline"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div class="flex items-center gap-1 md:hidden">
      <NuxtLink to="/collection" class="inline-flex h-11 items-center px-2 text-sm font-bold text-accent">
        Shop
      </NuxtLink>
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="dialog"
        class="inline-flex size-11 items-center justify-center rounded-md text-stone-900"
        @click="openMenu"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="size-6">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <dialog
      ref="menu"
      aria-label="Menu"
      class="menu-sheet inset-x-0 top-auto bottom-0 m-0 h-auto max-h-[85dvh] w-full max-w-none rounded-t-xl bg-card p-0 text-stone-900 md:hidden"
      @click.self="closeMenu"
    >
      <div class="flex flex-col gap-2 px-6 pt-4 pb-8">
        <div class="flex items-center justify-between">
          <span class="font-serif text-xl font-bold">{{ store.company.name }}</span>
          <button
            type="button"
            aria-label="Close menu"
            class="inline-flex size-11 items-center justify-center rounded-md"
            @click="closeMenu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="size-6">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Menu">
          <ul class="flex flex-col">
            <li v-for="link in MENU_LINKS" :key="link.to" class="border-b-[1.5px] border-line last:border-b-0">
              <NuxtLink :to="link.to" class="flex h-14 items-center text-lg font-bold" @click="closeMenu">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </dialog>
  </header>
</template>

<style scoped>
.menu-sheet::backdrop {
  background: rgb(43 30 20 / 0.4);
}

@media (prefers-reduced-motion: no-preference) {
  .menu-sheet[open] {
    animation: sheet-up 200ms ease-out;
  }
}

@keyframes sheet-up {
  from {
    transform: translateY(100%);
  }
}
</style>
