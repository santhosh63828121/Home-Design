'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TESTIMONIALS } from '../data/content.js'
import { VIDEO_TESTIMONIALS_AVAILABLE } from '@/data/credentials'

/**
 * THE QUOTES — an editorial spread, not a carousel of cards.
 *
 * One enormous serif quotation at a time, set at display size across a wide
 * measure, with the attribution small and quiet beneath it.
 *
 * NOT RENDERED: star ratings. `REVIEWS_VERIFIED` in src/data/reviews.ts is still
 * false, so these are shown as plain attributed quotes and NO Review /
 * AggregateRating JSON-LD is emitted anywhere. Fabricated rating markup is a
 * Google structured-data violation with real manual-penalty risk — the gate
 * stays shut until each quote is a genuine, attributable client review.
 *
 * Video testimonials are laid out but switched off (VIDEO_TESTIMONIALS_AVAILABLE)
 * until real, consented client footage exists.
 */
export default function Testimonials() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const total = TESTIMONIALS.length

  const go = (step) => setI((v) => (v + step + total) % total)

  const t = TESTIMONIALS[i]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-y overflow-x-clip bg-bone"
    >
      <div className="shell">
        <div className="flex items-end justify-between gap-8 border-b border-divider pb-10">
          <div>
            <p className="eyebrow">In their words</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2
              id="testimonials-heading"
              className="mt-8 font-serif text-headline font-light text-ink"
            >
              Clients, <span className="italic text-accent">not projects</span>
            </h2>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/[0.12] text-ink transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/[0.12] text-ink transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-white"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* aria-live so screen-reader users hear the quote change when they page
            through — a silent swap would be invisible to them. min-height holds
            the box so a longer quote cannot shift the page (CLS 0). */}
        <div className="relative min-h-[19rem] pt-s12 sm:min-h-[15rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="max-w-5xl text-balance font-serif text-[clamp(1.6rem,3.4vw,2.9rem)] font-light leading-[1.28] text-ink">
                <span aria-hidden="true" className="text-gold">
                  “
                </span>
                {t.quote}
                <span aria-hidden="true" className="text-gold">
                  ”
                </span>
              </blockquote>

              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span aria-hidden="true" className="h-px w-10 bg-gold" />
                <span className="font-caps text-[11px] uppercase tracking-wide2 text-ink">
                  {t.name}
                </span>
                <span className="font-caps text-[11px] uppercase tracking-wide2 text-muted">
                  {t.role}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-8">
          <ol className="flex flex-1 items-center gap-2" aria-hidden="true">
            {TESTIMONIALS.map((r, idx) => (
              <li key={r.name} className="h-px flex-1 bg-divider">
                <span
                  className={`block h-px origin-left bg-accent transition-transform duration-700 ease-lux ${
                    idx === i ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </li>
            ))}
          </ol>

          <div className="flex shrink-0 items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/[0.12] text-ink"
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/[0.12] text-ink"
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {VIDEO_TESTIMONIALS_AVAILABLE && (
          <div className="mt-20 border-t border-divider pt-14">
            <p className="eyebrow">On camera</p>
          </div>
        )}
      </div>
    </section>
  )
}
