import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import CostCalculator from '@/components/pricing/CostCalculator'
import {
  PriceRangesTable,
  IncludedExcluded,
  FinishTiers,
  EmiCallout,
  TierGrid,
  ResidentialTimelines,
} from '@/components/pricing/blocks'
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

/**
 * THE COST GUIDE
 * ============================================================================
 * Not a pricing page — a guide, with chapters. The old page was a stack of
 * tables, each in its own drop-shadowed box, which is how you make money feel
 * like a spreadsheet. Here the page is paginated like a printed guide: a
 * numbered chapter opener (numeral, gold rule, serif heading, a paragraph of
 * argument) and then the matter itself, set on hairlines.
 *
 * The order is the order a homeowner actually thinks in: what drives the number
 * → what it might be for me → what I get for it → what changes it → how I pay →
 * how long it takes.
 *
 * HONESTY: every figure comes from `src/data/pricing.ts`. PRICING_INDICATIVE is
 * true, so each price carries a `*` and its footnote — the ranges are ranges and
 * they say so, in the same breath as the number. Nothing here is invented and no
 * schema was touched: the Service/AggregateOffer JSON-LD below is byte-identical
 * to the version that shipped.
 */

/** A numbered chapter opener. Every section of the guide gets one. */
function Chapter({
  n,
  eyebrow,
  title,
  emphasis,
  children,
}: {
  n: string
  eyebrow: string
  title: string
  emphasis?: string
  children?: React.ReactNode
}) {
  return (
    <SectionReveal
      stagger
      amount={0.3}
      className="grid gap-8 border-t border-divider pt-12 lg:grid-cols-[auto_1fr] lg:gap-20"
    >
      <RevealItem>
        <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">{n}</span>
        <p className="eyebrow mt-4">{eyebrow}</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2 className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink">
          {title} {emphasis && <span className="italic text-accent">{emphasis}</span>}
        </h2>
      </RevealItem>
      {children && (
        <RevealItem
          as="p"
          className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pt-14"
        >
          {children}
        </RevealItem>
      )}
    </SectionReveal>
  )
}

/** The three levers, stated plainly before a single number appears. */
const LEVERS = [
  {
    title: 'Scope',
    body: 'How many rooms, and how much of each one. A kitchen and two wardrobes is a different project from a full home — and should be a different conversation.',
  },
  {
    title: 'Finish',
    body: 'The single biggest lever. The same wardrobe in laminate, in acrylic and in veneer are three different prices for the same carcass.',
  },
  {
    title: 'Site',
    body: 'What your walls, floors and services actually need before anything can be fitted. This is what a site visit is for, and why an honest figure waits for one.',
  },
]

