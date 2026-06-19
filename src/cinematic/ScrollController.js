import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollController
 * ----------------
 * Owns smooth scrolling (Lenis) and bridges it to GSAP's ScrollTrigger so that
 * pinned, scrubbed timelines stay perfectly in sync with momentum scrolling.
 *
 * Single responsibility: scroll input → a normalised, RAF-driven scroll stream.
 * Nothing in here knows about scenes or cameras.
 */
export default class ScrollController {
  constructor() {
    this.lenis = null
    this._tick = null
    this.enabled = false
  }

  /** Start Lenis and wire it into the GSAP ticker + ScrollTrigger. */
  init() {
    if (this.enabled) return
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    // Keep ScrollTrigger updating on every Lenis frame.
    this.lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker for a single, jank-free RAF loop.
    this._tick = (time) => this.lenis.raf(time * 1000)
    gsap.ticker.add(this._tick)
    gsap.ticker.lagSmoothing(0)

    this.enabled = true
    return this.lenis
  }

  /** Current scroll velocity (px/frame) — drives camera inertia + lens sway. */
  get velocity() {
    return this.lenis?.velocity || 0
  }

  /** Programmatic, eased scroll (used by CTA + nav). */
  scrollTo(target, opts = {}) {
    this.lenis?.scrollTo(target, { offset: 0, duration: 1.4, ...opts })
  }

  /** Pause/resume scrolling — used while a hard scene lock is desired. */
  stop() {
    this.lenis?.stop()
  }

  start() {
    this.lenis?.start()
  }

  destroy() {
    if (this._tick) gsap.ticker.remove(this._tick)
    this.lenis?.destroy()
    this.lenis = null
    this.enabled = false
  }
}
