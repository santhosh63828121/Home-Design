import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, ArrowUpRight } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import { ProjectCover } from '@/components/portfolio/ProjectVisuals'
import LocationShell from './LocationShell'
import SectionHead from './SectionHead'
import CityFaqs from './CityFaqs'
import LocationCta from './LocationCta'
import { cityImagery } from './cityImagery'
import { getCity, allLocations } from '@/data/locations'
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

/**
 * THE CITY TEMPLATE — one file, twenty-one routes.
 * =============================================================================
 * Every /interior-designers-<city> page is this component with a different slug.
 * So the only honest way to make these pages feel premium is to make the
 * TEMPLATE premium — never a per-city variant, which is how a 20-page family
 * rots into 20 different pages.
 *
 * The layout is a magazine spread: an editorial masthead over a full-bleed
 * photograph, then alternating white / bone bands, each opened by a tracked
 * eyebrow, a gold hairline and a light Cormorant headline. Every list — areas,
 * services, FAQs, other locations — is a RULED INDEX, not a grid of drop-shadow
 * boxes: the hairline is what separates a gallery from a dashboard (§4).
 *
 * WHAT IS UNIQUE PER CITY IS THE CONTENT, AND ALL OF IT IS THE CONTENT WE
 * ALREADY HAD. intro, housing, areas, nearby, tagline and faqs come verbatim
 * from locations.ts — restructured, never rewritten, and nothing invented: no
 * project counts, no "500 homes in Adyar", no fabricated ratings (§6). The two
 * photographs are dealt deterministically from one curated library (cityImagery)
 * and their alt text never claims the room is in this city.
 *
 * SEO IS LOAD-BEARING AND UNTOUCHED:
 *   · `cityMetadata()` — same title / description / canonical / keywords
 *   · BreadcrumbList — emitted by LocationShell, same builder, same script id
 *   · FAQPage — emitted by CityFaqs from the same `city.faqs` array
 *   · HomeAndConstructionBusiness + GeoCircle — `cityCoverageSchema(city)`, as-is
 *   · Internal links — services, tagged projects and every sibling location, all
 *     resolved through `routes`, so a link here cannot rot into a 404.
 */
