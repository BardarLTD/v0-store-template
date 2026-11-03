<script setup lang="ts">
import { findPost, formatPostDate } from '#shared/posts'

const props = defineProps<{
  slug: string
}>()

const post = findPost(props.slug)
if (!post) {
  throw createError({ statusCode: 404, statusMessage: `No post with slug "${props.slug}" in shared/posts.ts`, fatal: true })
}

const postUrl = `https://cavalletto.com.au/blog/${post.slug}`

useSeoMeta({
  title: post.title,
  description: post.description,
  ogType: 'article',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.description,
        'datePublished': post.date,
        'author': { '@type': 'Person', 'name': post.author },
        'url': postUrl,
        'mainEntityOfPage': postUrl,
      }),
    },
  ],
})
</script>

<template>
  <article class="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
    <header class="mb-10 flex flex-col gap-3">
      <h1 class="text-4xl font-bold tracking-display text-balance text-stone-900">
        {{ post!.title }}
      </h1>
      <p class="text-sm text-stone-500">
        {{ post!.author }} · <time :datetime="post!.date">{{ formatPostDate(post!.date) }}</time>
      </p>
    </header>

    <div class="blog-post__prose flex flex-col gap-4 text-base/7 text-stone-700">
      <slot />
    </div>

    <aside aria-label="About the author" class="mt-12 flex flex-col gap-1 border-t border-stone-200 pt-6 text-sm leading-relaxed">
      <p class="font-bold text-stone-900">
        {{ post!.author }}
      </p>
      <p class="text-stone-600">
        {{ post!.authorBio }}
      </p>
    </aside>
  </article>
</template>

<style scoped>
.blog-post__prose :deep(h2) {
  margin-top: 1.5rem;
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-stone-900);
}

.blog-post__prose :deep(a) {
  color: var(--color-stone-900);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
