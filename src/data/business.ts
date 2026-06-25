/**
 * CANONICAL BUSINESS DATA — single source of truth for RGL Decors.
 * ----------------------------------------------------------------------------
 * Every page, component, schema and the lead pipeline reads business facts from
 * THIS file (directly, or via the thin re-exports in seo.ts / content.js).
 * Sourced verbatim from the master spec (RGL-Decors-Build-Prompt.md §2 +
 * RGL-Decors-Website-Strategy §0). Do not hardcode NAP/USP/etc. elsewhere.
 */

// ---- Types -----------------------------------------------------------------
export type Social = { name: string; url: string; icon: string }
export type Usp = { icon: string; title: string; description: string }
export type ServiceCategory = { name: string; slug: string; group: 'core' | 'add-on' }
export type DesignStyle = 'Traditional' | 'Modern' | 'Contemporary'
// Project / case-study data lives in data/portfolio.ts (richer + optional media).
export type ServiceArea = {
  name: string
  slug: string | null // location-page slug; null = state-wide (no individual page)
  statewide?: boolean
}
// Pricing (packages, tiers, calculator math, footnote) lives in data/pricing.ts.

// ---- Identity & NAP --------------------------------------------------------
export const business = {
  brand: 'RGL Decors',
  legalName: 'RGL Décors Home Interiors',
  tagline: 'Dreams Delivered',
  taglineLong: 'Complete interiors solution for your dream home. One place. Any budget.',
  niche: 'Interior designers · modular kitchens · wardrobes · turnkey / full-home interiors',
  established: 2021,
  nap: {
    phoneDisplay: '+91 86374 20482',
    phoneE164: '+918637420482',
    tel: 'tel:+918637420482',
    email: 'rgldecors@gmail.com',
    whatsappChat: 'https://wa.me/message/YCV7Y4IV2343N1', // brand click-to-chat (no prefill)
    whatsappPhone: '918637420482', // for wa.me deep links WITH a prefilled message
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
    postalCode: '600001',
    hoursLabel: 'Mon–Sat: 9:00 AM – 7:00 PM',
  },
  geo: { latitude: 13.0827, longitude: 80.2707 },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  entryPriceSignal: 'From ₹50,000',
} as const

