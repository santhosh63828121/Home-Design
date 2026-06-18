import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import RoomSlides from './components/RoomSlides.jsx'
import ServicesSplit from './components/ServicesSplit.jsx'
import StatsSection from './components/StatsSection.jsx'
import GalleryAccordion from './components/GalleryAccordion.jsx'
import PricingSection from './components/PricingSection.jsx'
import FeaturesGrid from './components/FeaturesGrid.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

/**
 * RGL Decors — single-page luxury scroll experience.
 * Section order is fixed per spec (Navbar → Hero → … → Footer).
 */
export default function App() {
  return (
    <>
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />
      <main>
        <Hero />
        <RoomSlides />
        <ServicesSplit />
        <StatsSection />
        <GalleryAccordion />
        <PricingSection />
        <FeaturesGrid />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
