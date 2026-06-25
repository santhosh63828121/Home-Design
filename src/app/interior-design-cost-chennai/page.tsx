import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import CostCalculator from '@/components/pricing/CostCalculator'
import { PriceRangesTable, IncludedExcluded, FinishTiers, EmiCallout } from '@/components/pricing/blocks'
import PricingFaqs from '@/components/pricing/PricingFaqs'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { pricingFaqs } from '@/data/pricing'
import { JsonLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Cost in Chennai (2 & 3BHK)',
  description:
    'Transparent interior design cost in Chennai — modular kitchens from Rs 50,000, 2BHK & 3BHK ranges, material tiers, EMI and a free RGL Decors cost calculator.',
  path: routes.pricing,
  keywords: [
    'Interior Design Cost Chennai',
    'Modular Kitchen Price Chennai',
    '2BHK Interior Cost Chennai',
    '3BHK Interior Cost Chennai',
    'Interior Design Packages Chennai',
  ],
})

const subPages = [
  { label: 'Modular kitchen price', href: routes.kitchenPrice },
  { label: '2BHK interior cost', href: routes.cost2bhk },
  { label: '3BHK interior cost', href: routes.cost3bhk },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Interior Design',
  serviceType: 'Interior Design',
  description:
    'Transparent interior design packages and pricing in Chennai — modular kitchens, wardrobes and full-home turnkey interiors with free 3D design and EMI options.',
  url: `${siteConfig.url}${routes.pricing}`,
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 50000,
    offerCount: 4,
  },
}

export default function PricingHubPage() {
  return (
    <>
      <PageStub
        title="Interior Design Cost in Chennai"
        kicker="RGL Decors · Pricing"
        intro="Most studios hide their pricing — we don't. Estimate your interior cost instantly below, see our transparent package ranges, material tiers and EMI options, then book a free site visit to turn the range into an exact, itemised quote."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Pricing', path: routes.pricing },
        ]}
        cta={{ label: 'Get an Exact Quote', href: routes.getQuote }}
      >
        <div className="space-y-16">
          {/* Calculator */}
          <CostCalculator defaultPreset="2bhk" />

          {/* Ranges table */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Transparent package ranges</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              Honest starting ranges for the most-requested scopes. Your free 3D design comes with an
              itemised quote.
            </p>
            <div className="mt-6">
              <PriceRangesTable />
            </div>
          </section>

          {/* What&apos;s included / excluded */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">What&apos;s included &amp; excluded</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 font-serif text-lg">Essentials 2BHK</h3>
                <IncludedExcluded id="essentials-2bhk" />
              </div>
              <div>
                <h3 className="mb-3 font-serif text-lg">Premium 3BHK</h3>
                <IncludedExcluded id="premium-3bhk" />
              </div>
            </div>
          </section>

          {/* Material tiers */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Material &amp; finish tiers</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              The finish you choose is the biggest lever on cost. Pick a tier in the calculator to see
              the difference.
            </p>
            <div className="mt-6">
              <FinishTiers />
            </div>
          </section>

          {/* EMI */}
          <EmiCallout />

          {/* Detailed pricing links + related */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Explore detailed pricing</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {subPages.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-full border border-divider bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={routes.services}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
              >
                Browse all services <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href={routes.portfolio}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
              >
                See our projects <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <PricingFaqs faqs={pricingFaqs.hub} id="pricing-hub" />
        </div>
      </PageStub>

      <JsonLd id="ld-pricing-service" data={serviceSchema} />
    </>
  )
}
