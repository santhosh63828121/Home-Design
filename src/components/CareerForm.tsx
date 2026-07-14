'use client'

import { useActionState } from 'react'
import { CheckCircle2, Paperclip } from 'lucide-react'
import { submitApplication, type CareerState } from '@/app/actions/career'

const initial: CareerState = { ok: false }

/**
 * THE APPLICATION — a letterpress form, not a signup box.
 * ============================================================================
 * Fields are underlined, not boxed: a rule under a line of text is how a form
 * looks when it belongs to a design studio rather than a CRM. The card border is
 * a single hairline; elevation is earned nowhere, because a form should sit
 * calmly on the page.
 *
 * NOTHING FUNCTIONAL CHANGED. Every `name` (name · email · phone · location ·
 * role · experience · currentCompany · expectedSalary · noticePeriod ·
 * availability · linkedin · skills · resume · portfolio · message), the honeypot,
 * the `required` set, the `accept` list, `encType`, `useActionState` and the
 * `submitApplication` Server Action are byte-for-byte what they were. This is a
 * live hiring pipeline; only its typography moved.
 */

const field =
  'w-full border-b border-divider bg-transparent py-2 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent'
const labelCls = 'font-caps text-[10px] uppercase tracking-wide2 text-muted'
const fileField =
  'w-full border-b border-divider bg-transparent py-2 text-sm text-ink/70 outline-none file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-divider file:bg-white file:px-4 file:py-1.5 file:font-caps file:text-[10px] file:uppercase file:tracking-wide2 file:text-accent hover:file:border-accent'

/** A required marker that is a colour AND a glyph — never colour alone. */
const Req = () => (
  <span className="text-gold-ink" aria-hidden="true">
    {' '}
    *
  </span>
)

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={`c-${name}`} className={labelCls}>
        {label}
        {required && <Req />}
      </label>
      <input
        id={`c-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={field}
      />
    </div>
  )
}

export default function CareerForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initial)

  if (state.ok) {
    return (
      <div className="border border-divider bg-white p-10 sm:p-14">
        <CheckCircle2 size={32} strokeWidth={1.25} className="text-accent" aria-hidden="true" />
        <h3 className="mt-6 font-serif text-title font-light text-ink">Application received</h3>
        <p className="mt-4 max-w-prose2 leading-relaxed text-ink/70">{state.message}</p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="border border-divider bg-white p-8 sm:p-12"
    >
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Location" name="location" required placeholder="Chennai" />
        <Field label="Role you're applying for" name="role" required placeholder="Interior Designer" />
        <Field label="Years of experience" name="experience" required placeholder="e.g. 4 years" />
        <Field label="Current company" name="currentCompany" placeholder="Optional" />
        <Field label="Expected salary" name="expectedSalary" placeholder="e.g. ₹6–8 LPA" />
        <Field label="Notice period" name="noticePeriod" placeholder="e.g. 30 days" />
        <Field label="Availability" name="availability" placeholder="e.g. Immediate" />
      </div>

      <div className="mt-8">
        <Field label="LinkedIn profile" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
      </div>

      <div className="mt-8 space-y-2">
        <label htmlFor="c-skills" className={labelCls}>
          Key skills
          <Req />
        </label>
        <textarea
          id="c-skills"
          name="skills"
          required
          rows={3}
          placeholder="AutoCAD, SketchUp, 3ds Max, site supervision, BOQ…"
          className={`${field} resize-none`}
        />
      </div>

      <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="c-resume" className={labelCls}>
            Résumé
            <Req />
          </label>
          <input
            id="c-resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            className={fileField}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="c-portfolio" className={labelCls}>
            Portfolio <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="c-portfolio"
            name="portfolio"
            type="file"
            accept=".pdf,.doc,.docx"
            className={fileField}
          />
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <label htmlFor="c-message" className={labelCls}>
          Anything else you&apos;d like us to know
        </label>
        <textarea id="c-message" name="message" rows={4} className={`${field} resize-none`} />
      </div>

      <p className="mt-8 flex items-start gap-2 text-xs text-muted">
        <Paperclip size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
        PDF or Word, up to 5 MB per file. Fields marked * are required.
      </p>

      {state.error && <p className="mt-4 text-sm text-gold-ink">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="btn-pill btn-gold mt-10 justify-center disabled:opacity-70"
      >
        {pending ? 'Sending…' : 'Submit application'}
      </button>
    </form>
  )
}
