# RGL Decors — Luxury Interior Design Website

A single-page, scroll-driven luxury website for **RGL Decors**, Chennai's interior designers. Cinematic, editorial, conversion-focused — built production-ready.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom design tokens)
- **Framer Motion** (reveal + layout animations)
- **lucide-react** (icons)
- **react-countup** (animated stats)
- **react-intersection-observer** (viewport triggers)

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → /dist
npm run preview  # preview the production build
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable primitives (Typography, Section, Logo)
│   ├── Navbar.jsx       # Fixed nav + mobile overlay
│   ├── Hero.jsx         # Full-bleed parallax hero
│   ├── RoomSlides.jsx   # 3 immersive 100vh room slides
│   ├── ServicesSplit.jsx
│   ├── StatsSection.jsx # Count-up stats
│   ├── GalleryAccordion.jsx
│   ├── PricingSection.jsx
│   ├── FeaturesGrid.jsx
│   ├── ContactSection.jsx  # Validated contact form
│   ├── Footer.jsx
│   └── WhatsAppButton.jsx
├── hooks/
│   ├── useParallax.js   # rAF-throttled parallax
│   └── useScrollReveal.js
├── animations/
│   └── variants.js      # Shared Framer Motion variants
├── data/
│   └── content.js       # All copy + imagery (single source of truth)
├── App.jsx
└── main.jsx
```

## Design System

| Token        | Value     | Use                       |
| ------------ | --------- | ------------------------- |
| `background` | `#F8F6F1` | Page base (warm cream)    |
| `ink`        | `#1A1A1A` | Primary text              |
| `accent`     | `#2D6A5A` | CTAs, buttons, form bg    |
| `muted`      | `#888888` | Secondary text            |
| `divider`    | `#E8E4DE` | Borders / dividers        |

Fonts: **Playfair Display** (headings), **Inter** (body), **DM Sans** (labels).

## Highlights

- **Performance** — code-split motion chunk, lazy images, `fetchpriority` hero, GPU transforms, single-fire IntersectionObservers.
- **Accessibility** — semantic landmarks, skip link, ARIA labels, keyboard-operable accordion, visible focus rings, `prefers-reduced-motion` support.
- **SEO** — full meta + OpenGraph + Twitter tags, `LocalBusiness` JSON-LD schema, canonical URL, local-SEO keywords.
- **Responsive** — tuned for 320 / 768 / 1024 / 1440 / 1920+ breakpoints.

## Notes

- Phone CTAs → `tel:+918637420482`. WhatsApp → `https://wa.me/message/YCV7Y4IV2343N1`.
- Images are sourced from Unsplash; swap the URLs in `src/data/content.js` for client assets before launch.
- The contact form validates client-side; wire `onSubmit` in `ContactSection.jsx` to your CRM/API endpoint for production.
