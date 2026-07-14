'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import { TiltPlate } from '@/components/motion/Plate'
import type { ImageAsset } from '@/data/portfolio'

/**
 * LUXURY GALLERY — editorial masonry + room-wise navigation + premium lightbox.
 *
 * ROOM NAVIGATION is data-driven and self-gating: the room rail appears only if
 * two or more images actually carry a `room`. A project whose photographs are
 * unlabelled simply shows one continuous spread — never an empty filter bar, and
 * never a room invented to fill it.
 *
 * PREMIUM LOADING: each plate sits on the `.skeleton` shimmer and fades in on
 * decode (`onLoad`), so a slow connection sees a calm, branded placeholder
 * settle into a photograph — not a stack of jumping grey boxes. The aspect
 * ratios are fixed in CSS, so nothing reflows: CLS 0.
 */
export default function ProjectGalleryLux({ images }: { images: ImageAsset[] }) {
  const reduce = useReducedMotion()
  const [room, setRoom] = useState<string>('All')
  const [open, setOpen] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  const rooms = useMemo(() => {
    const present = Array.from(new Set(images.map((i) => i.room).filter(Boolean))) as string[]
    return present.length > 1 ? ['All', ...present] : []
  }, [images])

  const shown = useMemo(
    () => (room === 'All' ? images : images.filter((i) => i.room === room)),
    [images, room],
  )

  if (!images.length) return null

  return (
    <div>
      {rooms.length > 0 && (
        <nav
          aria-label="Filter photographs by room"
          className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-divider pb-6"
        >
          <span className="w-16 shrink-0 font-caps text-[10px] uppercase tracking-wide2 text-muted">
            Room
          </span>
          {rooms.map((r) => {
            const on = r === room
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRoom(r)}
                aria-pressed={on}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-500 ${
                  on
                    ? 'bg-accent text-white'
                    : 'border border-divider bg-white text-ink/75 hover:border-accent hover:text-accent'
                }`}
              >
                {r}
              </button>
            )
          })}
        </nav>
      )}

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {shown.map((img, i) => {
          // Index within the FULL set, so the lightbox pages through everything
          // the visitor can currently see — not the index within the filter.
          const lightboxIndex = images.indexOf(img)
          const isLoaded = loaded[img.src]
          return (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setOpen(lightboxIndex)}
              aria-label={`View photograph: ${img.alt}`}
              data-cursor="view"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(i, 5) * 0.05,
              }}
              // The cursor becomes the room's name, then the photograph itself.
              // Declared here, resolved globally — the gallery implements none of it.
              data-cursor-label={img.room ? `View ${img.room}` : 'View'}
              data-cursor-image={img.src}
              className={`lux-media group relative block w-full break-inside-avoid overflow-hidden bg-bone ${
                isLoaded ? '' : 'skeleton'
              }`}
            >
              <TiltPlate className="h-full w-full" strength={3} depth={8}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width ?? 1200}
                  height={img.height ?? 1500}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={72}
                  onLoad={() => setLoaded((s) => ({ ...s, [img.src]: true }))}
                  className={`h-auto w-full transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </TiltPlate>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-olive-deep/25 opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
              />

              {/* Glass caption — the room name floats up over the plate. */}
              {img.room && (
                <span
                  aria-hidden="true"
                  className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between px-5 py-4 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                >
                  <span className="font-caps text-[10px] uppercase tracking-wide2 text-gold">
                    {img.room}
                  </span>
                  <Maximize2 size={14} className="text-white/80" />
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  )
}