export default function PricingHubPage() {
  return (
    <>
      <PageStub
        title="What Interiors Really Cost in Chennai"
        kicker="RGL Décors · Cost guide"
        intro="Most studios hide behind a vague estimate. We would rather show you the arithmetic. Below: what drives the number, an honest range for your home, exactly what each range buys, and how to pay for it — before anyone visits your site. Then a free site assessment turns the range into an itemised quote."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Pricing', path: routes.pricing },
        ]}
        cta={{ label: 'Get an Exact Quote', href: routes.getQuote }}
      >
        <div className="space-y-24 lg:space-y-32">
          {/* 01 — What moves the number */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="01" eyebrow="First principles" title="Three things move" emphasis="the number">
              Everything else is detail. Understand these three and you can read any interior quote
              in Chennai — ours included — and know whether it is honest.
            </Chapter>

            {/* The three levers arrive one after the other — the argument is a
                sequence, so it should be read as one. The gold rule above each
                draws itself in on hover. */}
            <SectionReveal stagger as="ol" amount={0.15} className="mt-14 grid gap-x-16 lg:grid-cols-3">
              {LEVERS.map((l, i) => (
                <RevealItem
                  as="li"
                  key={l.title}
                  className="group relative border-t border-divider py-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                  />
                  <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-serif text-title font-light text-ink transition-colors duration-500 group-hover:text-accent">
                    {l.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{l.body}</p>
                </RevealItem>
              ))}
            </SectionReveal>
          </SectionReveal>

          {/* 02 — The estimator */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="02" eyebrow="Estimate" title="Your home," emphasis="in a range">
              Set your scope and finish and the estimator returns a range, itemised line by line —
              never a single confident number it has no right to. Two minutes, no site visit, no
              obligation.
            </Chapter>
            <div className="mt-14">
              <CostCalculator defaultPreset="2bhk" />
            </div>
          </SectionReveal>

          {/* 03 — The four tiers */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="03" eyebrow="Ways to work with us" title="Four levels of" emphasis="finish">
              The tiers differ in what they are made of, not in how much we care. Each row below is a
              real specification — the board, the hardware, the surface — so you can see precisely
              what a rupee buys as you move up.
            </Chapter>
            <div className="mt-14">
              <TierGrid />
            </div>
          </SectionReveal>

          {/* 04 — The ranges */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="04" eyebrow="Package ranges" title="Honest starting" emphasis="ranges">
              The most-requested scopes, with the range we would genuinely expect them to land in.
              Your free 3D design comes with the itemised quote that replaces the range.
            </Chapter>
            <div className="mt-14">
              <PriceRangesTable />
            </div>
          </SectionReveal>

          {/* 05 — Included / excluded */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="05" eyebrow="The fine print, up front" title="What the number" emphasis="includes">
              The fastest way to be disappointed by an interior quote is to assume what is in it.
              Here is both halves — what we quote, and what is quoted separately — for the two scopes
              people ask about most.
            </Chapter>

            <SectionReveal
              stagger
              amount={0.1}
              className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20"
            >
              <RevealItem>
                <h3 className="font-serif text-title font-light text-ink">Essentials 2BHK</h3>
                <div className="mt-8">
                  <IncludedExcluded id="essentials-2bhk" />
                </div>
              </RevealItem>
              <RevealItem>
                <h3 className="font-serif text-title font-light text-ink">Premium 3BHK</h3>
                <div className="mt-8">
                  <IncludedExcluded id="premium-3bhk" />
                </div>
              </RevealItem>
            </SectionReveal>
          </SectionReveal>

          {/* 06 — Finish tiers */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="06" eyebrow="Materials" title="The finish is the" emphasis="lever">
              Change nothing else and change only this, and the estimate moves more than any other
              single decision you will make. Pick a tier in the estimator above to watch it happen.
            </Chapter>
            <div className="mt-14">
              <FinishTiers />
            </div>
          </SectionReveal>

          {/* 07 — EMI */}
          <SectionReveal as="section" variant="fadeUp" amount={0.15}>
            <EmiCallout />
          </SectionReveal>

          {/* 08 — Timelines */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="07" eyebrow="Calendar" title="How long it" emphasis="takes">
              Factory production and site work run in parallel, which is why the total below is
              shorter than the sum of its phases. These are planning targets we hold ourselves to,
              stated as targets — not a guarantee dressed up as one.
            </Chapter>
            <div className="mt-14">
              <ResidentialTimelines />
            </div>
          </SectionReveal>

          {/* 09 — Detailed pricing + related */}
          <SectionReveal as="section" variant="fadeUp" amount={0.1}>
            <Chapter n="08" eyebrow="Go deeper" title="Cost, room by" emphasis="room">
              Each of these is the same guide, written for one scope — with the ranges, inclusions
              and questions specific to it.
            </Chapter>

            <SectionReveal stagger as="ul" amount={0.15} className="mt-12 border-t border-divider">
              {subPages.map((s) => (
                <RevealItem as="li" key={s.href}>
                  <Link
                    href={s.href}
                    data-cursor="view"
                    data-cursor-label="Read the guide"
                    className="group relative flex items-center justify-between gap-6 border-b border-divider py-6 transition-colors duration-500"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                    />
                    <span className="font-serif text-title font-light text-ink transition-transform duration-700 ease-lux group-hover:translate-x-1.5">
                      {s.label}
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.25}
                      aria-hidden="true"
                      className="shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </RevealItem>
              ))}
            </SectionReveal>

            <SectionReveal
              stagger
              amount={0.4}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <RevealItem>
                <Link href={routes.getQuote} className="btn-pill btn-gold">
                  Get a free estimate
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </RevealItem>
              <RevealItem>
                <Link
                  href={routes.portfolio}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
                >
                  See what these homes look like
                </Link>
              </RevealItem>
            </SectionReveal>
          </SectionReveal>

          {/* FAQs — PricingFaqs renders its own <section>, so this reveal is a div. */}
          <SectionReveal variant="fadeUp" amount={0.1}>
            <PricingFaqs faqs={pricingFaqs.hub} id="pricing-hub" />
          </SectionReveal>
        </div>
      </PageStub>

      <JsonLd id="ld-pricing-service" data={serviceSchema} />
    </>
  )
}
