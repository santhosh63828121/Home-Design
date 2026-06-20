import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { NAV_LINKS, CONTACT } from '../data/content.js'

/**
 * Floating glassmorphism PILL navbar — modelled on the reference film.
 * A rounded capsule floats at the top: logo left, links centre, a green CTA
 * pill + circular icon button on the right. Glass over the dark walkthrough;
 * solid white once the page releases into the content.
 */
export default function Navbar() {
  const [overDark, setOverDark] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const glass = overDark && !open
  const linkColor = glass ? 'text-white/85' : 'text-ink'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-[background,box-shadow,border-color] duration-500 sm:h-16 sm:pl-7 sm:pr-2.5 ${
          glass
            ? 'border border-white/15 bg-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'border border-black/5 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl'
        }`}
      >
        <Logo dark={!glass} />

        {/* Centre links — desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`font-caps text-[13px] tracking-caps transition-colors hover:text-[#2D6A5A] ${linkColor}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: green CTA pill + circular icon */}
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-1.5 rounded-full bg-[#2D6A5A] px-5 py-2.5 font-caps text-[12.5px] font-semibold tracking-caps text-white transition-colors hover:bg-[#235446] sm:inline-flex"
          >
            Schedule Consultation
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors sm:h-11 sm:w-11 ${
              glass
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                : 'border-black/10 bg-white text-ink hover:bg-black/5'
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} className="lg:hidden" />}
            {!open && <ArrowUpRight size={18} className="hidden lg:block" />}
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
            className="pointer-events-auto mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-3xl border border-black/5 bg-white/95 shadow-card backdrop-blur-md"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-5 py-5"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-divider py-3.5 font-caps text-base tracking-caps text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="pt-4"
              >
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2D6A5A] py-3 font-caps text-sm font-semibold tracking-caps text-white"
                >
                  Schedule Consultation
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
