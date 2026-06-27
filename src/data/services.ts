/**
 * SERVICE TAXONOMY — the doc's 8 categories (§4.4) as the single source for the
 * Services hub. Each group carries its own genuinely-distinct body copy (no
 * shared boilerplate) and lists its capabilities. Items with a `slug` link to an
 * existing individual `/services/[slug]` page; the rest are listed as
 * capabilities (we don't mint thin near-duplicate pages — see RGL-UPGRADE-PLAN
 * "thin-content" note). Positioning line + category copy are from §4.4.
 */

export const servicesPositioning = 'From Foyer to Fork — Every Service Under One Roof.'

export type GroupItem = { name: string; slug?: string }

export type ServiceGroup = {
  id: string
  letter: string
  name: string
  /** Unique category body (doc §4.4) — substantial, not boilerplate. */
  body: string
  items: GroupItem[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'residential',
    letter: 'A',
    name: 'Residential Interiors',
    body: 'Complete homes designed and built end-to-end — from compact apartments to multi-floor villas. Vastu-aware planning, NRI remote management, and a single accountable partner from concept to handover.',
    items: [
      { name: 'Full home design (1–5 BHK)' },
      { name: 'Luxury apartments' },
      { name: 'Villas (G+1 / G+2 / G+3)' },
      { name: 'Duplex & penthouse' },
      { name: 'Bedroom interiors', slug: 'bedroom-interior-chennai' },
      { name: 'NRI remote-managed projects' },
      { name: 'Vastu-compliant interiors' },
    ],
  },
  {
    id: 'commercial',
    letter: 'B',
    name: 'Commercial Interiors',
    body: 'Workplaces and customer spaces engineered to perform — productive offices, conversion-focused retail, and hospitality interiors that hold up to heavy daily use. Branded, professional, on-brief.',
    items: [
      { name: 'Corporate office & workstations' },
      { name: 'Cabins & leadership suites' },
      { name: 'Conference & meeting rooms' },
      { name: 'Retail & boutique stores' },
      { name: 'Salon & spa' },
      { name: 'Restaurant & café' },
      { name: 'Clinic & healthcare' },
      { name: 'Hotel, resort & showroom' },
    ],
  },
  {
    id: 'modular',
    letter: 'C',
    name: 'Modular Systems',
    body: 'Factory-made modular units fitted to the millimetre — kitchens, wardrobes and storage manufactured under strict QC, then installed clean with zero site cutting. The core of a precise, durable interior.',
    items: [
      { name: 'Modular kitchens', slug: 'modular-kitchen-chennai' },
      { name: 'Wardrobes', slug: 'wardrobe-design-chennai' },
      { name: 'TV & media walls', slug: 'tv-units-chennai' },
      { name: 'Cabinets', slug: 'cabinets' },
      { name: 'Crockery & bar units', slug: 'crockery-units' },
      { name: 'Storage & utility units', slug: 'storage-units' },
      { name: 'Study & work units', slug: 'study-units' },
      { name: 'Home appliances', slug: 'home-appliances' },
      { name: 'Pooja units · shoe racks · foyer' },
    ],
  },
  {
    id: 'civil-structural',
    letter: 'D',
    name: 'Civil & Structural',
    body: 'The fabric of the space — false ceilings, flooring, wall finishes, waterproofing and tiling — coordinated by RGL so the structural and finishing trades meet a single standard and timeline.',
    items: [
      { name: 'False ceilings (POP / gypsum / cove)' },
      { name: 'Flooring (marble / granite / wood / SPC / epoxy)' },
      { name: 'Wall finishes, wallpapers & painting', slug: 'wallpapers-paintings' },
      { name: 'Bathroom fixtures & remodelling', slug: 'bathroom-fixtures' },
      { name: 'Doors & frames' },
      { name: 'Waterproofing & tiling' },
      { name: 'Demolition & alterations' },
    ],
  },
  {
    id: 'mep',
    letter: 'E',
    name: 'MEP & Smart Home',
    body: 'Electrical, lighting, plumbing, cooling and automation designed in from the start — lux-calculated lighting plans, concealed services and home automation that make the home both efficient and effortless.',
    items: [
      { name: 'Electrical & rewiring' },
      { name: 'Indoor & outdoor lighting design', slug: 'indoor-outdoor-lighting' },
      { name: 'Smart home automation', slug: 'smart-home-chennai' },
      { name: 'Plumbing & sanitary' },
      { name: 'Air conditioning' },
      { name: 'Home theatre' },
      { name: 'Security systems' },
    ],
  },
  {
    id: 'outdoor-landscape',
    letter: 'F',
    name: 'Outdoor & Landscape',
    body: 'Terraces, gardens and outdoor living designed for Chennai’s climate — pergolas, water features and planting that extend the home beyond its walls and stand up to sun and salt air.',
    items: [
      { name: 'Landscape & terrace design' },
      { name: 'Plants & landscaping', slug: 'plants-landscaping' },
      { name: 'Pergolas & gazebos' },
      { name: 'Outdoor kitchen' },
      { name: 'Water features' },
      { name: 'Pool design & supervision' },
      { name: 'Boundary walls & gates' },
    ],
  },
  {
    id: 'soft-furnishings',
    letter: 'G',
    name: 'Soft Furnishings & Décor',
    body: 'The layer that makes a house feel finished — curtains, upholstery, rugs, artwork and accessories curated to the design language, so the home is styled, not just built.',
    items: [
      { name: 'Custom curtains, drapes & blinds' },
      { name: 'Upholstered seating & custom sofas' },
      { name: 'Finished furniture', slug: 'finished-furniture' },
      { name: 'Artwork curation & artifacts', slug: 'art-gallery-artifacts' },
      { name: 'Cushions, throws & linen' },
      { name: 'Rugs, accessories & indoor plants' },
      { name: 'Mosquito-net systems' },
    ],
  },
  {
    id: 'after-sales',
    letter: 'H',
    name: 'After-Sales & Care',
    body: 'The relationship continues after handover — preventive maintenance, fast warranty support, and renovation or refresh of existing interiors, so the work keeps performing for years.',
    items: [
      { name: 'AMC (quarterly preventive care)' },
      { name: 'Warranty service' },
      { name: 'Renovation & remodel' },
      { name: 'Deep cleaning / move-in ready' },
    ],
  },
]

/** Count of services that have an individual page (for copy/UX). */
export const pagedServiceCount = serviceGroups.reduce(
  (n, g) => n + g.items.filter((i) => i.slug).length,
  0,
)
