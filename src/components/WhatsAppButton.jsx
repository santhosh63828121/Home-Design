import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../data/content.js'

/**
 * Fixed WhatsApp float button with a pulsing ring. Always visible, accessible,
 * and positioned so it never obstructs primary content.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RGL Decors on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
    >
      {/* Pulsing ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseRing"
        aria-hidden="true"
      />
      <MessageCircle size={28} className="relative" aria-hidden="true" />
    </a>
  )
}
