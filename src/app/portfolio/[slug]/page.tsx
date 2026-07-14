import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider.jsx'
import { RenderVsReal, YouTubeEmbed } from '@/components/portfolio/media'
import { ProjectCover } from '@/components/portfolio/ProjectVisuals'
import ProjectGalleryLux from '@/components/portfolio/ProjectGalleryLux'
import {
  projects,
  getProject,
  hasBeforeAfter,
  hasRenderVsReal,
  hasVideo,
  hasGallery,
  hasNarrative,
  hasMaterials,
  hasTour,
  PORTFOLIO_MEDIA_NOTE,
} from '@/data/portfolio'
import { serviceCategories } from '@/data/business'
import { buildMetadata, clampDesc } from '@/lib/seo'
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
    description: clampDesc(
      `${p.summary} A ${p.style.toLowerCase()} interior design project in Chennai by RGL Decors.`,
    ),
    path: routes.portfolioProject(p.slug),
    ogImage: p.media.cover?.src,
  })
}

const serviceName = (slug: string) => serviceCategories.find((s) => s.slug === slug)?.name ?? slug

/**
 * IMMERSIVE CASE STUDY
 * ====================
 * A full-height opening plate, then a sticky-rail spread: the project's facts
 * hold position on the left while the story, the rooms and the materials scroll
 * past on the right. That sticky rail is the whole trick — it keeps the reader
 * oriented in a long page without a single line of JavaScript (`position: sticky`
 * only), and it is what makes a case study read like a monograph rather than a
 * blog post.
 *
 * EVERY editorial section below is GATED on real data. These are real, named
 * clients: we do not write their goals, challenges, materials or outcomes for
 * them. A project with no story shows its facts, its photographs and a CTA — a
 * complete, premium page with nothing invented in it. Each section lights up on
 * its own the moment RGL supplies the content.
 */
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Portfolio', path: routes.portfolio },
    { name: p.title, path: routes.portfolioProject(p.slug) },
  ]

  // Optional rows render only when set — never a guessed area / timeline / tier.
  const facts = [
    { k: 'Client', v: p.client },
    { k: 'Type', v: p.space },
    p.bhk ? { k: 'Configuration', v: p.bhk } : null,
    p.location ? { k: 'Location', v: p.location } : null,
    p.areaSqft ? { k: 'Area', v: `${p.areaSqft.toLocaleString('en-IN')} sq.ft` } : null,
    { k: 'Style', v: p.style },
    p.tier ? { k: 'Tier', v: p.tier } : null,
    p.timeline ? { k: 'Timeline', v: p.timeline } : null,
    { k: 'Budget band', v: p.budgetBand },
  ].filter(Boolean) as { k: string; v: string }[]

  const story = (
    [
      ['Overview', p.narrative?.overview],
      ['The client’s goal', p.narrative?.goal ?? p.narrative?.brief],
      ['The design challenge', p.narrative?.challenge],
      ['Our design thinking', p.narrative?.thinking ?? p.narrative?.solution],
      ['Material selection', p.narrative?.materials],
      ['Execution', p.narrative?.execution],
      ['The outcome', p.narrative?.outcome ?? p.narrative?.result],
      ['The client’s experience', p.narrative?.experience],
    ] as const
  ).filter(([, v]) => v)

  const others = projects.filter((o) => o.slug !== p.slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* ── The opening plate ─────────────────────────────────────────────
            Full height. No framer `initial` anywhere in here: an SSR'd
            opacity:0 (or a masked translateY) is invisible, cannot be the LCP,
            and would make the hero wait for hydration. The reveal is CSS
            keyframes (.hero-fade / .hero-rise), which run at first paint. */}
        <section
          data-hero-dark
          className="relative flex h-svh min-h-[620px] w-full flex-col justify-end overflow-hidden bg-olive-deep"
        >
          <div className="absolute inset-0 animate-kenBurns motion-reduce:animate-none">
            <ProjectCover project={p} sizes="100vw" priority />
          </div>
          {/* The grade — without it, white type over a sunlit room fails AA. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/35 to-olive-deep/45"
          />

          <div className="shell relative pb-20">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-caps text-[10px] uppercase tracking-wide2 text-white/60">
                <li>
                  <Link href={routes.home} className="transition-colors hover:text-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/30">
                  /
                </li>
                <li>
                  <Link href={routes.portfolio} className="transition-colors hover:text-gold">
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/30">
                  /
                </li>
                <li className="text-white">{p.title}</li>
              </ol>
            </nav>

            <p
              className="hero-fade font-caps text-[10px] uppercase tracking-wide4 text-gold"
              style={{ '--d': '100ms' } as React.CSSProperties}
            >
              {p.space}
              {p.bhk ? ` · ${p.bhk}` : ''} · {p.style}
            </p>

            <span
              aria-hidden="true"
              className="hero-rule mt-6 block h-px w-16 bg-gold"
              style={{ '--d': '250ms' } as React.CSSProperties}
            />

            <h1 className="mt-8 max-w-[16ch] font-serif text-display font-light text-white">
              <span className="hero-mask pb-[0.06em]">
                <span
                  className="hero-rise"
                  style={{ '--d': '300ms' } as React.CSSProperties}
                >
                  {p.title}
                </span>
              </span>
            </h1>

            <p
              className="hero-fade mt-8 max-w-prose2 text-lede text-pretty text-white/80"
              style={{ '--d': '520ms' } as React.CSSProperties}
            >
              {p.summary}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hero-fade pointer-events-none absolute inset-x-0 bottom-7 flex justify-center text-white/50"
            style={{ '--d': '900ms' } as React.CSSProperties}
          >
            <ChevronDown size={16} className="animate-bounceArrow motion-reduce:animate-none" />
          </div>
        </section>

        {/* ── Sticky-rail spread ────────────────────────────────────────────
            `position: sticky` (not a GSAP pin): real layout, zero JS, and — unlike
            a pin — completely immune to ancestor transforms, of which this site
            has many. */}
        <div className="shell section-y grid gap-x-16 gap-y-16 lg:grid-cols-[19rem_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">The project</p>
            <span aria-hidden="true" className="rule-gold mt-6" />

            <dl className="mt-8">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 border-b border-divider py-4"
                >
                  <dt className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
                    {f.k}
                  </dt>
                  <dd className="text-right text-sm text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>

            {p.services.length > 0 && (
              <div className="mt-8">
                <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
                  Services used
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <li key={s}>
                      <Link
                        href={routes.service(s)}
                        className="inline-flex rounded-full border border-divider px-4 py-1.5 text-sm text-ink transition-colors duration-500 hover:border-accent hover:text-accent"
                      >
                        {serviceName(s)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={routes.getQuote} className="btn-pill btn-olive mt-10 w-full justify-center">
              Get a similar design
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </aside>

          {/* ── The scrolling column ─────────────────────────────────────── */}
          <div className="min-w-0 space-y-24">
            <SectionReveal as="section" variant="fadeUp">
              <h2 className="font-serif text-headline font-light text-ink">The brief</h2>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <p className="mt-8 max-w-prose2 text-lede text-pretty leading-relaxed text-ink/75">
                {p.scope}
              </p>
            </SectionReveal>

            {/* Structured narrative — renders only when RGL supplies it. */}
            {hasNarrative(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">The story</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <div className="mt-10 space-y-12">
                  {story.map(([label, v]) => (
                    <div key={label} className="border-t border-divider pt-8">
                      <h3 className="font-caps text-[10px] uppercase tracking-wide4 text-accent">
                        {label}
                      </h3>
                      <p className="mt-4 max-w-prose2 text-pretty leading-relaxed text-ink/75">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            )}

            {/* Material palette — a swatch spread, gated on real specification. */}
            {hasMaterials(p) && (
              <SectionReveal as="section" variant="fadeUp" stagger>
                <h2 className="font-serif text-headline font-light text-ink">Material palette</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <p className="mt-6 max-w-prose2 leading-relaxed text-ink/70">
                  Every surface in this home was specified for how it would age in Chennai — not
                  for how it photographs on day one.
                </p>
                <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {p.materials!.map((m, i) => (
                    <RevealItem key={m.name}>
                      <div className="group border-t border-divider pt-6 transition-colors duration-700 hover:border-gold">
                        <span className="font-caps text-[10px] tracking-wide2 text-gold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-3 font-serif text-title font-normal text-ink">
                          {m.name}
                        </h3>
                        {m.note && (
                          <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.note}</p>
                        )}
                      </div>
                    </RevealItem>
                  ))}
                </div>
              </SectionReveal>
            )}

            {/* Before / after — only when real pairs exist. */}
            {hasBeforeAfter(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">Before &amp; after</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <div className="mt-10 space-y-10">
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
              </SectionReveal>
            )}

            {/* 3D-vs-final — only when both images exist. */}
            {hasRenderVsReal(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">
                  The 3D, and the room
                </h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <p className="mt-6 max-w-prose2 leading-relaxed text-ink/70">
                  What you approve in the walkthrough is what gets built. Here they are, side by
                  side.
                </p>
                <div className="mt-10">
                  <RenderVsReal pair={p.media.renderVsReal!} />
                </div>
              </SectionReveal>
            )}

            {/* Walkthrough video — only when an id exists. */}
            {hasVideo(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">3D walkthrough</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <div className="mt-10">
                  <YouTubeEmbed id={p.media.youTubeId as string} title={`${p.title} walkthrough`} />
                </div>
              </SectionReveal>
            )}

            {/* 360° virtual tour — only when a URL exists. */}
            {hasTour(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">360° virtual tour</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <div className="mt-10 aspect-video w-full overflow-hidden border border-divider">
                  <iframe
                    src={p.tour360}
                    title={`${p.title} — 360° tour`}
                    loading="lazy"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </SectionReveal>
            )}

            {/* Gallery — room-wise navigation + premium lightbox. */}
            {hasGallery(p) && (
              <SectionReveal as="section" variant="fadeUp">
                <h2 className="font-serif text-headline font-light text-ink">Room by room</h2>
                <span aria-hidden="true" className="rule-gold mt-6" />
                <div className="mt-10">
                  <ProjectGalleryLux images={p.media.gallery!} />
                </div>
                {PORTFOLIO_MEDIA_NOTE && (
                  <p className="mt-8 border-t border-divider pt-6 text-xs leading-relaxed text-muted">
                    {PORTFOLIO_MEDIA_NOTE}
                  </p>
                )}
              </SectionReveal>
            )}

            {/* Client's own words — only when a real quote exists. */}
            {p.testimonial && (
              <SectionReveal as="section" variant="scaleIn">
                <figure className="border-y border-divider py-14">
                  <blockquote className="max-w-3xl text-balance font-serif text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.3] text-ink">
                    <span aria-hidden="true" className="text-gold">
                      “
                    </span>
                    {p.testimonial.quote}
                    <span aria-hidden="true" className="text-gold">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span aria-hidden="true" className="h-px w-10 bg-gold" />
                    <span className="font-caps text-[11px] uppercase tracking-wide2 text-ink">
                      {p.testimonial.author}
                    </span>
                    {p.testimonial.role && (
                      <span className="font-caps text-[11px] uppercase tracking-wide2 text-muted">
                        {p.testimonial.role}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </SectionReveal>
            )}

            {/* How a home like this is made — the STUDIO's stated process, linked
                out. Deliberately not presented as this project's timeline: we
                have not been given per-project phase dates and will not invent
                them for a named client. */}
            <SectionReveal as="section" variant="fadeUp">
              <h2 className="font-serif text-headline font-light text-ink">
                How a home like this is made
              </h2>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <p className="mt-6 max-w-prose2 leading-relaxed text-ink/70">
                Every RGL project runs the same ten-step route from first measurement to handover —
                design, factory build, site execution, and a year of care afterwards.
              </p>
              <Link
                href={routes.process}
                className="lux-underline mt-8 inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-accent"
              >
                See our full process
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </SectionReveal>
          </div>
        </div>

        {/* ── More projects ──────────────────────────────────────────────── */}
        {others.length > 0 && (
          <section className="section-y bg-bone">
            <div className="shell">
              <div className="flex items-end justify-between gap-8 border-b border-divider pb-10">
                <div>
                  <p className="eyebrow">Keep looking</p>
                  <span aria-hidden="true" className="rule-gold mt-6" />
                  <h2 className="mt-8 font-serif text-headline font-light text-ink">
                    More projects
                  </h2>
                </div>
                <Link
                  href={routes.portfolio}
                  className="lux-underline hidden shrink-0 font-caps text-[11px] uppercase tracking-wide2 text-accent sm:inline-flex"
                >
                  All projects
                </Link>
              </div>

              <SectionReveal stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <RevealItem key={o.slug}>
                    <Link
                      href={routes.portfolioProject(o.slug)}
                      data-cursor="view"
                      className="group block"
                    >
                      <div className="lux-media lux-tint skeleton relative aspect-[4/3] w-full overflow-hidden bg-white">
                        <ProjectCover
                          project={o}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="relative pt-6">
                        <span className="absolute inset-x-0 top-0 h-px bg-divider" aria-hidden="true" />
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                        />
                        <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
                          {o.space} · {o.style}
                        </p>
                        <h3 className="mt-2 font-serif text-title font-normal text-ink transition-colors duration-500 group-hover:text-accent">
                          {o.title}
                        </h3>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </SectionReveal>
            </div>
          </section>
        )}
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
