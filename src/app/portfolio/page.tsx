import type { Metadata } from 'next'
import Link from 'next/link'
import PageStub from '@/components/page/PageStub'
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
        kicker="RGL Decors · Portfolio"
        intro="Real homes and spaces we have delivered across Chennai and Tamil Nadu. Filter by space, style, BHK or budget to find a project like yours — detailed case studies open with each project."
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
          <section>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Explore interiors by space</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              Inspiration across the rooms we design every day. Browse the look, then see our real
              projects above.
            </p>
            <div className="mt-2">
              <GalleryAccordion />
            </div>
          </section>

          <LookbookGate />

          <p>
            <Link href={routes.portfolioAlbums} className="text-sm font-medium text-accent hover:underline">
              Browse all photo albums →
            </Link>
          </p>
        </div>
      </PageStub>

      <JsonLd id="ld-portfolio-list" data={itemList} />
    </>
  )
}
