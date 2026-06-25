'use client'

import { motion } from 'framer-motion'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, viewportOnce } from '../animations/variants.js'
import { BEFORE_AFTER } from '../data/content.js'
import BeforeAfterSlider from './portfolio/BeforeAfterSlider.jsx'

/**
 * Final Section — Before / After transformation showcase.
 * Reuses the shared <BeforeAfterSlider> (also used in case studies).
 */
export default function BeforeAfter() {
  return (
    <section id="transformations" aria-labelledby="ba-heading" className="bg-background py-20 sm:py-[100px]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>Before &amp; After</Eyebrow>
          <Heading id="ba-heading" className="mt-4 text-3xl sm:text-[3.5rem]">
            The RGL
            <br />
            Transformation
          </Heading>
          <p className="mt-4 text-sm text-muted">Drag the handle to reveal the difference.</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {BEFORE_AFTER.map((item) => (
            <BeforeAfterSlider
              key={item.id}
              beforeSrc={item.before}
              afterSrc={item.after}
              afterAlt={`${item.label} — after`}
              label={item.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
