import pagePaths from '#sitemap-paths'

const ORIGIN = 'https://cavalletto.com.au'
const EXCLUDED = new Set(['/thank-you'])

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pagePaths
  .filter(path => !EXCLUDED.has(path))
  .map(path => `  <url><loc>${ORIGIN}${path}</loc></url>`)
  .join('\n')}
</urlset>
`

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
