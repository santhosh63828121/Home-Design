import type { Metadata } from 'next'
import { business, socials, sameAs as businessSameAs, seoKeywords, serviceAreas } from '@/data/business'
import { suburbs } from '@/data/locations'

/**
 * SEO config — a thin projection of the canonical business data (data/business.ts)
 * plus web-only concerns (site URL, OG image, theme). NAP / socials / areaServed
 * are NOT duplicated here; they come from the single source of truth.
 */
export const siteConfig = {
  name: business.brand,
  legalName: business.legalName,
  shortName: business.brand,
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rgldecors.com').replace(/\/$/, ''),
  // Feeds every default meta description AND the Organization / LocalBusiness
  // schema. Deliberately free of the retired "10-year warranty" / "45-day
  // delivery" claims — warranty terms now live only on /warranty.
  description:
    'RGL Decors — premium turnkey interior designers in Chennai. Design excellence, craftsmanship and end-to-end execution, with immersive 3D walkthroughs.',
  tagline: 'Interior Designers in Chennai',
  locale: 'en_IN',
  themeColor: '#5E6746',
  ogImage:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  keywords: seoKeywords,
  nap: {
    phoneDisplay: business.nap.phoneDisplay,
    phoneE164: business.nap.phoneE164,
    email: business.nap.email,
    streetAddress: business.nap.addressLocality,
    addressLocality: business.nap.addressLocality,
    addressRegion: business.nap.addressRegion,
    postalCode: business.nap.postalCode,
    addressCountry: business.nap.addressCountry,
  },
  geo: business.geo,
  // Honest coverage: the 8 TN cities we serve + the 12 Chennai suburbs with real
  // local pages, then the state-wide entry. Suburb-level schema (GeoCircle) is
  // also emitted per suburb page; this is the business-wide list.
  areaServed: [
    ...serviceAreas.filter((a) => !a.statewide).map((a) => a.name),
    ...suburbs.map((s) => s.name),
    ...serviceAreas.filter((a) => a.statewide).map((a) => a.name),
  ],
  openingHours: business.openingHours,
  social: Object.fromEntries(socials.map((s) => [s.name.toLowerCase(), s.url])),
} as const

export const sameAs = businessSameAs

/**
 * Clamp a meta description to a SERP-safe length at a word boundary (so it never
 * truncates mid-word in results). Used by dynamic templates where the source
 * copy length varies. Default ceiling 158 chars (~Google's ~920px cutoff).
 */
export function clampDesc(s: string, max = 158): string {
  const t = s.trim().replace(/\s+/g, ' ')
  if (t.length <= max) return t
  const cut = t.slice(0, max + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : t.slice(0, max)).replace(/[\s.,;:—-]+$/, '') + '…'
}

type BuildMetaArgs = {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  ogImage?: string
  noindex?: boolean
}

/** Build a complete, consistent Metadata object for any page. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  keywords = [...siteConfig.keywords],
  ogImage = siteConfig.ogImage,
  noindex = false,
}: BuildMetaArgs = {}): Metadata {
  const canonical = `${siteConfig.url}${path === '/' ? '' : path}`
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: canonical,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