export default function CityPage({ slug }: { slug: string }) {
  const city = getCity(slug)
  if (!city) notFound()

  const cityProjects = projectsInCity(city.projectKey)
  const { hero, detail } = cityImagery(city.slug)
  const elsewhere = allLocations.filter((c) => c.slug !== city.slug)

  /**
   * Section rhythm. The bands alternate white → bone as the page evaluates
   * top-down, so the rhythm stays correct even though the projects section only
   * exists for cities with tagged case studies.
   */
  let n = 0
  const band = () => (n++ % 2 === 0 ? 'bg-bone' : 'bg-background')

  return (
    <>
      <LocationShell
        kicker={`RGL Décors · ${city.name}`}
        title={`Interior Designers in ${city.name}`}
        intro={city.intro}
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Locations', path: routes.locations },
          { name: city.name, path: `/${city.slug}` },
        ]}
        cta={{ label: 'Book a Free Site Visit', href: routes.getQuote }}
        media={hero}
        caption={city.tagline}
      >
        {/* ── The local brief ─────────────────────────────────────────────────
            The one paragraph that no other city page has. It gets a spread of
            its own, a photograph beside it, and nothing else competing. */}
        <section aria-labelledby="housing-heading" className={`section-y ${band()}`}>
          <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <SectionReveal>
              <p className="eyebrow">The local brief</p>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <h2
                id="housing-heading"
                className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink"
              >
                Homes in <span className="italic text-accent">{city.name}</span>
              </h2>
              <p className="mt-8 max-w-prose2 text-pretty text-lede leading-relaxed text-ink/70">
                {city.housing}
              </p>
            </SectionReveal>

            {/* Hairline frame, slow zoom on hover, lazy — it is well below the
                fold and must not compete with the masthead image for bandwidth. */}
            <SectionReveal
              variant="fadeUp"
              className="lux-media lux-tint relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-divider"
            >
              <Image
                src={detail.src}
                alt={detail.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </SectionReveal>
          </div>
        </section>

        {/* ── Coverage ────────────────────────────────────────────────────── */}
        <section aria-labelledby="areas-heading" className={`section-y ${band()}`}>
          <div className="shell">
            <SectionHead
              id="areas-heading"
              eyebrow="Coverage"
              title={<>Areas we cover in {city.name}</>}
            >
              {city.nearby}
            </SectionHead>

            <SectionReveal stagger as="ul" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
              {city.areas.map((area, i) => (
                <RevealItem
                  as="li"
                  key={area}
                  className="group flex items-center gap-6 border-b border-divider py-6"
                >
                  <span className="font-caps text-[10px] tracking-wide2 text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <MapPin
                    size={16}
                    strokeWidth={1.25}
                    className="shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-lg text-ink">{area}</span>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* ── Services ────────────────────────────────────────────────────────
            A ruled index of real service routes — every href resolves through
            `routes.service()`, so this cannot become a dead internal link. */}
        <section aria-labelledby="services-heading" className={`section-y ${band()}`}>
          <div className="shell">
            <SectionHead
              id="services-heading"
              eyebrow="The work"
              title={<>What we design in {city.name}</>}
            >
              Design, factory-build and installation, handled end to end by one team — so the home
              you were shown is the home you receive.
            </SectionHead>

            <SectionReveal stagger as="ul" className="mt-4 grid lg:grid-cols-2 lg:gap-x-20">
              {coreServices.map((s, i) => (
                <RevealItem as="li" key={s.slug} className="group relative border-b border-divider">
                  {/* The gold rule draws across the row on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                  />
                  <Link
                    href={routes.service(s.slug)}
                    className="flex items-center gap-6 py-8 transition-transform duration-700 ease-lux group-hover:translate-x-1.5"
                  >
                    <span className="font-caps text-[10px] tracking-wide2 text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 font-serif text-title font-normal text-ink">
                      {s.name}
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.25}
                      className="shrink-0 text-accent"
                      aria-hidden="true"
                    />
                  </Link>
                </RevealItem>
              ))}
            </SectionReveal>

            <SectionReveal className="mt-12">
              <Link
                href={routes.services}
                className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
              >
                See all interior design services
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* ── Projects in this city — only when tagged (graceful otherwise) ─── */}
        {cityProjects.length > 0 && (
          <section aria-labelledby="projects-heading" className={`section-y ${band()}`}>
            <div className="shell">
              <SectionHead
                id="projects-heading"
                eyebrow="Case studies"
                title={<>Our projects in {city.name}</>}
              />

              <SectionReveal stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cityProjects.map((p) => (
                  <RevealItem key={p.slug}>
                    <Link
                      href={routes.portfolioProject(p.slug)}
                      className="lux-lift group block h-full overflow-hidden rounded-sm border border-divider bg-white"
                    >
                      <div className="lux-media skeleton relative aspect-[4/3] w-full">
                        <ProjectCover project={p} sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-title font-normal text-ink">{p.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.scope}</p>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </SectionReveal>
            </div>
          </section>
        )}

        {/* ── City FAQs (+ the FAQPage schema, from the same array) ─────────── */}
        <section aria-labelledby={`faq-city-${city.projectKey}`} className={`section-y ${band()}`}>
          <div className="shell">
            <CityFaqs
              faqs={city.faqs}
              id={`city-${city.projectKey}`}
              eyebrow={`${city.name} · Questions`}
            />
          </div>
        </section>

        {/* ── Sibling locations — the internal-link mesh, all real routes ───── */}
        <section aria-labelledby="elsewhere-heading" className={`section-y ${band()}`}>
          <div className="shell">
            <SectionHead
              id="elsewhere-heading"
              eyebrow="Elsewhere"
              title={
                <>
                  Where else we <span className="italic text-accent">work</span>
                </>
              }
            >
              Chennai neighbourhoods and cities across Tamil Nadu — each with the localities we
              cover, the local housing context and answers specific to where you live.
            </SectionHead>

            <SectionReveal stagger as="ul" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
              {elsewhere.map((c) => (
                <RevealItem as="li" key={c.slug} className="border-b border-divider">
                  <Link
                    href={routes.city(c.slug)}
                    className="group flex items-center justify-between gap-4 py-6 transition-transform duration-700 ease-lux hover:translate-x-1.5"
                  >
                    <span className="font-serif text-lg text-ink">{c.name}</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.25}
                      className="shrink-0 text-accent"
                      aria-hidden="true"
                    />
                  </Link>
                </RevealItem>
              ))}
            </SectionReveal>

            <SectionReveal className="mt-12">
              <Link
                href={routes.locations}
                className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
              >
                All locations
              </Link>
            </SectionReveal>
          </div>
        </section>

        <LocationCta place={city.name} />
      </LocationShell>

      <JsonLd id={`ld-city-${city.projectKey}`} data={cityCoverageSchema(city)} />
    </>
  )
}
