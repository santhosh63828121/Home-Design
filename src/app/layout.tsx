import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, DM_Sans } from 'next/font/google'
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSans.variable}`}>
      <body>
        <MotionProvider>
          <ScrollProgress />
          {children}
          <FloatingContact />
        </MotionProvider>
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <JsonLd id="ld-localbusiness" data={localBusinessSchema()} />
      </body>
    </html>
  )
}
