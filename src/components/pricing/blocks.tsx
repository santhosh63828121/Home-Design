import { Check, X } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import {
  packages,
  finishTiers,
  emi,
  priceLabel,
  formatINR,
  PRICING_INDICATIVE,
  PRICING_FOOTNOTE,
  getPackage,
  designTiers,
  tierFeatures,
  perSqftLabel,
  residentialTimeline,
  timelineConfigs,
  timelineTotals,
  type Package,
} from '@/data/pricing'

/**
 * THE COST GUIDE — the blocks the pricing page is assembled from.
 * ============================================================================
 * These were six drop-shadowed cards and three boxed tables. They are now ruled
 * editorial matter: hairlines instead of shadows, tabular figures instead of
 * "pricing cards", and a numeral in the margin where a card border used to be.
 * A cost guide should read like a specification sheet from an architecture
 * practice — legible, quiet, and impossible to mistake for a SaaS pricing page.
 *
 * HONESTY (unchanged, and the reason half this file exists): every figure comes
 * from `src/data/pricing.ts`. Nothing is typed into a component. While
 * PRICING_INDICATIVE is true every rendered price carries a `*` and the footnote
 * shows; the warranty row carries a `†` because that term is still open. The
 * dagger is `gold-ink` (4.91:1), never `gold` (2.33:1 — invisible as text).
 *
 * MOTION: every row is a beat. The <tbody> is a SectionReveal stagger and each
 * <tr> a RevealItem, so a table is *typeset onto the page* line by line rather
 * than appearing as a slab of figures. (Table rows are transformable — only
 * table-column and table-column-group boxes are not — so this is transform +
 * opacity and never touches layout.) All below the fold, so framer is safe here.
 */

/** Indicative-pricing footnote — renders only while the flag is on. */
export function PriceFootnote({ className = '' }: { className?: string }) {
  if (!PRICING_INDICATIVE) return null
  return <p className={`text-xs text-muted ${className}`}>{PRICING_FOOTNOTE}</p>
}

/** Shared header cell: a tracked-out label, never a shouty table head. */
const TH = 'py-4 font-caps text-[10px] font-normal uppercase tracking-wide2 text-muted'

/** Transparent ranges table. `ids` optionally limits which packages to show. */
export function PriceRangesTable({ ids }: { ids?: string[] }) {
  const rows = ids ? (ids.map(getPackage).filter(Boolean) as Package[]) : packages
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Indicative starting ranges by package scope
          </caption>
          <thead>
            <tr className="border-y border-divider">
              <th scope="col" className={`${TH} pr-6`}>
                Package
              </th>
              <th scope="col" className={`${TH} pr-6`}>
                Scope
              </th>
              <th scope="col" className={`${TH} text-right`}>
                Starting at
              </th>
            </tr>
          </thead>
          <SectionReveal stagger as="tbody" amount={0.1}>
            {rows.map((p) => (
              <RevealItem
                as="tr"
                key={p.id}
                className="group border-b border-divider transition-colors duration-500 hover:bg-bone"
              >
                <th scope="row" className="py-6 pr-6 align-top text-left font-normal">
                  <span className="font-serif text-title font-light text-ink transition-colors duration-500 group-hover:text-accent">
                    {p.name}
                  </span>
                </th>
                <td className="py-6 pr-6 align-top text-sm leading-relaxed text-ink/65">
                  {p.scope}
                </td>
                <td className="whitespace-nowrap py-6 text-right align-top">
                  <span className="font-caps text-sm tracking-caps text-accent">
                    {priceLabel(p.range)}
                  </span>
                </td>
              </RevealItem>
            ))}
          </SectionReveal>
        </table>
      </div>
      <PriceFootnote className="mt-6" />
    </div>
  )
}

