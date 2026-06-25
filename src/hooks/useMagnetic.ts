'use client'

import { useRef } from 'react'
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion'

/**
 * Magnetic-pull hook. Returns a ref + spring-smoothed x/y MotionValues that nudge
 * the element toward the cursor while hovered, snapping back on leave.
 *
 * Disabled (returns inert values + no-op handlers) under prefers-reduced-motion
 * or on coarse pointers (touch) — so it only ever runs where a real cursor
 * exists. Pure transform → no layout cost.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 })

  const fine =
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches
  const enabled = !reduce && fine

  const onMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    ref,
    enabled,
    handlers: enabled ? { onMouseMove, onMouseLeave } : {},
    style: { x: sx as MotionValue<number>, y: sy as MotionValue<number> },
  }
}
