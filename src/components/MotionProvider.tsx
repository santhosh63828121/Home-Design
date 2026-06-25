'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Global Framer Motion config. `reducedMotion="user"` makes EVERY motion.*
 * component across the app honour the OS-level "reduce motion" setting:
 * transform and layout animations are disabled (snapped to their end state)
 * while opacity-only fades — which carry no motion vector and don't trigger
 * vestibular discomfort — are kept. This is the global switch that covers the
 * scroll reveals, hover/tap micro-interactions, layout/filter animations and the
 * AnimatePresence transitions in one place, instead of per-component guards.
 *
 * (CSS animations/transitions are handled separately in globals.css; the WebGL
 * camera path and the count-ups are gated by their own useReducedMotion checks.)
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
