import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ScrollController from './ScrollController.js'
import HouseScene from './HouseScene.js'
import { JOURNEY, WAYPOINTS, ROOMS, DOOR_OPEN_RANGE } from './config.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * CinematicEngine
 * ---------------
 * Pins the viewport and maps scroll progress (0–1) onto the single virtual
 * camera that walks the 3D house. No timelines, no scene swaps — just one
 * continuous camera path. Lenis smooths the input; HouseScene adds inertia,
 * handheld motion, motion-blur and exposure.
 *
 * Debug: append ?cam=0.55 to freeze the camera at a path position (used for
 * verification screenshots of each room).
 */
export default class CinematicEngine {
  constructor({ wrapper, canvas, onProgress, onReady }) {
    this.wrapper = wrapper
    this.canvas = canvas
    this.onProgress = onProgress
    this.onReady = onReady
  }

  init() {
    this.scroll = new ScrollController()
    this.scroll.init()

    this.house = new HouseScene(this.canvas, {
      rooms: ROOMS,
      waypoints: WAYPOINTS,
      journey: JOURNEY,
      doorOpenRange: DOOR_OPEN_RANGE,
    })
    this.house.init()

    const camParam = parseFloat(new URLSearchParams(window.location.search).get('cam'))
    this._debug = Number.isFinite(camParam)
    if (this._debug) {
      this.house.jumpTo(camParam)
      this.onProgress?.(camParam)
    }

    this.st = ScrollTrigger.create({
      trigger: this.wrapper,
      start: 'top top',
      end: () => '+=' + window.innerHeight * JOURNEY.scrollLengthVh,
      pin: this.wrapper,
      pinSpacing: true,
      scrub: JOURNEY.scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (this._debug) return
        this.house.setProgress(self.progress)
        this.onProgress?.(self.progress)
      },
    })

    this._onResize = () => this.house.resize()
    window.addEventListener('resize', this._onResize, { passive: true })

    // Pause all WebGL rendering when the walkthrough scrolls out of view.
    this._io = new IntersectionObserver(([e]) => this.house.setVisible(e.isIntersecting), {
      threshold: 0,
    })
    this._io.observe(this.wrapper)

    this._refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400)
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

    // Signal "first frame painted" on the next rAF so the canvas can fade in
    // from the section background (opacity-only → no layout shift).
    requestAnimationFrame(() => this.onReady?.())
  }

  scrollTo(target, opts) {
    this.scroll?.scrollTo(target, opts)
  }

  destroy() {
    clearTimeout(this._refreshTimer)
    this._io?.disconnect()
    window.removeEventListener('resize', this._onResize)
    this.st?.kill()
    this.house?.dispose()
    this.scroll?.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}
