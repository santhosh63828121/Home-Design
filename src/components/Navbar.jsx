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
 * Floating glassmorphism PILL navbar — every item resolves to a real route.
 * Glass over the dark home walkthrough; solid white on content pages / after
 * scroll. Right cluster: Get Free Quote + click-to-call + WhatsApp. Mobile:
 * full overlay menu with the same real routes + a quote CTA.
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
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-[background,box-shadow,border-color] duration-500 sm:h-16 sm:pl-7 sm:pr-2.5 ${
          glass
            ? 'border border-white/15 bg-black/25 backdrop-blur-xl'
            : 'border border-black/5 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl'
        }`}
      >
        <Link href={routes.home} aria-label="RGL Decors — home">
          <Logo dark={!glass} />
        </Link>

        {/* Centre links — desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
          {mainNav.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-caps text-[13px] tracking-caps transition-colors hover:text-[#2D6A5A] ${
                    active ? 'text-[#2D6A5A]' : linkColor
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right cluster: call · whatsapp · Get Free Quote */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phoneDisplay}`}
            className={`hidden h-10 w-10 place-items-center rounded-full border transition-colors sm:grid ${
              glass
                ? 'border-white/20 text-white hover:bg-white/15'
                : 'border-black/10 text-ink hover:bg-black/5'
            }`}
          >
            <Phone size={16} aria-hidden="true" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="hidden h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 sm:grid"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <Link
            href={routes.getQuote}
            className="hidden items-center gap-1.5 rounded-full bg-[#2D6A5A] px-5 py-2.5 font-caps text-[12.5px] font-semibold tracking-caps text-white transition-colors hover:bg-[#235446] sm:inline-flex"
          >
            <PencilRuler size={15} aria-hidden="true" /> Get Free Quote
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors sm:h-11 sm:w-11 lg:hidden ${
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto mx-auto mt-3 max-h-[80vh] w-full max-w-6xl overflow-auto rounded-3xl border border-black/5 bg-white/95 shadow-card backdrop-blur-md lg:hidden"
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
