import type { Variants } from 'framer-motion'

/**
 * Premium scroll-reveal variants — used via <SectionReveal> (which gates blur and
 * transforms under prefers-reduced-motion). Durations stay in the 150–500ms band
 * with the house easing, consistent with Phase 9. Directions mirror variants.js:
 * "left" enters from the right, "right" enters from the left.
 */
const EASE = [0.22, 1, 0.36, 1] as const
const D = 0.5

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: D, ease: EASE } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: D, ease: EASE } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: D, ease: EASE } },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: D, ease: EASE } },
}

/** Opacity-only — used as the reduced-motion fallback (no motion vector). */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
}

/** Parent that staggers its children; pair with `staggerItem`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const staggerItem: Variants = fadeUp

export const revealVariants = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  blurIn,
  fadeOnly,
} as const

export type RevealVariant = keyof typeof revealVariants
