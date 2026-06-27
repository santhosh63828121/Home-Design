import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { serviceGroups, servicesPositioning } from '@/data/services'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Services in Chennai',
  description:
    'Every interior service under one roof in Chennai — residential, commercial, modular, civil, MEP, outdoor, soft furnishings and after-sales, by RGL Decors.',
  path: routes.services,
  keywords: [
    'Interior Design Services Chennai',
    'Home Interior Designers Chennai',
    'Turnkey Interior Chennai',
    'Modular Kitchen Chennai',
  ],
})

export default function ServicesIndexPage() {
  return (
    <PageStub
      title="Interior Design Services in Chennai"
      kicker="RGL Decors · Services"
      intro={`${servicesPositioning} Eight categories, one accountable partner — designed and factory-built by RGL Decors, with free 3D walkthroughs and a single, itemised quote.`}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Services', path: routes.services },
      ]}
    >
      <div className="space-y-6">
        {serviceGroups.map((g) => (
          <section
            key={g.id}
            className="rounded-2xl border border-divider bg-white p-6 shadow-card sm:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/10 font-serif text-lg font-bold text-teal">
                {g.letter}
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-xl font-bold sm:text-2xl">{g.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{g.body}</p>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) =>
                item.slug ? (
                  <li key={item.name}>
                    <Link
                      href={routes.service(item.slug)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/[0.04] px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-teal hover:bg-teal/10"
                    >
                      {item.name}
                      <ArrowUpRight
                        size={14}
                        className="text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ) : (
                  <li
                    key={item.name}
                    className="inline-flex items-center rounded-full border border-divider bg-background px-3.5 py-1.5 text-sm text-muted"
                  >
                    {item.name}
                  </li>
                ),
              )}
            </ul>
          </section>
        ))}
      </div>
    </PageStub>
  )
}
