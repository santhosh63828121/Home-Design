/**
 * Brand lockup — a serif monogram, not an icon-in-a-box.
 *
 * The previous mark was a lightning glyph in a rounded olive square: a SaaS
 * signature that read as "startup", not "interior atelier". A luxury studio's
 * mark is its NAME, set well: tracked capitals, a hairline gold rule, and
 * nothing else competing.
 *
 * Non-interactive on purpose — the parent <Link> (Navbar/Footer) provides the
 * navigation, so this never renders its own anchor (no nested <a>).
 * `dark` controls text colour for light vs. transparent/photographic grounds.
 */
export default function Logo({ dark = true, className = '' }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-serif text-[26px] font-normal tracking-[0.14em] transition-colors duration-500 sm:text-[28px] ${
          dark ? 'text-ink' : 'text-white'
        }`}
      >
        RGL
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span aria-hidden="true" className="h-px w-4 bg-gold" />
        <span
          className={`font-caps text-[8.5px] uppercase tracking-wide4 transition-colors duration-500 ${
            dark ? 'text-muted' : 'text-white/60'
          }`}
        >
          Décors
        </span>
      </span>
    </span>
  )
}
