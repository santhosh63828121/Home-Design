import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { JsonLd, faqSchema } from '@/lib/structured-data'
import type { CityFaq } from '@/data/locations'

/**
 * CITY FAQS — a ruled index, and the FAQPage JSON-LD, from one array.
 *
 * Visually this is the editorial treatment of PricingFaqs: no boxes, no chevron
 * chips — an index numeral, a serif question, a hairline, and a gold rule that
 * draws itself across the row when the answer opens. The disclosure is a native
 * <details>, so it works with zero JS and the answer text is in the DOM for
 * crawlers whether or not it is open.
 *
 * SCHEMA IS UNTOUCHED: the same `faqSchema()` builder over the same `city.faqs`
 * array, emitted under the same `ld-faq-<id>` script id as before. The questions
 * and answers rendered here and the ones in the JSON-LD cannot drift, because
 * they are the same objects.
 */
export default function CityFaqs({
  faqs,
  id,
  eyebrow,
}: {
  faqs: CityFaq[]
  id: string
  eyebrow: string
}) {
  if (!faqs.length) return null

  return (
    <>
      <SectionReveal className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <span aria-hidden="true" className="rule-gold mt-6" />
          <h2
            id={`faq-${id}`}
            className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
          >
            Frequently asked <span className="italic text-accent">questions</span>
          </h2>
        </div>
      </SectionReveal>

      <SectionReveal stagger className="mt-14 border-t border-divider">
        {faqs.map((f, i) => (
          <RevealItem key={f.q}>
            <details className="group relative border-b border-divider py-8">
              {/* The gold rule draws across the row as the answer opens. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-open:scale-x-100"
              />
              <summary className="flex cursor-pointer list-none items-start gap-6 text-ink">
                <span className="mt-1.5 font-caps text-[10px] tracking-wide2 text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 font-serif text-title font-normal">{f.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-serif text-2xl font-light leading-none text-accent transition-transform duration-500 ease-lux group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-prose2 pl-12 text-pretty leading-relaxed text-ink/70">
                {f.a}
              </p>
            </details>
          </RevealItem>
        ))}
      </SectionReveal>

      <JsonLd id={`ld-faq-${id}`} data={faqSchema(faqs)} />
    </>
  )
}
