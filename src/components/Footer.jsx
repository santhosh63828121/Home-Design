'use client'

import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music2,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { SOCIALS, CONTACT } from '../data/content.js'
import { footerColumns, routes } from '@/lib/routes'

const ICONS = { Facebook, Instagram, Youtube, Twitter, Music2, MessageCircle }

/**
 * Site footer — every link is a real <Link> (no "#"); the location column is a
 * real linked city list (replaces the old keyword-stuffed plain text).
 */
export default function Footer() {
  return (
    <footer className="bg-ink pt-[60px] pb-[30px] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={routes.home} aria-label="RGL Decors — home">
              <Logo dark={false} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Complete interiors solution for your dream home.
              <br />
              One place · Any budget.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/80">
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone size={15} aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className="flex items-center gap-2 hover:text-white">
                <Mail size={15} aria-hidden="true" /> {CONTACT.email}
              </a>
            </div>
            <Link
              href={routes.getQuote}
              className="btn-pill mt-6 bg-accent text-white hover:bg-accent-dark"
            >
              Get Free Quote <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Link columns (services / company / locations / legal) */}
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              {/* h2 (not h3): footer columns must not skip a level from a page
                  that has only an h1 in its main content (heading-order / WCAG). */}
              <h2 className="font-caps text-xs uppercase tracking-wide2 text-white/50">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} RGL Decors · RGL Décors Home Interiors. Best Interior
            Designers in Chennai, Tamil Nadu.
          </p>
          <div className="flex items-center gap-4">
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
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
