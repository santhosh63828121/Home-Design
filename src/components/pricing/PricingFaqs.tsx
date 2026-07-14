import { Plus } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { JsonLd, faqSchema } from '@/lib/structured-data'
import type { Faq } from '@/data/pricing'

/**
 * The questions people actually ask about money — set as a ruled accordion, not
 * a boxed FAQ card. `<details>` is the native disclosure element (keyboard- and
 * screen-reader-complete for free); globals.css animates the panel open with the
 * house curve, so there is no JavaScript on this at all.
 *
 * UNCHANGED: the FAQPage JSON-LD, and the fact that one array drives both the
 * markup and the visible answers — a schema that can drift from the page is a
 * schema that will.
 */
export default function PricingFaqs({ faqs, id = 'pricing' }: { faqs: Faq[]; id?: string }) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby={`faq-${id}`}>
      <p className="eyebrow">Straight answers</p>
      <span aria-hidden="true" className="rule-gold mt-6" />
      <h2
        id={`faq-${id}`}
        className="mt-8 max-w-[16ch] font-serif text-headline font-light text-ink"
      >
        Before you <span className="italic text-accent">ask</span>
      </h2>

      {/* Each disclosure row is a RevealItem, so the accordion is typeset line by
          line. It is still a native <details> — RevealItem only renders the
          element you name, so keyboard support, screen-reader announcement and
          find-in-page are all untouched. */}
      <SectionReveal stagger amount={0.08} className="mt-12 border-t border-divider">
        {faqs.map((f) => (
          <RevealItem as="details" key={f.q} className="group border-b border-divider py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="max-w-[46ch] font-serif text-[1.35rem] font-light leading-snug transition-colors duration-500 group-hover:text-accent">
                {f.q}
              </span>
              <Plus
                size={18}
                strokeWidth={1.25}
                aria-hidden="true"
                className="mt-1.5 shrink-0 text-accent transition-transform duration-700 ease-lux group-open:rotate-45"
              />
            </summary>
            <p className="mt-6 max-w-prose2 text-pretty leading-relaxed text-ink/70">{f.a}</p>
          </RevealItem>
        ))}
      </SectionReveal>

      <JsonLd id={`ld-faq-${id}`} data={faqSchema(faqs)} />
    </section>
  )
}
