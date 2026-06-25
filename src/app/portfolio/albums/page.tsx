import type { Metadata } from 'next'
import Link from 'next/link'
import PageStub from '@/components/page/PageStub'
import { ProjectCover } from '@/components/portfolio/ProjectVisuals'
import { projects } from '@/data/portfolio'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata({
  title: 'Project Photo Albums',
  description:
    'Browse RGL Decors interior design photo albums by project — apartments, villas, offices and full-home interiors completed across Chennai and Tamil Nadu.',
  path: routes.portfolioAlbums,
})

export default function AlbumsPage() {
  return (
    <PageStub
      title="Project Photo Albums"
      kicker="RGL Decors · Portfolio"
      intro="Photo albums grouped by project. Open a project to see its full set of images, before/after reveals and 3D walkthrough as they are published."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Portfolio', path: routes.portfolio },
        { name: 'Albums', path: routes.portfolioAlbums },
      ]}
      cta={{ label: 'Get a Similar Design', href: routes.getQuote }}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const count = p.media.gallery?.length ?? 0
          return (
            <Link
              key={p.slug}
              href={routes.portfolioProject(p.slug)}
              className="group block overflow-hidden rounded-2xl border border-divider bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="skeleton relative aspect-[4/3] w-full overflow-hidden">
                <ProjectCover project={p} sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">
                  {count > 0 ? `${count} photos` : 'Album coming soon'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </PageStub>
  )
}
