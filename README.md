# Bharat Space — Next.js Landing Page

A pixel-matched recreation of the Bharat Space dark, space-themed landing page,
built with Next.js 14 (App Router) and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it.

## Project structure

```
app/
  layout.js        Root layout, fonts, metadata
  page.js           Assembles all page sections
  globals.css       Tailwind directives + base theme styles
components/
  NavBar.js         Sticky header with nav + mobile menu
  Hero.js           Headline, CTAs, stat bar
  About.js          "Building a self-reliant India in space"
  Solution.js       4-card solution grid
  Sensors.js        Optical+IR / SAR / ELINT showcase rows
  Roadmap.js        2026 vs 2036 progress bars
  ContactForm.js    Controlled contact form
  Footer.js         Footer links
  ui.js             Shared icon glyphs, Eyebrow, Pill
```

## Theme

- Background: near-black navy (`#050810` – `#0e1b33`) custom `space` palette in `tailwind.config.js`
- Accent: Tailwind `sky` blue (matches the mockup's bright blue CTA/links)
- Type: Inter (system sans fallback)

All colors/spacing are centralized in `tailwind.config.js` so the theme can be
tweaked without touching component markup.

## Build for production

```bash
npm run build
npm start
```
