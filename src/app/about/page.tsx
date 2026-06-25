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
import { usps, companyFacts, business } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'About RGL Decors',
  description:
    'RGL Decors, a Chennai interior-design firm since 2021 — factory-built home interiors with free HD 3D walkthroughs, a 10-year warranty and 45-day move-in.',
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

const processSteps = [
  { n: 1, title: 'Free consultation', text: 'We learn how you live, your budget and the style you want — over a call or a site visit.' },
  { n: 2, title: 'Design & 3D walkthrough', text: 'We model your home in HD and walk you through it, so you approve the real thing, not a guess.' },
  { n: 3, title: 'Factory build', text: 'Approved designs are manufactured on our automated line and pass 100+ quality checks.' },
  { n: 4, title: 'Install & handover', text: 'We fit everything on site and hand over within the promised 45 days, warranty in hand.' },
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'About', path: routes.about },
  ]

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About RGL Decors',
    url: `${siteConfig.url}${routes.about}`,
    description:
      'The story, mission and process behind RGL Decors — interior designers in Chennai since 2021.',
    about: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }

  return (
    <PageStub
      title="Dreams, Delivered — One Home at a Time"
      kicker="RGL Decors · About"
      intro={`${companyFacts.foundedLabel}, RGL Decors designs and builds complete home interiors that look exactly like the design you approved. We do it with free HD 3D walkthroughs, factory precision and pricing you can actually see — so the only surprise is how good it feels to move in.`}
      crumbs={crumbs}
      cta={{ label: 'Get a Free 3D Design', href: routes.getQuote }}
    >
      <div className="space-y-16">
        {/* Story + mission (original, clean prose) */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-ink/80">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Who we are</h2>
            <p>
              RGL Decors is a Chennai interior-design firm with a simple belief: a beautiful home
              shouldn&apos;t come with hidden costs, vague timelines or a finished result that looks
              nothing like what you were shown. We design modular kitchens, wardrobes and full,
              turnkey home interiors — and we build them to last.
            </p>
            <p>
              What sets the work apart is how much you get to see before you commit. We were among the
              first studios in India to offer a complete interior walkthrough in HD 3D, free of cost,
              with {companyFacts.accuracyClaim}. You walk through your living room, kitchen and
              bedrooms while everything can still be changed — colours, layouts, materials — so the
              home that gets installed is the one you already fell in love with on screen.
            </p>
            <p>
              Every panel is manufactured on an automated production line rather than cut by hand on
              site, which means cleaner finishes, fewer errors and a predictable timeline. With{' '}
              {companyFacts.finishesClaim} to choose from and prices starting{' '}
              {companyFacts.entryPrice.toLowerCase()}, there&apos;s a version of great design for
              every budget.
            </p>
          </div>

          <aside className="space-y-4 rounded-2xl border border-divider bg-white p-7 shadow-card">
            <h3 className="font-serif text-xl">Our promise</h3>
            <ul className="space-y-3 text-sm text-ink/80">
              {[
                'A free HD 3D walkthrough before you spend a rupee on build',
                '10-year warranty on core materials',
                'Guaranteed move-in within 45 days (T&C apply)',
                '100+ quality checks on every product before delivery',
                'Transparent, itemised pricing — no hidden costs',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-divider pt-4 text-sm text-muted">
              {business.tagline} · {business.taglineLong}
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
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">See your home before it&apos;s built</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Book a free consultation and we&apos;ll turn your space into a 3D walkthrough — no cost,
            no obligation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={routes.getQuote} className="btn-pill bg-white font-bold text-accent hover:bg-white/90">
              Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
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
