import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js'
import { TESTIMONIALS } from '../data/content.js'

/**
 * Final Section — client testimonials.
 * A staggered 3-up grid of quote cards. Pure CSS/Framer reveals (no scroll
 * pinning) since this lives in the unlocked, normal-scroll part of the page.
 */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-ink py-20 text-white sm:py-[100px]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow className="text-amber-300">Loved by Families</Eyebrow>
          <Heading id="testimonials-heading" className="mt-4 text-3xl text-white sm:text-[3.5rem]">
            Homes We've
            <br />
            Brought to Life
          </Heading>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
            >
              <Quote size={28} className="text-amber-300/80" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-serif text-lg">{t.name}</p>
                <p className="mt-1 font-caps text-[11px] uppercase tracking-wide2 text-amber-300/80">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
