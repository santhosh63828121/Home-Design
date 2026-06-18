import { useEffect, useRef, useState } from 'react'

/**
 * Premium, rAF-throttled parallax.
 * Returns a ref to attach to the scrolling section and the current translateY
 * offset (in px) for the background layer. The background moves at `speed`x the
 * page scroll, creating depth without janky scroll listeners.
 *
 * Honors prefers-reduced-motion by disabling the effect entirely.
 */
export default function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Only compute while the section is anywhere near the viewport.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      // Distance the section top has travelled past the viewport top.
      const progress = rect.top
      setOffset(progress * -speed)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return { ref, offset }
}
