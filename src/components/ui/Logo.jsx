import { Zap } from 'lucide-react'

/**
 * Brand lockup: lightning glyph + serif wordmark.
 * `dark` controls text color for use over light vs. transparent backgrounds.
 */
export default function Logo({ dark = true, className = '' }) {
  return (
    <a
      href="#top"
      aria-label="RGL Decors — home"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-white">
        <Zap size={18} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span
        className={`font-serif text-xl font-bold tracking-tight ${
          dark ? 'text-ink' : 'text-white'
        }`}
      >
        RGL DECORS
      </span>
    </a>
  )
}
