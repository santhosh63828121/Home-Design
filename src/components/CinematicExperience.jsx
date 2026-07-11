'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ROOMS } from '../cinematic/config.js'
import { GALLERY } from '../data/content.js'
import './cinematic.css'

// Single room image for the lightweight mobile hero (reuses the site's existing
// living-room photo — no new asset). One request only, requested at a smaller
// size/quality than the gallery thumbnail so it stays cheap on mobile data; used
// as a CSS background-image so desktop (where the mobile hero is display:none)
// never downloads it.
const MOBILE_HERO_IMAGE = (
  GALLERY.find((g) => g.id === 'living')?.image ||
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'
).replace(/[?].*$/, '') + '?auto=format&fit=crop&w=900&q=55'

/**
 * CinematicExperience — a TRUE one-take walkthrough of a single 3D home.
 *
 * The whole house is rendered into one <canvas> by HouseScene; a single virtual
 * camera walks the path on scroll (no fades, no image swaps). This component
 * only owns the canvas + the HTML room-label overlay that updates as the camera
 * enters each space, plus the scroll hint and progress bar.
 *
 * Reduced-motion / no-WebGL users get an accessible text fallback.
 */
const roomAt = (p) => {
  const i = ROOMS.findIndex((r) => p >= r.range[0] && p < r.range[1])
  return i === -1 ? ROOMS.length - 1 : i
}

export default function CinematicExperience() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [forceStatic, setForceStatic] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Which hero shows is decided by CSS media queries (reduced-motion → static,
    // everyone else → WebGL) so the correct hero is in the SSR HTML and paints
    // immediately — no client-side swap, no flash. JS only (a) inits the engine
    // when the WebGL hero is the active one, and (b) forces the static hero when
    // WebGL is unavailable (which CSS can't detect).
    //
    // MOBILE: the 3D walkthrough now runs on phones too. HouseScene already
    // detects mobile (innerWidth < 768) and drops to a cheaper profile — no
    // antialiasing, pixel-ratio capped at 1.5, shadow maps off, and a plain
    // single-pass render (skipping the bloom + motion-blur composer).
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasWebGL = (() => {
      try {
        const c = document.createElement('canvas')
        return !!(c.getContext('webgl2') || c.getContext('webgl'))
      } catch {
        return false
      }
    })()

    if (!hasWebGL) {
      setForceStatic(true) // no WebGL → fall back to the animated static hero
      return
    }
    if (prefersReduced) return // CSS already shows the static hero; skip the engine

    let cancelled = false
    // Defensive fallback: never leave the canvas faded-out if onReady is missed.
    const readyFallback = setTimeout(() => !cancelled && setReady(true), 1500)
    import('../cinematic/CinematicEngine.js').then(({ default: CinematicEngine }) => {
      if (cancelled || !wrapperRef.current) return
      const engine = new CinematicEngine({
        wrapper: wrapperRef.current,
        canvas: canvasRef.current,
        onProgress: (p) => {
          setProgress(p)
          setActive(roomAt(p))
        },
        onReady: () => {
          if (!cancelled) setReady(true)
        },
      })
      engine.init()
      engineRef.current = engine
    })

    return () => {
      cancelled = true
      clearTimeout(readyFallback)
      engineRef.current?.destroy()
    }
  }, [])

  const handleCta = (e, target) => {
    e.preventDefault()
    const el = document.querySelector(target)
    if (engineRef.current && el) engineRef.current.scrollTo(el)
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  const room = ROOMS[active]

  // Both heroes are rendered in the SSR HTML; CSS (cine-hero-static /
  // cine-hero-webgl) shows exactly one per breakpoint. JS adds .cine-force-static
  // only when WebGL is unavailable.
  return (
    <div id="walkthrough" className={`cine-hero${forceStatic ? ' cine-force-static' : ''}`}>
      {/* Mobile / reduced-motion / no-WebGL hero — a lightweight, GPU-only
          animated walkthrough: a CSS cross-fade + slow Ken Burns zoom over the
          site's room imagery, with the copy rising in. NO three.js, NO Framer —
          pure CSS, so it paints at first paint (it's the SSR'd LCP element on
          mobile, not gated behind hydration) and keeps navigation/speed intact.
          The title is a <p> (not a heading) so ReleaseHero keeps the page's
          single <h1> and heading order stays clean. */}
      <section className="cinematic cinematic--static cine-hero-static" aria-label="Home walkthrough">
        <div className="cine-m-slides" aria-hidden="true">
          <div className="cine-m-slide" style={{ backgroundImage: `url(${MOBILE_HERO_IMAGE})` }} />
        </div>
        <div className="cine-m-veil" aria-hidden="true" />
        <div className="cinematic__staticInner cine-m-content">
          <p className="scene__eyebrow cine-m-rise">RGL Decors · The Walkthrough</p>
          <p className="cinematic__staticTitle cine-m-rise">A Walk Through One Luxury Home</p>
          <p className="cine-m-sub cine-m-rise">
            From the entrance to the living room, kitchen and master suite — every
            space crafted by RGL Decors.
          </p>
          <a href="#story" className="scene__cta cine-m-rise" onClick={(e) => handleCta(e, '#story')}>
            Explore the home <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* WebGL hero — shown on desktop; the engine inits client-side. */}
      <section ref={wrapperRef} aria-label="Luxury home walkthrough" className="cinematic cine-hero-webgl">
      <canvas ref={canvasRef} className={`cinematic__fx${ready ? ' is-ready' : ''}`} aria-hidden="true" />

      {/* Room label overlay — crossfades as the camera enters each space */}
      <AnimatePresence mode="wait">
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`scene__content scene__content--${room.side}${room.hero ? ' scene__content--hero' : ''}`}
        >
          <p className="scene__eyebrow">{room.eyebrow}</p>
          <p className={`scene__title${room.hero ? ' scene__title--hero' : ''}`}>{room.title}</p>
          <p className="scene__body">{room.body}</p>
          {room.cta && (
            <a
              href={room.cta.target}
              onClick={(e) => handleCta(e, room.cta.target)}
              className="scene__cta"
            >
              {room.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="cinematic__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className={`cinematic__hint${progress > 0.02 ? ' is-hidden' : ''}`} aria-hidden="true">
        <span>Scroll to Explore</span>
        <ChevronDown size={16} className="animate-bounceArrow" />
      </div>
      </section>
    </div>
  )
}