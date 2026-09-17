'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { HERO_SEQUENCE as SEQ } from '@/data/heroSequence'
import { routes } from '@/lib/routes'
import './sequence.css'

/**
 * IMAGE-SEQUENCE HERO — the homepage cinematography.
 * ============================================================================
 * The client's rendered walkthrough, extracted to 137 frames and scrubbed by
 * scroll on a <canvas>. Because it is REAL rendered footage played frame by
 * frame, it reads as a genuine photoreal 3D walkthrough — which is exactly what
 * the procedural WebGL house could never be. The WebGL "3D Model" system is left
 * completely untouched; it still serves /3d-walkthrough.
 *
 * ── PERFORMANCE ─────────────────────────────────────────────────────────────
 * · LCP is the <img> poster (58 KB webp), painted immediately, `priority`. A
 *   <canvas> is not an LCP candidate, so it can never be the bottleneck.
 * · The 137 frames (~3.3 MB, 25 KB each) start loading only AFTER window `load`
 *   — never in the LCP critical path. Until a frame is ready the canvas draws
 *   the nearest loaded one (the poster is frame 0's stand-in), so there is never
 *   a blank.
 * · Scroll is read with framer `useScroll` (a motion value — no React re-render
 *   per scroll) and drawing is throttled to one `drawImage` per animation frame.
 * · Desktop only. Mobile / reduced-motion / coarse-pointer get the poster still
 *   with a slow Ken-Burns (image sequences on mobile scroll are janky and heavy)
 *   — the same fallback discipline the rest of the site uses.
 *
 * ── SCROLL TRACK ────────────────────────────────────────────────────────────
 * A CSS sticky track (sequence.css), NOT a GSAP pin: the scroll length is real
 * SSR layout, so it can't shift (CLS 0) and is immune to ancestor transforms.
 *
 * The headline is a <p>, not an <h1> — ReleaseHero below keeps the page's single
 * <h1>, so heading order stays clean.
 */

const SCROLL_VH = 6 // must match --seq-vh in sequence.css
const frameUrl = (i: number) =>
  `${SEQ.dir}/${SEQ.frame}${String(i).padStart(SEQ.pad, '0')}${SEQ.ext}`

