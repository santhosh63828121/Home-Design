'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * THE CURSOR
 * ==========
 * A dot that tracks 1:1, a ring that trails with inertia, and — the part that
 * makes it feel authored rather than bolted on — a ring that can *become* a
 * label ("View project") or a photographic preview of what you are hovering.
 *
 * Anything on the page can drive it, declaratively, with no wiring:
 *
 *   data-cursor="view"                     → ring swells
 *   data-cursor-label="View project"       → ring becomes a filled label
 *   data-cursor-image="/some.jpg"          → ring becomes a floating plate
 *   data-cursor="text"                     → ring collapses to a caret
 *
 * PERFORMANCE — this is the whole reason it is written this way.
 *  · ONE rAF loop. It starts on first mousemove and PARKS when the ring settles,
 *    so a still page burns zero frames.
 *  · Position is written straight to the DOM as `translate3d(...)`. React never
 *    re-renders on movement, and — critically — the transform NEVER appears in a
 *    style prop. It used to: React then clobbered it back to its initial value on
 *    every hover/click re-render, and because the loop parks when settled,
 *    nothing was left running to correct it. The dot and ring were stranded
 *    mid-page as two stray circles. The loop owns the transform. React does not.
 *  · The label/preview is ONE element that morphs (width/height/opacity), not a
 *    second cursor. Nothing is mounted or unmounted while you move.
 *
 * ACCESSIBILITY — mounts only on a fine pointer with motion allowed, so touch
 * and reduced-motion users keep their native cursor and never download the loop.
 * Purely decorative → aria-hidden. Focus is untouched.
 */

type Mode = 'default' | 'link' | 'text' | 'view'

const LERP = 0.16 // ring easing — lower = more trail

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState<Mode>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

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

    // Park off-screen imperatively — never via a style prop (see the note above).
    const park = (el: HTMLDivElement | null) => {
      if (el) el.style.transform = 'translate3d(-200px, -200px, 0) translate(-50%, -50%)'
    }
    park(dotRef.current)
    park(ringRef.current)

    const render = () => {
      ring.x += (target.x - ring.x) * LERP
      ring.y += (target.y - ring.y) * LERP

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }

      if (Math.abs(target.x - ring.x) < 0.1 && Math.abs(target.y - ring.y) < 0.1) {
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

      const el = e.target as HTMLElement | null
      const hit = el?.closest?.(
        '[data-cursor], [data-cursor-label], [data-cursor-image], a, button, input, textarea, select, label',
      ) as HTMLElement | null

      if (!hit) {
        setMode((m) => (m === 'default' ? m : 'default'))
        setLabel((l) => (l === null ? l : null))
        setImage((i) => (i === null ? i : null))
        return
      }

      const nextLabel = hit.dataset.cursorLabel ?? null
      const nextImage = hit.dataset.cursorImage ?? null
      const explicit = hit.dataset.cursor as Mode | undefined

      let next: Mode = 'default'
      if (explicit) next = explicit
      else if (/^(INPUT|TEXTAREA|SELECT)$/.test(hit.tagName)) next = 'text'
      else if (/^(A|BUTTON|LABEL)$/.test(hit.tagName)) next = 'link'

      setMode((m) => (m === next ? m : next))
      setLabel((l) => (l === nextLabel ? l : nextLabel))
      setImage((i) => (i === nextImage ? i : nextImage))
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
    // `visible` is read only to avoid a redundant setState; including it would
    // tear the listeners down on first move.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  const isPreview = !!image
  const isLabel = !!label && !image

  // The ring is ONE element with three personalities. It morphs between them —
  // it is never swapped out, so there is no mount/unmount cost while moving.
  const w = isPreview ? 260 : isLabel ? 128 : mode === 'text' ? 2 : mode === 'link' || mode === 'view' ? 64 : 32
  const h = isPreview ? 320 : isLabel ? 128 : mode === 'text' ? 26 : mode === 'link' || mode === 'view' ? 64 : 32

  // `mix-blend-difference` is dropped the moment the ring carries content —
  // blended white text over a photograph is unreadable, and an inverted
  // photographic preview is grotesque. Content ⇒ normal blending.
  const blend = isPreview || isLabel ? 'normal' : 'difference'

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[10000] hidden lg:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 overflow-hidden"
        style={{
          width: w,
          height: h,
          borderRadius: isPreview ? 2 : isLabel ? 999 : mode === 'text' ? 2 : 999,
          border: isPreview || isLabel ? 'none' : '1px solid rgba(255,255,255,0.8)',
          background: isLabel
            ? '#C5A572'
            : isPreview
              ? '#2C3222'
              : mode === 'link'
                ? 'rgba(255,255,255,0.14)'
                : 'transparent',
          mixBlendMode: blend as React.CSSProperties['mixBlendMode'],
          opacity: visible ? 1 : 0,
          scale: String(down ? 0.9 : 1),
          boxShadow: isPreview ? '0 30px 60px -30px rgba(0,0,0,0.6)' : 'none',
          transition:
            'width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), border-radius .5s cubic-bezier(.22,1,.36,1), background-color .4s ease, opacity .25s ease, scale .3s cubic-bezier(.22,1,.36,1)',
          willChange: 'transform',
        }}
      >
        {/* Preview plate. A plain <img>, not next/image: the src is decided at
            hover time from a data attribute, and it is already in the page's
            cache (it is the card you are pointing at), so there is nothing to
            optimise and no layout to reserve. */}
        {isPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: 0.92 }}
          />
        )}

        {isLabel && (
          <span className="grid h-full w-full place-items-center px-3 text-center font-caps text-[10px] uppercase leading-tight tracking-wide2 text-ink">
            {label}
          </span>
        )}
      </div>

      {/* The dot hides whenever the ring is carrying content — a stray dot in the
          middle of a photographic preview looks like a dead pixel. */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-white mix-blend-difference"
        style={{
          width: mode === 'text' ? 2 : 6,
          height: mode === 'text' ? 22 : 6,
          borderRadius: mode === 'text' ? 2 : 999,
          opacity: visible && !isPreview && !isLabel ? 1 : 0,
          transition: 'width .25s ease, height .25s ease, opacity .25s ease',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
