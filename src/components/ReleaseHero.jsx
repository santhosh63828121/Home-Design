import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'

/**
 * Release Hero — the first breath after the pinned walkthrough unlocks.
 * Bridges the cinematic film into the normal scrolling site with the brief's
 * headline "WHERE LUXURY MEETS PERFECTION".
 */
export default function ReleaseHero() {
  return (
    <section
      aria-labelledby="release-heading"
      className="relative overflow-hidden bg-ink py-24 text-center text-white sm:py-32"
    >
      {/* Soft gold ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(201,168,106,0.18) 0%, rgba(20,17,12,0) 70%)',
        }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-3xl px-5"
      >
        <motion.p
          variants={fadeUp}
          className="font-caps text-xs uppercase tracking-[0.3em] text-[#c9a86a]"
        >
          RGL Decors
        </motion.p>
        <motion.h1
          id="release-heading"
          variants={fadeUp}
          className="mt-5 font-serif text-4xl font-bold leading-[1.05] sm:text-6xl"
        >
          WHERE LUXURY
          <br />
          MEETS PERFECTION
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75"
        >
          Every space is thoughtfully crafted to reflect elegance, comfort, and timeless design.
        </motion.p>
      </motion.div>
    </section>
  )
}
