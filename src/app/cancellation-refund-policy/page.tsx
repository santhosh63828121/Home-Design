import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Cancellation & Refund Policy',
  description:
    'How cancellations and refunds work for RGL Decors interior projects — the free stage, design-fee terms, and refund windows once procurement has begun.',
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
          <p>• <strong>Consultation and the initial design concept are free.</strong> Walk away at that stage and you owe nothing.</p>
          <p>• Once the <strong>design concept is delivered</strong>, the design fee is non-refundable.</p>
          <p>• Cancel an execution order <strong>within 48 hours and before procurement</strong> → 90% refund.</p>
          <p>• Because furniture is <strong>made to order</strong>, refunds are limited once material is cut.</p>
        </>
      }
    >
      <p>
        Bespoke interior work is governed by the Consumer Protection Act 2019. Because designs and
        furniture are <strong>made to order</strong> — cut to your dimensions and unusable for anyone
        else — refunds are necessarily limited once production begins. This page explains exactly
        where those lines fall, so you can decide with full information.
      </p>

      <LegalSection id="consultation" heading="1. Consultation">
        <p>
          The initial consultation, site discussion and design concept are{' '}
          <strong>free and carry no obligation</strong>. If you decide not to proceed at this stage,
          you owe us nothing and there is nothing to refund.
        </p>
      </LegalSection>

      <LegalSection id="design" heading="2. Design services">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Once the <strong>concept is delivered</strong>, the design fee is{' '}
            <strong>non-refundable</strong> — the work has been done and handed to you.
          </li>
          <li>
            <strong>Cancellation before design freeze:</strong> refund of the advance, less{' '}
            <strong>25% administrative charges</strong>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="execution" heading="3. Execution orders">
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            <strong>Within 48 hours of payment and before material procurement:</strong> 90% refund.
          </li>
          <li>
            <strong>After procurement or cutting has begun:</strong> no refund. The procured
            materials can be handed over to you at cost.
          </li>
          <li>
            <strong>After installation begins:</strong> the order cannot be cancelled.
          </li>
        </ol>
        <p>
          The reason is simple and worth stating plainly: once a board has been cut to your wall, it
          has no resale value to anyone else.
        </p>
      </LegalSection>

      <LegalSection id="how" heading="4. How to cancel">
        <p>
          Write to{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          from the email address on your quotation, or call{' '}
          <a href={business.nap.tel} className="font-medium text-accent hover:underline">
            {business.nap.phoneDisplay}
          </a>
          . The cancellation takes effect from the time we receive your written notice — which is why
          the 48-hour window is measured in writing, not by phone.
        </p>
        <p className="text-sm">
          <Placeholder>
            RGL to confirm the refund processing time (e.g. within N working days to the original
            payment method) and add it here.
          </Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="related" heading="5. Related">
        <p>
          See also our{' '}
          <Link href={routes.terms} className="font-medium text-accent hover:underline">terms &amp; conditions</Link>{' '}
          (which govern termination and variations) and our{' '}
          <Link href={routes.warranty} className="font-medium text-accent hover:underline">warranty</Link>{' '}
          (which covers defects rather than cancellation).
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
