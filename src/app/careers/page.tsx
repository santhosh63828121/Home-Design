import type { Metadata } from 'next'
import { PencilRuler, ClipboardCheck, Factory, Headset, ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import CareerForm from '@/components/CareerForm'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'Careers at RGL Decors',
  description:
    'Build dream homes with RGL Decors in Chennai. We hire interior designers, project managers, production specialists and client advisors. Send us your résumé.',
  path: routes.careers,
})

const teams = [
  {
    icon: PencilRuler,
    title: 'Interior Design',
    text: 'Designers who can take a brief from concept to an immersive 3D walkthrough and a buildable plan.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Management',
    text: 'Coordinators who keep factory production and site works running in parallel, so the handover date holds.',
  },
  {
    icon: Factory,
    title: 'Production & Installation',
    text: 'Specialists who run our automated modular line and fit interiors to a clean, error-free finish.',
  },
  {
    icon: Headset,
    title: 'Client Advisory & Sales',
    text: 'People who guide homeowners through pricing, materials and choices with honesty and patience.',
  },
]

const values = [
  'We show clients the real thing before we build it — no overpromising.',
  'We sweat the details: 100+ quality checks before anything leaves the factory.',
  'We keep our word on timelines, costing and warranty.',
  'We treat every home — and every teammate — with respect.',
]

const applyHref = `mailto:${business.nap.email}?subject=${encodeURIComponent(
  'Job application — RGL Decors',
)}`

/**
 * CAREERS — an invitation, not a job board.
 * ============================================================================
 * We have no live postings to list, so the page does not pretend to have any.
 * What it has instead is an argument: here are the four crafts we hire, here is
 * how we work, and here is a form that is read by a person. The teams are a
 * ruled index (the house pattern from FeaturesGrid), the values are a quiet
 * numbered list, and the invitation to write in closes on a deep-olive panel.
 *
 * UNTOUCHED: `<CareerForm />` and the `submitApplication` Server Action behind
 * it — every field name, the file constraints and the validation are exactly as
 * they were. Only the room around the form changed.
 */
export default function CareersPage() {
  return (
    <PageStub
      title="Build Dream Homes With Us"
      kicker="RGL Décors · Careers"
      intro="We design in immersive 3D, build on an automated factory line, and stand behind the work long after handover. If you care about doing interiors the honest, precise way — the way that is slower to sell and better to live in — we would like to hear from you."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Careers', path: routes.careers },
      ]}
      cta={{ label: 'Apply Now', href: '#apply' }}
    >
      <div className="space-y-24 lg:space-y-32">
        {/* Teams we hire for — a ruled index, not four boxes. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.1}>
          <div className="grid gap-10 border-t border-divider pt-12 lg:grid-cols-[auto_1fr] lg:gap-24">
            <div>
              <p className="eyebrow">Who we hire</p>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <h2 className="mt-8 max-w-[10ch] font-serif text-headline font-light text-ink">
                Four <span className="italic text-accent">crafts</span>
              </h2>
            </div>
            <p className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pt-14">
              A home passes through all four of these on its way from a brief to a set of keys. We
              hire for each of them as we grow — and we hire for the craft, not the CV.
            </p>
          </div>

          {/* Four crafts, four beats — each row rises on its own, and its icon
              leans in with it. */}
          <SectionReveal stagger as="ol" amount={0.1} className="mt-14 grid lg:grid-cols-2 lg:gap-x-24">
            {teams.map((t, i) => {
              const Icon = t.icon
              return (
                <RevealItem
                  as="li"
                  key={t.title}
                  className="group relative border-b border-divider py-8"
                >
                  {/* The gold rule draws across the row on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                  />
                  <div className="flex items-start gap-6 transition-transform duration-700 ease-lux group-hover:translate-x-1.5">
                    <span className="mt-1 font-caps text-[10px] tracking-wide2 text-gold-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <Icon
                          size={19}
                          strokeWidth={1.25}
                          className="shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <h3 className="font-serif text-title font-normal text-ink transition-colors duration-500 group-hover:text-accent">
                          {t.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-prose2 text-pretty text-sm leading-relaxed text-ink/65">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </SectionReveal>
        </SectionReveal>

        {/* How we work — four sentences, each on its own rule. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.1}>
          <div className="border-t border-divider pt-12">
            <p className="eyebrow">What we hold to</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2 className="mt-8 max-w-[14ch] font-serif text-headline font-light text-ink">
              How we <span className="italic text-accent">work</span>
            </h2>
          </div>

          {/* Four sentences, arriving one at a time — a manifesto is read in
              order, not absorbed as a block. */}
          <SectionReveal stagger amount={0.1} as="ul" className="mt-12">
            {values.map((v) => (
              <RevealItem
                as="li"
                key={v}
                className="group relative border-b border-divider py-8 font-serif text-[1.35rem] font-light leading-snug text-ink/85 transition-transform duration-700 ease-lux hover:translate-x-1.5 sm:text-[1.6rem]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                />
                {v}
              </RevealItem>
            ))}
          </SectionReveal>
        </SectionReveal>

        {/* Application form — résumé + portfolio upload. Wiring untouched. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.05}>
          <div id="apply" className="scroll-mt-28 border-t border-divider pt-12">
            <SectionReveal stagger amount={0.3} className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-24">
              <RevealItem>
                <p className="eyebrow">Write to us</p>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <h2 className="mt-8 max-w-[10ch] font-serif text-headline font-light text-ink">
                  Apply to <span className="italic text-accent">join us</span>
                </h2>
              </RevealItem>
              <RevealItem
                as="p"
                className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pt-14"
              >
                We hire as we grow, so apply even when there is no posting for your role. Tell us
                what you do, attach the work you are proudest of, and we will read it — every
                application is read by a person here.
              </RevealItem>
            </SectionReveal>

            {/* The form itself is untouched — same fields, same Server Action.
                Only the room it stands in reveals. */}
            <SectionReveal variant="fadeUp" amount={0.05} className="mt-14">
              <CareerForm />
            </SectionReveal>
          </div>
        </SectionReveal>

        {/* Prefer to send it the old-fashioned way. */}
        <section>
          <SectionReveal stagger amount={0.15} className="bg-olive-deep p-10 sm:p-16">
            <RevealItem>
              <p className="font-caps text-[10px] uppercase tracking-wide4 text-gold">Or simply</p>
              <span aria-hidden="true" className="mt-6 block h-px w-16 bg-gold" />
            </RevealItem>
            <RevealItem
              as="h2"
              className="mt-8 max-w-[16ch] font-serif text-headline font-light text-white"
            >
              Email us your résumé
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-prose2 text-pretty leading-relaxed text-white/70"
            >
              A short note about the kind of work you do is enough to start a conversation. We reply
              when there is a genuine fit — and we say so plainly when there is not.
            </RevealItem>

            <RevealItem className="mt-10 flex flex-wrap items-center gap-6">
              <a href={applyHref} className="btn-pill btn-gold">
                Email your résumé
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href={business.nap.tel}
                className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-white/70"
              >
                Call {business.nap.phoneDisplay}
              </a>
            </RevealItem>

            <RevealItem
              as="p"
              className="mt-10 border-t border-white/15 pt-6 text-sm text-white/60"
            >
              {business.nap.email}
            </RevealItem>
          </SectionReveal>
        </section>
      </div>
    </PageStub>
  )
}
