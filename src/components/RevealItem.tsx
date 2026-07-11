'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'
import { staggerItem, fadeOnly } from '@/animations/revealVariants'

/**
 * A single staggered child. Use INSIDE `<SectionReveal stagger>` — the parent
 * owns the `initial`/`whileInView` state and the stagger timing; each item just
 * declares the variants it inherits, so the cards cascade in sequence rather
 * than all at once.
 *
 *   <SectionReveal stagger className="grid gap-4 sm:grid-cols-2">
 *     {items.map(i => <RevealItem key={i.id}>…</RevealItem>)}
 *   </SectionReveal>
 *
 * Reduced motion → opacity-only (no transform), matching SectionReveal.
 */
export default function RevealItem({
  as = 'div',
  className,
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const Motion = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Motion className={className} variants={reduce ? fadeOnly : staggerItem}>
      {children}
    </Motion>
  )
}
