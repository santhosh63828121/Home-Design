'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

// Hoisted so the motion-wrapped Link isn't recreated (and remounted) each render.
const MotionLink = motion(Link)

type Props = {
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  children: ReactNode
} & Record<string, unknown>

/**
 * Magnetic-pull button/link. The framer MotionValues/springs live ONLY in the
 * inner component, which mounts exclusively on desktop fine-pointer + motion-on
 * devices. On touch/mobile/SSR it's a plain Link/button with ZERO framer runtime
 * (no spring frame-loop, no TBT cost) — so it never degrades mobile performance.
 */
function MagneticInner({ href, onClick, className, strength, children, ...rest }: Props) {
  const { ref, handlers, style } = useMagnetic(strength)
  return href ? (
    <MotionLink
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={className}
      style={style}
      {...handlers}
      {...rest}
    >
      {children}
    </MotionLink>
  ) : (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={className}
      style={style}
      {...handlers}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default function MagneticButton({ href, onClick, className, strength, children, ...rest }: Props) {
  // Plain by default (SSR + mobile + touch + reduced-motion). Only desktop
  // fine-pointer, motion-on devices upgrade to the magnetic version after mount.
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduce) setEnabled(true)
  }, [])

  if (!enabled) {
    return href ? (
      <Link href={href} onClick={onClick} className={className} {...rest}>
        {children}
      </Link>
    ) : (
      <button type="button" onClick={onClick} className={className} {...rest}>
        {children}
      </button>
    )
  }

  return (
    <MagneticInner href={href} onClick={onClick} className={className} strength={strength} {...rest}>
      {children}
    </MagneticInner>
  )
}
