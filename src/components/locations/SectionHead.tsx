import type { ReactNode } from 'react'
import SectionReveal from '@/components/SectionReveal'

/**
 * The section opener, repeated down every locations page: tracked eyebrow, gold
 * hairline, a light Cormorant <h2>, and an optional line of prose sitting to the
 * right at a real reading measure. Hairline-under-the-eyebrow, headline-left,
 * prose-right is the magazine spread that gives these pages their rhythm.
 *
 * Below the fold, so the framer reveal is free (§5). `fadeUp` only — the
 * horizontal variants start ±32px off-axis and would overflow at 375px.
 */
export default function SectionHead({
  id,
  eyebrow,
  title,
  children,
}: {
  /** The <h2> id — the section's `aria-labelledby` target. */
  id: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <SectionReveal className="grid gap-8 border-b border-divider pb-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <span aria-hidden="true" className="rule-gold mt-6" />
        <h2 id={id} className="mt-8 max-w-[13ch] font-serif text-headline font-light text-ink">
          {title}
        </h2>
      </div>
      {children && (
        <p className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pb-2">{children}</p>
      )}
    </SectionReveal>
  )
}
