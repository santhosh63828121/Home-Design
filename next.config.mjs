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
  },

  // Legacy → new 301 redirects (master spec §3) are served from
  // src/middleware.ts using a LITERAL 301. Next.js `redirects()` here can only
  // emit 308/307, so the map lives in src/data/redirects.ts + middleware.ts.
}

export default nextConfig
