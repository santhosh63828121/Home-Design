import type { Metadata } from 'next'
import Link from 'next/link'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import GalleryAccordion from '@/components/GalleryAccordion.jsx'
import LookbookGate from '@/components/LookbookGate'
import { projects, PORTFOLIO_BUDGET_FOOTNOTE } from '@/data/portfolio'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Portfolio Chennai',
  description:
    'Explore RGL Decors interior design projects across Chennai — apartments, villas, offices and full-home interiors. Filter by space, style, BHK and budget.',
  path: routes.portfolio,
})

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'RGL Decors Interior Design Projects',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${siteConfig.url}${routes.portfolioProject(p.slug)}`,
    name: p.title,
  })),
}

export default function PortfolioPage() {
  return (
    <>
      <PageStub
        title="Our Interior Design Projects"
        kicker="RGL Décors · Signature Projects"
        intro="Every photograph here is not just a showcase — it's a story of trust placed in us, and a lifestyle elevated through design. These are real homes, offices and spaces across Chennai and Tamil Nadu, each crafted with precision, emotion and identity. Explore by space, style, BHK or budget; each case study opens in detail."
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Portfolio', path: routes.portfolio },
        ]}
        cta={{ label: 'Get a Similar Design', href: routes.getQuote }}
      >
        <div className="space-y-16">
          <section>
            <PortfolioGrid projects={projects} />
            <p className="mt-4 text-xs text-muted">{PORTFOLIO_BUDGET_FOOTNOTE}</p>
          </section>

          {/* Design inspiration by space (category imagery, reusing GalleryAccordion) */}
          <SectionReveal as="section" variant="fadeUp" amount={0.15}>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Explore interiors by space</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              Inspiration across the rooms we design every day. Browse the look, then see our real
              projects above.
            </p>
            <div className="mt-2">
              <GalleryAccordion />
            </div>
          </SectionReveal>

          <SectionReveal variant="scaleIn" amount={0.2}>
            <LookbookGate />
          </SectionReveal>

          <SectionReveal as="p" variant="fadeUp">
            <Link href={routes.portfolioAlbums} className="lux-underline text-sm font-medium text-accent">
              Browse all photo albums →
            </Link>
          </SectionReveal>
        </div>
      </PageStub>

      <JsonLd id="ld-portfolio-list" data={itemList} />
    </>
  )
}
