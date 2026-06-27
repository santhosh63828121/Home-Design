import type { Metadata } from 'next'
import PageStub from '@/components/page/PageStub'
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

export default function StyleQuizPage() {
  return (
    <PageStub
      title="What’s Your Interior Design Style?"
      kicker="RGL Decors · Style Quiz"
      intro="Seven quick questions, two minutes, no email required — discover whether your home leans Modern, Contemporary or Traditional, then see homes we’ve designed in your style."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Style Quiz', path: routes.styleQuiz },
      ]}
      cta={{ label: 'Or just get a free design', href: routes.getQuote }}
    >
      <div className="mx-auto max-w-2xl">
        <StyleQuiz />
      </div>
    </PageStub>
  )
}
