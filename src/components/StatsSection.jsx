'use client'

import CountUp from 'react-countup'
import { useReducedMotion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { STATS } from '../data/content.js'

/**
 * THE NUMBERS — set as a masthead figure, not a metrics dashboard.
 *
 * Enormous light-weight Cormorant numerals over a gold hairline, on the deep
 * olive ground. The count-up is kept (it earns attention) but the numbers hold
 * their layout box from first paint, so counting 0 → 150 cannot reflow the row.
 *
 * Every figure here is CLIENT-VERIFIED (src/data/business.ts, STATS_VERIFIED).
 * Nothing in this row is invented — which is precisely why it can be this loud.
 */
export default function StatsSection() {
  const { ref, inView } = useScrollReveal(0.4)
  const reduce = useReducedMotion()

  return (
    /* A BAND, not a section.
       This used to carry the full `section-y` on both edges: 176px of padding
       around ~150px of content, so the olive block measured 467px tall and read
       as a mostly-empty slab — the "excessive empty space below the statistics".
       It is now a tight measured band (section-y-sm), which is what a rule of
       numbers should be: a horizontal beat between two rooms, not a room. */
    <section
      aria-label="RGL Décors by the numbers"
      className="section-y-sm bg-olive-deep text-white"
    >
      <div ref={ref} className="shell">
        <dl className="grid grid-cols-2 gap-x-s8 gap-y-s12 lg:grid-cols-4 lg:gap-x-s12">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="group">
              <span aria-hidden="true" className="block h-px w-full bg-white/15">
                <span
                  className="block h-px origin-left bg-gold transition-transform duration-[1200ms] ease-lux"
                  style={{
                    transform: inView || reduce ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              </span>

              <dd className="mt-s6 font-serif text-[clamp(3.25rem,7vw,6rem)] font-light leading-[0.9] tracking-tight text-white">
                {/* Reduced motion (or pre-view): render the final number — the box
                    is therefore always the right size and the row never reflows. */}
                {reduce || !inView ? (
                  `${reduce ? stat.value : 0}${stat.suffix}`
                ) : (
                  <CountUp end={stat.value} duration={2.2} useEasing suffix={stat.suffix} />
                )}
              </dd>

              <dt className="mt-s3 font-caps text-[10px] uppercase tracking-wide4 text-white/60">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
