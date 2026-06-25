/**
 * CLIENT REVIEWS — single typed source for the Testimonials component, the
 * /testimonials page and any Review / AggregateRating structured data.
 *
 * HONESTY RULE (Google structured-data policy + brand trust):
 * ----------------------------------------------------------------------------
 * Fabricated AggregateRating markup (a star rating + review count that doesn't
 * reflect real, collectable reviews) is a structured-data violation that can
 * earn a manual penalty — a concrete liability, not just an ethics point.
 *
 * So the schema is GATED behind `REVIEWS_VERIFIED`:
 *   - while it's `false`  → the page renders the quotes as plain social proof,
 *     and we emit NO Review / AggregateRating JSON-LD at all.
 *   - flip it to `true` only once each review below is a real, attributable
 *     client review (ideally cross-posted on Google Business) AND carries a
 *     genuine `rating`. Then `reviewSchema()` / `aggregateRating()` light up.
 *
 * The visible quotes are existing brand copy; the `rating` fields are
 * intentionally absent until we can attach real star ratings.
 */
export type Review = {
  quote: string
  name: string
  /** City / project context, e.g. "2BHK · Velachery, Chennai". */
  role: string
  /** Real star rating 1–5. LEAVE UNSET until a genuine rating exists. */
  rating?: number
}

/**
 * Set to `true` ONLY when every review below is a real, attributable client
 * review with a genuine `rating`. Until then the rating schema stays off.
 */
export const REVIEWS_VERIFIED = false

export const reviews: Review[] = [
  {
    quote:
      'They handed over our 2BHK in 41 days. The 3D walkthrough matched the final result almost exactly — zero surprises.',
    name: 'Priya & Karthik',
    role: '2BHK · Velachery, Chennai',
  },
  {
    quote:
      'The modular kitchen is the heart of our home now. Marble finish, soft-close everything, and built to fit a tricky corner perfectly.',
    name: 'Anand Subramanian',
    role: 'Villa · OMR, Chennai',
  },
  {
    quote:
      'Transparent pricing and a dedicated designer who actually listened. The master bedroom turned out better than we imagined.',
    name: 'Deepa Rajan',
    role: '3BHK · Adyar, Chennai',
  },
]

/** True only when we can legitimately emit rating markup. */
export const hasVerifiedRatings = (): boolean =>
  REVIEWS_VERIFIED && reviews.length > 0 && reviews.every((r) => typeof r.rating === 'number')
