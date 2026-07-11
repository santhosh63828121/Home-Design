import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Warranty Details',
  description:
    'RGL Decors warranty coverage — what is covered on modular furniture, hardware, carpentry and appliances, what is excluded, and how to raise a request.',
  path: routes.warranty,
})

/**
 * THE SINGLE SOURCE OF TRUTH FOR WARRANTY TERMS.
 *
 * Every other page now defers here rather than asserting a period of its own —
 * the previous "10-year warranty" headline contradicted these terms, so it was
 * retired sitewide. If the offer changes, change it HERE and nowhere else.
 */
export default function WarrantyPage() {
  return (
    <LegalLayout
      title="Warranty Details"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Warranty', path: routes.warranty },
      ]}
      summary={
        <>
          <p>• <strong>Modular furniture (kitchens, wardrobes):</strong> 5-year warranty on hardware; 1 year on shutters and carcass against manufacturing defects.</p>
          <p>• <strong>On-site carpentry:</strong> 1-year warranty.</p>
          <p>• <strong>Electrical, lighting and appliances:</strong> covered by the original manufacturer&apos;s (OEM) warranty.</p>
          <p>• <strong>Not covered:</strong> colour fading, wear, moisture damage, misuse or unauthorised modification.</p>
        </>
      }
    >
      <p>
        This page sets out the warranty {business.legalName} provides on interior work. Your signed
        quotation and work order remain the governing documents; where this page and your agreement
        differ, your agreement prevails.
      </p>

      <LegalSection id="coverage" heading="1. What is covered">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Modular furniture (modular kitchens, wardrobes):</strong> a{' '}
            <strong>5-year warranty on hardware</strong> (Hettich / Häfele-equivalent hinges,
            channels and mechanisms), and a <strong>1-year warranty on shutters and carcass</strong>{' '}
            against manufacturing defects.
          </li>
          <li>
            <strong>On-site carpentry:</strong> <strong>1-year warranty</strong> against defects in
            workmanship.
          </li>
          <li>
            <strong>Electrical fittings, lighting and appliances:</strong> covered under the original
            equipment manufacturer&apos;s (OEM) warranty. We will help you raise the claim with the
            brand.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="not-covered" heading="2. What is not covered">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Upholstery, fabrics and natural wood:</strong> no warranty for colour fading,
            wear or moisture damage — these are natural, expected changes over time.
          </li>
          <li>Accidental damage, scratches, dents and normal wear and tear.</li>
          <li>Water damage from plumbing leaks, flooding, fire or natural disasters.</li>
          <li>Improper cleaning methods, or failure to follow the care instructions given at handover.</li>
          <li>Misuse, overloading, or unauthorised modification and repair by third parties.</li>
        </ul>
        <p>
          The warranty is <strong>void</strong> in cases of misuse, water damage, unauthorised
          modification, or failure to follow the care instructions provided.
        </p>
      </LegalSection>

      <LegalSection id="service" heading="3. Raising a warranty service request">
        <p>
          Contact us by email or phone and describe the issue — a photograph helps. We will assess
          whether it is an adjustment, a workmanship claim under our warranty, or a product defect to
          be escalated to the manufacturer, and we will coordinate the brand claim on your behalf.
        </p>
        <p>
          <strong>Service visit response:</strong> within <strong>7 working days</strong> in Chennai,
          and <strong>10–14 days</strong> elsewhere in Tamil Nadu.
        </p>
        <p>
          Email{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          or call{' '}
          <a href={business.nap.tel} className="font-medium text-accent hover:underline">
            {business.nap.phoneDisplay}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="care" heading="4. Post-service care">
        <p>
          Every RGL project includes <strong>complimentary one-year post-service care</strong> after
          handover. This is separate from the warranty above: it covers proactive support and minor
          adjustments in your first year of living in the home. See our{' '}
          <Link href={routes.afterSales} className="font-medium text-accent hover:underline">
            after-sales care
          </Link>{' '}
          page for what that includes, and for annual maintenance contracts thereafter.
        </p>
      </LegalSection>

      <LegalSection id="protect" heading="5. Protecting your warranty">
        <p>Simple habits keep your interiors — and your cover — in good standing:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Wipe water spills promptly, especially at countertop joints and under the sink.</li>
          <li>Let soft-close mechanisms close on their own; don&apos;t force shutters shut.</li>
          <li>Don&apos;t overload drawers and shelves beyond their rated capacity.</li>
          <li>Repair plumbing leaks immediately and keep interiors well ventilated.</li>
          <li>Use the recommended cleaning products; avoid harsh chemical sprays on hardware.</li>
          <li>Avoid unauthorised repairs or structural modifications.</li>
        </ul>
      </LegalSection>

      <LegalSection id="terms" heading="6. Terms">
        <p className="text-sm">
          <Placeholder>
            RGL to have this page reviewed by counsel alongside the signed quotation template, and to
            confirm whether the warranty is transferable on sale of the property.
          </Placeholder>
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
