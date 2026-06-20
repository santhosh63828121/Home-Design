import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import CameraPath from './CameraPath.js'

const H = 3.1 // wall height
const T = 0.18 // wall thickness
const DOOR_W = 1.7
const DOOR_H = 2.35

/**
 * HouseScene
 * ----------
 * A single procedural luxury home in Three.js — connected rooms with real
 * doorways, stylised furniture, warm lighting and light spill. One perspective
 * camera travels the CameraPath on scroll with inertia, handheld micro-motion,
 * exposure adaptation and motion-blur (AfterimagePass) that strengthens on
 * turns. The walkthrough never cuts: the movement itself hides every "join".
 */
export default class HouseScene {
  constructor(canvas, cfg) {
    this.canvas = canvas
    this.rooms = cfg.rooms
    this.journey = cfg.journey
    this.doorRange = cfg.doorOpenRange
    this.path = new CameraPath(cfg.waypoints)
    this.disposed = false
    this.curT = 0
    this.targetT = 0
    this.prevT = 0
    this.time = 0
    this.mobile = window.innerWidth < 768

    // Scratch vectors (no per-frame allocations).
    this._pos = new THREE.Vector3()
    this._look = new THREE.Vector3()
    this._dir = new THREE.Vector3()
    this._prevDir = new THREE.Vector3(0, 0, -1)
    this._tmp = new THREE.Vector3()
  }

  init() {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: !this.mobile, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = this.rooms[0].exposure
    renderer.shadowMap.enabled = !this.mobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer = renderer

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#0a0806')
    this.scene.fog = new THREE.Fog('#0c0a07', 16, 64)

    this.camera = new THREE.PerspectiveCamera(this.journey.perspectiveFov, 1, 0.1, 220)

    this._materials()
    this._buildShell()
    this._buildFurniture()
    this._lights()
    this._composer()
    this.resize()
    this._loop()
  }

  // ---- Materials --------------------------------------------------------
  _materials() {
    this.mat = {
      wall: new THREE.MeshStandardMaterial({ color: '#c8bca9', roughness: 0.95 }),
      accent: new THREE.MeshStandardMaterial({ color: '#241f1b', roughness: 0.85 }),
      marble: new THREE.MeshStandardMaterial({ color: '#e9e6df', roughness: 0.3, metalness: 0.05 }),
      wood: new THREE.MeshStandardMaterial({ color: '#6a4a2e', roughness: 0.6 }),
      woodDark: new THREE.MeshStandardMaterial({ color: '#3f2c1a', roughness: 0.55 }),
      ceiling: new THREE.MeshStandardMaterial({ color: '#1a1714', roughness: 1 }),
      fabric: new THREE.MeshStandardMaterial({ color: '#a99c89', roughness: 0.9 }),
      dark: new THREE.MeshStandardMaterial({ color: '#16140f', roughness: 0.6, metalness: 0.2 }),
      gold: new THREE.MeshStandardMaterial({ color: '#c9a86a', roughness: 0.35, metalness: 0.7 }),
      green: new THREE.MeshStandardMaterial({ color: '#2d6a5a', roughness: 0.6 }),
      leaf: new THREE.MeshStandardMaterial({ color: '#3a5a3a', roughness: 0.8 }),
      glassWarm: new THREE.MeshStandardMaterial({ color: '#ffe9c4', emissive: '#ffdca0', emissiveIntensity: 1.4, roughness: 1 }),
      glassCool: new THREE.MeshStandardMaterial({ color: '#dbe9f5', emissive: '#bcd8f5', emissiveIntensity: 1.5, roughness: 1 }),
      lamp: new THREE.MeshStandardMaterial({ color: '#fff2d8', emissive: '#ffdfa6', emissiveIntensity: 2.2, roughness: 1 }),
    }
  }

  // ---- Geometry helpers -------------------------------------------------
  _box(w, h, d, x, y, z, m, cast = true, recv = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
    mesh.position.set(x, y, z)
    mesh.castShadow = cast && this.renderer.shadowMap.enabled
    mesh.receiveShadow = recv && this.renderer.shadowMap.enabled
    this.scene.add(mesh)
    return mesh
  }

