import type { TocItem } from '@/lib/blog'

/** Sticky table of contents built from the post's H2/H3 anchors. */
export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-divider bg-white p-5 shadow-card">
      <p className="font-caps text-[11px] uppercase tracking-wide2 text-muted">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? 'pl-3' : ''}>
            <a href={`#${it.id}`} className="text-ink/70 transition-colors hover:text-accent">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
