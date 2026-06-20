import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'

/**
 * Release Hero — the white finale that rises over the dimmed, pulled-back
 * walkthrough (matching the reference's two-tone serif headline moment).
 * Bridges the cinematic film into the normal scrolling site.
 */
export default function ReleaseHero() {
  return (
    <section
      aria-labelledby="release-heading"
      className="relative overflow-hidden bg-[#f6f2ea] py-24 text-center sm:py-32"
    >
      {/* Soft gold ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(201,168,106,0.16) 0%, rgba(246,242,234,0) 70%)',
        }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-4xl px-5"
      >
        <motion.p
          variants={fadeUp}
          className="font-caps text-xs uppercase tracking-[0.3em] text-[#c9a86a]"
        >
          RGL Decors · Luxury Interiors
        </motion.p>
        <motion.h1
          id="release-heading"
          variants={fadeUp}
          className="mt-6 font-serif text-4xl font-bold leading-[1.04] sm:text-6xl"
        >
          <span className="text-[#2D6A5A]">WHERE LUXURY</span>
          <br />
          <span className="text-[#2D6A5A]">MEETS </span>
          <span className="text-[#c9a86a]">PERFECTION.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/70"
        >
          Every space is thoughtfully crafted to reflect elegance, comfort, and timeless design.
        </motion.p>
      </motion.div>
    </section>
  )
}
