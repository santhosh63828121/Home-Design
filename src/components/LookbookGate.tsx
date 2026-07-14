'use client'

import { useActionState } from 'react'
import { BookOpen, Download, CheckCircle2 } from 'lucide-react'
import { submitLookbook, type LookbookState } from '@/app/actions/lookbook'
import { LOOKBOOK } from '@/data/lookbook'

const initial: LookbookState = { ok: false }

/**
 * Email-gated lookbook (doc §7.4). Honest while the PDF is pending: it captures
 * the email as a lead and promises to send it "when ready" — no fake download.
 * Once LOOKBOOK.available is true, the same form returns the real download link.
 */
export default function LookbookGate() {
  const [state, formAction, pending] = useActionState(submitLookbook, initial)

  return (
    <section className="overflow-hidden rounded-2xl border border-divider bg-white shadow-card sm:grid sm:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-center gap-3 bg-ink p-8 text-white sm:p-10">
        <BookOpen size={28} className="text-gold" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-medium">{LOOKBOOK.title}</h2>
        <p className="text-sm text-white/80">{LOOKBOOK.blurb}</p>
        {!LOOKBOOK.available && (
          <p className="text-xs text-white/55">Publishing soon — leave your email and we’ll send it first.</p>
        )}
      </div>

      <div className="p-8 sm:p-10">
        {state.ok ? (
          <div className="flex h-full flex-col items-start justify-center gap-3">
            <CheckCircle2 size={32} className="text-accent" aria-hidden="true" />
            <p className="text-ink/80">{state.message}</p>
            {state.url && (
              <a href={state.url} className="btn-pill btn-gold" download>
                <Download size={16} aria-hidden="true" /> Download the lookbook
              </a>
            )}
          </div>
        ) : (
          <form action={formAction} className="flex h-full flex-col justify-center gap-3">
            <label htmlFor="lookbook-email" className="text-sm font-medium text-ink">
              {LOOKBOOK.available ? 'Get the lookbook' : 'Get notified when it’s ready'}
            </label>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <input
              id="lookbook-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              aria-invalid={!!state.error}
              className="w-full rounded-xl border border-divider bg-white px-4 py-3 text-ink outline-none transition-colors placeholder-muted focus:border-accent"
            />
            {state.error && <p className="text-xs text-amber-700">{state.error}</p>}
            <button type="submit" disabled={pending} className="btn-pill btn-gold justify-center disabled:opacity-70">
              {pending ? 'Sending…' : LOOKBOOK.available ? 'Send me the lookbook' : 'Notify me'}
            </button>
            <p className="text-xs text-muted">No spam — just the lookbook and the occasional update.</p>
          </form>
        )}
      </div>
    </section>
  )
}
