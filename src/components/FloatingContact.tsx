import Link from 'next/link'
import { Phone, MessageCircle, PencilRuler } from 'lucide-react'
import { business } from '@/data/business'
import { routes } from '@/lib/routes'

/**
 * Global floating action stack — Call · WhatsApp · Quote. Fixed bottom-right on
 * every page (rendered once in the root layout). Pure links: works without JS,
 * ships zero client bundle.
 *
 * WHY THREE CIRCLES AND NOT A PILL.
 * The "Get a Free Quote" pill was ~180px wide. The content shell is capped at
 * 78rem (1248px), so at a 1440px viewport the gutter beside it is only
 * (1440 − 1248) / 2 = 96px. A 180px pill therefore CANNOT sit in the gutter — it
 * was always going to overhang the text by ~84px, and it did, straight across the
 * before/after copy.
 *
 * Three 48px circles fit inside that 96px gutter with room to spare, at every
 * breakpoint from 1280 up. The label survives as the accessible name and the
 * native tooltip, so nothing is lost but the collision.
 *
 * Below lg the stack sits over content by design (the standard mobile pattern),
 * and is pulled in tighter so it never fouls a CTA.
 */
export default function FloatingContact() {
  const ring =
    'grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-card backdrop-blur-md transition-[transform,background-color,color,border-color] duration-500 ease-lux hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white'

  return (
    <div className="fixed bottom-s4 right-s3 z-[60] flex flex-col items-end gap-s2 lg:bottom-s8 lg:right-s6">
      <a href={business.nap.tel} aria-label={`Call ${business.nap.phoneDisplay}`} title="Call us" className={ring}>
        <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>

      <a
        href={business.nap.whatsappChat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="WhatsApp"
        className={ring}
      >
        <MessageCircle size={19} strokeWidth={1.5} aria-hidden="true" />
      </a>

      <Link
        href={routes.getQuote}
        aria-label="Get a free quote"
        title="Get a free quote"
        className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink shadow-gold transition-[transform,background-color] duration-500 ease-lux hover:-translate-y-0.5 hover:bg-gold-dark"
      >
        <PencilRuler size={18} strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </div>
  )
}
