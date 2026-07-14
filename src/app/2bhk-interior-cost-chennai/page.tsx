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
  title: '2BHK Interior Design Cost in Chennai',
  description:
    '2BHK interior design cost in Chennai — Essentials package with modular kitchen, two wardrobes and a TV unit, transparent ranges, EMI and a free cost calculator.',
  path: routes.cost2bhk,
  keywords: ['2BHK Interior Cost Chennai', '2BHK Interior Design Chennai', '2BHK Interior Price Chennai'],
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '2BHK Interior Design',
  serviceType: 'Home Interior Design',
  description: 'Full 2BHK interior design in Chennai — kitchen, wardrobes and TV unit with free 3D design.',
  url: `${siteConfig.url}${routes.cost2bhk}`,
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
}

export default function Cost2BHKPage() {
  return (
    <>
      <PageStub
        title="2BHK Interior Design Cost in Chennai"
        kicker="RGL Decors · Pricing"
        intro="Our Essentials 2BHK covers a modular kitchen, two wardrobes and a TV unit. Estimate your 2BHK below, see what's included, and book a free 3D walkthrough for an exact quote."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Pricing', path: routes.pricing },
          { name: '2BHK Cost', path: routes.cost2bhk },
        ]}
        cta={{ label: 'Get a Free 2BHK Quote', href: routes.getQuote }}
      >
        <div className="space-y-14">
          <CostCalculator defaultPreset="2bhk" defaultFinish="premium" />

          <section>
            <h2 className="font-serif text-2xl font-medium sm:text-3xl">2BHK package range</h2>
            <div className="mt-6">
              <PriceRangesTable ids={['essentials-2bhk', 'modular-kitchen']} />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium sm:text-3xl">What&apos;s included &amp; excluded</h2>
            <div className="mt-6">
              <IncludedExcluded id="essentials-2bhk" />
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
              href={routes.service('wardrobe-design-chennai')}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              Wardrobes <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={routes.cost3bhk}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              3BHK cost <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>

          <PricingFaqs faqs={pricingFaqs['2bhk']} id="cost-2bhk" />
        </div>
      </PageStub>

      <JsonLd id="ld-2bhk-service" data={schema} />
    </>
  )
}
