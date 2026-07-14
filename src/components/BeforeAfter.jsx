'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BEFORE_AFTER } from '../data/content.js'
import BeforeAfterSlider from './portfolio/BeforeAfterSlider.jsx'
import { routes } from '@/lib/routes'

/**
 * THE TRANSFORMATION — before and after, presented as evidence rather than a
 * gimmick. Left-aligned editorial header (a centred one would make it feel like
 * a marketing block), a hairline rule, and the sliders given real room to
 * breathe. Reuses the shared <BeforeAfterSlider>, which also serves the case
 * studies — one component, one behaviour, everywhere.
 */
export default function BeforeAfter() {
  const reduce = useReducedMotion()

  return (
    <section id="transformations" aria-labelledby="ba-heading" className="section-y bg-background">
      <div className="shell">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-8 border-b border-divider pb-10"
        >
          <div>
            <p className="eyebrow">Before &amp; after</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2 id="ba-heading" className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink">
              The RGL <span className="italic text-accent">transformation</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Drag the handle to reveal the room underneath. Same walls, same light — a different
            home.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {BEFORE_AFTER.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: reduce ? {} : { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <BeforeAfterSlider
                beforeSrc={item.before}
                afterSrc={item.after}
                afterAlt={`${item.label} — after`}
                label={item.label}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14">
          <Link
            href={routes.portfolio}
            className="lux-underline inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-accent"
          >
            See every project
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
