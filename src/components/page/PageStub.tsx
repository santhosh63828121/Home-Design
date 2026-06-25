import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import SkipLink from '@/components/page/SkipLink'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/seo'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'

export type Crumb = { name: string; path: string }

/**
 * Shared page shell for Phase-1 route stubs: header + breadcrumbs + a single
 * <h1> hero + intro + primary CTA + footer + BreadcrumbList JSON-LD. Keeps every
 * not-yet-built route consistent, crawlable and conversion-ready (no 404s, no
 * dead ends) while the full content is built in later phases.
 */
export default function PageStub({
  title,
  kicker = 'RGL Decors · Chennai',
  intro,
  crumbs,
  cta = { label: 'Get a Free Quote', href: routes.getQuote },
  children,
}: {
  title: string
  kicker?: string
  intro: string
  crumbs: Crumb[]
  cta?: { label: string; href: string }
  children?: React.ReactNode
}) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" className="bg-background pt-28">
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-muted">
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
                        <span aria-hidden="true">/</span>
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <p className="eyebrow">{kicker}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.08] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.href}
              className="btn-pill bg-accent text-white hover:bg-accent-dark"
            >
              {cta.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${siteConfig.nap.phoneE164}`}
              className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white"
            >
              Call {siteConfig.nap.phoneDisplay}
            </a>
          </div>

          {children ? (
            <div className="mt-14">{children}</div>
          ) : (
            <p className="mt-14 rounded-2xl border border-divider bg-white px-6 py-5 text-sm text-muted">
              This page is being crafted as part of our new site. Meanwhile, our team can help you
              right away — request a free 3D design and quote, or call us.
            </p>
          )}
        </section>
      </main>
      <Footer />

      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
