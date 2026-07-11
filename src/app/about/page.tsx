import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import StatsSection from '@/components/StatsSection.jsx'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'
import { usps, companyFacts } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'The RGL Story',
  description:
    'The RGL Decors story — founded in Chennai in 2018 on one belief: interiors should be living reflections of identity, lifestyle and status, not just walls.',
  path: routes.about,
})

// Map the canonical USP icon names to the lucide components we render.
const USP_ICONS: Record<string, LucideIcon> = {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
}

// A four-beat summary of the full ten-step craft (see /process for all of them).
const processSteps = [
  { n: 1, title: 'Discover & brief', text: 'We begin by listening — your lifestyle, taste, budget and aspirations shape everything that follows.' },
  { n: 2, title: 'Concept & 3D visualisation', text: 'Mood boards, material stories, then an immersive walkthrough — you see every room before it is built.' },
  { n: 3, title: 'Craft & build', text: 'Factory-engineered production meets meticulous on-site execution, with 100+ quality checks.' },
  { n: 4, title: 'Handover & care', text: 'A formal snagging walkthrough, then complimentary one-year post-service care after you move in.' },
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'About', path: routes.about },
  ]

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'The RGL Story',
    url: `${siteConfig.url}${routes.about}`,
    description:
      'The story, promise and craft behind RGL Decors — premium interior designers in Chennai since 2018.',
    about: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }

  return (
    <PageStub
      title="The RGL Story"
      kicker="RGL Décors · Our Story"
      intro={`${companyFacts.foundedLabel}, RGL Décors began with a simple belief — interiors should be more than walls and furniture; they should be living reflections of identity, lifestyle and status. What started as a vision has grown into Chennai's trusted premium interior and turnkey execution studio.`}
      crumbs={crumbs}
      cta={{ label: 'Book Private Consultation', href: routes.getQuote }}
    >
      <div className="space-y-16">
        {/* The RGL Story — client copy (PDF §The RGL Story) */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-ink/80">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              Crafting spaces, shaping identities
            </h2>
            <p>
              From our very first project, we set out to deliver not just elegant designs but
              experiences that elevate how people live. Every detail — from mood boards to
              factory-engineered precision — is chosen to mirror who our clients are and the life
              they aspire to lead.
            </p>
            <p>
              <strong className="text-ink">Premium assurance, emotional connection.</strong> With
              100+ quality checks and Chennai&apos;s first one-year complimentary post-service care,
              we stand for trust and longevity. But beyond assurance, we stand for emotion — spaces
              that speak your language, reflect your soul, and announce your status.
            </p>
            <p>
              We listen, design, craft and care. Every finish, fitting, surface and fixture is
              selected for durability, elegance and everyday performance — because a home should
              still feel like yours a decade after the last panel goes in.
            </p>
          </div>

          <aside className="space-y-4 rounded-2xl border border-divider bg-white p-7 shadow-card">
            <h3 className="font-serif text-xl">Our promise</h3>
            <p className="text-sm text-ink/75">
              At RGL Décors, we don&apos;t just design interiors. We design identities.
            </p>
            <ul className="space-y-3 text-sm text-ink/80">
              {[
                'A complete turnkey experience — designed, managed and delivered by one team',
                'Immersive 3D walkthroughs, so you visualise before you build',
                '100+ quality checks and a snagging walkthrough before you move in',
                'Complimentary one-year post-service care after handover',
                'Transparent, itemised costing — no hidden markups',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-divider pt-4 text-sm text-muted">
              We deliver homes and workplaces that are not only premium, but powerful symbols of
              superior living.
            </p>
          </aside>
        </section>

        {/* Honest count-up stats (full-bleed band) */}
        <section className="-mx-5 sm:-mx-8 lg:-mx-12">
          <StatsSection />
        </section>

        {/* Why homeowners choose us — the 8 real USPs */}
        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Why homeowners choose us</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {usps.map((u) => {
              const Icon = USP_ICONS[u.icon] ?? CheckCircle2
              return (
                <div key={u.title} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg">{u.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{u.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Mini process */}
        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">How we work</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-caps text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 font-serif text-base">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Closing CTA */}
        <section className="rounded-2xl bg-accent px-7 py-10 text-center text-white sm:px-10">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Visualise before you build</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Book a private consultation and we&apos;ll turn your space into an immersive 3D
            walkthrough — no cost, no obligation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={routes.getQuote} className="btn-pill bg-white font-bold text-accent hover:bg-white/90">
              Book Private Consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={routes.portfolio}
              className="btn-pill border border-white/70 bg-transparent text-white hover:bg-white/10"
            >
              See Our Work
            </Link>
          </div>
        </section>
      </div>

      {/* Breadcrumb JSON-LD is already emitted by PageStub. */}
      <JsonLd id="ld-about" data={aboutSchema} />
    </PageStub>
  )
}
