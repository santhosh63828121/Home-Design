import type { Metadata } from 'next'
import { PencilRuler, ClipboardCheck, Factory, Headset, Mail, Heart } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
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
    text: 'Designers who can take a brief from concept to a 99%-accurate 3D walkthrough and a buildable plan.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Management',
    text: 'Coordinators who keep every project on track for the 45-day move-in promise, on site and in the factory.',
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
  'We keep our word on timelines, pricing and warranty.',
  'We treat every home — and every teammate — with respect.',
]

const applyHref = `mailto:${business.nap.email}?subject=${encodeURIComponent(
  'Job application — RGL Decors',
)}`

export default function CareersPage() {
  return (
    <PageStub
      title="Build Dream Homes With Us"
      kicker="RGL Decors · Careers"
      intro="We're a Chennai interior-design firm that designs in 3D, builds in an automated factory and stands behind a 10-year warranty. If you care about doing interiors the honest, precise way, we'd like to hear from you."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Careers', path: routes.careers },
      ]}
      cta={{ label: 'Send Your Résumé', href: applyHref }}
    >
      <div className="space-y-14">
        {/* Teams we hire for */}
        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Teams we hire for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {teams.map((t) => {
              const Icon = t.icon
              return (
                <div key={t.title} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg">{t.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{t.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* What we value */}
        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">How we work</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {values.map((v) => (
              <li
                key={v}
                className="flex items-start gap-3 rounded-2xl border border-divider bg-white p-5 text-sm text-ink/80 shadow-card"
              >
                <Heart size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* No-fabricated-postings: honest open-application CTA */}
        <section className="rounded-2xl bg-ink px-7 py-10 text-center text-white sm:px-10">
          <Mail size={28} className="mx-auto text-amber-300" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl">
            No specific opening listed? Apply anyway.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            We hire as we grow. Send your résumé and a short note about the kind of work you do —
            we&apos;ll reach out when there&apos;s a fit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={applyHref} className="btn-pill bg-white font-bold text-accent hover:bg-white/90">
              Email Your Résumé <Mail size={16} aria-hidden="true" />
            </a>
            <a
              href={business.nap.tel}
              className="btn-pill border border-white/40 bg-transparent text-white hover:bg-white/10"
            >
              Call {business.nap.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-sm text-white/60">{business.nap.email}</p>
        </section>
      </div>
    </PageStub>
  )
}
