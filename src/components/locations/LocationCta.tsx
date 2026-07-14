import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/seo'

/**
 * THE CLOSING ROOM — the one dark panel on the page.
 *
 * Every city page ends here: a deep-olive band, a gold thread, a light serif
 * line and two ways to start. It reads as the last page of a monograph rather
 * than a conversion banner, which is exactly the difference this brief is about.
 *
 * CONTRAST, MEASURED (DESIGN-SYSTEM §1): on `olive-deep` the body text is
 * `white/70` — the floor is /50 (4.58:1) and /45 FAILS. The eyebrow is GOLD
 * (5.67:1 on olive-deep ✓), which is also the only surface where gold is legal
 * as text. The button is `.btn-gold`, whose label is INK, never white (7.46:1
 * vs 2.33:1).
 *
 * Copy makes no claim that isn't already on the site: the 3D walkthrough and the
 * itemised quote are free and carry no obligation (see locations.ts / pricing).
 */
export default function LocationCta({ place }: { place?: string }) {
  return (
    <section aria-labelledby="location-cta-heading" className="section-y bg-olive-deep">
      <div className="shell">
        {/* LEFT-ALIGNED, not centred.
            A centred CTA starts on its own private axis — the layout audit
            measured this block beginning at x=416 while every other section on
            the page began at x=160. The eye reads that as a banner bolted on,
            not as the last movement of the page. Sitting it on the same column,
            with the actions under the text and air to the right, is both the
            grid-correct answer and the more editorial one (asymmetric, the way a
            monograph closes). */}
        <SectionReveal className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
          <p className="eyebrow text-gold">Start the conversation</p>
          <span aria-hidden="true" className="rule-gold mt-6" />

          <h2
            id="location-cta-heading"
            className="mt-8 max-w-[16ch] text-balance font-serif text-headline font-light text-white"
          >
            {place ? (
              <>
                Let&apos;s design your home in{' '}
                <span className="italic text-gold">{place}</span>.
              </>
            ) : (
              <>
                Let&apos;s design the home <span className="italic text-gold">you live in</span>.
              </>
            )}
          </h2>

          <p className="mt-8 max-w-prose2 text-pretty leading-relaxed text-white/70">
            Book a free site visit and we&apos;ll turn your floor plan into a 3D walkthrough with an
            itemised quote — no cost, no obligation.
          </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 lg:mt-0">
            <Link href={routes.getQuote} className="btn-pill btn-gold">
              Book a free site visit
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${siteConfig.nap.phoneE164}`}
              className="btn-pill border border-white/25 bg-transparent text-white/80 hover:border-white/50 hover:bg-white/10"
            >
              Call {siteConfig.nap.phoneDisplay}
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
