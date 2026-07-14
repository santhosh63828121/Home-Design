'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
  ArrowUpRight,
} from 'lucide-react'
import { FEATURES } from '../data/content.js'
import { routes } from '@/lib/routes'

// Map data icon names → components (tree-shakeable, no dynamic require).
const ICONS = {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
}

/**
 * THE PROMISE — a numbered index, not a grid of boxes.
 *
 * Cards are gone. Each promise is a row in a ruled list: an index numeral, a
 * thin icon, a serif title and a line of prose, separated by hairlines. It reads
 * like the contents page of a monograph — which is exactly the register the
 * brief asks for, and it removes eight drop-shadowed rectangles from the page.
 *
 * Hover lifts the row a hair and draws the gold rule across it. No bounce.
 */
export default function FeaturesGrid() {
  const reduce = useReducedMotion()

  return (
    <section id="why" aria-labelledby="why-heading" className="section-y bg-background">
      <div className="shell">
        <div className="grid gap-10 border-b border-divider pb-14 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow">Our promise</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2
              id="why-heading"
              className="mt-8 max-w-[10ch] font-serif text-headline font-light text-ink"
            >
              Why RGL <span className="italic text-accent">Décors</span>
            </h2>
          </div>
          <p className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pb-2">
            Eight commitments we make on every project — and the reason clients let us take a home
            from an empty shell to the day they move in.
          </p>
        </div>

        <motion.ol
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid lg:grid-cols-2 lg:gap-x-24"
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon]
            return (
              <motion.li
                key={feature.title}
                variants={{
                  hidden: reduce ? {} : { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="group relative border-b border-divider py-8"
              >
                {/* The gold rule draws across the row on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                />

                <div className="flex items-start gap-6 transition-transform duration-700 ease-lux group-hover:translate-x-1.5">
                  <span className="mt-1 font-caps text-[10px] tracking-wide2 text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          size={19}
                          strokeWidth={1.25}
                          className="shrink-0 text-accent"
                          aria-hidden="true"
                        />
                      )}
                      <h3 className="font-serif text-title font-normal text-ink">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-prose2 text-pretty text-sm leading-relaxed text-ink/65">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link href={routes.getQuote} className="btn-pill btn-gold">
            Get a free estimate
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href={routes.warranty}
            className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
          >
            Read our warranty terms
          </Link>
        </div>
      </div>
    </section>
  )
}
