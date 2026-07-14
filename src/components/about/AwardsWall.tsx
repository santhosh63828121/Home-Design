import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'
import type { Award } from '@/data/credentials'

/**
 * RECOGNITION — built, and switched OFF.
 *
 * A ruled index of real awards: year, title, issuing body, and a proof link when
 * one exists. No trophies, no badges, no "Best Interior Designer 2024" rosette.
 *
 * `credentials.ts → awards` is an EMPTY array today, so the page never mounts
 * this. The gate is the data itself being non-empty — not a separate boolean that
 * could drift out of sync with it. Populate `awards` with an issuer we can point
 * at, and this section appears with zero layout work. Do not populate it with
 * anything else.
 */
export default function AwardsWall({ awards }: { awards: Award[] }) {
  if (awards.length === 0) return null

  return (
    <section id="recognition" aria-labelledby="recognition-heading" className="section-y bg-background">
      <div className="max-w-prose2">
        <p className="eyebrow">Recognition</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2 id="recognition-heading" className="mt-8 font-serif text-headline font-light text-ink">
          Awards & <span className="italic text-accent">honours</span>
        </h2>
      </div>

      <SectionReveal stagger as="ul" className="mt-14 border-t border-divider">
        {awards.map((a) => (
          <RevealItem
            as="li"
            key={`${a.year}-${a.title}`}
            className="group grid gap-2 border-b border-divider py-8 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-caps text-[10px] uppercase tracking-wide2 text-gold-ink">
              {a.year}
            </span>
            <h3 className="font-serif text-title font-normal text-ink">{a.title}</h3>
            <span className="flex items-center gap-3 text-sm text-muted">
              {a.issuer}
              {a.href && (
                <Link
                  href={a.href}
                  className="lux-underline inline-flex items-center gap-1 font-caps text-[10px] uppercase tracking-wide2 text-accent"
                >
                  Proof
                  <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
              )}
            </span>
          </RevealItem>
        ))}
      </SectionReveal>
    </section>
  )
}
