/**
 * DESIGN-STYLE QUIZ (doc §7.4) — 7 questions, each option leans to one of the
 * three styles the portfolio actually filters on (so the result links to real
 * filtered work, not a style we have nothing to show for). Text options (not
 * images) — honest, since we don't have quiz imagery yet.
 */
import type { DesignStyle } from './business'

export type QuizOption = { label: string; style: DesignStyle }
export type QuizQuestion = { q: string; options: QuizOption[] }

export const quizQuestions: QuizQuestion[] = [
  {
    q: 'Your ideal living-room palette?',
    options: [
      { label: 'Warm woods & deep, rich tones', style: 'Traditional' },
      { label: 'Crisp whites, greys & clean lines', style: 'Modern' },
      { label: 'Layered neutrals with one bold accent', style: 'Contemporary' },
    ],
  },
  {
    q: 'Pick a material you’re drawn to',
    options: [
      { label: 'Carved teak & brass', style: 'Traditional' },
      { label: 'Matte lacquer & glass', style: 'Modern' },
      { label: 'Fluted wood & honed stone', style: 'Contemporary' },
    ],
  },
  {
    q: 'Your dream kitchen feels…',
    options: [
      { label: 'Classic & beautifully detailed', style: 'Traditional' },
      { label: 'Sleek & handleless', style: 'Modern' },
      { label: 'Warm, textured & current', style: 'Contemporary' },
    ],
  },
  {
    q: 'Lighting you love',
    options: [
      { label: 'Chandeliers & a warm glow', style: 'Traditional' },
      { label: 'Recessed & linear', style: 'Modern' },
      { label: 'Sculptural statement pieces', style: 'Contemporary' },
    ],
  },
  {
    q: 'A pattern you’d choose',
    options: [
      { label: 'Intricate, ornate motifs', style: 'Traditional' },
      { label: 'None — clean, calm surfaces', style: 'Modern' },
      { label: 'Subtle texture & natural grain', style: 'Contemporary' },
    ],
  },
  {
    q: 'Your furniture leans…',
    options: [
      { label: 'Carved & substantial', style: 'Traditional' },
      { label: 'Low & geometric', style: 'Modern' },
      { label: 'Soft curves, mixed materials', style: 'Contemporary' },
    ],
  },
  {
    q: 'The mood you want at home',
    options: [
      { label: 'Timeless & grand', style: 'Traditional' },
      { label: 'Calm & minimal', style: 'Modern' },
      { label: 'Fresh & inviting', style: 'Contemporary' },
    ],
  },
]

export const styleResults: Record<DesignStyle, { blurb: string }> = {
  Traditional: {
    blurb:
      'You’re drawn to timeless, rooted interiors — rich woods, ornate detail and classic forms that feel grand and enduring. We’d bring you warmth and craftsmanship with a refined, never-fussy hand.',
  },
  Modern: {
    blurb:
      'You love clean, functional and uncluttered spaces — crisp lines, calm palettes and quiet restraint. We’d design you a precise, minimal home where every element earns its place.',
  },
  Contemporary: {
    blurb:
      'You gravitate to fresh, of-the-moment interiors — layered neutrals, natural texture and sculptural touches. We’d craft you a current, inviting home that still feels personal and warm.',
  },
}

/** Tally answers → the winning style (first style wins ties). */
export function quizResult(answers: DesignStyle[]): DesignStyle {
  const tally = { Traditional: 0, Modern: 0, Contemporary: 0 } as Record<DesignStyle, number>
  for (const a of answers) tally[a] += 1
  return (Object.keys(tally) as DesignStyle[]).reduce((best, s) => (tally[s] > tally[best] ? s : best))
}
