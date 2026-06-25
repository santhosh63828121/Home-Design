'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eyebrow, Heading, Body } from './ui/Typography.jsx'
import { fadeUp, slideLeft, staggerContainer, viewportOnce } from '../animations/variants.js'
import { SERVICES } from '../data/content.js'

/**
 * Section 3 — magazine-style 50/50 split.
 * Left: editorial text that fades up. Right: full-bleed image that slides in.
 */
export default function ServicesSplit() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="grid min-h-[80vh] grid-cols-1 bg-background md:grid-cols-2"
    >
      {/* Text column */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-16"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>{SERVICES.label}</Eyebrow>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Heading id="services-heading" className="mt-5 text-4xl sm:text-5xl">
            {SERVICES.heading[0]}
            <br />
            {SERVICES.heading[1]}
          </Heading>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Body className="mt-6 max-w-xl">{SERVICES.body}</Body>
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          {SERVICES.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-divider bg-white px-4 py-2 font-caps text-xs tracking-caps text-ink"
            >
              {tag}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Image column */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative min-h-[50vh] overflow-hidden md:min-h-full"
      >
        <Image
          src={SERVICES.image}
          alt={SERVICES.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  )
}