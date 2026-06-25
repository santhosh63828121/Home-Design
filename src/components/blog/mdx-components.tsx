import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { slugifyHeading } from '@/lib/blog'
import {
  getPackage,
  getRoom,
  priceLabel,
  formatINR,
  PRICING_FOOTNOTE,
  type Money,
} from '@/data/pricing'

/**
 * MDX shortcodes + styled elements available to every post — authors use them in
 * prose WITHOUT importing anything. The price shortcodes read straight from the
 * canonical pricing module (data/pricing.ts), so a number quoted in an article
 * can never drift from the calculator / pricing pages, and the `*` indicative
 * marker stays wired to the same flag.
 */

// Flatten heading children to a string so the id matches lib/blog's TOC slug.
function textOf(node: ReactNode): string {
  if (node == null || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (typeof node === 'object' && 'props' in node) {
    const props = (node as { props?: { children?: ReactNode } }).props
    return props ? textOf(props.children) : ''
  }
  return ''
}

function H2({ children }: { children?: ReactNode }) {
  return (
    <h2 id={slugifyHeading(textOf(children))} className="mt-12 scroll-mt-28 font-serif text-2xl font-bold text-ink sm:text-3xl">
      {children}
    </h2>
  )
}

function H3({ children }: { children?: ReactNode }) {
  return (
    <h3 id={slugifyHeading(textOf(children))} className="mt-8 scroll-mt-28 font-serif text-xl font-semibold text-ink">
      {children}
    </h3>
  )
}

function Anchor({ href = '#', children }: { href?: string; children?: ReactNode }) {
  const internal = href.startsWith('/')
  if (internal) {
    return (
      <Link href={href} className="font-medium text-accent underline-offset-2 hover:underline">
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent underline-offset-2 hover:underline"
    >
      {children}
    </a>
  )
}

// ---- Price shortcodes (read from pricing.ts) -------------------------------

/** <Price pkg="essentials-2bhk" /> or <Price room="modular-kitchen" /> */
function Price({ pkg, room }: { pkg?: string; room?: string }) {
  let label = 'Custom quote'
  if (pkg) {
    const p = getPackage(pkg)
    if (p) label = priceLabel(p.range, p.indicative)
  } else if (room) {
    const r = getRoom(room)
    if (r) label = priceLabel(r.base)
  }
  return <strong className="whitespace-nowrap text-ink">{label}</strong>
}

/** <Money n={50000} /> — Indian-format an arbitrary rupee figure. */
function MoneyTag({ n }: { n: Money }) {
  return <strong className="whitespace-nowrap text-ink">{formatINR(n)}</strong>
}

/** <PriceNote /> — the single indicative footnote, in sync with pricing.ts. */
function PriceNote() {
  return (
    <span className="mt-8 flex items-start gap-2.5 rounded-xl border border-divider bg-white px-4 py-3 text-sm text-muted">
      <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <span>{PRICING_FOOTNOTE} Figures read live from our pricing model and match the cost calculator.</span>
    </span>
  )
}

/** <Callout>…</Callout> — highlighted aside. */
function Callout({ children }: { children?: ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-accent/20 bg-accent/[0.06] p-5 text-ink/85">
      {children}
    </div>
  )
}

/** <MoneyPageCTA href="/…" label="…" /> — inline link to the supported money page. */
function MoneyPageCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="my-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white transition-colors hover:bg-accent-dark"
    >
      {label} <ArrowRight size={16} aria-hidden="true" />
    </Link>
  )
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  a: Anchor,
  p: (p: { children?: ReactNode }) => <p className="mt-5 leading-relaxed text-ink/80" {...p} />,
  ul: (p: { children?: ReactNode }) => <ul className="mt-5 list-disc space-y-2 pl-5 text-ink/80" {...p} />,
  ol: (p: { children?: ReactNode }) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-ink/80" {...p} />,
  li: (p: { children?: ReactNode }) => <li className="leading-relaxed" {...p} />,
  strong: (p: { children?: ReactNode }) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p: { children?: ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-accent/40 pl-5 italic text-ink/75" {...p} />
  ),
  hr: () => <hr className="my-10 border-divider" />,
  table: (p: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...p} />
    </div>
  ),
  th: (p: { children?: ReactNode }) => (
    <th className="border-b border-divider bg-background px-4 py-2.5 font-semibold text-ink" {...p} />
  ),
  td: (p: { children?: ReactNode }) => <td className="border-b border-divider px-4 py-2.5 text-ink/80" {...p} />,
  // Shortcodes
  Price,
  Money: MoneyTag,
  PriceNote,
  Callout,
  MoneyPageCTA,
}
