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

export const posts: Post[] = [
  {
    slug: 'how-to-frame-and-hang-a-rolled-painting',
    title: 'How to Frame and Hang a Rolled, Unstretched Painting',
    description: 'I stretched a rolled oil painting myself with a $20 staple gun. The steps, what it took, why I\'d order it framed next time, and how I hung it.',
    date: '2026-11-03',
    author: 'Tom Hill',
    authorBio: 'Tom Hill is the founder of Cavalletto, a small Sydney business selling hand-painted oil paintings made to order. He works with a studio of trained painters and chooses each painting for how it looks on a real wall.',
  },
  {
    slug: 'how-long-does-a-custom-oil-painting-take',
    title: 'How Long Does a Custom Oil Painting Take? My Order',
    description: 'A hand-painted oil painting is made after you order. Here is how long mine took from order to my front door, and what to expect from other sellers.',
    date: '2026-11-03',
    author: 'Tom Hill',
    authorBio: 'Tom Hill is the founder of Cavalletto, a small Sydney business selling hand-painted oil paintings made to order. He works with a studio of trained painters and chooses each painting for how it looks on a real wall.',
  },
  {
    slug: 'how-to-pick-art-for-a-rental',
    title: 'How to Pick Art for a Rental: What I Learned',
    description: 'How I chose statement art for a large rental bedroom: start with a style, find one artist, then hang it without drilling a hole.',
    date: '2026-11-03',
    author: 'Tom Hill',
    authorBio: 'Tom Hill is the founder of Cavalletto, a small Sydney business selling hand-painted oil paintings made to order. He works with a studio of trained painters and chooses each painting for how it looks on a real wall.',
  },
  {
    slug: 'are-hand-painted-reproductions-worth-it',
    title: 'Are Hand-Painted Reproductions Worth It? My Honest View',
    description: 'I bought hand-painted oil paintings for my own walls. What I got for the money, what was a hassle, and who should buy an original instead.',
    date: '2026-11-03',
    author: 'Tom Hill',
    authorBio: 'Tom Hill is the founder of Cavalletto, a small Sydney business selling hand-painted oil paintings made to order. He works with a studio of trained painters and chooses each painting for how it looks on a real wall.',
  },
]

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
