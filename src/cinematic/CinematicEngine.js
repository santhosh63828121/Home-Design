import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ScrollController from './ScrollController.js'
import SceneManager from './SceneManager.js'
import CameraController from './CameraController.js'
import TransitionManager from './TransitionManager.js'
import AnimationController from './AnimationController.js'
import ThreeFX from './ThreeFX.js'
import { JOURNEY, SCENES } from './config.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * CinematicEngine
 * ---------------
 * The conductor. It reads the journey config and composes the focused
 * controllers into ONE pinned, scroll-scrubbed master timeline running on a
 * 0–100 scale (percent of the journey). All scene boundaries come from
 * config.js, so the film can be re-timed without touching this file.
 *
 * Per scene i the timeline lays down, in order:
 *   [b-8 … b+4]  connector (door / corner / focus) walking you INTO the room
 *   [b+4]        copy + title reveal
 *   [b+4 … next] the in-room camera move (dolly / pan / orbit)
 * and finally a pull-back exit + content release at JOURNEY.exitStart.
 *
 *   ScrollController → smooth scroll + velocity   SceneManager → DOM registry
 *   CameraController → camera moves, inertia, exposure
 *   TransitionManager → connected room hand-offs   AnimationController → reveals
 *   ThreeFX → atmosphere (dust, rays, flare, steam)
 */
const CONNECTOR_LEN = 12
const CONNECTOR_LEAD = 8 // how far before the boundary the connector begins

export default class CinematicEngine {
  constructor(refs) {
    this.refs = refs // { wrapper, stage, canvas, rig, flash, exitEl }
    this.onProgress = refs.onProgress
  }

  init() {
    // rig   → camera body: micro-movement transform + exposure filter
    // dolly → separate layer for the exit pull-back scale (avoids transform clash)
    const { wrapper, stage, canvas, camera: rig, dolly, flash, exitEl } = this.refs

    this.scroll = new ScrollController()
    this.scroll.init()

    this.manager = new SceneManager(SCENES, stage)
    this.camera = new CameraController(JOURNEY.perspective, JOURNEY.micro)
    this.transition = new TransitionManager()
    this.anim = new AnimationController()
    this.three = new ThreeFX(canvas, SCENES)
    this.three.init()

    const scenes = this.manager.scenes
    const count = this.manager.count
    const last = count - 1
    const exitStart = JOURNEY.exitStart
    this.exit = { el: exitEl }

    // Resting state.
    this.anim.prepare(scenes)
    this.anim.prepareExit(this.exit)
    scenes.forEach((s) => this.camera.prime(s))
    this.transition.prime(scenes)
    this.camera.applyExposure(rig, 0, scenes)
    if (flash) gsap.set(flash, { opacity: 0 })

    // ---- Build the master timeline (0–100) ----
    const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

    scenes.forEach((scene, i) => {
      const [start, end] = scene.data.range
      const moveStart = i === 0 ? 0 : start + 4
      const moveEnd = i === last ? exitStart : scenes[i + 1].data.range[0] - CONNECTOR_LEAD

      if (i > 0) {
        const at = start - CONNECTOR_LEAD // b-8
        this.transition.addTransition(tl, scenes[i - 1], scene, at, CONNECTOR_LEN, scene.data.enter)
        this.anim.addReveal(tl, scene, moveStart, moveEnd - moveStart)
        this._flash(tl, flash, start - 3)
      }

      this.camera.addMove(tl, scene, moveStart, Math.max(1, moveEnd - moveStart))
    })

    // ---- Final cinematic exit: camera pulls back to reveal the home ----
    this.anim.addExitReveal(tl, this.exit, exitStart, 100 - exitStart)
    tl.to(
      dolly,
      { scale: 0.62, yPercent: -4, ease: 'power2.inOut', duration: 100 - exitStart },
      exitStart,
    )
    tl.to(stage, { filter: 'brightness(0.55)', ease: 'power1.in', duration: 100 - exitStart }, exitStart)
    this.tl = tl

    // Hero (scene 0) reveals immediately on load.
    this.anim.introFirst(scenes[0])

    // ---- Pin + scrub ----
    this.st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: () => '+=' + window.innerHeight * JOURNEY.scrollLengthVh,
      pin: wrapper,
      pinSpacing: true,
      scrub: JOURNEY.scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl,
      onUpdate: (self) => {
        const sceneFloat = self.progress * count
        this.three.update(sceneFloat)
        this.three.setVelocity(this.scroll.velocity)
        this.camera.applyExposure(rig, sceneFloat, scenes)
        this.onProgress?.(self.progress)
      },
    })

    // Continuous camera life + atmosphere.
    this.camera.startMicro(rig, () => this.scroll.velocity)
    this.anim.startAmbient(scenes)

    this._onResize = () => this.three.resize()
    window.addEventListener('resize', this._onResize, { passive: true })

    this._refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400)
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }

  /** Brief light-flash punctuation at a room boundary. */
  _flash(tl, flash, at) {
    if (!flash) return
    tl.to(flash, { opacity: 0.45, ease: 'power2.in', duration: 1.5 }, at)
    tl.to(flash, { opacity: 0, ease: 'power2.out', duration: 2.5 }, at + 1.5)
  }

  scrollTo(target, opts) {
    this.scroll?.scrollTo(target, opts)
  }

  destroy() {
    clearTimeout(this._refreshTimer)
    window.removeEventListener('resize', this._onResize)
    this.camera?.destroy()
    this.st?.kill()
    this.tl?.kill()
    this.anim?.destroy()
    this.three?.dispose()
    this.scroll?.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}
