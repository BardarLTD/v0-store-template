// Add 15 to 20 curated paintings here. Only paintings in the public domain.

export interface Painting {
  /** Short lowercase slug, e.g. "wheatfield-with-cypresses". */
  id: string
  title: string
  /** The artist, or "After" followed by the original artist's name. */
  artist: string
  /** Public image link. */
  image: string
  imageAlt: string
}

export const paintings: Painting[] = []

export function findPainting(id: unknown): Painting | undefined {
  return typeof id === 'string' ? paintings.find(painting => painting.id === id) : undefined
}
