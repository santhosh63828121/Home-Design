'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { CONTACT } from '../data/content.js'
import { mainNav, megaMenus, routes } from '@/lib/routes'

/**
 * LUXURY NAVBAR
 * =============
 * A thin, full-width glass bar with a hairline base — deliberately NOT a pill.
 * A floating pill reads "SaaS product"; an architectural hairline bar is what
 * Apple, Foster + Partners and Norm Architects all use, and it lets the
 * photography behind it breathe.
 *
 * Behaviour preserved from the previous nav (all of it load-bearing):
 *   · adaptive colour — glass-over-dark on the home walkthrough, light elsewhere
 *   · direction-aware auto-hide (scroll down = away, scroll up = back)
 *   · mobile menu ARIA wiring (aria-expanded / aria-controls / #mobile-menu)
 *   · body scroll lock while the overlay is open; closes on route change
 *
 * New: a data-driven mega menu (src/lib/routes.ts) with intent-delayed close so
 * it never flickers when the pointer crosses the gap between trigger and panel.
 *
 * PERF: the bar animates on transform + opacity only, so it is composited and
 * never triggers layout. The mega panel is absolutely positioned — opening it
 * cannot shift the page.
 */
export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [overDark, setOverDark] = useState(isHome)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(null) // href of the open mega menu
  const closeTimer = useRef(null)

  useEffect(() => {
    // Any page may declare a dark, full-bleed hero by putting `data-hero-dark`
    // on it; the bar then goes glass-over-dark while that hero is behind it.
    // (Previously this looked up a hardcoded `#walkthrough` id, which silently
    // broke the moment the hero component changed.)
    const darkHero = document.querySelector('[data-hero-dark]')
    let lastY = window.scrollY
    let raf = 0

    const update = () => {
      const y = window.scrollY

      if (darkHero) {
        const rect = darkHero.getBoundingClientRect()
        setOverDark(rect.bottom > 120)
      } else {
        setOverDark(false)
      }

      const delta = y - lastY
      if (y < 120) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      lastY = y
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
    setMega(null)
  }, [pathname])

  // Escape closes whatever is open — keyboard users must never be trapped.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMega(null)
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Intent delay: crossing the 12px gap between the trigger and the panel must
  // not close the menu. 120ms is long enough for a hand, short enough to feel
  // instant.
  const openMega = (href) => {
    clearTimeout(closeTimer.current)
    setMega(megaMenus[href] ? href : null)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMega(null), 120)
  }

  const glass = overDark && !open && !mega
  const linkColor = glass ? 'text-white/80' : 'text-ink/75'

  return (
    <header
      onMouseLeave={scheduleClose}
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-700 ease-lux motion-reduce:transition-none ${
        hidden && !open && !mega ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-700 ${
          glass
            ? 'border-b border-white/10 bg-black/20 backdrop-blur-xl'
            : 'border-b border-divider bg-white/80 backdrop-blur-xl'
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[72px] items-center justify-between lg:h-[84px]"
        >
          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link href={routes.home} className="shrink-0">
            <Logo dark={!glass} />
            <span className="sr-only">— home</span>
          </Link>

          {/* ── Centre navigation ──────────────────────────────────────────── */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
            {mainNav.map((link) => {
              const active = pathname === link.href
              const hasMega = !!megaMenus[link.href]
              return (
                <li key={link.href} onMouseEnter={() => openMega(link.href)}>
                  <Link
                    href={link.href}
                    aria-haspopup={hasMega ? 'true' : undefined}
                    aria-expanded={hasMega ? mega === link.href : undefined}
                    onFocus={() => openMega(link.href)}
                    className={`group relative inline-block whitespace-nowrap font-caps text-[12px] uppercase tracking-wide2 transition-colors duration-500 ${
                      active ? (glass ? 'text-white' : 'text-ink') : linkColor
                    } ${glass ? 'hover:text-white' : 'hover:text-ink'}`}
                  >
                    {link.label}
                    {/* The gold thread: drawn on hover, held open when active. */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100 ${
                        active ? '!origin-left !scale-x-100' : ''
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── Actions ────────────────────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <a
              href={CONTACT.phoneHref}
              aria-label={`Call ${CONTACT.phoneDisplay}`}
              className={`hidden h-11 w-11 place-items-center rounded-full border transition-colors duration-500 xl:grid ${
                glass
                  ? 'border-white/20 text-white hover:border-gold hover:text-gold'
                  : 'border-ink/10 text-ink hover:border-accent hover:text-accent'
              }`}
            >
              <Phone size={16} aria-hidden="true" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className={`hidden h-11 w-11 place-items-center rounded-full border transition-colors duration-500 xl:grid ${
                glass
                  ? 'border-white/20 text-white hover:border-gold hover:text-gold'
                  : 'border-ink/10 text-ink hover:border-accent hover:text-accent'
              }`}
            >
              <MessageCircle size={17} aria-hidden="true" />
            </a>

            <Link
              href={routes.getQuote}
              className="btn-pill btn-gold hidden !py-3 !text-[11px] md:inline-flex"
            >
              Start Design Journey
            </Link>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                open
                  ? 'border-white/20 text-white'
                  : glass
                    ? 'border-white/20 text-white'
                    : 'border-ink/10 text-ink'
              }`}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mega menu ──────────────────────────────────────────────────────
          Absolutely positioned under the bar → opening it can never shift the
          page (CLS 0). Animates clip+opacity+y; no height animation. */}
      <AnimatePresence>
        {mega && megaMenus[mega] && (
          <motion.div
            key={mega}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => clearTimeout(closeTimer.current)}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-divider bg-white/95 backdrop-blur-2xl lg:block"
          >
            <div className="shell grid grid-cols-[repeat(3,minmax(0,1fr))_20rem] gap-s8 py-s12">
              {megaMenus[mega].columns.map((col) => (
                <div key={col.heading}>
                  <h2 className="font-caps text-[10px] uppercase tracking-wide4 text-muted">
                    {col.heading}
                  </h2>
                  <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold" />
                  <ul className="mt-6 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="lux-underline font-serif text-[19px] text-ink/80 transition-colors hover:text-accent"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Feature card — every mega menu ends on an invitation, not a list. */}
              <Link
                href={megaMenus[mega].feature.href}
                className="lux-lift group flex flex-col justify-between rounded-sm bg-olive-wash p-8 transition-colors"
              >
                <div>
                  <p className="font-caps text-[10px] uppercase tracking-wide4 text-accent">
                    {megaMenus[mega].feature.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-[28px] leading-tight text-ink">
                    {megaMenus[mega].feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {megaMenus[mega].feature.body}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-accent">
                  {megaMenus[mega].feature.cta}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ─────────────────────────────────────────────────
          Full-screen dark-olive panel with editorial serif links. Reads like a
          gallery contents page, not a hamburger dropdown. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-olive-deep px-gutter pb-12 pt-10 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="flex flex-col"
            >
              {mainNav.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4 py-6 font-serif text-[32px] font-light text-white"
                  >
                    <span className="font-caps text-[10px] tracking-wide2 text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mt-10 grid grid-cols-2 gap-3"
              >
                <a
                  href={CONTACT.phoneHref}
                  className="btn-pill justify-center border border-white/25 text-white"
                >
                  <Phone size={15} aria-hidden="true" /> Call
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill justify-center border border-white/25 text-white"
                >
                  <MessageCircle size={15} aria-hidden="true" /> WhatsApp
                </a>
                <Link href={routes.getQuote} className="btn-pill btn-gold col-span-2 justify-center">
                  Start Design Journey
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
