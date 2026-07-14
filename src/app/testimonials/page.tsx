import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd, ratedReviewsSchema } from '@/lib/structured-data'
import { reviews, hasVerifiedRatings } from '@/data/reviews'

export const metadata: Metadata = buildMetadata({
  title: 'Client Testimonials',
  description:
    'Read what Chennai homeowners say about working with RGL Decors — on-time handover, accurate 3D walkthroughs and modular home interiors genuinely built to last.',
  path: routes.testimonials,
})

/**
 * IN THEIR WORDS — an editorial spread, not a wall of review cards.
 * ============================================================================
 * Each client gets a full spread: an enormous light-serif quotation set across a
 * wide measure, a hairline, and the attribution kept small and quiet beneath it.
 * The page holds three of them and no more, because three real voices are worth
 * more than thirty invented ones. The typography IS the endorsement — a quote
 * this size does not need a badge, a card or a shadow to be believed.
 *
 * NOT RENDERED, DELIBERATELY: star ratings, review counts, aggregate scores.
 * `REVIEWS_VERIFIED` in src/data/reviews.ts is still false, so `hasVerifiedRatings()`
 * is false, so NO Review / AggregateRating JSON-LD is emitted. Fabricated rating
 * markup is a Google structured-data violation with genuine manual-penalty risk;
 * the gate stays shut until every quote here is a real, attributable, rated
 * client review. The gate below is unchanged from the version that shipped.
 */
export default function TestimonialsPage() {
  const showRatingSchema = hasVerifiedRatings()

  return (
    <PageStub
      title="Homes We've Brought to Life"
      kicker="RGL Décors · In their words"
      intro="Three families, three homes, and what they said afterwards — unedited. We do not publish a star rating, because a rating we cannot verify is not proof of anything. These are simply the words, attributed."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Testimonials', path: routes.testimonials },
      ]}
      cta={{ label: 'Start Your Free Design', href: routes.getQuote }}
    >
      <div className="space-y-24 lg:space-y-32">
        {/* The quotations. One per spread — the measure does the persuading. */}
        <section aria-label="Client quotations">
          <ol>
            {/* Each spread is a stagger container: the numeral, then the quote,
                then the attribution — in that order, on separate beats. A quote
                that arrives all at once is a block of text; a quote that arrives
                in sequence is someone speaking. */}
            {reviews.map((r, i) => (
              <SectionReveal
                as="li"
                stagger
                key={r.name}
                amount={0.2}
                className="group border-t border-divider pt-12 first:pt-0 first:border-t-0 [&:not(:first-child)]:mt-20 lg:[&:not(:first-child)]:mt-28"
              >
                <figure>
                  <RevealItem
                    as="span"
                    className="block font-caps text-[10px] tracking-wide2 text-gold-ink"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </RevealItem>

                  <RevealItem
                    as="blockquote"
                    className="mt-8 max-w-5xl text-balance font-serif text-[clamp(1.6rem,3.4vw,2.9rem)] font-light leading-[1.28] text-ink"
                  >
                    <span aria-hidden="true" className="text-gold">
                      “
                    </span>
                    {r.quote}
                    <span aria-hidden="true" className="text-gold">
                      ”
                    </span>
                  </RevealItem>

                  <RevealItem
                    as="figcaption"
                    className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
                  >
                    {/* The gold rule draws itself out beside the name. */}
                    <span
                      aria-hidden="true"
                      className="h-px w-10 origin-left bg-gold transition-transform duration-1000 ease-lux group-hover:scale-x-150"
                    />
                    <span className="font-caps text-[11px] uppercase tracking-wide2 text-ink">
                      {r.name}
                    </span>
                    <span className="font-caps text-[11px] uppercase tracking-wide2 text-muted">
                      {r.role}
                    </span>
                  </RevealItem>
                </figure>
              </SectionReveal>
            ))}
          </ol>
        </section>

        {/* We ask for reviews rather than manufacture a rating. */}
        <section>
          <SectionReveal
            stagger
            amount={0.15}
            className="grid gap-10 border-t border-divider pt-12 lg:grid-cols-[auto_1fr] lg:gap-24"
          >
            <RevealItem>
              <p className="eyebrow">Worked with us?</p>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <h2 className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink">
                Tell us <span className="italic text-accent">honestly</span>
              </h2>
            </RevealItem>

            <RevealItem className="lg:pt-14">
              <p className="max-w-prose2 text-pretty leading-relaxed text-ink/70">
                If we designed your home, a few sentences from you help the next family decide with
                their eyes open. Send it to us as it is — we publish the words we are given, and we
                would rather have three we can stand behind than three hundred we cannot.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href={routes.contact} className="btn-pill btn-olive">
                  Share your experience
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href={routes.portfolio}
                  className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
                >
                  See the homes themselves
                </Link>
              </div>
            </RevealItem>
          </SectionReveal>
        </section>
      </div>

      {showRatingSchema && (
        <JsonLd id="ld-testimonials-rating" data={ratedReviewsSchema(reviews)} />
      )}
    </PageStub>
  )
}
