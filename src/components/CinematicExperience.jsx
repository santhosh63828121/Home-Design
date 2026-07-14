'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ROOMS, JOURNEY } from '../cinematic/config.js'
import { GALLERY } from '../data/content.js'
import './cinematic.css'

// Single room image for the mobile hero. ONE request only, at a smaller
// size/quality than the gallery thumbnail so it stays cheap on mobile data.
// It is a CSS background-image, so desktop (where this hero is display:none)
// never downloads it at all.
//
// Exported so app/page.tsx can <link rel="preload"> it: a CSS background is
// invisible to the browser's preload scanner — it can't be discovered until the
// stylesheet has been fetched AND the rule has matched — which put this, the
// mobile LCP element, ~1.5s late on the critical path.
export const MOBILE_HERO_IMAGE =
  (
    GALLERY.find((g) => g.id === 'living')?.image ||
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'
  ).replace(/[?].*$/, '') + '?auto=format&fit=crop&w=900&q=55'

/** Desktop poster — painted instantly beneath the canvas so the LCP never waits
 *  for three.js. next/image re-encodes to AVIF at the device width. */
const POSTER_IMAGE =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=75'

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
    // Which hero SHOWS is decided by CSS (see the hybrid switch in cinematic.css)
    // so the correct hero is in the SSR HTML and paints immediately — no
    // client-side swap, no flash. JS only (a) boots the engine when the WebGL
    // hero is the one actually on screen, and (b) forces the photography hero
    // when WebGL is unavailable, which CSS cannot detect.
    //
    // The three guards below MUST mirror the CSS switch exactly. If they drift,
    // we either boot a three.js engine for a canvas nobody can see (pure waste
    // on the very devices that can least afford it) or leave a visible canvas
    // black.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Same 1024px breakpoint as the CSS. Phones and tablets get the photography
    // hero: the walkthrough measured Perf 52 / TBT 7,440ms on mobile because
    // building the scene blocks the main thread for seconds.
    const isSmall = window.matchMedia('(max-width: 1023px)').matches
    const hasWebGL = (() => {
      try {
        const c = document.createElement('canvas')
        return !!(c.getContext('webgl2') || c.getContext('webgl'))
      } catch {
        return false
      }
    })()

    if (!hasWebGL) {
      setForceStatic(true) // no WebGL → fall back to the photography hero
      return
    }
    if (isSmall) return // CSS is showing the photography hero — never boot three.js
    if (prefersReduced) return // ditto for reduced-motion

    let cancelled = false
    let readyFallback = 0

    const boot = () => {
      if (cancelled || engineRef.current) return
      // Defensive: never leave the canvas faded-out if onReady is missed.
      readyFallback = setTimeout(() => !cancelled && setReady(true), 2500)
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
    }

    // ── BOOT ON FIRST SCROLL INTENT ──────────────────────────────────────
    // three.js + building the house is ~2s of main-thread work. Doing it during
    // page load put it squarely in the critical path and capped Lighthouse
    // Performance at 49-60 — on the one page every visitor lands on.
    //
    // But the walkthrough is SCROLL-DRIVEN: until you scroll, there is literally
    // nothing for it to animate. Until then the poster photograph IS the hero —
    // it paints immediately (LCP ~1.1s) and looks like the finished thing.
    //
    // So the engine boots the moment the user shows intent to move, and the
    // canvas cross-fades over the poster. A visitor who reads the hero and
    // leaves never downloads or builds any of it. Nobody waits for something
    // they haven't asked to see.
    //
    // This is only safe because the scroll length now lives in CSS
    // (.cine-track / position: sticky). With the old GSAP pin, booting late
    // would have grown the page under the user's cursor.
    const opts = { passive: true, once: true }
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll']
    events.forEach((e) => window.addEventListener(e, boot, opts))

    return () => {
      cancelled = true
      clearTimeout(readyFallback)
      events.forEach((e) => window.removeEventListener(e, boot))
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
        {/* Same <Image>, same src, as the desktop poster below — so the browser
            issues exactly ONE preload and whichever hero the CSS reveals uses it.
            It was a CSS background-image, which the preload scanner cannot see:
            it could not even begin downloading until the stylesheet had been
            fetched and the rule matched. Meanwhile the (display:none) desktop
            poster was still being preloaded on mobile — so a phone paid for two
            images and got the slow one. Mobile LCP: 3.9s. */}
        <div className="cine-m-slides" aria-hidden="true">
          <div className="cine-m-slide">
            <Image
              src={POSTER_IMAGE}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={50}
              className="object-cover"
            />
          </div>
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

      {/* WebGL hero — desktop. The TRACK declares the journey's scroll length in
          CSS (JOURNEY.scrollLengthVh, passed as a custom property so the camera
          mapping and the layout can never drift apart), and the stage inside it
          holds position with `position: sticky`. No GSAP pin, so the page height
          is real, server-rendered layout: it cannot shift, and the engine can be
          booted lazily without the page growing under the user. */}
      <div
        ref={wrapperRef}
        className="cine-track cine-hero-webgl"
        style={{ '--cine-vh': JOURNEY.scrollLengthVh }}
      >
      <section aria-label="Luxury home walkthrough" className="cinematic">
      {/* POSTER — the reason this hero can be both 3D and fast.
          A <canvas> paints nothing until three.js has downloaded, compiled and
          built the scene. Left bare, the Largest Contentful Paint waits on all
          of that (measured: LCP 12.9s at worst). This photograph is a real
          <img priority>, discoverable by the browser's preload scanner, so it
          paints almost immediately and BECOMES the LCP. The canvas then fades in
          over it (opacity only → no layout shift, CLS 0).
          The visitor sees a luxury interior instantly, and the walkthrough
          arrives a moment later without anyone waiting on a blank screen. */}
      <div className="cine-poster" aria-hidden="true">
        <Image
          src={POSTER_IMAGE}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={50}
          className="object-cover"
        />
      </div>

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
    </div>
  )
}