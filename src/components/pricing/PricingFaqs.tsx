import { JsonLd, faqSchema } from '@/lib/structured-data'
import type { Faq } from '@/data/pricing'

/**
 * FAQ accordion + FAQPage JSON-LD, kept in sync (same source array drives both).
 */
export default function PricingFaqs({ faqs, id = 'pricing' }: { faqs: Faq[]; id?: string }) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby={`faq-${id}`}>
      <h2 id={`faq-${id}`} className="font-serif text-2xl font-bold sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-divider border-y border-divider">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
              {f.q}
              <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-2 text-ink/75">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd id={`ld-faq-${id}`} data={faqSchema(faqs)} />
    </section>
  )
}
