import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowUpRight, Home as HomeIcon } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import PricingFaqs from '@/components/pricing/PricingFaqs'
import { ProjectCover } from '@/components/portfolio/ProjectVisuals'
import { getCity } from '@/data/locations'
import { projectsInCity } from '@/data/portfolio'
import { serviceCategories } from '@/data/business'
import { buildMetadata, clampDesc } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd, cityCoverageSchema } from '@/lib/structured-data'

/** Per-city metadata (unique title + description, from one source). */
export function cityMetadata(slug: string): Metadata {
  const city = getCity(slug)
  if (!city) return buildMetadata({ title: 'Interior Designers', noindex: true })
  return buildMetadata({
    title: `Interior Designers in ${city.name}`,
    description: clampDesc(city.metaDescription),
    path: `/${city.slug}`,
    keywords: [
      `Interior Designers in ${city.name}`,
      `Home Interiors ${city.name}`,
      `Modular Kitchen ${city.name}`,
      `Interior Design ${city.name}`,
    ],
  })
}

const coreServices = serviceCategories.filter((s) => s.group === 'core').slice(0, 6)

/** Data-driven city page — all unique copy comes from locations.ts. */
export default function CityPage({ slug }: { slug: string }) {
  const city = getCity(slug)
  if (!city) notFound()
  const cityProjects = projectsInCity(city.projectKey)

  return (
    <>
      <PageStub
        title={`Interior Designers in ${city.name}`}
        kicker={`RGL Decors · ${city.name}`}
        intro={city.intro}
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Locations', path: routes.locations },
          { name: city.name, path: `/${city.slug}` },
        ]}
        cta={{ label: 'Book a Free Site Visit', href: routes.getQuote }}
      >
        <div className="space-y-14">
          {/* Areas covered */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Areas we cover in {city.name}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {city.areas.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border border-divider bg-white px-3.5 py-1.5 text-sm text-ink"
                >
                  <MapPin size={14} className="text-accent" aria-hidden="true" /> {a}
                </span>
              ))}
            </div>
            {city.nearby && <p className="mt-4 text-sm text-muted">{city.nearby}</p>}
          </section>

          {/* Housing context (unique) */}
          <section className="flex items-start gap-4 rounded-2xl border border-divider bg-white p-6 shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
              <HomeIcon size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-lg">Homes in {city.name}</h2>
              <p className="mt-1 text-ink/75">{city.housing}</p>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">What we design in {city.name}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {coreServices.map((s) => (
                <Link
                  key={s.slug}
                  href={routes.service(s.slug)}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-divider bg-white px-5 py-4 shadow-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="font-serif">{s.name}</span>
                  <ArrowUpRight size={16} className="text-accent" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-4">
              <Link href={routes.services} className="text-sm font-medium text-accent hover:underline">
                See all interior design services →
              </Link>
            </p>
          </section>

          {/* Projects in this city — only when tagged (graceful otherwise) */}
          {cityProjects.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">Our projects in {city.name}</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cityProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={routes.portfolioProject(p.slug)}
                    className="group block overflow-hidden rounded-2xl border border-divider bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="skeleton relative aspect-[4/3] w-full overflow-hidden">
                      <ProjectCover project={p} sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted">{p.scope}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* City-specific FAQs (+ FAQPage schema, in sync) */}
          <PricingFaqs faqs={city.faqs} id={`city-${city.projectKey}`} />
        </div>
      </PageStub>

      <JsonLd id={`ld-city-${city.projectKey}`} data={cityCoverageSchema(city)} />
    </>
  )
}
