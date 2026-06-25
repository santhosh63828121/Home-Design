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
