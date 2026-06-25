'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Heading } from './ui/Typography.jsx'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'
import { CONTACT, SERVING_AREAS } from '../data/content.js'
import { submitContact } from '@/app/actions/contact'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

const initialState = { ok: false }

/**
 * Section 8 — contact.
 * Left: heading + detail list + map/WhatsApp CTAs.
 * Right: forest-green form card posting to a Zod-validated Server Action
 * (progressive enhancement via useActionState; honeypot spam protection).
 */
export default function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)
  const errors = state.errors || {}

  const details = [
    { icon: MapPin, title: CONTACT.location, sub: `Serving: ${SERVING_AREAS}` },
    { icon: Phone, title: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, title: CONTACT.email, href: CONTACT.emailHref },
    { icon: Clock, title: CONTACT.hours },
    { icon: Globe, title: CONTACT.website, href: `https://${CONTACT.website}` },
  ]

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-background py-20 sm:py-[100px]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[55fr_45fr] lg:gap-16 lg:px-12">
        {/* Left column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <Heading id="contact-heading" className="text-4xl sm:text-5xl">
              Come See It
              <br />
              For Yourself.
            </Heading>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-ink/75">
            We&apos;re Chennai&apos;s most trusted interior designers. 500+ happy families served across
            Tamil Nadu. Let&apos;s build your dream home — one room at a time.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-10 space-y-6">
            {details.map((d) => {
              const Icon = d.icon
              return (
                <li key={d.title} className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    {d.href ? (
                      <a href={d.href} className="font-medium text-ink hover:text-accent">
                        {d.title}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{d.title}</p>
                    )}
                    {d.sub && <p className="mt-1 text-sm text-muted">{d.sub}</p>}
                  </div>
                </li>
              )
            })}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white"
            >
              GET DIRECTIONS ON MAPS <span aria-hidden="true">→</span>
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-[#25D366] text-white hover:bg-[#1ebe57]"
            >
              <MessageCircle size={16} aria-hidden="true" /> CHAT ON WHATSAPP
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — form card. fadeUp (vertical) not slideLeft: a horizontal
            reveal offset overflows the viewport on narrow screens (≤375px) while
            the card sits in its translated hidden state. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-2xl bg-accent p-8 text-white shadow-form sm:p-10"
        >
          <h3 className="font-serif text-2xl">Get In Touch</h3>

          {state.ok ? (
            <div
              role="status"
              className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-white/10 p-8 text-center"
            >
              <CheckCircle2 size={40} aria-hidden="true" />
              <p className="font-serif text-xl">Thank you!</p>
              <p className="text-sm text-white/80">{state.message}</p>
              {state.whatsappUrl && (
                <a
                  href={state.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill mt-3 bg-[#25D366] text-white hover:bg-[#1ebe57]"
                >
                  <MessageCircle size={16} aria-hidden="true" /> CONTINUE ON WHATSAPP
                </a>
              )}
            </div>
          ) : (
            <form action={formAction} className="mt-8 space-y-6">
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {FIELDS.map((field) => (
                <div key={field.name}>
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
                    className="w-full border-b border-white/40 bg-transparent py-3 text-white placeholder-white/60 outline-none transition-colors focus:border-white"
                  />
                  {errors[field.name] && (
                    <p id={`${field.name}-error`} className="mt-1 text-xs text-amber-200">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full resize-none border-b border-white/40 bg-transparent py-3 text-white placeholder-white/60 outline-none transition-colors focus:border-white"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-amber-200">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn-pill w-full justify-center bg-white font-bold text-accent hover:bg-white/90 disabled:opacity-70"
              >
                {pending ? 'SENDING…' : 'SEND MESSAGE'} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
