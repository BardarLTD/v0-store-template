import pagePaths from '#sitemap-paths'
import { posts } from '#shared/posts'
import { paintings } from '#shared/catalogue'

const ORIGIN = 'https://cavalletto.com.au'
const EXCLUDED = new Set(['/thank-you'])

const entries = new Map<string, string | undefined>()
for (const path of pagePaths) {
  if (!EXCLUDED.has(path)) entries.set(path, undefined)
}
for (const painting of paintings) {
  entries.set(`/paintings/${painting.id}`, undefined)
}
entries.set('/blog', undefined)
for (const post of posts) {
  entries.set(`/blog/${post.slug}`, post.date)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...entries]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, lastmod]) => lastmod
    ? `  <url><loc>${ORIGIN}${path}</loc><lastmod>${lastmod}</lastmod></url>`
    : `  <url><loc>${ORIGIN}${path}</loc></url>`)
  .join('\n')}
</urlset>
`

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
