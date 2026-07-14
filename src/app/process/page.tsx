import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { processSteps } from '@/data/process'

export const metadata: Metadata = buildMetadata({
  title: 'How We Craft — Our 10-Step Process',
  description:
    'RGL Decors’ transparent ten-step interior process — what happens at each stage, how long it takes and your role, from first brief to one-year aftercare.',
  path: routes.process,
  keywords: ['Interior Design Process Chennai', 'Turnkey Interior Process', 'RGL Decors Process'],
})

/**
 * HOW WE CRAFT — the ten steps as a rail, not a stack of numbered cards.
 *
 * One hairline runs the length of the page with a gold node at each stage. The
 * numeral is the loudest element and the prose is quiet beneath it, which is how
 * a monograph sets a plate list. Every stage, duration and client role comes
 * verbatim from `src/data/process.ts` — the client's own blueprint. Durations are
 * labelled indicative there, and are labelled indicative here.
 */
export default function ProcessPage() {
  return (
    <PageStub
      title="How We Craft — From Concept to Completion"
      kicker="RGL Décors · How We Craft"
      intro="No black boxes. Here is exactly how an RGL project runs, end to end — what happens at every stage, roughly how long it takes, and where we need you. Factory production runs in parallel with site works, so the timeline stays tight."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'How We Craft', path: routes.process },
      ]}
      cta={{ label: 'Book Private Consultation', href: routes.getQuote }}
    >
      <h2 className="sr-only">The ten steps</h2>

      <p className="max-w-prose2 border-b border-divider pb-10 text-pretty leading-relaxed text-ink/70">
        Durations below are indicative planning windows, not a promise — every home is a different
        shape. What does not vary is the sequence, or who is accountable at each stage.
      </p>

      <SectionReveal stagger as="ol" amount={0.05} className="mt-16">
        {processSteps.map((step, i) => {
          const isLast = i === processSteps.length - 1
          return (
            <RevealItem
              as="li"
              key={step.n}
              className="group grid grid-cols-[1.25rem_1fr] gap-x-6 sm:gap-x-8 lg:grid-cols-[1.25rem_11rem_1fr] lg:gap-x-14"
            >
              {/* The rail: a gold node on a hairline running to the next stage. */}
              <div aria-hidden="true" className="row-span-2 flex flex-col items-center lg:row-span-1">
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

              <div className={`col-start-2 pt-1 lg:col-start-3 ${isLast ? 'pb-0' : 'pb-14'}`}>
                <h3 className="font-serif text-title font-normal text-ink">{step.stage}</h3>
                <p className="mt-4 max-w-prose2 text-pretty leading-relaxed text-ink/65">
                  {step.what}
                </p>
                <p className="mt-6 inline-flex flex-wrap items-center gap-3 border-t border-divider pt-4 font-caps text-[10px] uppercase tracking-wide2 text-accent">
                  <span className="text-muted">Your role</span>
                  <span aria-hidden="true" className="h-px w-5 bg-gold" />
                  {step.clientRole}
                </p>
              </div>
            </RevealItem>
          )
        })}
      </SectionReveal>

      <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-divider pt-10">
        <Link href={routes.getQuote} className="btn-pill btn-gold">
          Start your project
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <Link
          href={routes.walkthrough}
          className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
        >
          See a 3D walkthrough
        </Link>
      </div>
    </PageStub>
  )
}
