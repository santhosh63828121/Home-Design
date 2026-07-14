import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { LegalSection } from '@/components/legal/LegalLayout'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { business } from '@/data/business'
import { analyticsEnabled, activeAnalyticsTools } from '@/lib/analytics'

const UPDATED = '2026-07-12'

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description:
    'Which cookies rgldecors.com sets, which are placed by embedded third parties such as Google Maps and YouTube, and how to block or clear them in your browser.',
  path: routes.cookies,
})

/**
 * Wired to lib/analytics.ts — the SAME config that injects the tracking scripts.
 * If a tool is enabled it is disclosed here automatically; if none is enabled,
 * this page says so truthfully. The disclosure can never drift from reality.
 */
export default function CookiePolicyPage() {
  const tools = activeAnalyticsTools()
  const toolsList =
    tools.length > 1 ? `${tools.slice(0, -1).join(', ')} and ${tools.slice(-1)}` : tools[0]

  return (
    <LegalLayout
      title="Cookie Policy"
      updated={UPDATED}
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Cookie Policy', path: routes.cookies },
      ]}
      summary={
        analyticsEnabled ? (
          <>
            <p>• We use analytics cookies ({toolsList}) to understand how the site is used.</p>
            <p>• Embedded <strong>Google Maps</strong> and <strong>YouTube</strong> may set their own cookies.</p>
            <p>• You can block or clear cookies in your browser at any time.</p>
            <p>• We never use cookies to collect sensitive personal data.</p>
          </>
        ) : (
          <>
            <p>• <strong>This website does not set its own cookies</strong> and runs no analytics or advertising trackers.</p>
            <p>• The only cookies that may be set come from embedded <strong>Google Maps</strong> and <strong>YouTube</strong>.</p>
            <p>• You can block or clear cookies in your browser at any time.</p>
          </>
        )
      }
    >
      <p>
        This policy explains the cookies used on rgldecors.com by {business.legalName}. A cookie is a
        small file a website (or a service embedded in it) stores in your browser.
      </p>

      <LegalSection id="first-party" heading="1. Cookies we set">
        {analyticsEnabled ? (
          <p>
            To understand how visitors use the site and to improve it, we use the following analytics
            and tag tools: <strong>{toolsList}</strong>. These may set cookies or similar identifiers
            and collect usage data — such as pages viewed, referring site and approximate location —
            under their providers&apos; own privacy policies. We use this data in aggregate to improve
            the website, never to identify you personally.
          </p>
        ) : (
          <p>
            <strong>
              This website does not set its own cookies and does not use first-party analytics or
              advertising trackers.
            </strong>{' '}
            We do not run Google Analytics or any comparable tool on this site.
          </p>
        )}
      </LegalSection>

      <LegalSection id="third-party" heading="2. Cookies set by embedded content">
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Google Maps.</strong> Our contact page embeds a Google Map. When it loads, Google
            receives your IP address and may set its own cookies.
          </li>
          <li>
            <strong>YouTube.</strong> Some pages embed YouTube video in privacy-enhanced mode
            (youtube-nocookie.com). These load <strong>only after you click to play</strong>, after
            which YouTube&apos;s policy applies.
          </li>
        </ul>
        <p>These cookies are governed by those companies&apos; privacy policies, not ours.</p>
      </LegalSection>

      <LegalSection id="control" heading="3. Controlling cookies">
        <p>
          You can block or delete cookies through your browser settings at any time. Blocking cookies
          from embedded providers may stop the map or video from displaying, but the rest of the site
          will work normally.
        </p>
        <p>
          We do <strong>not</strong> use cookies to collect sensitive personal data.
        </p>
      </LegalSection>

      <LegalSection id="more" heading="4. More information">
        <p>
          For how we handle the information you actively submit to us, see our{' '}
          <Link href={routes.privacy} className="font-medium text-accent hover:underline">
            privacy policy
          </Link>
          . Questions? Write to{' '}
          <a href={`mailto:${business.nap.email}`} className="font-medium text-accent hover:underline">
            {business.nap.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
