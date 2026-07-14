'use client'

import { useEffect, useRef, useState } from 'react'

export type LegalTocItem = { id: string; heading: string }

/**
 * THE SECTION INDEX
 * =================
 * Legal documents are long, and a long document without an index is a document
 * nobody reads to the end. This is the quiet fix: a sticky column of section
 * links that tracks where you are.
 *
 * It is deliberately not decorated. No progress bar, no percentage, no easing
 * flourish — a hairline rail, a set of links, and one olive marker that slides
 * to the section you are reading. Restraint is the point on a page whose job is
 * to be trusted.
 *
 * ACCESSIBILITY
 * - These are real <a href="#id"> links inside a real <nav>, so they are
 *   keyboard-reachable and operable with no JS at all. The IntersectionObserver
 *   only adds a highlight; if it never runs, the index still works.
 * - The active link carries aria-current="location".
 * - `scroll-behavior: smooth` + `scroll-padding-top` are already global, so an
 *   anchor jump lands below the fixed navbar rather than under it.
 *
 * MOTION TRAP (DESIGN-SYSTEM §5.2): the observer is attached to the <h2>
 * headings themselves, which are NEVER transformed. Observing an element that
 * starts translated out of its own box measures the wrong geometry and can
 * simply never fire.
 */
export default function LegalToc({ items }: { items: LegalTocItem[] }) {
  const [active, setActive] = useState<string>('')
  const visible = useRef<Map<string, boolean>>(new Map())

  useEffect(() => {
    if (items.length === 0) return

    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.current.set(entry.target.id, entry.isIntersecting)
        }
        // The topmost heading inside the reading band wins. If the band is empty
        // — i.e. you are deep inside a long section — we simply keep the last
        // active id rather than flickering back to nothing.
        const current = items.find((i) => visible.current.get(i.id))
        if (current) setActive(current.id)
      },
      // A thin band just under the fixed navbar: from 96px down to 35% of the
      // viewport. A heading entering this band is the one you are now reading.
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Section index"
      className="hidden lg:block"
      // The sticky column lives in its own grid cell, so it can be tall without
      // affecting the prose measure beside it.
    >
      <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
        <p className="font-caps text-[10px] uppercase tracking-wide4 text-muted">Contents</p>
        <span aria-hidden="true" className="mt-4 block h-px w-10 bg-gold" />

        <ol className="mt-6 space-y-px border-l border-divider">
          {items.map((item) => {
            const isActive = item.id === active
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={[
                    // -1px pulls each link's own left rule exactly over the
                    // shared hairline rail, so the active marker replaces the
                    // rail rather than sitting beside it.
                    'block -ml-px border-l py-2 pl-4 text-[13px] leading-snug transition-colors duration-300 ease-lux',
                    isActive
                      ? 'border-accent font-medium text-ink'
                      : 'border-transparent text-muted hover:border-divider hover:text-ink',
                  ].join(' ')}
                >
                  {item.heading}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
