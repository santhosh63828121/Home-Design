import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { legacyRedirects } from '@/data/redirects'

/**
 * Legacy URL → new URL 301 redirects (master spec §3).
 * Uses a literal **301** (next.config redirects can only emit 308/307).
 * The `matcher` below must mirror the keys of `legacyRedirects`.
 */
export function middleware(req: NextRequest) {
  const dest = legacyRedirects[req.nextUrl.pathname]
  if (dest) {
    const url = req.nextUrl.clone()
    url.pathname = dest
    url.search = '' // legacy query strings are not preserved
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

// Static matcher (must be a literal for Next to analyse it at build time).
export const config = {
  matcher: [
    '/aboutus-whoweare',
    '/3d-projectswalkthroughs',
    '/rgl-museum',
    '/photo-albums',
    '/plans-pricing',
    '/kitchen-units-interiors',
    '/wardrobe-units-interiors',
    '/entertainment-units-interiors',
    '/bedroom-units-interiors',
    '/contactus',
    '/privacypolicy',
    '/copy-of-privacy-policy-1',
    '/copy-of-privacy-policy',
  ],
}
