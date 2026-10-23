# Preorder template

A one-product preorder page: your logo and name, one product photo, the
product's name and a Preorder button that takes payment through
[Airwallex](https://www.airwallex.com)'s hosted checkout. The Meta Pixel and
the Google tag are built in: paste their IDs and your ads can optimise for
real purchases. A tiny footer links to Terms, Privacy, Returns and Built with
Draper.

Nuxt 4 · Vue 3 · Tailwind CSS 4 · `@airwallex/components-sdk`. Standalone, so
it runs on its own once exported.

## Make it yours

| What | Where |
| --- | --- |
| Company name, email, product name, tagline, price, currency, shipping line | `shared/store.ts` |
| Logo and product photo (one image), as hosted HTTPS URLs | `company.logo` and `product.image` in `shared/store.ts` |
| Terms, Privacy and Returns copy (lorem ipsum until you fill it in) | `app/pages/terms.vue`, `privacy.vue`, `returns.vue` |
| Colours and font | `app/assets/css/main.css` |
| Meta Pixel and Google tag IDs | Environment variables (see [Ads tracking](#ads-tracking)) |

Don't remove or change the "Built with Draper" footer link, its tagged URL
(`app/composables/useDraperLink.ts`) or `app/pages/built-with-draper.vue`.
They're a condition of the licence: see [LICENSE.md](LICENSE.md).

## Run it

```bash
pnpm install
cp .env.example .env   # then add your Airwallex keys
pnpm dev               # http://localhost:3000
```

Without keys the page renders and the button says preorders aren't open yet.

## How a preorder works

1. **Preorder** calls `POST /api/preorder`. The server logs in to Airwallex
   and creates a PaymentIntent for the price in `shared/store.ts`, never a
   price sent from the browser.
2. The browser opens Airwallex's hosted payment page. It shows your logo and
   an order summary (product image, name and price), and collects the card
   and the buyer's name, email and address (the delivery address).
3. Airwallex returns the buyer to `/thank-you?id=…`. The page confirms the
   payment with Airwallex (`GET /api/preorder/:id`) before saying thank you.

The buyer is charged when they preorder. Orders, and the addresses to ship
to, are in your Airwallex dashboard under Payments.

Test with sandbox keys and `NUXT_PUBLIC_AIRWALLEX_ENV=demo`. Go live with
production keys and `prod`.

## Ads tracking

Set any of these environment variables (in v0: the **Vars** panel; on Vercel:
Project → Settings → Environment Variables) and redeploy. Each is optional;
nothing loads until it's set.

| Variable | What to paste | Where to find it |
| --- | --- | --- |
| `NUXT_PUBLIC_META_PIXEL_ID` | Your pixel's ID, digits only | Meta Events Manager → Connect data → Web |
| `NUXT_PUBLIC_GOOGLE_ADS_CONVERSION` | The Purchase conversion's `send_to`, `AW-…/…` | Google Ads → Goals → Conversions → your Purchase action → Tag setup → Use Google tag |
| `NUXT_PUBLIC_GOOGLE_TAG_ID` | A Google Analytics `G-…` ID (or any other tag), comma-separated for more than one | Google Analytics → Admin → Data streams |

The site then sends each platform's standard events, so both recognise them
without custom setup:

| When | Meta | Google |
| --- | --- | --- |
| Any page loads | PageView | page_view |
| The product page is seen | ViewContent | view_item |
| Preorder is pressed | InitiateCheckout | begin_checkout |
| Airwallex confirms the payment on `/thank-you` | Purchase | purchase + the Ads conversion |

Purchase carries the amount Airwallex charged and the order's id (the
PaymentIntent), and fires once per order, so a reload doesn't count a sale
twice. Optimise Meta and Google Ads campaigns for Purchase. Check it with
Meta's Pixel Helper and Google's Tag Assistant; don't place test orders on
live keys.

The code: `app/plugins/tracking.ts` loads the pixels, and
`app/composables/useTracking.ts` sends the events.

Selling into the EU or UK? Ad pixels there need the visitor's consent first,
so add a cookie banner before you turn them on.

### Images on the checkout

- **Use hosted HTTPS URLs** for the logo and product image. Airwallex's page
  loads them from the internet, so a file under `public/` only shows there
  once the site is deployed on HTTPS. On `localhost` it is a broken image.
- **The hosted page only renders an image whose URL ends in an image
  extension** (`.jpg`, `.png`, …). The server adds a `#.jpg` fragment to URLs
  that don't, such as CDN links with query strings, so any working image URL
  shows (`checkoutImageUrl` in `server/utils/site-url.ts`).
- **The image host must allow hotlinking.** Wikimedia, for one, blocks it.
- **Set `NUXT_PUBLIC_SITE_URL`** if the site's public address differs from
  the one it's served on.

The example product photo is by Mockup Graphics on
[Unsplash](https://unsplash.com/photos/yellow-banana-on-white-background-Kl3467edwsE)
(Unsplash License).
