import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { MaskPlate, TiltPlate, ParallaxPlate } from '@/components/motion/Plate'
import StatsSection from '@/components/StatsSection.jsx'
import ProcessTimeline from '@/components/about/ProcessTimeline'
import TeamGrid from '@/components/about/TeamGrid'
import AwardsWall from '@/components/about/AwardsWall'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'
import { usps, companyFacts, business, STATS_VERIFIED } from '@/data/business'
import { awards, TEAM_PHOTOS_AVAILABLE } from '@/data/credentials'

export const metadata: Metadata = buildMetadata({
  title: 'The RGL Story',
  description:
    'The RGL Decors story — founded in Chennai in 2018 on one belief: interiors should be living reflections of identity, lifestyle and status, not just walls.',
  path: routes.about,
})

/**
 * THE RGL STORY — a monograph, not a company profile.
 * ============================================================================
 * Structure: origin → the numbers → philosophy → the ten-step craft → the
 * workshop. Alternating architectural splits, one photograph per movement, and
 * headlines set in light Cormorant with a great deal of air around them.
 *
 * HONESTY GATES (src/data/credentials.ts) — both of these are BUILT and OFF:
 *   · <TeamGrid>   renders only when TEAM_PHOTOS_AVAILABLE === true. It is false.
 *                  The names/roles are real; the PHOTOGRAPHS do not exist, and
 *                  stock portraits of strangers captioned as RGL's staff would be
 *                  a fabrication about identifiable people.
 *   · <AwardsWall> renders only when `awards` is non-empty. It is empty. No
 *                  invented rosettes.
 * Every figure in the numbers band is client-verified (STATS_VERIFIED), and the
 * warranty is stated exactly as /warranty states it: 5 years on hardware, one
 * year on shutters, carcass and carpentry. Nothing here is invented.
 *
 * MOTION: the masthead (PageStub) carries the LCP <h1> and animates with CSS
 * only. Everything below the fold reveals through SectionReveal/RevealItem, whose
 * observer sits on the untransformed parent. The story split is the one place
 * using fadeLeft/fadeRight (±32px off-axis), so its grid is `overflow-x-clip` —
 * without it those 32px push past the viewport edge at 375px.
 *
 * THE PLATES: not one photograph on this page is a plain rectangle. Each is a
 * composed plate (src/components/motion/Plate.tsx) — a clip-path curtain that
 * lifts (<MaskPlate>), a 3D tilt with mouse-tracked depth (<TiltPlate>) or a
 * scroll-linked drift (<ParallaxPlate>), a gold hairline frame set BEHIND and
 * offset from the picture (.plate-offset), and a frosted caption bar (.plate-glass).
 * The opening plate is two rectangles at two depths, deliberately off-axis. Each
 * plate also declares `data-cursor-image`, so the global cursor swells into a
 * preview of the very photograph under the pointer — the card implements none of
 * that, it only declares it.
 */

// Map the canonical USP icon names to the lucide components we render.
const USP_ICONS: Record<string, LucideIcon> = {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
}

/**
 * The four beats of the studio's philosophy. Not a new claim between them: each
 * is the client's own "we listen, design, craft and care" line, expanded with the
 * matching stage from data/process.ts + the matching USP from data/business.ts.
 */
const PHILOSOPHY = [
  {
    n: '01',
    title: 'Listen',
    text: 'Your lifestyle, taste, budget and aspirations shape everything that follows. The brief leads — not a catalogue, not a template.',
  },
  {
    n: '02',
    title: 'Design',
    text: 'Palettes, material stories and spatial concepts, then an immersive 3D walkthrough. You see every room before it is built.',
  },
  {
    n: '03',
    title: 'Craft',
    text: 'Factory-engineered production meets on-site execution by one accountable team, with a 100+ point inspection before you move in.',
  },
  {
    n: '04',
    title: 'Care',
    text: 'A written warranty, and complimentary one-year post-service care. A home should still feel like yours long after the last panel goes in.',
  },
]

/**
 * THE PLATES. One constant per photograph, because the src is needed twice: once
 * by <Image>, and once by `data-cursor-image` so the cursor can swell into a
 * preview of the very plate you are pointing at. Two literals would drift.
 */
const PLATES = {
  origin:
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80',
  originInset:
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  philosophy:
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80',
  workshop:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80',
} as const

