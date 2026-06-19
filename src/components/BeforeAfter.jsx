import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, viewportOnce } from '../animations/variants.js'
import { BEFORE_AFTER } from '../data/content.js'

/**
 * Final Section — Before / After transformation showcase.
 * Each card is a draggable slider: the "after" image is clipped to the
 * handle position so users wipe between the original space and the finished
 * RGL interior. Works with mouse, touch and keyboard (arrow keys on the range).
 */
function Reveal({ item }) {
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
        <img
          src={item.after}
          alt={`${item.label} — after`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* BEFORE (clipped to handle) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
          aria-hidden="true"
        >
          <img
            src={item.before}
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
          aria-label={`Reveal slider for ${item.label}`}
          className="absolute inset-x-0 bottom-2 z-20 mx-auto w-[90%] cursor-pointer opacity-0 focus-visible:opacity-100"
        />
      </div>
      <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 font-caps text-[11px] uppercase tracking-wide2 text-white backdrop-blur-sm">
        {item.label}
      </figcaption>
    </figure>
  )
}

export default function BeforeAfter() {
  return (
    <section id="transformations" aria-labelledby="ba-heading" className="bg-background py-20 sm:py-[100px]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>Before &amp; After</Eyebrow>
          <Heading id="ba-heading" className="mt-4 text-3xl sm:text-[3.5rem]">
            The RGL
            <br />
            Transformation
          </Heading>
          <p className="mt-4 text-sm text-muted">Drag the handle to reveal the difference.</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {BEFORE_AFTER.map((item) => (
            <Reveal key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
