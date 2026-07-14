import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import RevealItem from '@/components/RevealItem'

export type TeamMember = {
  name: string
  role: string
  /** Real photograph, supplied by the client. Never a stock portrait. */
  photo?: string
}

/**
 * THE STUDIO — built, and switched OFF.
 *
 * The layout is finished and ready: portrait plates, a role in tracked caps, a
 * name in light Cormorant. It renders the moment real photography exists.
 *
 * It is NOT rendered today, and the gate is in the page, not here:
 * `credentials.ts → TEAM_PHOTOS_AVAILABLE === false`. The names and roles are
 * real (business.ts → contacts.departments) — the PHOTOGRAPHS are what we do not
 * have. Filling these frames with stock portraits of strangers would be a
 * fabrication about identifiable people, which is the one thing this system will
 * not ship. When the shoot lands, add `photo` to each member and flip the flag.
 */
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="section-y bg-background">
      <div className="max-w-prose2">
        <p className="eyebrow">The studio</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2
          id="studio-heading"
          className="mt-8 font-serif text-headline font-light text-ink"
        >
          The people <span className="italic text-accent">behind the work</span>
        </h2>
        <p className="mt-8 text-pretty leading-relaxed text-ink/70">
          One accountable team — design, procurement, production and site — under one roof.
        </p>
      </div>

      <SectionReveal
        stagger
        className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
      >
        {members.map((m) => (
          <RevealItem key={m.name}>
            <figure>
              <div className="lux-media relative aspect-[4/5] w-full bg-bone">
                {m.photo && (
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role} at RGL Décors`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                )}
              </div>
              <figcaption className="mt-6 border-t border-divider pt-6">
                <h3 className="font-serif text-title font-normal text-ink">{m.name}</h3>
                <p className="mt-2 font-caps text-[10px] uppercase tracking-wide2 text-muted">
                  {m.role}
                </p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </SectionReveal>
    </section>
  )
}
