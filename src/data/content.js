/**
 * Central content source for the RGL Decors site.
 * Keeping all copy + imagery here makes the components data-driven and DRY.
 */

// Shared contact constants — referenced everywhere so they stay in sync.
export const CONTACT = {
  phoneDisplay: '+91 86374 20482',
  phoneHref: 'tel:+918637420482',
  email: 'info@rgldecors.com',
  emailHref: 'mailto:info@rgldecors.com',
  website: 'www.rgldecors.com',
  whatsapp: 'https://wa.me/message/YCV7Y4IV2343N1',
  hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
  location: 'Chennai, Tamil Nadu',
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

// Section 4 — count-up stats.
export const STATS = [
  { value: 500, suffix: '+', label: 'Happy Families' },
  { value: 10, suffix: '', label: 'Years Warranty' },
  { value: 45, suffix: ' Days', label: 'Guaranteed Delivery' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
]

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
    features: [
      'Free 3D Design',
      'Modular Kitchen',
      '1 Bedroom Wardrobe',
      '10-Year Warranty',
      '45-Day Delivery',
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
      '1000+ Design Options',
      'Dedicated Designer',
      '10-Year Warranty',
      '45-Day Delivery',
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

// Section 7 — "Why RGL Decors" feature grid. Icons are lucide-react names.
export const FEATURES = [
  {
    icon: 'Clapperboard',
    title: 'Free 3D Walkthrough',
    description:
      "India's 1st company offering complete HD 3D walkthrough with 99% accuracy — free of cost.",
  },
  {
    icon: 'Clock',
    title: 'On-Time Delivery',
    description: 'Guaranteed move-in within 45 days. T&C applicable.',
  },
  {
    icon: 'BadgeIndianRupee',
    title: 'Best Price Guarantee',
    description:
      'Market-lowest prices with superior quality. Compare with any competitor.',
  },
  {
    icon: 'Factory',
    title: 'Precision Build',
    description:
      'Everything manufactured in our modular automated factory — smooth, error-free, bubble-free panels.',
  },
  {
    icon: 'ShieldCheck',
    title: '10-Year Warranty',
    description: 'Big warranty period on all core materials. Hassle-free for a decade.',
  },
  {
    icon: 'CheckCircle2',
    title: '100+ Quality Checks',
    description: 'Every single product passes 100+ quality checks before delivery.',
  },
  {
    icon: 'Palette',
    title: '1000+ Design Options',
    description: 'Choose from 1000+ laminate colors, textures, styles and design options.',
  },
  {
    icon: 'Wrench',
    title: 'Free Customization',
    description:
      'Only company offering 100% customized wardrobes, kitchens & units to fit your exact space.',
  },
]

export const SERVING_AREAS =
  'Chennai, Coimbatore, Salem, Dharmapuri, Krishnagiri, Hosur, Kanchipuram, Chengalpattu'

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
  { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/rgldecors' },
  { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/rgldecors' },
  { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/@rgldecors' },
  { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/rgldecors' },
  { name: 'Pinterest', icon: 'Music2', href: 'https://pinterest.com/rgldecors' },
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

// Final Section — client testimonials.
export const TESTIMONIALS = [
  {
    quote:
      'They handed over our 2BHK in 41 days. The 3D walkthrough matched the final result almost exactly — zero surprises.',
    name: 'Priya & Karthik',
    role: '2BHK · Velachery, Chennai',
  },
  {
    quote:
      'The modular kitchen is the heart of our home now. Marble finish, soft-close everything, and built to fit a tricky corner perfectly.',
    name: 'Anand Subramanian',
    role: 'Villa · OMR, Chennai',
  },
  {
    quote:
      'Transparent pricing and a dedicated designer who actually listened. The master bedroom turned out better than we imagined.',
    name: 'Deepa Rajan',
    role: '3BHK · Adyar, Chennai',
  },
]

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
  label: 'FLOOR 1 · OPEN PLAN',
  heading: ['ENERGY THAT GETS', 'YOU IN THE ZONE.'],
  body: "RGL Decors delivers end-to-end interior solutions — from concept to move-in. Every space is crafted to inspire, comfort, and reflect your personality. India's 1st studio offering FREE complete 3D walkthroughs with 99% accuracy.",
  tags: ['3D Design', 'Free Estimate', 'Easy Access', '10Yr Warranty'],
  image:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
  alt: 'Warm vibrant Indian modular kitchen with Edison lighting',
}