  /**
   * Wall centred at (cx,cz). alongX → runs in x; else runs in z.
   * opening: { gap, at } cuts a centred doorway (left/right jambs + lintel).
   */
  _wall(cx, cz, len, alongX, m = this.mat.wall, opening = null) {
    const place = (segLen, off) => {
      if (segLen <= 0.01) return
      if (alongX) this._box(segLen, H, T, cx + off, H / 2, cz, m, false, true)
      else this._box(T, H, segLen, cx, H / 2, cz + off, m, false, true)
    }
    if (!opening) {
      place(len, 0)
      return
    }
    const { gap, at = 0 } = opening
    const half = len / 2
    const leftLen = at - gap / 2 - -half // from -half to at-gap/2
    const rightLen = half - (at + gap / 2)
    place(leftLen, (-half + (at - gap / 2)) / 2)
    place(rightLen, (at + gap / 2 + half) / 2)
    // Lintel above the doorway.
    const lintelH = H - DOOR_H
    if (alongX) this._box(gap, lintelH, T, cx + at, DOOR_H + lintelH / 2, cz, m, false, false)
    else this._box(T, lintelH, gap, cx, DOOR_H + lintelH / 2, cz + at, m, false, false)
  }

  _floor(x1, z1, x2, z2, m) {
    const w = Math.abs(x2 - x1)
    const d = Math.abs(z2 - z1)
    this._box(w, 0.1, d, (x1 + x2) / 2, -0.05, (z1 + z2) / 2, m, false, true)
  }

  _ceiling(x1, z1, x2, z2) {
    const w = Math.abs(x2 - x1)
    const d = Math.abs(z2 - z1)
    this._box(w, 0.1, d, (x1 + x2) / 2, H + 0.05, (z1 + z2) / 2, this.mat.ceiling, false, false)
  }

  _window(cx, cz, w, alongX, cool = false) {
    const m = cool ? this.mat.glassCool : this.mat.glassWarm
    if (alongX) this._box(w, 1.8, 0.06, cx, 1.7, cz, m, false, false)
    else this._box(0.06, 1.8, w, cx, 1.7, cz, m, false, false)
  }

