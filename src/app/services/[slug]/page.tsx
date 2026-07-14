import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { MaskPlate, TiltPlate, ParallaxPlate } from '@/components/motion/Plate'
import { buildMetadata, clampDesc, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { serviceCategories } from '@/data/business'
import { JsonLd, serviceSchema, breadcrumbSchema } from '@/lib/structured-data'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }))
}

const getCategory = (slug: string) => serviceCategories.find((s) => s.slug === slug)

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return buildMetadata({ title: 'Service', noindex: true })
  return buildMetadata({
    title: `${cat.name} in Chennai`,
    description: clampDesc(
      `Custom ${cat.name} in Chennai by RGL Decors — free HD 3D design, factory-built modules, branded hardware, itemised pricing and a written warranty. Book a consultation.`,
    ),
    path: routes.service(cat.slug),
    keywords: [`${cat.name} Chennai`, 'Interior Designers in Chennai', 'RGL Decors'],
  })
}

/**
 * THE SERVICE PAGE — one template, sixteen rooms that must not feel like one room.
 * ==============================================================================
 * A dark full-bleed plate opens the page and the nav floats over it (that is what
 * `data-hero-dark` on the <section> is for — Navbar watches for it and switches to
 * glass-over-dark while it is behind the bar). Below it the page alternates:
 * ruled scope index → an architectural plate → a spread of related plates → close.
 *
 * ── ONE TEMPLATE, SIXTEEN COMPOSITIONS ─────────────────────────────────────
 * A single template rendered sixteen times is sixteen identical pages. So the
 * layout is a function of the service's own index in `serviceCategories` (stable,
 * data-driven, no randomness — the same slug always composes the same way):
 *
 *   · SCOPE      — the heading column swaps side (left ⇄ right).
 *   · THE PLATE  — alternates between a FULL-BLEED plate running off the edge of
 *                  the viewport, and an INSET plate with a gold hairline frame
 *                  offset behind it (`.plate-offset`).
 *   · THE MASK   — the clip-path curtain lifts from bottom / left / right.
 *   · THE SHAPE  — 3:4 / 4:5 / 1:1.
 *   · THE SPREAD — which column of the related grid drops out of alignment.
 *
 * ── ABOVE THE FOLD THERE IS NO FRAMER MOTION ───────────────────────────────
 * The hero photograph is the LCP element (`priority`) and is therefore a BARE
 * <Image> — no MaskPlate (its clip-path would SSR the LCP invisible), no
 * TiltPlate (its transform would hand the LCP to hydration). The type over it is
 * revealed by the CSS keyframes .hero-fade / .hero-rise / .hero-rule, which run
 * on the first painted frame. A framer `initial` here was a measured 3.6s
 * regression on this codebase (DESIGN-SYSTEM §5, trap 1). Below the fold every
 * plate is a MaskPlate/TiltPlate/ParallaxPlate composition and framer is free.
 *
 * HONESTY (§6): the old body copy promised a "10-year warranty", which
 * contradicts the confirmed terms on /warranty (5-yr hardware / 1-yr carcass).
 * It is gone. Nothing on this page states a figure the business has not
 * confirmed — the copy describes the craft, and links to /warranty for terms.
 * The `metadata` block and the JSON-LD below are untouched by design.
 */

type Detail = {
  /** The photograph — same curated, desaturated Unsplash set as data/content.js. */
  image: string
  alt: string
  /** One or two lines. What this service actually is, in plain English. */
  lede: string
  /** What the scope covers. Descriptive, never a claim. */
  scope: string[]
}

