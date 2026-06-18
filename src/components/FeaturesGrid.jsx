import { motion } from 'framer-motion'
import {
  Clapperboard,
  Clock,
  BadgeIndianRupee,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Wrench,
} from 'lucide-react'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'
import { FEATURES, CONTACT } from '../data/content.js'

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
 * Section 7 — "Why RGL Decors?" 4×2 feature grid.
 * Reusable FeatureCard; cards stagger up on reveal and lift + reveal a green
 * top-border accent on hover.
 */
function FeatureCard({ feature }) {
  const Icon = ICONS[feature.icon]
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-xl border border-divider bg-white p-8"
    >
      {/* Green top-border accent revealed on hover */}
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
      {Icon && <Icon size={32} className="text-accent" aria-hidden="true" />}
      <h3 className="mt-5 font-serif text-xl font-bold text-ink">{feature.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{feature.description}</p>
    </motion.article>
  )
}

export default function FeaturesGrid() {
  return (
    <section id="why" aria-labelledby="why-heading" className="bg-white py-20 sm:py-[100px]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <Eyebrow>Our Promise</Eyebrow>
          <Heading id="why-heading" className="mt-4 text-3xl sm:text-5xl">
            Why RGL Decors?
          </Heading>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 text-center"
        >
          <a href={CONTACT.phoneHref} className="btn-pill bg-accent text-white hover:bg-accent-dark">
            GET FREE ESTIMATE <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
