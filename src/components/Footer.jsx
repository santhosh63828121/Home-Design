import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music2,
  MessageCircle,
} from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { FOOTER_LINKS, SOCIALS } from '../data/content.js'

const ICONS = { Facebook, Instagram, Youtube, Twitter, Music2, MessageCircle }

/**
 * Site footer — dark charcoal, 3-column row + bottom legal bar.
 */
export default function Footer() {
  return (
    <footer className="bg-ink pt-[60px] pb-[30px] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo dark={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Complete interiors solution for your Dream home.
              <br />
              One place · Any budget.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/80 sm:grid-cols-1 sm:grid-flow-col sm:grid-rows-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link}>
                  <a href="#top" className="transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-start gap-4 md:justify-end">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Icon size={24} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <hr className="my-8 border-[#333333]" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>© 2024 RGLDECORS.COM — All Rights Reserved</p>
          <p>Best Interior Designers in Chennai, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  )
}
