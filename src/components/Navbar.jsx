import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, CalendarCheck } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { NAV_LINKS, CONTACT } from '../data/content.js'

/**
 * Fixed luxury navigation — visible across every scene.
 * - Over the dark cinematic walkthrough: glassmorphism (blurred dark glass,
 *   white text, gold accents).
 * - After the walkthrough releases into the content: solid white + dark text.
 * The mode is driven by whether the pinned #walkthrough still covers the top,
 * not a fixed scroll offset (which would flip mid-walkthrough).
 */
export default function Navbar() {
  const [overDark, setOverDark] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const walkthrough = document.getElementById('walkthrough')
    const onScroll = () => {
      const rect = walkthrough?.getBoundingClientRect()
      // Still in the cinematic while it covers the top of the viewport.
      setOverDark(rect ? rect.bottom > 120 : window.scrollY < 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const glass = overDark && !open
  const linkColor = glass ? 'text-white/90' : 'text-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-500 ${
        glass
          ? 'border-b border-white/10 bg-black/25 backdrop-blur-xl'
          : 'border-b border-transparent bg-white shadow-nav'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Logo dark={!glass} />

        {/* Center links — desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`font-caps text-[13px] tracking-caps transition-colors hover:text-[#c9a86a] ${linkColor}`}
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
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 font-caps text-[13px] font-semibold tracking-caps transition-all duration-300 sm:inline-flex ${
              glass
                ? 'border border-[#c9a86a]/60 bg-white/10 text-white backdrop-blur-md hover:bg-[#c9a86a] hover:text-ink'
                : 'bg-[#c9a86a] text-ink hover:bg-[#b8965a]'
            }`}
          >
            <CalendarCheck size={16} aria-hidden="true" />
            Schedule Consultation
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-md transition-colors hover:text-[#c9a86a] ${
              open ? 'text-ink' : linkColor
            }`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
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
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
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
                  className="btn-pill w-full justify-center bg-[#c9a86a] text-ink"
                >
                  <CalendarCheck size={16} aria-hidden="true" /> Schedule Consultation
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
