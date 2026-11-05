// Styled room photographs, each with one painting from Collection one in it.
// Full-quality originals for social live in /marketing/lookbook.

export interface LookbookShot {
  id: string
  image: string
  alt: string
  /** Catalogue id of the painting hung in the room. */
  paintingId: string
  room: string
}

export const lookbook: LookbookShot[] = [
  {
    id: 'parquet-living',
    image: '/lookbook/parquet-living.webp',
    alt: 'A sunlit pre-war living room with herringbone parquet, a Persian rug, an aubergine velvet sofa, a cognac egg chair and a record shelf, with a pink and yellow abstract painting above',
    paintingId: 'af-klint-ten-largest-no-7',
    room: 'Living room, late afternoon',
  },
  {
    id: 'olive-lounge',
    image: '/lookbook/olive-lounge.webp',
    alt: 'A lamplit lounge with a brown boucle sofa, a red marble coffee table on an olive rug and walnut record shelves, with a teal night painting of the Thames above',
    paintingId: 'whistler-nocturne-blue-and-gold',
    room: 'Lounge, evening',
  },
  {
    id: 'fireplace-arc',
    image: '/lookbook/fireplace-arc.webp',
    alt: 'A living room with an Eames lounge chair, a chrome arc lamp, candles in a white plaster fireplace and tall palms, with a dark Dutch flower still life in a gilded frame above the mantel',
    paintingId: 'ruysch-flowers-marble-tabletop',
    room: 'Sitting room, golden hour',
  },
  {
    id: 'dining-cane',
    image: '/lookbook/dining-cane.webp',
    alt: 'A small flat with a round walnut table, cane chairs, wildflowers and a blue sofa by sash windows, with a geometric castle painting above the sideboard',
    paintingId: 'klee-castle-and-sun',
    room: 'Dining corner, morning',
  },
  {
    id: 'bedroom-lantern',
    image: '/lookbook/bedroom-lantern.webp',
    alt: 'A calm bedroom with rumpled linen, a rust throw, a paper lantern and a rattan chair, with a wide blue lake painting above the bed',
    paintingId: 'gallen-kallela-lake-keitele',
    room: 'Bedroom, overcast',
  },
  {
    id: 'credenza-wassily',
    image: '/lookbook/credenza-wassily.webp',
    alt: 'A mid-century living room with a walnut credenza, a Wassily chair, a jute rug and pink lilies, with a painting of four autumn trees against a striped sunset above',
    paintingId: 'schiele-four-trees',
    room: 'Living room, afternoon',
  },
]
