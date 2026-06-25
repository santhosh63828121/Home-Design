import type { Metadata } from 'next'
import { Phone, MessageCircle, Mail, Clock, MapPin, Timer } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import ContactSection from '@/components/ContactSection.jsx'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'
import { business, whatsappLink } from '@/data/business'

export const metadata: Metadata = buildMetadata({
  title: 'Contact RGL Decors — Free Interior Quote',
  description:
    'Contact RGL Decors in Chennai for a free interior design quote and HD 3D walkthrough. Call, WhatsApp or send an enquiry — we reply within one working day.',
  path: routes.contact,
})

const RESPONSE_PROMISE = 'We reply to every enquiry within one working day.'

// Google Maps embed (keyless `q=` form — no API key, no extra request cost).
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  'RGL Decors Chennai Tamil Nadu',
)}&output=embed`

const whatsappHref = whatsappLink(
  "Hi RGL Decors, I'd like a free 3D design and quote for my home.",
)

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: 'Call us',
      value: business.nap.phoneDisplay,
      href: business.nap.tel,
      hint: 'Mon–Sat, 9 AM – 7 PM',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with our team',
      href: whatsappHref,
      hint: 'Fastest way to reach us',
    },
    {
      icon: Mail,
      label: 'Email',
      value: business.nap.email,
      href: `mailto:${business.nap.email}`,
      hint: RESPONSE_PROMISE,
    },
  ]

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact RGL Decors',
    url: `${siteConfig.url}${routes.contact}`,
    description: 'Call, WhatsApp or email RGL Decors in Chennai for a free interior quote.',
    about: { '@id': `${siteConfig.url}/#organization` },
  }

  return (
    <PageStub
      title="Get Your Free Interior Quote"
      kicker="RGL Decors · Contact"
      intro="Tell us about your home and our team will get back to you with a free 3D design and a transparent quote. Prefer to talk? Call or WhatsApp us directly."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Contact', path: routes.contact },
      ]}
    >
      <div className="space-y-12">
        {/* Response-time promise */}
        <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/[0.06] px-5 py-4">
          <Timer size={20} className="shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-ink/80">
            <span className="font-semibold text-ink">{RESPONSE_PROMISE}</span> Need an answer sooner?
            WhatsApp or call us during business hours and we&apos;ll respond right away.
          </p>
        </div>

        {/* Direct channels */}
        <section className="grid gap-4 sm:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon
            const external = c.href.startsWith('http')
            return (
              <a
                key={c.label}
                href={c.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group rounded-2xl border border-divider bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="mt-4 font-caps text-[11px] uppercase tracking-wide2 text-muted">{c.label}</p>
                <p className="mt-1 font-serif text-lg text-ink group-hover:text-accent">{c.value}</p>
                <p className="mt-1 text-sm text-muted">{c.hint}</p>
              </a>
            )
          })}
        </section>

        {/* Hours + location + map */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6 rounded-2xl border border-divider bg-white p-6 shadow-card">
            <div className="flex items-start gap-3">
              <Clock size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h2 className="font-serif text-lg">Business hours</h2>
                <p className="mt-1 text-sm text-ink/80">{business.nap.hoursLabel}</p>
                <p className="text-sm text-muted">Sunday: closed</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-divider pt-6">
              <MapPin size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h2 className="font-serif text-lg">Service area</h2>
                <p className="mt-1 text-sm text-ink/80">
                  {business.nap.addressLocality}, {business.nap.addressRegion} — serving homeowners
                  across Chennai and {siteConfig.areaServed.length - 2}+ Tamil Nadu cities.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-divider shadow-card">
            <iframe
              title="RGL Decors location on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full"
            />
          </div>
        </section>

        {/* Working lead form → Zod Server Action → persist + email + WhatsApp (Phase 0) */}
        <section className="-mx-5 sm:-mx-8 lg:-mx-12">
          <ContactSection />
        </section>
      </div>

      <JsonLd id="ld-contact" data={contactSchema} />
    </PageStub>
  )
}
