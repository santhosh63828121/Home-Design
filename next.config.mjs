/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // The cinematic engine (three/gsap/lenis) is loaded client-side only; keep it
  // out of the server bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    /**
     * Native cross-fade between routes, via the browser's View Transitions API.
     *
     * We deliberately do NOT use a React page-transition wrapper (app/template.tsx).
     * Measured: wrapping every page in a client boundary cost -11 Perf and +1.9s
     * LCP, and animating a page-level `opacity:0 -> 1` inherently delays the
     * largest contentful paint. View Transitions have neither problem: they are
     * compositor-driven, ship no JS, and apply ONLY to same-document navigations —
     * so the first paint is completely untouched.
     *
     * Styling lives in globals.css (::view-transition-old/new), and it degrades
     * to an instant swap on browsers without support.
     */
    viewTransition: true,
  },

  // Legacy → new 301 redirects (master spec §3) are served from
  // src/middleware.ts using a LITERAL 301. Next.js `redirects()` here can only
  // emit 308/307, so the map lives in src/data/redirects.ts + middleware.ts.
}

export default nextConfig
