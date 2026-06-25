import Navbar from '@/components/Navbar.jsx'
import CinematicExperience from '@/components/CinematicExperience.jsx'
import ReleaseHero from '@/components/ReleaseHero.jsx'
import GalleryAccordion from '@/components/GalleryAccordion.jsx'
import BeforeAfter from '@/components/BeforeAfter.jsx'
import Testimonials from '@/components/Testimonials.jsx'
import ServicesSplit from '@/components/ServicesSplit.jsx'
import StatsSection from '@/components/StatsSection.jsx'
import PricingSection from '@/components/PricingSection.jsx'
import FeaturesGrid from '@/components/FeaturesGrid.jsx'
import ContactSection from '@/components/ContactSection.jsx'
import Footer from '@/components/Footer.jsx'
import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/seo'

// Title intentionally omitted so it uses the brand-led default
// ("RGL Decors — Interior Designers in Chennai"), distinct from the Chennai
// city page's "Interior Designers in Chennai | RGL Decors" (no title collision).
export const metadata: Metadata = buildMetadata({
  description:
    'RGL Decors — trusted interior designers in Chennai for modular kitchens, wardrobes and full-home turnkey interiors. Free 3D walkthroughs, 10-year warranty.',
  path: '/',
})

/**
 * Home — the pinned cinematic walkthrough followed by the content sections.
 * A Server Component: the section markup is server-rendered for SEO; the
 * interactive bits hydrate as Client Components and the WebGL engine loads
 * client-side from inside CinematicExperience.
 */
export default function HomePage() {
  return (
    <>
      {/* <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a> */}

      <Navbar />
      <CinematicExperience />

      <main id="story">
        <ReleaseHero />
        <GalleryAccordion />
        <BeforeAfter />
        <Testimonials />
        <ServicesSplit />
        <StatsSection />
        <PricingSection />
        <FeaturesGrid />
        <ContactSection />
      </main>

      <Footer />

      <JsonLd id="ld-breadcrumb-home" data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
    </>
  )
}
