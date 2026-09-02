# Bharat Space — Next.js Landing Page

A pixel-matched recreation of the Bharat Space dark, space-themed landing page,
built with Next.js 14 (App Router) and Tailwind CSS.

## Getting started

This app uses the **bharatenv** environment file (`.env.local` locally, Vercel env vars in production). Copy the template first:

```bash
copy .env.example .env.local
```

Then install packages and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it.

Required / optional env vars are listed in `.env.example`:

| Variable | Required on Vercel | Purpose |
| --- | --- | --- |
| `WEB3FORMS_ACCESS_KEY` | Recommended | Delivers contact form email via [Web3Forms](https://web3forms.com) |
| `CONTACT_TO_EMAIL` | No (defaults to `info@bharatspace.co`) | FormSubmit fallback inbox |
| `INQUIRIES_SECRET` | Yes | Protects `/admin/inquiries?key=...` |
| `NEXT_PUBLIC_HERO_VIDEO` | No | Hero earth video path |
| `NEXT_PUBLIC_HERO_POSTER` | No | Hero poster image path |

## Deploy on Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in [Vercel](https://vercel.com/new). Framework preset: **Next.js**. Node.js **20**.
2. In Project Settings → Environment Variables, add the same keys from `.env.example` for Production, Preview, and Development.
3. Set `INQUIRIES_SECRET` to a long random string. Set `WEB3FORMS_ACCESS_KEY` so contact form emails actually send (the local JSON inbox is ephemeral on Vercel).
4. Leave `NEXT_PUBLIC_HERO_VIDEO` as `/videos/earth_bg.mp4` on Vercel. The 4K file is excluded from the upload (Hobby static limit is 100 MB).
5. Deploy. Region is `bom1` (Mumbai) via `vercel.json`.

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

On Vercel this is `next build` automatically; you do not run `next start` yourself.
