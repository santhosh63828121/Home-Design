import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import CostCalculator from '@/components/pricing/CostCalculator'
import { PriceRangesTable, IncludedExcluded, EmiCallout } from '@/components/pricing/blocks'
import PricingFaqs from '@/components/pricing/PricingFaqs'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { pricingFaqs } from '@/data/pricing'
import { JsonLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: '3BHK Interior Design Cost in Chennai',
  description:
    '3BHK interior design cost in Chennai — Premium full-home package with branded fittings, transparent ranges, a turnkey option, EMI and a free cost calculator.',
  path: routes.cost3bhk,
  keywords: ['3BHK Interior Cost Chennai', '3BHK Interior Design Chennai', 'Full Home Interior Cost Chennai'],
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '3BHK Interior Design',
  serviceType: 'Home Interior Design',
  description: 'Premium 3BHK and full-home turnkey interior design in Chennai with branded fittings and free 3D design.',
  url: `${siteConfig.url}${routes.cost3bhk}`,
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
}

export default function Cost3BHKPage() {
  return (
    <>
      <PageStub
        title="3BHK Interior Design Cost in Chennai"
        kicker="RGL Decors · Pricing"
        intro="Our Premium 3BHK delivers a full home with branded fittings; a turnkey project adds civil, false ceiling and furniture. Estimate your 3BHK below and book a free 3D walkthrough for an exact quote."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Pricing', path: routes.pricing },
          { name: '3BHK Cost', path: routes.cost3bhk },
        ]}
        cta={{ label: 'Get a Free 3BHK Quote', href: routes.getQuote }}
      >
        <div className="space-y-14">
          <CostCalculator defaultPreset="3bhk" defaultFinish="premium" />

          <section>
            <h2 className="font-serif text-2xl font-medium sm:text-3xl">3BHK &amp; turnkey ranges</h2>
            <div className="mt-6">
              <PriceRangesTable ids={['premium-3bhk', 'full-home-turnkey']} />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium sm:text-3xl">What&apos;s included &amp; excluded</h2>
            <div className="mt-6">
              <IncludedExcluded id="premium-3bhk" />
            </div>
          </section>

          <EmiCallout />

          <section className="flex flex-wrap gap-3">
            <Link
              href={routes.service('modular-kitchen-chennai')}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              Modular kitchen <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={routes.portfolio}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              Full-home projects <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={routes.cost2bhk}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              2BHK cost <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>

          <PricingFaqs faqs={pricingFaqs['3bhk']} id="cost-3bhk" />
        </div>
      </PageStub>

      <JsonLd id="ld-3bhk-service" data={schema} />
    </>
  )
}
