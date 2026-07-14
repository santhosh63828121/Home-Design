import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { MaskPlate, TiltPlate } from '@/components/motion/Plate'
import { routes } from '@/lib/routes'
import { formatPostDate } from '@/lib/blog-format'
import type { PostMeta } from '@/lib/blog'

/**
 * ARTICLE PLATE — a magazine cover line, not a boxed card.
 * ============================================================================
 * This was a white rounded card with a border and a resting shadow, which is the
 * single loudest "blog template" tell. It is now the same plate the portfolio
 * uses: a clip-path curtain reveal, a 3D tilt with mouse-tracked depth on hover,
 * a gold hairline frame offset BEHIND the image, and a frosted caption bar that
 * rises over the foot. The text below is a caption on a hairline — no card, no
 * shadow at rest. Elevation is earned on hover.
 *
 * THE CURSOR IS PART OF THE CARD: it declares `data-cursor-image`, so the global
 * cursor swells into a floating preview of the very cover you are pointing at.
 * The card implements none of that — it only declares it. `data-cursor-image` is
 * omitted entirely when a post has no cover, so the cursor falls back to the
 * label rather than previewing nothing.
 *
 * Heading level is unchanged (h3, under the index's section h2, under the page
 * h1) — the plate is a visual change, not a document-outline one.
 */
export default function BlogCard({ post }: { post: PostMeta }) {
  const { slug, frontmatter: fm, readingTimeMins } = post

  return (
    <Link
      href={routes.blogPost(slug)}
      data-cursor="view"
      data-cursor-label="Read article"
      data-cursor-image={fm.cover || undefined}
      className="group flex h-full flex-col"
    >
      {/* The gold hairline sits BEHIND the plate and offset from it — the frame
          and the picture are deliberately not the same rectangle. It closes
          toward the image on hover. */}
      <div className="plate-offset">
        <MaskPlate
          from="bottom"
          className="relative aspect-[16/10] w-full overflow-hidden bg-bone"
        >
          <TiltPlate className="h-full w-full" strength={4} depth={8}>
            <div className="lux-tint relative h-full w-full">
              {fm.cover ? (
                <Image
                  src={fm.cover}
                  alt={fm.coverAlt || fm.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                // No cover photograph exists — so none is invented. A quiet olive
                // wash carrying the category, not a stock photo of someone else's
                // house standing in for ours.
                <div className="flex h-full items-center justify-center bg-olive-wash">
                  <span className="font-caps text-[11px] uppercase tracking-wide2 text-accent/70">
                    {fm.category || 'RGL Décors'}
                  </span>
                </div>
              )}

              {/* Grade — rises from the foot on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/10 to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
              />

              {/* The glass caption bar — the cover line. */}
              <span
                aria-hidden="true"
                className="plate-glass pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 p-6 transition-transform duration-700 ease-lux translate-y-full group-hover:translate-y-0"
              >
                <Clock size={12} strokeWidth={1.5} className="shrink-0 text-gold" />
                <span className="font-caps text-[9px] uppercase tracking-wide2 text-gold">
                  {readingTimeMins} min read
                </span>
                {fm.category && (
                  <span className="font-caps text-[9px] uppercase tracking-wide2 text-white/70">
                    {fm.category}
                  </span>
                )}
              </span>
            </div>
          </TiltPlate>
        </MaskPlate>
      </div>

      {/* Caption, not a card footer. The hairline turns gold under the pointer. */}
      <div className="relative flex flex-1 flex-col pt-6">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-divider" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
        />

        {fm.category && (
          <p className="font-caps text-[10px] uppercase tracking-wide2 text-accent">
            {fm.category}
          </p>
        )}

        <h3 className="mt-3 flex items-start justify-between gap-4 font-serif text-title font-normal leading-snug text-ink transition-colors duration-500 group-hover:text-accent">
          {fm.title}
          <ArrowUpRight
            size={18}
            strokeWidth={1.25}
            aria-hidden="true"
            className="mt-1 shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </h3>

        <p className="mt-3 line-clamp-2 text-pretty text-sm leading-relaxed text-ink/65">
          {fm.description}
        </p>

        <p className="mt-4 flex items-center gap-3 font-caps text-[10px] uppercase tracking-wide2 text-muted">
          {formatPostDate(fm.date)}
          <span aria-hidden="true" className="h-px w-4 bg-gold" />
          {readingTimeMins} min read
        </p>
      </div>
    </Link>
  )
}
