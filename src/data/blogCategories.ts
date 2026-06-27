/**
 * BLOG TAXONOMY (doc §7.1, Appendix A).
 * ----------------------------------------------------------------------------
 * The canonical, ordered list of blog categories — display order + a one-line
 * blurb for each. The blog index reads this for the filter chips, but only
 * shows a category that ACTUALLY has a published post (no empty category pages,
 * no thin-content traps). A post's `category` frontmatter string is matched to
 * a `label` here; an unknown label still renders (appended after the canonical
 * ones) so nothing is ever hidden.
 *
 * To "add a category", give a post that `category` label and (optionally) list
 * it here for ordering/blurb — there is no separate registry to keep in sync.
 */
export type BlogCategory = { label: string; blurb: string }

export const blogCategories: BlogCategory[] = [
  { label: 'Cost Guides', blurb: 'Honest, itemised cost guides so you can budget with confidence.' },
  { label: 'Modular Kitchen', blurb: 'Layouts, finishes and storage for the hardest-working room in the home.' },
  { label: 'Wardrobes & Storage', blurb: 'Sliding vs hinged, internal organisation and clever storage.' },
  { label: 'Living & Dining', blurb: 'TV units, false ceilings and gather-round living spaces.' },
  { label: 'Bedroom', blurb: 'Calm, functional bedrooms — from masters to kids’ rooms.' },
  { label: 'Materials', blurb: 'Plywood, finishes, laminates and hardware — what to choose and why.' },
  { label: 'Design Styles', blurb: 'Modern, contemporary and traditional looks, decoded.' },
  { label: 'Small Homes & Space-Saving', blurb: 'Make a compact Chennai apartment live large.' },
  { label: 'Process & Planning', blurb: 'How a project actually runs — timelines, drawings and decisions.' },
  { label: 'Design Ideas', blurb: 'Inspiration and practical ideas room by room.' },
]

/** Canonical order index for a label; unknown labels sort last (alphabetically). */
export function categoryOrder(label: string): number {
  const i = blogCategories.findIndex((c) => c.label === label)
  return i === -1 ? blogCategories.length : i
}

export const ALL_CATEGORIES = 'All' as const
