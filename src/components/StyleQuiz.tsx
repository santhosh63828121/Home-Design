'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react'
import { quizQuestions, styleResults, quizResult } from '@/data/styleQuiz'
import type { DesignStyle } from '@/data/business'
import { routes } from '@/lib/routes'

/**
 * THE STYLE QUIZ — seven quiet questions, asked one at a time.
 * ============================================================================
 * The old version was a boxed widget with a teal progress bar. This one is a
 * page-width editorial spread: the question set large in Cormorant, the options
 * as ruled rows that draw a gold thread as you consider them, and progress shown
 * as a single hairline that fills. Nothing bounces, nothing celebrates, nothing
 * asks for an email. Confidence is the design.
 *
 * Reduced-motion safe by construction: every transition is a colour or a 1px
 * rule scaling on the compositor. No entrance animation to suppress.
 *
 * UNCHANGED: the state machine (answers array → `quizResult` tally), the seven
 * questions and three outcomes in `src/data/styleQuiz.ts`, and the fact that the
 * result links to the portfolio style we can genuinely show work in.
 */
export default function StyleQuiz() {
  const [answers, setAnswers] = useState<DesignStyle[]>([])
  const i = answers.length
  const done = i >= quizQuestions.length

  const pick = (style: DesignStyle) => setAnswers((a) => [...a, style])
  const restart = () => setAnswers([])

  // ── The outcome ──────────────────────────────────────────────────────────
  if (done) {
    const style = quizResult(answers)
    return (
      <div aria-live="polite">
        <p className="eyebrow">Your design language</p>
        <span aria-hidden="true" className="rule-gold mt-6" />

        <h2 className="mt-8 font-serif text-display font-light text-ink">
          <span className="italic text-accent">{style}</span>
        </h2>

        <p className="mt-8 max-w-prose2 text-lede text-pretty text-ink/70">
          {styleResults[style].blurb}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-divider pt-10">
          <Link href={routes.portfolio} className="btn-pill btn-gold">
            See {style.toLowerCase()} homes
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href={routes.getQuote}
            className="lux-underline font-caps text-[11px] uppercase tracking-wide2 text-ink/70"
          >
            Get a free {style.toLowerCase()} design
          </Link>
        </div>

        <button
          type="button"
          onClick={restart}
          className="mt-10 inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-muted transition-colors duration-500 hover:text-accent"
        >
          <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
          Take it again
        </button>
      </div>
    )
  }

  // ── The questions ────────────────────────────────────────────────────────
  const question = quizQuestions[i]
  const progress = (i / quizQuestions.length) * 100

  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
          <span className="text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> of </span>
          {String(quizQuestions.length).padStart(2, '0')}
        </p>

        {i > 0 && (
          <button
            type="button"
            onClick={() => setAnswers((a) => a.slice(0, -1))}
            className="lux-underline font-caps text-[10px] uppercase tracking-wide2 text-muted transition-colors duration-500 hover:text-accent"
          >
            Back
          </button>
        )}
      </div>

      {/* Progress: one hairline that fills. A bar with a radius would be a widget. */}
      <div className="mt-4 h-px w-full bg-divider" aria-hidden="true">
        <div
          className="h-px origin-left bg-gold transition-[width] duration-700 ease-lux"
          style={{ width: `${progress}%` }}
        />
      </div>

      <fieldset className="mt-12">
        <legend className="max-w-[18ch] font-serif text-headline font-light text-ink">
          {question.q}
        </legend>

        {/* aria-live so a screen-reader user hears the next question arrive. */}
        <ul className="mt-10 border-t border-divider" aria-live="polite">
          {question.options.map((o) => (
            <li key={o.label}>
              <button
                type="button"
                onClick={() => pick(o.style)}
                className="group relative flex w-full items-center justify-between gap-6 border-b border-divider py-8 text-left"
              >
                {/* The gold rule draws across the row on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                />
                <span className="font-serif text-title font-light text-ink transition-transform duration-700 ease-lux group-hover:translate-x-1.5">
                  {o.label}
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="shrink-0 text-accent opacity-0 transition-all duration-700 ease-lux group-hover:translate-x-1 group-hover:opacity-100"
                />
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  )
}
