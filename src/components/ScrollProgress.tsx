'use client'

import { useEffect, useRef } from 'react'

/**
 * Top scroll-progress bar — deliberately framer-free. The initial render is a
 * static 3px bar (scaleX 0); the scroll listener attaches in an effect AFTER
 * first paint, so it never touches the LCP critical path. Updates are
 * rAF-throttled and pure transform (zero layout shift), and at rest it does no
 * work at all. A position indicator, not an animation — so it's inherently
 * reduced-motion-safe (it tracks scroll directly, with no easing).
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    // Cache the scrollable distance; recompute only on resize. Reading
    // scrollHeight every scroll frame forces a sync reflow that thrashes against
    // the cinematic's GSAP pin (→ layout instability). Per scroll frame we only
    // read window.scrollY (no forced layout) and write a transform.
    const measure = () => document.documentElement.scrollHeight - window.innerHeight
    let max = measure()
    const update = () => {
      const el = ref.current
      if (!el) return
      // Self-heal a stale `max` (GSAP's pin spacer grows the page after refresh)
      // without reading layout every frame — only when scroll exceeds the cache.
      if (window.scrollY > max) max = measure()
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      max = measure()
      update()
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('load', onResize, { once: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-accent"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