  _plant(x, z, scale = 1) {
    this._box(0.5 * scale, 0.5 * scale, 0.5 * scale, x, 0.25 * scale, z, this.mat.dark)
    const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * scale, 1), this.mat.leaf)
    foliage.position.set(x, 0.95 * scale, z)
    foliage.castShadow = this.renderer.shadowMap.enabled
    this.scene.add(foliage)
  }

  // ---- House shell ------------------------------------------------------
  _buildShell() {
    const M = this.mat
    // Floors (marble vs wood per room).
    this._floor(-3, 0, 3, -6, M.wood) // foyer
    this._floor(-5, -6, 5, -15, M.marble) // living
    this._floor(5, -7, 15, -16, M.marble) // kitchen
    this._floor(5, -16, 15, -26, M.wood) // bedroom
    this._floor(-5, -16, 5, -26, M.marble) // bathroom

    // Ceilings.
    this._ceiling(-3, 0, 3, -6)
    this._ceiling(-5, -6, 5, -15)
    this._ceiling(5, -7, 15, -16)
    this._ceiling(5, -16, 15, -26)
    this._ceiling(-5, -16, 5, -26)

    // Front wall + door opening (foyer south, z=0).
    this._wall(0, 0, 6, true, M.wall, { gap: DOOR_W, at: 0 })
    // Foyer sides.
    this._wall(-3, -3, 6, false, M.wall)
    this._wall(3, -3, 6, false, M.wall)
    // Foyer ↔ Living (z=-6), doorway centred.
    this._wall(0, -6, 10, true, M.wall, { gap: 2.0, at: 0 })
    // Living exterior.
    this._wall(-5, -10.5, 9, false, M.wall) // west (window)
    this._wall(0, -15, 10, true, M.accent) // north accent wall (TV)
    // Living ↔ Kitchen (x=5, z -6..-16), doorway at z=-12 (local -1).
    this._wall(5, -11, 10, false, M.wall, { gap: 2.0, at: -1 })
    // Kitchen exterior.
    this._wall(10, -7, 10, true, M.wall) // south (window)
    this._wall(15, -11.5, 9, false, M.wall) // east (window)
    // Kitchen ↔ Bedroom (z=-16), doorway at x=10 (local 0).
    this._wall(10, -16, 10, true, M.wall, { gap: 2.0, at: 0 })
    // Bedroom exterior.
    this._wall(15, -21, 10, false, M.wall) // east (window)
    this._wall(10, -26, 10, true, M.accent) // north accent (headboard)
    // Bedroom ↔ Bathroom (x=5), doorway at z=-21 (local 0).
    this._wall(5, -21, 10, false, M.wall, { gap: 2.0, at: 0 })
    // Bathroom exterior.
    this._wall(-5, -21, 10, false, M.wall) // west (window)
    this._wall(0, -26, 10, true, M.wall) // north
    this._wall(0, -16, 10, true, M.wall) // south

    // Windows (emissive + spill light handled in _lights).
    this._window(-5, -10.5, 5, false, true) // living west, cool daylight
    this._window(0, -15, 6, true, false) // living north warm
    this._window(15, -21, 5, false, false) // bedroom east warm
    this._window(-5, -21, 5, false, true) // bathroom west cool
    this._window(15, -11.5, 4, false, true) // kitchen east cool

    // Front door leaf (pivots open).
    const pivot = new THREE.Group()
    pivot.position.set(-DOOR_W / 2, 0, 0)
    const leaf = this._box(DOOR_W, DOOR_H, 0.08, DOOR_W / 2, DOOR_H / 2, 0, M.woodDark)
    this.scene.remove(leaf)
    pivot.add(leaf)
    this._box(0.05, 0.4, 0.05, DOOR_W - 0.18, DOOR_H / 2, 0.08, M.gold) // handle (added to scene, near door)
    this.scene.add(pivot)
    this.frontDoor = pivot

    // Outdoor ground + a warm path slab for the entrance shot.
    this._box(60, 0.1, 40, 0, -0.06, 12, new THREE.MeshStandardMaterial({ color: '#1c1a16', roughness: 1 }), false, true)
  }

  // ---- Furniture --------------------------------------------------------
  _buildFurniture() {
    const M = this.mat
    // Foyer: console + mirror + plant.
    this._box(1.6, 0.85, 0.4, 0, 0.42, -5.6, M.woodDark)
    const mirror = this._box(0.9, 1.4, 0.05, 0, 1.7, -5.95, M.gold)
    mirror.scale.set(1, 1, 1)
    this._plant(2.4, -5.4, 1)

    // Living room: sofa, coffee table, rug, TV unit, pendant, plant.
    this._box(6, 0.06, 4, 0, 0.02, -10.5, M.green, false, true) // rug
    // sofa facing the TV wall (north): seat at z≈-8 facing -z
    this._box(3.2, 0.45, 1.1, 0, 0.35, -8.2, M.fabric) // seat base
    this._box(3.2, 0.6, 0.3, 0, 0.75, -7.75, M.fabric) // backrest
    this._box(0.3, 0.55, 1.1, -1.6, 0.6, -8.2, M.fabric) // arm L
    this._box(0.3, 0.55, 1.1, 1.6, 0.6, -8.2, M.fabric) // arm R
    this._box(1.4, 0.18, 0.7, 0, 0.5, -9.6, M.woodDark) // coffee table top
    this._box(2.8, 0.5, 0.45, 0, 0.45, -14.6, M.woodDark) // TV unit
    this._box(2.0, 1.1, 0.06, 0, 1.5, -14.85, M.dark) // TV
    this._plant(-4, -7, 1.2)
    // pendant
    this._box(0.5, 0.12, 0.5, 0, 2.5, -10.5, M.lamp)

    // Kitchen: island + counter + cabinets + stools + pendants.
    this._box(2.6, 0.9, 1.2, 10, 0.45, -11.5, M.woodDark) // island base
    this._box(2.8, 0.1, 1.4, 10, 0.95, -11.5, M.marble) // island top
    this._box(4.5, 0.9, 0.6, 12.4, 0.45, -7.6, M.woodDark) // base cabinets (south wall)
    this._box(4.5, 0.1, 0.6, 12.4, 0.95, -7.6, M.marble) // counter
    this._box(4.5, 0.7, 0.35, 12.4, 2.2, -7.4, M.wood) // upper cabinets
    for (const sx of [-0.8, 0.8]) this._box(0.4, 0.6, 0.4, 10 + sx, 0.3, -10.6, M.dark) // stools
    for (const px of [-0.7, 0.7]) this._box(0.18, 0.35, 0.18, 10 + px, 2.3, -11.5, M.lamp) // pendants

    // Bedroom: bed, headboard, nightstands, lamps, rug, wardrobe.
    this._box(5, 0.06, 4, 10, 0.02, -21, M.wood, false, true) // rug
    this._box(2.6, 0.45, 3.0, 10, 0.32, -22.2, M.woodDark) // bed base
    this._box(2.6, 0.25, 3.0, 10, 0.65, -22.2, M.fabric) // mattress
    this._box(2.7, 1.0, 0.2, 10, 1.0, -25.6, M.fabric) // headboard
    for (const dx of [-1.0, 1.0]) {
      this._box(0.7, 0.4, 0.5, 10 + dx, 0.35, -23.6, M.woodDark) // pillows row
    }
    for (const nx of [-1.8, 1.8]) {
      this._box(0.6, 0.5, 0.5, 10 + nx, 0.3, -25.2, M.woodDark) // nightstand
      this._box(0.2, 0.4, 0.2, 10 + nx, 0.85, -25.2, M.lamp) // lamp
    }
    this._box(2.4, 2.4, 0.6, 14.4, 1.2, -21, M.wood) // wardrobe (east)

    // Bathroom: tub, vanity, mirror, plant.
    this._box(1.9, 0.6, 0.9, 0, 0.32, -21, M.marble) // bathtub outer
    this._box(1.6, 0.4, 0.65, 0, 0.45, -21, M.dark) // tub inner (water cavity)
    this._box(2.0, 0.85, 0.55, -4.4, 0.42, -19, M.woodDark) // vanity
    this._box(2.0, 0.1, 0.55, -4.4, 0.9, -19, M.marble) // vanity top
    this._box(1.4, 1.2, 0.05, -4.85, 1.8, -19, M.glassCool) // mirror (glow)
    this._plant(-4, -24, 1)
  }

  // ---- Lights -----------------------------------------------------------
  _point(color, intensity, dist, x, y, z) {
    const l = new THREE.PointLight(color, intensity, dist, 2)
    l.position.set(x, y, z)
    this.scene.add(l)
    return l
  }

  _lights() {
    const shadows = this.renderer.shadowMap.enabled
    this.scene.add(new THREE.HemisphereLight('#fff0dd', '#1a120a', 0.55))

    // Outdoor sun for the entrance approach.
    const sun = new THREE.DirectionalLight('#ffdca0', 1.4)
    sun.position.set(6, 10, 14)
    if (shadows) {
      sun.castShadow = true
      sun.shadow.mapSize.set(1024, 1024)
      sun.shadow.camera.near = 1
      sun.shadow.camera.far = 60
      sun.shadow.camera.left = -20
      sun.shadow.camera.right = 20
      sun.shadow.camera.top = 20
      sun.shadow.camera.bottom = -20
    }
    this.scene.add(sun)

    // Warm room fills.
    this._point('#ffdca0', 22, 16, 0, 2.7, -4) // foyer / door spill
    this._point('#ffe6c0', 30, 22, 0, 2.7, -10.5) // living
    this._point('#cfe2f5', 14, 16, -5, 1.8, -10.5) // living window (cool spill)
    this._point('#ffe6c0', 26, 20, 10, 2.7, -11.5) // kitchen
    this._point('#ffd9a0', 24, 22, 10, 2.7, -21) // bedroom
    this._point('#ffcf95', 10, 8, 10, 1.0, -25.2) // bedroom lamps glow
    this._point('#dbeaff', 22, 20, 0, 2.6, -21) // bathroom
    this._point('#cfe2f5', 12, 14, -5, 1.8, -21) // bathroom window

    // Shadow-casting key spot in the living room for grounded furniture.
    if (shadows) {
      const spot = new THREE.SpotLight('#fff0d6', 60, 24, Math.PI / 4, 0.5, 1.5)
      spot.position.set(0, 3, -10.5)
      spot.target.position.set(0, 0, -10.5)
      spot.castShadow = true
      spot.shadow.mapSize.set(1024, 1024)
      this.scene.add(spot, spot.target)
    }
  }

  // ---- Post-processing --------------------------------------------------
  _composer() {
    const composer = new EffectComposer(this.renderer)
    composer.addPass(new RenderPass(this.scene, this.camera))
    this.afterimage = new AfterimagePass(0.0)
    this.afterimage.uniforms.damp.value = 0.0
    composer.addPass(this.afterimage)
    composer.addPass(new OutputPass())
    this.composer = composer
  }

  // ---- Drive ------------------------------------------------------------
  /** Called from the scroll handler. Sets the target; the loop eases to it. */
  setProgress(t) {
    this.targetT = THREE.MathUtils.clamp(t, 0, 1)
  }

  /** Jump immediately (used by the ?cam= debug param). */
  jumpTo(t) {
    this.curT = this.targetT = this.prevT = THREE.MathUtils.clamp(t, 0, 1)
  }

  _exposureAt(t) {
    const r = this.rooms.find((rm) => t >= rm.range[0] && t < rm.range[1])
    return (r || this.rooms[this.rooms.length - 1]).exposure
  }

  _loop = () => {
    if (this.disposed) return
    this.time += 0.016
    const J = this.journey

    // Inertia: ease current progress toward the scroll target (momentum).
    this.curT += (this.targetT - this.curT) * J.inertia
    const speed = Math.min(1, Math.abs(this.curT - this.prevT) * 140)

    this.path.sample(this.curT, this._pos, this._look)

    // Handheld micro-movement + walking bob (scaled by speed).
    const t = this.time
    this._pos.x += Math.sin(t * 1.3) * 0.022 + Math.sin(t * 0.7) * 0.016
    this._pos.y += Math.cos(t * 1.1) * 0.014 + Math.sin(t * 9) * 0.02 * speed
    this._look.x += Math.sin(t * 0.9) * 0.05
    this._look.y += Math.cos(t * 1.2) * 0.035

    this.camera.position.copy(this._pos)
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(this._look)

    // Signed turn rate → roll (lean into turns) + motion-blur strength.
    this._dir.copy(this._look).sub(this._pos).normalize()
    const turn = this._prevDir.angleTo(this._dir)
    this._tmp.crossVectors(this._prevDir, this._dir)
    const roll = THREE.MathUtils.clamp(-this._tmp.y * 6, -0.05, 0.05) + Math.sin(t * 0.6) * 0.004
    this.camera.rotateZ(roll)
    this._prevDir.copy(this._dir)

    // Motion blur strengthens during turns.
    if (this.afterimage) {
      const target = THREE.MathUtils.clamp(turn * 22 + speed * 0.12, 0, 0.72)
      const d = this.afterimage.uniforms.damp
      d.value += (target - d.value) * 0.2
    }

    // Exposure adaptation per room.
    const targetExp = this._exposureAt(this.curT)
    this.renderer.toneMappingExposure += (targetExp - this.renderer.toneMappingExposure) * 0.04

    // Front door swings open as the camera approaches.
    const [d0, d1] = this.doorRange
    const dp = THREE.MathUtils.smoothstep(this.curT, d0, d1)
    if (this.frontDoor) this.frontDoor.rotation.y = -dp * Math.PI * 0.52

    this.prevT = this.curT
    this.composer.render()
    this._raf = requestAnimationFrame(this._loop)
  }

  resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h, false)
    this.composer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this._raf)
    this.scene?.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach((m) => m.dispose())
      }
    })
    this.composer?.dispose?.()
    this.renderer?.dispose()
  }
}
