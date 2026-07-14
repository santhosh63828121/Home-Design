# RGL Décors — Quiet-Luxury Design System

The single source of truth for every page. If a page disagrees with this file,
the page is wrong.

Reference register: Norm Architects · Studio McGee · Foster + Partners · Apple.
**Minimal, editorial, architectural, museum-quiet.** Not SaaS. Not corporate.
Not a template.

---

## 1. Palette — 70 / 20 / 10

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `background` | `#FFFFFF` | page canvas (the 70%) | — |
| `bone` | `#FAF9F6` | alternating section bands only | — |
| `ink` | `#1C1C1A` | headings + body | 16.9:1 |
| `muted` | `#6B6B67` | secondary text | 5.4:1 |
| `divider` | `#E7E6E1` | hairlines | — |
| `accent` (olive) | `#5E6746` | links, primary buttons, active states (the 20%) | **5.99:1 ✓** |
| `accent-dark` | `#4A5238` | hover / pressed | 8.22:1 |
| `olive-deep` | `#2C3222` | footer, dark editorial panels | — |
| `olive-wash` | `#F1F2EC` | tints, chips | — |
| `gold` | `#C5A572` | rules, fills, dark-bg text (the 10%) | **2.33:1 ✗ NEVER as text on white** |
| `gold-ink` | `#8A6C33` | the ONLY gold safe as text on white | 4.91:1 ✓ |

**Hard rules — these are measured, not preferences:**
- Gold is a **thread, not a voice**: hairlines, rules, small fills, brass. On white
  it is decorative only.
- A gold button takes **`text-ink`**, never `text-white` (7.46:1 vs 2.33:1).
- On `olive-deep`, white text must be **`/60` or lighter** (`/50` = 4.58:1 is the
  floor; `/45` = 3.97:1 **fails**). Gold on `olive-deep` = 5.67:1 ✓.
- No jade, no teal, no black canvases, no neon, no gradient soup.

## 2. Typography

- **Display / headings** — `font-serif` (Cormorant Garamond). Weight **300–400** at
  display sizes. Never `font-bold`: Cormorant at 700 reads as a wedding
  invitation; at 300 it reads as an architecture monograph.
- **Body** — `font-sans` (Inter), 300–400.
- **Eyebrows** — `.eyebrow` (DM Sans, 10–11px, `tracking-wide4`, uppercase, olive).
  Always followed by `.rule-gold`.
- Scale: `text-display-xl` · `text-display` · `text-headline` · `text-title` · `text-lede`.
- Measures: headlines `max-w-[14ch]`; prose `max-w-prose2` (~66 chars).
- Emphasis inside a headline = `<span className="italic text-accent">`.

## 3. Layout & the spacing system

### The 8px ladder

`s1 8 · s2 16 · s3 24 · s4 32 · s6 48 · s8 64 · s12 96 · s16 128`

In Tailwind terms this is the **even** steps (`2 4 6 8 12 16 24 32`). Odd steps
(`5`=20px, `7`=28, `9`=36, `11`=44) are **off-ladder** and were swept out of the
codebase — do not reintroduce them.

A **micro scale** (`0.5 1 1.5 2 3` = 2/4/6/8/12px) is retained *deliberately* for
optical work inside a component — the gap between an icon and its label, a
bullet's offset from a baseline. Forcing those to 8px makes components look
clumsier, not more systematic. Layout rhythm uses the ladder; optics use the
micro scale.

### Containers

- `.shell` — **the** page container (`max-w-editorial` 78rem + `px-gutter`). Every
  page uses it. At 1440 its content edge is x=160.
- `.pl-shell` / `.pr-shell` — for a full-bleed section (image to the viewport
  edge): puts the **text** back on the shell's column while the image bleeds.
  Never hand-roll the calc.
- `.bleed` — break a child out of the shell gutter. **Never** hand-roll
  `-mx-5 sm:-mx-8`: it cannot track the fluid clamp gutter and will overflow.
- `.section-y` (88px) / `.section-y-sm` (56px) — vertical rhythm. Every section
  gets one. Because it pads **both** edges, the gap between two sections is
  2 × section = 176px. It was 176px (→ 352px gaps, measured as dead space); do
  not put it back.
- Alternate `bg-background` / `bg-bone` to band sections.

### Prove it, don't eyeball it

```
node scripts/layout-audit.mjs      # dead gaps · empty tails · off-grid columns
node scripts/overflow-find.mjs     # horizontal overflow, 320 → 2560
```
`PAGES=... WIDTHS=...` env vars. The layout audit is what turned "it feels
empty" into "the stats band is 467px tall around 150px of content".

## 4. Surfaces

- Cards are **white on white, defined by a hairline** (`border-divider`), not by a
  drop shadow. This one decision is most of the gap between "gallery" and
  "dashboard".
- Elevation is **earned on hover**, not given at rest: `.shadow-card` / `.lux-lift`
  → lift 6px + `shadow-lift` + a gold border thread.
- Radii: small and restrained (`rounded-sm`/`rounded-2xl`). No pill cards.

## 5. Motion

House curve: `ease-lux` = `cubic-bezier(.22,1,.36,1)`. Slow-out, **never bouncy**,
never overshoots. Durations 0.5–1.1s. Transform + opacity **only**.

- `SectionReveal` (+ `RevealItem` for staggered children) for scroll reveals.
- Mask reveal for headlines: outer `overflow-hidden`, inner rises from `y:110%`.
- Buttons lift 2px — **no scale** (scaling a pill is a SaaS tell).
- Images: `.lux-media` (0.9s zoom on hover).

**Three traps that have already cost real regressions here — do not repeat them:**

1. **Never animate an above-the-fold element with framer `initial`.** An SSR'd
   `opacity: 0` — or a `translateY` inside `overflow-hidden` — is *invisible*, and
   an invisible element cannot be the LCP. It then waits for hydration. Measured:
   Render Delay 3,608ms = 89% of a 4.1s LCP. Above the fold, use the CSS
   keyframes `.hero-rise` / `.hero-fade` / `.hero-rule` instead. Below the fold,
   framer is fine.
2. **Put the IntersectionObserver on the untransformed parent.** An observer on an
   element that starts translated out of its own box measures the wrong geometry
   and may never fire — this left the homepage `<h1>` permanently invisible.
3. **`fadeLeft`/`fadeRight` start ±32px off-axis** and will create a horizontal
   scrollbar at 375px. Use vertical variants near a viewport edge, or clip the
   parent with `overflow-x-clip` (safe — `overflow` does not create a containing
   block).

## 6. Honesty gates — nothing invented ships

Content that does not exist is **absent**, never faked.

- `src/data/credentials.ts` → `awards`, `certifications`, `NEWSLETTER_ENABLED`,
  `TEAM_PHOTOS_AVAILABLE`, `VIDEO_TESTIMONIALS_AVAILABLE`
- `src/data/reviews.ts` → `REVIEWS_VERIFIED` (gates Review/AggregateRating JSON-LD)
- `src/data/portfolio.ts` → narratives render only when supplied
- No superlatives ("India's 1st"), no invented precision ("99% accuracy"), no
  warranty claim that contradicts `/warranty` (5-yr hardware / 1-yr carcass).

## 7. Never change

Routes · URLs · slugs · metadata · canonical · OG · structured data · sitemap ·
forms · server actions · Prisma/DB · analytics · business data.
Redesign is **visual and structural only**.
