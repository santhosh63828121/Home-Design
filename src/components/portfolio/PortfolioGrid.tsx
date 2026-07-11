'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { facets, filterProjects, type Project, type Filters } from '@/data/portfolio'
import { routes } from '@/lib/routes'
import { ProjectCover } from './ProjectVisuals'

type FacetKey = keyof Filters
const FILTER_GROUPS: { key: FacetKey; label: string; values: string[] }[] = [
  { key: 'category', label: 'Category', values: facets.category },
  { key: 'space', label: 'Type', values: facets.space },
  { key: 'style', label: 'Style', values: facets.style },
  { key: 'bhk', label: 'BHK', values: facets.bhk },
  { key: 'budget', label: 'Budget', values: facets.budget },
]

/**
 * Filterable case-study grid (Category · Type · Style · BHK · Budget). Cards are
 * server-rendered for SEO; filtering happens client-side with a layout
 * animation. Image slots sit on a skeleton shimmer so they load gracefully when
 * real photos arrive (until then, a branded placeholder shows — never a fake
 * room).
 */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filters, setFilters] = useState<Filters>({})
  const visible = useMemo(() => filterProjects(projects, filters), [projects, filters])

  const toggle = (key: FacetKey, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? undefined : value }))
  const clear = () => setFilters({})
  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <div>
      {/* Filters */}
      <div className="space-y-3">
        {FILTER_GROUPS.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-2">
            <span className="w-16 shrink-0 font-caps text-[11px] uppercase tracking-wide2 text-muted">
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
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-accent text-white'
                      : 'border border-divider bg-white text-ink hover:border-accent'
                  }`}
                >
                  {value}
                </button>
              )
            })}
          </div>
        ))}
        <div className="flex items-center gap-3 pt-1">
          <p className="text-sm text-muted">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={clear} className="text-sm font-medium text-accent hover:underline">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={routes.portfolioProject(p.slug)}
                data-cursor="view"
                className="group lux-media block overflow-hidden rounded-2xl border border-divider bg-white shadow-card"
              >
                <div className="skeleton relative aspect-[4/3] w-full overflow-hidden">
                  <ProjectCover project={p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex items-start justify-between gap-3 p-5">
                  <div>
                    <p className="font-caps text-[11px] uppercase tracking-wide2 text-accent">
                      {p.space}
                      {p.bhk ? ` · ${p.bhk}` : ''} · {p.style}
                    </p>
                    {/* h2 (not h3): cards sit directly under the page h1 — an h3
                        would skip a level (heading-order / WCAG). */}
                    <h2 className="mt-2 font-serif text-lg">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {p.client} · {p.budgetBand}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-10 rounded-2xl border border-divider bg-white px-6 py-8 text-center text-muted">
          No projects match those filters yet.{' '}
          <button type="button" onClick={clear} className="font-medium text-accent hover:underline">
            Clear filters
          </button>
        </p>
      )}
    </div>
  )
}