const DETAILS: Record<string, Detail> = {
  'tv-units-chennai': {
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1600&q=75',
    alt: 'Media wall with a slim console, fluted panelling and concealed lighting',
    lede: 'The media wall is the piece a living room organises itself around. We plan it against the seating line, the daylight and the cable runs before a single panel is cut.',
    scope: [
      'Wall-hung and floor-standing consoles',
      'Concealed cabling, power and speaker provision',
      'Open display and closed storage in one composition',
      'Back panels in laminate, veneer, fluted timber or stone',
      'Profile lighting integrated into the joinery',
    ],
  },
  'wardrobe-design-chennai': {
    image:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=75',
    alt: 'Walk-in wardrobe with fluted timber shutters and integrated lighting',
    lede: 'Built to the millimetre of your wall rather than to a standard size, with the internals planned around what you actually own — so the doors close, and stay closed.',
    scope: [
      'Hinged, sliding and walk-in configurations',
      'Loft units that use the full height of the wall',
      'Internal planning: hanging, drawers, shelving, accessories',
      'Fronts in laminate, acrylic, veneer, lacquer or mirror',
      'Soft-close hinges and branded channels',
    ],
  },
  'bedroom-interior-chennai': {
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=75',
    alt: 'Serene bedroom with an upholstered headboard and concealed wardrobe',
    lede: 'Quiet materials, layered light and storage that disappears into the architecture. A bedroom should feel like the end of the day, not another room to manage.',
    scope: [
      'Bed, headboard and side-table design',
      'Wardrobe and loft storage planned as one wall',
      'False ceiling with cove and reading light',
      'Dresser, study niche or TV wall where the plan allows',
      'Curtains, upholstery and the finishing layer',
    ],
  },
  cabinets: {
    image:
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=75',
    alt: 'Close-up of cabinet shutters in laminate and high-gloss acrylic finishes',
    lede: 'The workhorse joinery of a home — foyer, utility, pantry and laundry. It is the cabinetry nobody photographs and everybody uses every single day.',
    scope: [
      'Base, wall and tall units',
      'Pantry, utility and laundry cabinets',
      'Shoe racks, foyer consoles and vanity units',
      'Moisture-resistant boards specified for wet zones',
      'Hardware matched to the daily load it carries',
    ],
  },
  'wallpapers-paintings': {
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=75',
    alt: 'Interior with a textured accent wall and rich timber shelving',
    lede: 'The surface layer sets the temperature of a room. Getting it right is mostly preparation — the finish is only ever as good as the wall underneath it.',
    scope: [
      'Interior and exterior painting',
      'Textures, stencils and accent finishes',
      'Wallpaper supply and installation',
      'Surface preparation, putty and priming',
      'Colour chosen against the light your rooms actually get',
    ],
  },
  'crockery-units': {
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=75',
    alt: 'Dining space with pendant lighting over a solid timber table',
    lede: 'Part storage, part display — the piece that gives a dining room its centre of gravity and keeps the kitchen out of the conversation.',
    scope: [
      'Crockery, bar and display units',
      'Glass, mesh or solid shutters',
      'Profile lighting inside the display',
      'Counter with concealed storage below',
      'Finishes matched to the dining table and the floor',
    ],
  },
  'modular-kitchen-chennai': {
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=75',
    alt: 'Modular kitchen with a stone worktop and handleless cabinetry',
    lede: 'The kitchen is where an interior is judged, so it is where we are strictest. Modules are cut, drilled and 360° edge-banded on the factory line, then assembled on site to the drawing.',
    scope: [
      'L, U, parallel, straight and island layouts',
      'Tall units, pantry and appliance garages',
      'Countertops in quartz, granite or solid surface',
      'Carcasses specified for coastal humidity',
      'Soft-close hardware, pull-outs and corner solutions',
    ],
  },
  'storage-units': {
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=75',
    alt: 'Compact, brightly lit apartment living area with built-in storage',
    lede: 'Storage is what separates a calm home from a tidy one. We find the volume a flat already has — lofts, thresholds, dead corners — and give it back to you.',
    scope: [
      'Loft, utility and under-stair storage',
      'Foyer, shoe and utility cabinets',
      'Open shelving and closed carcasses in one run',
      'Pull-outs, baskets and drawer systems',
      'Finishes that let the storage disappear into the wall',
    ],
  },
  'study-units': {
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=75',
    alt: 'Quiet workspace with a timber desk, shelving and natural light',
    lede: 'A desk that is actually worked at — planned around the daylight, the screen and the cabling, rather than around a photograph.',
    scope: [
      'Wall-mounted and freestanding desks',
      'Overhead, under-desk and side storage',
      'Bookshelves and display in the same language',
      'Cable routing and power planned into the drawing',
      'Task lighting at the height it needs to be',
    ],
  },
  'smart-home-chennai': {
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=75',
    alt: 'Modern living room with concealed lighting and clean wall surfaces',
    lede: 'Automation that makes a house respond to you — designed with the electricals rather than bolted on afterwards, so nothing is surface-mounted as an apology.',
    scope: [
      'Lighting and scene control',
      'Motorised curtains and blinds',
      'Smart switches, sensors and locks',
      'Home-theatre and audio provision',
      'CCTV, video door phone and alarms',
    ],
  },
  'bathroom-fixtures': {
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=75',
    alt: 'Spa bathroom with stone walls and a freestanding bath',
    lede: 'The most punished room in a Chennai home. Everything here is chosen for water, heat and daily use first, and for the photograph second.',
    scope: [
      'Vanity units and mirror cabinets',
      'Faucets, showers and sanitaryware',
      'Shower enclosures and glass partitions',
      'Waterproofing and tiling coordinated with the civil works',
      'Storage built to survive a wet room',
    ],
  },
  'art-gallery-artifacts': {
    image:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=75',
    alt: 'Styled interior with artefacts, textiles and dark timber furniture',
    lede: 'The layer that stops a finished home looking like a showroom. Art, sculpture and objects chosen for the wall they will live on and the light that will fall on them.',
    scope: [
      'Curated artwork, prints and photography',
      'Sculptures, artefacts and collected objects',
      'Framing, mounting and hanging',
      'Accent and picture lighting',
      'Styling of shelves, consoles and niches',
    ],
  },
  'plants-landscaping': {
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75',
    alt: 'Villa exterior with planting and warm evening light',
    lede: 'Terraces, balconies and gardens treated as rooms rather than leftovers — planted, lit, drained and furnished so the outside of the home gets used as much as the inside.',
    scope: [
      'Balcony, terrace and courtyard planting',
      'Indoor and low-light plant selection',
      'Planters, decking and outdoor seating',
      'Irrigation and drainage',
      'Garden, pathway and facade lighting',
    ],
  },
  'home-appliances': {
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=75',
    alt: 'Kitchen with integrated appliances and a warm timber worktop',
    lede: 'Appliances specified alongside the joinery, so the chimney, hob and oven fit the module — instead of the module being cut open to fit them.',
    scope: [
      'Chimney, hob and built-in oven',
      'Dishwasher and refrigerator integration',
      'Microwave housings and appliance garages',
      'Sink, faucet and water purifier',
      'Electrical and plumbing provision drawn in advance',
    ],
  },
  'finished-furniture': {
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=75',
    alt: 'Living room with linen seating, a timber table and soft daylight',
    lede: 'Loose furniture made to your dimensions rather than to a catalogue’s — and finished to match the room it will live in, not the room it was photographed in.',
    scope: [
      'Sofas and upholstered seating',
      'Dining and coffee tables',
      'Beds, side tables and benches',
      'Bookshelves and display units',
      'Fabric, timber and finish selection with you',
    ],
  },
  'indoor-outdoor-lighting': {
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75',
    alt: 'Interior lit by sculptural pendant lighting above a dining table',
    lede: 'Light is the difference between a room that works at 8am and one that works at midnight. We layer ambient, task and accent light — and plan the switching before the ceiling closes.',
    scope: [
      'Cove, profile and recessed lighting',
      'Chandeliers, pendants and decorative lamps',
      'Track lights and accent spots',
      'Facade, garden and pathway lighting',
      'Circuiting and scene planning',
    ],
  },
}