/** The client's own promise list (PDF §The RGL Story). Five lines, no additions. */
const PROMISE = [
  'A complete turnkey experience — designed, managed and delivered by one team',
  'Immersive 3D walkthroughs, so you visualise before you build',
  '100+ quality checks and a snagging walkthrough before you move in',
  'Complimentary one-year post-service care after handover',
  'Transparent, itemised costing — no hidden markups',
]

/**
 * Real names and roles (business.ts → contacts.departments). Photography is what
 * is missing, which is exactly what TEAM_PHOTOS_AVAILABLE gates.
 */
const TEAM = business.contacts.departments.map((d) => ({ name: d.name, role: d.role }))

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'About', path: routes.about },
  ]

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'The RGL Story',
    url: `${siteConfig.url}${routes.about}`,
    description:
      'The story, promise and craft behind RGL Decors — premium interior designers in Chennai since 2018.',
    about: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }

  return (
    <PageStub
      title="The RGL Story"
      kicker="RGL Décors · Our Story"
      intro={`${companyFacts.foundedLabel}, RGL Décors began with a simple belief — interiors should be more than walls and furniture; they should be living reflections of identity, lifestyle and status. What started as a vision has grown into Chennai's trusted premium interior and turnkey execution studio.`}
      crumbs={crumbs}
      cta={{ label: 'Book Private Consultation', href: routes.getQuote }}
    >
      {/* ── ORIGIN ────────────────────────────────────────────────────────────
          Photograph left, story right — the first of the alternating splits.
          `overflow-x-clip` because fadeRight/fadeLeft start ±32px off-axis and
          would otherwise open a horizontal scrollbar at 375px. Clipping here is
          safe: `overflow` creates no containing block. */}
      <section
        id="story"
        aria-labelledby="story-heading"
        className="grid gap-14 overflow-x-clip pb-section-sm lg:grid-cols-12 lg:gap-16"
      >
        {/* THE OPENING PLATE — not a rectangle. A tall portrait plate carrying a
            gold hairline frame offset behind it, a glass caption bar that drops
            from its head on hover, and a smaller landscape counter-plate dropped
            over its foot, off its axis, drifting at its own scroll speed. Two
            rectangles at two depths reads as a composition; one reads as a stock
            photo. */}
        <SectionReveal variant="fadeRight" className="lg:col-span-5">
          <div
            data-cursor="view"
            data-cursor-label={`${business.nap.addressLocality} · ${companyFacts.foundedYear}`}
            data-cursor-image={PLATES.origin}
            className="plate-offset group relative"
          >
            <MaskPlate
              from="bottom"
              className="relative aspect-[4/5] w-full overflow-hidden bg-bone"
            >
              <TiltPlate className="h-full w-full" strength={4} depth={10}>
                <div className="lux-tint relative h-full w-full">
                  <Image
                    src={PLATES.origin}
                    alt="Contemporary living space with rich wood shelving and layered, low lighting"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-olive-deep/85 via-olive-deep/10 to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
                  />

                  {/* This caption drops from the HEAD, not the foot: the
                      counter-plate below overlaps this plate's bottom-right, and a
                      caption rising into it would be half-occluded. */}
                  <span
                    aria-hidden="true"
                    className="plate-glass pointer-events-none absolute inset-x-0 top-0 -translate-y-full p-6 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                  >
                    <span className="block font-serif text-xl font-light leading-tight text-white">
                      Where it began
                    </span>
                    <span className="mt-2 block font-caps text-[9px] uppercase tracking-wide2 text-gold">
                      {companyFacts.foundedLabel} · {business.nap.addressLocality}
                    </span>
                  </span>
                </div>
              </TiltPlate>
            </MaskPlate>
          </div>

          {/* The counter-plate. Overlaps the portrait's foot, sits off its axis,
              and drifts on scroll — the depth cue that turns two photographs into
              one layered spread. The parent grid is `overflow-x-clip`, so the
              drift can never open a scrollbar. */}
          <div className="relative z-10 -mt-16 ml-auto w-2/3 sm:w-1/2 lg:w-3/5">
            <MaskPlate
              from="right"
              delay={0.15}
              className="relative aspect-[4/3] w-full overflow-hidden bg-bone shadow-lift"
            >
              {/* Drift must stay inside ParallaxPlate's 1.12 overscan (6% of the
                  plate's height each side) or the frame shows an edge. This plate
                  is only ~167px tall at 375px → ~10px of headroom, so 12 is the
                  ceiling. Small drift, real depth. */}
              <ParallaxPlate distance={12} className="h-full w-full">
                <div className="lux-tint relative h-full w-full">
                  <Image
                    src={PLATES.originInset}
                    alt="Detail of a hand-finished cabinet front in warm oak veneer"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </ParallaxPlate>
            </MaskPlate>
          </div>
        </SectionReveal>

        <SectionReveal variant="fadeLeft" className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <p className="eyebrow">Our story</p>
          <span aria-hidden="true" className="rule-gold mt-6" />

          <h2
            id="story-heading"
            className="mt-8 max-w-[14ch] font-serif text-headline font-light text-ink"
          >
            Crafting spaces, <span className="italic text-accent">shaping identities</span>
          </h2>

          <div className="mt-8 space-y-6 text-pretty leading-relaxed text-ink/70">
            <p>
              From our very first project we set out to deliver not just elegant designs but
              experiences that elevate how people live. Every detail — from mood boards to
              factory-engineered precision — is chosen to mirror who our clients are and the life
              they aspire to lead.
            </p>
            <p>
              We listen, design, craft and care. Every finish, fitting, surface and fixture is
              selected for durability, elegance and everyday performance — because a home should
              still feel like yours a decade after the last panel goes in.
            </p>
            <p className="text-ink">
              We don&apos;t just design interiors. We design identities.
            </p>
          </div>

          {/* The masthead facts, set as a ruled index — no card, no shadow. Each
              fact rises on its own beat rather than the block arriving at once. */}
          <SectionReveal
            stagger
            as="dl"
            amount={0.3}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-divider pt-8 sm:grid-cols-3"
          >
            {[
              { k: 'Founded', v: String(companyFacts.foundedYear) },
              { k: 'Based in', v: business.nap.addressLocality },
              { k: 'Discipline', v: 'Turnkey interiors' },
            ].map((f) => (
              <RevealItem key={f.k}>
                <dt className="font-caps text-[10px] uppercase tracking-wide2 text-muted">{f.k}</dt>
                <dd className="mt-2 font-serif text-2xl font-light text-ink">{f.v}</dd>
              </RevealItem>
            ))}
          </SectionReveal>
        </SectionReveal>
      </section>

      {/* ── THE NUMBERS ───────────────────────────────────────────────────────
          Client-verified figures only (business.ts → companyStats, STATS_VERIFIED).
          The gate is deliberate: if the client ever un-verifies them, the band
          disappears rather than shipping a number nobody stands behind. */}
      {STATS_VERIFIED && (
        <SectionReveal as="section" variant="fadeUp" className="bleed">
          <StatsSection />
        </SectionReveal>
      )}

      {/* ── PHILOSOPHY ────────────────────────────────────────────────────────
          A bone band. Four beats, a photograph, then the eight commitments those
          beats oblige us to — all from data/business.ts, none newly written. */}
      <section id="philosophy" aria-labelledby="philosophy-heading" className="bleed bg-bone">
        <div className="shell section-y">
          <SectionReveal className="max-w-prose2">
            <p className="eyebrow">Design philosophy</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2
              id="philosophy-heading"
              className="mt-8 font-serif text-headline font-light text-ink"
            >
              We listen, design, craft and <span className="italic text-accent">care</span>
            </h2>
            <p className="mt-8 text-lede text-pretty text-ink/70">
              Four movements, in that order. Everything we do sits inside one of them — and nothing
              moves to the next until you have signed off on the last.
            </p>
          </SectionReveal>

          <SectionReveal stagger className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {PHILOSOPHY.map((p) => (
              <RevealItem key={p.n} className="border-t border-divider pt-8">
                <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">{p.n}</span>
                <h3 className="mt-6 font-serif text-title font-normal text-ink">{p.title}</h3>
                <p className="mt-4 pb-10 text-pretty text-sm leading-relaxed text-ink/65">
                  {p.text}
                </p>
              </RevealItem>
            ))}
          </SectionReveal>

          {/* THE WIDE PLATE — the curtain lifts from the left, and the photograph
              inside it drifts against the scroll, so the frame and the picture
              never move together. A glass caption sits on the foot at rest: this
              plate is the movement's full stop, and it carries a line. */}
          <SectionReveal variant="fadeUp" className="mt-4">
            <div
              data-cursor="view"
              data-cursor-label="Listen · Design · Craft · Care"
              data-cursor-image={PLATES.philosophy}
              className="group relative"
            >
              <MaskPlate
                from="left"
                className="relative aspect-[16/10] w-full overflow-hidden bg-background sm:aspect-[16/7]"
              >
                {/* 16px, not the component's 60px default: at 375px this plate is
                    ~209px tall, so the 1.12 overscan only gives ~12px of hidden
                    margin each side. Drift beyond that exposes the frame. */}
                <ParallaxPlate distance={16} className="h-full w-full">
                  <div className="lux-tint relative h-full w-full">
                    <Image
                      src={PLATES.philosophy}
                      alt="Calm master bedroom with layered wooden textures and warm ambient light"
                      fill
                      loading="lazy"
                      sizes="(min-width: 1280px) 74rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                </ParallaxPlate>

                <span
                  aria-hidden="true"
                  className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-4 gap-y-2 p-6 sm:p-8"
                >
                  <span className="font-serif text-lg font-light text-white sm:text-xl">
                    Nothing moves to the next movement until you have signed off on the last
                  </span>
                  <span className="font-caps text-[9px] uppercase tracking-wide2 text-gold">
                    RGL Décors
                  </span>
                </span>
              </MaskPlate>

              {/* A gold hairline drawn under the plate, opening on hover — the
                  frame is a separate rectangle from the picture. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-gold transition-transform duration-1000 ease-lux group-hover:scale-x-100"
              />
            </div>
          </SectionReveal>

          {/* The eight USPs — the canonical list, set as a ruled index rather than
              eight drop-shadowed boxes. Definition list, so this adds no heading
              levels to a page that already has ten of them in the timeline. */}
          <div className="mt-20 lg:mt-28">
            <SectionReveal className="max-w-prose2">
              <h3 className="font-serif text-title font-normal text-ink">
                What that commits us to
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-ink/65">
                Eight commitments we make on every project — and the reason clients let us take a
                home from an empty shell to the day they move in.
              </p>
            </SectionReveal>

            <SectionReveal stagger as="dl" className="mt-12 grid lg:grid-cols-2 lg:gap-x-20">
              {usps.map((u) => {
                const Icon = USP_ICONS[u.icon] ?? CheckCircle2
                return (
                  <RevealItem key={u.title} className="group border-t border-divider py-8">
                    <dt className="flex items-center gap-4">
                      <Icon
                        size={18}
                        strokeWidth={1.25}
                        className="shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="font-serif text-xl font-normal text-ink">{u.title}</span>
                    </dt>
                    <dd className="mt-3 max-w-prose2 text-pretty text-sm leading-relaxed text-ink/65">
                      {u.description}
                    </dd>
                  </RevealItem>
                )
              })}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── THE TEN-STEP CRAFT ────────────────────────────────────────────────
          The real editorial timeline, straight from data/process.ts. */}
      <ProcessTimeline />

      {/* ── THE WORKSHOP ──────────────────────────────────────────────────────
          The dark editorial panel. Every claim below is already in the data:
          360° edge-banded factory panels (usps §Factory-Engineered Precision),
          parallel production (§On-Time Delivery Record), the 100+ point inspection
          and snagging walkthrough (§100+ Quality Checks / process §08), and the
          warranty exactly as /warranty writes it. No factory tour, no invented
          square footage, no machine names.

          Contrast: on olive-deep, white text must be /60 or lighter — /50 (4.58:1)
          is the floor. Body sits at /70. Gold on olive-deep is 5.67:1 ✓, so the
          eyebrow is gold here rather than the olive `.eyebrow`, which would sink
          into the ground. */}
      <section id="workshop" aria-labelledby="workshop-heading" className="bleed bg-olive-deep">
        <div className="shell section-y grid gap-14 lg:grid-cols-12 lg:gap-16">
          <SectionReveal variant="fadeUp" className="lg:col-span-6 lg:self-center">
            <p className="font-caps text-[11px] uppercase tracking-wide4 text-gold">
              Craftsmanship
            </p>
            <span aria-hidden="true" className="rule-gold mt-6" />

            <h2
              id="workshop-heading"
              className="mt-8 max-w-[14ch] font-serif text-headline font-light text-white"
            >
              Engineered in the factory. <span className="italic text-gold">Finished by hand.</span>
            </h2>

            <div className="mt-8 space-y-6 text-pretty leading-relaxed text-white/70">
              <p>
                Panels are cut, drilled and 360° edge-banded in an automated factory — joinery
                engineered for the coast, then fitted and finished on site by one accountable team.
                Nothing is lost between trades, because there are no trades to hand between.
              </p>
              <p>
                Production runs in parallel with site works, tracked by a single project engineer.
                Before you are given the keys, we run a formal 100+ point inspection and a snagging
                walkthrough — with you in the room.
              </p>
            </div>

            {/* The five promises tick in one by one — a list that arrives as a
                block is a paragraph; a list that arrives in sequence is a count.
                The inner reveal declares its own `initial`, so it is its own
                variant root and the stagger is not swallowed by the parent. */}
            <SectionReveal
              stagger
              as="ul"
              amount={0.2}
              className="mt-10 space-y-4 border-t border-white/15 pt-8"
            >
              {PROMISE.map((line) => (
                <RevealItem
                  as="li"
                  key={line}
                  className="group/promise flex items-start gap-4 text-sm text-white/70"
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-gold transition-transform duration-700 ease-lux group-hover/promise:scale-110"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </RevealItem>
              ))}
            </SectionReveal>

            <p className="mt-10 max-w-prose2 text-sm leading-relaxed text-white/60">
              Five years on hardware; one year on shutters, carcass and carpentry. The terms are
              written down, not implied —{' '}
              <Link
                href={routes.warranty}
                className="lux-underline text-gold underline-offset-4 hover:text-white"
              >
                read the warranty
              </Link>
              .
            </p>
          </SectionReveal>

          {/* THE WORKSHOP PLATE — the curtain lifts from the right (mirroring the
              opening plate, which lifts from the bottom), and the gold frame is
              the only thing on this dark ground that is allowed to catch light. */}
          <SectionReveal variant="fadeUp" delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div
              data-cursor="view"
              data-cursor-label="Engineered · Hand-finished"
              data-cursor-image={PLATES.workshop}
              className="plate-offset group relative"
            >
              <MaskPlate
                from="right"
                className="relative aspect-[4/5] w-full overflow-hidden bg-olive-deep"
              >
                <TiltPlate className="h-full w-full" strength={4} depth={10}>
                  <div className="lux-tint relative h-full w-full">
                    <Image
                      src={PLATES.workshop}
                      alt="Modular kitchen with honed marble counter and handleless cabinetry"
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 38vw, 92vw"
                      className="object-cover"
                    />

                    <span
                      aria-hidden="true"
                      className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                    >
                      <span className="block font-serif text-xl font-light leading-tight text-white">
                        360° edge-banded, factory-cut
                      </span>
                      <span className="mt-2 block font-caps text-[9px] uppercase tracking-wide2 text-gold">
                        Fitted and finished on site
                      </span>
                    </span>
                  </div>
                </TiltPlate>
              </MaskPlate>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── GATED: THE STUDIO ─────────────────────────────────────────────────
          TEAM_PHOTOS_AVAILABLE === false. The layout exists and the names are
          real; the photographs do not exist, so the section does not render.
          Stock portraits captioned as RGL's team would be a fabrication about
          real people — flip the flag when the shoot lands. */}
      {TEAM_PHOTOS_AVAILABLE && <TeamGrid members={TEAM} />}

      {/* ── GATED: RECOGNITION ────────────────────────────────────────────────
          `awards` is an empty array. AwardsWall returns null on empty, so this is
          a no-op until real, attributable awards are supplied. Nothing invented. */}
      <AwardsWall awards={awards} />

      {/* ── BEGIN ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="begin-heading">
        <SectionReveal
          stagger
          amount={0.25}
          className="grid gap-12 border-t border-divider pt-section-sm lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <RevealItem>
            <p className="eyebrow">Begin</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2
              id="begin-heading"
              className="mt-8 max-w-[13ch] font-serif text-headline font-light text-ink"
            >
              Visualise <span className="italic text-accent">before you build</span>
            </h2>
            <p className="mt-8 max-w-prose2 text-pretty leading-relaxed text-ink/70">
              Book a private consultation and we&apos;ll turn your space into an immersive 3D
              walkthrough — no cost, no obligation.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-wrap items-center gap-6 lg:pb-2">
            <Link href={routes.getQuote} className="btn-pill btn-gold">
              Book Private Consultation
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href={routes.portfolio} className="btn-pill btn-ghost">
              See our work
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </RevealItem>
        </SectionReveal>
      </section>

      {/* Breadcrumb JSON-LD is already emitted by PageStub. */}
      <JsonLd id="ld-about" data={aboutSchema} />
    </PageStub>
  )
}
