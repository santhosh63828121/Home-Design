/**
 * CANONICAL PRICING MODEL — the single typed source for everything money.
 * ----------------------------------------------------------------------------
 * The ranges table, the cost calculator and every pricing sub-page read rates
 * and labels from here. Nothing is hardcoded in a component.
 *
 * INDICATIVE FLAG: while `PRICING_INDICATIVE` is true, every rendered price
 * carries a `*` and the footnote shows. When the client confirms real numbers,
 * set it to `false` (and/or drop `indicative` on a package) — the asterisks and
 * footnote disappear and the figures firm up with ZERO component edits.
 */

export const PRICING_INDICATIVE = true
export const PRICING_FOOTNOTE = '*Indicative range. Final quote after free site visit.'

// ---- Money helpers ---------------------------------------------------------
export type Money = number // INR
export type Range = { min: Money | null; max: Money | null } // null = open / custom

const trim = (x: number) => {
  const r = Math.round(x * 10) / 10
  return Number.isInteger(r) ? String(r) : r.toFixed(1)
}

/** Indian-format a rupee amount: ₹50,000 · ₹3.5L · ₹1.2Cr. */
export function formatINR(n: Money): string {
  if (n >= 1e7) return `₹${trim(n / 1e7)}Cr`
  if (n >= 1e5) return `₹${trim(n / 1e5)}L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

/** Render a range as a label, with the `*` wired to the indicative flag. */
export function priceLabel(r: Range, indicative: boolean = PRICING_INDICATIVE): string {
  const star = indicative ? '*' : ''
  if (r.min == null) return 'Custom quote'
  if (r.max == null) return `From ${formatINR(r.min)}${star}`
  if (r.min === r.max) return `${formatINR(r.min)}${star}`
  return `${formatINR(r.min)}–${formatINR(r.max)}${star}`
}

// ---- Packages (the transparent ranges table) -------------------------------
export type Package = {
  id: string
  name: string
  scope: string
  range: Range
  indicative: boolean
  included: string[]
  excluded: string[]
}

export const packages: Package[] = [
  {
    id: 'modular-kitchen',
    name: 'Modular Kitchen',
    scope: 'Base + tall + loft units, branded hardware, counter',
    range: { min: 50_000, max: null }, // "From ₹50,000"
    indicative: false, // the entry signal is firm
    included: ['Carcass + shutters', 'Soft-close hardware', 'Loft & tall units', 'Free 3D design'],
    excluded: ['Countertop stone', 'Chimney & hob', 'Sink & faucet', 'Civil / plumbing work'],
  },
  {
    id: 'essentials-2bhk',
    name: 'Essentials 2BHK',
    scope: 'Modular kitchen + 2 wardrobes + TV unit',
    range: { min: 350_000, max: 600_000 },
    indicative: true,
    included: ['Modular kitchen', '2 wardrobes', 'TV / entertainment unit', 'Free 3D walkthrough'],
    excluded: ['False ceiling', 'Painting', 'Loose furniture', 'Appliances'],
  },
  {
    id: 'premium-3bhk',
    name: 'Premium 3BHK',
    scope: 'Full home with branded fittings & finishes',
    range: { min: 600_000, max: 1_200_000 },
    indicative: true,
    included: [
      'Kitchen + 3 wardrobes',
      'TV unit, crockery & storage',
      'False ceiling + lighting',
      'Painting + 3D walkthrough',
    ],
    excluded: ['Major civil work', 'Premium appliances', 'Smart-home add-ons'],
  },
  {
    id: 'full-home-turnkey',
    name: 'Full Home Turnkey',
    scope: 'Civil + false ceiling + furniture, end-to-end',
    range: { min: null, max: null }, // custom
    indicative: true,
    included: ['Everything in Premium', 'Civil & electrical coordination', 'Loose furniture & décor', 'Smart-home & landscaping (optional)'],
    excluded: ['Statutory approvals', 'Structural changes'],
  },
]

export const getPackage = (id: string) => packages.find((p) => p.id === id)

// ---- Material / finish tiers (multipliers for the estimator) ---------------
export type FinishTier = { id: string; name: string; blurb: string; multiplier: number }

export const finishTiers: FinishTier[] = [
  { id: 'essential', name: 'Essential', blurb: 'Quality laminates, reliable hardware', multiplier: 1.0 },
  { id: 'premium', name: 'Premium', blurb: 'Acrylic / membrane finishes, branded hardware', multiplier: 1.35 },
  { id: 'luxury', name: 'Luxury', blurb: 'PU / veneer, designer hardware & lighting', multiplier: 1.75 },
]

// ---- Per-room base rates (the calculator math) -----------------------------
export type RoomRate = {
  id: string
  name: string
  /** range per unit, BEFORE the finish multiplier */
  base: Range & { min: Money; max: Money }
  /** max quantity offered in the calculator */
  maxQty: number
  unitLabel?: string
}

export const roomRates: RoomRate[] = [
  { id: 'modular-kitchen', name: 'Modular kitchen', base: { min: 50_000, max: 250_000 }, maxQty: 2 },
  { id: 'wardrobe', name: 'Wardrobe', base: { min: 35_000, max: 90_000 }, maxQty: 5, unitLabel: 'wardrobe' },
  { id: 'tv-unit', name: 'TV / entertainment unit', base: { min: 25_000, max: 70_000 }, maxQty: 2 },
  { id: 'crockery-unit', name: 'Crockery unit', base: { min: 20_000, max: 55_000 }, maxQty: 2 },
  { id: 'storage-unit', name: 'Storage / utility unit', base: { min: 15_000, max: 45_000 }, maxQty: 4 },
  { id: 'pooja-unit', name: 'Pooja unit', base: { min: 20_000, max: 60_000 }, maxQty: 1 },
  { id: 'false-ceiling', name: 'False ceiling + lighting', base: { min: 25_000, max: 75_000 }, maxQty: 4, unitLabel: 'room' },
  { id: 'painting', name: 'Painting (full home)', base: { min: 30_000, max: 80_000 }, maxQty: 1 },
  { id: 'living-room', name: 'Living room (sofa, console, décor)', base: { min: 50_000, max: 150_000 }, maxQty: 1 },
]

export const getRoom = (id: string) => roomRates.find((r) => r.id === id)

// ---- BHK presets (default room sets to seed the calculator) ----------------
export type RoomQty = { roomId: string; qty: number }
export type BhkPreset = { id: string; label: string; rooms: RoomQty[] }

export const bhkPresets: BhkPreset[] = [
  { id: '1bhk', label: '1 BHK', rooms: [{ roomId: 'modular-kitchen', qty: 1 }, { roomId: 'wardrobe', qty: 1 }, { roomId: 'tv-unit', qty: 1 }] },
  {
    id: '2bhk',
    label: '2 BHK',
    rooms: [{ roomId: 'modular-kitchen', qty: 1 }, { roomId: 'wardrobe', qty: 2 }, { roomId: 'tv-unit', qty: 1 }],
  },
  {
    id: '3bhk',
    label: '3 BHK',
    rooms: [
      { roomId: 'modular-kitchen', qty: 1 },
      { roomId: 'wardrobe', qty: 3 },
      { roomId: 'tv-unit', qty: 1 },
      { roomId: 'false-ceiling', qty: 2 },
      { roomId: 'painting', qty: 1 },
    ],
  },
  {
    id: 'full-home',
    label: 'Full Home',
    rooms: [
      { roomId: 'modular-kitchen', qty: 1 },
      { roomId: 'wardrobe', qty: 3 },
      { roomId: 'tv-unit', qty: 1 },
      { roomId: 'crockery-unit', qty: 1 },
      { roomId: 'false-ceiling', qty: 3 },
      { roomId: 'painting', qty: 1 },
      { roomId: 'living-room', qty: 1 },
      { roomId: 'pooja-unit', qty: 1 },
    ],
  },
]

export const getPreset = (id: string) => bhkPresets.find((p) => p.id === id)

// ---- EMI -------------------------------------------------------------------
export const emi = {
  defaultTenureMonths: 18,
  maxTenureMonths: 24,
  noCostMonths: 6, // no-cost EMI window on select plans
}

/** Indicative monthly EMI (no-cost approximation: principal / tenure). */
export function emiPerMonth(amount: Money, months: number = emi.defaultTenureMonths): Money {
  return Math.round(amount / months)
}

// ---- THE ESTIMATOR (single source of truth math) ---------------------------
export type EstimateInput = { rooms: RoomQty[]; finishId: string }
export type EstimateLine = { id: string; name: string; qty: number; range: { min: Money; max: Money } }
export type EstimateResult = {
  range: { min: Money; max: Money }
  indicative: boolean
  finish: FinishTier
  lines: EstimateLine[]
  emiPerMonth: Money
  label: string
}

export function estimate(input: EstimateInput): EstimateResult {
  const finish = finishTiers.find((f) => f.id === input.finishId) ?? finishTiers[0]
  const lines: EstimateLine[] = []
  let min = 0
  let max = 0

  for (const sel of input.rooms) {
    const room = getRoom(sel.roomId)
    if (!room || sel.qty <= 0) continue
    const lineMin = Math.round(room.base.min * sel.qty * finish.multiplier)
    const lineMax = Math.round(room.base.max * sel.qty * finish.multiplier)
    min += lineMin
    max += lineMax
    lines.push({ id: room.id, name: room.name, qty: sel.qty, range: { min: lineMin, max: lineMax } })
  }

  const range = { min, max }
  return {
    range,
    indicative: PRICING_INDICATIVE,
    finish,
    lines,
    emiPerMonth: emiPerMonth(min),
    label: priceLabel(range),
  }
}

// ---- FAQs (unique per context; feed the FAQPage schema) --------------------
export type Faq = { q: string; a: string }

export const pricingFaqs: Record<'hub' | 'kitchen' | '2bhk' | '3bhk', Faq[]> = {
  hub: [
    {
      q: 'How much does home interior cost in Chennai?',
      a: 'It depends on scope and finish. As a guide, an Essentials 2BHK starts around ₹3.5–6 lakh and a Premium 3BHK around ₹6–12 lakh, while a modular kitchen starts from ₹50,000. Use the calculator above for an instant range, then book a free site visit for an exact quote.',
    },
    {
      q: 'What is included in your interior packages?',
      a: 'Packages typically include modular kitchen, wardrobes and a TV unit, plus your free 3D walkthrough. Premium and turnkey scopes add false ceiling, lighting and painting. Civil work, appliances and loose furniture are usually quoted separately — see the included/excluded list above.',
    },
    {
      q: 'Do you offer EMI or no-cost EMI?',
      a: 'Yes. We offer EMI options up to 24 months, with no-cost EMI available on select plans, so you can spread the cost of your interiors comfortably.',
    },
    {
      q: 'Why is the price shown as a range and not a fixed number?',
      a: 'Interiors are made to your space, layout and finish choice, so an honest figure is a range until we measure your home. Your free site visit and 3D design convert the range into a transparent, itemised quote.',
    },
    {
      q: 'Is the 3D design and quote really free?',
      a: 'Yes — the HD 3D walkthrough and the itemised quote are completely free, with no obligation to proceed.',
    },
  ],
  kitchen: [
    {
      q: 'How much does a modular kitchen cost in Chennai?',
      a: 'Modular kitchens start from ₹50,000 and scale with size, layout and finish. An L-shaped Essential kitchen sits at the lower end; larger U-shaped or island kitchens in premium finishes cost more. The calculator gives an instant range.',
    },
    {
      q: 'What kitchen layouts do you build?',
      a: 'We build L-shaped, U-shaped, parallel and island layouts, each engineered to the millimetre for your space, with tall and loft units to maximise storage.',
    },
    {
      q: 'Is the countertop and chimney included in the price?',
      a: 'The base price covers carcass, shutters, hardware and loft/tall units. Countertop stone, chimney, hob, sink and faucet are usually quoted separately so you only pay for what you choose.',
    },
    {
      q: 'What finishes can I choose for my kitchen?',
      a: 'From quality laminates (Essential) to acrylic and membrane (Premium) and PU or veneer (Luxury) — with 1000+ colours and textures and branded soft-close hardware.',
    },
  ],
  '2bhk': [
    {
      q: 'How much to do interiors for a 2BHK in Chennai?',
      a: 'Our Essentials 2BHK — modular kitchen, two wardrobes and a TV unit — starts around ₹3.5–6 lakh depending on finish. Add false ceiling, painting or loose furniture to tailor the scope.',
    },
    {
      q: 'What does the 2BHK package include?',
      a: 'A modular kitchen, two wardrobes, a TV/entertainment unit and your free 3D walkthrough. False ceiling, painting, appliances and loose furniture can be added — see the included/excluded list.',
    },
    {
      q: 'Can I do my 2BHK in phases?',
      a: 'Yes. Many clients start with the kitchen and wardrobes, then add units later. EMI options up to 24 months (no-cost on select plans) also help spread the cost.',
    },
    {
      q: 'How long does a 2BHK take to deliver?',
      a: 'Because units are factory-built, most 2BHK interiors are delivered and installed within our guaranteed 45-day timeline.',
    },
  ],
  '3bhk': [
    {
      q: 'How much to do interiors for a 3BHK in Chennai?',
      a: 'Our Premium 3BHK — a full home with branded fittings — starts around ₹6–12 lakh depending on finish and scope. A full turnkey project (civil, false ceiling, furniture) is quoted to your requirements.',
    },
    {
      q: 'What is the difference between Premium and Full Home Turnkey?',
      a: 'Premium covers kitchen, wardrobes, TV/crockery/storage units, false ceiling, lighting and painting. Turnkey adds civil and electrical coordination, loose furniture, décor and optional smart-home and landscaping.',
    },
    {
      q: 'Do you provide branded hardware and fittings for a 3BHK?',
      a: 'Yes — Premium and Luxury finishes use branded soft-close hardware, designer lighting and premium laminate, acrylic, membrane, PU or veneer surfaces.',
    },
    {
      q: 'Is EMI available for a full 3BHK project?',
      a: 'Yes, EMI is available up to 24 months with no-cost EMI on select plans, so a full 3BHK can be spread into comfortable monthly payments.',
    },
  ],
}
