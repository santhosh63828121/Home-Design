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
  { label: 'FLOORS', href: '#services' },
  { label: 'OFFERS', href: '#pricing' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'COMMUNITY', href: '#why' },
  { label: 'PRICING', href: '#pricing' },
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

export const SERVICES = {
  label: 'FLOOR 1 · OPEN PLAN',
  heading: ['ENERGY THAT GETS', 'YOU IN THE ZONE.'],
  body: "RGL Decors delivers end-to-end interior solutions — from concept to move-in. Every space is crafted to inspire, comfort, and reflect your personality. India's 1st studio offering FREE complete 3D walkthroughs with 99% accuracy.",
  tags: ['3D Design', 'Free Estimate', 'Easy Access', '10Yr Warranty'],
  image:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
  alt: 'Warm vibrant Indian modular kitchen with Edison lighting',
}
