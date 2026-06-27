'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { quizQuestions, styleResults, quizResult } from '@/data/styleQuiz'
import type { DesignStyle } from '@/data/business'
import { routes } from '@/lib/routes'

/**
 * 7-question design-style quiz (doc §7.4). Text options (no quiz imagery yet),
 * accessible (each question is a labelled group of buttons), reduced-motion safe
 * (no transforms). The result links to the matching portfolio style + a free
 * design — so the outcome connects to real work.
 */
export default function StyleQuiz() {
  const [answers, setAnswers] = useState<DesignStyle[]>([])
  const i = answers.length
  const done = i >= quizQuestions.length

  const pick = (style: DesignStyle) => setAnswers((a) => [...a, style])
  const restart = () => setAnswers([])

  if (done) {
    const style = quizResult(answers)
    return (
      <div className="rounded-2xl border border-divider bg-white p-8 text-center shadow-card sm:p-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 font-caps text-xs uppercase tracking-wide2 text-teal">
          <Sparkles size={14} aria-hidden="true" /> Your style
        </span>
        <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">{style}</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/75">{styleResults[style].blurb}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={routes.portfolio} className="btn-pill btn-gold">
            See {style} homes <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href={routes.getQuote}
            className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white"
          >
            Get a free {style.toLowerCase()} design
          </Link>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
        >
          <RotateCcw size={14} aria-hidden="true" /> Retake the quiz
        </button>
      </div>
    )
  }

  const question = quizQuestions[i]
  return (
    <div className="rounded-2xl border border-divider bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-caps text-xs uppercase tracking-wide2 text-muted">
          Question {i + 1} of {quizQuestions.length}
        </p>
        {i > 0 && (
          <button
            type="button"
            onClick={() => setAnswers((a) => a.slice(0, -1))}
            className="text-sm font-medium text-muted hover:text-accent"
          >
            Back
          </button>
        )}
      </div>
      {/* progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background" aria-hidden="true">
        <div className="h-full rounded-full bg-teal transition-[width] duration-300" style={{ width: `${(i / quizQuestions.length) * 100}%` }} />
      </div>

      <fieldset className="mt-6">
        <legend className="font-serif text-xl font-bold text-ink sm:text-2xl">{question.q}</legend>
        <div className="mt-5 grid gap-3">
          {question.options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => pick(o.style)}
              className="group flex items-center justify-between gap-3 rounded-xl border border-divider bg-white px-5 py-4 text-left text-ink transition-colors hover:border-teal hover:bg-teal/[0.04]"
            >
              <span>{o.label}</span>
              <ArrowRight
                size={16}
                className="shrink-0 text-teal opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
