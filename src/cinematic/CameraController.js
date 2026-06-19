import gsap from 'gsap'

/**
 * CameraController
 * ----------------
 * Behaves like a real cinema camera moving through the house. Room imagery is
 * flat, so camera language is expressed as GPU-accelerated CSS-3D transforms on
 * each scene's media layer (dolly = scale, push = translateZ, corner turn =
 * rotationY, pan = translate) plus an exposure adapt on the camera rig.
 *
 * On top of the scrubbed moves it runs a continuous, damped "hand-held" layer:
 * idle micro-drift + scroll-velocity sway, so motion never feels robotic.
 */
export default class CameraController {
  constructor(perspective = 1500, micro = {}) {
    this.perspective = perspective
    this.micro = { idleAmp: 6, idleSpeed: 0.25, velAmp: 0.06, damp: 0.06, ...micro }
    this._tick = null
    this._cur = { x: 0, y: 0 }
    this._set = null
  }

  /** Resting transform for a scene's media so nothing pops before its segment. */
  prime(scene) {
    if (!scene.media) return
    const c = scene.data.camera || {}
    gsap.set(scene.media, {
      transformPerspective: this.perspective,
      transformOrigin: '50% 50%',
      scale: c.dolly?.[0] ?? 1.1,
      rotationY: c.rotateY?.[0] ?? 0,
      z: 0,
      xPercent: 0,
      yPercent: 0,
      force3D: true,
    })
  }

  /**
   * Add the in-room camera move (dolly + pan + subtle orbit) to the timeline.
   * @param {gsap.core.Timeline} tl
   * @param {object} scene  resolved scene
   * @param {number} at     timeline position (0–100)
   * @param {number} dur    duration in timeline units
   */
  addMove(tl, scene, at, dur) {
    if (!scene.media) return
    const c = scene.data.camera || {}
    tl.fromTo(
      scene.media,
      { scale: c.dolly?.[0] ?? 1.1, rotationY: c.rotateY?.[0] ?? 0, xPercent: 0, yPercent: 0 },
      {
        scale: c.dolly?.[1] ?? 1.0,
        rotationY: c.rotateY?.[1] ?? 0,
        xPercent: c.pan?.x ?? 0,
        yPercent: c.pan?.y ?? 0,
        ease: 'none',
        duration: dur,
        immediateRender: false,
      },
      at,
    )
  }

  /**
   * Exposure adaptation — the camera brightness eases to each room's level.
   * Driven per-frame from the scroll handler (interpolated like the FX mood)
   * rather than via a CSS-var tween, which avoids GSAP custom-property quirks.
   */
  applyExposure(rig, sceneFloat, scenes) {
    if (!rig) return
    const max = scenes.length - 1
    const f = Math.max(0, Math.min(max, sceneFloat))
    const a = Math.floor(f)
    const b = Math.min(max, a + 1)
    const t = f - a
    const ea = scenes[a].data.exposure ?? 1
    const eb = scenes[b].data.exposure ?? 1
    rig.style.filter = `brightness(${(ea + (eb - ea) * t).toFixed(3)})`
  }

  /** Continuous damped hand-held layer on the camera rig. */
  startMicro(rig, getVelocity) {
    if (!rig) return
    this._set = gsap.quickSetter(rig, 'css')
    this._tick = (time) => {
      const m = this.micro
      const idleX = Math.sin(time * m.idleSpeed) * m.idleAmp
      const idleY = Math.cos(time * m.idleSpeed * 0.8) * m.idleAmp * 0.6
      const vel = (getVelocity?.() || 0) * m.velAmp
      const tx = idleX + vel
      const ty = idleY
      this._cur.x += (tx - this._cur.x) * m.damp
      this._cur.y += (ty - this._cur.y) * m.damp
      this._set({ transform: `translate3d(${this._cur.x}px, ${this._cur.y}px, 0)` })
    }
    gsap.ticker.add(this._tick)
  }

  destroy() {
    if (this._tick) gsap.ticker.remove(this._tick)
    this._tick = null
  }
}
