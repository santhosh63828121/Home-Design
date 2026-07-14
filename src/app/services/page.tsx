import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import ScrollStory, { type Scene } from '@/components/ScrollStory'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { MaskPlate, TiltPlate, ParallaxPlate } from '@/components/motion/Plate'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'
import { serviceGroups, servicesPositioning, pagedServiceCount } from '@/data/services'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Services in Chennai',
  description:
    'Every interior service under one roof in Chennai — residential, commercial, modular, civil, MEP, outdoor, soft furnishings and after-sales, by RGL Decors.',
  path: routes.services,
  keywords: [
    'Interior Design Services Chennai',
    'Home Interior Designers Chennai',
    'Turnkey Interior Chennai',
    'Modular Kitchen Chennai',
  ],
})

/**
 * THE SERVICES HUB — a catalogue raisonné, not a list of chips.
 * ============================================================
 * Four movements, in this order and for this reason:
 *
 *   1. THE MASTHEAD — breadcrumb, eyebrow, gold rule, one enormous light serif
 *      <h1>, a measured lede, then a full-bleed plate. Entirely static markup:
 *      the only motion above the fold is CSS keyframes (.hero-fade / .hero-rule),
 *      because a framer `initial` here SSRs the headline at opacity 0 and an
 *      invisible element cannot be the LCP (DESIGN-SYSTEM §5, trap 1). The
 *      opening photograph is therefore a PLAIN <Image priority> — deliberately
 *      NOT wrapped in MaskPlate/TiltPlate, which would clip or transform the LCP
 *      candidate and hand it to hydration. Its glass caption bar is chrome layered
 *      OVER the image, so it costs the LCP nothing.
 *
 *   2. THE STORY — the shared <ScrollStory> stage. The homepage gave this
 *      component up (its 3D walkthrough already tells a room-by-room story), and
 *      this is the page it was reserved for: five scenes that carry you through
 *      the disciplines instead of asking you to read fifteen headings first.
 *
 *   3. THE DISCIPLINES — four editorial spreads. Each is a PLATE, not a
 *      rectangle: a gold hairline frame offset behind it (`.plate-offset`), a
 *      scroll-linked drift (<ParallaxPlate>), a clip-path curtain that lifts from
 *      a different edge every time (<MaskPlate>), a mouse-tracked 3D tilt
 *      (<TiltPlate>), a frosted caption that rises over the foot on hover
 *      (`.plate-glass`), and a letter chip breaking out of the frame. The plate
 *      swaps sides each movement and the column split is 5/7 — asymmetric on
 *      purpose, so it reads as a spread and not as a repeated row. The body copy
 *      is lifted verbatim from src/data/services.ts — nothing invented here.
 *
 *   4. THE INDEX — all fifteen categories as hairline cards, every one of them
 *      staggered in. Every item that has a real page is a <Link>; every item that
 *      does not is plain text. We do not mint a route to make a chip clickable.
 */

