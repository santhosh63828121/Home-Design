import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'
import { faqGroups, faqCount, allFaqs, FAQ_SCHEMA_ENABLED } from '@/data/faq'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design FAQs',
  description:
    'Straight answers to the questions Chennai homeowners ask most — about our process, pricing, materials, timelines, warranty and service area. Honest, no jargon.',
  path: routes.faq,
  keywords: ['interior design faq chennai', 'interior design questions', 'rgl decors faq'],
})

/**
 * FAQPage rich-result schema is GATED (FAQ_SCHEMA_ENABLED). Several answers cite
 * pricing/warranty terms that are still being confirmed (§2.1/§2.3); emitting
 * FAQ markup with provisional figures risks a structured-data penalty, so the
 * schema only ships once those are signed off. The page content is fully live
 * regardless — only the machine-readable markup waits.
 */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <PageStub
      title="Frequently Asked Questions"
      kicker="RGL Decors · FAQ"
      intro={`Straight, honest answers to the ${faqCount} questions Chennai homeowners ask us most — about how we work, what things cost, the materials we use, timelines, warranty and where we work.`}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'FAQ', path: routes.faq },
      ]}
    >
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        {/* Quick-jump nav */}
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-caps text-[11px] uppercase tracking-wide2 text-muted">Jump to</p>
          <ul className="mt-3 space-y-2 text-sm">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="text-ink/70 transition-colors hover:text-teal">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{g.title}</h2>
              <div className="mt-5 divide-y divide-divider overflow-hidden rounded-2xl border border-divider bg-white">
                {g.items.map((item, i) => (
                  <details key={i} className="group px-5 py-4 open:bg-background/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink marker:hidden">
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-teal transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 leading-relaxed text-ink/75">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <p className="rounded-2xl border border-teal/20 bg-teal/[0.05] px-6 py-5 text-sm text-ink/80">
            Still have a question?{' '}
            <Link href={routes.getQuote} className="font-medium text-teal underline-offset-2 hover:underline">
              Ask us directly
            </Link>{' '}
            — we’ll give you a straight answer, no obligation.
          </p>
        </div>
      </div>

      {FAQ_SCHEMA_ENABLED && <JsonLd id="ld-faq" data={faqSchema} />}
    </PageStub>
  )
}
