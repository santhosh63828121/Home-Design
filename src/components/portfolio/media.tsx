'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { RenderVsRealPair } from '@/data/portfolio'

/**
 * 3D-vs-final toggle — flips between the design render and the finished photo.
 * Render it only when both images exist (caller guards with hasRenderVsReal).
 */
export function RenderVsReal({ pair }: { pair: RenderVsRealPair }) {
  const [showReal, setShowReal] = useState(true)
  const active = showReal ? pair.real : pair.render
  return (
    <div>
      <div className="mb-3 inline-flex rounded-full border border-divider bg-white p-1">
        {[
          { id: 'render', label: '3D Render' },
          { id: 'real', label: 'Final Photo' },
        ].map((opt) => {
          const isActive = (opt.id === 'real') === showReal
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setShowReal(opt.id === 'real')}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-1.5 font-caps text-xs tracking-caps transition-colors ${
                isActive ? 'bg-accent text-white' : 'text-ink'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-card">
        <Image src={active.src} alt={active.alt} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
      </div>
    </div>
  )
}

/**
 * Privacy-friendly YouTube facade — loads only a thumbnail until clicked, then
 * swaps in the youtube-nocookie iframe (keeps the page light for CWV).
 * Render it only when an id exists (caller guards with hasVideo).
 */
export function YouTubeEmbed({ id, title = 'Project walkthrough' }: { id: string; title?: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-card">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-encoder; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-accent shadow-card transition-transform group-hover:scale-105">
              <Play size={26} className="ml-1" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
