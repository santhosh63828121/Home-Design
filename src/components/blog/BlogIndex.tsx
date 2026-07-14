'use client'

import { useMemo, useState } from 'react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import BlogCard from '@/components/blog/BlogCard'
import type { PostMeta } from '@/lib/blog'
import { categoryOrder, ALL_CATEGORIES } from '@/data/blogCategories'

/**
 * THE JOURNAL INDEX — a spread of plates, not a card grid.
 * ============================================================================
 * Categories are derived from the posts that actually exist (ordered by the
 * canonical taxonomy), so a chip never leads to an empty list. Cards are <h3>
 * under the sr-only section <h2>, keeping heading order clean below the page <h1>.
 *
 * MOTION: the filter chips and the plates both stagger in through the house
 * SectionReveal / RevealItem pair — one mechanism, not a second hand-rolled one.
 * The grid is KEYED ON THE ACTIVE FILTER, which remounts the reveal so the
 * cascade replays for the new set rather than the new cards appearing fully lit.
 *
 * Every third plate is dropped 4rem on the widest breakpoint, so the eye reads a
 * curated spread rather than a product listing. The rhythm is index-driven, so it
 * survives filtering.
 *
 * The chips used to be `border-teal bg-teal` — a retired hue that now silently
 * resolves to olive. They are `accent` now, so the intent is legible in source.
 */
export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(() => {
    const present = Array.from(
      new Set(posts.map((p) => p.frontmatter.category).filter((c): c is string => !!c)),
    )
    present.sort((a, b) => categoryOrder(a) - categoryOrder(b) || a.localeCompare(b))
    return [ALL_CATEGORIES, ...present]
  }, [posts])

  const [active, setActive] = useState<string>(ALL_CATEGORIES)

  const filtered = useMemo(
    () => (active === ALL_CATEGORIES ? posts : posts.filter((p) => p.frontmatter.category === active)),
    [posts, active],
  )

  if (posts.length === 0) {
    return (
      <SectionReveal variant="fadeUp" className="border-t border-divider pt-8">
        <p className="max-w-prose2 text-pretty leading-relaxed text-muted">
          Our first articles are being written. Meanwhile, explore our services or get a free 3D
          design and quote.
        </p>
      </SectionReveal>
    )
  }

  return (
    <div>
      {categories.length > 2 && (
        <nav aria-label="Filter articles by category">
          <SectionReveal
            stagger
            amount={0.4}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-divider py-6"
          >
            {categories.map((c) => {
              const on = c === active
              return (
                <RevealItem key={c}>
                  <button
                    type="button"
                    onClick={() => setActive(c)}
                    aria-pressed={on}
                    className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-500 ${
                      on
                        ? 'bg-accent text-white'
                        : 'border border-divider bg-white text-ink/75 hover:border-accent hover:text-accent'
                    }`}
                  >
                    {c}
                  </button>
                </RevealItem>
              )
            })}
          </SectionReveal>
        </nav>
      )}

      <h2 className="sr-only">{active === ALL_CATEGORIES ? 'All articles' : `${active} articles`}</h2>

      {/* `overflow-x-clip` because the offset gold frame sits 20px to the right of
          the last column's plate; clipping here is safe (overflow creates no
          containing block, so the plates' transforms are untouched). */}
      <SectionReveal
        stagger
        key={active}
        amount={0.05}
        className="mt-12 grid gap-x-12 gap-y-16 overflow-x-clip sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-24"
      >
        {filtered.map((p, i) => (
          <RevealItem key={p.slug} className={i % 3 === 1 ? 'lg:mt-16' : ''}>
            <BlogCard post={p} />
          </RevealItem>
        ))}
      </SectionReveal>
    </div>
  )
}
