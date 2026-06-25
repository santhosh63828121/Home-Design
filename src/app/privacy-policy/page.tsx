import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection, Placeholder } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'

const UPDATED = '2026-06-23'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How RGL Decors collects, uses and protects the information you share through this website — explained in plain language and set out in full, with no surprises.',
  path: routes.privacy,
})

export default function PrivacyPolicyPage() {
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
          <p>• We only collect what you type into our enquiry forms — your <strong>name, email address, subject and message</strong> — plus a little technical data to prevent spam.</p>
          <p>• We use it to reply to you and prepare your free 3D design and quote. We <strong>don&apos;t sell your data</strong>, and this website doesn&apos;t run advertising or analytics trackers.</p>
          <p>• Some pages embed <strong>Google Maps</strong> and <strong>YouTube</strong>, which are operated by those companies under their own privacy policies.</p>
          <p>• You can ask us to access, correct or delete your information at any time.</p>
        </>
      }
    >
      <p>
        This policy explains what information {business.legalName} (&ldquo;RGL Decors&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this website, how we use it, and the
        choices you have. It describes what this specific website actually does — nothing more.
      </p>

      <LegalSection id="what-we-collect" heading="1. Information we collect">
        <p>
          <strong>Information you give us.</strong> When you submit an enquiry through our contact or
          &ldquo;get a free quote&rdquo; form, we collect the details you type in: your{' '}
          <strong>name</strong>, <strong>email address</strong>, a <strong>subject</strong> and your{' '}
          <strong>message</strong>. We only ask for what we need to respond to you.
        </p>
        <p>
          <strong>Technical information for spam prevention.</strong> When a form is submitted, our
          server records a <strong>one-way hashed (irreversible) form of your IP address</strong> —
          never your raw IP — and your browser&apos;s user-agent string. This is used to triage abuse
          and spam, not to identify or track you.
        </p>
        <p>
          We do not knowingly collect any other personal information through this site, and we do not
          ask for sensitive information (such as payment card details) through these forms.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" heading="2. How we use your information">
        <p>We use the information you provide to:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>respond to your enquiry and answer your questions;</li>
          <li>prepare your free 3D design and an itemised quote;</li>
          <li>contact you about your project by email, phone or WhatsApp; and</li>
          <li>keep a record of enquiries for our legitimate business operations.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, rent or trade your personal information, and we do not use
          it for third-party advertising.
        </p>
      </LegalSection>

      <LegalSection id="third-parties" heading="3. Service providers and embedded content">
        <p>This website relies on a small number of third parties, and only these:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            <strong>Email delivery.</strong> When you submit a form, we may use a third-party email
            service (such as Resend, or our SMTP email provider) to deliver a notification of your
            enquiry to our own team. Your message is sent to us so we can respond.
          </li>
          <li>
            <strong>Google Maps.</strong> Our contact page embeds a Google Map. When it loads, Google
            receives your IP address and may set its own cookies, under Google&apos;s privacy policy.
          </li>
          <li>
            <strong>YouTube.</strong> Some pages embed YouTube videos in privacy-enhanced mode
            (youtube-nocookie.com). These load <strong>only after you click to play</strong>, after
            which YouTube&apos;s privacy policy applies.
          </li>
          <li>
            <strong>WhatsApp.</strong> If you choose to continue a conversation on WhatsApp, you are
            taken to WhatsApp (operated by Meta), and anything you send there is governed by
            WhatsApp&apos;s own privacy policy.
          </li>
        </ul>
        <p>
          Our enquiry records are stored in our own database. Where that database or our email is
          hosted by an infrastructure provider, that provider processes the data on our behalf.
        </p>
      </LegalSection>

      <LegalSection id="cookies" heading="4. Cookies and tracking">
        <p>
          <strong>This website does not set its own cookies and does not use first-party analytics
          or advertising trackers.</strong> We do not use Google Analytics or similar tools on this
          site. The only cookies that may be set are those placed by the embedded third-party content
          described above (Google Maps, and YouTube once you choose to play a video).
        </p>
        <p className="text-sm">
          <Placeholder>
            RGL to update before launch if any analytics, tag manager or advertising pixel is added
            to the site — this section must then list it.
          </Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="5. How long we keep your information">
        <p>
          We keep enquiry records for as long as needed to respond to you, deliver any project you go
          ahead with, and maintain reasonable business records.{' '}
          <Placeholder>RGL to confirm a specific retention period (e.g. delete non-converted enquiries after N months).</Placeholder>{' '}
          You can ask us to delete your information sooner at any time.
        </p>
      </LegalSection>

      <LegalSection id="your-choices" heading="6. Your choices and rights">
        <p>
          You can contact us at any time to <strong>access, correct or delete</strong> the
          information you have shared with us, or to ask a question about how it is handled. Email{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>{' '}
          and we will action reasonable requests.
        </p>
        <p>
          Submitting a form is voluntary. If you would rather not share details online, you can simply
          call or WhatsApp us instead — see the{' '}
          <Link href={routes.contact} className="font-medium text-accent hover:underline">contact page</Link>.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="7. Security">
        <p>
          We take reasonable measures to protect the information you share — for example, we store a
          hashed rather than raw IP address. No website or system can be completely secure, so we
          cannot guarantee absolute security, but we work to keep your information safe.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="8. Children">
        <p>
          Our services and this website are intended for homeowners and adults. We do not knowingly
          collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="9. Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top
          shows when it was last revised. Significant changes will be reflected here.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
