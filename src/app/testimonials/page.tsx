import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import Testimonials from '@/components/Testimonials.jsx'
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

export default function TestimonialsPage() {
  // Rating markup is emitted ONLY when we have real, attributable, rated reviews
  // (reviews.ts REVIEWS_VERIFIED). Until then we show the quotes as social proof
  // with NO AggregateRating / Review JSON-LD — never invented stars or counts.
  const showRatingSchema = hasVerifiedRatings()

  return (
    <PageStub
      title="Homes We've Brought to Life"
      kicker="RGL Decors · Testimonials"
      intro="A few words from families whose homes we've designed and delivered across Chennai. Want to be next? Book a free 3D design and see your home before it's built."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Testimonials', path: routes.testimonials },
      ]}
      cta={{ label: 'Start Your Free Design', href: routes.getQuote }}
    >
      <div className="space-y-12">
        {/* Reuse the existing Testimonials component as the page body */}
        <section className="-mx-5 overflow-hidden rounded-3xl sm:-mx-8 lg:-mx-12">
          <Testimonials />
        </section>

        {/* Honest review CTA — we ask for reviews rather than fake a rating */}
        <section className="rounded-2xl border border-divider bg-white p-7 text-center shadow-card sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
            <Star size={15} aria-hidden="true" /> Worked with us?
          </span>
          <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl">
            We&apos;d love your feedback
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/75">
            If RGL Decors designed your home, a short review helps other families decide with
            confidence. Share yours and we&apos;ll feature it here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={routes.contact} className="btn-pill bg-accent text-white hover:bg-accent-dark">
              Leave a Review <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={routes.portfolio}
              className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white"
            >
              See Our Work
            </Link>
          </div>
        </section>
      </div>

      {showRatingSchema && (
        <JsonLd id="ld-testimonials-rating" data={ratedReviewsSchema(reviews)} />
      )}
    </PageStub>
  )
}
