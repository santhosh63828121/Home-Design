'use client'

import { useActionState, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { submitLead, type LeadState } from '@/app/actions/lead'
import { routes } from '@/lib/routes'

const initial: LeadState = { ok: false }
const STEPS = ['Your project', 'What you need', 'Your details']

const field =
  'w-full rounded-xl border border-divider bg-white px-4 py-3 text-ink outline-none transition-colors placeholder-muted focus:border-accent'

/**
 * 3-step consultation form (doc §4.9). All inputs live in one <form>; inactive
 * steps are display:none, so their values still submit but are barred from
 * native validation — we validate each step on "Next", and the server (Zod,
 * submitLead) re-validates everything. Reduced-motion safe (no transforms).
 */
export default function MultiStepLeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initial)
  const [step, setStep] = useState(0)
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const errs = state.errors ?? {}

  const next = () => {
    const fs = stepRefs[step].current
    if (fs) {
      const inputs = fs.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input[required], textarea[required], select[required]',
      )
      for (const el of inputs) {
        if (!el.checkValidity()) {
          el.reportValidity()
          return
        }
      }
    }
    setStep((s) => Math.min(2, s + 1))
  }

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-divider bg-white p-8 text-center shadow-card sm:p-10">
        <CheckCircle2 size={44} className="mx-auto text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl">Thank you!</h3>
        <p className="mx-auto mt-2 max-w-md text-ink/75">{state.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {state.whatsappUrl && (
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-[#25D366] text-white hover:bg-[#1ebe57]"
            >
              <MessageCircle size={16} aria-hidden="true" /> Continue on WhatsApp
            </a>
          )}
          <Link href={routes.portfolio} className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white">
            Explore our work
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="rounded-2xl border border-divider bg-white p-6 shadow-card sm:p-8">
      {/* Progress */}
      <ol className="mb-6 flex items-center gap-2" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-caps text-xs font-bold ${
                i <= step ? 'bg-teal text-white' : 'bg-background text-muted'
              }`}
              aria-current={i === step ? 'step' : undefined}
            >
              {i + 1}
            </span>
            <span className={`hidden text-sm sm:inline ${i === step ? 'font-medium text-ink' : 'text-muted'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-divider" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {/* Step 1 — project */}
      <div ref={stepRefs[0]} className={step === 0 ? 'space-y-4' : 'hidden'}>
        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-ink">
            Project type
          </label>
          <select id="projectType" name="projectType" required defaultValue="" className={field} aria-invalid={!!errs.projectType}>
            <option value="" disabled>
              Select a project type
            </option>
            {['Residential', 'Commercial', 'Villa', 'NRI project', 'Renovation'].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="propertyType" className="mb-1.5 block text-sm font-medium text-ink">
            Property <span className="text-muted">(optional)</span>
          </label>
          <input id="propertyType" name="propertyType" className={field} placeholder="e.g. 2BHK apartment, villa, office" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-ink">
              Area / locality <span className="text-muted">(optional)</span>
            </label>
            <input id="location" name="location" className={field} placeholder="e.g. OMR, Anna Nagar" />
          </div>
          <div>
            <label htmlFor="areaSqft" className="mb-1.5 block text-sm font-medium text-ink">
              Approx. area, sq.ft <span className="text-muted">(optional)</span>
            </label>
            <input id="areaSqft" name="areaSqft" inputMode="numeric" className={field} placeholder="e.g. 1200" />
          </div>
        </div>
      </div>

      {/* Step 2 — need */}
      <div ref={stepRefs[1]} className={step === 1 ? 'space-y-4' : 'hidden'}>
        <div>
          <label htmlFor="scope" className="mb-1.5 block text-sm font-medium text-ink">
            What do you need?
          </label>
          <textarea
            id="scope"
            name="scope"
            required
            rows={3}
            className={`${field} resize-none`}
            placeholder="e.g. full-home interiors, a modular kitchen and two wardrobes…"
            aria-invalid={!!errs.scope}
          />
          {errs.scope && <p className="mt-1 text-xs text-amber-700">{errs.scope}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink">
              Budget band <span className="text-muted">(optional)</span>
            </label>
            <select id="budget" name="budget" defaultValue="" className={field}>
              <option value="">Select a range</option>
              {['₹5–15L', '₹15–30L', '₹30–60L', '₹60L+', 'Not sure yet'].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="requirementDate" className="mb-1.5 block text-sm font-medium text-ink">
              When do you need it? <span className="text-muted">(optional)</span>
            </label>
            <select id="requirementDate" name="requirementDate" defaultValue="" className={field}>
              <option value="">Select a timeframe</option>
              {['Within 1 month', '1–3 months', '3–6 months', 'Just exploring'].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="howHeard" className="mb-1.5 block text-sm font-medium text-ink">
            How did you hear about us? <span className="text-muted">(optional)</span>
          </label>
          <select id="howHeard" name="howHeard" defaultValue="" className={field}>
            <option value="">Select one</option>
            {['Google', 'Instagram', 'Referral', 'Passed by the studio', 'Other'].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 3 — contact */}
      <div ref={stepRefs[2]} className={step === 2 ? 'space-y-4' : 'hidden'}>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} aria-invalid={!!errs.name} />
          {errs.name && <p className="mt-1 text-xs text-amber-700">{errs.name}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-ink">
              Mobile
            </label>
            <input id="mobile" name="mobile" type="tel" required autoComplete="tel" className={field} aria-invalid={!!errs.mobile} />
            {errs.mobile && <p className="mt-1 text-xs text-amber-700">{errs.mobile}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={field} aria-invalid={!!errs.email} />
            {errs.email && <p className="mt-1 text-xs text-amber-700">{errs.email}</p>}
          </div>
        </div>
        <p className="text-xs text-muted">
          We’ll only use these to respond to your enquiry — see our{' '}
          <Link href={routes.privacy} className="text-accent hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="btn-pill border border-divider bg-white text-ink hover:border-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="button" onClick={next} className="btn-pill btn-gold">
            Next <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={pending} className="btn-pill btn-gold disabled:opacity-70">
            {pending ? 'Sending…' : 'Book My Consultation'} <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  )
}
