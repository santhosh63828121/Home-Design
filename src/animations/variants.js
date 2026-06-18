/**
 * Reusable Framer Motion variants.
 * Used with `whileInView` + `viewport={{ once: true }}` across sections so the
 * reveal logic stays consistent and DRY.
 */

const EASE = [0.22, 1, 0.36, 1] // smooth, premium ease-out

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

// Parent container that staggers its children by 80ms (per spec).
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// Hover helpers — applied via `whileHover`.
export const scaleHover = { scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }

export const cardHover = {
  y: -8,
  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
  transition: { duration: 0.3, ease: 'easeOut' },
}

// Shared viewport config so reveals trigger once at ~15% visibility.
export const viewportOnce = { once: true, amount: 0.15 }
