'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRICING } from '../data/content.js'
import { routes } from '@/lib/routes'

/**
 * WHAT IT COSTS — a rate card, not a SaaS pricing table.
 *
 * The three tiers are set as columns of a single ruled table: a hairline above
 * each, an enormous light-serif figure, and the inclusions as a plain list. No
 * boxes, no coloured "MOST POPULAR" rosette, no card that floats above its
 * neighbours. A luxury studio quotes; it does not upsell.
 *
 * The featured tier is distinguished by a single gold rule and a gold index —
 * which is all the emphasis it needs.
 *
 * HONESTY: every figure here is explicitly indicative and says so, immediately
 * under the row rather than in fine print at the bottom. The real, itemised
 * number comes from a site visit; that is the actual promise.
 */
function Tier({ plan, i, reduce }) {
  const featured = plan.featured
  return (
    <motion.div
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group relative flex flex-col pt-8"
    >
      {/* The rule above each column is the only "card" this design gets. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px ${featured ? 'bg-gold' : 'bg-divider'}`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
      />

      <div className="flex items-baseline justify-between">
        <span className="font-caps text-[10px] uppercase tracking-wide4 text-muted">
          {plan.name}
        </span>
        <span className={`font-caps text-[10px] tracking-wide2 ${featured ? 'text-gold' : 'text-divider'}`}>
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="font-serif text-[clamp(2.75rem,4.5vw,4rem)] font-light leading-none text-ink">
          {plan.price}
        </span>
        <span className="text-sm text-muted">{plan.period}</span>
      </div>

      <p className="mt-3 text-xs text-muted">Indicative. Final quote after a site visit.</p>

      <ul className="mt-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-ink/75">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
            />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={routes.getQuote}
        className={`btn-pill mt-10 w-full justify-center ${featured ? 'btn-gold' : 'btn-ghost'}`}
      >
        {plan.cta}
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

export default function PricingSection() {
  const reduce = useReducedMotion()

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section-y bg-bone">
      <div className="shell">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <div>
            <p className="eyebrow">What it costs</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2
              id="pricing-heading"
              className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
            >
              Transparent, <span className="italic text-accent">itemised</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            No hidden markups. You see the line items before you commit — and the number you
            approve is the number you pay.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-3"
        >
          {PRICING.map((plan, i) => (
            <Tier key={plan.id} plan={plan} i={i} reduce={reduce} />
          ))}
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-divider pt-8">
          <Link
            href={routes.pricing}
            className="lux-underline inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-accent"
          >
            Full cost guide for Chennai
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <p className="text-xs text-muted">
            All figures indicative. Your final quote follows a site visit and measurement.
          </p>
        </div>
      </div>
    </section>
  )
}
