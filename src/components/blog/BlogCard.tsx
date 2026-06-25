import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { routes } from '@/lib/routes'
import { formatPostDate, type PostMeta } from '@/lib/blog'

/** Article preview card — used on the blog index and in related-posts rows. */
export default function BlogCard({ post }: { post: PostMeta }) {
  const { slug, frontmatter: fm, readingTimeMins } = post
  return (
    <Link
      href={routes.blogPost(slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="skeleton relative aspect-[16/10] w-full overflow-hidden bg-background">
        {fm.cover ? (
          <Image
            src={fm.cover}
            alt={fm.coverAlt || fm.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-accent/5">
            <span className="font-caps text-[11px] uppercase tracking-wide2 text-accent/60">
              {fm.category || 'RGL Decors'}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {fm.category && (
          <span className="font-caps text-[11px] uppercase tracking-wide2 text-accent">{fm.category}</span>
        )}
        <h3 className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-accent">
          {fm.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink/70">{fm.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-divider pt-3 text-xs text-muted">
          <span>{formatPostDate(fm.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" /> {readingTimeMins} min read
            <ArrowUpRight size={14} className="text-accent" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
