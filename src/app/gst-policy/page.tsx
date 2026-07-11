import type { Metadata } from 'next'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'GST Policy',
  description:
    'How GST applies to RGL Decors interior design and execution work in Tamil Nadu — applicable rates, SAC codes, invoicing, input tax credit and materials.',
  path: routes.gst,
})

export default function GstPolicyPage() {
  return (
    <LegalLayout
      title="GST Policy"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'GST Policy', path: routes.gst },
      ]}
      summary={
        <>
          <p>• Interior design and execution services are taxable at <strong>18% GST</strong>.</p>
          <p>• For a Tamil Nadu supply that is <strong>CGST 9% + SGST 9%</strong>; inter-state it is <strong>IGST 18%</strong>.</p>
          <p>• Every invoice carries the HSN/SAC code, our GSTIN and the place of supply.</p>
          <p>• Registered business clients can claim <strong>input tax credit</strong> as permitted by law.</p>
        </>
      }
    >
      <p>
        {business.legalName} is registered under GST in Tamil Nadu. This page explains how GST is
        applied to our work so there are no surprises on your invoice.
      </p>

      <LegalSection id="gstin" heading="1. Registration">
        <p>
          GSTIN:{' '}
          <Placeholder>
            RGL to supply the registered GSTIN before publishing. It must appear here and on every
            tax invoice.
          </Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="rates" heading="2. Applicable rates">
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            Interior design consultancy and professional services attract <strong>18% GST</strong>{' '}
            under SAC 9983 / 998391 (specialty design services, which includes interior design).
          </li>
          <li>Specialty design services are classified under <strong>SAC 998391</strong>.</li>
          <li>The standard rate for architectural and engineering services is <strong>18%</strong>.</li>
          <li>Building finishing services (SAC 9954 / 995478) also attract <strong>18%</strong>.</li>
          <li>
            Interior design services for homes and offices remain taxable at 18% following the
            September 2025 rate simplification.
          </li>
        </ul>
        <p>
          <strong>For a Tamil Nadu supply:</strong> CGST 9% + SGST 9% = 18%.{' '}
          <strong>For an inter-state supply:</strong> IGST 18%.
        </p>
      </LegalSection>

      <LegalSection id="invoicing" heading="3. Invoicing">
        <ul className="ml-5 list-disc space-y-1.5">
          <li>A tax invoice is issued with the HSN/SAC code, our GSTIN and the place of supply.</li>
          <li>An advance invoice is raised on booking; the balance is invoiced against milestones.</li>
          <li>
            <strong>Input tax credit</strong> is available to registered business clients as per law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="materials" heading="4. Materials">
        <p>
          Modular furniture and kitchens are typically taxed at <strong>18%</strong> when supplied as
          a composite works contract. Where materials are billed separately, the rate applicable to
          that HSN applies (for example 12% for unbranded wooden furniture, and 18% or 28% for
          branded or luxury classifications).
        </p>
      </LegalSection>

      <LegalSection id="composition" heading="5. Composition scheme">
        <p>
          We do <strong>not</strong> operate under the composition scheme. Full GST is charged and
          accounted for on every invoice.
        </p>
      </LegalSection>

      <LegalSection id="queries" heading="6. Queries">
        <p>
          For any GST or invoicing question, write to{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>
          .
        </p>
        <p className="text-sm">
          <Placeholder>
            This page states our understanding of the rates applicable to our services. It is not tax
            advice. RGL to have it reviewed by its accountant and updated whenever rates change.
          </Placeholder>
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
