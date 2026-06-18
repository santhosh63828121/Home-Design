import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'
import { PRICING, CONTACT } from '../data/content.js'

/**
 * Section 6 — pricing.
 * Three cards; the featured (Premium) card uses the forest-green theme, sits
 * slightly taller and visually dominates. Cards lift on hover.
 */
function PriceCard({ plan }) {
  const featured = plan.featured
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative flex flex-col rounded-2xl p-8 transition-shadow duration-300 hover:shadow-card ${
        featured
          ? 'bg-accent text-white shadow-card lg:-my-4 lg:py-12'
          : 'border border-divider bg-white text-ink'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-caps text-[11px] font-semibold uppercase tracking-caps text-white ring-2 ring-white">
          {plan.badge}
        </span>
      )}

      <span
        className={`font-caps text-xs uppercase tracking-wide2 ${
          featured ? 'text-white/80' : 'text-accent'
        }`}
      >
        {plan.name}
      </span>

      <div className="mt-4 flex items-end gap-2">
        <span className="font-serif text-5xl font-bold">{plan.price}</span>
        <span className={`pb-2 text-sm ${featured ? 'text-white/70' : 'text-muted'}`}>
          {plan.period}
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check
              size={18}
              className={`mt-0.5 shrink-0 ${featured ? 'text-white' : 'text-accent'}`}
              aria-hidden="true"
            />
            <span className={featured ? 'text-white/90' : 'text-ink/80'}>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={featured ? CONTACT.phoneHref : '#contact'}
        className={`btn-pill mt-8 w-full justify-center ${
          featured
            ? 'bg-white text-accent hover:bg-white/90'
            : 'border border-ink/30 bg-transparent text-ink hover:border-ink'
        }`}
      >
        {plan.cta} <span aria-hidden="true">→</span>
      </a>
    </motion.div>
  )
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-background py-20 sm:py-[100px]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>Pricing Plans</Eyebrow>
          <Heading id="pricing-heading" className="mt-4 text-3xl sm:text-5xl">
            Simple, Transparent
            <br />
            Pricing.
          </Heading>
          <p className="mt-4 text-muted">
            No hidden charges. Flexible options. Just beautiful homes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-3"
        >
          {PRICING.map((plan) => (
            <PriceCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-muted">
          All prices indicative. Final quote after site visit. EMI options available.
        </p>
      </div>
    </section>
  )
}
