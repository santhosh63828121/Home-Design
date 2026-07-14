'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { routes } from '@/lib/routes'

/**
 * THE STATEMENT
 * =============
 * The white room the walkthrough opens into. It carries the page's single <h1>
 * and it is deliberately almost empty: a mark, a sentence, and a great deal of
 * air. The restraint IS the message — a studio confident enough not to shout.
 *
 * The headline reveals line by line behind a mask (each line rises out from
 * under a clipped parent, the way a curtain lifts). Transform + opacity only, so
 * it is composited and free.
 *
 * NOTE: on desktop the LCP element is the WebGL canvas above; on mobile it is
 * the hero photograph. Either way this <h1> is NOT the LCP element, so animating
 * it in on hydration costs nothing — a lesson learned the hard way when an
 * SSR-transparent hero headline was measured at 6.7s LCP.
 */

const LINES = ['More than', 'premium spaces —', 'design to define you.']

export default function ReleaseHero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="statement"
      aria-labelledby="release-heading"
      className="section-y relative bg-background"
    >
      <div className="shell">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          RGL Décors · Chennai
        </motion.p>

        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="rule-gold mt-6"
        />

        {/* Mask reveal: each outer span clips, each inner span rises out of it.
            ONE observer, on the <h1> itself, staggering its children.

            The observer must NOT sit on the inner spans: they start translated
            110% BELOW their own clipping parent, so an IntersectionObserver
            attached to them is measuring a box that has been moved out of
            position. The trigger geometry is then wrong and the reveal can
            simply never fire — which left this headline permanently clipped and
            invisible on the live page. The <h1> is never transformed, so it is
            the only safe thing to observe. */}
        <motion.h1
          id="release-heading"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="mt-10 max-w-[14ch] font-serif text-display-xl font-light text-ink"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: '110%' },
                  visible: {
                    y: '0%',
                    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {i === LINES.length - 1 ? <span className="italic text-accent">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-14 grid gap-10 border-t border-divider pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-prose2 text-lede text-pretty text-ink/70"
          >
            We bring design, craftsmanship and end-to-end execution together under one roof — so the
            home you were shown is the home you receive.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link href={routes.portfolio} className="btn-pill btn-olive">
              View our work
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href={routes.process}
              className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
            >
              How we work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
