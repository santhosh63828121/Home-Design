import gsap from 'gsap'

/**
 * TransitionManager
 * -----------------
 * Owns the architectural hand-off between rooms — the moments that make the
 * five scenes feel like ONE connected house instead of stacked slides.
 *
 * Each connector type is a different real-world move:
 *   pivot-door   → wooden front door swings open, warm light spills, push in
 *   slide-door   → glass spa door slides apart, cool light, push in
 *   corner-turn  → whip around a hallway corner, a wall column wipes past
 *   focus-pull   → foreground blurs, focus racks onto the next room
 *
 * Every connector ends with a "push-through": the incoming room arrives
 * slightly oversized + soft, then settles sharp — the feeling of stepping in.
 */
export default class TransitionManager {
  /** Initial state: only scene 0 visible; all doors closed + hidden. */
  prime(scenes) {
    scenes.forEach((scene, i) => {
      gsap.set(scene.root, { autoAlpha: i === 0 ? 1 : 0 })
      if (scene.door) gsap.set(scene.door, { autoAlpha: 0 })
      if (scene.doorLeaves?.length) gsap.set(scene.doorLeaves, { rotationY: 0, xPercent: 0 })
      if (scene.doorLight) gsap.set(scene.doorLight, { opacity: 0 })
      if (scene.fg) gsap.set(scene.fg, { xPercent: 130, autoAlpha: 0 })
    })
  }

  addTransition(tl, from, to, at, dur, enter) {
    const type = enter?.type || 'pivot-door'
    // Reveal incoming scene root for the whole connector window.
    tl.set(to.root, { autoAlpha: 1 }, at)

    switch (type) {
      case 'corner-turn':
        this._corner(tl, from, to, at, dur, enter)
        break
      case 'focus-pull':
        this._focus(tl, from, to, at, dur)
        break
      case 'slide-door':
        this._door(tl, from, to, at, dur, enter, 'slide')
        break
      case 'pivot-door':
      default:
        this._door(tl, from, to, at, dur, enter, 'pivot')
    }
  }

  /** Shared: incoming room steps in oversized + soft, settles sharp. */
  _pushThrough(tl, to, at, dur, fromScale = 0.16, fromBlur = 12) {
    const base = to.data.camera?.dolly?.[0] ?? 1.15
    tl.fromTo(
      to.media,
      { scale: base + fromScale, filter: `blur(${fromBlur}px)` },
      {
        scale: base,
        filter: 'blur(0px)',
        ease: 'power2.out',
        duration: dur,
        immediateRender: false,
      },
      at,
    )
  }

  /** Wooden pivot OR glass sliding door opening with a light spill. */
  _door(tl, from, to, at, dur, enter, mode) {
    const fromBase = from.data.camera?.dolly?.[1] ?? 1
    // Outgoing: dolly toward the doorway, then dissolve.
    tl.to(from.media, { scale: fromBase + 0.22, ease: 'power1.in', duration: dur }, at)
    tl.to(from.root, { autoAlpha: 0, ease: 'power1.inOut', duration: dur * 0.55 }, at + dur * 0.4)

    if (to.door) {
      tl.set(to.door, { autoAlpha: 1 }, at)
      tl.to(to.door, { autoAlpha: 0, ease: 'power1.in', duration: dur * 0.25 }, at + dur * 0.7)
    }
    // Light spilling from the room beyond.
    if (to.doorLight) {
      tl.fromTo(
        to.doorLight,
        { opacity: 0 },
        { opacity: 0.95, ease: 'power2.in', duration: dur * 0.5, immediateRender: false },
        at + dur * 0.1,
      )
      tl.to(to.doorLight, { opacity: 0, ease: 'power1.out', duration: dur * 0.3 }, at + dur * 0.65)
    }
    // The leaves open.
    if (to.doorLeaves?.length === 2) {
      const [l, r] = to.doorLeaves
      if (mode === 'slide') {
        tl.fromTo(
          l,
          { xPercent: 0 },
          { xPercent: -108, ease: 'power3.inOut', duration: dur * 0.6, immediateRender: false },
          at + dur * 0.15,
        )
        tl.fromTo(
          r,
          { xPercent: 0 },
          { xPercent: 108, ease: 'power3.inOut', duration: dur * 0.6, immediateRender: false },
          at + dur * 0.15,
        )
      } else {
        tl.fromTo(
          l,
          { rotationY: 0 },
          { rotationY: -108, ease: 'power2.inOut', duration: dur * 0.62, immediateRender: false },
          at + dur * 0.15,
        )
        tl.fromTo(
          r,
          { rotationY: 0 },
          { rotationY: 108, ease: 'power2.inOut', duration: dur * 0.62, immediateRender: false },
          at + dur * 0.15,
        )
      }
    }
    // Step through the doorway.
    this._pushThrough(tl, to, at + dur * 0.3, dur * 0.7, 0.18, 10)
  }

  /** Whip around a corner: outgoing turns + blurs, a column wipes past. */
  _corner(tl, from, to, at, dur, enter) {
    const turn = enter?.turn ?? 16
    tl.to(
      from.media,
      { rotationY: -turn, xPercent: -14, filter: 'blur(7px)', ease: 'power2.in', duration: dur * 0.55 },
      at,
    )
    tl.to(from.root, { autoAlpha: 0, ease: 'power1.in', duration: dur * 0.4 }, at + dur * 0.45)

    // Foreground architectural column sweeps across (parallax reveal).
    if (to.fg) {
      tl.fromTo(
        to.fg,
        { xPercent: 130, autoAlpha: 1 },
        { xPercent: -130, ease: 'power2.inOut', duration: dur * 0.8, immediateRender: false },
        at + dur * 0.1,
      )
      tl.set(to.fg, { autoAlpha: 0 }, at + dur * 0.9)
    }
    // Incoming swings in from the turn and straightens.
    const base = to.data.camera?.dolly?.[0] ?? 1.2
    tl.fromTo(
      to.media,
      { scale: base + 0.16, rotationY: turn + 8, xPercent: 16, filter: 'blur(9px)' },
      {
        scale: base,
        rotationY: to.data.camera?.rotateY?.[0] ?? 0,
        xPercent: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        duration: dur * 0.75,
        immediateRender: false,
      },
      at + dur * 0.25,
    )
  }

  /** Rack focus: foreground softens, focus pulls onto the next room. */
  _focus(tl, from, to, at, dur) {
    const fromBase = from.data.camera?.dolly?.[1] ?? 1
    tl.to(
      from.media,
      { filter: 'blur(14px)', scale: fromBase + 0.14, autoAlpha: 0, ease: 'power2.inOut', duration: dur * 0.6 },
      at,
    )
    this._pushThrough(tl, to, at + dur * 0.2, dur * 0.8, 0.1, 16)
  }
}
