import Link from 'next/link'
import { Children, isValidElement, type CSSProperties, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import LegalToc, { type LegalTocItem } from '@/components/legal/LegalToc'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'

export type LegalCrumb = { name: string; path: string }

/**
 * THE READING ROOM
 * ================
 * One shell behind all eight legal pages: terms, privacy, refunds, GST,
 * warranty, cookies, sustainability, after-sales. Change it here, all eight
 * change. That is the whole reason it exists.
 *
 * These pages are not marketing. Nobody arrives here delighted; they arrive
 * here because they want to know exactly what they have agreed to. So the brief
 * is not "make it beautiful", it is "make it CALM and make it READABLE" —
 * a quiet editorial masthead, a 66-character measure, generous leading, and
 * hairlines instead of boxes. There is deliberately NO CTA anywhere on this
 * page: a legal document that tries to sell you something is a legal document
 * you stop trusting.
 *
 * THREE STRUCTURAL DECISIONS
 *
 * 1. THE MEASURE. Body text is capped at `max-w-prose2` (~66 characters, see
 *    `.legal-prose` in globals.css). A 110-character line of binding text is a
 *    line the eye loses on the return sweep — and a clause you skim is a clause
 *    you did not read. The measure is the accessibility feature here.
 *
 * 2. THE INDEX. These documents run to a dozen sections. `<LegalToc>` derives a
 *    sticky section list from the page's own <LegalSection> children — see
 *    `collectSections()` below — so a route never has to hand-maintain a table
 *    of contents that can drift out of sync with its own headings. On desktop
 *    it is a sticky rail; below `lg` it collapses to a native <details>
 *    disclosure that needs no JavaScript at all.
 *
 * 3. THE MASTHEAD IS CSS-ONLY. Eyebrow → gold rule → title → last-updated line,
 *    revealed with the `.hero-fade` / `.hero-rule` keyframes, NOT framer-motion.
 *    This block is the LCP element on every one of these pages, and a framer
 *    `initial` state ships an SSR-transparent <h1> that cannot be an LCP
 *    candidate — it then waits on hydration (DESIGN-SYSTEM §5, trap 1: measured
 *    at 3,608ms of render delay). CSS keyframes start at first paint.
 *
 * HEADING CONTRACT: exactly one <h1> (the document title, here) and every other
 * heading on the page is an <h2> — the summary, each <LegalSection>, and the
 * contact block. No level is ever skipped, which matters more on a legal page
 * than anywhere else on the site: a screen-reader user navigates a 12-section
 * contract BY its heading outline.
 */

/**
 * Walks the page's children and pulls out every <LegalSection>, in document
 * order, to build the index. Recurses through fragments and arrays so a route
 * can group its sections however it likes and still be indexed correctly.
 *
 * This runs on the server, on already-constructed React elements — no rendering
 * and no DOM, so it costs nothing.
 */
function collectSections(node: ReactNode, out: LegalTocItem[] = []): LegalTocItem[] {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return

    if (child.type === LegalSection) {
      const props = child.props as { id?: string; heading?: string }
      if (props.id && props.heading) out.push({ id: props.id, heading: props.heading })
      return
    }

    // Fragments (and anything else that merely wraps) — look inside.
    const props = child.props as { children?: ReactNode }
    if (props?.children) collectSections(props.children, out)
  })

  return out
}

