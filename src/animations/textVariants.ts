import type { Variants } from 'framer-motion'

/**
 * Text-reveal variants — words/lines rise into a clipping mask, staggered. Use
 * with <TextReveal> (which falls back to a plain fade under reduced-motion).
 * Wrap each word's <span> in an `overflow-hidden` parent so the y-offset clips.
 */
const EASE = [0.22, 1, 0.36, 1] as const

export const textContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
}

/** Each masked word: starts fully below its mask, slides up to 0. */
export const textWord: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.5, ease: EASE } },
}

/** Reduced-motion fallback: a simple opacity fade per word, no movement. */
export const textWordReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
}
