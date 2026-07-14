import { serviceCategories, cities } from '@/data/business'

/**
 * Central route registry — the single source of truth for URLs, the primary
 * nav and the footer. Navbar, Footer, sitemap and stubs all read from here so
 * there are no hand-typed hrefs and no dead links.
 */
export const routes = {
  home: '/',
  about: '/about',
  process: '/process',
  services: '/services',
  pricing: '/interior-design-cost-chennai',
  portfolio: '/portfolio',
  portfolioAlbums: '/portfolio/albums',
  walkthrough: '/3d-walkthrough',
  locations: '/interior-designers',
  testimonials: '/testimonials',
  blog: '/blog',
  faq: '/faq',
  contact: '/contact',
  getQuote: '/get-free-quote',
  styleQuiz: '/design-style-quiz',
  careers: '/careers',
  refer: '/refer-and-earn',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  refund: '/cancellation-refund-policy',
  gst: '/gst-policy',
  warranty: '/warranty',
  cookies: '/cookie-policy',
  sustainability: '/sustainability',
  afterSales: '/after-sales-care',
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

/**
 * Primary header navigation — the doc's canonical 7-item menu (§1.2 / §3.1).
 * Every item resolves to a real route. 3D Walkthrough and Locations are
 * intentionally demoted to the footer (still real routes) so the top menu stays
 * clean, per §3.1.
 */
export const mainNav: NavItem[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Services', href: routes.services },
  { label: 'Portfolio', href: routes.portfolio },
  { label: 'Pricing', href: routes.pricing },
  { label: 'Blogs', href: routes.blog },
  { label: 'Contact', href: routes.contact },
]

/**
 * MEGA MENU — the desktop dropdown under a primary nav item.
 * Data-driven from the same registry, so a mega-menu link can never rot into a
 * dead URL. Only items listed here open a panel; the rest are plain links.
 */
export type MegaColumn = { heading: string; links: NavItem[] }
export type MegaMenu = {
  columns: MegaColumn[]
  feature: { eyebrow: string; title: string; body: string; href: string; cta: string }
}

export const megaMenus: Record<string, MegaMenu> = {
  [routes.services]: {
    columns: [
      {
        heading: 'Residential',
        links: serviceCategories
          .filter((s) => s.group === 'core')
          .slice(0, 6)
          .map((s) => ({ label: s.name, href: routes.service(s.slug) })),
      },
      {
        heading: 'Specialist',
        links: [
          ...serviceCategories
            .filter((s) => s.group !== 'core')
            .slice(0, 5)
            .map((s) => ({ label: s.name, href: routes.service(s.slug) })),
          { label: 'All 15 categories', href: routes.services },
        ],
      },
      {
        heading: 'How we work',
        links: [
          { label: 'Our Process', href: routes.process },
          { label: '3D Walkthrough', href: routes.walkthrough },
          { label: 'Pricing & Cost', href: routes.pricing },
          { label: 'Warranty', href: routes.warranty },
          { label: 'After-Sales Care', href: routes.afterSales },
        ],
      },
    ],
    feature: {
      eyebrow: 'Not sure where to start?',
      title: 'Find your design language',
      body: 'A two-minute quiz that translates how you live into a material palette and a plan.',
      href: routes.styleQuiz,
      cta: 'Take the style quiz',
    },
  },
  [routes.portfolio]: {
    columns: [
      {
        heading: 'Browse',
        links: [
          { label: 'All Projects', href: routes.portfolio },
          { label: 'Photo Albums', href: routes.portfolioAlbums },
          { label: '3D Walkthrough', href: routes.walkthrough },
          { label: 'Testimonials', href: routes.testimonials },
        ],
      },
      {
        heading: 'By city',
        links: cities.slice(0, 6).map((c) => ({
          label: c.name,
          href: routes.city(c.slug as string),
        })),
      },
      {
        heading: 'Costs',
        links: [
          { label: '2BHK Interior Cost', href: routes.cost2bhk },
          { label: '3BHK Interior Cost', href: routes.cost3bhk },
          { label: 'Modular Kitchen Price', href: routes.kitchenPrice },
          { label: 'Full Cost Guide', href: routes.pricing },
        ],
      },
    ],
    feature: {
      eyebrow: 'Every project, start to finish',
      title: 'See how a home is made',
      body: 'Materials, drawings, execution and the finished room — the full story behind the photograph.',
      href: routes.portfolio,
      cta: 'Open the portfolio',
    },
  },
}

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
      { label: 'Process', href: routes.process },
      { label: 'Portfolio', href: routes.portfolio },
      { label: '3D Walkthrough', href: routes.walkthrough },
      { label: 'Pricing', href: routes.pricing },
      { label: 'Testimonials', href: routes.testimonials },
      { label: 'Style Quiz', href: routes.styleQuiz },
      { label: 'Blog', href: routes.blog },
      { label: 'FAQ', href: routes.faq },
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
      { label: 'Terms & Conditions', href: routes.terms },
      { label: 'Privacy Policy', href: routes.privacy },
      { label: 'Cancellation & Refund', href: routes.refund },
      { label: 'GST Policy', href: routes.gst },
      { label: 'Warranty', href: routes.warranty },
      { label: 'Cookie Policy', href: routes.cookies },
      { label: 'Sustainability', href: routes.sustainability },
      { label: 'After-Sales Care', href: routes.afterSales },
    ],
  },
]

/** All static routes (for the sitemap). Dynamic routes are added separately. */
export const staticRoutes: string[] = [
  routes.home,
  routes.about,
  routes.process,
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
  routes.faq,
  routes.contact,
  routes.getQuote,
  routes.styleQuiz,
  routes.careers,
  routes.refer,
  routes.privacy,
  routes.terms,
  routes.refund,
  routes.gst,
  routes.warranty,
  routes.cookies,
  routes.sustainability,
  routes.afterSales,
]
