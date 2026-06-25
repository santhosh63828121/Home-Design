import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata, clampDesc } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { serviceCategories } from '@/data/business'
import { JsonLd, serviceSchema } from '@/lib/structured-data'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }))
}

const getCategory = (slug: string) => serviceCategories.find((s) => s.slug === slug)

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return buildMetadata({ title: 'Service', noindex: true })
  return buildMetadata({
    title: `${cat.name} in Chennai`,
    description: clampDesc(
      `Custom ${cat.name} in Chennai by RGL Decors — free HD 3D design, 1000+ laminates and finishes, branded hardware, a 10-year warranty and guaranteed 45-day delivery.`,
    ),
    path: routes.service(cat.slug),
    keywords: [`${cat.name} Chennai`, 'Interior Designers in Chennai', 'RGL Decors'],
  })
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const cat = getCategory(slug)!
  const related = serviceCategories.filter((s) => s.slug !== cat.slug).slice(0, 6)

  return (
    <>
      <PageStub
        title={`${cat.name} in Chennai`}
        kicker="RGL Decors · Services"
        intro={`Custom ${cat.name.toLowerCase()} designed and factory-built by RGL Decors for homes across Chennai — with free 3D walkthroughs, 1000+ finishes and a 10-year warranty. A detailed page with layouts, materials, pricing and FAQs is on the way.`}
        crumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Services', path: routes.services },
          { name: cat.name, path: routes.service(cat.slug) },
        ]}
        cta={{ label: 'Get a Free 3D Design', href: routes.getQuote }}
      >
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Related services</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={routes.service(s.slug)}
              className="rounded-full border border-divider bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {s.name}
            </Link>
          ))}
          <Link
            href={routes.pricing}
            className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
          >
            See pricing <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </PageStub>

      <JsonLd
        id="ld-service"
        data={serviceSchema({
          name: cat.name,
          description: `${cat.name} by RGL Decors in Chennai.`,
          slug: cat.slug,
        })}
      />
    </>
  )
}
