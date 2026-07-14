'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * THE PLATE — the site's image-composition primitives.
 * ============================================================================
 * A "plate" is a photograph presented as an object with weight: it is framed, it
 * catches light, and it moves a little as you move. These three components are
 * how every image on the site gets that, without any page re-implementing it.
 *
 *   <TiltPlate>      3D tilt + mouse-tracked depth. Desktop only.
 *   <ParallaxPlate>  scroll-linked drift, so the image and its frame move at
 *                    different speeds. This is what creates depth.
 *   <MaskPlate>      clip-path curtain reveal.
 *
 * They compose: <ParallaxPlate><TiltPlate>…</TiltPlate></ParallaxPlate>.
 *
 * ── PERFORMANCE, WHICH IS NOT NEGOTIABLE ───────────────────────────────────
 * · Everything is a framer MOTION VALUE. Motion values are written straight to
 *   the DOM — React never re-renders on pointer move or scroll. A naive
 *   `onMouseMove -> setState` tilt re-renders the tree on every mouse event and
 *   will absolutely destroy the frame budget.
 * · Transform and opacity ONLY. No width/height/top/left, so nothing ever
 *   triggers layout — every frame is composited.
 * · `will-change` is TRANSIENT: raised on hover, dropped on leave. Blanket
 *   `will-change: transform` on every image promotes each one to its own
 *   permanent GPU layer — measured on this codebase as a real regression
 *   (portfolio LCP 2.0s → 3.9s).
 * · Tilt listens on the ELEMENT, not the window, and only while hovered.
 *
 * ── ANCESTOR TRANSFORMS ────────────────────────────────────────────────────
 * TiltPlate applies `perspective` + `transform`, which creates a containing
 * block and would shatter any `position: fixed` descendant. It never wraps one.
 * `position: sticky` is unaffected by this rule, which is exactly why the
 * cinematic track and the case-study rail use sticky and not a fixed pin.
 *
 * ── REDUCED MOTION ─────────────────────────────────────────────────────────
 * Every component collapses to a plain static frame. No tilt, no parallax, no
 * mask — the photograph is simply there.
 */

/* ────────────────────────────────────────────────────────────────────────── */

export function TiltPlate({
  children,
  className = '',
  /** Max tilt in degrees. 6 is the ceiling before it reads as a gimmick. */
  strength = 5,
  /** How far the inner content counter-moves. Creates the parallax depth. */
  depth = 12,
}: {
  children: ReactNode
  className?: string
  strength?: number
  depth?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // −0.5 … 0.5, the pointer's position within the element.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  // Springs, so the plate settles rather than snapping to the cursor.
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [strength, -strength])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-strength, strength])
  // The content drifts the OTHER way to the tilt — that opposition is what the
  // eye reads as depth rather than as a wobbling card.
  const tx = useTransform(sx, [-0.5, 0.5], [depth, -depth])
  const ty = useTransform(sy, [-0.5, 0.5], [depth, -depth])

  if (reduce) return <div className={className}>{children}</div>

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onEnter = () => {
    if (ref.current) ref.current.style.willChange = 'transform'
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    // Drop the layer once the spring has settled — never leave it promoted.
    setTimeout(() => {
      if (ref.current) ref.current.style.willChange = 'auto'
    }, 600)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
      className={className}
    >
      {/* NO `transformStyle: preserve-3d` HERE — and that is deliberate.
          A preserve-3d subtree is not reliably clipped by an ancestor's
          `overflow: hidden` or `clip-path`: the browser lifts it out of the
          clipping context. Composed with MaskPlate that broke the portfolio
          outright — the tilted photograph escaped its frame entirely, and the
          mask's clip-path never painted, so two of four cards rendered with no
          image at all.
          We are not nesting 3D children, so preserve-3d buys nothing. rotateX /
          rotateY work perfectly without it, and the plate stays inside its box. */}
      <motion.div style={{ rotateX, rotateY }} className="h-full w-full">
        <motion.div style={{ x: tx, y: ty, scale: 1.06 }} className="h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

export function ParallaxPlate({
  children,
  className = '',
  /** Total travel in px across the whole scroll pass. Keep it small. */
  distance = 60,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      {/* Scaled slightly so the drift never exposes an edge of the frame. */}
      <motion.div style={{ y }} className="h-full w-full scale-[1.12]">
        {children}
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

export function MaskPlate({
  children,
  className = '',
  /** Which edge the photograph is revealed from. */
  from = 'bottom',
  delay = 0,
  /** Curtain colour. Match the section behind the plate. */
  curtain = 'bg-background',
}: {
  children: ReactNode
  className?: string
  from?: 'bottom' | 'left' | 'right'
  delay?: number
  curtain?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  if (reduce) return <div className={className}>{children}</div>

  /**
   * A CURTAIN THAT SLIDES AWAY — not `clip-path`. This is a bug fix, and the
   * reason is worth knowing, because it is a genuine trap.
   *
   * The obvious way to write this reveal is `clip-path: inset(100%)` on the
   * wrapper, animating to `inset(0)`. It renders correctly and it is completely
   * broken: clipping the wrapper to zero area also zeroes the *intersection rect*
   * of the <img> inside it. Chrome's native lazy-loader therefore never sees the
   * image enter the viewport, never requests it, and the photograph is NEVER
   * FETCHED — probed as `complete: false, naturalWidth: 0`, with no network
   * request at all. Half the portfolio rendered as empty boxes.
   *
   * So: the photograph is never clipped. A solid curtain sits ON TOP of it and
   * slides off in the `from` direction. The image is fully laid out and loads
   * exactly as it always would; the reveal is identical to the eye. Both the
   * curtain and the counter-scale are transforms, so it is still compositor-only.
   */
  const off =
    from === 'left'
      ? 'translate3d(100%, 0, 0)' // curtain exits right → image revealed from the left
      : from === 'right'
        ? 'translate3d(-100%, 0, 0)'
        : 'translate3d(0, -100%, 0)' // curtain lifts → image revealed from the foot

  /**
   * NEVER inject a position class over the caller's. The curtain needs a
   * positioned ancestor, so this used to prepend `relative` unconditionally —
   * which quietly destroyed every plate whose caller passed `absolute inset-0`.
   *
   * Tailwind emits `.relative` AFTER `.absolute` in its stylesheet, so the
   * injected `relative` WON the cascade regardless of class order. The mask
   * stopped filling its frame, its height collapsed to `auto`, and every `h-full`
   * beneath it resolved to zero — the photograph rendered 362px wide and 0px
   * tall. Class order in the attribute means nothing; source order in the CSS is
   * what decides.
   *
   * So: only supply `relative` when the caller has not positioned the element.
   */
  const positioned = /\b(absolute|fixed|sticky|relative)\b/.test(className)

  return (
    <div
      ref={ref}
      className={`${positioned ? '' : 'relative'} overflow-hidden ${className}`}
    >
      {/* The photograph counter-scales as the curtain leaves. The reveal and the
          push-in are two SEPARATE motions — that opposition is what makes it read
          as filmed rather than as a widget sliding in. */}
      <div
        className="h-full w-full"
        style={{
          transform: inView ? 'scale(1)' : 'scale(1.16)',
          transition: `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {children}
      </div>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${curtain}`}
        style={{
          transform: inView ? off : 'translate3d(0, 0, 0)',
          transition: `transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      />
    </div>
  )
}