// ---- Social profiles (exact URLs from spec §2) -----------------------------
export const socials: Social[] = [
  { name: 'Facebook', icon: 'Facebook', url: 'https://www.facebook.com/RGL-Décors-110995801229346/' },
  { name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/rgl_decors/' },
  { name: 'YouTube', icon: 'Youtube', url: 'https://www.youtube.com/channel/UCs_DL58FGnUhGFieKO_Yg2w' },
  { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/DecorsRgl' },
  { name: 'Pinterest', icon: 'Music2', url: 'https://in.pinterest.com/rgldecors/' },
]
export const sameAs = socials.map((s) => s.url)

// ---- The 8 USPs (verbatim) -------------------------------------------------
export const usps: Usp[] = [
  {
    icon: 'Clapperboard',
    title: 'Free 3D Walkthrough',
    description:
      "India's 1st enterprise to provide a complete 3D interior walkthrough in HD with 99% accuracy — free of cost.",
  },
  {
    icon: 'Clock',
    title: 'On-Time Delivery',
    description: 'Guaranteed move-in within 45 days. T&C apply.',
  },
  {
    icon: 'BadgeIndianRupee',
    title: 'Best Price',
    description: 'Market-lowest-price guarantee versus competitors, with superior materials.',
  },
  {
    icon: 'Factory',
    title: 'Precision Build',
    description:
      'Everything manufactured in a modular automated factory — smooth, error-free, bubble-free panels.',
  },
  {
    icon: 'ShieldCheck',
    title: '10-Year Warranty',
    description: 'On all core materials. Hassle-free for a decade (physical damage excluded).',
  },
  {
    icon: 'CheckCircle2',
    title: '100+ Quality Checks',
    description: 'Every single product passes 100+ quality checks before delivery.',
  },
  {
    icon: 'Palette',
    title: '1000+ Finishes',
    description: 'Choose from 1000+ laminate colours, textures, styles and design options.',
  },
  {
    icon: 'Wrench',
    title: '100% Free Customization',
    description:
      'Fully customised wardrobes, modular kitchens and units engineered to fit any space.',
  },
]

// ---- 15 service categories (every one needs a real destination later) ------
export const serviceCategories: ServiceCategory[] = [
  { name: 'TV / Entertainment Units', slug: 'tv-units-chennai', group: 'core' },
  { name: 'Wardrobes', slug: 'wardrobe-design-chennai', group: 'core' },
  // Real service carried over from the legacy site (/bedroom-units-interiors);
  // keeps that legacy URL's 301 target a live 200 page, not a 404.
  { name: 'Bedroom Interiors', slug: 'bedroom-interior-chennai', group: 'core' },
  { name: 'Cabinets', slug: 'cabinets', group: 'core' },
  { name: 'Wallpapers & Paintings', slug: 'wallpapers-paintings', group: 'add-on' },
  { name: 'Crockery Units', slug: 'crockery-units', group: 'core' },
  { name: 'Modular Kitchens', slug: 'modular-kitchen-chennai', group: 'core' },
  { name: 'Storage Units', slug: 'storage-units', group: 'core' },
  { name: 'Study Units', slug: 'study-units', group: 'core' },
  { name: 'Smart Homes', slug: 'smart-home-chennai', group: 'add-on' },
  { name: 'Bathroom Fixtures', slug: 'bathroom-fixtures', group: 'add-on' },
  { name: 'Art Gallery & Artifacts', slug: 'art-gallery-artifacts', group: 'add-on' },
  { name: 'Plants & Landscaping', slug: 'plants-landscaping', group: 'add-on' },
  { name: 'Home Appliances', slug: 'home-appliances', group: 'add-on' },
  { name: 'Finished Furniture', slug: 'finished-furniture', group: 'core' },
  { name: 'Indoor & Outdoor Lighting', slug: 'indoor-outdoor-lighting', group: 'add-on' },
]

// ---- Design styles (portfolio filter + style-quiz outcomes) ----------------
export const designStyles: DesignStyle[] = ['Traditional', 'Modern', 'Contemporary']

// ---- 9 service areas (8 cities + state-wide Tamil Nadu) ---------------------
export const serviceAreas: ServiceArea[] = [
  { name: 'Chennai', slug: 'interior-designers-chennai' },
  { name: 'Coimbatore', slug: 'interior-designers-coimbatore' },
  { name: 'Salem', slug: 'interior-designers-salem' },
  { name: 'Hosur', slug: 'interior-designers-hosur' },
  { name: 'Krishnagiri', slug: 'interior-designers-krishnagiri' },
  { name: 'Dharmapuri', slug: 'interior-designers-dharmapuri' },
  { name: 'Kanchipuram', slug: 'interior-designers-kanchipuram' },
  { name: 'Chengalpattu', slug: 'interior-designers-chengalpattu' },
  { name: 'Tamil Nadu', slug: null, statewide: true },
]
/** Cities that get an individual location page (excludes the state-wide entry). */
export const cities = serviceAreas.filter((a) => !a.statewide)

// ---- Company stats (count-up bar) ------------------------------------------
/**
 * HONESTY RULE: only genuinely supportable, verifiable figures live in
 * `companyStats` — these are the ones we render and animate. Each maps directly
 * to a real brand claim (warranty / move-in / QC) or to a fact we can stand
 * behind (the 8 city pages we actually built, founded 2021).
 *
 * Numbers we DON'T have yet (homes delivered, designers on the team, client
 * satisfaction %) are NOT invented. They sit in `unverifiedStats` behind
 * `STATS_VERIFIED = false`, wired to the data layer but never rendered. When the
 * business confirms real figures, fill the `value`s and flip the flag — the
 * About page picks them up automatically, from this one place.
 */
export type Stat = { value: number; suffix?: string; label: string }

export const citiesServedCount = cities.length // = 8, real (we built these pages)

export const companyStats: Stat[] = [
  { value: 10, suffix: '-Year', label: 'Materials Warranty' },
  { value: 45, suffix: '-Day', label: 'Guaranteed Move-In' },
  { value: 100, suffix: '+', label: 'Quality Checks' },
  { value: citiesServedCount, suffix: '', label: 'Cities Served' },
]

/** Real, qualitative facts safe to state in prose (no fabricated quantities). */
export const companyFacts = {
  foundedYear: business.established, // 2021 — real
  foundedLabel: `Founded in Chennai in ${business.established}`,
  accuracyClaim: '99% 3D walkthrough accuracy',
  finishesClaim: '1000+ finishes & laminates',
  entryPrice: business.entryPriceSignal, // 'From ₹50,000'
} as const

/**
 * Unverified metrics — DO NOT RENDER while STATS_VERIFIED is false. Placeholder
 * values are 0 so a stray render reads as obviously empty, never a fake number.
 */
export const STATS_VERIFIED = false
export const unverifiedStats: Stat[] = [
  { value: 0, suffix: '+', label: 'Homes Delivered' },
  { value: 0, suffix: '+', label: 'In-House Designers' },
  { value: 0, suffix: '%', label: 'Client Satisfaction' },
]

// ---- SEO keyword universe (centralised) ------------------------------------
export const seoKeywords = [
  'Interior Designers in Chennai',
  'Modular Kitchen Chennai',
  'Wardrobe Designs Chennai',
  'Home Interiors Chennai',
  '2BHK Interior Design Chennai',
  '3BHK Interior Design Chennai',
  'Interior Design Cost Chennai',
  'Full Home Interior Chennai',
  'Office Interior Designers Chennai',
  'Best Interior Designers in Tamil Nadu',
]

// ---- Helpers ---------------------------------------------------------------
/** Build a WhatsApp deep-link to the brand number with a prefilled message. */
export function whatsappLink(text: string): string {
  return `https://wa.me/${business.nap.whatsappPhone}?text=${encodeURIComponent(text)}`
}
