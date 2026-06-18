import { motion } from 'framer-motion'
import { slideLeft, viewportOnce } from '../animations/variants.js'
import { ROOM_SLIDES } from '../data/content.js'

/**
 * Section 2 — three full-viewport immersive room slides.
 * Data-driven: each slide is 100vh with a right-aligned info card that fades
 * in from the right as it enters the viewport. On mobile the card drops to the
 * bottom and spans full width.
 */
function RoomSlide({ slide }) {
  return (
    <article
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden md:justify-end"
    >
      <img
        src={slide.image}
        alt={slide.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-5 mb-8 w-full max-w-md self-end rounded-2xl bg-ink/70 p-8 text-white backdrop-blur-sm md:mx-0 md:mr-12 md:mb-0 md:w-[280px] md:self-center lg:mr-20"
      >
        <p className="font-caps text-[11px] uppercase tracking-wide2 text-amber-300">
          {slide.label}
        </p>
        <h3 className="mt-3 font-serif text-4xl font-bold">{slide.heading}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/85">{slide.body}</p>
        <a
          href="#gallery"
          className="btn-pill mt-6 border border-accent bg-transparent text-white hover:bg-accent"
        >
          Explore Style <span aria-hidden="true">→</span>
        </a>
      </motion.div>
    </article>
  )
}

export default function RoomSlides() {
  return (
    <section aria-label="Interior styles">
      {ROOM_SLIDES.map((slide) => (
        <RoomSlide key={slide.id} slide={slide} />
      ))}
    </section>
  )
}
