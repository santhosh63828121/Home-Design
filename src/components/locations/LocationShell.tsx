import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import MagneticButton from '@/components/MagneticButton'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/seo'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'
import type { CityImage } from './cityImagery'

export type Crumb = { name: string; path: string }

/**
 * THE LOCATION MASTHEAD
 * =============================================================================
 * The chrome behind the locations index and all ~20 city routes: nav, an
 * editorial masthead, a full-bleed architectural photograph, the page's single
 * <h1>, and the BreadcrumbList JSON-LD. One file, twenty-one pages.
 *
 * It is a magazine opener, not a hero banner — tracked eyebrow, gold hairline,
 * an enormous light-weight Cormorant headline, and a lede set at a real reading
 * measure. The photograph then arrives full-bleed BELOW the type, so the first
 * thing the eye lands on is a sentence, not a stock room.
 *
 * ABOVE-THE-FOLD MOTION IS CSS, NOT FRAMER (DESIGN-SYSTEM §5, trap 1).
 * A framer `initial` renders an SSR'd `opacity: 0`, and an invisible element
 * cannot be the Largest Contentful Paint — it silently waits for hydration
 * (measured on this codebase: 3,608ms of render delay). `.hero-fade` /
 * `.hero-rule` are keyframes that start at first paint, before a byte of JS
 * runs, and collapse to "already there" under prefers-reduced-motion. The
 * photograph itself carries NO reveal at all: it is `priority` and paints
 * immediately, because it is the likeliest LCP element on this page.
 *
 * Everything below the fold is the caller's job — and framer is fine down there.
 *
 * NOT changed: the one-<h1>-per-page contract, the crumbs → BreadcrumbList
 * schema (same builder, same `ld-breadcrumb` id as every other page), the CTA
 * routing, or the phone NAP.
 */
export default function LocationShell({
  kicker,
  title,
  intro,
  crumbs,
  cta = { label: 'Get a Free Quote', href: routes.getQuote },
  media,
  caption,
  children,
}: {
  kicker: string
  title: string
  intro: string
  crumbs: Crumb[]
  cta?: { label: string; href: string }
  /** The full-bleed masthead photograph. */
  media: CityImage
  /** A single line set under the photograph — the city's own tagline. */
  caption?: string
  children?: ReactNode
}) {
  // Stagger the CSS keyframes by handing each element its own delay.
  const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        {/* Masthead. pt clears the 72/84px fixed bar and then adds editorial air
            on top — a headline should never look pinned to the nav. */}
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

          <p className="eyebrow hero-fade" style={d(60)}>
            {kicker}
          </p>
          <span aria-hidden="true" className="rule-gold hero-rule mt-6" style={d(140)} />

          <h1
            className="hero-fade mt-8 max-w-[15ch] text-balance font-serif text-display font-light text-ink"
            style={d(200)}
          >
            {title}
          </h1>

          <div className="mt-12 grid gap-10 border-t border-divider pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="hero-fade max-w-prose2 text-pretty text-lede text-ink/70" style={d(280)}>
              {intro}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-4" style={d(340)}>
              <MagneticButton href={cta.href} className="btn-pill btn-gold">
                {cta.label} <ArrowRight size={15} aria-hidden="true" />
              </MagneticButton>
              <a href={`tel:${siteConfig.nap.phoneE164}`} className="btn-pill btn-ghost">
                Call {siteConfig.nap.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* The photograph, edge to edge. No `initial`, no reveal, no
            `will-change` — just a priority image that paints on first frame. */}
        <figure className="w-full">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="shell mt-6 flex items-start gap-4 text-sm text-muted">
              <span aria-hidden="true" className="mt-2 h-px w-8 shrink-0 bg-gold" />
              <span className="max-w-prose2 text-pretty">{caption}</span>
            </figcaption>
          )}
        </figure>

        {children}
      </main>
      <Footer />

      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
