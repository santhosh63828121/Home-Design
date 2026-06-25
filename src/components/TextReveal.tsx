'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'
import { textContainer, textWord, textWordReduced } from '@/animations/textVariants'

/**
 * Word-by-word text reveal: each word rises out of a clipping mask, staggered.
 * Under reduced motion it falls back to a per-word opacity fade (no movement).
 * Renders the full text as real, selectable, crawlable words (split by spaces).
 *
 *   <TextReveal as="h2" text="Crafted in Marble & Light" className="font-serif" />
 */
export default function TextReveal({
  text,
  as = 'span',
  className,
  amount = 0.6,
}: {
  text: string
  as?: ElementType
  className?: string
  amount?: number
}) {
  const reduce = useReducedMotion()
  const Tag = as as ElementType
  const words = text.split(' ')
  const wordVariant = reduce ? textWordReduced : textWord

  return (
    <Tag className={className}>
      <motion.span
        style={{ display: 'inline' }}
        variants={textContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
