import Link from 'next/link'
import type { ReactNode } from 'react'
import { Info, AlertTriangle } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import SkipLink from '@/components/page/SkipLink'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'

export type LegalCrumb = { name: string; path: string }

/**
 * Shared shell for the three legal pages: breadcrumbs + title + last-updated +
 * a plain-language summary box, then the full sectioned text, then a contact
 * footer. Deliberately NO marketing CTA — these pages are for reading, not
 * converting.
 */
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

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" className="bg-background pt-28">
        <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-muted">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1
                return (
                  <li key={c.path} className="flex items-center gap-2">
                    {last ? (
                      <span className="text-ink" aria-current="page">{c.name}</span>
                    ) : (
                      <>
                        <Link href={c.path} className="transition-colors hover:text-accent">{c.name}</Link>
                        <span aria-hidden="true">/</span>
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <p className="eyebrow">RGL Decors · Legal</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">
            Last updated <time dateTime={updated}>{updatedLabel}</time> ·{' '}
            {business.legalName}, {business.nap.addressLocality}, {business.nap.addressRegion}
          </p>

          {/* Plain-language summary */}
          <section
            aria-label="Plain-language summary"
            className="mt-8 rounded-2xl border border-accent/20 bg-accent/[0.06] p-6"
          >
            <p className="flex items-center gap-2 font-serif text-lg text-ink">
              <Info size={18} className="text-accent" aria-hidden="true" /> In plain language
            </p>
            <div className="mt-3 space-y-2 text-sm text-ink/80">{summary}</div>
            <p className="mt-4 border-t border-accent/15 pt-3 text-xs text-muted">
              This summary is for convenience only. The full text below is what applies.
            </p>
          </section>

          {/* Full policy text */}
          <div className="legal-prose mt-10">{children}</div>

          {/* Contact footer */}
          <section className="mt-12 rounded-2xl border border-divider bg-white p-6 text-sm text-ink/80">
            <h2 className="font-serif text-lg text-ink">Questions about this policy?</h2>
            <p className="mt-2">
              Contact {business.legalName} at{' '}
              <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
                {business.nap.email}
              </a>{' '}
              or{' '}
              <a href={business.nap.tel} className="font-medium text-accent hover:underline">
                {business.nap.phoneDisplay}
              </a>
              . You can also reach us through our{' '}
              <Link href={routes.contact} className="font-medium text-accent hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />

      <JsonLd id="ld-legal-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}

/** Section heading + body wrapper for legal prose. */
export function LegalSection({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 id={id} className="scroll-mt-28 font-serif text-2xl font-bold text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink/80">{children}</div>
    </section>
  )
}

/**
 * A clearly-marked commercial-term placeholder. Used where a REAL business term
 * (advance %, cancellation window, registered entity) is required but unknown —
 * so it's obvious on the page and RGL fills exactly one place. Never invent the
 * number; leave the marker.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 ring-1 ring-amber-300">
      <AlertTriangle size={13} className="mr-1 inline align-[-1px] text-amber-600" aria-hidden="true" />
      {children}
    </mark>
  )
}
