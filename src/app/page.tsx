import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar.jsx'
import ImageSequenceHero from '@/components/hero/ImageSequenceHero'
import ReleaseHero from '@/components/ReleaseHero.jsx'
import Footer from '@/components/Footer.jsx'
import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/seo'

/**
 * PERF: below-the-fold sections are code-split with next/dynamic. They still
 * server-render (ssr:true is the default — identical HTML, identical SEO, zero
 * visual change), but their CLIENT JS is split into separate chunks that load
 * and hydrate AFTER the above-the-fold tree. That shrinks the initial hydration
 * payload, so the LCP text (ReleaseHero's <h1>, revealed by Framer Motion on
 * hydration) becomes visible sooner. The reveal animations are untouched.
 *
 * Eager (kept in the main chunk): Navbar, CinematicExperience, ReleaseHero,
 * GalleryAccordion — i.e. everything at/above the first viewport.
 */
const BeforeAfter = dynamic(() => import('@/components/BeforeAfter.jsx'))
const Testimonials = dynamic(() => import('@/components/Testimonials.jsx'))
const ServicesSplit = dynamic(() => import('@/components/ServicesSplit.jsx'))
const StatsSection = dynamic(() => import('@/components/StatsSection.jsx'))
const PricingSection = dynamic(() => import('@/components/PricingSection.jsx'))
const FeaturesGrid = dynamic(() => import('@/components/FeaturesGrid.jsx'))
const ContactSection = dynamic(() => import('@/components/ContactSection.jsx'))

// Title intentionally omitted so it uses the brand-led default
// ("RGL Decors — Interior Designers in Chennai"), distinct from the Chennai
// city page's "Interior Designers in Chennai | RGL Decors" (no title collision).
export const metadata: Metadata = buildMetadata({
  description:
    'More than premium spaces — design to define you. RGL Decors brings design excellence, craftsmanship and end-to-end turnkey execution to homes across Chennai.',
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
      <Navbar />
      {/* The homepage hero is now the CLIENT'S OWN RENDERED WALKTHROUGH, extracted
          to frames and scrubbed on scroll — genuinely photoreal, which the
          procedural WebGL house could never be. The WebGL "3D Model" system is
          untouched and still lives at /3d-walkthrough (linked from this hero). */}
      <ImageSequenceHero />

      {/*
        Section order is a narrative, not a list:
          the walkthrough → statement → what we do → proof in numbers → the
          transformation → the clients → what it costs → why us → talk to us.
      */}
      <main id="story">
        <ReleaseHero />
        <ServicesSplit />
        <StatsSection />
        <BeforeAfter />
        <Testimonials />
        <PricingSection />
        <FeaturesGrid />
        <ContactSection />
      </main>

      <Footer />

      <JsonLd id="ld-breadcrumb-home" data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
    </>
  )
}
