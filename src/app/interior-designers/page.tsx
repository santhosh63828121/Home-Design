import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { cities } from '@/data/locations'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Designers Across Tamil Nadu',
  description:
    'Interior designers serving Chennai, Coimbatore, Salem, Hosur, Krishnagiri, Dharmapuri, Kanchipuram and Chengalpattu — RGL Decors, free 3D design & quote.',
  path: routes.locations,
})

export default function LocationsHubPage() {
  return (
    <PageStub
      title="Interior Designers Across Tamil Nadu"
      kicker="RGL Decors · Locations"
      intro="We design and install premium home interiors across Tamil Nadu — built in our automated factory and fitted locally. Choose your city to see the areas we cover, local context and city-specific answers."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Locations', path: routes.locations },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-divider bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-serif text-xl">
                <MapPin size={18} className="text-accent" aria-hidden="true" /> {c.name}
              </span>
              <ArrowUpRight
                size={18}
                className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-sm text-muted">{c.tagline}</p>
            <p className="mt-3 line-clamp-2 text-sm text-ink/70">
              {c.areas.slice(0, 4).join(' · ')}
            </p>
          </Link>
        ))}
      </div>
    </PageStub>
  )
}
