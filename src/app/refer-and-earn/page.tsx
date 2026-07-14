import type { Metadata } from 'next'
import Link from 'next/link'
import { UserPlus, Home, Gift, ArrowRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { whatsappLink, business } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'Refer & Earn',
  description:
    'Refer friends and family to RGL Decors and earn a thank-you reward when they design their home interiors with us in Chennai. A simple three-step programme.',
  path: routes.refer,
})

const steps = [
  {
    icon: UserPlus,
    title: 'Refer someone',
    text: 'Share RGL Decors with a friend or family member who is planning their home interiors — send us their name and number, or have them mention you.',
  },
  {
    icon: Home,
    title: 'They design with us',
    text: 'Your referral books a free 3D consultation and goes ahead with their interior project.',
  },
  {
    icon: Gift,
    title: 'You both benefit',
    text: 'Once their project is confirmed, we say thank you with a referral reward for you and a welcome benefit for them.',
  },
]

const referHref = whatsappLink(
  "Hi RGL Decors, I'd like to refer someone to the Refer & Earn programme.",
)

export default function ReferAndEarnPage() {
  return (
    <PageStub
      title="Refer a Friend, Earn a Reward"
      kicker="RGL Decors · Refer & Earn"
      intro="Loved your new interiors? Pass the word on. When someone you refer designs their home with RGL Decors, there's a thank-you reward in it for you — and a welcome benefit for them."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Refer & Earn', path: routes.refer },
      ]}
      cta={{ label: 'Refer Someone Now', href: referHref }}
    >
      <div className="space-y-14">
        <section>
          <h2 className="font-serif text-2xl font-medium sm:text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <li key={s.title} className="rounded-2xl border border-divider bg-white p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-caps text-sm font-bold text-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{s.text}</p>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Honest note: reward specifics are confirmed per project, not invented here */}
        <section className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-6 text-sm text-ink/80">
          <p>
            <span className="font-semibold text-ink">Good to know:</span> reward details depend on the
            referred project&apos;s scope and our current offer. Reach out and our team will confirm
            exactly what you&apos;ll receive before your friend gets started — no fine-print
            surprises.
          </p>
        </section>

        <section className="rounded-2xl bg-accent px-8 py-10 text-center text-white sm:px-10">
          <h2 className="font-serif text-2xl font-medium sm:text-3xl">Know someone planning their home?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Send us their details on WhatsApp, or ask any question about the programme.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={referHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-white font-bold text-accent hover:bg-white/90"
            >
              Refer on WhatsApp <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link
              href={routes.contact}
              className="btn-pill border border-white/70 bg-transparent text-white hover:bg-white/10"
            >
              Ask a Question
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">Or call us at {business.nap.phoneDisplay}</p>
        </section>
      </div>
    </PageStub>
  )
}
