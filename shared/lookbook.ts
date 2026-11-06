// Styled room photographs, each with one painting from Collection one in it.
// Full-quality originals for social live in /marketing/lookbook.

export interface LookbookShot {
  id: string
  image: string
  /** Intrinsic pixel size of `image`, used for the img width/height attributes. */
  width: number
  height: number
  alt: string
  /** Catalogue id of the painting hung in the room. */
  paintingId: string
  room: string
}

export const lookbook: LookbookShot[] = [
  {
    id: 'living-room-sideboard',
    image: '/lookbook/living-room-sideboard.webp',
    width: 2400,
    height: 1600,
    alt: 'A Federation living room on an overcast afternoon, with stained-glass sash windows, a paper lamp and a trailing plant on a walnut sideboard, an armchair and an oval coffee table, with a pink and yellow abstract painting above the sideboard',
    paintingId: 'af-klint-ten-largest-no-7',
    room: 'Living room, overcast afternoon',
  },
  {
    id: 'lounge-evening',
    image: '/lookbook/lounge-evening.webp',
    width: 1280,
    height: 1600,
    alt: 'A lamplit lounge at night with bay windows, full bookshelves, floral armchairs and a round coffee table stacked with books, with a teal moonlit river painting on the far wall',
    paintingId: 'whistler-nocturne-blue-and-gold',
    room: 'Lounge, evening',
  },
  {
    id: 'sitting-room-fireplace',
    image: '/lookbook/sitting-room-fireplace.webp',
    width: 1600,
    height: 2000,
    alt: 'A lived-in Victorian sitting room with a white marble fireplace, a green velvet sofa under tartan throws, a worn timber coffee table and a lamp glowing by the window, with a dark Dutch flower still life in an oak frame above the mantel',
    paintingId: 'ruysch-flowers-marble-tabletop',
    room: 'Sitting room, late afternoon',
  },
  {
    id: 'dining-corner-morning',
    image: '/lookbook/dining-corner-morning.webp',
    width: 1280,
    height: 1600,
    alt: 'An art deco dining corner on a weekday morning, with breakfast half cleared from a round timber table, a toddler\'s cup, wishbone chairs and a teak sideboard with wattle and oranges, with a geometric castle painting above',
    paintingId: 'klee-castle-and-sun',
    room: 'Dining corner, morning',
  },
  {
    id: 'bedroom-lake',
    image: '/lookbook/bedroom-lake.webp',
    width: 1280,
    height: 1600,
    alt: 'A weatherboard cottage bedroom on an overcast afternoon, with an unmade linen bed, an olive throw, a paper lantern and a timber chest of drawers with gum leaves, with a wide blue lake painting above',
    paintingId: 'gallen-kallela-lake-keitele',
    room: 'Bedroom, overcast',
  },
  {
    id: 'living-room-four-trees',
    image: '/lookbook/living-room-four-trees.webp',
    width: 1280,
    height: 1600,
    alt: 'A 1960s living room in afternoon light, with a teak sideboard holding a lamp, hydrangeas and blue and white bowls, an olive armchair with a tartan throw and a Persian rug, with a painting of four autumn trees against a striped sunset above',
    paintingId: 'schiele-four-trees',
    room: 'Living room, afternoon',
  },
]
