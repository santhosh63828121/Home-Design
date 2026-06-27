import type { Metadata } from 'next'
import { Clock, User } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { processSteps } from '@/data/process'

export const metadata: Metadata = buildMetadata({
  title: 'Our 16-Step Interior Design Process',
  description:
    'RGL Decors’ transparent 16-step interior design process — what happens at each stage, how long it takes and your role, from the first call to after-sales care.',
  path: routes.process,
  keywords: ['Interior Design Process Chennai', 'Turnkey Interior Process', 'RGL Decors Process'],
})

export default function ProcessPage() {
  return (
    <PageStub
      title="From Concept to Completion — Our 16-Step Promise"
      kicker="RGL Decors · Process"
      intro="No black boxes. Here is exactly how an RGL project runs, end to end — what happens at every stage, roughly how long it takes, and where we need you. Factory and site work overlap, so the timeline stays tight."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Process', path: routes.process },
      ]}
      cta={{ label: 'Start with a Free Consultation', href: routes.getQuote }}
    >
      <h2 className="sr-only">The 16 steps</h2>
      <ol className="relative space-y-4 before:absolute before:left-[1.35rem] before:top-2 before:bottom-2 before:w-px before:bg-divider sm:before:left-7">
        {processSteps.map((s) => (
          <li
            key={s.n}
            className="relative flex gap-4 rounded-2xl border border-divider bg-white p-5 shadow-card sm:gap-6 sm:p-6"
          >
            <span className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal font-caps text-sm font-bold text-white sm:h-14 sm:w-14 sm:text-base">
              {s.n}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-serif text-lg font-bold text-ink sm:text-xl">{s.stage}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-0.5 text-xs text-muted">
                  <Clock size={12} aria-hidden="true" /> {s.duration}
                </span>
              </div>
              <p className="mt-1.5 text-ink/80">{s.what}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-teal">
                <User size={13} aria-hidden="true" /> Your role: {s.clientRole}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </PageStub>
  )
}
