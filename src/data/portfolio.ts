import type { DesignStyle } from './business'
import { routes } from '@/lib/routes'

/**
 * CANONICAL PORTFOLIO MODEL — single typed source for all case-study data.
 * ----------------------------------------------------------------------------
 * The hub filters, the [slug] case studies, the sitemap and any "featured on
 * Home" reference all read from here.
 *
 * HONEST MEDIA: we have the 4 real projects (name + type + scope) but NOT their
 * photos, before/after pairs or YouTube IDs yet. Every media field below is
 * OPTIONAL and starts empty. The UI degrades gracefully — a missing slider /
 * embed / gallery simply doesn't render (no fake rooms) — and fills in
 * automatically as you drop real media into these arrays. Nothing to re-wire.
 */

export type ImageAsset = { src: string; alt: string; width?: number; height?: number; blurDataURL?: string }
export type BeforeAfterPair = { before: ImageAsset; after: ImageAsset; label: string }
export type RenderVsRealPair = { render: ImageAsset; real: ImageAsset }
export type ProjectTestimonial = { quote: string; author: string; role?: string }

export type ProjectMedia = {
  cover?: ImageAsset | null
  gallery?: ImageAsset[]
  beforeAfter?: BeforeAfterPair[]
  renderVsReal?: RenderVsRealPair | null
  youTubeId?: string | null
}

export type Space = 'Apartment' | 'Villa' | 'Office' | 'Commercial'
export type Bhk = '1BHK' | '2BHK' | '3BHK' | null
export type BudgetBand = '₹3–6L' | '₹6–12L' | '₹12L+ / Custom'

export type Project = {
  slug: string
  client: string
  title: string
  space: Space
  bhk: Bhk
  style: DesignStyle
  budgetBand: BudgetBand
  scope: string
  summary: string
  /** related service slugs (for internal links) */
  services: string[]
  /** optional city key (matches a City.projectKey in locations.ts) — leave
   *  unset until the project's city is confirmed, so city pages never claim a
   *  project they can't place. */
  city?: string
  featured?: boolean
  media: ProjectMedia
  testimonial?: ProjectTestimonial | null
}

/** Budget bands are indicative buckets (we don't publish clients' actual spend). */
export const PORTFOLIO_BUDGET_INDICATIVE = true
export const PORTFOLIO_BUDGET_FOOTNOTE = 'Budget bands are indicative ranges, not the client’s actual spend.'

export const projects: Project[] = [
  {
    slug: 'divakar-restaurant',
    client: 'Mr. Divakar',
    title: 'Restaurant & Hotel Interior',
    space: 'Commercial',
    bhk: null,
    style: 'Contemporary',
    budgetBand: '₹12L+ / Custom',
    scope: 'Full restaurant / hotel interior, designed and presented as a 3D walkthrough.',
    summary:
      'A complete hospitality fit-out for Mr. Divakar — dining, service and ambience designed end to end and previewed as an HD 3D walkthrough before execution.',
    services: ['false-ceiling-and-lighting', 'finished-furniture'],
    featured: true,
    media: {}, // photos / walkthrough video to be added
    testimonial: null,
  },
  {
    slug: 'kiran-2bhk',
    client: 'Mr. Kiran',
    title: 'Fully Furnished 2BHK Apartment',
    space: 'Apartment',
    bhk: '2BHK',
    style: 'Modern',
    budgetBand: '₹3–6L',
    scope: 'Complete, fully furnished 2BHK interior — kitchen, wardrobes and living spaces.',
    summary:
      'A turnkey 2BHK for Mr. Kiran: modular kitchen, bedroom wardrobes and a living-room TV unit, designed and factory-built for a clean, modern finish.',
    services: ['modular-kitchen-chennai', 'wardrobe-design-chennai', 'tv-units-chennai'],
    featured: true,
    media: {},
    testimonial: null,
  },
  {
    slug: 'anbu-2bhk-villa',
    client: 'Mr. Anbu',
    title: '2BHK Apartment & Villa',
    space: 'Villa',
    bhk: '2BHK',
    style: 'Contemporary',
    budgetBand: '₹6–12L',
    scope: 'Interiors across a 2BHK apartment and a villa.',
    summary:
      'Two spaces for Mr. Anbu — a 2BHK apartment and a villa — with coordinated modular units, storage and finishes across both homes.',
    services: ['modular-kitchen-chennai', 'wardrobe-design-chennai'],
    featured: false,
    media: {},
    testimonial: null,
  },
  {
    slug: 'muthu-office-3bhk-villa',
    client: 'Mr. Muthu',
    title: 'Office Interior & 3BHK Villa',
    space: 'Office',
    bhk: '3BHK',
    style: 'Modern',
    budgetBand: '₹12L+ / Custom',
    scope: 'Commercial office fit-out plus a full 3BHK villa interior.',
    summary:
      'A dual project for Mr. Muthu — a functional commercial office fit-out and a complete 3BHK villa interior, delivered with factory precision.',
    services: ['finished-furniture', 'false-ceiling-and-lighting'],
    featured: true,
    media: {},
    testimonial: null,
  },
]

// ---- Lookups & media guards ------------------------------------------------
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
/** Projects placed in a given city (by City.projectKey). Empty until tagged. */
export const projectsInCity = (cityKey: string) => projects.filter((p) => p.city === cityKey)

export const hasCover = (p: Project) => !!p.media.cover
export const hasGallery = (p: Project) => (p.media.gallery?.length ?? 0) > 0
export const hasBeforeAfter = (p: Project) => (p.media.beforeAfter?.length ?? 0) > 0
export const hasRenderVsReal = (p: Project) => !!p.media.renderVsReal
export const hasVideo = (p: Project) => !!p.media.youTubeId
export const hasTestimonial = (p: Project) => !!p.testimonial
export const projectServiceLinks = (p: Project) =>
  p.services.map((slug) => ({ slug, href: routes.service(slug) }))

// ---- Filter facets (derived → stay in sync with the data) ------------------
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr))

export const facets = {
  space: uniq(projects.map((p) => p.space)),
  style: uniq(projects.map((p) => p.style)),
  bhk: uniq(projects.map((p) => p.bhk).filter((b): b is Exclude<Bhk, null> => b !== null)),
  budget: uniq(projects.map((p) => p.budgetBand)),
}

export type Filters = { space?: string; style?: string; bhk?: string; budget?: string }

export function filterProjects(list: Project[], f: Filters): Project[] {
  return list.filter(
    (p) =>
      (!f.space || p.space === f.space) &&
      (!f.style || p.style === f.style) &&
      (!f.bhk || p.bhk === f.bhk) &&
      (!f.budget || p.budgetBand === f.budget),
  )
}
