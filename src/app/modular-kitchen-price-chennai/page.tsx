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
  title: 'Modular Kitchen Price in Chennai',
  description:
    'Modular kitchen price in Chennai from Rs 50,000 — L / U / parallel / island layouts, 1000+ finishes, branded hardware, EMI and a free cost calculator.',
  path: routes.kitchenPrice,
  keywords: ['Modular Kitchen Price Chennai', 'Modular Kitchen Cost Chennai', 'Kitchen Interior Price Chennai'],
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Modular Kitchen',
  serviceType: 'Modular Kitchen Design',
  description: 'Custom modular kitchens in Chennai from Rs 50,000 with branded hardware and 1000+ finishes.',
  url: `${siteConfig.url}${routes.kitchenPrice}`,
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 50000 },
}

export default function KitchenPricePage() {
  return (
    <>
      <PageStub
        title="Modular Kitchen Price in Chennai"
        kicker="RGL Decors · Pricing"
        intro="Modular kitchens start from Rs 50,000 and scale with layout, size and finish. Estimate your kitchen below, see what's included, and book a free 3D design for an exact quote."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Pricing', path: routes.pricing },
          { name: 'Modular Kitchen Price', path: routes.kitchenPrice },
        ]}
        cta={{ label: 'Get a Free 3D Kitchen Design', href: routes.getQuote }}
      >
        <div className="space-y-14">
          <CostCalculator defaultPreset="1bhk" defaultFinish="premium" />

          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Kitchen price range</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              We build L-shaped, U-shaped, parallel and island layouts — each engineered to the
              millimetre with tall and loft units.
            </p>
            <div className="mt-6">
              <PriceRangesTable ids={['modular-kitchen', 'essentials-2bhk']} />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">What&apos;s included &amp; excluded</h2>
            <div className="mt-6">
              <IncludedExcluded id="modular-kitchen" />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Finish tiers</h2>
            <div className="mt-6">
              <FinishTiers />
            </div>
          </section>

          <EmiCallout />

          <section className="flex flex-wrap gap-3">
            <Link
              href={routes.service('modular-kitchen-chennai')}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              Modular kitchen designs <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={routes.portfolio}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              See our kitchens <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={routes.pricing}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              Full pricing <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>

          <PricingFaqs faqs={pricingFaqs.kitchen} id="kitchen-price" />
        </div>
      </PageStub>

      <JsonLd id="ld-kitchen-service" data={schema} />
    </>
  )
}