/**
 * The four design tiers (doc §4.6) as a specification grid. Per-sq.ft figures are
 * indicative (`*` + footnote); the warranty row is flagged `†` because the single
 * warranty offer is still an open decision (§2.3) — shown for structure, never
 * published as a firm term. Scrolls horizontally on mobile.
 */
export function TierGrid() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <caption className="sr-only">
            What is included at each of the four design tiers
          </caption>
          <thead>
            <tr className="border-b border-divider">
              <th scope="col" className={`${TH} w-[18%] pr-6 align-bottom`}>
                Specification
              </th>
              {designTiers.map((t) => (
                <th
                  key={t.id}
                  scope="col"
                  className={`px-6 py-6 align-bottom font-normal ${
                    t.featured ? 'bg-gold/[0.07]' : ''
                  }`}
                >
                  {t.featured && (
                    <span className="mb-3 inline-block bg-gold px-2 py-1 font-caps text-[9px] uppercase tracking-wide2 text-ink">
                      Most chosen
                    </span>
                  )}
                  <span className="block font-serif text-title font-light text-ink">{t.name}</span>
                  <span className="mt-2 block max-w-[18ch] text-xs leading-relaxed text-muted">
                    {t.blurb}
                  </span>
                  <span className="mt-4 block whitespace-nowrap font-caps text-[13px] tracking-caps text-accent">
                    {perSqftLabel(t)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <SectionReveal stagger as="tbody" amount={0.05}>
            {tierFeatures.map((row) => (
              <RevealItem
                as="tr"
                key={row.label}
                className="border-b border-divider transition-colors duration-500 hover:bg-bone"
              >
                <th
                  scope="row"
                  className="py-4 pr-6 text-left font-caps text-[11px] font-normal uppercase tracking-wide2 text-muted"
                >
                  {row.label}
                  {row.pending && <sup className="ml-0.5 text-[10px] text-gold-ink">†</sup>}
                </th>
                {row.cells.map((c, i) => (
                  <td
                    key={i}
                    className={`px-6 py-4 text-sm text-ink/75 ${
                      designTiers[i].featured ? 'bg-gold/[0.04]' : ''
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </RevealItem>
            ))}
          </SectionReveal>
        </table>
      </div>
      <div className="mt-6 space-y-1.5">
        <PriceFootnote />
        <p className="text-xs text-muted">
          <span className="text-gold-ink">†</span> Warranty terms are confirmed in writing in your
          quotation.
        </p>
      </div>
    </div>
  )
}

/** Residential timeline table (doc §4.6) — planning targets, parallelised. */
export function ResidentialTimelines() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">
            Indicative phase durations in calendar days, by home configuration
          </caption>
          <thead>
            <tr className="border-y border-divider">
              <th scope="col" className={`${TH} pr-6`}>
                Phase
              </th>
              {timelineConfigs.map((c) => (
                <th key={c} scope="col" className={`${TH} whitespace-nowrap pl-6 text-right`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <SectionReveal stagger as="tbody" amount={0.05}>
            {residentialTimeline.map((r) => (
              <RevealItem
                as="tr"
                key={r.phase}
                className="border-b border-divider transition-colors duration-500 hover:bg-bone"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 pr-6 text-left text-sm font-normal text-ink"
                >
                  {r.phase}
                </th>
                {r.days.map((d, i) => (
                  <td
                    key={i}
                    className="py-4 pl-6 text-right text-sm tabular-nums text-ink/60"
                  >
                    {d}
                  </td>
                ))}
              </RevealItem>
            ))}
            {/* The total lands last, after every phase has been read. */}
            <RevealItem as="tr" className="border-b border-divider">
              <th
                scope="row"
                className="py-6 pr-6 text-left font-caps text-[11px] uppercase tracking-wide2 text-ink"
              >
                Total
              </th>
              {timelineTotals.map((t, i) => (
                <td
                  key={i}
                  className="py-6 pl-6 text-right font-caps text-sm tabular-nums tracking-caps text-accent"
                >
                  ~{t}
                </td>
              ))}
            </RevealItem>
          </SectionReveal>
        </table>
      </div>
      <p className="mt-6 max-w-prose2 text-xs leading-relaxed text-muted">
        Calendar days, with factory and site work running in parallel — which is why the total is
        less than the column sum. Planning targets, not promises: your operations team confirms the
        schedule at kickoff.
      </p>
    </div>
  )
}

/** What's included vs excluded for one package — two ruled columns, no card. */
export function IncludedExcluded({ id }: { id: string }) {
  const pkg = getPackage(id)
  if (!pkg) return null
  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      <div>
        <p className="font-caps text-[10px] uppercase tracking-wide2 text-accent">In the quote</p>
        <span aria-hidden="true" className="rule-gold mt-4" />
        <SectionReveal stagger as="ul" amount={0.1} className="mt-6">
          {pkg.included.map((i) => (
            <RevealItem
              as="li"
              key={i}
              className="group/row flex items-start gap-3 border-b border-divider py-3 text-sm leading-relaxed text-ink/80"
            >
              <Check
                size={15}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-accent transition-transform duration-700 ease-lux group-hover/row:scale-110"
                aria-hidden="true"
              />
              {i}
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
      <div>
        <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">Quoted separately</p>
        <span aria-hidden="true" className="mt-4 block h-px w-16 bg-divider" />
        <SectionReveal stagger as="ul" amount={0.1} className="mt-6">
          {pkg.excluded.map((i) => (
            <RevealItem
              as="li"
              key={i}
              className="flex items-start gap-3 border-b border-divider py-3 text-sm leading-relaxed text-muted"
            >
              <X size={15} strokeWidth={1.5} className="mt-1 shrink-0" aria-hidden="true" />
              {i}
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </div>
  )
}

/**
 * The finish tiers — the single biggest lever on cost, so they are set as three
 * ruled columns with the uplift in the margin, not as three price cards.
 */
export function FinishTiers() {
  return (
    <SectionReveal stagger as="ol" amount={0.15} className="grid sm:grid-cols-3 sm:gap-x-12">
      {finishTiers.map((t, i) => {
        const uplift = Math.round((t.multiplier - 1) * 100)
        return (
          <RevealItem as="li" key={t.id} className="group relative border-t border-divider py-8">
            {/* The rule above the tier draws itself gold on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
            />
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-caps text-[11px] uppercase tracking-wide2 text-accent">
                {uplift === 0 ? 'Base' : `+${uplift}%`}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-title font-light text-ink transition-colors duration-500 group-hover:text-accent">
              {t.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{t.blurb}</p>
          </RevealItem>
        )
      })}
    </SectionReveal>
  )
}

/** EMI / no-cost-EMI callout — a quiet bone band, figures read from the model. */
export function EmiCallout() {
  return (
    <SectionReveal
      stagger
      amount={0.25}
      className="grid gap-8 bg-bone p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-16"
    >
      <RevealItem>
        <p className="eyebrow">Paying for it</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2 className="mt-6 max-w-[10ch] font-serif text-title font-light text-ink">
          Spread it, <span className="italic text-accent">comfortably</span>
        </h2>
      </RevealItem>
      <RevealItem as="p" className="max-w-prose2 text-pretty leading-relaxed text-ink/70">
        EMI options run up to {emi.maxTenureMonths} months, with <strong className="font-medium text-ink">no-cost EMI</strong>{' '}
        on select plans. As a worked example: {formatINR(350_000)} over {emi.defaultTenureMonths}{' '}
        months is roughly{' '}
        <strong className="font-medium text-ink">
          {formatINR(Math.round(350_000 / emi.defaultTenureMonths))} a month
        </strong>
        {PRICING_INDICATIVE ? '*' : ''}. The exact plan, and any terms attached to it, are set out
        in writing before you commit — never assumed.
      </RevealItem>
    </SectionReveal>
  )
}
