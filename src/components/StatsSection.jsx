'use client'

import CountUp from 'react-countup'
import { useReducedMotion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { STATS } from '../data/content.js'

/**
 * Section 4 — stats bar with count-up animation.
 * Numbers count 0 → target over 2s (easeOut) once the row is 50% visible.
 * Thin vertical dividers separate blocks on desktop; 2×2 grid on mobile.
 */
export default function StatsSection() {
  const { ref, inView } = useScrollReveal(0.5)
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="RGL Decors by the numbers"
      className="bg-white py-20 sm:py-[100px]"
    >
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4 lg:gap-y-0"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center lg:px-6 ${
              i > 0 ? 'lg:border-l lg:border-divider' : ''
            }`}
          >
            <span className="font-serif text-5xl font-light text-ink sm:text-6xl lg:text-[6rem] lg:leading-none">
              {/* Reduced motion: show the final number immediately, no count-up. */}
              {reduce || !inView ? (
                `${reduce ? stat.value : 0}${stat.suffix}`
              ) : (
                <CountUp end={stat.value} duration={1.8} useEasing suffix={stat.suffix} />
              )}
            </span>
            <span className="mt-4 font-sans text-[0.85rem] uppercase tracking-wide2 text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}