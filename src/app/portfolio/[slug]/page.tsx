import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Quote } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider.jsx'
import { RenderVsReal, YouTubeEmbed } from '@/components/portfolio/media'
import { ProjectCover, ProjectGallery } from '@/components/portfolio/ProjectVisuals'
import {
  projects,
  getProject,
  hasBeforeAfter,
  hasRenderVsReal,
  hasVideo,
  hasGallery,
} from '@/data/portfolio'
import { serviceCategories } from '@/data/business'
import { buildMetadata, siteConfig, clampDesc } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd, creativeWorkSchema, breadcrumbSchema } from '@/lib/structured-data'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return buildMetadata({ title: 'Project', noindex: true })
  return buildMetadata({
    // buildMetadata already appends " | RGL Decors", so don't repeat the brand.
    title: p.title,
    description: clampDesc(`${p.summary} A ${p.style.toLowerCase()} interior design project in Chennai by RGL Decors.`),
    path: routes.portfolioProject(p.slug),
    ogImage: p.media.cover?.src,
  })
}

const serviceName = (slug: string) => serviceCategories.find((s) => s.slug === slug)?.name ?? slug

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Portfolio', path: routes.portfolio },
    { name: p.title, path: routes.portfolioProject(p.slug) },
  ]
  const facts = [
    { k: 'Client', v: p.client },
    { k: 'Space', v: p.space },
    p.bhk ? { k: 'Configuration', v: p.bhk } : null,
    { k: 'Style', v: p.style },
    { k: 'Budget band', v: p.budgetBand },
  ].filter(Boolean) as { k: string; v: string }[]

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero — real cover if present, else branded placeholder */}
        <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
          <ProjectCover project={p} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex flex-wrap gap-2 font-caps text-[11px] uppercase tracking-wide2 text-white/70">
                <li>
                  <Link href={routes.home} className="hover:text-white">Home</Link> /
                </li>
                <li>
                  <Link href={routes.portfolio} className="hover:text-white">Portfolio</Link> /
                </li>
                <li className="text-white">{p.title}</li>
              </ol>
            </nav>
            <p className="font-caps text-xs uppercase tracking-wide2 text-amber-300">
              {p.space}
              {p.bhk ? ` · ${p.bhk}` : ''} · {p.style}
            </p>
            <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold text-white sm:text-5xl">
              {p.title}
            </h1>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            {/* Main column */}
            <div className="space-y-12">
              <section>
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">Overview</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{p.summary}</p>
                <p className="mt-3 max-w-2xl text-ink/70">{p.scope}</p>
              </section>

              {/* Walkthrough video — only when an id exists */}
              {hasVideo(p) && (
                <section>
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">3D walkthrough</h2>
                  <div className="mt-5">
                    <YouTubeEmbed id={p.media.youTubeId as string} title={`${p.title} walkthrough`} />
                  </div>
                </section>
              )}

              {/* 3D-vs-final — only when both images exist */}
              {hasRenderVsReal(p) && (
                <section>
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">3D design vs. reality</h2>
                  <div className="mt-5">
                    <RenderVsReal pair={p.media.renderVsReal!} />
                  </div>
                </section>
              )}

              {/* Before / after — only when pairs exist */}
              {hasBeforeAfter(p) && (
                <section>
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">Before &amp; after</h2>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    {p.media.beforeAfter!.map((pair, i) => (
                      <BeforeAfterSlider
                        key={i}
                        beforeSrc={pair.before.src}
                        afterSrc={pair.after.src}
                        afterAlt={pair.after.alt}
                        label={pair.label}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery — only when images exist */}
              {hasGallery(p) && (
                <section>
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">Gallery</h2>
                  <div className="mt-5">
                    <ProjectGallery images={p.media.gallery} />
                  </div>
                </section>
              )}

              {/* Testimonial — only when present */}
              {p.testimonial && (
                <figure className="rounded-2xl bg-ink p-8 text-white">
                  <Quote size={28} className="text-amber-300/80" aria-hidden="true" />
                  <blockquote className="mt-3 font-serif text-xl leading-relaxed">
                    {p.testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-white/70">
                    {p.testimonial.author}
                    {p.testimonial.role ? ` · ${p.testimonial.role}` : ''}
                  </figcaption>
                </figure>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                <h2 className="font-serif text-lg">Project details</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  {facts.map((f) => (
                    <div key={f.k} className="flex justify-between gap-3 border-b border-divider pb-2">
                      <dt className="text-muted">{f.k}</dt>
                      <dd className="font-medium text-ink">{f.v}</dd>
                    </div>
                  ))}
                </dl>
                {p.services.length > 0 && (
                  <div className="mt-5">
                    <p className="font-caps text-[11px] uppercase tracking-wide2 text-muted">Services used</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.services.map((s) => (
                        <Link
                          key={s}
                          href={routes.service(s)}
                          className="rounded-full border border-divider px-3 py-1 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          {serviceName(s)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-accent p-6 text-white shadow-form">
                <h2 className="font-serif text-xl">Want something like this?</h2>
                <p className="mt-2 text-sm text-white/85">
                  Get a free 3D design and a transparent quote for your {p.space.toLowerCase()}.
                </p>
                <Link
                  href={routes.getQuote}
                  className="btn-pill mt-5 w-full justify-center bg-white font-bold text-accent hover:bg-white/90"
                >
                  Get a Similar Design <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>

          {/* More projects */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">More projects</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {projects
                .filter((o) => o.slug !== p.slug)
                .map((o) => (
                  <Link
                    key={o.slug}
                    href={routes.portfolioProject(o.slug)}
                    className="rounded-full border border-divider bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {o.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <JsonLd
        id="ld-creativework"
        data={creativeWorkSchema({
          name: p.title,
          description: p.summary,
          slug: p.slug,
          images: p.media.cover ? [{ src: p.media.cover.src, alt: p.media.cover.alt }] : [],
        })}
      />
      <JsonLd id="ld-project-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