/** Lets us set the `--d` stagger custom property on a CSS-keyframe reveal. */
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export default function LegalLayout({
  title,
  updated,
  crumbs,
  summary,
  children,
}: {
  title: string
  updated: string // ISO date the copy was last reviewed
  crumbs: LegalCrumb[]
  summary: ReactNode // plain-language TL;DR
  children: ReactNode // the full policy text
}) {
  const updatedLabel = new Date(`${updated}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const sections = collectSections(children)

  return (
    <>
      <Navbar />

      <main id="main" className="bg-background">
        {/* ── MASTHEAD ──────────────────────────────────────────────────────
            Quiet and editorial: a tracked eyebrow, the gold thread, a large
            LIGHT Cormorant title, and a hairline meta row. Cormorant at 300 on
            a legal page reads like a printed contract; at 700 it would read
            like a wedding invitation (DESIGN-SYSTEM §2).

            CSS keyframes only — see the note at the top of this file. */}
        <header className="border-b border-divider pb-14 pt-32 sm:pt-36">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="hero-fade" style={delay(0)}>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-caps text-[11px] uppercase tracking-wide2 text-muted">
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
                          <Link href={c.path} className="lux-underline transition-colors hover:text-accent">
                            {c.name}
                          </Link>
                          <span aria-hidden="true" className="text-muted/50">
                            /
                          </span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>

            <p className="eyebrow hero-fade mt-10" style={delay(60)}>
              RGL Decors · Legal
            </p>

            <span aria-hidden="true" className="rule-gold hero-rule mt-6" style={delay(120)} />

            <h1
              className="hero-fade mt-8 max-w-[16ch] font-serif text-headline font-light text-ink"
              style={delay(160)}
            >
              {title}
            </h1>

            {/* The provenance line. On a legal page "when was this last touched,
                and by which legal entity" is not chrome — it is the first thing
                a careful reader looks for. */}
            <dl
              className="hero-fade mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-divider pt-6 text-[13px] sm:mt-12"
              style={delay(220)}
            >
              <div>
                <dt className="font-caps text-[10px] uppercase tracking-wide4 text-muted">
                  Last updated
                </dt>
                <dd className="mt-1.5 text-ink">
                  <time dateTime={updated}>{updatedLabel}</time>
                </dd>
              </div>
              <div>
                <dt className="font-caps text-[10px] uppercase tracking-wide4 text-muted">Issued by</dt>
                <dd className="mt-1.5 text-ink">{business.legalName}</dd>
              </div>
              <div>
                <dt className="font-caps text-[10px] uppercase tracking-wide4 text-muted">
                  Jurisdiction
                </dt>
                <dd className="mt-1.5 text-ink">
                  {business.nap.addressLocality}, {business.nap.addressRegion}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* ── THE DOCUMENT ──────────────────────────────────────────────────
            Two columns on desktop: the sticky index, then the reading column.
            The grid is centred at 58rem rather than stretched to the full 78rem
            editorial width — a legal page should feel like a printed page, not
            a dashboard. */}
        {/* The document column is LEFT-ALIGNED to the shell's grid, not centred
            inside it. Centring a 58rem block inside the 78rem shell pushed the
            text to x=256 while every other page on the site starts at x=160 —
            the layout audit caught it, and the eye reads it as a page that
            doesn't belong to the same site.

            The narrow READING MEASURE is preserved — it just comes from a
            max-width on the column, not from an offset. Same measure, same grid. */}
        <div className="shell section-y-sm">
          <div className="grid max-w-[58rem] gap-x-s8 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
            <LegalToc items={sections} />

            <article className="min-w-0">
              {/* Mobile index. A native <details> — zero JS, zero layout risk,
                  and it collapses so it never pushes the actual document below
                  the fold on a phone. */}
              {sections.length > 0 && (
                <details className="group max-w-prose2 rounded-sm border border-divider lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-caps text-[11px] uppercase tracking-wide2 text-ink">
                    Contents
                    <span
                      aria-hidden="true"
                      className="text-muted transition-transform duration-500 ease-lux group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <ol className="space-y-1 border-t border-divider px-6 py-4 text-[13px]">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="block py-1 text-muted hover:text-accent">
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {/* ── PLAIN-LANGUAGE SUMMARY ─────────────────────────────────
                  An olive wash panel, hairline-bounded, no shadow — a card here
                  is defined by its edge, not by elevation (DESIGN-SYSTEM §4).
                  It is explicitly labelled as non-binding, because a summary a
                  reader mistakes for the contract is worse than no summary. */}
              <section
                aria-labelledby="legal-summary"
                className="mt-10 max-w-prose2 rounded-sm border border-accent/15 bg-olive-wash px-8 py-8 first:mt-0 lg:mt-0"
              >
                <h2
                  id="legal-summary"
                  className="font-caps text-[11px] uppercase tracking-wide4 text-accent"
                >
                  In plain language
                </h2>
                <span aria-hidden="true" className="mt-4 block h-px w-10 bg-gold" />

                <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-ink/80 [&_strong]:font-medium [&_strong]:text-ink">
                  {summary}
                </div>

                <p className="mt-6 border-t border-accent/15 pt-4 text-[12px] leading-relaxed text-muted">
                  This summary is for convenience only. The full text below is what applies.
                </p>
              </section>

              {/* ── THE BINDING TEXT ───────────────────────────────────────
                  `.legal-prose` (globals.css) carries the whole reading
                  experience: the 66ch measure, 1.8 leading, underlined olive
                  links, olive list markers. The eight routes pass plain <p> /
                  <ul> / <LegalSection> and inherit all of it. */}
              <div className="legal-prose mt-14">{children}</div>

              {/* ── CONTACT ────────────────────────────────────────────────
                  Not a CTA. A route to a human, which is a legal requirement in
                  its own right — hence the hairline card rather than a pitch. */}
              <section
                aria-labelledby="legal-contact"
                className="mt-16 max-w-prose2 rounded-sm border border-divider bg-white px-8 py-8"
              >
                <h2 id="legal-contact" className="font-serif text-xl font-light text-ink">
                  Questions about this policy?
                </h2>
                <span aria-hidden="true" className="mt-4 block h-px w-10 bg-gold" />

                <p className="mt-6 text-[15px] leading-relaxed text-ink/80">
                  Contact {business.legalName} at{' '}
                  <a
                    href={`mailto:${business.nap.email}`}
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:text-accent-dark hover:decoration-accent"
                  >
                    {business.nap.email}
                  </a>{' '}
                  or{' '}
                  <a
                    href={business.nap.tel}
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:text-accent-dark hover:decoration-accent"
                  >
                    {business.nap.phoneDisplay}
                  </a>
                  . You can also reach us through our{' '}
                  <Link
                    href={routes.contact}
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:text-accent-dark hover:decoration-accent"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />

      <JsonLd id="ld-legal-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}

/**
 * One numbered clause of the document.
 *
 * The hairline above each section is the only "decoration" in the reading
 * column, and it is doing real work: it gives the eye a horizon to reset on
 * between clauses, which is what makes a twelve-section contract scannable.
 *
 * `scroll-mt-28` keeps the heading clear of the fixed navbar when the index
 * jumps to it. The <h2> is never transformed — that is what makes it a safe
 * IntersectionObserver target for LegalToc (DESIGN-SYSTEM §5, trap 2).
 */
export function LegalSection({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={id} className="mt-12 border-t border-divider pt-10">
      <h2
        id={id}
        className="scroll-mt-28 font-serif text-title font-light leading-tight text-ink"
      >
        {heading}
      </h2>
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  )
}

/**
 * A clearly-marked commercial-term placeholder. Used where a REAL business term
 * (GSTIN, grievance officer, advance %, refund window) is required but unknown —
 * so it is obvious on the page and RGL fills exactly one place. Never invent the
 * number; leave the marker.
 *
 * Amber is deliberately OFF-palette. This is the one element on the site that is
 * supposed to look wrong: the moment it stops being conspicuous, someone ships a
 * legal page with a hole in it. Contrast is amber-900 on amber-100 (9.4:1).
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="inline rounded-sm bg-amber-100 px-1.5 py-0.5 font-normal text-amber-900 ring-1 ring-amber-300">
      <AlertTriangle
        size={13}
        className="mr-1 inline align-[-1px] text-amber-700"
        aria-hidden="true"
      />
      {children}
    </mark>
  )
}
