'use client'

import { useMemo, useState } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import type { PostMeta } from '@/lib/blog'
import { categoryOrder, ALL_CATEGORIES } from '@/data/blogCategories'

/**
 * Blog index with a category filter. Categories are derived from the posts that
 * actually exist (ordered by the canonical taxonomy), so a chip never leads to
 * an empty list. Cards are <h3> under a section <h2>, keeping heading order
 * clean below the page <h1>.
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
      <p className="rounded-2xl border border-divider bg-white px-6 py-5 text-sm text-muted">
        Our first articles are being written. Meanwhile, explore our services or get a free 3D
        design and quote.
      </p>
    )
  }

  return (
    <div>
      {categories.length > 2 && (
        <nav aria-label="Filter articles by category" className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = c === active
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={on}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  on
                    ? 'border-teal bg-teal text-white'
                    : 'border-divider bg-white text-ink/70 hover:border-teal hover:text-teal'
                }`}
              >
                {c}
              </button>
            )
          })}
        </nav>
      )}

      <h2 className="sr-only">{active === ALL_CATEGORIES ? 'All articles' : `${active} articles`}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  )
}
