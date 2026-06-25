import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { serviceCategories } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Services in Chennai',
  description:
    'Explore all RGL Decors interior design services in Chennai — modular kitchens, wardrobes, TV units, storage, smart homes and full-home turnkey interiors.',
  path: routes.services,
  keywords: [
    'Interior Design Services Chennai',
    'Home Interior Designers Chennai',
    'Modular Kitchen Chennai',
    'Wardrobe Designs Chennai',
  ],
})

export default function ServicesIndexPage() {
  return (
    <PageStub
      title="Interior Design Services in Chennai"
      kicker="RGL Decors · Services"
      intro="End-to-end interiors crafted in our automated factory and installed across Chennai and Tamil Nadu — every category below has a dedicated page, with free 3D walkthroughs, a 10-year warranty and 45-day delivery."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Services', path: routes.services },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((s) => (
          <Link
            key={s.slug}
            href={routes.service(s.slug)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-divider bg-white px-5 py-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="font-serif text-lg">{s.name}</span>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </PageStub>
  )
}
