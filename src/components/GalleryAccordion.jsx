import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eyebrow, Heading } from './ui/Typography.jsx'
import { fadeUp, viewportOnce } from '../animations/variants.js'
import { GALLERY } from '../data/content.js'

/**
 * Section 5 — curated spaces accordion gallery.
 * Desktop: 5 flex panels; the active panel grows (flex 3.5), others compress
 * (flex 0.5) on hover/focus. Mobile: vertical stack, tap to expand.
 * Driven by an `active` index so it works with mouse, keyboard AND touch.
 */
export default function GalleryAccordion() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-background py-20 sm:py-[100px]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>Workspace Gallery</Eyebrow>
          <Heading id="gallery-heading" className="mt-4 text-3xl sm:text-[3.5rem]">
            Explore Our Curated
            <br />
            Spaces
          </Heading>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-col gap-3 md:h-[520px] md:flex-row"
          onMouseLeave={() => setActive(0)}
        >
          {GALLERY.map((panel, i) => {
            const isActive = active === i
            return (
              <motion.button
                key={panel.id}
                type="button"
                aria-label={`${panel.label} — ${panel.description}`}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: isActive ? 3.5 : 0.5 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className={`group relative h-72 flex-1 cursor-pointer overflow-hidden rounded-xl text-left md:h-full ${
                  isActive ? 'md:flex-[3.5]' : 'md:flex-[0.5]'
                }`}
              >
                <img
                  src={panel.image}
                  alt={panel.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Permanent bottom gradient for label legibility */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-80' : 'opacity-100'
                  }`}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-caps text-sm uppercase tracking-caps text-white drop-shadow">
                    {panel.label}
                  </span>
                  <p
                    className={`mt-2 max-w-xs text-sm leading-relaxed text-white/90 transition-all duration-500 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
                  >
                    {panel.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
