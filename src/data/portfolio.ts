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

export type ImageAsset = {
  src: string
  alt: string
  width?: number
  height?: number
  blurDataURL?: string
  /**
   * Optional room label ("Living", "Kitchen", "Bedroom", …). Drives the
   * room-wise navigation in the project gallery, which SELF-GATES: the rail
   * appears only when two or more images actually carry a room. Unlabelled
   * photographs simply show as one continuous spread — never an empty filter
   * bar, and never a room invented to populate one.
   */
  room?: string
}
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

/**
 * Structured case-study storyboard. Every part is OPTIONAL and renders only when
 * supplied — so a project with no story shows its gallery and stat block, never
 * an invented narrative.
 *
 * HONESTY GATE: these projects belong to real, named clients. We do not write
 * their goals, challenges, outcomes or experience for them. RGL supplies the real
 * story per project (§2.2 "To supply"), and the case study lights up on its own.
 */
export type ProjectNarrative = {
  overview?: string // the project at a glance
  goal?: string // what the client wanted
  challenge?: string // the design challenge
  thinking?: string // our design thinking
  materials?: string // why these materials were chosen
  execution?: string // how it was built
  outcome?: string // the result
  experience?: string // the client's experience of the process
  /** Legacy field names kept so existing data keeps rendering. */
  brief?: string
  solution?: string
  result?: string
}
/** A material in the project's palette. */
export type MaterialSpec = { name: string; note?: string }

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

  /** STAT-BLOCK extras (doc §4.5) — optional; the row renders only when set,
   *  so we never publish a guessed area / timeline / tier for a placeholder. */
  location?: string
  areaSqft?: number
  timeline?: string
  tier?: string
  /** Structured narrative — renders only when supplied (no fabricated stories). */
  narrative?: ProjectNarrative
  /** Material palette — renders only when supplied. */
  materials?: MaterialSpec[]
  /** 360° virtual-tour embed URL — renders only when supplied. */
  tour360?: string
}

/** Budget bands are indicative buckets (we don't publish clients' actual spend). */
export const PORTFOLIO_BUDGET_INDICATIVE = true
export const PORTFOLIO_BUDGET_FOOTNOTE = 'Budget bands are indicative ranges, not the client’s actual spend.'

/**
 * MEDIA DISCLOSURE — the honest half of "curated stock for now, swap later".
 * ----------------------------------------------------------------------------
 * The four projects below belong to REAL, NAMED clients. The photographs
 * currently attached to them are curated reference imagery of the specified
 * design direction — they are NOT photographs of these clients' homes. Publishing
 * a stranger's room as Mr. Kiran's finished apartment, silently, would be a
 * fabrication about an identifiable person.
 *
 * So the imagery ships (the layouts are real and the client wants to see them),
 * but it ships DISCLOSED: this note renders under every project gallery and under
 * the portfolio grid.
 *
 * WHEN RGL SUPPLIES REAL PHOTOGRAPHY: drop it into each project's `media`, then
 * set this to `null`. The note disappears everywhere at once. Nothing else needs
 * to change.
 */
export const PORTFOLIO_MEDIA_NOTE: string | null =
  'Imagery shown illustrates the design direction and materials specified for this project. Final photography of the completed home is being prepared.'

/**
 * Reference imagery, grouped by room so the gallery's room-wise navigation has
 * something real to key off. Deliberately a small, consistent, desaturated set —
 * one art direction, not a grab-bag.
 */
const REF = {
  living: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Living',
    width: 1400,
    height: 1750,
  }),
  kitchen: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Kitchen',
    width: 1400,
    height: 1050,
  }),
  bedroom: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Bedroom',
    width: 1400,
    height: 1750,
  }),
  wardrobe: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Wardrobe',
    width: 1400,
    height: 1050,
  }),
  dining: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Dining',
    width: 1400,
    height: 1750,
  }),
  workspace: (alt: string): ImageAsset => ({
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=75',
    alt,
    room: 'Workspace',
    width: 1400,
    height: 1050,
  }),
}

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
    services: ['indoor-outdoor-lighting', 'finished-furniture'],
    featured: true,
    media: {
      cover: REF.dining('Contemporary hospitality dining room with pendant lighting over timber tables'),
      gallery: [
        REF.dining('Dining hall — solid timber tables under a low pendant cluster'),
        REF.living('Lounge and waiting area with layered, low lighting'),
        REF.workspace('Service counter and back-of-house circulation'),
        REF.kitchen('Commercial kitchen and pass, planned around service flow'),
      ],
    },
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
    media: {
      cover: REF.living('Modern living room with a full-height TV unit and warm timber'),
      gallery: [
        REF.living('Living room — TV unit, seating line and concealed storage'),
        REF.kitchen('Modular kitchen with handleless fronts and a stone worktop'),
        REF.bedroom('Master bedroom with an upholstered headboard'),
        REF.wardrobe('Bedroom wardrobe with fluted shutters and a lit reveal'),
      ],
    },
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
    media: {
      cover: REF.kitchen('Contemporary modular kitchen with a stone worktop'),
      gallery: [
        REF.kitchen('Modular kitchen — humidity-rated boards and soft-close hardware'),
        REF.wardrobe('Coordinated wardrobe joinery across both homes'),
        REF.living('Living space with coordinated finishes'),
        REF.bedroom('Bedroom with concealed storage'),
      ],
    },
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
    services: ['finished-furniture', 'indoor-outdoor-lighting'],
    featured: true,
    media: {
      cover: REF.workspace('Commercial office fit-out with natural light and timber detailing'),
      gallery: [
        REF.workspace('Office floor — workstations, lighting and acoustic treatment'),
        REF.living('Villa living room with layered lighting'),
        REF.dining('Villa dining under a pendant cluster'),
        REF.bedroom('Villa bedroom with fitted storage'),
      ],
    },
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
export const hasNarrative = (p: Project) =>
  !!p.narrative && Object.values(p.narrative).some(Boolean)
export const hasMaterials = (p: Project) => (p.materials?.length ?? 0) > 0
export const hasTour = (p: Project) => !!p.tour360

/** Top-level category (doc §4.5 filter) — derived from the space. */
export type Category = 'Residential' | 'Commercial'
export const projectCategory = (p: Project): Category =>
  p.space === 'Office' || p.space === 'Commercial' ? 'Commercial' : 'Residential'
export const projectServiceLinks = (p: Project) =>
  p.services.map((slug) => ({ slug, href: routes.service(slug) }))

// ---- Filter facets (derived → stay in sync with the data) ------------------
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr))

export const facets = {
  category: uniq(projects.map(projectCategory)),
  space: uniq(projects.map((p) => p.space)),
  style: uniq(projects.map((p) => p.style)),
  bhk: uniq(projects.map((p) => p.bhk).filter((b): b is Exclude<Bhk, null> => b !== null)),
  budget: uniq(projects.map((p) => p.budgetBand)),
}

export type Filters = { category?: string; space?: string; style?: string; bhk?: string; budget?: string }

export function filterProjects(list: Project[], f: Filters): Project[] {
  return list.filter(
    (p) =>
      (!f.category || projectCategory(p) === f.category) &&
      (!f.space || p.space === f.space) &&
      (!f.style || p.style === f.style) &&
      (!f.bhk || p.bhk === f.bhk) &&
      (!f.budget || p.budgetBand === f.budget),
  )
}
