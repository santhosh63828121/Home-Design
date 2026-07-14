/**
 * CREDENTIALS & GATED SURFACES
 * ============================
 * The brief asks for awards, certificates, a newsletter, video testimonials and
 * team/factory photography. We have layouts for all of them — but no verified
 * content. Nothing invented ships.
 *
 * Each surface is therefore built and switched OFF here. When the client
 * supplies real material, populate the array (or flip the flag) and the section
 * appears with zero layout work. Rendering is driven by the DATA being non-empty,
 * not by a separate boolean that could silently drift out of sync with it.
 */

export type Award = {
  title: string
  issuer: string
  year: number
  /** Optional proof link — a press page, certificate PDF or registry entry. */
  href?: string
}

export type Certification = {
  name: string
  issuer: string
  /** e.g. an ISO number or licence ID. Shown verbatim. */
  ref?: string
  href?: string
}

/**
 * AWARDS — empty until the client supplies real, verifiable awards.
 * Do NOT populate with "Best Interior Designer Chennai 2024"-style claims unless
 * there is an actual issuing body and a link that proves it.
 */
export const awards: Award[] = []

/**
 * CERTIFICATIONS — empty until supplied (ISO, green-building, trade bodies,
 * material warranties from OEMs, etc.).
 */
export const certifications: Certification[] = []

/**
 * NEWSLETTER — off. Turning this on requires a real subscribe destination
 * (list + double opt-in + an unsubscribe path, which the DPDP Act 2023 notice on
 * /privacy-policy already promises). A box that collects addresses with nothing
 * behind it is a broken promise, not a feature.
 */
export const NEWSLETTER_ENABLED = false

/**
 * TEAM / FACTORY / FOUNDER photography — off until real photographs exist.
 * Stock photos of other people's staff presented as "our team" would be a
 * fabrication about real, named humans.
 */
export const TEAM_PHOTOS_AVAILABLE = false

/** Video testimonials — off until real client footage is supplied and consented. */
export const VIDEO_TESTIMONIALS_AVAILABLE = false
