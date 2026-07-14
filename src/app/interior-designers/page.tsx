import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import LocationShell from '@/components/locations/LocationShell'
import SectionHead from '@/components/locations/SectionHead'
import LocationCta from '@/components/locations/LocationCta'
import { LOCATIONS_HERO } from '@/components/locations/cityImagery'
import { cities, suburbs, type City } from '@/data/locations'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Designers in Chennai & Tamil Nadu',
  description:
    'RGL Decors interior designers across Chennai — OMR, ECR, Adyar, Anna Nagar, Avadi — and cities across Tamil Nadu. Free 3D design and a transparent quote.',
  path: routes.locations,
})

/**
 * A location, as a hairline card — white on white, defined by its border and by
 * the air around it, never by a drop shadow (§4). Elevation is EARNED on hover:
 * `.lux-lift` raises it 6px and the gold thread appears along the border.
 *
 * The card carries the city's own tagline and its first four localities — real
 * copy from locations.ts, not a generated blurb.
 */
function LocationCard({ c, index }: { c: City; index: number }) {
  return (
    <RevealItem>
      <Link
        href={routes.city(c.slug)}
        className="lux-lift group flex h-full flex-col rounded-sm border border-divider bg-white p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-caps text-[10px] tracking-wide2 text-gold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.25}
            className="shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-8 font-serif text-title font-normal text-ink">{c.name}</h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink/65">{c.tagline}</p>

        <p className="mt-auto border-t border-divider pt-6 text-[13px] leading-relaxed text-muted">
          {c.areas.slice(0, 4).join(' · ')}
        </p>
      </Link>
    </RevealItem>
  )
}

/**
 * THE LOCATIONS INDEX — the door to the ~20 city routes.
 *
 * Same masthead, same bands, same closing room as the city pages it leads into,
 * so arriving on a city page feels like turning a page rather than landing on a
 * different site. Content, metadata, canonical and every slug are unchanged.
 */
export default function LocationsHubPage() {
  return (
    <LocationShell
      kicker="RGL Décors · Locations"
      title="Interior Designers in Chennai & Tamil Nadu"
      intro="We’re based in Chennai and design, factory-build and install premium home interiors across the city’s neighbourhoods and out into Tamil Nadu. Choose your area for the localities we cover, the local housing context and answers specific to where you live."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Locations', path: routes.locations },
      ]}
      media={LOCATIONS_HERO}
      caption="One studio, one factory, one standard — wherever the home is."
    >
      {/* ── Chennai neighbourhoods ─────────────────────────────────────────── */}
      <section aria-labelledby="chennai-heading" className="section-y bg-bone">
        <div className="shell">
          <SectionHead
            id="chennai-heading"
            eyebrow="Across Chennai"
            title={
              <>
                Neighbourhood <span className="italic text-accent">by neighbourhood</span>
              </>
            }
          >
            From the OMR and ECR corridors to Adyar, Anna Nagar and our home ground in Avadi.
          </SectionHead>

          <SectionReveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suburbs.map((c, i) => (
              <LocationCard key={c.slug} c={c} index={i} />
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── Tamil Nadu ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="tn-heading" className="section-y bg-background">
        <div className="shell">
          <SectionHead
            id="tn-heading"
            eyebrow="Across Tamil Nadu"
            title={
              <>
                Beyond the <span className="italic text-accent">city</span>
              </>
            }
          >
            Homeowners in cities across the state — factory-built and fitted locally.
          </SectionHead>

          <SectionReveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c, i) => (
              <LocationCard key={c.slug} c={c} index={i} />
            ))}
          </SectionReveal>
        </div>
      </section>

      <LocationCta />
    </LocationShell>
  )
}