// ── Scene set ───────────────────────────────────────────────────────────────
// Services-specific, and every href is a route that exists (service slugs come
// from business.ts). Photography is drawn from the same curated, desaturated
// Unsplash set as src/data/content.js so the whole site reads as one shoot.
const SERVICE_SCENES: Scene[] = [
  {
    id: 'kitchen',
    index: '01',
    eyebrow: 'Discipline 01 · Modular',
    title: 'Kitchens',
    body: 'Modules cut, drilled and 360° edge-banded on an automated line, then assembled on site to the drawing. Layouts, tall units, countertops and hardware are specified together — because the kitchen is where an interior is judged.',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=75',
    alt: 'Modular kitchen with stone worktop and handleless cabinetry',
    href: routes.service('modular-kitchen-chennai'),
  },
  {
    id: 'wardrobe',
    index: '02',
    eyebrow: 'Discipline 02 · Joinery',
    title: 'Wardrobes',
    body: 'Built to the millimetre of your wall rather than to a standard size, with internals planned around what you actually own — hanging, drawers, shelves and the loft that most homes waste.',
    image:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=75',
    alt: 'Walk-in wardrobe with fluted timber shutters and integrated lighting',
    href: routes.service('wardrobe-design-chennai'),
  },
  {
    id: 'bedroom',
    index: '03',
    eyebrow: 'Discipline 03 · Residential',
    title: 'Bedrooms',
    body: 'Quiet materials, layered light and storage that disappears into the architecture. A bedroom should feel like the end of the day, not another room to manage.',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=75',
    alt: 'Serene bedroom with upholstered headboard and concealed wardrobe',
    href: routes.service('bedroom-interior-chennai'),
  },
  {
    id: 'lighting',
    index: '04',
    eyebrow: 'Discipline 04 · Light',
    title: 'Lighting',
    body: 'Ambient, task and accent light layered so the room works at 8am and at midnight — cove and profile runs, pendants, accent spots, and the garden lit as carefully as the living room.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75',
    alt: 'Interior lit by sculptural pendant lighting above a dining table',
    href: routes.service('indoor-outdoor-lighting'),
  },
  {
    id: 'care',
    index: '05',
    eyebrow: 'Discipline 05 · After the handover',
    title: 'Care',
    body: 'Every project includes complimentary one-year post-service care, with annual maintenance and warranty support available after that. The part most studios stop thinking about.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=75',
    alt: 'Calm finished living room with linen seating and warm timber',
    href: routes.afterSales,
  },
]

// ── The four spreads ────────────────────────────────────────────────────────
// Each one is a real group from src/data/services.ts (looked up by id, so the
// copy can never drift from the data) plus a plate and links that resolve.
type Plate = {
  id: string
  image: string
  alt: string
  links: { label: string; href: string }[]
}

const PLATES: Plate[] = [
  {
    id: 'residential',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=75',
    alt: 'Contemporary living room with linen seating, timber and soft daylight',
    links: [{ label: 'Bedroom interiors', href: routes.service('bedroom-interior-chennai') }],
  },
  {
    id: 'modular',
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=75',
    alt: 'Modular kitchen with handleless fronts and a stone worktop',
    links: [
      { label: 'Modular kitchens', href: routes.service('modular-kitchen-chennai') },
      { label: 'Wardrobes', href: routes.service('wardrobe-design-chennai') },
    ],
  },
  {
    id: 'mep-smart',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75',
    alt: 'Minimal interior with layered pendant and cove lighting',
    links: [
      { label: 'Smart homes', href: routes.service('smart-home-chennai') },
      { label: 'Indoor & outdoor lighting', href: routes.service('indoor-outdoor-lighting') },
    ],
  },
  {
    id: 'soft-furnishing',
    image:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=75',
    alt: 'Styled interior with artefacts, textiles and dark timber furniture',
    links: [
      { label: 'Art gallery & artifacts', href: routes.service('art-gallery-artifacts') },
      { label: 'Plants & landscaping', href: routes.service('plants-landscaping') },
    ],
  },
]

/**
 * Composition rhythm. Four spreads, four different plates — the shape, the edge
 * the curtain lifts from and the side the plate sits on all change, so no two
 * movements are the same rectangle in the same place.
 */
const PLATE_SHAPE = [
  'lg:aspect-[4/3]',
  'lg:aspect-[1/1]',
  'lg:aspect-[3/2]',
  'lg:aspect-[4/3]',
] as const
const PLATE_MASK = ['bottom', 'left', 'right', 'bottom'] as const

const groupById = (id: string) => serviceGroups.find((g) => g.id === id)!

