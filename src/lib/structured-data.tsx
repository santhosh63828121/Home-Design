import { siteConfig, sameAs } from './seo'

/**
 * Structured Data (JSON-LD) builders + a tiny <JsonLd> renderer.
 * Rendered in Server Components so the schema ships in the initial HTML for
 * crawlers. Use the builders to compose per-page graphs.
 */
export function JsonLd({ data, id }: { data: object; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    email: siteConfig.nap.email,
    telephone: siteConfig.nap.phoneE164,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.nap.streetAddress,
      addressLocality: siteConfig.nap.addressLocality,
      addressRegion: siteConfig.nap.addressRegion,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.addressCountry,
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: siteConfig.ogImage,
    url: siteConfig.url,
    telephone: siteConfig.nap.phoneE164,
    email: siteConfig.nap.email,
    priceRange: '₹₹₹',
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.nap.streetAddress,
      addressLocality: siteConfig.nap.addressLocality,
      addressRegion: siteConfig.nap.addressRegion,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: siteConfig.openingHours.days,
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    },
    sameAs,
  }
}

/**
 * City-page schema for a SERVICE-AREA business. RGL has ONE physical base
 * (Chennai) — so we emit the real Chennai address + geo, and express coverage of
 * the city via `areaServed` (City) + `serviceArea` (GeoCircle around the city's
 * real coordinates). We never fabricate a per-city street address / storefront.
 */
export function cityCoverageSchema(city: {
  name: string
  slug: string
  geo: { lat: number; lng: number }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: siteConfig.name,
    image: siteConfig.ogImage,
    url: `${siteConfig.url}/${city.slug}`,
    telephone: siteConfig.nap.phoneE164,
    email: siteConfig.nap.email,
    priceRange: '₹₹₹',
    // The single, real business location (Chennai HQ) — same on every city page.
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.nap.streetAddress,
      addressLocality: siteConfig.nap.addressLocality,
      addressRegion: siteConfig.nap.addressRegion,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    // Coverage of THIS city (not a branch): area served + a service-area circle.
    areaServed: { '@type': 'City', name: city.name },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
      geoRadius: 25000,
    },
    sameAs,
  }
}

export function serviceSchema(args: {
  name: string
  description: string
  slug: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    serviceType: args.name,
    url: `${siteConfig.url}/services/${args.slug}`,
    image: args.image || siteConfig.ogImage,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

export function creativeWorkSchema(args: {
  name: string
  description: string
  slug: string
  images?: { src: string; alt: string }[]
  genre?: string
}) {
  const url = `${siteConfig.url}/portfolio/${args.slug}`
  const images = (args.images ?? []).map((img) => ({
    '@type': 'ImageObject',
    contentUrl: img.src,
    url: img.src,
    caption: img.alt,
  }))
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: args.name,
    description: args.description,
    url,
    genre: args.genre || 'Interior Design',
    creator: { '@id': `${siteConfig.url}/#organization` },
    ...(images.length ? { image: images } : {}),
  }
}

/**
 * Review / AggregateRating graph for the Organization.
 *
 * CALLER MUST GATE THIS behind real, rated reviews (reviews.ts
 * `hasVerifiedRatings()`). Emitting a rating/count that doesn't reflect genuine
 * reviews is a Google structured-data violation. This builder assumes every
 * review passed in carries a real numeric `rating`.
 */
export function ratedReviewsSchema(
  reviews: { quote: string; name: string; role?: string; rating?: number }[],
) {
  const rated = reviews.filter((r) => typeof r.rating === 'number')
  const count = rated.length
  const average = count ? rated.reduce((s, r) => s + (r.rating as number), 0) / count : 0
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(average.toFixed(1)),
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: rated.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.quote,
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
