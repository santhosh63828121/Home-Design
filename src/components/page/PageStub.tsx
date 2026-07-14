import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import MagneticButton from '@/components/MagneticButton'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/seo'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'

export type Crumb = { name: string; path: string }

/**
 * EDITORIAL PAGE MASTHEAD
 * =======================
 * The shell behind ~40 routes: chrome + breadcrumbs + a single <h1> + lede + CTA
 * + BreadcrumbList JSON-LD. Redesigning it here upgrades every inner page at
 * once — which is the whole reason it exists.
 *
 * The masthead is a magazine opener, not a hero banner: a tracked eyebrow, a
 * gold hairline, an enormous light-weight serif headline, and a measured lede at
 * a real reading width (~66 characters). The space around it is the design.
 *
 * NOT changed: the h1-per-page contract, breadcrumb schema, CTA routing, or the
 * `children` slot every page fills.
 */
export default function PageStub({
  title,
  kicker = 'RGL Décors · Chennai',
  intro,
  crumbs,
  cta = { label: 'Get a Free Quote', href: routes.getQuote },
  lead,
  children,
}: {
  title: string
  kicker?: string
  intro: string
  crumbs: Crumb[]
  cta?: { label: string; href: string }
  /**
   * Optional full-bleed element rendered ABOVE the masthead — a hero the nav
   * floats over, exactly as on the homepage.
   *
   * This exists for a concrete reason: /3d-walkthrough embeds the GSAP-PINNED
   * WebGL walkthrough. A ScrollTrigger pin re-measures its spacer on refresh,
   * and if there is content ABOVE it, that re-measure shoves everything below —
   * measured at CLS 0.68. With the pinned element leading the page (as it did on
   * the old homepage) the same scroll measures CLS 0.0002.
   */
  lead?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-background">
        {lead}

        {/* Masthead. When there is no `lead`, pt must clear the 72/84px fixed bar
            and then add editorial air on top — the headline should never feel
            pinned to the nav. With a `lead`, the hero already did that job. */}
        <header
          className={`shell pb-section-sm ${
            lead ? 'pt-section-sm' : 'pt-[9.5rem] lg:pt-[12rem]'
          }`}
        >
          <nav aria-label="Breadcrumb" className="mb-10">
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

          <p className="eyebrow">{kicker}</p>
          <span aria-hidden="true" className="rule-gold mt-6" />

          <h1 className="mt-8 max-w-[16ch] font-serif text-display font-light text-ink">{title}</h1>

          <p className="mt-8 max-w-prose2 text-lede text-ink/70 text-pretty">{intro}</p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href={cta.href} className="btn-pill btn-gold">
              {cta.label} <ArrowRight size={15} aria-hidden="true" />
            </MagneticButton>
            <a
              href={`tel:${siteConfig.nap.phoneE164}`}
              className="btn-pill btn-ghost"
            >
              Call {siteConfig.nap.phoneDisplay}
            </a>
          </div>
        </header>

        {children ? (
          <div className="shell pb-section">{children}</div>
        ) : (
          <div className="shell pb-section">
            <p className="border-t border-divider pt-8 text-sm text-muted">
              This page is being crafted as part of our new site. Meanwhile, our team can help you
              right away — request a free 3D design and quote, or call us.
            </p>
          </div>
        )}
      </main>
      <Footer />

      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
