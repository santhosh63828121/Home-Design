import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ROOMS } from '../cinematic/config.js'
import './cinematic.css'

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
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasWebGL = (() => {
      try {
        const c = document.createElement('canvas')
        return !!(c.getContext('webgl2') || c.getContext('webgl'))
      } catch {
        return false
      }
    })()

    if (prefersReduced || !hasWebGL) {
      setReduced(true)
      return
    }

    let cancelled = false
    import('../cinematic/CinematicEngine.js').then(({ default: CinematicEngine }) => {
      if (cancelled || !wrapperRef.current) return
      const engine = new CinematicEngine({
        wrapper: wrapperRef.current,
        canvas: canvasRef.current,
        onProgress: (p) => {
          setProgress(p)
          setActive(roomAt(p))
        },
      })
      engine.init()
      engineRef.current = engine
    })

    return () => {
      cancelled = true
      engineRef.current?.destroy()
    }
  }, [])

  const handleCta = (e, target) => {
    e.preventDefault()
    const el = document.querySelector(target)
    if (engineRef.current && el) engineRef.current.scrollTo(el)
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  // Accessible fallback (no WebGL / reduced motion).
  if (reduced) {
    return (
      <section id="walkthrough" className="cinematic cinematic--static" aria-label="Home walkthrough">
        <div className="cinematic__staticInner">
          <p className="scene__eyebrow">RGL Decors · The Walkthrough</p>
          <h1 className="cinematic__staticTitle">A Walk Through One Luxury Home</h1>
          <ul className="cinematic__staticList">
            {ROOMS.map((r) => (
              <li key={r.id}>
                <span>{r.name}</span>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
          <a href="#story" className="scene__cta" onClick={(e) => handleCta(e, '#story')}>
            Continue <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    )
  }

  const room = ROOMS[active]

  return (
    <section ref={wrapperRef} id="walkthrough" aria-label="Luxury home walkthrough" className="cinematic">
      <canvas ref={canvasRef} className="cinematic__fx" aria-hidden="true" />

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
          <h2 className={`scene__title${room.hero ? ' scene__title--hero' : ''}`}>{room.title}</h2>
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
  )
}
