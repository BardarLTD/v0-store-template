/**
 * Room photos a painting can be previewed in, hung roughly to scale.
 *
 * Every photo is square and shot straight-on. `hang` is where the bottom
 * centre of the frame sits, in percent of the photo. `cmToPercent` is how much
 * of the photo's width one centimetre of wall takes up, measured from the
 * furniture in shot, so a Large painting really does look bigger than a Medium.
 */
export interface Room {
  id: string
  label: string
  image: string
  alt: string
  hang: { x: number, y: number }
  cmToPercent: number
}

export const rooms: Room[] = [
  {
    id: 'living',
    label: 'Living room',
    image: '/rooms/living-green.png',
    alt: 'A living room with a dark green wall, an ochre velvet sofa and a brass floor lamp',
    hang: { x: 52.4, y: 53.5 },
    cmToPercent: 0.283,
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    image: '/rooms/bedroom-linen.png',
    alt: 'A calm bedroom with a pale plaster wall, an oak bed and linen bedding',
    hang: { x: 53.5, y: 47 },
    cmToPercent: 0.293,
  },
  {
    id: 'kitchen',
    label: 'Kitchen nook',
    image: '/rooms/kitchen-nook.png',
    alt: 'A farmhouse kitchen nook with a cream plaster wall, a pine bench and a marble bistro table',
    hang: { x: 50, y: 49 },
    cmToPercent: 0.459,
  },
  {
    id: 'dining',
    label: 'Dining room',
    image: '/rooms/dining-terracotta.png',
    alt: 'A dining room with an olive green wall, a walnut sideboard and rattan chairs in evening light',
    hang: { x: 50.8, y: 51 },
    cmToPercent: 0.425,
  },
  {
    id: 'study',
    label: 'Study',
    image: '/rooms/study-dark.png',
    alt: 'A dark navy study with an oak desk, a green banker\'s lamp and bookshelves',
    hang: { x: 49.8, y: 45 },
    cmToPercent: 0.449,
  },
  {
    id: 'hallway',
    label: 'Hallway',
    image: '/rooms/hallway-blue.png',
    alt: 'A bright hallway with a pale blue wall, an oak console table and a potted olive tree',
    hang: { x: 46, y: 56 },
    cmToPercent: 0.361,
  },
]

/** The room each painting looks best in, following its "suits" line. */
const suggestedRoom: Record<string, Room['id']> = {
  'klimt-music': 'living',
  'monet-poppy-field': 'kitchen',
  'van-gogh-almond-blossom': 'hallway',
  'af-klint-ten-largest-no-7': 'living',
  'klee-castle-and-sun': 'study',
  'marc-yellow-cow': 'kitchen',
  'schiele-four-trees': 'bedroom',
  'derain-charing-cross-bridge': 'hallway',
  'signac-capo-di-noli': 'hallway',
  'sisley-flood-at-port-marly': 'kitchen',
  'gallen-kallela-lake-keitele': 'bedroom',
  'friedrich-moonrise-over-the-sea': 'bedroom',
  'whistler-nocturne-blue-and-gold': 'study',
  'rousseau-repast-of-the-lion': 'dining',
  'redon-vase-of-flowers': 'bedroom',
  'vermeer-little-street': 'kitchen',
  'coorte-wild-strawberries': 'kitchen',
  'ruysch-flowers-marble-tabletop': 'dining',
}

export function findRoom(id: unknown): Room | undefined {
  return rooms.find(room => room.id === id)
}

export function roomFor(paintingId: string | undefined): Room {
  return findRoom(paintingId ? suggestedRoom[paintingId] : undefined) ?? rooms[0]!
}

/** Canvas size in cm for a size option, e.g. "18x24 in" -> 45 × 60. */
export function canvasCm(size: string, orientation: 'landscape' | 'portrait'): { width: number, height: number } {
  const [short, long] = size.startsWith('18') ? [45, 60] : [40, 50]
  return orientation === 'landscape' ? { width: long, height: short } : { width: short, height: long }
}
