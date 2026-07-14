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
 * THE ESTIMATOR — a bench, not a pricing widget.
 * ============================================================================
 * Left: the levers (home type · rooms · finish) as ruled rows, so choosing is an
 * act of composition rather than filling in a form. Right: a deep-olive panel
 * where the number lives — the one place on the page that goes dark, because a
 * figure this consequential deserves the weight.
 *
 * Colour is measured, not chosen: on `olive-deep` the range is set in GOLD
 * (5.67:1 ✓) and every supporting line is white/70 or lighter — white/60 is the
 * documented floor. Gold is never used as text on the white side of this panel.
 *
 * UNCHANGED — and deliberately so: every input `name`, the honeypot, the two
 * hidden fields carrying the subject + itemised summary, `useActionState`, and
 * the `submitContact` Server Action. This is live lead capture; only its clothes
 * changed. The estimate remains a RANGE with the indicative footnote attached —
 * never a hard number.
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

  const chip = (active: boolean) =>
    `rounded-full px-6 py-2 font-caps text-[11px] uppercase tracking-wide2 transition-colors duration-500 ${
      active
        ? 'bg-accent text-white'
        : 'border border-divider bg-white text-ink/70 hover:border-accent hover:text-ink'
    }`

  const stepper =
    'grid h-9 w-9 place-items-center rounded-full border border-divider text-ink transition-colors duration-500 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30'

  const darkField =
    'w-full border-b border-white/25 bg-transparent py-2 text-sm text-white placeholder-white/60 outline-none transition-colors focus:border-gold'

  return (
    <div className="grid border border-divider bg-white lg:grid-cols-[1.25fr_1fr]">
      {/* ── The levers ─────────────────────────────────────────────────────── */}
      <div className="border-b border-divider p-8 sm:p-10 lg:border-b-0 lg:border-r">
        <p className="eyebrow">Instant estimate</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2 className="mt-8 max-w-[14ch] font-serif text-title font-light text-ink">
          Compose your <span className="italic text-accent">scope</span>
        </h2>

        {/* Home type */}
        <div className="mt-8">
          <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">Home type</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {bhkPresets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choosePreset(p.id)}
                aria-pressed={presetId === p.id}
                className={chip(presetId === p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms & units */}
        <div className="mt-10">
          <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">Rooms &amp; units</p>
          <ul className="mt-2">
            {roomRates.map((r) => {
              const n = qty[r.id] || 0
              return (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-4 border-b border-divider py-4"
                >
                  <div className="min-w-0">
                    <p className={`text-sm ${n > 0 ? 'text-ink' : 'text-ink/60'}`}>{r.name}</p>
                    <p className="mt-0.5 text-xs tabular-nums text-muted">
                      {formatINR(r.base.min)}–{formatINR(r.base.max)}
                      {r.unitLabel ? ` / ${r.unitLabel}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${r.name}`}
                      onClick={() => bump(r.id, -1, r.maxQty)}
                      disabled={n === 0}
                      className={stepper}
                    >
                      <Minus size={13} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                    <span
                      className={`w-5 text-center font-caps text-sm tabular-nums ${
                        n > 0 ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {n}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${r.name}`}
                      onClick={() => bump(r.id, 1, r.maxQty)}
                      disabled={n >= r.maxQty}
                      className={stepper}
                    >
                      <Plus size={13} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Finish — the single biggest lever on the number */}
        <div className="mt-10">
          <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">Finish</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {finishTiers.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFinishId(t.id)}
                aria-pressed={finishId === t.id}
                title={t.blurb}
                className={chip(finishId === t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-prose2 text-xs leading-relaxed text-muted">
            {finishTiers.find((t) => t.id === finishId)?.blurb}
          </p>
        </div>
      </div>

      {/* ── The number ─────────────────────────────────────────────────────── */}
      <div className="bg-olive-deep p-8 text-white sm:p-10">
        {state.ok ? (
          <div role="status" className="flex h-full flex-col items-start justify-center gap-4">
            <CheckCircle2 size={32} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
            <p className="font-serif text-title font-light">Estimate sent</p>
            <p className="max-w-prose2 text-sm leading-relaxed text-white/70">{state.message}</p>
            {state.whatsappUrl && (
              <a
                href={state.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill mt-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
              >
                <MessageCircle size={15} aria-hidden="true" /> Continue on WhatsApp
              </a>
            )}
          </div>
        ) : (
          <>
            <p className="font-caps text-[10px] uppercase tracking-wide2 text-gold">
              Your estimated range
            </p>

            <p className="mt-6 font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] font-light leading-[1.05] text-white">
              {result.range.min > 0 ? result.label : '—'}
            </p>

            <p className="mt-4 text-sm text-white/70">
              {result.finish.name} finish · indicative EMI from{' '}
              <span className="text-white">
                {formatINR(result.emiPerMonth)}/mo{PRICING_INDICATIVE ? '*' : ''}
              </span>
            </p>

            {/* The itemised breakdown — the range is never a black box. */}
            {result.lines.length > 0 && (
              <ul className="mt-8 border-t border-white/15 pt-6 text-sm">
                {result.lines.map((l) => (
                  <li key={l.id} className="flex justify-between gap-4 py-1.5 text-white/70">
                    <span>
                      {l.name}
                      {l.qty > 1 ? ` ×${l.qty}` : ''}
                    </span>
                    <span className="tabular-nums text-white/85">{priceLabel(l.range)}</span>
                  </li>
                ))}
              </ul>
            )}

            {PRICING_INDICATIVE && (
              <p className="mt-4 text-[11px] leading-relaxed text-white/70">{PRICING_FOOTNOTE}</p>
            )}

            {/* Lead capture → Phase-0 Server Action. Fields UNCHANGED. */}
            <form action={formAction} className="mt-8 space-y-4 border-t border-white/15 pt-8">
              <p className="font-serif text-lg font-light text-white">Turn it into an exact quote</p>

              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input type="hidden" name="subject" value={`Interior cost estimate ${result.label}`} readOnly />
              <input type="hidden" name="message" value={summary} readOnly />

              <input
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!state.errors?.name}
                className={darkField}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                aria-invalid={!!state.errors?.email}
                className={darkField}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone (optional)"
                autoComplete="tel"
                className={darkField}
              />
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Anything specific? (optional)"
                className={darkField}
              />

              {(state.errors?.name || state.errors?.email) && (
                <p className="text-xs text-gold">{state.errors?.name || state.errors?.email}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="btn-pill btn-gold w-full justify-center disabled:opacity-70"
              >
                {pending ? 'Sending…' : 'Get an exact quote'}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
