import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-06-23'

export const metadata: Metadata = buildMetadata({
  title: 'Cancellation & Refund Policy',
  description:
    'How cancellations and refunds work for RGL Decors interior projects in Chennai — the free stage, what happens after you book, and how refunds are processed.',
  path: routes.refund,
})

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Cancellation & Refund Policy"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Cancellation & Refund', path: routes.refund },
      ]}
      summary={
        <>
          <p>• The <strong>design and quote stage is free</strong> — there&apos;s nothing to pay and you can walk away at any time, no charge.</p>
          <p>• Once you book and production begins, interiors are <strong>made to order for your home</strong>, so what can be refunded depends on how far the work has progressed.</p>
          <p>• The exact advance, cancellation windows and refund amounts are set out in your written quotation — and are marked below for RGL to finalise.</p>
        </>
      }
    >
      <p>
        This policy explains how cancellations and refunds work for interior projects with{' '}
        {business.legalName} (&ldquo;RGL Decors&rdquo;). Because our interiors are manufactured to your
        specific design and measurements, refund eligibility depends on the stage your project has
        reached. The specific commercial terms for your project are those stated in your written
        quotation or work order.
      </p>

      <LegalSection id="free-stage" heading="1. The free design and quote stage">
        <p>
          Requesting a quote, consultation or 3D walkthrough is <strong>completely free and carries no
          obligation</strong>. Up to the point you accept a quotation and pay a booking advance, there
          is nothing to pay and nothing to cancel — you can simply decide not to proceed.
        </p>
      </LegalSection>

      <LegalSection id="after-booking" heading="2. Cancelling after you've booked">
        <p>
          A project is booked once you accept a written quotation and pay the booking advance. If you
          need to cancel after that, the amount that can be refunded depends on how much work has
          already been done — design finalisation, material procurement and factory production each
          commit costs on our side.
        </p>
        <p>The cancellation terms that apply are:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            Booking advance:{' '}
            <Placeholder>RGL to confirm advance % and whether it is refundable / partly refundable.</Placeholder>
          </li>
          <li>
            Cancellation before production begins:{' '}
            <Placeholder>RGL to confirm the window and refund amount (e.g. refund minus design/processing charge).</Placeholder>
          </li>
          <li>
            Cancellation after production has begun:{' '}
            <Placeholder>RGL to confirm — typically limited, as goods are made to order.</Placeholder>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="non-refundable" heading="3. What is generally non-refundable">
        <p>
          Because each project is custom-made for your home, the following are generally
          non-refundable once incurred:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>made-to-order units and materials already cut, manufactured or installed;</li>
          <li>third-party items already purchased for your project (such as appliances and fittings); and</li>
          <li>
            any design or processing charge stated in your quotation —{' '}
            <Placeholder>RGL to confirm the amount of any non-refundable design/processing fee.</Placeholder>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="changes" heading="4. Changes to an order">
        <p>
          You can request changes before you approve the final design. Once a design is approved and
          production has begun, changes may not be possible and may affect the price and timeline.
          We&apos;ll always tell you the impact before proceeding.
        </p>
      </LegalSection>

      <LegalSection id="how-refunds-work" heading="5. How refunds are processed">
        <p>
          Approved refunds are made to your original payment method. Refunds are processed within{' '}
          <Placeholder>RGL to confirm refund processing time (e.g. 7–10 working days)</Placeholder>{' '}
          of the cancellation being agreed. Any bank or finance-partner charges may apply.
        </p>
      </LegalSection>

      <LegalSection id="how-to-request" heading="6. How to request a cancellation or refund">
        <p>
          To cancel a project or request a refund, contact us at{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          or{' '}
          <a href={business.nap.tel} className="font-medium text-accent hover:underline">
            {business.nap.phoneDisplay}
          </a>
          , or through our{' '}
          <Link href={routes.contact} className="font-medium text-accent hover:underline">contact page</Link>.
          Please include your name and project details so we can locate your booking.
        </p>
      </LegalSection>

      <LegalSection id="statutory" heading="7. Your statutory rights">
        <p>
          Nothing in this policy limits any rights you have under applicable consumer protection law.
          This policy works alongside our{' '}
          <Link href={routes.terms} className="font-medium text-accent hover:underline">Terms &amp; Conditions</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
