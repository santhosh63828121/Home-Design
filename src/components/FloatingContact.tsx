import Link from 'next/link'
import { Phone, MessageCircle, PencilRuler } from 'lucide-react'
import { business } from '@/data/business'
import { routes } from '@/lib/routes'

/**
 * Global floating action stack — Call · WhatsApp · Quote — fixed bottom-right
 * on every page (rendered once in the root layout). Pure links, so it works
 * without JS and ships zero client bundle. The Quote action is emphasised.
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={business.nap.tel}
        aria-label={`Call ${business.nap.phoneDisplay}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-card transition-transform hover:scale-105"
      >
        <Phone size={20} aria-hidden="true" />
      </a>

      <a
        href={business.nap.whatsappChat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105"
      >
        <MessageCircle size={22} aria-hidden="true" />
      </a>

      <Link
        href={routes.getQuote}
        className="btn-gold flex items-center gap-2 rounded-full px-5 py-3 font-caps text-sm font-semibold tracking-caps shadow-feature transition-transform hover:scale-105"
      >
        <PencilRuler size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Get Free Quote</span>
        <span className="sm:hidden">Quote</span>
      </Link>
    </div>
  )
}
