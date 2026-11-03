export interface Post {
  /** Short lowercase slug; the post lives at /blog/<slug>. */
  slug: string
  title: string
  description: string
  /** Publication date, YYYY-MM-DD. */
  date: string
  author: string
  authorBio: string
}

export const posts: Post[] = []

export function findPost(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}

/** Formats a YYYY-MM-DD date the same way on the server and in the browser. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
