/**
 * ANALYTICS CONFIG — single source of truth (doc §7 / §6.3).
 * ----------------------------------------------------------------------------
 * Every analytics/tag tool is OFF by default and only activates when its
 * `NEXT_PUBLIC_*` env var is set at build time. Nothing tracks visitors unless
 * RGL explicitly configures an ID — so the default deployment runs zero
 * third-party trackers, matching what the privacy policy says.
 *
 * BOTH the <Analytics> component (which injects the scripts) AND the privacy
 * policy (which discloses them) read from THIS module, so the scripts and the
 * legal disclosure can never drift apart: enable a tool here → it loads AND is
 * disclosed automatically.
 */

const env = (k: string): string | undefined => {
  const v = process.env[k]
  return v && v.trim() ? v.trim() : undefined
}

export const analytics = {
  /** Google Analytics 4 — measurement ID, e.g. "G-XXXXXXX". */
  ga4: env('NEXT_PUBLIC_GA_ID'),
  /** Google Tag Manager container — e.g. "GTM-XXXXXX". */
  gtm: env('NEXT_PUBLIC_GTM_ID'),
  /** Microsoft Clarity project ID. */
  clarity: env('NEXT_PUBLIC_CLARITY_ID'),
  /** Meta (Facebook) Pixel ID. */
  metaPixel: env('NEXT_PUBLIC_META_PIXEL_ID'),
} as const

/** True if ANY analytics/tag tool is configured. */
export const analyticsEnabled = Object.values(analytics).some(Boolean)

/** Human-readable list of the tools currently active — used by the privacy policy. */
export function activeAnalyticsTools(): string[] {
  const tools: string[] = []
  if (analytics.gtm) tools.push('Google Tag Manager')
  if (analytics.ga4) tools.push('Google Analytics 4')
  if (analytics.clarity) tools.push('Microsoft Clarity')
  if (analytics.metaPixel) tools.push('Meta Pixel')
  return tools
}
