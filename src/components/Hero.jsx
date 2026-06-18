import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useParallax from '../hooks/useParallax.js'
import { HERO } from '../data/content.js'

/**
 * Section 1 — full-bleed hero.
 * The image IS the statement (no large headline). JS parallax moves the
 * background at 0.5x scroll speed via a GPU transform.
 */
export default function Hero() {
  const { ref, offset } = useParallax(0.5)

  return (
    <section
      id="top"
      ref={ref}
      aria-label="RGL Decors — luxury interiors"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Parallax background layer — oversized so the translate never reveals edges */}
      <div
        className="absolute inset-0 -top-[20%] h-[140%] gpu"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={HERO.image}
          alt={HERO.alt}
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Cinematic overlay: transparent top → dark bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating glassmorphism info card — top-right quadrant */}
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-5 top-28 w-[180px] rounded-2xl border border-white/15 bg-black/35 p-4 text-white shadow-form backdrop-blur-md sm:right-10 lg:top-32"
      >
        <p className="font-caps text-[10px] uppercase tracking-wide3 text-amber-300">
          {HERO.card.label}
        </p>
        <p className="mt-1 font-serif text-base">{HERO.card.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/80">{HERO.card.text}</p>
      </motion.aside>

      {/* Scroll prompt — bottom center */}
      <motion.a
        href="#services"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white"
      >
        <span className="font-caps text-[11px] uppercase tracking-wide3">Scroll to Explore</span>
        <ChevronDown size={22} className="animate-bounceArrow" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
