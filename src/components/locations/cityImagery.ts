/**
 * CITY IMAGERY — one curated set, deterministically dealt.
 * =============================================================================
 * The city pages are a ~20-route family driven by ONE template, so their
 * photography has to do two contradictory things: look art-directed rather than
 * stock, and stay distinct enough that Adyar and Velachery don't read as the
 * same page twice.
 *
 * The answer is a small, calm library (the same Unsplash frames already used in
 * src/data/content.js — one visual language across the whole site) dealt out by
 * a stable hash of the slug. Same city → same photograph, every build: no
 * randomness, no hydration mismatch, no per-city file to maintain.
 *
 * HONESTY (DESIGN-SYSTEM §6): these are architectural REFERENCE frames, not
 * project photography. The alt text describes the room in front of the camera —
 * it never claims the room is in that city, and it never implies it is one of
 * our projects there. Real city work surfaces from portfolio.ts, tagged, and
 * only when it exists.
 */

export type CityImage = { src: string; alt: string }

const LIBRARY: CityImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80',
    alt: 'Living room with a sculptural sofa, marble floor and tall daylight windows',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=80',
    alt: 'Modular kitchen with honed stone counters and handleless cabinetry',
  },
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80',
    alt: 'Master bedroom with layered wooden textures and warm ambient light',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80',
    alt: 'Minimal interior with clean lines and a single sculptural pendant',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=80',
    alt: 'Contemporary room with rich wood shelving against a quiet accent wall',
  },
  {
    src: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=2400&q=80',
    alt: 'Built-in wardrobe with full-height shutters and integrated storage',
  },
  {
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2400&q=80',
    alt: 'Bathroom with book-matched marble walls and a freestanding tub',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=2400&q=80',
    alt: 'Warm modular kitchen lit by a run of low pendant lights',
  },
]

/** Stable, build-deterministic — no Math.random(), so SSR and client agree. */
function hash(slug: string): number {
  let n = 0
  for (let i = 0; i < slug.length; i++) n = (n * 31 + slug.charCodeAt(i)) >>> 0
  return n
}

/**
 * Two frames per city: the masthead photograph and the detail frame beside the
 * housing note. The +3 offset (coprime with a library of 8) guarantees they are
 * never the same picture.
 */
export function cityImagery(slug: string): { hero: CityImage; detail: CityImage } {
  const h = hash(slug)
  return {
    hero: LIBRARY[h % LIBRARY.length],
    detail: LIBRARY[(h + 3) % LIBRARY.length],
  }
}

/** The masthead frame for the locations index itself. */
export const LOCATIONS_HERO: CityImage = LIBRARY[0]