export default function ImageSequenceHero() {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)

  const frames = useRef<(HTMLImageElement | null)[]>([])
  const ready = useRef<boolean[]>([])
  const target = useRef(0) // desired frame index (float, 0..count-1)
  const drawn = useRef(-1)
  const rafPending = useRef(false)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    target.current = Math.max(0, Math.min(1, p)) * (SEQ.count - 1)
    scheduleDraw()
  })

  function scheduleDraw() {
    if (rafPending.current) return
    rafPending.current = true
    requestAnimationFrame(() => {
      rafPending.current = false
      drawNearest(Math.round(target.current))
    })
  }

  // Cover-fit an image onto the canvas (object-fit: cover, done by hand so we
  // control the source rect and never distort).
  function paint(img: HTMLImageElement) {
    const canvas = canvasRef.current
    if (!canvas || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  function drawNearest(index: number) {
    // Find the closest loaded frame to `index`, searching outward.
    let best = -1
    for (let d = 0; d < SEQ.count; d++) {
      const a = index - d
      const b = index + d
      if (a >= 0 && ready.current[a]) {
        best = a
        break
      }
      if (b < SEQ.count && ready.current[b]) {
        best = b
        break
      }
    }
    if (best === -1) {
      // Nothing loaded yet — fall back to the poster so the canvas is never blank.
      const p = posterRef.current
      if (p?.naturalWidth) paint(p)
      return
    }
    if (best === drawn.current) return
    const img = frames.current[best]
    if (img) {
      paint(img)
      drawn.current = best
    }
  }

  useEffect(() => {
    // Enable the canvas sequence only where it belongs: wide viewport, fine
    // pointer, motion allowed. Everyone else keeps the poster still (CSS hides
    // the canvas below 1024px anyway; this guard stops us from DOWNLOADING 3.3 MB
    // of frames on a phone).
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !wide || !fine) return

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.classList.add('is-on')

    let disposed = false

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const stage = canvas.parentElement
      const w = stage?.clientWidth ?? window.innerWidth
      const h = stage?.clientHeight ?? window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      drawn.current = -1 // force a redraw at the new size
      drawNearest(Math.round(target.current))
    }
    sizeCanvas()
    window.addEventListener('resize', sizeCanvas, { passive: true })

    // Draw the poster into the canvas the moment it is available, so the canvas
    // never fades in blank.
    const poster = posterRef.current
    if (poster?.complete && poster.naturalWidth) paint(poster)
    else if (poster) poster.addEventListener('load', () => !disposed && paint(poster), { once: true })

    // Load the sequence AFTER the page has loaded — never in the LCP path.
    // Loaded in order, so the frames the user sees first arrive first.
    frames.current = new Array(SEQ.count).fill(null)
    ready.current = new Array(SEQ.count).fill(false)

    const loadFrom = (start: number) => {
      let i = start
      const CONCURRENCY = 6
      let active = 0
      const pump = () => {
        while (active < CONCURRENCY && i < SEQ.count) {
          const idx = i++
          active++
          const img = new Image()
          img.decoding = 'async'
          img.src = frameUrl(idx)
          img.onload = () => {
            if (disposed) return
            frames.current[idx] = img
            ready.current[idx] = true
            active--
            // If this is near where we are looking, refresh the frame.
            if (Math.abs(idx - Math.round(target.current)) <= 2) drawNearest(Math.round(target.current))
            pump()
          }
          img.onerror = () => {
            active--
            pump()
          }
        }
      }
      pump()
    }

    const begin = () => !disposed && loadFrom(0)
    if (document.readyState === 'complete') setTimeout(begin, 200)
    else window.addEventListener('load', () => setTimeout(begin, 200), { once: true })

    return () => {
      disposed = true
      window.removeEventListener('resize', sizeCanvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <div
      id="walkthrough"
      data-hero-dark
      ref={trackRef}
      className="seq-track"
      style={{ ['--seq-vh' as string]: SCROLL_VH }}
      aria-label="RGL Décors — luxury home walkthrough"
    >
      <div className="seq-stage">
        {/* Poster = LCP. A plain <img> of an already-optimised same-origin webp;
            next/image would only re-encode a 58 KB file for nothing. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={posterRef}
          src={`${SEQ.dir}/poster.webp`}
          alt="A luxury home entrance by RGL Décors, Chennai"
          className="seq-poster"
          // camelCase: React 19 emits the lowercase DOM attribute. The lowercased
          // `fetchpriority` spelling triggers an "invalid DOM property" dev warning
          // (the "1 Issue" badge) — this is the correct casing.
          fetchPriority="high"
          decoding="async"
        />

        <canvas ref={canvasRef} className="seq-canvas" aria-hidden="true" />

        <div className="seq-grade" aria-hidden="true" />

        {/* Copy — BOTTOM-ANCHORED on every breakpoint.
            Centering a four-line display headline pushed its top under the fixed
            header and its foot past the CTA (the reported "doesn't fit" bug).
            Anchored to the foot, the block sits in the lower third over the
            photograph — the editorial default — and can never collide with the
            header. `pt-28` guarantees clearance from the bar even on a very short
            viewport; the padding-bottom leaves room for the scroll cue. */}
        <div className="seq-content">
          <div className="shell flex h-full flex-col justify-end pt-28 pb-[clamp(5rem,12vh,7.5rem)]">
            <div className="max-w-[58rem]">
              <p
                className="hero-fade font-caps text-[10px] uppercase tracking-wide4 text-gold"
                style={{ ['--d' as string]: '150ms' }}
              >
                RGL Décors · Interior Designers in Chennai
              </p>

              <span
                aria-hidden="true"
                className="hero-rule mt-6 block h-px w-16 bg-gold"
                style={{ ['--d' as string]: '300ms' }}
              />

              {/* text-display, NOT display-xl. display-xl (up to 8.5rem) is a
                  one-line impact size; this headline is three lines, so at
                  display-xl it overran the viewport and the italic line wrapped
                  to a fourth line. display (up to 5.5rem) keeps it large and
                  editorial while "design to define you." stays on ONE line. */}
              <p className="mt-8 font-serif text-display font-light leading-[0.98] text-white">
                {['More than', 'premium spaces —'].map((line, i) => (
                  <span key={line} className="hero-mask block overflow-hidden pb-[0.06em]">
                    <span
                      className="hero-rise block"
                      style={{ ['--d' as string]: `${350 + i * 120}ms` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
                <span className="hero-mask block overflow-hidden pb-[0.06em]">
                  <span
                    className="hero-rise block italic text-gold"
                    style={{ ['--d' as string]: '590ms' }}
                  >
                    design to define you.
                  </span>
                </span>
              </p>

              <div
                className="hero-fade mt-9 flex flex-wrap items-center gap-6"
                style={{ ['--d' as string]: '800ms' }}
              >
                <Link href={routes.getQuote} className="btn-pill btn-gold">
                  Start your design journey
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href={routes.walkthrough}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-white/85"
                >
                  Open the 3D walkthrough
                </Link>
              </div>
            </div>

            {/* Scroll cue */}
            <div
              aria-hidden="true"
              className="hero-fade pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/70"
              style={{ ['--d' as string]: '1200ms' }}
            >
              <span className="font-caps text-[9px] uppercase tracking-wide4">Scroll</span>
              <ChevronDown size={15} className="animate-bounceArrow motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
