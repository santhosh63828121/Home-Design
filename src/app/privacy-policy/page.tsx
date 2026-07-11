import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'
import { analyticsEnabled, activeAnalyticsTools } from '@/lib/analytics'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How RGL Decors collects, uses and protects your data under the DPDP Act 2023 — what we collect, why, who we share it with, and your data principal rights.',
  path: routes.privacy,
})

export default function PrivacyPolicyPage() {
  const tools = activeAnalyticsTools()
  const toolsList =
    tools.length > 1 ? `${tools.slice(0, -1).join(', ')} and ${tools.slice(-1)}` : tools[0]

  return (
    <LegalLayout
      title="Privacy Policy"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Privacy Policy', path: routes.privacy },
      ]}
      summary={
        <>
          <p>• Through this website we only collect what you type into our forms — plus a little technical data to stop spam.</p>
          <p>• During a project we also handle <strong>project data</strong> (floor plans, budget, preferences, site photos).</p>
          <p>
            • We <strong>don&apos;t sell your data</strong>
            {analyticsEnabled
              ? <>, and we use privacy-respecting analytics ({toolsList}) to understand how the site is used.</>
              : <>, and this website runs no advertising or analytics trackers.</>}
          </p>
          <p>• Under the <strong>DPDP Act 2023</strong> you can access, correct, erase or nominate — just email us.</p>
        </>
      }
    >
      <p>
        This policy explains what information {business.legalName} (&ldquo;RGL Décors&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, how we use it, and the choices you have. We
        comply with the Information Technology Act 2000, the SPDI Rules 2011, and the{' '}
        <strong>Digital Personal Data Protection Act 2023 (DPDP Act)</strong>, which creates a
        consent-driven framework with rights of access, correction, erasure and grievance redressal.
      </p>

      <LegalSection id="what-we-collect" heading="1. Information we collect">
        <p>
          <strong>Through this website.</strong> When you submit an enquiry, request a quote, apply
          for a job or request the lookbook, we collect the details you type in — your{' '}
          <strong>name, email address, phone number</strong>, and whatever you tell us about your
          project. Career applicants also submit a <strong>résumé and optional portfolio</strong>.
        </p>
        <p>
          <strong>Technical information for spam prevention.</strong> When a form is submitted, our
          server records a <strong>one-way hashed (irreversible) form of your IP address</strong> —
          never your raw IP — and your browser&apos;s user-agent string. This is used to triage abuse,
          not to identify or track you.
        </p>
        <p>
          <strong>During a project.</strong> Once you engage us, we necessarily handle{' '}
          <strong>project data</strong>: floor plans, budget, design preferences and site photographs.
        </p>
        <p>
          <strong>Payment.</strong> Payments are handled through banking channels and, where used, a
          licensed payment gateway. We do <strong>not</strong> store your card CVV. This website does
          not take payments.
        </p>
      </LegalSection>

      <LegalSection id="why" heading="2. Why we collect it">
        <p>We use your information to:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>respond to your enquiry and prepare your 3D design and itemised quote;</li>
          <li>execute your project and schedule site visits;</li>
          <li>send you updates about your project by email, phone or WhatsApp;</li>
          <li>comply with GST invoicing and other statutory obligations; and</li>
          <li>improve our services.</li>
        </ul>
        <p>
          Processing is based on <strong>your consent</strong> (Sections 5–6, DPDP Act), and on our
          legal obligations where the law requires us to keep records.
        </p>
        <p>
          We do <strong>not</strong> sell, rent or trade your personal information, and we do not use
          it for third-party advertising.
        </p>
      </LegalSection>

      <LegalSection id="consent" heading="3. Consent and withdrawal">
        <p>
          You may <strong>withdraw your consent at any time</strong> by emailing us. We will stop
          processing your data, except where the law requires us to retain it (for example, tax
          records for a completed project).
        </p>
      </LegalSection>

      <LegalSection id="sharing" heading="4. Who we share it with">
        <p>
          Delivering an interior project requires other people. We may share what is necessary with
          architects, carpenters, vendors, logistics partners, payment gateways, our accountants, and
          government authorities (for GST). <strong>All processors are bound by confidentiality</strong>{' '}
          and may only use the data to perform their part of your project.
        </p>
        <p>This website additionally relies on:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            <strong>Email delivery.</strong> A third-party email service (such as Resend, or our SMTP
            provider) delivers your enquiry to our own team.
          </li>
          <li>
            <strong>Google Maps.</strong> Our contact page embeds a map; Google receives your IP when
            it loads.
          </li>
          <li>
            <strong>YouTube.</strong> Embedded video loads in privacy-enhanced mode, only after you
            click play.
          </li>
          <li>
            <strong>WhatsApp.</strong> If you continue the conversation there, Meta&apos;s policy
            applies.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="cookies" heading="5. Cookies and tracking">
        {analyticsEnabled ? (
          <p>
            We use the following analytics and tag tools to understand how the site is used:{' '}
            <strong>{toolsList}</strong>. These may set their own cookies and collect usage data under
            their providers&apos; privacy policies. We use it in aggregate to improve the site, never
            to identify you personally.
          </p>
        ) : (
          <p>
            <strong>
              This website does not set its own cookies and does not use first-party analytics or
              advertising trackers.
            </strong>{' '}
            The only cookies that may be set are those placed by the embedded third-party content
            described above.
          </p>
        )}
        <p>
          Full detail is in our{' '}
          <Link href={routes.cookies} className="font-medium text-accent hover:underline">
            cookie policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="rights" heading="6. Your rights as a data principal">
        <p>Under the DPDP Act 2023 you have the right to:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li><strong>know</strong> what we hold about you;</li>
          <li><strong>access</strong> and obtain a copy of it;</li>
          <li><strong>correct</strong> anything inaccurate;</li>
          <li><strong>erase</strong> it, where we are not legally required to keep it; and</li>
          <li><strong>nominate</strong> another person to exercise these rights on your behalf.</li>
        </ul>
        <p>
          Request any of these by email; we respond <strong>within 30 days</strong>. Submitting a form
          is voluntary — if you would rather not share details online, simply call or WhatsApp us
          instead (see the{' '}
          <Link href={routes.contact} className="font-medium text-accent hover:underline">contact page</Link>).
        </p>
      </LegalSection>

      <LegalSection id="grievance" heading="7. Grievance officer">
        <p>
          As required by law, we publish the contact details of the person authorised to respond to
          grievances.
        </p>
        <p className="text-sm">
          <Placeholder>
            RGL to name the Grievance Officer. Email:{' '}
            {business.nap.email} · Address: RGL Décors, Chennai – {business.nap.postalCode}.
          </Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="8. How long we keep it">
        <p>
          <strong>Project records are retained for 8 years</strong> to satisfy tax-audit
          requirements. Marketing data is retained until you opt out. Enquiries that do not convert
          are kept only as long as needed for our reasonable business records — you can ask us to
          delete yours sooner at any time.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="9. Security">
        <p>
          We take reasonable measures to protect your information: SSL in transit, access controls,
          vendor NDAs, and a hashed rather than raw IP address on form submissions. No system is
          completely secure, so we cannot guarantee absolute security — please report any suspected
          breach to the grievance officer.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="10. Children">
        <p>
          Our services and this website are intended for homeowners and adults. We do not knowingly
          collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="11. Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top
          shows when it was last revised, and significant changes will be reflected here.
        </p>
        <p>
          Questions? Email{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
