import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { cities, suburbs, type City } from '@/data/locations'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Designers in Chennai & Tamil Nadu',
  description:
    'RGL Decors interior designers across Chennai — OMR, ECR, Adyar, Anna Nagar, Avadi — and cities across Tamil Nadu. Free 3D design and a transparent quote.',
  path: routes.locations,
})

function LocationCard({ c }: { c: City }) {
  return (
    <Link
      href={`/${c.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-divider bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-serif text-xl">
          <MapPin size={18} className="text-teal" aria-hidden="true" /> {c.name}
        </span>
        <ArrowUpRight
          size={18}
          className="text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-sm text-muted">{c.tagline}</p>
      <p className="mt-3 line-clamp-2 text-sm text-ink/70">{c.areas.slice(0, 4).join(' · ')}</p>
    </Link>
  )
}

export default function LocationsHubPage() {
  return (
    <PageStub
      title="Interior Designers in Chennai & Tamil Nadu"
      kicker="RGL Decors · Locations"
      intro="We’re based in Chennai and design, factory-build and install premium home interiors across the city’s neighbourhoods and out into Tamil Nadu. Choose your area for the localities we cover, the local housing context and answers specific to where you live."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Locations', path: routes.locations },
      ]}
    >
      <div className="space-y-12">
        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Across Chennai</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Neighbourhood interior designers — from the OMR and ECR corridors to Adyar, Anna Nagar
            and our home ground in Avadi.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suburbs.map((c) => (
              <LocationCard key={c.slug} c={c} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Across Tamil Nadu</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Beyond Chennai, we serve homeowners in cities across the state — factory-built and fitted
            locally.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <LocationCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      </div>
    </PageStub>
  )
}
