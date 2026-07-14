'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../data/content.js'
import { MaskPlate, ParallaxPlate } from '@/components/motion/Plate'
import { routes } from '@/lib/routes'

/**
 * THE SPLIT — an architectural composition, not a two-column card.
 *
 * The image runs to the edge of the viewport on one side (a full-bleed plate),
 * the type sits in a narrow measure on the other with real air around it. The
 * image reveals from behind a mask — a clip-path wipe rather than a slide, which
 * reads as a curtain drawing back instead of a widget flying in.
 *
 * The tag list is now honest: the old '10Yr Warranty' chip contradicted the
 * confirmed terms on /warranty (5-yr hardware / 1-yr carcass), and the body's
 * "India's 1st studio… 99% accuracy" claim was unverifiable. Both were retired
 * in src/data/content.js.
 */
export default function ServicesSplit() {
  const reduce = useReducedMotion()

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-y overflow-x-clip bg-bone"
    >
      <div className="grid w-full items-center gap-s8 lg:grid-cols-2 lg:gap-24">
        {/* ── Type ─────────────────────────────────────────────────────────
            Padded to align with the site's shell on the left, but allowed to
            breathe toward the image on the right. */}
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="px-gutter lg:pl-shell"
        >
          <motion.p variants={item(reduce)} className="eyebrow">
            {SERVICES.label}
          </motion.p>

          <motion.span
            variants={item(reduce)}
            aria-hidden="true"
            className="rule-gold mt-6"
          />

          <motion.h2
            variants={item(reduce)}
            id="services-heading"
            className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
          >
            {SERVICES.heading[0]}
            <br />
            <span className="italic text-accent">{SERVICES.heading[1]}</span>
          </motion.h2>

          <motion.p
            variants={item(reduce)}
            className="mt-8 max-w-prose2 text-pretty leading-relaxed text-ink/70"
          >
            {SERVICES.body}
          </motion.p>

          <motion.ul variants={item(reduce)} className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {SERVICES.tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-ink/75"
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                {tag}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item(reduce)} className="mt-12">
            <Link href={routes.services} className="btn-pill btn-olive">
              All 15 service categories
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Plate ────────────────────────────────────────────────────────
            Full-bleed to the right edge. The mask wipe is on a wrapper so the
            image itself can hold a slow counter-scale — the reveal and the
            push-in are two separate motions, which is what makes it feel filmed
            rather than animated. */}
        <MaskPlate
          from="bottom"
          className="lux-media relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]"
        >
          {/* Two motions, not one: the curtain lifts (MaskPlate) while the
              photograph itself drifts against the frame (ParallaxPlate). The
              opposition between them is what the eye reads as depth — a single
              combined move just looks like a widget sliding in. */}
          <ParallaxPlate distance={40} className="absolute inset-0">
            <Image
              src={SERVICES.image}
              alt={SERVICES.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ParallaxPlate>
        </MaskPlate>
      </div>
    </section>
  )
}

const item = (reduce) => ({
  hidden: reduce ? {} : { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
})
