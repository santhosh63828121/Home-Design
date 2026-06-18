import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { NAV_LINKS, CONTACT } from '../data/content.js'

/**
 * Fixed navbar.
 * - Transparent + white text by default; solid white + shadow + dark text after 80px.
 * - Mobile: fullscreen animated overlay menu with backdrop blur.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open
  const linkColor = solid ? 'text-ink' : 'text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        solid ? 'bg-white shadow-nav' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Logo dark={solid} />

        {/* Center links — desktop only */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`font-caps text-[13px] tracking-caps transition-colors hover:text-accent ${linkColor}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <a
            href={CONTACT.phoneHref}
            className="btn-pill hidden bg-accent text-white hover:bg-accent-dark sm:inline-flex"
          >
            BOOK FREE CONSULTATION
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-md transition-colors ${linkColor} hover:text-accent`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-md"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col gap-2 px-6 py-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-divider py-4 font-caps text-lg tracking-caps text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="pt-4"
              >
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => setOpen(false)}
                  className="btn-pill w-full justify-center bg-accent text-white"
                >
                  <Phone size={16} aria-hidden="true" /> BOOK FREE CONSULTATION
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
