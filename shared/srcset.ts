// Responsive variants sit next to each image in `public/`, named
// `<name>-480.webp`, `<name>-768.webp` and `<name>-1080.webp`.
// Images narrower than 1080 have their largest variant at the source width,
// so pass that as `maxWidth` to keep the descriptors honest.

const WIDTHS = [480, 768, 1080] as const

export function localSrcset(src: string, maxWidth = 1080): string {
  const base = src.replace(/\.(webp|jpe?g|png)$/i, '')
  return WIDTHS.map(width => `${base}-${width}.webp ${Math.min(width, maxWidth)}w`).join(', ')
}

/** Cloudinary resizes on the fly, so swap the width transform for each size. */
export function cloudinarySrcset(src: string): string {
  if (!src.includes('/image/upload/')) return ''
  return WIDTHS.map(width => `${src.replace(/w_\d+/, `w_${width}`)} ${width}w`).join(', ')
}