/**
 * The four beats of an RGL project, told from the point of view of this service.
 * The full ten-step version lives on /process — this is the trailer, not the film.
 */
const CRAFT = [
  {
    n: '01',
    title: 'Listen, then draw',
    body: 'We start with the space and how you live in it. Measurements, sightlines, storage you actually need — then a layout.',
  },
  {
    n: '02',
    title: 'See it before it exists',
    body: 'A 3D walkthrough of your real floor plan, plus an itemised estimate you can read line by line. Change it here, not on site.',
  },
  {
    n: '03',
    title: 'Build it off site',
    body: 'Panels are cut, drilled and 360° edge-banded on an automated line, so production runs in parallel with the civil work.',
  },
  {
    n: '04',
    title: 'Install, snag, hand over',
    body: 'Site installation, a formal snagging walkthrough with you, and complimentary one-year post-service care after you move in.',
  },
]

/** The craft plate. One photograph, sixteen different ways of presenting it. */
const CRAFT_PLATE = {
  src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=75',
  alt: 'Interior drawings, material samples and a tape measure laid out on a table',
}

const MASKS = ['bottom', 'left', 'right'] as const
const SHAPES = ['lg:aspect-[3/4]', 'lg:aspect-[4/5]', 'lg:aspect-[1/1]'] as const

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const cat = getCategory(slug)!
  const detail = DETAILS[cat.slug]
  const related = serviceCategories.filter((s) => s.slug !== cat.slug).slice(0, 6)

  // The composition seed. Stable and data-driven: the same slug always renders
  // the same spread, but no two neighbouring services render the same one.
  const idx = serviceCategories.findIndex((s) => s.slug === cat.slug)
  const scopeFlip = idx % 2 === 1
  /** Even services get the full-bleed plate; odd services get the framed inset. */
  const insetPlate = idx % 2 === 1
  const maskFrom = MASKS[idx % MASKS.length]
  const plateShape = SHAPES[idx % SHAPES.length]
  /** Which column of the related spread drops out of the line. */
  const dropColumn = idx % 2 === 0 ? 1 : 2

  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Services', path: routes.services },
    { name: cat.name, path: routes.service(cat.slug) },
  ]

  return (
    <>
      <Navbar />

      <main id="main" className="bg-background">
        {/* ── The plate ──────────────────────────────────────────────────────
            `data-hero-dark` is the contract Navbar reads to go glass-over-dark
            while this section is behind the bar. The two gradients are not
            decoration: they are what keeps white type above 4.5:1 over ANY
            photograph, including the bright ones. A bare <Image priority> — the
            LCP element is never wrapped in a mask or a transform. */}
        <section
          data-hero-dark
          aria-labelledby="service-heading"
          className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-olive-deep pb-16 pt-[9.5rem] lg:min-h-[86vh] lg:pb-24 lg:pt-[12rem]"
        >
          <Image
            src={detail.image}
            alt={detail.alt}
            fill
            priority
            sizes="100vw"
            quality={72}
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-olive-deep/95 via-olive-deep/60 to-olive-deep/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-olive-deep/85 via-olive-deep/20 to-olive-deep/50"
          />

          <div className="shell relative">
            <nav aria-label="Breadcrumb" className="hero-fade mb-10">
              <ol className="flex flex-wrap items-center gap-2 font-caps text-[10px] uppercase tracking-wide2 text-white/70">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1
                  return (
                    <li key={c.path} className="flex items-center gap-2">
                      {last ? (
                        <span className="text-white" aria-current="page">
                          {c.name}
                        </span>
                      ) : (
                        <>
                          <Link href={c.path} className="transition-colors hover:text-gold">
                            {c.name}
                          </Link>
                          <span aria-hidden="true" className="text-white/40">
                            /
                          </span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>

            <p className="hero-fade font-caps text-[11px] uppercase tracking-wide4 text-gold">
              RGL Décors · Services
            </p>
            <span
              aria-hidden="true"
              className="rule-gold hero-rule mt-6"
              style={{ '--d': '120ms' } as CSSProperties}
            />

            {/* Mask reveal, CSS only: the outer span clips, the inner one rises
                out of it. It is painted at frame one, so it can still be the LCP. */}
            <h1
              id="service-heading"
              className="mt-8 max-w-[14ch] font-serif text-display font-light text-white"
            >
              <span className="hero-mask">
                <span className="hero-rise" style={{ '--d': '60ms' } as CSSProperties}>
                  {cat.name}
                </span>
              </span>
              <span className="hero-mask">
                <span
                  className="hero-rise italic text-gold"
                  style={{ '--d': '160ms' } as CSSProperties}
                >
                  in Chennai
                </span>
              </span>
            </h1>

            <p
              className="hero-fade mt-8 max-w-prose2 text-lede text-pretty text-white/75"
              style={{ '--d': '260ms' } as CSSProperties}
            >
              {detail.lede}
            </p>

            <div
              className="hero-fade mt-12 flex flex-wrap items-center gap-6"
              style={{ '--d': '340ms' } as CSSProperties}
            >
              <Link href={routes.getQuote} className="btn-pill btn-gold">
                Get a free 3D design
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a
                href={`tel:${siteConfig.nap.phoneE164}`}
                className="btn-pill border border-white/30 bg-transparent text-white hover:border-gold hover:bg-gold hover:text-ink"
              >
                Call {siteConfig.nap.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* ── The scope ──────────────────────────────────────────────────────
            A ruled index, not a grid of boxes — the contents page of a monograph.
            It says what is in the work and nothing about what it is worth. Every
            line arrives on its own beat, and the heading column changes side from
            one service to the next. */}
        <section
          aria-labelledby="scope-heading"
          className="section-y overflow-x-clip bg-background"
        >
          <div
            className={`shell grid gap-14 lg:gap-24 ${
              scopeFlip ? 'lg:grid-cols-[1fr_auto]' : 'lg:grid-cols-[auto_1fr]'
            }`}
          >
            <SectionReveal
              stagger
              amount={0.3}
              className={scopeFlip ? 'lg:order-2' : undefined}
            >
              <RevealItem>
                <p className="eyebrow">What it covers</p>
                <span aria-hidden="true" className="rule-gold mt-6" />
              </RevealItem>
              <RevealItem>
                <h2
                  id="scope-heading"
                  className="mt-8 max-w-[11ch] font-serif text-headline font-light text-ink"
                >
                  The <span className="italic text-accent">scope</span>
                </h2>
              </RevealItem>
            </SectionReveal>

            <SectionReveal
              as="ol"
              stagger
              amount={0.1}
              className={`lg:pt-2 ${scopeFlip ? 'lg:order-1' : ''}`}
            >
              {detail.scope.map((line, i) => (
                <RevealItem
                  as="li"
                  key={line}
                  className="group relative flex items-start gap-6 border-b border-divider py-8 first:border-t"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                  />
                  <span className="mt-1 font-caps text-[10px] tracking-wide2 text-gold transition-transform duration-700 ease-lux group-hover:translate-x-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="max-w-prose2 text-pretty leading-relaxed text-ink/80 transition-transform duration-700 ease-lux group-hover:translate-x-1">
                    {line}
                  </p>
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="ml-auto mt-1 hidden shrink-0 -translate-x-2 text-accent opacity-0 transition duration-700 ease-lux group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                  />
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* ── How it comes together ──────────────────────────────────────────
            The architectural split. Two compositions, chosen by the service's own
            index so that no two neighbouring pages open the same way:

              · FULL-BLEED — the plate runs off the edge of the viewport, the type
                stays on the shell column via `.pl-shell`. `overflow-x-clip` on the
                section is what lets it do that without a scrollbar at 375px.
              · INSET — the plate sits inside the shell with a gold hairline frame
                offset BEHIND it (`.plate-offset`), which closes toward the image
                on hover. The frame and the picture are not the same rectangle. */}
        <section aria-labelledby="craft-heading" className="section-y overflow-x-clip bg-bone">
          <div className={insetPlate ? 'shell' : undefined}>
            <div
              className={`grid w-full items-center gap-s8 lg:gap-24 ${
                insetPlate ? 'lg:grid-cols-[7fr_5fr]' : 'lg:grid-cols-2'
              }`}
            >
              <SectionReveal
                stagger
                amount={0.2}
                className={insetPlate ? 'lg:order-2' : 'px-gutter lg:pl-shell'}
              >
                <RevealItem>
                  <p className="eyebrow">How we craft</p>
                  <span aria-hidden="true" className="rule-gold mt-6" />
                </RevealItem>

                <RevealItem>
                  <h2
                    id="craft-heading"
                    className="mt-8 max-w-[13ch] font-serif text-headline font-light text-ink"
                  >
                    From drawing to <span className="italic text-accent">handover.</span>
                  </h2>
                </RevealItem>

                <ol className="mt-12">
                  {CRAFT.map((step) => (
                    <RevealItem
                      as="li"
                      key={step.n}
                      className="group/step border-t border-divider py-8 last:border-b"
                    >
                      <div className="flex items-start gap-6">
                        <span className="mt-1 font-caps text-[10px] tracking-wide2 text-gold transition-transform duration-700 ease-lux group-hover/step:translate-x-1">
                          {step.n}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-serif text-title font-normal text-ink transition-colors duration-500 group-hover/step:text-accent">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-prose2 text-pretty text-sm leading-relaxed text-ink/65">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </ol>

                <RevealItem className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href={routes.process}
                    className="lux-underline group/link inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-ink/75"
                  >
                    The full ten steps
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="text-accent transition-transform duration-500 ease-lux group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </Link>
                  <Link
                    href={routes.warranty}
                    className="lux-underline group/link inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-ink/75"
                  >
                    Warranty terms
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="text-accent transition-transform duration-500 ease-lux group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </RevealItem>
              </SectionReveal>

              {/* The plate itself. ParallaxPlate gives the photograph and its
                  frame two different speeds; MaskPlate lifts the curtain from a
                  different edge on every service; TiltPlate adds the mouse-tracked
                  depth (desktop only, self-disabling under reduced motion). */}
              {/* `isolate`: `.plate-offset` draws its gold frame at z-index:-1,
                  and without a stacking context of its own that frame would paint
                  BEHIND the section's background and never appear at all. */}
              <div className={`relative isolate ${insetPlate ? 'lg:order-1' : ''}`}>
                <div className={insetPlate ? 'plate-offset group' : 'group'}>
                  <ParallaxPlate
                    distance={40}
                    className={`lux-media lux-tint relative aspect-[4/5] w-full overflow-hidden bg-bone ${plateShape}`}
                  >
                    <MaskPlate from={maskFrom} className="h-full w-full">
                      <TiltPlate className="h-full w-full" strength={4} depth={10}>
                        <div className="relative h-full w-full">
                          <Image
                            src={CRAFT_PLATE.src}
                            alt={CRAFT_PLATE.alt}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            quality={70}
                            className="object-cover"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-deep/80 via-transparent to-transparent"
                          />
                          <span
                            aria-hidden="true"
                            className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 p-6"
                          >
                            <span className="block font-caps text-[9px] uppercase tracking-wide2 text-gold">
                              Drawing · Estimate · Factory · Handover
                            </span>
                            <span className="mt-3 block font-serif text-[22px] font-light leading-tight text-white">
                              {cat.name}, planned before anything is cut.
                            </span>
                          </span>
                        </div>
                      </TiltPlate>
                    </MaskPlate>
                  </ParallaxPlate>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related ────────────────────────────────────────────────────────
            A spread, not a card grid. Each related service is a plate: curtain
            reveal on entry, 3D tilt on hover, a glass caption that rises over the
            foot, and a caption line beneath a hairline that draws itself gold.
            Every plate declares what the global cursor should become — the pill
            label and the floating photographic preview are the cursor's job, not
            the card's. One column drops out of the line so the eye reads a spread. */}
        <section aria-labelledby="related-heading" className="section-y overflow-x-clip bg-background">
          <div className="shell">
            <SectionReveal
              stagger
              amount={0.2}
              className="grid gap-10 border-b border-divider pb-14 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24"
            >
              <RevealItem>
                <p className="eyebrow">Elsewhere in the house</p>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <h2
                  id="related-heading"
                  className="mt-8 max-w-[11ch] font-serif text-headline font-light text-ink"
                >
                  Related <span className="italic text-accent">services</span>
                </h2>
              </RevealItem>
              <RevealItem
                as="p"
                className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pb-2"
              >
                Most homes need several of these at once — which is the argument for one team holding
                all of them. See every category, or start with the cost.
              </RevealItem>
            </SectionReveal>

            <SectionReveal
              as="ul"
              stagger
              amount={0.05}
              className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24"
            >
              {related.map((s, i) => {
                const d = DETAILS[s.slug]
                return (
                  <RevealItem
                    as="li"
                    key={s.slug}
                    className={i % 3 === dropColumn ? 'lg:mt-16' : undefined}
                  >
                    <Link
                      href={routes.service(s.slug)}
                      data-cursor="view"
                      data-cursor-label="Explore"
                      data-cursor-image={d.image}
                      className="group block"
                    >
                      <MaskPlate
                        from={i % 2 === 0 ? 'bottom' : 'left'}
                        className="lux-media lux-tint relative aspect-[4/3] w-full overflow-hidden bg-bone"
                      >
                        <TiltPlate className="h-full w-full" strength={4} depth={9}>
                          <div className="relative h-full w-full">
                            <Image
                              src={d.image}
                              alt={d.alt}
                              fill
                              loading="lazy"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              quality={65}
                              className="object-cover"
                            />

                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/10 to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
                            />

                            <span
                              aria-hidden="true"
                              className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                            >
                              <span className="block font-serif text-[20px] font-light leading-tight text-white">
                                {s.name}
                              </span>
                              <span className="mt-3 block font-caps text-[9px] uppercase tracking-wide2 text-gold">
                                Explore
                              </span>
                            </span>
                          </div>
                        </TiltPlate>
                      </MaskPlate>

                      {/* Caption, not a card footer. */}
                      <div className="relative pt-6">
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-px bg-divider"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                        />

                        <h3 className="flex items-start justify-between gap-4 font-serif text-title font-normal text-ink transition-colors duration-500 group-hover:text-accent">
                          {s.name}
                          <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:translate-x-1"
                          />
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">
                          {d.lede.split('. ')[0]}.
                        </p>
                      </div>
                    </Link>
                  </RevealItem>
                )
              })}
            </SectionReveal>

            <SectionReveal
              stagger
              amount={0.2}
              className="mt-16 flex flex-wrap items-center gap-8"
            >
              <RevealItem>
                <Link href={routes.services} className="btn-pill btn-olive">
                  All 15 categories
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </RevealItem>
              <RevealItem>
                <Link
                  href={routes.pricing}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
                >
                  See pricing
                </Link>
              </RevealItem>
            </SectionReveal>
          </div>
        </section>

        {/* ── The close ──────────────────────────────────────────────────────
            Gold on olive-deep is 5.67:1; white at /70 clears the /50 floor. */}
        <section aria-labelledby="service-cta" className="section-y bg-olive-deep text-white">
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
                  id="service-cta"
                  className="mt-8 max-w-[15ch] font-serif text-headline font-light"
                >
                  Let us show you your {cat.name.toLowerCase()} first.
                </h2>
              </RevealItem>
              <RevealItem
                as="p"
                className="mt-8 max-w-prose2 text-pretty leading-relaxed text-white/70"
              >
                Send us the floor plan and we will come back with a 3D walkthrough of your actual
                space and an itemised estimate you can read line by line — before anything is cut.
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
                  href={routes.contact}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-white/75"
                >
                  Talk to the studio
                </Link>
              </RevealItem>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />

      <JsonLd
        id="ld-service"
        data={serviceSchema({
          name: cat.name,
          description: `${cat.name} by RGL Decors in Chennai.`,
          slug: cat.slug,
        })}
      />
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
