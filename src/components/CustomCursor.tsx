'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Premium custom cursor — an inner dot that tracks 1:1, and an outer ring that
 * trails with spring-like inertia.
 *
 * PERFORMANCE
 *  - ONE rAF loop, started on first mousemove and parked when idle (no frame
 *    loop burning battery while the page is still).
 *  - Positions are written with `transform: translate3d(...)` directly to the
 *    DOM — no React state per frame, so React never re-renders while you move.
 *  - `mix-blend-mode: difference` makes it legible on both the dark cinematic
 *    hero and the light content pages without a second theme.
 *
 * ACCESSIBILITY
 *  - Mounts ONLY on a fine pointer (real mouse) with motion allowed. Touch
 *    devices and `prefers-reduced-motion` users keep their native cursor and
 *    never download the frame loop.
 *  - Purely decorative → aria-hidden. Keyboard focus is untouched.
 */

type Mode = 'default' | 'link' | 'text' | 'view'

const LERP = 0.18 // ring easing — lower = more inertia/trail

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('default')
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  // Only enable for a real cursor + motion-on users.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduce) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.dataset.cursor = 'custom'

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...target }
    let raf = 0
    let running = false

    const render = () => {
      // Ring eases toward the pointer → inertia + trail.
      ring.x += (target.x - ring.x) * LERP
      ring.y += (target.y - ring.y) * LERP

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }

      // Park the loop once the ring has caught up — no idle frames.
      const settled = Math.abs(target.x - ring.x) < 0.1 && Math.abs(target.y - ring.y) < 0.1
      if (settled) {
        running = false
        return
      }
      raf = requestAnimationFrame(render)
    }

    const wake = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(render)
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) setVisible(true)
      wake()

      // Resolve the cursor mode from what's under the pointer.
      const el = e.target as HTMLElement | null
      const hit = el?.closest?.('[data-cursor], a, button, input, textarea, select, label')
      if (!hit) {
        setMode((m) => (m === 'default' ? m : 'default'))
        return
      }
      const explicit = (hit as HTMLElement).dataset?.cursor as Mode | undefined
      let next: Mode = 'default'
      if (explicit) next = explicit
      else if (/^(INPUT|TEXTAREA|SELECT)$/.test(hit.tagName)) next = 'text'
      else if (/^(A|BUTTON|LABEL)$/.test(hit.tagName)) next = 'link'
      setMode((m) => (m === next ? m : next))
    }

    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      delete document.body.dataset.cursor
    }
    // `visible` is intentionally excluded — it's only read to avoid a redundant
    // setState, and including it would tear down the listeners on first move.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  // Ring geometry per mode. Scale only → composited.
  const ringSize =
    mode === 'link' || mode === 'view' ? 64 : mode === 'text' ? 4 : 34
  const ringScale = down ? 0.82 : 1

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[10000] hidden lg:block">
      {/* Outer ring — trails with inertia */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border border-white/80 mix-blend-difference"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          transform: 'translate3d(-100px,-100px,0)',
          transition:
            'width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), opacity .25s ease, background-color .3s ease',
          backgroundColor: mode === 'link' ? 'rgba(255,255,255,0.14)' : 'transparent',
          scale: String(ringScale),
          willChange: 'transform',
        }}
      />
      {/* Inner dot — tracks 1:1 */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-white mix-blend-difference"
        style={{
          width: mode === 'text' ? 2 : 6,
          height: mode === 'text' ? 22 : 6,
          borderRadius: mode === 'text' ? 2 : 999,
          opacity: visible ? 1 : 0,
          transform: 'translate3d(-100px,-100px,0)',
          transition: 'width .25s ease, height .25s ease, opacity .25s ease',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
