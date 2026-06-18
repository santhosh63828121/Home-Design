import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight IntersectionObserver reveal hook for components that want
 * imperative control (e.g. the count-up trigger) instead of Framer's
 * `whileInView`. Fires once when `threshold` of the element is visible.
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // reveal once, then stop observing
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
