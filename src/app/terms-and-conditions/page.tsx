import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-06-23'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'The terms that govern RGL Decors interior design services and your use of this website — summarised in plain language and then set out in full detail below.',
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
          <p>• These terms cover our interior design services and your use of this website.</p>
          <p>• Your <strong>free 3D design and quote come with no obligation</strong>. Prices shown online are indicative until we measure your home and confirm an itemised quote.</p>
          <p>• We offer a <strong>10-year warranty on core materials</strong> (physical damage and normal wear excluded) and aim for move-in within 45 days, subject to conditions.</p>
          <p>• Designs, renders and website content are our property; please don&apos;t copy them.</p>
        </>
      }
    >
      <p>
        These Terms &amp; Conditions govern the interior design, supply and installation services
        provided by {business.legalName} (&ldquo;RGL Decors&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        and your use of this website. By using this site or engaging our services, you agree to these
        terms. A signed project quotation or work order, where one exists, takes precedence over these
        general terms for that project.
      </p>

      <LegalSection id="services" heading="1. Our services">
        <p>
          We design, manufacture, supply and install home interiors — including modular kitchens,
          wardrobes, units and full-home turnkey interiors — for homes in Chennai and across our{' '}
          <Link href={routes.locations} className="font-medium text-accent hover:underline">service areas</Link>.
          The exact scope of any project is defined in the quotation we provide for that project.
        </p>
      </LegalSection>

      <LegalSection id="quotes" heading="2. Free design, quotes and pricing">
        <p>
          Your HD 3D walkthrough and itemised quote are provided free of charge and with no obligation
          to proceed. Prices, ranges and calculator results shown on this website (including on our{' '}
          <Link href={routes.pricing} className="font-medium text-accent hover:underline">pricing pages</Link>)
          are <strong>indicative</strong>. A firm price is only the one set out in a written quotation
          prepared after a site visit, and it depends on your space, layout, materials and finishes.
        </p>
        <p>
          A written quotation is valid for{' '}
          <Placeholder>RGL to confirm quote validity period (e.g. 15 days)</Placeholder>, after which
          prices may be re-confirmed.
        </p>
      </LegalSection>

      <LegalSection id="orders-payment" heading="3. Orders and payment">
        <p>
          A project is confirmed when you accept a written quotation and pay the booking advance set
          out in it. Payment milestones (booking advance, production stage and pre-delivery balance)
          are stated in your quotation.
        </p>
        <p>
          The advance, payment schedule and any taxes (such as GST) applicable to your project are{' '}
          <Placeholder>RGL to confirm — advance %, payment-milestone schedule and applicable taxes</Placeholder>.
          Cancellations and refunds are governed by our{' '}
          <Link href={routes.refund} className="font-medium text-accent hover:underline">Cancellation &amp; Refund Policy</Link>.
        </p>
        <p>
          EMI options are available up to 24 months, with no-cost EMI on select plans, subject to the
          terms of the relevant finance partner.
        </p>
      </LegalSection>

      <LegalSection id="timelines" heading="4. Timelines and delivery">
        <p>
          We aim to deliver and install most projects within our 45-day move-in guarantee. This
          timeline runs from a defined project start point and assumes timely approvals, payments,
          site access and site readiness on your part. Delays caused by factors outside our control —
          including incomplete civil work, restricted site access, or changes you request — may extend
          the timeline. Specific timeline commitments for your project are recorded in your quotation
          or work order.
        </p>
      </LegalSection>

      <LegalSection id="warranty" heading="5. Warranty">
        <p>
          We provide a <strong>10-year warranty on core materials</strong> against manufacturing
          defects, on the terms set out in your project documentation. The warranty does{' '}
          <strong>not</strong> cover physical or accidental damage, misuse, water damage from external
          sources, unauthorised modifications, or normal wear and tear. Appliances and third-party
          products carry their respective manufacturers&apos; warranties.{' '}
          <Placeholder>RGL to confirm full warranty terms, claim process and any exclusions.</Placeholder>
        </p>
        <p>
          Every product passes our 100+ quality checks before delivery. If something isn&apos;t right,
          contact us and we&apos;ll make it right under the applicable warranty terms.
        </p>
      </LegalSection>

      <LegalSection id="customer" heading="6. Your responsibilities">
        <p>You agree to:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>provide accurate information about your home and requirements;</li>
          <li>obtain any society, building or statutory approvals required for the work;</li>
          <li>provide safe, timely site access for measurement and installation; and</li>
          <li>review and approve designs before production begins.</li>
        </ul>
        <p>
          Once you approve a design and production begins, changes may affect the price and timeline.
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="7. Intellectual property">
        <p>
          All designs, 3D renders, walkthroughs, drawings, images and content we create or publish —
          including everything on this website — remain the intellectual property of RGL Decors. You
          may not copy, reproduce, resell or use them outside your own project without our written
          permission.
        </p>
      </LegalSection>

      <LegalSection id="website-use" heading="8. Use of this website">
        <p>
          You may use this website for lawful, personal purposes only. You agree not to scrape,
          republish or misuse its content, attempt to disrupt the site, or submit false or abusive
          enquiries. Your use of the site is also subject to our{' '}
          <Link href={routes.privacy} className="font-medium text-accent hover:underline">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="9. Limitation of liability">
        <p>
          We stand behind our work. To the extent permitted by law, our liability in connection with a
          project is limited to performing our obligations under the applicable warranty and project
          documentation, and we are not liable for indirect or consequential loss.{' '}
          <Placeholder>RGL to finalise the precise liability terms with legal counsel.</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="governing-law" heading="10. Governing law">
        <p>
          These terms are governed by the laws of India, and the courts at{' '}
          {business.nap.addressLocality}, {business.nap.addressRegion} have jurisdiction over any
          dispute.{' '}
          <Placeholder>RGL to confirm registered business entity, address and GST details.</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="11. Changes to these terms">
        <p>
          We may update these terms from time to time. The &ldquo;last updated&rdquo; date at the top
          shows the latest revision. Continued use of the site or our services means you accept the
          current terms.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
