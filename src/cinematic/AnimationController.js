import gsap from 'gsap'
import SplitType from 'split-type'

/**
 * AnimationController
 * -------------------
 * Content-level choreography inside each scene: cinematic line-by-line title
 * reveals (SplitType), the overlay copy/CTA rise (opacity 0→1, y 30→0), the
 * ambient cloud drift + light-ray pulse, and the final exit headline.
 * It does not own camera moves or room transitions.
 */
export default class AnimationController {
  constructor() {
    this.splits = []
    this.loops = []
  }

  /** Split titles into lines and stash the resting (hidden) state. */
  prepare(scenes) {
    scenes.forEach((scene) => {
      if (scene.title) {
        const split = new SplitType(scene.title, { types: 'lines', lineClass: 'cine-line' })
        scene.lines = split.lines || []
        this.splits.push(split)
        gsap.set(scene.lines, { yPercent: 120 })
      }
      gsap.set(scene.reveals, { autoAlpha: 0, y: 30 })
    })
  }

  /** One-time hero intro so Scene 1 reads on load (not gated behind scroll). */
  introFirst(scene) {
    const tl = gsap.timeline({ delay: 0.25 })
    if (scene.content) gsap.set(scene.content, { autoAlpha: 1 })
    if (scene.lines?.length) {
      tl.to(scene.lines, { yPercent: 0, ease: 'power3.out', duration: 1.1, stagger: 0.14 })
    }
    if (scene.reveals?.length) {
      tl.to(
        scene.reveals,
        { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.8, stagger: 0.12 },
        0.35,
      )
    }
    this.loops.push(tl)
  }

  /** Scrubbed in-scene reveal for scenes 2–5. */
  addReveal(tl, scene, at, dur) {
    if (scene.content) {
      tl.to(scene.content, { autoAlpha: 1, ease: 'none', duration: dur * 0.2 }, at)
    }
    if (scene.lines?.length) {
      tl.to(
        scene.lines,
        { yPercent: 0, ease: 'power3.out', duration: dur * 0.7, stagger: dur * 0.12 },
        at + dur * 0.05,
      )
    }
    if (scene.reveals?.length) {
      tl.to(
        scene.reveals,
        { autoAlpha: 1, y: 0, ease: 'power2.out', duration: dur * 0.5, stagger: dur * 0.12 },
        at + dur * 0.25,
      )
    }
    // Fade the copy back out as we leave the room so it doesn't bleed into the
    // next reveal during the connector.
    if (scene.content) {
      tl.to(scene.content, { autoAlpha: 0, ease: 'power1.in', duration: dur * 0.18 }, at + dur * 0.82)
    }
  }

  /** Exit headline rises as the camera pulls back. */
  addExitReveal(tl, exit, at, dur) {
    if (!exit?.el) return
    tl.fromTo(
      exit.el,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'power2.out', duration: dur * 0.5, immediateRender: false },
      at,
    )
    if (exit.lines?.length) {
      tl.fromTo(
        exit.lines,
        { yPercent: 120 },
        { yPercent: 0, ease: 'power3.out', duration: dur * 0.6, stagger: dur * 0.08, immediateRender: false },
        at + dur * 0.1,
      )
    }
    if (exit.sub) {
      tl.fromTo(
        exit.sub,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, ease: 'power2.out', duration: dur * 0.4, immediateRender: false },
        at + dur * 0.4,
      )
    }
  }

  /** Continuous ambient motion (scroll-independent). */
  startAmbient(scenes) {
    scenes.forEach((scene) => {
      if (scene.clouds) {
        this.loops.push(
          gsap.to(scene.clouds, {
            backgroundPositionX: '-1200px',
            duration: 90,
            ease: 'none',
            repeat: -1,
          }),
        )
      }
      if (scene.ray) {
        this.loops.push(
          gsap.to(scene.ray, {
            opacity: 0.8,
            duration: 4.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }),
        )
      }
    })
  }

  /** Split the exit headline so it can rise line by line. */
  prepareExit(exit) {
    if (!exit?.el) return
    const titleEl = exit.el.querySelector('[data-exit-title]')
    if (titleEl) {
      const split = new SplitType(titleEl, { types: 'lines', lineClass: 'cine-line' })
      exit.lines = split.lines || []
      this.splits.push(split)
    }
    exit.sub = exit.el.querySelector('[data-exit-sub]')
  }

  destroy() {
    this.loops.forEach((l) => l.kill())
    this.splits.forEach((s) => s.revert())
    this.loops = []
    this.splits = []
  }
}
