'use client'

import { useActionState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { CONTACT, SERVING_AREAS } from '../data/content.js'
import { submitContact } from '@/app/actions/contact'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

const initialState = { ok: false }

/**
 * THE CONSULTATION — the last thing on the page, and the only dark thing.
 * ============================================================================
 * Left: how to reach us, as a ruled list of facts. Right: a single deep-olive
 * panel carrying the form. The panel is the only dark surface in the section, so
 * the eye lands on it without a shadow, a badge or an exclamation mark being
 * involved.
 *
 * Colour is measured: on `olive-deep`, the eyebrow is GOLD (5.67:1 ✓), body text
 * is white/70, and the submit button is `.btn-gold` — gold fill with INK text
 * (7.46:1), never white text (2.33:1, unreadable). Field rules are white/25 and
 * go gold on focus, which is the only "state colour" in the whole form.
 *
 * HONESTY: the old copy here claimed "Chennai's most trusted interior designers"
 * and "500+ happy families" — a superlative and a figure that contradicted our
 * own published stats (150+ homes). Both are gone. What replaces them is only
 * what we can stand behind.
 *
 * UNCHANGED: FIELDS (name · email · subject), the message textarea, the honeypot,
 * `useActionState`, the `submitContact` Server Action, the error/aria wiring and
 * the WhatsApp continuation on success. Presentation only.
 */
export default function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)
  const reduce = useReducedMotion()
  const errors = state.errors || {}

  const details = [
    { icon: MapPin, title: CONTACT.location, sub: `Serving: ${SERVING_AREAS}` },
    { icon: Phone, title: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, title: CONTACT.email, href: CONTACT.emailHref },
    { icon: Clock, title: CONTACT.hours },
    { icon: Globe, title: CONTACT.website, href: `https://${CONTACT.website}` },
  ]

  const darkField =
    'w-full border-b border-white/25 bg-transparent py-3 text-white placeholder-white/60 outline-none transition-colors focus:border-gold'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y bg-bone">
      <div className="shell grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        {/* ── Left: the facts ─────────────────────────────────────────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Book a consultation</p>
          <span aria-hidden="true" className="rule-gold mt-6" />

          <h2
            id="contact-heading"
            className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
          >
            Come see it <span className="italic text-accent">for yourself</span>
          </h2>

          <p className="mt-8 max-w-prose2 text-pretty leading-relaxed text-ink/70">
            Design, manufacture and installation under one roof — from an empty shell to the day you
            move in. Tell us about the space and we will show you what it could become, in 3D, before
            anything is built.
          </p>

          <ul className="mt-12 border-t border-divider">
            {details.map((d) => {
              const Icon = d.icon
              return (
                <li key={d.title} className="flex items-start gap-6 border-b border-divider py-6">
                  <Icon
                    size={18}
                    strokeWidth={1.25}
                    className="mt-1 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    {d.href ? (
                      <a href={d.href} className="lux-underline text-ink transition-colors duration-500 hover:text-accent">
                        {d.title}
                      </a>
                    ) : (
                      <p className="text-ink">{d.title}</p>
                    )}
                    {d.sub && <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.sub}</p>}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-[#25D366] text-white hover:bg-[#1ebe57]"
            >
              <MessageCircle size={15} aria-hidden="true" /> Chat on WhatsApp
            </a>
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-underline inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
            >
              Get directions
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* ── Right: the form. Vertical reveal only — a horizontal one would
               translate the panel off-axis and overflow at 375px. ─────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="bg-olive-deep p-8 sm:p-12"
        >
          <p className="font-caps text-[10px] uppercase tracking-wide4 text-gold">Enquiry</p>
          <span aria-hidden="true" className="mt-6 block h-px w-16 bg-gold" />
          <h3 className="mt-8 font-serif text-title font-light text-white">Get in touch</h3>

          {state.ok ? (
            <div role="status" className="mt-10 border-t border-white/15 pt-10">
              <CheckCircle2 size={32} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
              <p className="mt-6 font-serif text-title font-light text-white">Thank you</p>
              <p className="mt-3 max-w-prose2 text-sm leading-relaxed text-white/70">
                {state.message}
              </p>
              {state.whatsappUrl && (
                <a
                  href={state.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill mt-8 bg-[#25D366] text-white hover:bg-[#1ebe57]"
                >
                  <MessageCircle size={15} aria-hidden="true" /> Continue on WhatsApp
                </a>
              )}
            </div>
          ) : (
            <form action={formAction} className="mt-10 space-y-8 border-t border-white/15 pt-10">
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {/* The fields deal themselves in, one line at a time. Purely
                  presentational — every `name`, `type`, `autoComplete` and the
                  aria-invalid / aria-describedby error wiring is untouched, and
                  the form still posts to the same Zod-validated Server Action. */}
              {FIELDS.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.08,
                  }}
                >
                  <label htmlFor={field.name} className="sr-only">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.label}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    className={darkField}
                  />
                  {errors[field.name] && (
                    <p id={`${field.name}-error`} className="mt-2 text-xs text-gold">
                      {errors[field.name]}
                    </p>
                  )}
                </motion.div>
              ))}

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your space"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${darkField} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-xs text-gold">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn-pill btn-gold w-full justify-center disabled:opacity-70"
              >
                {pending ? 'Sending…' : 'Send message'}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>

              <p className="text-xs leading-relaxed text-white/60">
                No obligation, and no follow-up you did not ask for. We reply within one working day.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
