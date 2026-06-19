import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SCENES, EXIT } from '../cinematic/config.js'
import './cinematic.css'

/**
 * CinematicExperience — the pinned luxury home walkthrough (Scenes 1→5).
 *
 * Renders the layered DOM the engine drives:
 *   .cinematic            pinned viewport (perspective root)
 *     canvas.fx           Three.js atmosphere
 *     .camera (rig)       micro-movement + exposure (CSS var)
 *       .dolly            exit pull-back scale
 *         .stage          the 5 stacked scenes + connectors
 *     .flash / .exit      light-flash + final headline overlays
 *     HUD                 room nav + progress + scroll hint
 *
 * All animation lives in /src/cinematic controllers. A reduced-motion / no-WebGL
 * fallback renders the scenes as an accessible stacked story.
 */
const COUNT = SCENES.length
const isDoor = (t) => t === 'pivot-door' || t === 'slide-door'

export default function CinematicExperience() {
  const refs = {
    wrapper: useRef(null),
    camera: useRef(null),
    dolly: useRef(null),
    stage: useRef(null),
    canvas: useRef(null),
    flash: useRef(null),
    exit: useRef(null),
  }
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
      if (cancelled || !refs.wrapper.current) return
      const engine = new CinematicEngine({
        wrapper: refs.wrapper.current,
        camera: refs.camera.current,
        dolly: refs.dolly.current,
        stage: refs.stage.current,
        canvas: refs.canvas.current,
        flash: refs.flash.current,
        exitEl: refs.exit.current,
        onProgress: (p) => {
          setProgress(p)
          setActive(Math.min(COUNT - 1, Math.floor(p * COUNT)))
        },
      })
      engine.init()
      engineRef.current = engine
    })

    return () => {
      cancelled = true
      engineRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCta = (e, target) => {
    e.preventDefault()
    const el = document.querySelector(target)
    if (engineRef.current && el) engineRef.current.scrollTo(el)
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={refs.wrapper}
      id="walkthrough"
      aria-label="Luxury home walkthrough"
      className={`cinematic${reduced ? ' cinematic--static' : ''}`}
    >
      <canvas ref={refs.canvas} className="cinematic__fx" aria-hidden="true" />

      <div ref={refs.camera} className="cinematic__camera">
        <div ref={refs.dolly} className="cinematic__dolly">
          <div ref={refs.stage} className="cinematic__stage">
            {SCENES.map((scene, i) => (
              <article
                key={scene.id}
                data-scene={scene.id}
                className={`scene scene--${scene.id}`}
                aria-label={scene.name}
              >
                {/* Camera media layer */}
                <div data-media className="scene__media">
                  <img
                    src={scene.image}
                    alt={scene.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchpriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    className="scene__img"
                    onError={(e) => (e.currentTarget.style.opacity = 0)}
                  />
                  <div className="scene__grade" aria-hidden="true" />
                  <div className="scene__vignette" aria-hidden="true" />
                  {scene.clouds && <div data-clouds className="scene__clouds" aria-hidden="true" />}
                  <div data-ray className="scene__ray" aria-hidden="true" />
                </div>

                {/* Corner-turn foreground column (parallax reveal) */}
                {scene.enter?.type === 'corner-turn' && (
                  <div data-fg className="scene__column" aria-hidden="true" />
                )}

                {/* Door connector (pivot / slide) opening into this room */}
                {isDoor(scene.enter?.type) && (
                  <div
                    data-door
                    className={`scene__door scene__door--${
                      scene.enter.type === 'slide-door' ? 'slide' : 'pivot'
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      data-door-light
                      className="scene__doorLight"
                      style={{
                        background: `radial-gradient(60% 80% at 50% 50%, ${
                          scene.enter.light || '#ffe6b8'
                        } 0%, rgba(255,255,255,0) 70%)`,
                      }}
                    />
                    <div data-door-leaf className="scene__leaf scene__leaf--l" />
                    <div data-door-leaf className="scene__leaf scene__leaf--r" />
                  </div>
                )}

                {/* Copy overlay */}
                <div data-content className="scene__content">
                  <p data-reveal className="scene__eyebrow">
                    {scene.eyebrow}
                  </p>
                  <h2 data-title className="scene__title">
                    {scene.title}
                  </h2>
                  <p data-reveal className="scene__body">
                    {scene.body}
                  </p>
                  {scene.cta && (
                    <a
                      data-reveal
                      href={scene.cta.target}
                      onClick={(e) => handleCta(e, scene.cta.target)}
                      className="scene__cta"
                    >
                      {scene.cta.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Light-flash transition overlay */}
      <div ref={refs.flash} className="cinematic__flash" aria-hidden="true" />

      {/* Final cinematic exit headline */}
      <div ref={refs.exit} className="cinematic__exit" aria-hidden="true">
        <h2 data-exit-title className="cinematic__exitTitle">
          {EXIT.title}
        </h2>
        <p data-exit-sub className="cinematic__exitSub">
          {EXIT.subtitle}
        </p>
      </div>

      {/* HUD — hidden in static fallback */}
      {!reduced && (
        <>
          <nav className="cinematic__nav" aria-hidden="true">
            {SCENES.map((scene, i) => (
              <span
                key={scene.id}
                className={`cinematic__navItem${i === active ? ' is-active' : ''}`}
              >
                <i />
                {scene.name}
              </span>
            ))}
          </nav>

          <div className="cinematic__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>

          <div
            className={`cinematic__hint${progress > 0.02 ? ' is-hidden' : ''}`}
            aria-hidden="true"
          >
            <span>Scroll to walk through</span>
            <ChevronDown size={18} className="animate-bounceArrow" />
          </div>
        </>
      )}
    </section>
  )
}
