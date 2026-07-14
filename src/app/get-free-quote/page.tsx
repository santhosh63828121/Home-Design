import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ShieldCheck, Clock, CheckCircle2, BadgeIndianRupee, Clapperboard } from 'lucide-react'
import Logo from '@/components/ui/Logo.jsx'
import MultiStepLeadForm from '@/components/MultiStepLeadForm'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'Get a Free Interior Design Quote in Chennai',
  description:
    'Get a free, no-obligation interior design quote and an HD 3D walkthrough from RGL Decors in Chennai. Transparent, itemised pricing and a written warranty.',
  path: routes.getQuote,
})

const trustBadges = [
  { icon: Clapperboard, label: 'Free HD 3D walkthrough' },
  { icon: ShieldCheck, label: 'Written warranty on every project' },
  { icon: Clock, label: 'Factory-built — short site time' },
  { icon: CheckCircle2, label: '100+ quality checks' },
  { icon: BadgeIndianRupee, label: business.entryPriceSignal },
]

/**
 * Distraction-free conversion landing: NO full Navbar/Footer (no competing nav
 * links). Just a minimal brand bar, a single value proposition, trust badges and
 * the Phase-0 lead form — one job: capture the quote request.
 */
export default function GetFreeQuotePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal brand bar — logo home link + click-to-call, nothing else */}
      <header className="border-b border-divider bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href={routes.home} aria-label="RGL Decors home">
            <Logo />
          </Link>
          <a
            href={business.nap.tel}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            <Phone size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{business.nap.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-gutter section-y-sm">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">RGL Decors · Free Quote</p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] sm:text-5xl">
            Get a Free 3D Design &amp; Transparent Quote
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Share a few details and we&apos;ll send you a free HD 3D walkthrough plus an itemised,
            no-obligation quote — from modular kitchens to full-home turnkey interiors.
          </p>
        </div>

        {/* Trust badges */}
        <ul className="mx-auto mt-s4 flex max-w-2xl flex-wrap justify-center gap-x-s6 gap-y-s2">
          {trustBadges.map((b) => {
            const Icon = b.icon
            return (
              <li key={b.label} className="inline-flex items-center gap-2 text-sm text-ink/80">
                <Icon size={17} className="text-accent" aria-hidden="true" />
                {b.label}
              </li>
            )
          })}
        </ul>

        {/* Multi-step consultation form → submitLead (validate → persist → email → WhatsApp) */}
        <div className="mx-auto mt-s12 max-w-2xl">
          <MultiStepLeadForm />
        </div>
      </main>

      <footer className="border-t border-divider py-6 text-center text-sm text-muted">
        © {business.established}–present {business.legalName} · {business.nap.addressLocality},{' '}
        {business.nap.addressRegion}
      </footer>
    </div>
  )
}
