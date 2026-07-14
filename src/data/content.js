/**
 * Section / page COPY + imagery for the RGL Decors site.
 * Core BUSINESS FACTS (NAP, USPs, services, areas, socials) now live in the
 * single source of truth — src/data/business.ts — and are re-projected below in
 * the legacy shapes the existing components expect, so nothing drifts.
 */
import { business, usps, socials, serviceAreas, companyStats } from './business'
import { reviews } from './reviews'

// Shared contact constants — projected from the canonical business record.
export const CONTACT = {
  phoneDisplay: business.nap.phoneDisplay,
  phoneHref: business.nap.tel,
  email: business.nap.email,
  emailHref: `mailto:${business.nap.email}`,
  website: 'www.rgldecors.com',
  whatsapp: business.nap.whatsappChat,
  hours: business.nap.hoursLabel,
  location: `${business.nap.addressLocality}, ${business.nap.addressRegion}`,
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=RGL+Decors+Chennai+Tamil+Nadu',
}

export const NAV_LINKS = [
  { label: 'Home', href: '#walkthrough' },
  { label: 'Projects', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#transformations' },
  { label: 'About', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

// Section 2 — immersive room slides.
export const ROOM_SLIDES = [
  {
    id: 'traditional',
    label: 'INTERIOR STYLE · TRADITIONAL',
    heading: 'TRADITIONAL',
    body: 'Traditional interiors use tables and chairs made from dark wood that is ornately detailed. Drawing inspiration from 18th & 19th century design.',
    image:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1920&q=80',
    alt: 'Traditional Indian interior with ornate dark wood furniture and warm tones',
  },
  {
    id: 'modern',
    label: 'INTERIOR STYLE · MODERN',
    heading: 'MODERN',
    body: 'Modern design refers to a specific time period. Clean lines, functional form — the early-to-mid 20th century aesthetic reimagined.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Modern minimalist interior with dramatic pendant lighting',
  },
  {
    id: 'contemporary',
    label: 'INTERIOR STYLE · CONTEMPORARY',
    heading: 'CONTEMPORARY',
    body: 'Contemporary design borrows from various time periods, creating an environment fit to last a lifetime. Ever-evolving. Always fresh.',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80',
    alt: 'Contemporary executive suite with rich wood shelving and accent wall',
  },
]

// Section 4 — count-up stats. Projected from the canonical, honesty-checked
// `companyStats` (business.ts): only verifiable figures — no invented
// "500+ families" / "95% satisfaction". See business.ts STATS_VERIFIED.
export const STATS = companyStats

// Section 5 — gallery accordion panels.
export const GALLERY = [
  {
    id: 'kitchen',
    label: 'MODULAR KITCHEN',
    description: 'Automated factory-built modular kitchens, tailored to your space.',
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm modular kitchen with Edison lighting',
  },
  {
    id: 'bedroom',
    label: 'BEDROOM',
    description: 'Restful master bedrooms designed around comfort and calm.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant master bedroom interior',
  },
  {
    id: 'wardrobe',
    label: 'WARDROBE',
    description: 'Fully customised wardrobe units built to fit every corner.',
    image:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Custom built wardrobe unit',
  },
  {
    id: 'living',
    label: 'LIVING ROOM',
    description: 'Living spaces that balance statement design and warmth.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury living room interior',
  },
  {
    id: 'tv',
    label: 'TV UNIT',
    description: 'Sleek entertainment units engineered for everyday living.',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern TV unit and media wall',
  },
]

// Section 6 — pricing plans.
export const PRICING = [
  {
    id: 'essential',
    name: 'ESSENTIAL',
    price: '₹3.5L',
    period: '/starting',
    featured: false,
    cta: 'GET STARTED',
    // Warranty/delivery bullets retired: the confirmed warranty is 5-yr hardware /
    // 1-yr carcass (see /warranty), so a "10-Year Warranty" bullet contradicted it.
    features: [
      'Free 3D Design',
      'Modular Kitchen',
      '1 Bedroom Wardrobe',
      'Itemised, Transparent Costing',
      'One-Year Post-Service Care',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: '₹8.5L',
    period: '/2BHK full home',
    featured: true,
    badge: 'MOST POPULAR',
    cta: 'BOOK FREE CONSULT',
    features: [
      'Free 3D Walkthrough',
      'Full Home — Living + Kitchen + 2 Beds',
      'Curated Material & Finish Library',
      'Dedicated Designer',
      'Itemised, Transparent Costing',
      'One-Year Post-Service Care',
      'Project Manager',
    ],
  },
  {
    id: 'turnkey',
    name: 'TURNKEY',
    price: '₹15L',
    period: '/3BHK & Villa',
    featured: false,
    cta: 'EXPLORE NOW',
    features: [
      'Everything in Premium',
      'Smart Home Integration',
      'Plants & Landscaping',
      'Art Gallery & Artifacts',
      'Home Appliances',
      'Bathroom Fixtures',
    ],
  },
]

// Section 7 — "Why RGL Decors" feature grid (the 8 USPs, canonical source).
export const FEATURES = usps

// Service-area string for the contact section (cities only, state-wide excluded).
export const SERVING_AREAS = serviceAreas
  .filter((a) => !a.statewide)
  .map((a) => a.name)
  .join(', ')

export const FOOTER_LINKS = [
  'Home',
  'Who We Are',
  'Project Walkthroughs',
  'RGL Museum',
  'Plans & Pricing',
  'Blog',
  'Contact',
]

export const SOCIALS = [
  ...socials.map((s) => ({ name: s.name, icon: s.icon, href: s.url })),
  { name: 'WhatsApp', icon: 'MessageCircle', href: CONTACT.whatsapp },
]

// Hero floating info card + the services-split section copy.
export const HERO = {
  image:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80',
  alt: 'Luxury Indian living room interior with warm lighting',
  card: {
    label: 'DEDICATED SPACE',
    title: 'Private Interiors',
    text: 'Crafted, curated and completely yours — designed around how you live.',
  },
}

/**
 * CINEMATIC SCENES — the pinned scroll walkthrough (Scene 1 → 5).
 * Each scene is driven by CameraController/TransitionManager via scroll progress.
 *
 * `mood`     → drives the ThreeFX atmosphere (particle color, light-ray tint, fog).
 * `dolly`    → CameraController scale range [from,to] used to simulate walking forward.
 * `pan`      → subtle camera x/y drift in % of viewport across the scene's scroll span.
 */
export const CINEMATIC_SCENES = [
  {
    id: 'exterior',
    name: 'Exterior',
    eyebrow: 'RGL DECORS · THE RESIDENCE',
    title: 'A Home Worth\nWalking Into.',
    body: 'Modern villa architecture, cinematic light, and interiors crafted around how you live. Begin the walkthrough.',
    cta: 'Explore The Home',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury modern villa exterior at golden hour',
    mood: { particleColor: '#ffe6b8', rayColor: '#ffd27a', fog: '#0e1a24', intensity: 0.55 },
    dolly: [1.08, 1.0],
    pan: { x: -2, y: 1.5 },
    clouds: true,
  },
  {
    id: 'living',
    name: 'Living Room',
    eyebrow: 'SCENE 02 · LIVING ROOM',
    title: 'Where the\nDay Unwinds.',
    body: 'A sculptural sofa, marble floors and designer lighting. Large windows pour daylight across the room.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury living room with modern sofa, marble floor and large windows',
    mood: { particleColor: '#fff0d6', rayColor: '#ffdca0', fog: '#171410', intensity: 0.7 },
    dolly: [1.18, 1.0],
    pan: { x: 3, y: -1 },
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    eyebrow: 'SCENE 03 · THE KITCHEN',
    title: 'Crafted in\nMarble & Light.',
    body: 'Honed marble countertops, handleless cabinetry and premium appliances — engineered down to the millimetre.',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury modern kitchen with marble countertops and premium cabinetry',
    mood: { particleColor: '#fffaf0', rayColor: '#ffe9c2', fog: '#14110c', intensity: 0.65 },
    dolly: [1.15, 1.0],
    pan: { x: -3, y: 1 },
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    eyebrow: 'SCENE 04 · MASTER BEDROOM',
    title: 'Rest, Wrapped\nin Warmth.',
    body: 'A king bed, layered wooden textures and ambient light that softens as evening falls.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury master bedroom with king bed and warm ambient lighting',
    mood: { particleColor: '#ffd9a0', rayColor: '#ffb866', fog: '#1a1108', intensity: 0.6 },
    dolly: [1.2, 1.0],
    pan: { x: 2.5, y: -1.5 },
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    eyebrow: 'SCENE 05 · SPA BATHROOM',
    title: 'A Private\nSpa Retreat.',
    body: 'Book-matched marble walls, a freestanding tub and a rain shower beneath soft, reflective light.',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury spa bathroom with marble walls and freestanding bathtub',
    mood: { particleColor: '#e6f4ff', rayColor: '#bfe3ff', fog: '#0c1620', intensity: 0.75 },
    dolly: [1.16, 1.0],
    pan: { x: -2, y: 1 },
  },
]

// Final Section — client testimonials. Projected from the single typed source
// (data/reviews.ts). Rating SCHEMA stays gated there behind REVIEWS_VERIFIED.
export const TESTIMONIALS = reviews

// Final Section — before / after transformation showcase.
export const BEFORE_AFTER = [
  {
    id: 'ba-living',
    label: 'LIVING ROOM',
    before:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    after:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    alt: 'Living room before and after RGL Decors transformation',
  },
  {
    id: 'ba-kitchen',
    label: 'MODULAR KITCHEN',
    before:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80',
    after:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80',
    alt: 'Kitchen before and after RGL Decors transformation',
  },
]

export const SERVICES = {
  label: 'Design & Execution · One Roof',
  heading: ['Everything under', 'one roof.'],
  // Two claims were retired here, both unverifiable or contradictory:
  //   · "India's 1st studio offering FREE complete 3D walkthroughs" — an
  //     unprovable superlative.
  //   · "99% accuracy" — a fabricated precision figure with nothing behind it.
  body: 'RGL Décors delivers end-to-end interior solutions — from first drawing to the day you move in. Design, materials, factory-built modules, civil work and finishing are handled by one team, so nothing is lost between trades. Every home begins with a free 3D walkthrough of your actual floor plan.',
  // 'Warranty' now points at the real, confirmed terms (5-yr hardware /
  // 1-yr shutters, carcass & carpentry — see /warranty). The old '10Yr Warranty'
  // tag directly contradicted the legal page the client signed off on.
  tags: ['Free 3D Walkthrough', 'Itemised Estimate', 'Factory-Built Modules', 'Covered by Warranty'],
  image:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
  alt: 'Warm vibrant Indian modular kitchen with Edison lighting',
}
