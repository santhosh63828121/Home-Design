import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { processSteps } from '@/data/process'
import { routes } from '@/lib/routes'

/**
 * THE CRAFT — a timeline, not a row of numbered boxes.
 *
 * Ten steps down one hairline rail, each with a gold node, a large light numeral
 * and its indicative window. It reads like the plate list at the front of a
 * monograph: the numeral is the loudest thing, the prose is quiet, and the rail
 * carries the eye without a single card in sight.
 *
 * All ten stages come verbatim from `src/data/process.ts` (the client's own "How
 * We Craft" blueprint). Durations are labelled INDICATIVE there and are labelled
 * indicative here too — they are planning guides, not a promise.
 *
 * Motion: below the fold, so framer is safe. The observer sits on the untranslated
 * <ol> (SectionReveal stagger) and each row inherits the stagger — never an
 * observer on an element that starts translated out of its own box.
 */
export default function ProcessTimeline() {
  return (
    <section id="craft" aria-labelledby="craft-heading" className="section-y bg-background">
      <SectionReveal
        stagger
        amount={0.3}
        className="grid gap-10 border-b border-divider pb-14 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24"
      >
        <RevealItem>
          <p className="eyebrow">How we craft</p>
          <span aria-hidden="true" className="rule-gold mt-6" />
          <h2
            id="craft-heading"
            className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
          >
            Ten steps, <span className="italic text-accent">none of them hidden</span>
          </h2>
        </RevealItem>
        <RevealItem as="p" className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pb-2">
          From the first conversation to the year of care that follows handover. Factory production
          runs in parallel with site works, tracked by one project engineer — which is how the
          timeline holds. Durations below are indicative planning windows.
        </RevealItem>
      </SectionReveal>

      <SectionReveal stagger as="ol" amount={0.05} className="mt-16 lg:mt-24">
        {processSteps.map((step, i) => {
          const isLast = i === processSteps.length - 1
          return (
            <RevealItem
              as="li"
              key={step.n}
              className="group grid grid-cols-[1.25rem_1fr] gap-x-6 sm:gap-x-8 lg:grid-cols-[1.25rem_11rem_1fr] lg:gap-x-14"
            >
              {/* The rail: a gold node on a hairline that runs to the next step. */}
              <div
                aria-hidden="true"
                className="row-span-2 flex flex-col items-center lg:row-span-1"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-700 ease-lux group-hover:scale-[2]" />
                {!isLast && <span className="mt-2 w-px flex-1 bg-divider" />}
              </div>

              <div className="col-start-2 flex items-baseline gap-4 lg:block">
                <span className="font-serif text-[2.5rem] font-light leading-none text-ink/20 transition-colors duration-700 ease-lux group-hover:text-gold lg:text-[3.5rem]">
                  {step.n}
                </span>
                <span className="font-caps text-[10px] uppercase tracking-wide2 text-muted lg:mt-4 lg:block">
                  {step.duration}
                </span>
              </div>

              <div className={`col-start-2 lg:col-start-3 ${isLast ? 'pb-0' : 'pb-14'} pt-1`}>
                <h3 className="font-serif text-title font-normal text-ink">{step.stage}</h3>
                <p className="mt-4 max-w-prose2 text-pretty leading-relaxed text-ink/65">
                  {step.what}
                </p>
                <p className="mt-6 inline-flex items-center gap-3 border-t border-divider pt-4 font-caps text-[10px] uppercase tracking-wide2 text-accent">
                  <span className="text-muted">Your role</span>
                  <span aria-hidden="true" className="h-px w-5 bg-gold" />
                  {step.clientRole}
                </p>
              </div>
            </RevealItem>
          )
        })}
      </SectionReveal>

      <SectionReveal
        stagger
        amount={0.4}
        className="mt-16 flex flex-wrap items-center gap-6 border-t border-divider pt-10"
      >
        <RevealItem>
          <Link href={routes.process} className="btn-pill btn-olive">
            The full process
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </RevealItem>
        <RevealItem>
          <Link
            href={routes.walkthrough}
            className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
          >
            See a 3D walkthrough
          </Link>
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
