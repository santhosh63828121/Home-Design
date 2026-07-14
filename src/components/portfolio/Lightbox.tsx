'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import type { ImageAsset } from '@/data/portfolio'

/**
 * PREMIUM LIGHTBOX
 * ================
 * A full-bleed image viewer on a near-black ground, with the caption and the
 * counter set as quiet editorial captions rather than chrome. No skeuomorphic
 * frame, no rounded card, no "1 / 12" pill — the photograph is the whole point,
 * so everything else recedes.
 *
 * ACCESSIBILITY — the part most lightboxes get wrong:
 *   · role="dialog" aria-modal, labelled by the caption
 *   · focus is MOVED into the dialog on open and RESTORED to the trigger on close
 *   · Tab is trapped inside while open (otherwise a keyboard user tabs off into
 *     a page they cannot see and is stranded)
 *   · Escape closes, ← / → page, and the arrows have real accessible names
 *   · body scroll is locked while open
 *
 * Rendered through a portal to <body> so no ancestor's `transform` or
 * `overflow` can clip or mis-position it — this site is full of both.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: ImageAsset[]
  /** null = closed. */
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)
  const open = index !== null

  const next = useCallback(() => {
    if (index === null) return
    onIndex((index + 1) % images.length)
  }, [index, images.length, onIndex])

  const prev = useCallback(() => {
    if (index === null) return
    onIndex((index - 1 + images.length) % images.length)
  }, [index, images.length, onIndex])

  // Remember what had focus, move focus in, restore on close.
  useEffect(() => {
    if (!open) return
    restoreTo.current = document.activeElement as HTMLElement
    panelRef.current?.focus()
    return () => restoreTo.current?.focus?.()
  }, [open])

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  // Keys: Escape / arrows / Tab trap.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowRight') return next()
      if (e.key === 'ArrowLeft') return prev()
      if (e.key !== 'Tab') return

      // Trap: cycle focus within the dialog.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev, onClose])

  if (typeof document === 'undefined') return null

  const img = index !== null ? images[index] : null

  return createPortal(
    <AnimatePresence>
      {open && img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={img.alt || 'Project photograph'}
          ref={panelRef}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col bg-[#0E100B]/97 backdrop-blur-sm"
        >
          {/* Top bar — counter + close */}
          <div className="flex shrink-0 items-center justify-between px-gutter py-6">
            <span className="font-caps text-[10px] uppercase tracking-wide4 text-white/60">
              <span className="text-gold">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-white/30">/</span>
              {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* The plate */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-gutter">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  quality={82}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption + paging */}
          <div className="flex shrink-0 items-center justify-between gap-6 px-gutter py-8">
            <p className="max-w-xl text-sm leading-relaxed text-white/70">{img.alt}</p>
            {images.length > 1 && (
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photograph"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photograph"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
