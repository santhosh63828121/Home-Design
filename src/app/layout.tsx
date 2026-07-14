import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/seo'
import { buildMetadata } from '@/lib/seo'
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from '@/lib/structured-data'
import FloatingContact from '@/components/FloatingContact'
import MotionProvider from '@/components/MotionProvider'
import ScrollProgress from '@/components/ScrollProgress'
import Analytics, { GtmNoScript } from '@/components/Analytics'
import CustomCursor from '@/components/CustomCursor'

// Editorial display — Cormorant Garamond. The LIGHT weights are the point: at
// display sizes (clamp up to 8.5rem) 300/400 reads like an architecture
// monograph, while 600/700 reads like a wedding invitation. 500/600 are kept for
// small headings, where light Cormorant would go weedy.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dmsans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: '/manifest.webmanifest',
  applicationName: siteConfig.name,
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${dmSans.variable}`}>
      <head>
        {/* Early-connect to the image CDN. Every hero/portfolio/blog image is
            served from images.unsplash.com; opening the TLS connection during
            HTML parse (instead of when the first <img> is discovered) trims the
            image off the LCP critical path. Zero UI/markup impact. */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <GtmNoScript />
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <FloatingContact />
        </MotionProvider>
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <JsonLd id="ld-localbusiness" data={localBusinessSchema()} />
        <Analytics />
      </body>
    </html>
  )
}
