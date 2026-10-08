# Ferrocare Machines Pvt. Ltd. — Website

A static marketing website for **Ferrocare Machines Private Limited**, Pune — manufacturer
and exporter of electrostatic liquid cleaners, low vacuum dehydration machines, oil
filtration systems, coolant filtration and condition monitoring instruments since 1980.

## View it

**Live site (public):** https://saranyansaro.github.io/Ferrocare-Website/
**Source:** https://github.com/Saranyansaro/Ferrocare-Website

Also runnable locally — any static file server works:

```bash
cd "Ferrocare Website"
python3 -m http.server 8765 --bind 127.0.0.1
# then open http://127.0.0.1:8765/index.html
```

Every page is a plain `.html` file, so you can also just double-click
`index.html` — no server or build step required.

## Pages

| File | Contents |
|---|---|
| `index.html` | Hero, capability overview, proof numbers, client roster, nine product families, industries, process |
| `products.html` | Full catalogue with live discipline filter and model-number search, plus an application guide table |
| `about.html` | Company history, milestones, registration details |
| `services.html` | Six service lines, on-site cleaning, measurement, post-sale support |
| `industries.html` | Eight sectors with a fluid-by-fluid specification cross-reference |
| `faq.html` | Ten questions on electrostatic cleaning, dehydration, sizing, additives, oil testing |
| `contact.html` | Address, phones, hours, registration numbers, enquiry form, location |
| `product-*.html` | Eleven product family pages, each with a photo gallery, technology section, model tables and published specifications |
| `site.webmanifest` | PWA manifest — app name, theme colour and icon set |
| `PRODUCT-ANALYSIS.md` | Full product & services analysis, competitive assessment, catalogue findings |
| `research/` | Underlying research report on the company |

## Photography and brand assets

All imagery is genuine Ferrocare material — the company's own product
photography, extracted from their catalogues, manuals and presentations, plus
the authentic "FM" mark taken from their own artwork.

- **Product shots** are cut out from their studio backgrounds by flood-filling
  inward from the frame edges, so only the connected background is removed and
  white *inside* the machine (labels, panels) survives. They are served as
  transparent WebP — 88 % smaller than the equivalent PNG.
- **Installation and evidence photographs** stay as JPEG, since they benefit
  from full-frame colour.
- The build resolves each reference to whichever format exists via `asset()`,
  so a name like `elc-machine` picks up `elc-machine.webp` automatically.
- The logo is un-matted from the source raster onto transparency, so the same
  file reads on both the paper header and the ink footer (where it sits on a
  light plate).

## Architecture

Plain HTML, one stylesheet, one script — no framework, no build step required to *view* it.
The pages are generated so the shared header, footer and navigation stay consistent:

```
build/data.mjs     Content model: company facts, 11 product families, 62 models, services,
                   industries, clients, FAQ, per-family image galleries. All
                   specifications carry their source.
build/render.mjs   Layout shell, icon set, and the hand-drawn SVG technical illustrations.
build/build.mjs    Page assembly → writes the HTML files into the project root.
assets/css/        Design system (tokens, components, responsive rules).
assets/js/         Progressive enhancement only.
```

Rebuild after editing content or templates:

```bash
node build/build.mjs
```

Canonical and social URLs default to the GitHub Pages address above. To build
for another host:

```bash
SITE_ORIGIN=https://ferrocare.example node build/build.mjs
```

## Contact form delivery

GitHub Pages serves static files, so the enquiry form posts to a **relay
service** rather than to a server of our own. It is wired to **FormSubmit**
because that needs no account and no API key.

**One manual step is required before enquiries arrive.** FormSubmit sends a
one-time confirmation email to the address in the config. Somebody with access
to that inbox has to click the activation link once; after that, every
submission is delivered. Until it is clicked, submissions are accepted by the
service but not forwarded.

The address lives in one place — `build/data.mjs`:

```js
form: {
  endpoint: "https://formsubmit.co/ajax/info@ferrocare.com",
  mode: "formsubmit",
  subject: "Website enquiry — Ferrocare Machines",
  recipient: "info@ferrocare.com",
},
```

### Switching provider

Change `endpoint` (and `mode`, if you want the note to match):

| Provider | Endpoint | Account needed |
|---|---|---|
| FormSubmit | `https://formsubmit.co/ajax/<email>` | none — activation email only |
| Formspree | `https://formspree.io/f/<form-id>` | free account |
| Web3Forms | `https://api.web3forms.com/submit` | free access key |

Then rebuild with `node build/build.mjs` and push.

### Behaviour

- Posts as JSON with `Accept: application/json`, so the visitor stays on the page.
- `_replyto` is set to the enquirer's address, so **Reply** in the inbox goes
  straight back to them.
- A hidden honeypot field (`_honey`) catches bots; filled honeypots are accepted
  silently and dropped.
- If the relay is unreachable — blocked network, ad-blocker, service down — the
  form does **not** fail silently. It shows an error and offers a button that
  opens the visitor's mail app with every field already filled in, so the
  enquiry is never lost.

## Deployment

Hosted on **GitHub Pages** from the `main` branch, repository root. Pushing to
`main` republishes the site automatically:

```bash
git add -A && git commit -m "..." && git push
```

## Design notes

- **Palette** — warm paper neutrals against graphite ink, with a molten-copper accent for
  the "ferro" identity and a technical teal for instrumentation. Both accents are used
  semantically: copper for the machine, teal for measurement.
- **Width** — a 1560 px content column with full-bleed bands, so pages fill a modern
  display instead of floating in the middle of it.
- **Typography** — Fraunces (variable serif) for display, Inter for text, IBM Plex Mono for
  model numbers and specification figures, so engineering data reads as data.
- **Imagery** — real product photography and installation shots, preferred over
  illustration wherever the actual hardware exists. Hand-authored SVG schematics are
  retained only for the hero circuit and family icons, where a diagram explains more
  than a photograph can.
- **No-JS safe** — content is visible by default. Reveal animations are gated behind an
  `html.js` class set before first paint, and a 2.5 s safety net un-hides anything the
  IntersectionObserver misses.
- **Verified layouts** — audited for horizontal overflow at 500, 620, 768, 900, 1024, 1280
  and 1440 px; zero overflowing elements on every page type.
- **Favicons** — the real FM mark, cropped to the letterforms and set on a rounded plate so
  it stays legible at 16 px and on dark browser tabs. Full set: `.ico`, 16/32/48 px PNG,
  180 px Apple touch icon, 192/512 px manifest icons, plus a 1200×630 social card.

## Accuracy of specification data

Figures are taken from Ferrocare's own published catalogues (ELC, LVDH, Oil Test Equipment,
Gearbox/Magnetix/EPT, Particle Counter & Moisture Sensor) in preference to third-party
listings, which are internally inconsistent — the same ELC 100 LP appears at 250, 500 and
1,500 LPH on IndiaMART. Conflicts and unverifiable claims are recorded in
`PRODUCT-ANALYSIS.md` §7.5 rather than being silently resolved.

Content is written to be defensible: where a fact could not be verified (current ISO
certificate, export markets, audited financials), the site either omits it or states the
limitation.
