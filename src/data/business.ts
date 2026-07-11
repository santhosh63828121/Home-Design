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
  established: 2018,
  nap: {
    phoneDisplay: '+91 86374 20482',
    phoneE164: '+918637420482',
    tel: 'tel:+918637420482',
    /** Primary enquiry inbox. rgldecors.com is the single authoritative domain. */
    email: 'enquiry@rgldecors.com',
    emailSecondary: 'rgldecors@gmail.com',
    whatsappChat: 'https://wa.me/message/YCV7Y4IV2343N1', // brand click-to-chat (no prefill)
    whatsappPhone: '918637420482', // for wa.me deep links WITH a prefilled message
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
    postalCode: '600041',
    hoursLabel: 'Mon–Sat: 9:00 AM – 7:00 PM',
  },
  /** Direct lines / desks (client-supplied). Rendered on the contact page. */
  contacts: {
    departments: [
      { role: 'Creative Director', name: 'Lokeshwaran', email: 'lokeshwaran@rgldecors.com' },
      { role: 'Sales', name: 'Sabarinathan', email: 'sabarinathan@rgldecors.com' },
      { role: 'Project Manager', name: 'Srikrishna', email: 'srikrishna@rgldecors.com' },
      { role: 'Admin Head', name: 'Ranjitha Raju', email: 'ranjitha.raju@rgldecors.com' },
    ],
    phones: [
      { label: 'Company', display: '+91 86374 20482', e164: '+918637420482' },
      { label: 'Project Manager', display: '+91 74484 00338', e164: '+917448400338' },
      { label: 'Sales Head', display: '+91 74484 00339', e164: '+917448400339' },
    ],
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
  // URLs per the client's PDF §RGL Decors Social Media Link.
  { name: 'Facebook', icon: 'Facebook', url: 'https://www.facebook.com/rgldecorshomeinteriors/' },
  { name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/rgl_decors/' },
  { name: 'YouTube', icon: 'Youtube', url: 'https://www.youtube.com/channel/UCs_DL58FGnUhGFieKO_Yg2w' },
  { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/DecorsRgl' },
  { name: 'Pinterest', icon: 'Music2', url: 'https://in.pinterest.com/rgldecors/_created/' },
]
export const sameAs = socials.map((s) => s.url)

// ---- The 8 USPs (client PDF §Usp + §How We Craft) ---------------------------
/**
 * HONESTY: the earlier "10-year warranty", "45-day guaranteed move-in" and
 * "market-lowest-price guarantee" USPs are RETIRED. The client's own Warranty
 * Details page states 5-year hardware / 1-year shutters & carcass, so a
 * decade-long headline claim contradicted the legal page. Warranty is now
 * referenced qualitatively here; the exact terms live on /warranty only.
 */
export const usps: Usp[] = [
  {
    icon: 'Wrench',
    title: 'Premium Turnkey Execution',
    description:
      'A complete turnkey interior experience — designed, managed and delivered by one accountable RGL team, under one roof.',
  },
  {
    icon: 'Clapperboard',
    title: 'Technology-Led Visualisation',
    description:
      'Visualise before you build — immersive 3D walkthroughs that turn render into reality, so you see every room before it exists.',
  },
  {
    icon: 'Factory',
    title: 'Factory-Engineered Precision',
    description:
      'Panels cut, drilled and 360° edge-banded in an automated factory — warranty-backed joinery engineered for the coast.',
  },
  {
    icon: 'Palette',
    title: 'Curated Materials & Quality',
    description:
      'Every finish, fitting, surface and fixture is selected for durability, elegance and everyday performance.',
  },
  {
    icon: 'ShieldCheck',
    title: 'One-Year Post-Service Care',
    description:
      'Complimentary one-year post-service care — because premium living deserves premium aftercare, long after handover.',
  },
  {
    icon: 'CheckCircle2',
    title: '100+ Quality Checks',
    description:
      'A formal 100+ point inspection and a snagging walkthrough with you, before you ever move in.',
  },
  {
    icon: 'Clock',
    title: 'On-Time Delivery Record',
    description:
      'Factory production runs in parallel with site works, tracked by a single project engineer — so your date holds.',
  },
  {
    icon: 'BadgeIndianRupee',
    title: 'Transparent Costing',
    description:
      'Detailed drawings, material specs and itemised costing locked in together. No hidden markups, no vague estimates.',
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

// ---- Trust ribbon / company stats (count-up bar) -----------------------------
/**
 * The client's Trust Ribbon (PDF §Trust ribbon), confirmed for publication.
 *
 * NOTE on "10+ Years of Experience": RGL Décors was founded in 2018, so this is
 * deliberately labelled as the TEAM's craft experience, not the company's age —
 * the two are different claims and only the former is true. Do not relabel it to
 * "10+ Years in Business".
 */
export type Stat = { value: number; suffix?: string; label: string }

export const citiesServedCount = cities.length // = 8, real (we built these pages)

export const companyStats: Stat[] = [
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 150, suffix: '+', label: 'Homes Transformed' },
  { value: 80, suffix: '%', label: 'Client Satisfaction' },
  { value: citiesServedCount, suffix: '', label: 'Cities Served' },
]

/** Qualitative facts safe to state in prose. */
export const companyFacts = {
  foundedYear: business.established, // 2018 — client-confirmed
  foundedLabel: `Founded in Chennai in ${business.established}`,
  accuracyClaim: 'render-to-reality 3D accuracy',
  finishesClaim: 'a curated library of finishes & laminates',
  entryPrice: business.entryPriceSignal, // 'From ₹50,000'
} as const

/** Client has confirmed the trust-ribbon figures above (PDF §Trust ribbon). */
export const STATS_VERIFIED = true

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
