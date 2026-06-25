'use client'

import { useState } from 'react'
import { Link2, Check, MessageCircle, Facebook, Twitter } from 'lucide-react'

/**
 * Share row for an article. Web Share API where available (mobile), with
 * explicit WhatsApp / X / Facebook links + copy-link fallback everywhere.
 */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const shareUrl = enc(url)
  const shareText = enc(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — links still work */
    }
  }

  const links = [
    { label: 'Share on WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${shareText}%20${shareUrl}` },
    { label: 'Share on X', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}` },
    { label: 'Share on Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-caps text-[11px] uppercase tracking-wide2 text-muted">Share</span>
      {links.map((l) => {
        const Icon = l.icon
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="grid h-9 w-9 place-items-center rounded-full border border-divider bg-white text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={16} aria-hidden="true" />
          </a>
        )
      })}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="grid h-9 w-9 place-items-center rounded-full border border-divider bg-white text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? <Check size={16} className="text-accent" aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
      </button>
    </div>
  )
}
