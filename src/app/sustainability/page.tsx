import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Sustainability Commitment',
  description:
    'How RGL Decors builds responsibly — low-formaldehyde BWR/BWP plywood, water-based low-VOC finishes, site waste segregation, local sourcing and paperless docs.',
  path: routes.sustainability,
})

export default function SustainabilityPage() {
  return (
    <LegalLayout
      title="Sustainability Commitment"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Sustainability', path: routes.sustainability },
      ]}
      summary={
        <>
          <p>• <strong>BWR/BWP plywood</strong> with E0/E1 low-formaldehyde emissions, and FSC-certified options on request.</p>
          <p>• <strong>Water-based PU and low-VOC paints</strong> — better air in the home you actually live in.</p>
          <p>• <strong>Waste segregated on site</strong>, with usable offcuts donated to local Chennai workshops.</p>
          <p>• <strong>Tamil Nadu-based vendors</strong> preferred, to cut transport emissions.</p>
        </>
      }
    >
      <p>
        {business.legalName} promotes responsible interiors. Sustainability in this trade is not a
        slogan — it is a series of specific, boring, unglamorous choices about boards, finishes,
        offcuts and suppliers. These are the ones we make.
      </p>

      <LegalSection id="materials" heading="1. Materials">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Use of <strong>BWR / BWP plywood with E0 / E1 low-formaldehyde</strong> emission ratings.
            Formaldehyde off-gasses into the room long after installation; a lower-emission board is
            one of the few green choices you can actually breathe.
          </li>
          <li>
            <strong>FSC-certified options on request</strong> — ask us and we will price them into
            your BOQ.
          </li>
          <li>
            <strong>Water-based PU and low-VOC paints</strong>, which cure with far less solvent
            released into the home.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="site" heading="2. On site">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Waste segregation at every site</strong>, so recyclable material does not go to
            landfill with everything else.
          </li>
          <li>
            <strong>Donation of usable offcuts</strong> to local workshops in Chennai, rather than
            skipping perfectly good board.
          </li>
        </ul>
        <p>
          Factory-led production helps here too: cutting panels to a CAD plan on an automated line
          produces materially less waste than cutting sheets by hand on a apartment floor.
        </p>
      </LegalSection>

      <LegalSection id="sourcing" heading="3. Sourcing & documentation">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Preference for Tamil Nadu-based vendors</strong>, which shortens supply chains and
            reduces transport emissions.
          </li>
          <li>
            <strong>Paperless drawings and e-invoices</strong> throughout the project.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="honest" heading="4. Being straight with you">
        <p>
          Interiors are a material-intensive business, and we are not going to pretend otherwise.
          What we can promise is that the greener option is always on the table, always priced
          transparently, and never quietly swapped out for a cheaper one. If sustainability matters
          to you, say so at the brief stage — it is far easier to design in than to retrofit.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
