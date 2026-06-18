import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Heading } from './ui/Typography.jsx'
import { fadeUp, slideLeft, staggerContainer, viewportOnce } from '../animations/variants.js'
import { CONTACT, SERVING_AREAS } from '../data/content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

/**
 * Section 8 — contact.
 * Left: heading + detail list + map/WhatsApp CTAs (fades up).
 * Right: forest-green form card with client-side validation (slides in).
 */
export default function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (!values.message.trim()) next.message = 'Please write a short message.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // In production this would POST to an API / CRM endpoint.
      setSent(true)
      setValues({ name: '', email: '', subject: '', message: '' })
    }
  }

  const details = [
    {
      icon: MapPin,
      title: CONTACT.location,
      sub: `Serving: ${SERVING_AREAS}`,
    },
    { icon: Phone, title: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, title: CONTACT.email, href: CONTACT.emailHref },
    { icon: Clock, title: CONTACT.hours },
    { icon: Globe, title: CONTACT.website, href: `https://${CONTACT.website}` },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-background py-20 sm:py-[100px]"
    >
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
            We're Chennai's most trusted interior designers. 500+ happy families served across
            Tamil Nadu. Let's build your dream home — one room at a time.
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

        {/* Right column — form card */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-2xl bg-accent p-8 text-white shadow-form sm:p-10"
        >
          <h3 className="font-serif text-2xl">Get In Touch</h3>

          {sent ? (
            <div
              role="status"
              className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-white/10 p-8 text-center"
            >
              <CheckCircle2 size={40} aria-hidden="true" />
              <p className="font-serif text-xl">Thank you!</p>
              <p className="text-sm text-white/80">
                We've received your message and will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
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
                    value={values[field.name]}
                    onChange={update}
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
                  value={values.message}
                  onChange={update}
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
                className="btn-pill w-full justify-center bg-white font-bold text-accent hover:bg-white/90"
              >
                SEND MESSAGE <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
