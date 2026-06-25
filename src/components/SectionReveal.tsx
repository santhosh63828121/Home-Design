'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'
import { revealVariants, fadeOnly, staggerContainer, type RevealVariant } from '@/animations/revealVariants'

/**
 * Drop-in scroll reveal. Animates children once when they enter the viewport.
 *
 *   <SectionReveal variant="fadeUp">…</SectionReveal>
 *   <SectionReveal stagger>  // children with variants={staggerItem} animate in sequence
 *
 * Accessibility: when the user prefers reduced motion, it collapses to an
 * opacity-only fade (no transform, no blur) — covering the blur/transform cases
 * that the global MotionConfig doesn't, so nothing translates or blurs.
 */
export default function SectionReveal({
  variant = 'fadeUp',
  as = 'div',
  delay = 0,
  amount = 0.2,
  stagger = false,
  className,
  children,
}: {
  variant?: RevealVariant
  as?: ElementType
  delay?: number
  amount?: number
  stagger?: boolean
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const Motion = motion[as as keyof typeof motion] as typeof motion.div

  const variants: Variants = reduce
    ? fadeOnly
    : stagger
      ? staggerContainer
      : revealVariants[variant] ?? revealVariants.fadeUp

  return (
    <Motion
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Motion>
  )
}
