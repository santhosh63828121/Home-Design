import { serviceCategories, cities } from '@/data/business'

/**
 * Central route registry — the single source of truth for URLs, the primary
 * nav and the footer. Navbar, Footer, sitemap and stubs all read from here so
 * there are no hand-typed hrefs and no dead links.
 */
export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  pricing: '/interior-design-cost-chennai',
  portfolio: '/portfolio',
  portfolioAlbums: '/portfolio/albums',
  walkthrough: '/3d-walkthrough',
  locations: '/interior-designers',
  testimonials: '/testimonials',
  blog: '/blog',
  contact: '/contact',
  getQuote: '/get-free-quote',
  careers: '/careers',
  refer: '/refer-and-earn',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  refund: '/cancellation-refund-policy',
  // pricing sub-pages
  kitchenPrice: '/modular-kitchen-price-chennai',
  cost2bhk: '/2bhk-interior-cost-chennai',
  cost3bhk: '/3bhk-interior-cost-chennai',
  // helpers
  service: (slug: string) => `/services/${slug}`,
  city: (slug: string) => `/${slug}`, // city slugs already read "interior-designers-<city>"
  portfolioProject: (slug: string) => `/portfolio/${slug}`,
  blogPost: (slug: string) => `/blog/${slug}`,
} as const

export type NavItem = { label: string; href: string }

/** Primary header navigation (every item resolves to a real route). */
export const mainNav: NavItem[] = [
  { label: 'Services', href: routes.services },
  { label: 'Pricing', href: routes.pricing },
  { label: 'Portfolio', href: routes.portfolio },
  { label: '3D Walkthrough', href: routes.walkthrough },
  { label: 'Locations', href: routes.locations },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
]

/** Footer link columns — all real <Link>s. */
export const footerColumns: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Services',
    links: [
      ...serviceCategories
        .filter((s) => s.group === 'core')
        .slice(0, 6)
        .map((s) => ({ label: s.name, href: routes.service(s.slug) })),
      { label: 'All services', href: routes.services },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: routes.about },
      { label: 'Portfolio', href: routes.portfolio },
      { label: '3D Walkthrough', href: routes.walkthrough },
      { label: 'Pricing', href: routes.pricing },
      { label: 'Testimonials', href: routes.testimonials },
      { label: 'Blog', href: routes.blog },
      { label: 'Careers', href: routes.careers },
      { label: 'Refer & Earn', href: routes.refer },
      { label: 'Contact', href: routes.contact },
    ],
  },
  {
    heading: 'Locations',
    links: [
      ...cities.map((c) => ({ label: c.name, href: routes.city(c.slug as string) })),
      { label: 'All locations', href: routes.locations },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: routes.privacy },
      { label: 'Terms & Conditions', href: routes.terms },
      { label: 'Cancellation & Refund', href: routes.refund },
    ],
  },
]

/** All static routes (for the sitemap). Dynamic routes are added separately. */
export const staticRoutes: string[] = [
  routes.home,
  routes.about,
  routes.services,
  routes.pricing,
  routes.kitchenPrice,
  routes.cost2bhk,
  routes.cost3bhk,
  routes.portfolio,
  routes.portfolioAlbums,
  routes.walkthrough,
  routes.locations,
  routes.testimonials,
  routes.blog,
  routes.contact,
  routes.getQuote,
  routes.careers,
  routes.refer,
  routes.privacy,
  routes.terms,
  routes.refund,
]
