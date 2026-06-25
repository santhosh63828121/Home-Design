'use client'

import { useActionState, useMemo, useState } from 'react'
import { Minus, Plus, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react'
import {
  roomRates,
  finishTiers,
  bhkPresets,
  getPreset,
  estimate,
  formatINR,
  priceLabel,
  PRICING_INDICATIVE,
  PRICING_FOOTNOTE,
} from '@/data/pricing'
import { submitContact, type ContactState } from '@/app/actions/contact'

type QtyMap = Record<string, number>

const initialQty = (presetId: string): QtyMap => {
  const preset = getPreset(presetId)
  const map: QtyMap = {}
  for (const r of roomRates) map[r.id] = 0
  for (const rq of preset?.rooms ?? []) map[rq.roomId] = rq.qty
  return map
}

const formInitial: ContactState = { ok: false }

/**
 * Interactive cost estimator. Inputs (BHK preset · room quantities · finish
 * tier) feed the single-source estimate() and render a RANGE — never a hard
 * number — with the indicative footnote. "Get exact quote" captures the lead
 * through the Phase-0 contact Server Action (estimate auto-attached).
 */
export default function CostCalculator({
  defaultPreset = '2bhk',
  defaultFinish = 'premium',
}: {
  defaultPreset?: string
  defaultFinish?: string
}) {
  const [presetId, setPresetId] = useState(defaultPreset)
  const [qty, setQty] = useState<QtyMap>(() => initialQty(defaultPreset))
  const [finishId, setFinishId] = useState(defaultFinish)
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [state, formAction, pending] = useActionState(submitContact, formInitial)

  const result = useMemo(
    () => estimate({ rooms: roomRates.map((r) => ({ roomId: r.id, qty: qty[r.id] || 0 })), finishId }),
    [qty, finishId],
  )

  const choosePreset = (id: string) => {
    setPresetId(id)
    setQty(initialQty(id))
  }
  const bump = (id: string, delta: number, max: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(max, (q[id] || 0) + delta)) }))

  // Estimate summary attached to the lead (read by the Phase-0 action's message).
  const summary = useMemo(() => {
    const lines = result.lines.map((l) => `• ${l.name} x${l.qty}: ${priceLabel(l.range)}`).join('\n')
    return [
      `Interior cost estimate (${result.finish.name} finish):`,
      `Estimated range: ${result.label}`,
      `Indicative EMI: ${formatINR(result.emiPerMonth)}/month`,
      '',
      lines,
      '',
      phone ? `Phone: ${phone}` : null,
      note ? `Note: ${note}` : null,
    ]
      .filter((x) => x !== null)
      .join('\n')
  }, [result, phone, note])

  return (
    <div className="overflow-hidden rounded-3xl border border-divider bg-white shadow-form">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        {/* Inputs */}
        <div className="border-b border-divider p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="eyebrow">Instant Estimate</p>
          <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Calculate your interior cost</h2>

          {/* BHK preset */}
          <div className="mt-6">
            <p className="font-caps text-xs uppercase tracking-wide2 text-muted">Home type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {bhkPresets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => choosePreset(p.id)}
                  aria-pressed={presetId === p.id}
                  className={`rounded-full px-4 py-2 font-caps text-sm tracking-caps transition-colors ${
                    presetId === p.id
                      ? 'bg-accent text-white'
                      : 'border border-divider bg-white text-ink hover:border-accent'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="mt-6">
            <p className="font-caps text-xs uppercase tracking-wide2 text-muted">Rooms &amp; units</p>
            <ul className="mt-3 divide-y divide-divider">
              {roomRates.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-ink">{r.name}</p>
                    <p className="text-xs text-muted">
                      {formatINR(r.base.min)}–{formatINR(r.base.max)}
                      {r.unitLabel ? ` / ${r.unitLabel}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${r.name}`}
                      onClick={() => bump(r.id, -1, r.maxQty)}
                      disabled={(qty[r.id] || 0) === 0}
                      className="grid h-8 w-8 place-items-center rounded-full border border-divider text-ink disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold tabular-nums">
                      {qty[r.id] || 0}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${r.name}`}
                      onClick={() => bump(r.id, 1, r.maxQty)}
                      disabled={(qty[r.id] || 0) >= r.maxQty}
                      className="grid h-8 w-8 place-items-center rounded-full border border-divider text-ink disabled:opacity-40"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Finish */}
          <div className="mt-6">
            <p className="font-caps text-xs uppercase tracking-wide2 text-muted">Finish</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {finishTiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFinishId(t.id)}
                  aria-pressed={finishId === t.id}
                  title={t.blurb}
                  className={`rounded-full px-4 py-2 font-caps text-sm tracking-caps transition-colors ${
                    finishId === t.id
                      ? 'bg-ink text-white'
                      : 'border border-divider bg-white text-ink hover:border-ink'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output + lead capture */}
        <div className="bg-accent p-6 text-white sm:p-8">
          {state.ok ? (
            <div role="status" className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <CheckCircle2 size={40} aria-hidden="true" />
              <p className="font-serif text-xl">Estimate sent!</p>
              <p className="text-sm text-white/85">{state.message}</p>
              {state.whatsappUrl && (
                <a
                  href={state.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill mt-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
                >
                  <MessageCircle size={16} aria-hidden="true" /> Continue on WhatsApp
                </a>
              )}
            </div>
          ) : (
            <>
              <p className="font-caps text-xs uppercase tracking-wide2 text-white/90">
                Your estimated range
              </p>
              <p className="mt-2 font-serif text-4xl font-bold leading-none sm:text-5xl">
                {result.range.min > 0 ? result.label : '—'}
              </p>
              <p className="mt-2 text-sm text-white/80">
                {result.finish.name} finish · indicative EMI from{' '}
                <strong>{formatINR(result.emiPerMonth)}/mo{PRICING_INDICATIVE ? '*' : ''}</strong>
              </p>

              {/* breakdown */}
              {result.lines.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-white/20 pt-4 text-sm text-white/85">
                  {result.lines.map((l) => (
                    <li key={l.id} className="flex justify-between gap-3">
                      <span>
                        {l.name}
                        {l.qty > 1 ? ` ×${l.qty}` : ''}
                      </span>
                      <span className="tabular-nums">{priceLabel(l.range)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {PRICING_INDICATIVE && <p className="mt-3 text-[11px] text-white/90">{PRICING_FOOTNOTE}</p>}

              {/* Lead capture → Phase-0 Server Action */}
              <form action={formAction} className="mt-6 space-y-3 border-t border-white/20 pt-5">
                <p className="font-serif text-lg">Get your exact quote</p>
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <input type="hidden" name="subject" value={`Interior cost estimate ${result.label}`} readOnly />
                <input type="hidden" name="message" value={summary} readOnly />
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!state.errors?.name}
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/60 outline-none focus:border-white"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={!!state.errors?.email}
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/60 outline-none focus:border-white"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone (optional)"
                  autoComplete="tel"
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/60 outline-none focus:border-white"
                />
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Anything specific? (optional)"
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/60 outline-none focus:border-white"
                />
                {(state.errors?.name || state.errors?.email) && (
                  <p className="text-xs text-amber-200">
                    {state.errors?.name || state.errors?.email}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="btn-pill w-full justify-center bg-white font-bold text-accent hover:bg-white/90 disabled:opacity-70"
                >
                  {pending ? 'Sending…' : 'Get Exact Quote'} <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
