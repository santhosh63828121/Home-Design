'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, PencilRuler } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { CONTACT } from '../data/content.js'
import { mainNav, routes } from '@/lib/routes'

/**
 * Floating glassmorphism PILL navbar — three balanced sections:
 *
 *   [ navbar-left: Logo ] [ navbar-center: nav (absolutely centred) ] [ navbar-right: actions ]
 *
 * The centre section is position:absolute + left-1/2 + -translate-x-1/2, so the
 * navigation stays perfectly centred in the bar regardless of how wide the logo
 * or the action cluster are. Left/right use justify-between.
 *
 * Adaptive colour: glass (translucent dark) over the dark home walkthrough,
 * solid white on content pages / after scroll — kept for text contrast (WCAG AA).
 *
 * Overflow-safe: container is max-width + width:100%-48px (never 100vw); the
 * centre nav scales compact→spacious across breakpoints so 7 links never collide
 * with the side clusters.
 */
export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [overDark, setOverDark] = useState(isHome)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Only the home walkthrough has a dark hero; content pages are always solid.
    if (!isHome) {
      setOverDark(false)
      return
    }
    const walkthrough = document.getElementById('walkthrough')
    const onScroll = () => {
      const rect = walkthrough?.getBoundingClientRect()
      setOverDark(rect ? rect.bottom > 140 : window.scrollY < 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
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

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const glass = overDark && !open
  const linkColor = glass ? 'text-white/85' : 'text-ink'

  return (
    // Header spans the viewport but only paints the centred pill. px-6 gives the
    // pill width: calc(100% - 48px); pointer-events-none lets clicks fall through
    // the transparent gutter to the hero behind it.
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-6">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto relative mx-auto flex h-[66px] w-full max-w-[1440px] items-center justify-between rounded-full px-6 transition-[background,box-shadow,border-color] duration-500 lg:h-[78px] 2xl:max-w-[1600px] ${
          glass
            ? 'border border-white/15 bg-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-2xl'
            : 'border border-black/5 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl'
        }`}
      >
        {/* ── navbar-left: Logo ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link href={routes.home} aria-label="RGL Decors — home">
            <Logo dark={!glass} />
          </Link>
        </div>

        {/* ── navbar-center: navigation ──────────────────────────────────────
            7 links only fit absolutely-centred from ~1440px (your large-desktop
            target). So: in-flow on laptops (lg–xl) — justify-between keeps it
            ~centred with the balanced side clusters and never overlaps them — and
            absolutely-centred (left-1/2 / -translate-x-1/2) at 2xl, where there's
            room for the full 16px / 42px-gap premium spacing. */}
        <ul className="hidden items-center gap-3.5 lg:flex xl:gap-6 min-[1600px]:absolute min-[1600px]:left-1/2 min-[1600px]:-translate-x-1/2 min-[1600px]:gap-[42px]">
          {mainNav.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  // inline-block so the hover translateY(-2px) actually applies.
                  className={`inline-block whitespace-nowrap font-medium tracking-[0.04em] transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-[#2D6A5A] text-[12.5px] xl:text-[14px] min-[1600px]:text-[16px] ${
                    active ? 'text-[#2D6A5A]' : linkColor
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* ── navbar-right: actions (gap 16px) ───────────────────────────────
            Phone + WhatsApp are 48px circles (desktop only — mobile uses the
            global floating stack); Get Free Quote is the 52px pill; hamburger
            below lg. */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phoneDisplay}`}
            className={`hidden h-12 w-12 place-items-center rounded-full border transition-colors xl:grid ${
              glass
                ? 'border-white/20 text-white hover:bg-white/15'
                : 'border-black/10 text-ink hover:bg-black/5'
            }`}
          >
            <Phone size={17} aria-hidden="true" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="hidden h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 xl:grid"
          >
            <MessageCircle size={19} aria-hidden="true" />
          </a>
          <Link
            href={routes.getQuote}
            className="hidden h-12 items-center gap-2 rounded-full bg-[#2D6A5A] px-6 font-caps text-[13px] font-semibold tracking-caps text-white transition-colors hover:bg-[#235446] md:inline-flex lg:h-[52px] lg:px-7"
          >
            <PencilRuler size={16} aria-hidden="true" /> Get Free Quote
          </Link>

          {/* Hamburger — mobile + tablet (below lg). Keeps its ARIA + #mobile-menu
              wiring for the keyboard / screen-reader path. */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              open
                ? 'border-black/10 text-ink'
                : glass
                  ? 'border-white/20 text-white hover:bg-white/20'
                  : 'border-black/10 text-ink hover:bg-black/5'
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu (unchanged behaviour: id + focusable links). */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto mx-auto mt-3 max-h-[80vh] w-full max-w-[1440px] overflow-auto rounded-3xl border border-black/5 bg-white/95 shadow-card backdrop-blur-md lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-5 py-5"
            >
              {mainNav.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-divider py-3.5 font-caps text-base tracking-caps text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="grid grid-cols-2 gap-3 pt-4"
              >
                <a
                  href={CONTACT.phoneHref}
                  className="btn-pill justify-center border border-accent bg-transparent text-accent"
                >
                  <Phone size={16} aria-hidden="true" /> Call
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill justify-center bg-[#25D366] text-white"
                >
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
                <Link
                  href={routes.getQuote}
                  className="btn-pill col-span-2 justify-center bg-accent font-semibold text-white"
                >
                  <PencilRuler size={16} aria-hidden="true" /> Get Free Quote
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
