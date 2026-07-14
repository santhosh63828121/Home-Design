import type { Metadata } from 'next'
import { Phone, MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import PageStub from '@/components/page/PageStub'
import SectionReveal from '@/components/SectionReveal'
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

/**
 * CONTACT — a consultation desk, not a contact form.
 * ============================================================================
 * The old page opened with six shadowed boxes. This one opens with a sentence
 * you can hold us to (the one-working-day reply), then three ways to reach a
 * human, set as a ruled index. Below: the actual people — named, with their own
 * lines and inboxes — because "our team will get back to you" is what a company
 * says when it does not want you to know who is answering.
 *
 * The map is below the fold and already `loading="lazy"`; it stays that way.
 *
 * UNTOUCHED: the ContactPage JSON-LD, and `<ContactSection />` — whose form
 * posts to the Zod-validated `submitContact` Server Action with its field names,
 * honeypot and `useActionState` wiring exactly as they were.
 */
export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: 'Call',
      value: business.nap.phoneDisplay,
      href: business.nap.tel,
      hint: 'Mon–Sat, 9 AM – 7 PM',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with our team',
      href: whatsappHref,
      hint: 'Usually the fastest way to reach us',
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
      title="Start Your Design Journey"
      kicker="RGL Décors · Contact"
      intro="Tell us about the space and we will come back with an immersive 3D design and an itemised quote — no obligation, no pressure to decide on the call. Prefer to talk first? Call or WhatsApp us, or write straight to the desk you need."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Contact', path: routes.contact },
      ]}
    >
      <div className="space-y-24 lg:space-y-32">
        {/* The promise, and the three ways to hold us to it. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.1}>
          <div className="grid gap-10 border-t border-divider pt-12 lg:grid-cols-[auto_1fr] lg:gap-24">
            <div>
              <p className="eyebrow">Reach us</p>
              <span aria-hidden="true" className="rule-gold mt-6" />
              <h2 className="mt-8 max-w-[12ch] font-serif text-headline font-light text-ink">
                One working <span className="italic text-accent">day</span>
              </h2>
            </div>
            <p className="max-w-prose2 text-pretty leading-relaxed text-ink/70 lg:pt-14">
              {RESPONSE_PROMISE} Need an answer sooner than that — a measurement, a material, a
              price you are trying to sanity-check? Call or WhatsApp during business hours and you
              will get one straight away.
            </p>
          </div>

          <ul className="mt-14 border-t border-divider">
            {channels.map((c) => {
              const Icon = c.icon
              const external = c.href.startsWith('http')
              return (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group relative flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-divider py-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100"
                    />

                    <span className="flex min-w-0 items-center gap-6 transition-transform duration-700 ease-lux group-hover:translate-x-1.5">
                      <Icon size={19} strokeWidth={1.25} className="shrink-0 text-accent" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block font-caps text-[10px] uppercase tracking-wide2 text-muted">
                          {c.label}
                        </span>
                        <span className="mt-1 block truncate font-serif text-title font-light text-ink">
                          {c.value}
                        </span>
                      </span>
                    </span>

                    <span className="flex items-center gap-4 text-sm text-muted">
                      {c.hint}
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.25}
                        aria-hidden="true"
                        className="shrink-0 text-accent transition-transform duration-700 ease-lux group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </SectionReveal>

        {/* The people, not "the team". Named desks and direct lines. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.1}>
          <div className="border-t border-divider pt-12">
            <p className="eyebrow">Speak to a person</p>
            <span aria-hidden="true" className="rule-gold mt-6" />
            <h2 className="mt-8 max-w-[14ch] font-serif text-headline font-light text-ink">
              The desk you <span className="italic text-accent">need</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <h3 className="font-caps text-[10px] uppercase tracking-wide2 text-muted">By email</h3>
              <ul className="mt-6 border-t border-divider">
                {business.contacts.departments.map((d) => (
                  <li
                    key={d.email}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-divider py-4"
                  >
                    <span className="text-sm text-ink">
                      {d.name}
                      <span className="text-muted"> · {d.role}</span>
                    </span>
                    <a
                      href={`mailto:${d.email}`}
                      className="lux-underline text-sm text-accent"
                    >
                      {d.email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                General enquiries:{' '}
                <a href={`mailto:${business.nap.email}`} className="lux-underline text-accent">
                  {business.nap.email}
                </a>{' '}
                ·{' '}
                <a
                  href={`mailto:${business.nap.emailSecondary}`}
                  className="lux-underline text-accent"
                >
                  {business.nap.emailSecondary}
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-caps text-[10px] uppercase tracking-wide2 text-muted">
                Direct lines
              </h3>
              <ul className="mt-6 border-t border-divider">
                {business.contacts.phones.map((p) => (
                  <li
                    key={p.e164}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-divider py-4"
                  >
                    <span className="text-sm text-ink">{p.label}</span>
                    <a href={`tel:${p.e164}`} className="lux-underline text-sm text-accent">
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-divider pt-6">
                <p className="font-caps text-[10px] uppercase tracking-wide2 text-muted">Hours</p>
                <p className="mt-2 text-sm text-ink">{business.nap.hoursLabel}</p>
                <p className="text-sm text-muted">Sunday closed</p>

                <p className="mt-6 font-caps text-[10px] uppercase tracking-wide2 text-muted">
                  Where we work
                </p>
                <p className="mt-2 max-w-prose2 text-sm leading-relaxed text-ink/70">
                  {business.nap.addressLocality}, {business.nap.addressRegion} — homes across Chennai
                  and {siteConfig.areaServed.length - 2}+ Tamil Nadu cities.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* The map. Below the fold, lazy, and given the full measure. */}
        <SectionReveal as="section" variant="fadeUp" amount={0.1}>
          <div className="border border-divider">
            <iframe
              title="RGL Decors location on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[24rem] w-full lg:min-h-[28rem]"
            />
          </div>
        </SectionReveal>

        {/* Working lead form → Zod Server Action → persist + email + WhatsApp. */}
        <SectionReveal variant="fadeUp" amount={0.05} className="bleed">
          <ContactSection />
        </SectionReveal>
      </div>

      <JsonLd id="ld-contact" data={contactSchema} />
    </PageStub>
  )
}
