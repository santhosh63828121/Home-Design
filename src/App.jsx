import Navbar from './components/Navbar.jsx'
import CinematicExperience from './components/CinematicExperience.jsx'
import ReleaseHero from './components/ReleaseHero.jsx'
import GalleryAccordion from './components/GalleryAccordion.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import Testimonials from './components/Testimonials.jsx'
import ServicesSplit from './components/ServicesSplit.jsx'
import StatsSection from './components/StatsSection.jsx'
import PricingSection from './components/PricingSection.jsx'
import FeaturesGrid from './components/FeaturesGrid.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

/**
 * RGL Decors — cinematic single-page experience.
 *
 * 1) CinematicExperience: a pinned, scroll-scrubbed architectural walkthrough
 *    (Exterior → Living → Kitchen → Bedroom → Bathroom).
 * 2) After the walkthrough unlocks, the page scrolls normally through the
 *    "Final Section": gallery, transformations, testimonials, services,
 *    pricing, features, contact and footer.
 */
export default function App() {
  return (
    <>
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

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
      <WhatsAppButton />
    </>
  )
}
