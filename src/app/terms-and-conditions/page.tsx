import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'The terms governing RGL Decors interior design and execution — quotations, fees and payment, timelines, variations, IP, liability and dispute resolution.',
  path: routes.terms,
})

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Terms & Conditions', path: routes.terms },
      ]}
      summary={
        <>
          <p>• Quotations are valid for <strong>10 days</strong>. Work begins on a signed quotation plus the advance payment.</p>
          <p>• Payment is <strong>milestone-based</strong> — nothing is due for a stage that has not happened.</p>
          <p>• Timelines are <strong>indicative</strong>; delays you cause (approvals, access) extend them without penalty to us.</p>
          <p>• Designs and 3D renders remain <strong>our property until you have paid in full</strong>.</p>
          <p>• Disputes are governed by Indian law, before the courts at <strong>Chennai</strong>, with mediation attempted first.</p>
        </>
      }
    >
      <p>
        These Terms govern the interior design and execution services provided by{' '}
        {business.legalName} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a firm
        registered in Tamil Nadu, and your use of rgldecors.com.
      </p>
      <p>
        By accessing this website, booking a consultation, or signing a quotation, you agree to these
        Terms. Each project is additionally governed by a signed Quotation / Work Order, which forms
        part of this contract and prevails where it differs from this page.
      </p>
      <p className="text-sm">
        <Placeholder>
          RGL to confirm the full registered address (No. __, Chennai – {business.nap.postalCode}) and
          the entity type (proprietorship / partnership), and to have these Terms vetted by counsel
          before publishing.
        </Placeholder>
      </p>

      <LegalSection id="scope" heading="1. Scope of services">
        <p>
          We provide interior design consultancy, space planning, 3D visualisation, turnkey
          execution, custom furniture, modular kitchens, wardrobes, and allied civil, electrical and
          finishing works. Each project is governed by a signed Quotation / Work Order.
        </p>
      </LegalSection>

      <LegalSection id="quotations" heading="2. Quotations and acceptance">
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Quotations are valid for <strong>10 days</strong> from issue.</li>
          <li>Acceptance requires a <strong>signed quotation and the advance payment</strong>.</li>
          <li>
            All dimensions are <strong>site-verified</strong>. Drawings remain conceptual until
            approved by you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="fees" heading="3. Fees and payment">
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Design fee:</strong> 5–10% of the estimated project value — payable 50% on
            booking and 50% on design freeze.
          </li>
          <li>
            <strong>Execution:</strong> 40% advance, 40% on material dispatch, 15% on installation,
            and 5% on handover.
          </li>
          <li>
            <strong>Late payment:</strong> interest at 18% per annum, compounded monthly, as
            permitted under the Indian Contract Act.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="client" heading="4. Client obligations">
        <p>
          You will provide timely approvals, site access, electricity, water, storage, and any
          statutory permissions required from your society or residents&apos; welfare association.
          Delays caused by the client extend the timeline without penalty to the Company.
        </p>
      </LegalSection>

      <LegalSection id="timelines" heading="5. Timelines">
        <p>
          Timelines are <strong>indicative</strong>. Force majeure, material shortages, strikes or
          client-requested changes extend delivery. We are not liable for indirect or consequential
          losses.
        </p>
      </LegalSection>

      <LegalSection id="variations" heading="6. Variations">
        <p>
          Any change after design freeze requires a written <strong>Change Order</strong> and a
          revised cost and timeline, agreed before the change is executed.
        </p>
      </LegalSection>

      <LegalSection id="materials" heading="7. Materials and substitutions">
        <p>
          We source from approved vendors. Where an original specification is unavailable, an{' '}
          <strong>equivalent substitution</strong> is permitted, with prior intimation to you.
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="8. Intellectual property">
        <p>
          All designs, drawings and 3D renders remain the property of {business.legalName}{' '}
          <strong>until full payment</strong> is received. You then receive a limited licence for
          single-site use. Reproduction without our written consent is prohibited.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="9. Site safety and liability">
        <p>
          We follow the Tamil Nadu Shops and Establishments Act and applicable labour laws. You are
          responsible for ensuring safe site access. Our liability is{' '}
          <strong>capped at the amount paid for the specific service</strong> giving rise to the
          claim.
        </p>
      </LegalSection>

      <LegalSection id="termination" heading="10. Termination">
        <p>
          Either party may terminate on <strong>30 days&apos; written notice</strong> for material
          breach. On termination, you pay for work completed, materials already procured, and a 15%
          overhead.
        </p>
      </LegalSection>

      <LegalSection id="disputes" heading="11. Dispute resolution">
        <p>
          These Terms are governed by the laws of India. Jurisdiction vests exclusively in the courts
          at <strong>Chennai, Tamil Nadu</strong>. The parties shall attempt mediation before
          commencing litigation.
        </p>
      </LegalSection>

      <LegalSection id="related" heading="12. Related policies">
        <p>
          These Terms should be read together with our{' '}
          <Link href={routes.privacy} className="font-medium text-accent hover:underline">privacy policy</Link>,{' '}
          <Link href={routes.refund} className="font-medium text-accent hover:underline">cancellation &amp; refund policy</Link>,{' '}
          <Link href={routes.warranty} className="font-medium text-accent hover:underline">warranty</Link>,{' '}
          <Link href={routes.gst} className="font-medium text-accent hover:underline">GST policy</Link> and{' '}
          <Link href={routes.afterSales} className="font-medium text-accent hover:underline">after-sales care</Link>.
        </p>
        <p>
          Contact:{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          ·{' '}
          <a href={business.nap.tel} className="font-medium text-accent hover:underline">
            {business.nap.phoneDisplay}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
