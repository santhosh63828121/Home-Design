/**
 * Client-safe blog helpers — pure functions with NO filesystem access, so they
 * can be imported into client components (BlogCard/BlogIndex) without dragging
 * in the `server-only` data layer (lib/blog.ts).
 */

/** Pretty date, e.g. "19 June 2026". */
export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
