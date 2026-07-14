'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { facets, filterProjects, type Project, type Filters } from '@/data/portfolio'
import { routes } from '@/lib/routes'
import { ProjectCover } from './ProjectVisuals'
import { TiltPlate, MaskPlate } from '@/components/motion/Plate'

type FacetKey = keyof Filters
const FILTER_GROUPS: { key: FacetKey; label: string; values: string[] }[] = [
  { key: 'category', label: 'Category', values: facets.category },
  { key: 'space', label: 'Type', values: facets.space },
  { key: 'style', label: 'Style', values: facets.style },
  { key: 'bhk', label: 'BHK', values: facets.bhk },
  { key: 'budget', label: 'Budget', values: facets.budget },
]

/**
 * THE SPREAD — magazine covers, not a card grid.
 *
 * Each project is a plate: a masked curtain reveal on entry, a 3D tilt with
 * mouse-tracked depth on hover, a gold hairline frame offset behind it, and a
 * glass caption bar that rises over the foot carrying the project's facts.
 *
 * Composition, not repetition. Plates alternate portrait/landscape and every
 * middle column is dropped 4rem, so the eye reads a curated spread rather than a
 * product listing. The rhythm is index-driven, so it survives filtering.
 *
 * THE CURSOR IS PART OF THE CARD. Each plate declares `data-cursor-label` and
 * `data-cursor-image`, so the global cursor swells into a "View project" pill and
 * then into a floating preview of the very photograph you are pointing at. The
 * card does not implement any of that — it just declares it.
 *
 * HONESTY: location / area / timeline render ONLY when they exist. They are unset
 * for these real, named clients, and a portfolio card is not the place to guess a
 * client's floor area.
 */

// Plate rhythm: portrait · landscape · landscape · portrait, repeating.
const SHAPES = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[3/4]']

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion()
  const [filters, setFilters] = useState<Filters>({})
  const visible = useMemo(() => filterProjects(projects, filters), [projects, filters])

  const toggle = (key: FacetKey, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? undefined : value }))
  const clear = () => setFilters({})
  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <div>
      {/* ── Filters — quiet and tracked, between hairlines. Not a toolbar. ── */}
      <div className="space-y-4 border-y border-divider py-8">
        {FILTER_GROUPS.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="w-16 shrink-0 font-caps text-[10px] uppercase tracking-wide2 text-muted">
              {group.label}
            </span>
            {group.values.map((value) => {
              const active = filters[group.key] === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggle(group.key, value)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-500 ${
                    active
                      ? 'bg-accent text-white'
                      : 'border border-divider bg-white text-ink/75 hover:border-accent hover:text-accent'
                  }`}
                >
                  {value}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-6">
        <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
          {String(visible.length).padStart(2, '0')} {visible.length === 1 ? 'project' : 'projects'}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clear}
            className="lux-underline font-caps text-[10px] uppercase tracking-wide2 text-accent"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── The spread ───────────────────────────────────────────────────── */}
      <motion.div layout className="mt-12 grid gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            // Facts that actually exist. Nothing is invented to fill the row.
            const facts = [
              p.space,
              p.bhk,
              p.style,
              p.location,
              p.areaSqft ? `${p.areaSqft.toLocaleString('en-IN')} sq.ft` : null,
              p.timeline,
            ].filter(Boolean) as string[]

            return (
              <motion.article
                key={p.slug}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: Math.min(i, 5) * 0.06,
                }}
                className={i % 3 === 1 ? 'lg:mt-16' : ''}
              >
                <Link
                  href={routes.portfolioProject(p.slug)}
                  data-cursor="view"
                  data-cursor-label="View project"
                  data-cursor-image={p.media.cover?.src}
                  className="group block"
                >
                  {/* The gold hairline sits BEHIND the plate and offset from it —
                      the frame and the picture are deliberately not the same
                      rectangle. It closes toward the image on hover. */}
                  {/* The FRAME owns the size and the clipping. Everything that
                      moves is absolutely positioned inside it.

                      This structure is load-bearing: when the mask and the tilt
                      were nested as sizing wrappers, the plate's height had to
                      resolve down through five `h-full` layers, and the tilted
                      image escaped the clip entirely. One explicitly-sized frame,
                      motion layers pinned to `inset-0` inside it — nothing to
                      resolve, nothing to escape. */}
                  <div
                    className={`plate-offset relative w-full overflow-hidden bg-bone ${SHAPES[i % SHAPES.length]}`}
                  >
                    <MaskPlate from="bottom" className="absolute inset-0">
                      <TiltPlate className="h-full w-full" strength={4} depth={10}>
                        <div className="lux-tint relative h-full w-full">
                          <ProjectCover
                            project={p}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </TiltPlate>
                    </MaskPlate>

                    {/* Grade — rises from the foot on hover. Outside the tilt, so
                        the type never skews with the photograph. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/10 to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
                    />

                    {/* The glass caption bar — the magazine cover line. */}
                    <span
                      aria-hidden="true"
                      className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-700 ease-lux group-hover:translate-y-0"
                    >
                      <span className="block font-serif text-[22px] font-light leading-tight text-white">
                        {p.title}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {facts.map((f) => (
                          <span
                            key={f}
                            className="font-caps text-[9px] uppercase tracking-wide2 text-gold"
                          >
                            {f}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>

                  {/* Caption, not a card footer. */}
                  <div className="relative pt-6">
                    <span className="absolute inset-x-0 top-0 h-px bg-divider" aria-hidden="true" />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                    />

                    <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
                      {p.space}
                      {p.bhk ? ` · ${p.bhk}` : ''} · {p.style}
                    </p>
                    {/* h2 (not h3): cards sit directly under the page h1 — an h3
                        would skip a level (heading-order / WCAG). */}
                    <h2 className="mt-3 flex items-start justify-between gap-4 font-serif text-title font-normal text-ink transition-colors duration-500 group-hover:text-accent">
                      {p.title}
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      {p.client} · {p.budgetBand}
                    </p>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 border-t border-divider pt-10 text-center text-muted">
          No projects match those filters yet.{' '}
          <button type="button" onClick={clear} className="lux-underline font-medium text-accent">
            Clear filters
          </button>
        </p>
      )}
    </div>
  )
}
