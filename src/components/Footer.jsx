'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music2,
  MessageCircle,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { SOCIALS, CONTACT } from '../data/content.js'
import { footerColumns, routes } from '@/lib/routes'
import { awards, certifications, NEWSLETTER_ENABLED } from '@/data/credentials'

const ICONS = { Facebook, Instagram, Youtube, Twitter, Music2, MessageCircle }

/**
 * LUXURY FOOTER
 * =============
 * Deep olive ground, gold hairlines, editorial serif. Opens with an invitation
 * (a full-width closing statement) rather than dumping a link farm on you — the
 * links follow underneath, quiet and well-tracked.
 *
 * Awards / certificates / newsletter render ONLY when real content exists
 * (src/data/credentials.ts). They are empty today, so those blocks are absent
 * rather than filled with plausible-looking fiction.
 *
 * Every link is a real <Link> from the route registry — no "#" anywhere.
 */
// One variant, reused by every footer element. Transform+opacity only.
const fItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Footer() {
  const reduce = useReducedMotion()
  return (
    <footer className="bg-olive-deep text-white">
      {/* ── Closing invitation ───────────────────────────────────────────── */}
      <div className="shell border-b border-white/10 py-section-sm">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-caps text-[10px] uppercase tracking-wide4 text-gold">
              Begin your project
            </p>
            <h2 className="mt-6 font-serif text-headline font-light leading-[1.05] text-white">
              Every home we finish began with a conversation.
            </h2>
          </div>
          <Link href={routes.getQuote} className="btn-pill btn-gold shrink-0">
            Start Design Journey
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Links ────────────────────────────────────────────────────────── */}
      <div className="shell py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href={routes.home}>
              <Logo dark={false} />
              <span className="sr-only">— home</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/72">
              Complete interiors, designed and executed under one roof.
              <br />
              Chennai · Tamil Nadu.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 text-white/75 transition-colors hover:text-gold"
              >
                <Phone size={14} aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 text-white/75 transition-colors hover:text-gold"
              >
                <Mail size={14} aria-hidden="true" /> {CONTACT.email}
              </a>
            </div>
          </div>

          {/* The columns deal themselves in, one after another, and each link
              inside them cascades. A footer is the last thing a visitor sees; it
              should not be the one part of the site that just appears. */}
          {footerColumns.map((col, ci) => (
            <motion.nav
              key={col.heading}
              aria-label={col.heading}
              initial={reduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                visible: { transition: { staggerChildren: 0.035, delayChildren: ci * 0.07 } },
              }}
            >
              {/* h2 (not h3): footer columns must not skip a level from a page
                  whose main content has only an h1 (heading-order / WCAG). */}
              <motion.h2
                variants={fItem}
                className="font-caps text-[10px] uppercase tracking-wide4 text-white/60"
              >
                {col.heading}
              </motion.h2>
              <motion.span
                variants={fItem}
                aria-hidden="true"
                className="mt-3 block h-px w-6 bg-gold/60"
              />
              <ul className="mt-6 space-y-2 text-sm">
                {col.links.map((link) => (
                  <motion.li key={link.href} variants={fItem}>
                    {/* Slides a hair toward the reader on hover — the smallest
                        possible acknowledgement, applied to 60+ links. */}
                    <Link
                      href={link.href}
                      className="inline-block text-white/72 transition-[color,transform] duration-500 ease-lux hover:translate-x-1 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* ── Newsletter — renders only when there is somewhere to send to. */}
        {NEWSLETTER_ENABLED && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="font-caps text-[10px] uppercase tracking-wide4 text-white/60">
              The RGL Letter
            </p>
            <p className="mt-3 max-w-md text-sm text-white/72">
              Occasional notes on materials, craft and finished homes. No noise.
            </p>
          </div>
        )}

        {/* ── Awards & certifications — absent until verifiable. ─────────── */}
        {(awards.length > 0 || certifications.length > 0) && (
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
            {awards.length > 0 && (
              <div>
                <h2 className="font-caps text-[10px] uppercase tracking-wide4 text-white/60">
                  Recognition
                </h2>
                <ul className="mt-6 space-y-3">
                  {awards.map((a) => (
                    <li key={`${a.title}-${a.year}`} className="text-sm text-white/70">
                      <span className="font-serif text-base text-white">{a.title}</span>
                      <span className="text-white/60">
                        {' '}
                        · {a.issuer}, {a.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="font-caps text-[10px] uppercase tracking-wide4 text-white/60">
                  Certifications
                </h2>
                <ul className="mt-6 space-y-3">
                  {certifications.map((c) => (
                    <li key={c.name} className="text-sm text-white/70">
                      <span className="font-serif text-base text-white">{c.name}</span>
                      <span className="text-white/60"> · {c.issuer}</span>
                      {c.ref && <span className="text-white/60"> · {c.ref}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} RGL Décors Home Interiors · Interior Designers in Chennai,
            Tamil Nadu.
          </p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon]
              if (!Icon) return null
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="lux-icon text-white/60 transition-colors hover:text-gold"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
