import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
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

/**
 * THE ANSWERS — a reference volume with an index in the margin.
 * ============================================================================
 * Thirty-five questions is a lot of page, so the page is built to be NAVIGATED,
 * not scrolled: a sticky index on the left carries a numeral, the topic and its
 * question count; the right column is seven ruled chapters of `<details>`.
 *
 * `<details>` is the native disclosure element — keyboard support, screen-reader
 * announcement and find-in-page all come free, and globals.css already animates
 * the open panel with the house curve. So this entire page ships ZERO JavaScript
 * beyond the scroll reveals. A hand-rolled React accordion would have been more
 * code, less accessible and slower.
 *
 * The old page used `text-teal` (a retired hue that now silently resolves to
 * olive) — replaced with `accent` so the intent is legible in the source.
 */
export default function FaqPage() {
  return (
    <PageStub
      title="Frequently Asked Questions"
      kicker="RGL Décors · FAQ"
      intro={`The ${faqCount} questions Chennai homeowners ask us most — about how we work, what things cost, the materials we use, how long it takes, what the warranty covers and where we work. Answered plainly, including the ones with awkward answers.`}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'FAQ', path: routes.faq },
      ]}
    >
      <div className="grid gap-16 border-t border-divider pt-12 lg:grid-cols-[15rem_1fr] lg:gap-24">
        {/* The index. Sticky on desktop, so you never lose your place. */}
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Contents</p>
          <span aria-hidden="true" className="rule-gold mt-6" />
          {/* The index writes itself out, chapter by chapter. */}
          <SectionReveal stagger as="ol" amount={0.1} className="mt-8">
            {faqGroups.map((g, i) => (
              <RevealItem as="li" key={g.id} className="border-b border-divider">
                <a
                  href={`#${g.id}`}
                  className="group relative flex items-baseline gap-4 py-4 transition-colors duration-500"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                  />
                  <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm text-ink/70 transition-transform duration-700 ease-lux group-hover:translate-x-1 group-hover:text-accent">
                    {g.title}
                  </span>
                  <span className="font-caps text-[10px] tabular-nums text-muted">
                    {g.items.length}
                  </span>
                </a>
              </RevealItem>
            ))}
          </SectionReveal>
        </nav>

        {/* The chapters. */}
        <div className="space-y-20 lg:space-y-24">
          {faqGroups.map((g, gi) => (
            <SectionReveal
              as="section"
              key={g.id}
              variant="fadeUp"
              amount={0.05}
              className="scroll-mt-28"
            >
              <div id={g.id} className="scroll-mt-28">
                <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 font-serif text-headline font-light text-ink">{g.title}</h2>
              </div>

              {/* Every question is its own beat. RevealItem renders the element
                  you name it — so this is still a native <details>, and keyboard
                  support, SR announcement and find-in-page come free as before.
                  The chapter reveal above is its own variant root (it declares
                  `initial`), so this stagger is not swallowed by it. */}
              <SectionReveal stagger amount={0.05} className="mt-10 border-t border-divider">
                {g.items.map((item) => (
                  <RevealItem
                    as="details"
                    key={item.q}
                    className="group border-b border-divider py-6"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                      <span className="max-w-[46ch] font-serif text-[1.35rem] font-light leading-snug transition-colors duration-500 group-hover:text-accent">
                        {item.q}
                      </span>
                      <Plus
                        size={18}
                        strokeWidth={1.25}
                        aria-hidden="true"
                        className="mt-1.5 shrink-0 text-accent transition-transform duration-700 ease-lux group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-6 max-w-prose2 text-pretty leading-relaxed text-ink/70">
                      {item.a}
                    </p>
                  </RevealItem>
                ))}
              </SectionReveal>
            </SectionReveal>
          ))}

          {/* The thirty-sixth question is always the one we didn't print. */}
          <SectionReveal stagger amount={0.2} className="bg-bone p-10 sm:p-14">
            <RevealItem>
              <p className="eyebrow">Still wondering</p>
              <span aria-hidden="true" className="rule-gold mt-6" />
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-8 max-w-[24ch] font-serif text-title font-light text-ink"
            >
              Ask us the question that isn&apos;t here.
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-prose2 text-pretty leading-relaxed text-ink/70"
            >
              You will get a straight answer, with no obligation attached to it — including
              &ldquo;we don&apos;t know yet&rdquo; when that is the truthful one.
            </RevealItem>
            <RevealItem className="mt-8">
              <Link href={routes.getQuote} className="btn-pill btn-olive">
                Ask us directly
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>

      {FAQ_SCHEMA_ENABLED && <JsonLd id="ld-faq" data={faqSchema} />}
    </PageStub>
  )
}
