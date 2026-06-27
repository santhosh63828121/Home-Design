import { Check, X, CreditCard } from 'lucide-react'
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

/** Indicative-pricing footnote — renders only while the flag is on. */
export function PriceFootnote({ className = '' }: { className?: string }) {
  if (!PRICING_INDICATIVE) return null
  return <p className={`text-xs text-muted ${className}`}>{PRICING_FOOTNOTE}</p>
}

/** Transparent ranges table. `ids` optionally limits which packages to show. */
export function PriceRangesTable({ ids }: { ids?: string[] }) {
  const rows = ids ? (ids.map(getPackage).filter(Boolean) as Package[]) : packages
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-divider bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-ink">
            <tr>
              <th className="px-5 py-4 font-caps text-xs uppercase tracking-wide2">Package</th>
              <th className="hidden px-5 py-4 font-caps text-xs uppercase tracking-wide2 sm:table-cell">
                Scope
              </th>
              <th className="px-5 py-4 text-right font-caps text-xs uppercase tracking-wide2">
                Starting at
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-4">
                  <span className="font-serif text-base text-ink">{p.name}</span>
                  <span className="mt-0.5 block text-xs text-muted sm:hidden">{p.scope}</span>
                </td>
                <td className="hidden px-5 py-4 text-ink/70 sm:table-cell">{p.scope}</td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-accent">
                  {priceLabel(p.range)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PriceFootnote className="mt-3" />
    </div>
  )
}

/**
 * 4-tier design-package feature grid (doc §4.6). Per-sq.ft figures are indicative
 * (carry `*` + the footnote); the warranty row is flagged `†` because the single
 * warranty offer is still an open decision (§2.3). Scrolls horizontally on mobile.
 */
export function TierGrid() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-divider bg-white shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="px-4 py-5 align-bottom font-caps text-xs uppercase tracking-wide2 text-muted">
                Feature
              </th>
              {designTiers.map((t) => (
                <th key={t.id} className={`px-4 py-5 align-bottom ${t.featured ? 'bg-gold/10' : ''}`}>
                  {t.featured && (
                    <span className="mb-2 inline-block rounded-full bg-gold px-2.5 py-0.5 font-caps text-[10px] font-semibold uppercase tracking-wide2 text-ink">
                      Most popular
                    </span>
                  )}
                  <span className="block font-serif text-lg text-ink">{t.name}</span>
                  <span className="mt-1 block text-xs font-normal text-muted">{t.blurb}</span>
                  <span className="mt-3 block whitespace-nowrap font-caps text-sm font-semibold text-accent">
                    {perSqftLabel(t)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {tierFeatures.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink/80">
                  {row.label}
                  {row.pending && <sup className="ml-0.5 text-[10px] text-gold-dark">†</sup>}
                </th>
                {row.cells.map((c, i) => (
                  <td key={i} className={`px-4 py-3 text-ink/80 ${designTiers[i].featured ? 'bg-gold/5' : ''}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 space-y-1">
        <PriceFootnote />
        <p className="text-xs text-muted">
          <span className="text-gold-dark">†</span> Warranty terms are confirmed in your written
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
      <div className="overflow-x-auto rounded-2xl border border-divider bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 font-caps text-xs uppercase tracking-wide2 text-muted">Phase</th>
              {timelineConfigs.map((c) => (
                <th
                  key={c}
                  className="whitespace-nowrap px-4 py-3 text-right font-caps text-xs uppercase tracking-wide2 text-muted"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {residentialTimeline.map((r) => (
              <tr key={r.phase}>
                <th scope="row" className="whitespace-nowrap px-4 py-2.5 text-left font-medium text-ink/80">
                  {r.phase}
                </th>
                {r.days.map((d, i) => (
                  <td key={i} className="px-4 py-2.5 text-right text-ink/70">
                    {d}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-divider bg-background/60">
              <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">
                Total (days)
              </th>
              {timelineTotals.map((t, i) => (
                <td key={i} className="px-4 py-3 text-right font-semibold text-accent">
                  ~{t}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Calendar days, with factory and site work running in parallel (so the total is less than the
        column sum). Planning targets, not promises — confirmed by our operations team at kickoff.
      </p>
    </div>
  )
}

/** What's included vs excluded for one package. */
export function IncludedExcluded({ id }: { id: string }) {
  const pkg = getPackage(id)
  if (!pkg) return null
  return (
    <div className="grid gap-6 rounded-2xl border border-divider bg-white p-6 shadow-card sm:grid-cols-2">
      <div>
        <h3 className="font-caps text-xs uppercase tracking-wide2 text-accent">Included</h3>
        <ul className="mt-3 space-y-2">
          {pkg.included.map((i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/85">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-caps text-xs uppercase tracking-wide2 text-muted">Not included</h3>
        <ul className="mt-3 space-y-2">
          {pkg.excluded.map((i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <X size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Material / finish tiers with their indicative uplift. */
export function FinishTiers() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {finishTiers.map((t) => {
        const uplift = Math.round((t.multiplier - 1) * 100)
        return (
          <div key={t.id} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
            <div className="flex items-baseline justify-between">
              <h3 className="font-serif text-lg">{t.name}</h3>
              <span className="font-caps text-xs uppercase tracking-wide2 text-accent">
                {uplift === 0 ? 'Base' : `+${uplift}%`}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{t.blurb}</p>
          </div>
        )
      })}
    </div>
  )
}

/** EMI / no-cost-EMI callout (figures read from the pricing model). */
export function EmiCallout() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-divider bg-white p-6 shadow-card">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <CreditCard size={20} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-serif text-lg">Flexible EMI &amp; No-Cost EMI</h3>
        <p className="mt-1 text-sm text-ink/75">
          Spread the cost with EMI options up to {emi.maxTenureMonths} months, including{' '}
          <strong>no-cost EMI</strong> on select plans. For example, {formatINR(350_000)} over{' '}
          {emi.defaultTenureMonths} months works out to roughly{' '}
          <strong>{formatINR(Math.round(350_000 / emi.defaultTenureMonths))}/month</strong>
          {PRICING_INDICATIVE ? '*' : ''}.
        </p>
      </div>
    </div>
  )
}
