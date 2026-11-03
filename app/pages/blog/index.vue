<script setup lang="ts">
import { formatPostDate, posts } from '#shared/posts'

useSeoMeta({
  title: 'Blog',
  description: 'Notes on hand-painted oil paintings and making a home feel like yours, from Cavalletto.',
})

const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
</script>

<template>
  <ContentPage title="Blog">
    <p v-if="sortedPosts.length === 0">
      New posts are coming soon.
    </p>

    <ul v-else class="flex flex-col gap-8">
      <li v-for="post in sortedPosts" :key="post.slug" class="flex flex-col gap-1">
        <h2 class="!mt-0">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <time :datetime="post.date" class="text-sm text-stone-500">
          {{ formatPostDate(post.date) }}
        </time>
        <p>{{ post.description }}</p>
      </li>
    </ul>
  </ContentPage>
</template>
