import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Target, Gift } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { YouTubeEmbed } from '@/components/portfolio/media'
import { ProjectCover } from '@/components/portfolio/ProjectVisuals'
import ContactSection from '@/components/ContactSection.jsx'
import { projects, hasVideo } from '@/data/portfolio'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Free 3D Interior Walkthrough',
  description:
    "India's 1st complete HD 3D interior walkthrough with 99% accuracy, free of cost — see your Chennai home before it's built, then book your free walkthrough.",
  path: routes.walkthrough,
  keywords: ['3D Interior Walkthrough Chennai', 'Free 3D Interior Design Chennai', 'Virtual Interior Design Chennai'],
})

const usps = [
  { icon: Award, title: "India's 1st", text: 'The first enterprise to offer a complete 3D interior walkthrough of your home.' },
  { icon: Target, title: '99% Accuracy', text: 'HD-quality renders that match the finished interior almost exactly — no surprises.' },
  { icon: Gift, title: 'Free of Cost', text: 'Your full walkthrough and itemised quote come at no cost and no obligation.' },
]

const steps = [
  { n: 1, title: 'Free consultation', text: 'Share your home, budget and style — on call or at a site visit.' },
  { n: 2, title: 'Measurement & layout', text: 'We measure your space and plan the optimal layout to the millimetre.' },
  { n: 3, title: '3D design', text: 'Your interiors are modelled in HD — materials, colours and lighting included.' },
  { n: 4, title: 'Walk through it', text: 'Explore your home in a 3D walkthrough and tweak anything before approval.' },
  { n: 5, title: 'Approve & build', text: 'Once you love it, we factory-build and install — what you saw is what you get.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '3D Interior Walkthrough',
  serviceType: '3D Interior Design Walkthrough',
  description: "India's 1st complete HD 3D interior walkthrough with 99% accuracy, free of cost.",
  url: `${siteConfig.url}${routes.walkthrough}`,
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
  offers: { '@type': 'Offer', price: 0, priceCurrency: 'INR' },
}

export default function WalkthroughPage() {
  return (
    <>
      <PageStub
        title="See Your Home Before It's Built"
        kicker="RGL Decors · 3D Walkthrough"
        intro="India's first complete HD 3D interior walkthrough, with 99% accuracy — free of cost. Walk through your living room, kitchen and bedrooms before a single panel is made, and change anything you like before you commit."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: '3D Walkthrough', path: routes.walkthrough },
        ]}
        cta={{ label: 'Book Your Free Walkthrough', href: routes.getQuote }}
      >
        <div className="space-y-16">
          {/* USP band */}
          <section className="grid gap-4 sm:grid-cols-3">
            {usps.map((u) => {
              const Icon = u.icon
              return (
                <div key={u.title} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-serif text-xl">{u.title}</h2>
                  <p className="mt-1 text-sm text-ink/70">{u.text}</p>
                </div>
              )
            })}
          </section>

          {/* Project walkthroughs — light up when a youTubeId is added in portfolio.ts */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Project walkthroughs</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              Real RGL Decors projects, presented as 3D walkthroughs. Videos publish here as we
              release them.
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {projects.map((p) =>
                hasVideo(p) ? (
                  <div key={p.slug}>
                    <YouTubeEmbed id={p.media.youTubeId as string} title={`${p.title} — 3D walkthrough`} />
                    <p className="mt-2 text-sm font-medium text-ink">{p.title}</p>
                  </div>
                ) : (
                  <Link
                    key={p.slug}
                    href={routes.portfolioProject(p.slug)}
                    className="group block overflow-hidden rounded-2xl border border-divider bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="skeleton relative aspect-video w-full overflow-hidden">
                      <ProjectCover project={p} sizes="(max-width: 1024px) 100vw, 50vw" />
                      <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-white">
                        Walkthrough coming soon
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-serif text-lg">{p.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{p.client}</p>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">How the 3D walkthrough works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((s) => (
                <li key={s.n} className="rounded-2xl border border-divider bg-white p-5 shadow-card">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-caps text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-serif text-base">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Booking form → Phase-0 lead action */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Book your free 3D walkthrough</h2>
            <div className="-mx-5 mt-2 sm:-mx-8 lg:-mx-12">
              <ContactSection />
            </div>
          </section>
        </div>
      </PageStub>

      <JsonLd id="ld-walkthrough-service" data={serviceSchema} />
    </>
  )
}
