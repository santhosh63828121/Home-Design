import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * BLOG DATA LAYER — single source of truth for posts.
 * ----------------------------------------------------------------------------
 * Posts are plain MDX files in `src/content/blog/<slug>.mdx` with YAML
 * frontmatter. RGL adds a post by dropping a new `.mdx` file here — NO component
 * edits, no route changes, no registry to update. Everything below (index,
 * [slug] page, sitemap, related posts, schema) reads from this module.
 *
 * Server-only: it touches the filesystem, so it must never be imported into a
 * client component.
 */

export const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

/** Frontmatter contract every post file must satisfy. */
export type PostFrontmatter = {
  title: string
  /** Optional shorter SEO/<title> (≤47 chars before the brand suffix). Falls back to `title`. */
  metaTitle?: string
  description: string
  date: string // ISO 'YYYY-MM-DD' — the REAL publish date (no backdating)
  updated?: string // ISO — optional last-updated date
  author?: string // honest byline; defaults to 'RGL Decors Team'
  cover?: string // optional hero image URL
  coverAlt?: string
  category?: string
  tags?: string[]
  /** Internal "money page" this cluster post supports (a path from routes). */
  moneyPage?: { label: string; href: string }
  /** Slugs of related posts; falls back to same-category/most-recent. */
  related?: string[]
  draft?: boolean
}

export type TocItem = { id: string; text: string; level: 2 | 3 }

export type Post = {
  slug: string
  frontmatter: PostFrontmatter
  content: string // raw MDX body (frontmatter stripped)
  readingTimeMins: number
  toc: TocItem[]
}

export type PostMeta = Omit<Post, 'content' | 'toc'>

const DEFAULT_AUTHOR = 'RGL Decors Team'

/** Stable, GitHub-style heading slug so TOC anchors match rendered ids. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** ~200 wpm reading estimate, min 1. */
function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/** Extract `## ` / `### ` headings into a TOC (ignores fenced code blocks). */
function extractToc(content: string): TocItem[] {
  const toc: TocItem[] = []
  let inFence = false
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^(#{2,3})\s+(.*)$/.exec(line)
    if (!m) continue
    const level = m[1].length as 2 | 3
    const text = m[2].replace(/[#*`]/g, '').trim()
    toc.push({ id: slugifyHeading(text), text, level })
  }
  return toc
}

function slugFromFile(file: string): string {
  return file.replace(/\.mdx?$/, '')
}

/** Read + parse one post by slug. Returns null if missing. */
export function getPostBySlug(slug: string): Post | null {
  for (const ext of ['.mdx', '.md']) {
    const full = path.join(BLOG_DIR, `${slug}${ext}`)
    if (!fs.existsSync(full)) continue
    const raw = fs.readFileSync(full, 'utf8')
    const { data, content } = matter(raw)
    const fm = data as PostFrontmatter
    fm.author = fm.author || DEFAULT_AUTHOR
    return {
      slug,
      frontmatter: fm,
      content,
      readingTimeMins: readingTime(content),
      toc: extractToc(content),
    }
  }
  return null
}

/** All publishable posts (drafts excluded in production), newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const isProd = process.env.NODE_ENV === 'production'
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => getPostBySlug(slugFromFile(f)))
    .filter((p): p is Post => p !== null)
    .filter((p) => !(isProd && p.frontmatter.draft))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
    .map(({ slug, frontmatter, readingTimeMins }) => ({ slug, frontmatter, readingTimeMins }))
}

export const getAllPostSlugs = (): string[] => getAllPosts().map((p) => p.slug)

/**
 * Related posts: explicit `related` slugs first, then same-category, then most
 * recent — de-duplicated, excluding the current post. Always returns ≤ `limit`.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  const pool = all.filter((p) => p.slug !== slug)
  const picked: PostMeta[] = []
  const add = (p?: PostMeta) => {
    if (p && !picked.some((x) => x.slug === p.slug)) picked.push(p)
  }

  current?.frontmatter.related?.forEach((rs) => add(pool.find((p) => p.slug === rs)))
  pool
    .filter((p) => current && p.frontmatter.category === current.frontmatter.category)
    .forEach(add)
  pool.forEach(add)

  return picked.slice(0, limit)
}

/** Pretty date, e.g. "19 June 2026". */
export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
