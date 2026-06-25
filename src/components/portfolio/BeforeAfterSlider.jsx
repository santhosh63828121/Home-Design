'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

/**
 * Reusable before/after reveal slider (drag the handle or use the range).
 * Shared by the home "Transformation" section and the case-study template.
 * The AFTER image is optimized via next/image; the BEFORE image stays a plain
 * <img> because it needs the inline width trick to stay full-bleed inside the
 * clipped wrapper (next/image fill can't do that). Works with mouse, touch and
 * keyboard.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  beforeAlt = '',
  afterSrc,
  afterAlt = '',
  label,
}) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const move = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }, [])

  return (
    <figure className="group relative overflow-hidden rounded-2xl shadow-card">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none"
        onMouseDown={() => (dragging.current = true)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onMouseMove={(e) => dragging.current && move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        {/* AFTER (base) */}
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        {/* BEFORE (clipped to handle) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${10000 / pos}%`, maxWidth: 'none' }}
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 font-caps text-[10px] uppercase tracking-wide2 text-white">
            Before
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-3 py-1 font-caps text-[10px] uppercase tracking-wide2 text-white">
          After
        </span>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex items-center"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-0.5 bg-white/90 shadow" />
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-card">
            <span className="text-xs">↔</span>
          </div>
        </div>

        {/* Accessible control */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal slider${label ? ` for ${label}` : ''}`}
          className="absolute inset-x-0 bottom-2 z-20 mx-auto w-[90%] cursor-pointer opacity-0 focus-visible:opacity-100"
        />
      </div>
      {label && (
        <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 font-caps text-[11px] uppercase tracking-wide2 text-white backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  )
}
