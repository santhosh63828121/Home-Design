/**
 * Legacy (Wix) → new clean-URL map (master spec §3). Single source of truth.
 * Enforced as literal 301s in src/middleware.ts.
 *
 * Note: Next.js `next.config` redirects can only emit 308/307 (not 301), so the
 * 301s the spec requires are served from middleware instead. Keys must stay in
 * sync with the `matcher` in middleware.ts.
 */
export const legacyRedirects: Record<string, string> = {
  '/aboutus-whoweare': '/about',
  '/3d-projectswalkthroughs': '/3d-walkthrough',
  '/rgl-museum': '/portfolio',
  '/photo-albums': '/portfolio/albums',
  '/plans-pricing': '/interior-design-cost-chennai',
  '/kitchen-units-interiors': '/services/modular-kitchen-chennai',
  '/wardrobe-units-interiors': '/services/wardrobe-design-chennai',
  '/entertainment-units-interiors': '/services/tv-units-chennai',
  '/bedroom-units-interiors': '/services/bedroom-interior-chennai',
  '/contactus': '/contact',
  '/privacypolicy': '/privacy-policy',
  '/copy-of-privacy-policy-1': '/terms-and-conditions',
  '/copy-of-privacy-policy': '/cancellation-refund-policy',
}