export default function ServicesIndexPage() {
  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Services', path: routes.services },
  ]

  return (
    <>
      <Navbar />

      <main id="main" className="bg-background">
        {/* ── 1. Masthead ────────────────────────────────────────────────────
            Static. No framer `initial` anywhere above the fold — the <h1> and
            the plate below it are the LCP candidates and must be painted by the
            first frame of CSS, not by hydration. */}
        <header className="shell pb-section-sm pt-[9.5rem] lg:pt-[12rem]">
          <nav aria-label="Breadcrumb" className="hero-fade mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-caps text-[10px] uppercase tracking-wide2 text-muted">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1
                return (
                  <li key={c.path} className="flex items-center gap-2">
                    {last ? (
                      <span className="text-ink" aria-current="page">
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path} className="transition-colors hover:text-accent">
                          {c.name}
                        </Link>
                        <span aria-hidden="true" className="text-divider">
                          /
                        </span>
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <p className="eyebrow hero-fade">RGL Décors · Services</p>
          <span aria-hidden="true" className="rule-gold hero-rule mt-6" style={{ '--d': '120ms' } as CSSProperties} />

          <h1
            className="hero-fade mt-8 max-w-[15ch] font-serif text-display font-light text-ink"
            style={{ '--d': '80ms' } as CSSProperties}
          >
            Every service <span className="italic text-accent">under one roof.</span>
          </h1>

          <div className="mt-12 grid gap-10 border-t border-divider pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p
              className="hero-fade max-w-prose2 text-lede text-pretty text-ink/70"
              style={{ '--d': '200ms' } as CSSProperties}
            >
              {servicesPositioning} Since 2018 we have delivered design and execution end-to-end —
              fifteen disciplines, one accountable team, one language of detailing from the first
              drawing to the day you move in.
            </p>

            <div
              className="hero-fade flex flex-wrap items-center gap-6"
              style={{ '--d': '280ms' } as CSSProperties}
            >
              <Link href={routes.getQuote} className="btn-pill btn-gold">
                Get a free 3D design
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a href={`tel:${siteConfig.nap.phoneE164}`} className="btn-pill btn-ghost">
                Call {siteConfig.nap.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* The opening plate — full-bleed out of the shell gutter with `.bleed`,
            never hand-rolled negative margins (they cannot track the fluid
            clamp() gutter and overflow at some viewport). `priority`: this is
            above/at the fold on most laptops and is a legitimate LCP element,
            which is exactly why it is a bare <Image> — a MaskPlate would SSR it
            behind a clip-path and a TiltPlate would put it under a transform.
            The glass bar is layered OVER it; the photograph itself is untouched. */}
        <div className="shell">
          <div className="bleed lux-media lux-tint relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=75"
              alt="Interior blending clean modern lines with warm traditional textures"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <span
              aria-hidden="true"
              className="plate-glass hero-fade pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-12 lg:py-8"
              style={{ '--d': '420ms' } as CSSProperties}
            >
              <span className="font-caps text-[10px] uppercase tracking-wide2 text-white/80">
                RGL Décors · Chennai
              </span>
              <span className="font-caps text-[10px] uppercase tracking-wide2 text-gold">
                Fifteen disciplines · One accountable team
              </span>
            </span>
          </div>
        </div>

        {/* ── 2. The story ───────────────────────────────────────────────────
            The shared cinematic stage. Five scenes, five viewports of scroll —
            slow on purpose. Its photographs are gated behind an
            IntersectionObserver inside the component, so none of them compete
            with the plate above for bandwidth. */}
        <ScrollStory scenes={SERVICE_SCENES} />

        {/* ── 3. The disciplines ─────────────────────────────────────────────
            Four spreads. `overflow-x-clip` on each section is load-bearing: the
            letter chip breaks out of the plate's frame, and the reveal variants
            travel, and neither may ever open a horizontal scrollbar at 320px. */}
        {PLATES.map((plate, i) => {
          const g = groupById(plate.id)
          const flip = i % 2 === 1
          const primary = plate.links[0]
          return (
            <section
              key={plate.id}
              aria-labelledby={`plate-${plate.id}`}
              className={`section-y overflow-x-clip ${i % 2 === 0 ? 'bg-background' : 'bg-bone'}`}
            >
              <div className="shell">
                {/* Asymmetric on purpose: 5/7, never 6/6. The track order flips
                    with the plate so the TYPE always lands on the narrow track. */}
                <div
                  className={`grid items-center gap-s8 lg:gap-24 ${
                    flip ? 'lg:grid-cols-[7fr_5fr]' : 'lg:grid-cols-[5fr_7fr]'
                  }`}
                >
                  {/* Type. A stagger container: eyebrow, headline, body, every
                      capability line and the link row each arrive on their own
                      beat rather than the block fading in as one slab. */}
                  <SectionReveal stagger amount={0.2} className={flip ? 'lg:order-2' : undefined}>
                    <RevealItem>
                      <p className="eyebrow">
                        Discipline {g.letter} · {String(i + 1).padStart(2, '0')}
                      </p>
                      <span aria-hidden="true" className="rule-gold mt-6" />
                    </RevealItem>

                    <RevealItem>
                      <h2
                        id={`plate-${plate.id}`}
                        className="mt-8 max-w-[13ch] font-serif text-headline font-light text-ink"
                      >
                        {g.name}
                      </h2>
                    </RevealItem>

                    <RevealItem
                      as="p"
                      className="mt-8 max-w-prose2 text-pretty leading-relaxed text-ink/70"
                    >
                      {g.body}
                    </RevealItem>

                    <ul className="mt-8 space-y-4 border-t border-divider pt-8">
                      {g.items.slice(0, 5).map((item) => (
                        <RevealItem
                          as="li"
                          key={item.name}
                          className="group/line flex items-start gap-3 text-sm leading-relaxed text-ink/75"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold transition-transform duration-700 ease-lux group-hover/line:scale-[2]"
                          />
                          {item.name}
                        </RevealItem>
                      ))}
                    </ul>

                    <RevealItem className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                      {plate.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="lux-underline group/link inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-ink/75"
                        >
                          {l.label}
                          <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="text-accent transition-transform duration-500 ease-lux group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </Link>
                      ))}
                    </RevealItem>
                  </SectionReveal>

                  {/* The plate. Offset gold frame BEHIND it, parallax drift,
                      curtain reveal, mouse-tracked tilt, glass caption. The
                      cursor is part of the plate: it declares what it wants the
                      global cursor to become and does not implement any of it.

                      `isolate` is load-bearing, not decoration: `.plate-offset`
                      draws its gold frame at z-index:-1, and without a stacking
                      context of its own that frame would be painted BEHIND the
                      section's own background and simply never appear. */}
                  <div className={`relative isolate ${flip ? 'lg:order-1' : ''}`}>
                    <Link
                      href={primary.href}
                      data-cursor="view"
                      data-cursor-label="Explore"
                      data-cursor-image={plate.image}
                      className="plate-offset group block"
                    >
                      <ParallaxPlate
                        distance={36}
                        className={`lux-media lux-tint relative aspect-[4/5] w-full overflow-hidden bg-bone ${PLATE_SHAPE[i]}`}
                      >
                        <MaskPlate from={PLATE_MASK[i]} className="h-full w-full">
                          <TiltPlate className="h-full w-full" strength={4} depth={10}>
                            <div className="relative h-full w-full">
                              <Image
                                src={plate.image}
                                alt={plate.alt}
                                fill
                                loading="lazy"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                quality={70}
                                className="object-cover"
                              />

                              {/* Grade — rises from the foot so the caption is
                                  legible over any photograph, bright or dark. */}
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/10 to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
                              />

                              <span
                                aria-hidden="true"
                                className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                              >
                                <span className="block font-serif text-[22px] font-light leading-tight text-white">
                                  {g.name}
                                </span>
                                <span className="mt-3 block font-caps text-[9px] uppercase tracking-wide2 text-gold">
                                  {primary.label}
                                </span>
                              </span>
                            </div>
                          </TiltPlate>
                        </MaskPlate>
                      </ParallaxPlate>
                    </Link>

                    {/* The letter chip — breaks out of the plate's edge. This is
                        the layer that makes the composition read as assembled
                        rather than cropped. Decorative; never a hit target. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-8 z-10 hidden border border-divider bg-white px-6 py-4 lg:block ${
                        flip ? '-right-6' : '-left-6'
                      }`}
                    >
                      <span className="block font-caps text-[10px] uppercase tracking-wide2 text-muted">
                        Discipline
                      </span>
                      <span className="mt-1 block font-serif text-3xl font-light leading-none text-ink">
                        {g.letter}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* ── 4. The index ───────────────────────────────────────────────────
            Fifteen categories, hairline cards — white on white, defined by a
            border and not by a drop shadow. Elevation is earned on hover. */}
        <section
          id="all-services"
          aria-labelledby="index-heading"
          className="section-y overflow-x-clip bg-background"
        >
          <div className="shell">
            <SectionReveal
              stagger
              amount={0.2}
              className="grid gap-10 border-b border-divider pb-14 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24"
            >
              <RevealItem>
                <p className="eyebrow">The full index</p>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <h2
                  id="index-heading"
                  className="mt-8 max-w-[11ch] font-serif text-headline font-light text-ink"
                >
                  Fifteen <span className="italic text-accent">categories</span>
                </h2>
              </RevealItem>

              <RevealItem
                as="p"
                className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pb-2"
              >
                Every capability we hold in-house, grouped as we actually run them on site.{' '}
                {pagedServiceCount} of them open onto a page of their own; the rest are listed here
                because they are part of the work, not because they need a landing page.
              </RevealItem>
            </SectionReveal>

            <SectionReveal
              as="ul"
              stagger
              amount={0.05}
              className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"
            >
              {serviceGroups.map((g) => (
                <RevealItem
                  as="li"
                  key={g.id}
                  className="lux-lift group/card flex flex-col rounded-2xl border border-divider bg-white p-8 transition duration-700 ease-lux sm:p-8"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-caps text-[10px] tracking-wide2 text-gold">
                      {g.letter}
                    </span>
                    <h3 className="font-serif text-title font-normal text-ink transition-colors duration-500 group-hover/card:text-accent">
                      {g.name}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-16 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover/card:scale-x-100"
                  />

                  <p className="mt-4 max-w-prose2 text-pretty text-sm leading-relaxed text-ink/65">
                    {g.body}
                  </p>

                  {/* A capability list, not a chip cloud. Items with a real page
                      are links; the rest are plain text — we never invent a route
                      to make something look clickable. */}
                  <ul className="mt-8 space-y-2 border-t border-divider pt-6">
                    {g.items.map((item) => (
                      <li key={item.name} className="text-sm leading-relaxed">
                        {item.slug ? (
                          <Link
                            href={routes.service(item.slug)}
                            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                          >
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            <span className="lux-underline">{item.name}</span>
                            <ArrowUpRight
                              size={13}
                              aria-hidden="true"
                              className="text-accent transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </Link>
                        ) : (
                          <span className="inline-flex items-start gap-2 text-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-divider"
                            />
                            {item.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* ── The close ──────────────────────────────────────────────────────
            Gold on olive-deep is 5.67:1; white at /70 clears the /50 floor. */}
        <section aria-labelledby="services-cta" className="section-y bg-olive-deep text-white">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionReveal stagger amount={0.3}>
              <RevealItem>
                <p className="font-caps text-[11px] uppercase tracking-wide4 text-gold">
                  Start with a drawing
                </p>
                <span aria-hidden="true" className="rule-gold mt-6" />
              </RevealItem>

              <RevealItem>
                <h2
                  id="services-cta"
                  className="mt-8 max-w-[14ch] font-serif text-headline font-light"
                >
                  See the home before it exists.
                </h2>
              </RevealItem>

              <RevealItem
                as="p"
                className="mt-8 max-w-prose2 text-pretty leading-relaxed text-white/70"
              >
                Every RGL home begins with a free 3D walkthrough of your actual floor plan, and an
                itemised estimate you can read line by line. Tell us the space and we will show you
                what it can become.
              </RevealItem>
            </SectionReveal>

            <SectionReveal stagger amount={0.3} className="flex flex-wrap items-center gap-6">
              <RevealItem>
                <Link href={routes.getQuote} className="btn-pill btn-gold">
                  Get a free 3D design
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </RevealItem>
              <RevealItem>
                <Link
                  href={routes.pricing}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-white/75"
                >
                  What it costs
                </Link>
              </RevealItem>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />

      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
