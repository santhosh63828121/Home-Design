import type { Metadata } from 'next'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
import StyleQuiz from '@/components/StyleQuiz'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata({
  title: 'What’s Your Interior Design Style?',
  description:
    'Take RGL Decors’ 2-minute design-style quiz — seven quick questions reveal whether your home leans Modern, Contemporary or Traditional, with homes to match.',
  path: routes.styleQuiz,
  keywords: ['interior design style quiz', 'design style chennai', 'find your interior style'],
})

/**
 * THE QUIZ — a calm room to think in.
 * ============================================================================
 * The quiz used to be a 2xl-wide card floating in the middle of the page. It is
 * now the page: seven questions given the width and the air of a real editorial
 * spread, with a quiet rail beside them explaining what this is and — just as
 * importantly — what it is not.
 *
 * What it is not: a lead magnet. No email gate, no countdown, no "87% of people
 * who took this…". You answer seven questions, you get a name for the way you
 * already live, and you leave whenever you like. That restraint is the whole
 * reason anyone finishes it.
 */
const NOTES = [
  {
    title: 'Seven questions',
    body: 'Palette, material, light, pattern, furniture, mood. Two minutes, answered on instinct — the first answer is usually the true one.',
  },
  {
    title: 'No email required',
    body: 'The result appears on this page. Nothing is captured, nothing is sent, and nobody calls you because you took a quiz.',
  },
  {
    title: 'A real starting point',
    body: 'The three outcomes match the styles our portfolio actually filters on — so your result leads to homes we have genuinely built, not a mood board.',
  },
]

export default function StyleQuizPage() {
  return (
    <PageStub
      title="What’s Your Interior Design Style?"
      kicker="RGL Décors · Style quiz"
      intro="Most people know exactly what they like and have never been given the words for it. Seven questions — palette, material, light, mood — and you will have them: Modern, Contemporary or Traditional, with homes we have designed in each."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Style Quiz', path: routes.styleQuiz },
      ]}
      cta={{ label: 'Or just get a free design', href: routes.getQuote }}
    >
      <div className="grid gap-16 border-t border-divider pt-12 lg:grid-cols-[1fr_17rem] lg:gap-24">
        {/* The quiz itself. Client component; owns its own state and h2. */}
        <div className="min-w-0">
          <StyleQuiz />
        </div>

        {/* The rail: what this is, and what it isn't. */}
        <SectionReveal
          as="aside"
          variant="fadeUp"
          amount={0.1}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="eyebrow">Before you start</p>
          <span aria-hidden="true" className="rule-gold mt-6" />
          <ol className="mt-8">
            {NOTES.map((n, i) => (
              <li key={n.title} className="border-b border-divider py-6 first:border-t first:border-divider">
                <span className="font-caps text-[10px] tracking-wide2 text-gold-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-serif text-lg font-normal text-ink">{n.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{n.body}</p>
              </li>
            ))}
          </ol>
        </SectionReveal>
      </div>
    </PageStub>
  )
}
