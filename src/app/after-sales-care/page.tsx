import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'After-Sales Care',
  description:
    'RGL Decors after-sales support — complimentary one-year post-service care, free service visits, annual maintenance contracts and a dedicated service desk.',
  path: routes.afterSales,
})

export default function AfterSalesPage() {
  return (
    <LegalLayout
      title="After-Sales Care"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'After-Sales Care', path: routes.afterSales },
      ]}
      summary={
        <>
          <p>• <strong>Complimentary one-year post-service care</strong> on every RGL project.</p>
          <p>• <strong>Two free service visits</strong> within the first 90 days after handover, for adjustments.</p>
          <p>• <strong>Annual maintenance contracts (AMC)</strong> available for kitchens and wardrobes.</p>
          <p>• A <strong>dedicated service desk</strong>, Mon–Sat, 10am–6pm IST.</p>
        </>
      }
    >
      <p>
        Most studios stop caring the day they hand over the keys. We think the opposite: a home is
        only proven good once it has been lived in for a year. This page sets out the support{' '}
        {business.legalName} provides after you move in.
      </p>

      <LegalSection id="post-service" heading="1. One-year post-service care">
        <p>
          Every RGL project includes <strong>complimentary one-year post-service care</strong>.
          Because premium living deserves premium aftercare — your interiors should remain flawless
          long after handover, not just on handover day.
        </p>
        <p>
          Within the <strong>first 90 days</strong>, you get <strong>two free service visits</strong>{' '}
          for adjustments — the small settling issues that show up once furniture is loaded and doors
          have been opened a few hundred times.
        </p>
      </LegalSection>

      <LegalSection id="desk" heading="2. Dedicated service desk">
        <p>
          Reach our service desk at{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          or on WhatsApp / phone at{' '}
          <a href={business.nap.tel} className="font-medium text-accent hover:underline">
            {business.nap.phoneDisplay}
          </a>
          , Monday to Saturday, 10am–6pm IST.
        </p>
        <p>
          If the issue falls under warranty we handle it under those terms — see the{' '}
          <Link href={routes.warranty} className="font-medium text-accent hover:underline">
            warranty page
          </Link>
          . If it is a product defect, we coordinate the manufacturer&apos;s claim on your behalf
          rather than leaving you to chase a brand call-centre.
        </p>
      </LegalSection>

      <LegalSection id="amc" heading="3. Annual maintenance contracts (AMC)">
        <p>
          After your first year, an AMC keeps things running properly. It is preventative care rather
          than a fix-it-when-it-breaks arrangement: we catch loose screws, sagging shutters and worn
          sealant <em>before</em> they turn into a cracked hinge plate or a rotted sink base.
        </p>
        <p>A paid AMC typically covers:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Hinge alignment and re-levelling of sagging shutters</li>
          <li>Channel and sliding-track cleaning and lubrication</li>
          <li>Tightening of hinges, pull-outs and hydraulic lift-ups</li>
          <li>Sealant and moisture checks around sinks and countertop joints</li>
          <li>Surface touch-ups</li>
        </ul>
        <p>
          For most Chennai households a service <strong>every six months</strong> is the right
          rhythm — more often if you are on the ECR/OMR coastal line, where salt air accelerates
          corrosion.
        </p>
      </LegalSection>

      <LegalSection id="other" heading="4. Other after-sales services">
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Warranty service and fast support</li>
          <li>Furniture maintenance and repairs</li>
          <li>Deep cleaning and move-in ready refresh</li>
          <li>Renovation and upgrades to existing RGL interiors</li>
        </ul>
      </LegalSection>

      <LegalSection id="scope" heading="5. What an AMC does not cover">
        <p>So there are no surprises, an AMC generally excludes:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Major physical damage — broken laminate or cracked stone from impact</li>
          <li>Water damage from a burst pipe or leaking RO system</li>
          <li>
            The cost of a <strong>replacement part</strong> that is out of manufacturer warranty (the
            AMC covers the labour to fit it; the component is billed)
          </li>
          <li>Termite or borer damage, which requires specialist pest control</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  )
}
