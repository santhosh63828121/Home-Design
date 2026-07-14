import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import CameraPath from './CameraPath.js'
import { ASSETS, PROPS, LIGHTING, POST } from './config.js'
import * as TEX from './textures.js'

const H = 3.1
const T = 0.18
const DOOR_W = 1.7
const DOOR_H = 2.35

/**
 * HouseScene — a PBR luxury home with an optional real-asset path.
 *
 * Procedural mode (default): per-room palettes, marble/wood/fabric with normal
 * maps, RectAreaLights + warm coves, image-based lighting (RoomEnvironment),
 * fake contact shadows, subtle bloom, ACES + sRGB. Honest ceiling: premium
 * stylised ArchViz.
 *
 * Asset mode (config.ASSETS): set a GLTF `model` and/or `.hdr` `hdri` and the
 * camera walks a real, photoreal model instead — same path, no engine changes.
 */
export default class HouseScene {
  constructor(canvas, cfg) {
    this.canvas = canvas
    this.rooms = cfg.rooms
    this.journey = cfg.journey
    this.doorRange = cfg.doorOpenRange
    this.path = new CameraPath(cfg.waypoints)
    this.disposed = false
    this.curT = this.targetT = this.prevT = 0
    this.time = 0
    this.mobile = window.innerWidth < 768
    this.procLights = []
    /** Interior fills only (not sun/hemi) — these "turn on" as evening falls. */
    this.interiorLights = []
    this._duskT = -1 // last applied dusk value; skips redundant light updates
    this._sunDay = new THREE.Color(LIGHTING.sun.dayColor)
    this._sunDusk = new THREE.Color(LIGHTING.sun.duskColor)

    // On-demand rendering state. The loop runs only while the camera is settling
    // toward a new scroll target (or just received input) AND the section is
    // visible; when static it idles on the last frame. This keeps the main thread
    // free instead of rendering WebGL every frame forever (huge TBT win on
    // mobile). Scroll input wakes it again via setProgress().
    this._running = false
    this._visible = true
    this._raf = 0
    this._lastInputMs = 0

    this._pos = new THREE.Vector3()
    this._look = new THREE.Vector3()
    this._dir = new THREE.Vector3()
    this._prevDir = new THREE.Vector3(0, 0, -1)
    this._tmp = new THREE.Vector3()
  }

  init() {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: !this.mobile, powerPreference: 'high-performance' })
    // Mobile renders at 1:1 pixel ratio — on phones the fragment cost scales with
    // the square of DPR, and 1.0 vs 1.5 is a ~2.25x reduction in pixels shaded.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1 : 2))
    renderer.useLegacyLights = false
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = this.rooms[0].exposure
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = !this.mobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer = renderer
    this.aniso = renderer.capabilities.getMaxAnisotropy()

    RectAreaLightUniformsLib.init()

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#0a0806')
    this.scene.fog = new THREE.Fog('#0c0a07', 22, 80)

    this.pmrem = new THREE.PMREMGenerator(renderer)
    this.scene.environment = this.pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    this.camera = new THREE.PerspectiveCamera(this.journey.perspectiveFov, 1, 0.1, 240)

    this.houseGroup = new THREE.Group()
    this.scene.add(this.houseGroup)

    // ── COOPERATIVE BUILD ────────────────────────────────────────────────
    // Building this house used to be ONE synchronous task. Measured on desktop:
    // 2,000-2,800ms of blocked main thread, which capped the page's Lighthouse
    // Performance at 49-60 no matter what else was optimised. A task is only
    // "blocking" for the time it runs beyond 50ms, so a single 2s task costs
    // ~1,950ms of Total Blocking Time — while the same work split into many
    // sub-50ms tasks costs approximately zero.
    //
    // So the build is now a queue of small steps, yielded between (see
    // _runBuildQueue). Only what frame 1 needs is built synchronously: the
    // camera opens OUTSIDE the house looking at the facade, so the shell, the
    // entrance, the facade, the lights and the composer must exist — the
    // interiors can stream in over the next few frames, entirely unseen.
    this._materials()
    this._buildShell()
    this._buildEntrance()
    this._buildFacade()
    this._lights()
    this._composer()
    this.resize()
    this._lastInputMs = (typeof performance !== 'undefined' ? performance.now() : 0)
    this.wake() // render an initial settle, then idle until scrolled

    this._runBuildQueue([
      () => this._buildFoyer(),
      () => this._buildLiving(),
      () => this._buildOtherFurniture(),
    ])

    // ── HEAVY ASSETS ARE DEFERRED, NOT SKIPPED ────────────────────────────
    // The HDRI is ~5.5 MB and RGBELoader PARSES IT ON THE MAIN THREAD, then
    // PMREM-convolves it — together a multi-second long task. The furniture GLBs
    // add ~7 MB more. Kicking these off inside the constructor (as this used to)
    // put 12.5 MB and two long tasks directly in the critical path of the very
    // frame the user is waiting for: measured desktop TBT 2,000–2,800 ms and LCP
    // spiking to 12.9 s.
    //
    // Nothing here is needed for the FIRST frame — the house already has
    // procedural lighting and box-placeholder furniture, and both upgrade in
    // place when the real assets arrive. So we wait until the browser is idle
    // (post-load, post-TTI) and enhance then. The walkthrough looks identical a
    // beat later; the page becomes interactive seconds sooner.
    this._deferEnhancements()
  }

  /**
   * Drain a queue of build steps, yielding to the event loop between each one so
   * no single task can become a long task.
   *
   * `setTimeout(…, 0)` (not requestAnimationFrame) is deliberate: rAF callbacks
   * run INSIDE the frame's rendering task, so consecutive rAF steps coalesce
   * back into one long task and we would have optimised nothing. A macrotask
   * boundary genuinely lets the scheduler interleave input and paint.
   *
   * Each step wakes the renderer, so the house visibly assembles itself in the
   * first few frames — which nobody sees, because the camera is outside looking
   * at the facade for the first 40% of the scroll.
   */
  _runBuildQueue(steps) {
    const next = () => {
      if (this.disposed) return
      const step = steps.shift()
      if (!step) {
        this.built = true
        this.wake()
        return
      }
      step()
      this.wake()
      this._buildTimer = setTimeout(next, 0)
    }
    this._buildTimer = setTimeout(next, 0)
  }

  /**
   * Load the optional HDRI + GLB props once the main thread is genuinely free.
   * Falls back to a timeout on browsers without requestIdleCallback (Safari).
   */
  _deferEnhancements() {
    const run = () => {
      if (this.disposed) return
      this._loadAssets() // golden-hour IBL + reflections
      this._loadProps() // real modelled sofa / chair
    }
    const schedule = () => {
      if (typeof requestIdleCallback === 'function') {
        this._idleId = requestIdleCallback(run, { timeout: 3000 })
      } else {
        this._idleId = setTimeout(run, 1200)
      }
    }
    // Wait for `load` so we never compete with the page's own resources.
    if (typeof document === 'undefined' || document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
  }

  // ---- Materials --------------------------------------------------------
  _materials() {
    const A = this.aniso
    const std = (o) => new THREE.MeshStandardMaterial(o)
    // MeshPhysicalMaterial adds a clearcoat lobe — a second, sharper specular
    // layer over the base. It is what separates POLISHED stone from matte stone,
    // and lacquered joinery from raw board. It costs one extra BRDF evaluation
    // and NO extra render pass (unlike `transmission`, which forces a whole
    // additional scene render per frame and is deliberately avoided here).
    const phys = (o) => new THREE.MeshPhysicalMaterial(o)
    const wall = (color) => std({ color, roughness: 0.96, envMapIntensity: 0.35 })
    this.mat = {
      floor: std({
        map: TEX.marble({ base: '#e7e0d3', vein: 'rgba(150,138,120,0.4)', repeat: 3, aniso: A }),
        normalMap: TEX.floorNormal(3, A), normalScale: new THREE.Vector2(0.25, 0.25),
        roughness: 0.18, metalness: 0.0, envMapIntensity: 1.5,
      }),
      floorWood: std({
        map: TEX.wood({ base: '#5a3f26', repeat: 4, aniso: A }),
        normalMap: TEX.woodNormal(4), normalScale: new THREE.Vector2(0.4, 0.4),
        roughness: 0.45, envMapIntensity: 0.8,
      }),
      // ITALIAN MARBLE (Calacatta): a cool white ground with grey-gold veining
      // and a polished clearcoat. Warm/beige veins read as builder-grade granite;
      // the cool grey is what makes it read as Italian.
      marble: phys({
        map: TEX.marble({ base: '#f6f4f0', vein: 'rgba(122,124,128,0.5)', repeat: 1 }),
        normalMap: TEX.floorNormal(1, A),
        normalScale: new THREE.Vector2(0.1, 0.1),
        roughness: 0.08,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.8,
      }),
      stoneSlab: std({ map: TEX.marble({ base: '#cfccc4', vein: 'rgba(80,78,72,0.4)', repeat: 2 }), roughness: 0.4, envMapIntensity: 0.9 }),
      // per-room walls
      wFoyer: wall('#e7ddc8'),
      wLiving: wall('#d8ccb6'),
      wFeature: std({ map: TEX.wood({ base: '#5c4733', repeat: 2 }), roughness: 0.7, envMapIntensity: 0.5 }),
      wKitchen: wall('#c9c5bd'),
      wBedroom: wall('#b3a48f'),
      wBath: std({ map: TEX.marble({ base: '#b9b6ae', vein: 'rgba(70,68,62,0.4)', repeat: 1 }), roughness: 0.35, envMapIntensity: 1.0 }),
      accent: std({ color: '#2a241f', roughness: 0.7, envMapIntensity: 0.5 }),
      ceiling: std({ color: '#efe9df', roughness: 1, envMapIntensity: 0.2 }),
      walnut: std({ map: TEX.wood({ base: '#3c2a19', repeat: 2 }), normalMap: TEX.woodNormal(2), normalScale: new THREE.Vector2(0.3, 0.3), roughness: 0.5, metalness: 0.1, envMapIntensity: 0.7 }),
      fabric: std({ map: TEX.fabric({ base: '#c3b6a0', repeat: 2 }), normalMap: TEX.fabricNormal(2), normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.92, envMapIntensity: 0.3 }),
      fabricDark: std({ map: TEX.fabric({ base: '#5a4636', repeat: 2 }), normalMap: TEX.fabricNormal(2), normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.9, envMapIntensity: 0.3 }),
      stone: std({ map: TEX.blackStone({}), roughness: 0.08, metalness: 0.3, envMapIntensity: 2.0 }),
      rug: std({ map: TEX.rug({ base: '#cfc6b6', repeat: 1 }), normalMap: TEX.fabricNormal(4), normalScale: new THREE.Vector2(0.3, 0.3), roughness: 1, envMapIntensity: 0.15 }),
      bronze: std({ color: '#6e5634', roughness: 0.35, metalness: 0.85, envMapIntensity: 1.4 }),
      // BRASS — the site's 10% gold, in three dimensions. A true metal needs
      // metalness 1: anything less mixes in a diffuse lobe and the result reads
      // as gold-coloured PLASTIC, which is the classic ArchViz tell. Roughness
      // 0.22 gives brushed (not mirror) brass; the high envMapIntensity is what
      // lets the HDRI actually show up in it.
      gold: std({
        color: '#c5a572',
        roughness: 0.22,
        metalness: 1,
        envMapIntensity: 2.2,
      }),
      // Olive — the brand's 20%, used for upholstery and lacquered joinery so
      // the 3D hero belongs to the same palette as the rest of the site.
      olive: phys({
        color: '#5e6746',
        roughness: 0.55,
        metalness: 0,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
        envMapIntensity: 0.6,
      }),
      black: std({ color: '#0c0c0d', roughness: 0.35, metalness: 0.6, envMapIntensity: 1.4 }),
      glass: std({ color: '#bcd4e0', roughness: 0.05, metalness: 0, transparent: true, opacity: 0.16, envMapIntensity: 2.5 }),
      // Foliage reads as MASS IN SHADOW, not as a green ball. A saturated
      // mid-green sphere is the single strongest "cartoon" tell in the scene —
      // real foliage in a golden-hour plate is dark, desaturated and matte, and
      // is recognised by silhouette rather than colour. Hence: near-black olive,
      // fully rough, and no environment reflection to give away the sphere.
      leaf: std({ color: '#232b1e', roughness: 1, metalness: 0, envMapIntensity: 0.15 }),
      cushionA: std({ map: TEX.fabric({ base: '#2f4660', repeat: 2 }), normalMap: TEX.fabricNormal(2), roughness: 0.85 }),
      cushionB: std({ map: TEX.fabric({ base: '#b07a3c', repeat: 2 }), roughness: 0.85 }),
      cushionC: std({ map: TEX.fabric({ base: '#7d756a', repeat: 2 }), roughness: 0.85 }),
      throw: std({ map: TEX.fabric({ base: '#4a4742', repeat: 3 }), normalMap: TEX.fabricNormal(4), roughness: 1 }),
      lampShade: std({ color: '#fff3df', emissive: '#ffe6bd', emissiveIntensity: 1.4, roughness: 1 }),
      led: std({ color: '#fff0d6', emissive: '#ffd9a0', emissiveIntensity: 2.6, roughness: 1 }),
      glassWarm: std({ color: '#ffe9c4', emissive: '#ffdca0', emissiveIntensity: 1.2, roughness: 1 }),
      glassCool: std({ color: '#dbe9f5', emissive: '#bcd8f5', emissiveIntensity: 1.3, roughness: 1 }),
      art: std({ map: TEX.artwork({}), roughness: 0.6, envMapIntensity: 0.4 }),
      stoneWall: std({ map: TEX.marble({ base: '#7d756a', vein: 'rgba(40,38,34,0.5)', repeat: 3 }), roughness: 0.85 }),
      pathLight: std({ color: '#fff0d6', emissive: '#ffcf8a', emissiveIntensity: 3, roughness: 1 }),
    }
    this.shadowTex = TEX.shadowBlob()
  }

  // ---- helpers ----------------------------------------------------------
  _box(w, h, d, x, y, z, m, cast = true, recv = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
    mesh.position.set(x, y, z)
    const s = this.renderer.shadowMap.enabled
    mesh.castShadow = cast && s
    mesh.receiveShadow = recv && s
    ;(this._target || this.houseGroup).add(mesh)
    return mesh
  }

  _contact(x, z, w, d, y = 0.03) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, d),
      new THREE.MeshBasicMaterial({ map: this.shadowTex, transparent: true, depthWrite: false, opacity: 0.9 }),
    )
    m.rotation.x = -Math.PI / 2
    m.position.set(x, y, z)
    m.renderOrder = 1
    ;(this._target || this.houseGroup).add(m)
  }

  _wall(cx, cz, len, alongX, m = this.mat.wLiving, opening = null) {
    const place = (segLen, off) => {
      if (segLen <= 0.01) return
      if (alongX) this._box(segLen, H, T, cx + off, H / 2, cz, m, false, true)
      else this._box(T, H, segLen, cx, H / 2, cz + off, m, false, true)
    }
    if (!opening) return place(len, 0)
    const { gap, at = 0 } = opening
    const half = len / 2
    place(at - gap / 2 + half, (-half + (at - gap / 2)) / 2)
    place(half - (at + gap / 2), (at + gap / 2 + half) / 2)
    const lintelH = H - DOOR_H
    if (alongX) this._box(gap, lintelH, T, cx + at, DOOR_H + lintelH / 2, cz, m, false, false)
    else this._box(T, lintelH, gap, cx, DOOR_H + lintelH / 2, cz + at, m, false, false)
  }

  _floor(x1, z1, x2, z2, m) {
    this._box(Math.abs(x2 - x1), 0.1, Math.abs(z2 - z1), (x1 + x2) / 2, -0.05, (z1 + z2) / 2, m, false, true)
  }

  _ceiling(x1, z1, x2, z2) {
    this._box(Math.abs(x2 - x1), 0.1, Math.abs(z2 - z1), (x1 + x2) / 2, H + 0.05, (z1 + z2) / 2, this.mat.ceiling, false, false)
  }

  _window(cx, cz, w, alongX, cool = false) {
    const m = cool ? this.mat.glassCool : this.mat.glassWarm
    if (alongX) this._box(w, 1.8, 0.06, cx, 1.7, cz, m, false, false)
    else this._box(0.06, 1.8, w, cx, 1.7, cz, m, false, false)
  }

  /**
   * A canopy built from OVERLAPPING, JITTERED lobes instead of one scaled
   * sphere. A single ellipsoid reads instantly as a lollipop; three or four
   * offset lobes of differing size produce an irregular silhouette, which is the
   * only cue at this distance that says "plant" rather than "ball". Deterministic
   * offsets (no Math.random) so the scene is identical on every load.
   */
  _canopy(x, y, z, r, seed = 0) {
    const LOBES = [
      [0, 0, 0, 1.0],
      [0.42, 0.34, -0.2, 0.72],
      [-0.38, 0.16, 0.26, 0.66],
      [0.1, -0.3, 0.4, 0.58],
    ]
    LOBES.forEach(([ox, oy, oz, s], i) => {
      const wobble = 1 + (((seed + i) % 3) - 1) * 0.12
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r * s * wobble, 1),
        this.mat.leaf,
      )
      m.position.set(x + ox * r, y + oy * r, z + oz * r)
      m.rotation.set(seed * 0.7 + i, seed * 1.3 + i * 2, 0)
      m.scale.y = 1.15
      m.castShadow = this.renderer.shadowMap.enabled
      this.houseGroup.add(m)
    })
  }

  _plant(x, z, scale = 1) {
    this._box(0.5 * scale, 0.5 * scale, 0.5 * scale, x, 0.25 * scale, z, this.mat.black)
    this._canopy(x, 1.05 * scale, z, 0.5 * scale, Math.round(Math.abs(x * 3 + z)))
    this._contact(x, z, 1.2 * scale, 1.2 * scale)
  }

  // ---- shell ------------------------------------------------------------
  _buildShell() {
    const M = this.mat
    this._floor(-3, 0, 3, -6, M.floorWood)
    this._floor(-5, -6, 5, -15, M.floor)
    this._floor(5, -7, 15, -16, M.floor)
    this._floor(5, -16, 15, -26, M.floorWood)
    this._floor(-5, -16, 5, -26, M.floor)
    // (foyer ceiling is built tall in _buildFoyer for the double-height space)
    for (const c of [[-5, -6, 5, -15], [5, -7, 15, -16], [5, -16, 15, -26], [-5, -16, 5, -26]]) this._ceiling(...c)

    // Front wall + entrance portal are built in _buildEntrance() (architectural opening).
    this._wall(-3, -3, 6, false, M.wFoyer)
    this._wall(3, -3, 6, false, M.wFoyer)
    this._wall(0, -6, 10, true, M.wFoyer, { gap: 2.0, at: 0 })
    this._wall(-5, -10.5, 9, false, M.wLiving)
    this._wall(0, -15, 10, true, M.wFeature) // living feature wall (walnut)
    this._wall(5, -11, 10, false, M.wLiving, { gap: 2.0, at: -1 })
    this._wall(10, -7, 10, true, M.wKitchen)
    this._wall(15, -11.5, 9, false, M.wKitchen)
    this._wall(10, -16, 10, true, M.wKitchen, { gap: 2.0, at: 0 })
    this._wall(15, -21, 10, false, M.wBedroom)
    this._wall(10, -26, 10, true, M.accent)
    this._wall(5, -21, 10, false, M.wBedroom, { gap: 2.0, at: 0 })
    this._wall(-5, -21, 10, false, M.wBath)
    this._wall(0, -26, 10, true, M.wBath)
    this._wall(0, -16, 10, true, M.wBath)

    this._window(0, -15, 6, true, false)
    this._window(15, -21, 5, false, false)
    this._window(-5, -21, 5, false, true)
    this._window(15, -11.5, 4, false, true)

    // Living tray-ceiling cove.
    this._box(8, 0.06, 7, 0, H - 0.18, -10.5, M.led, false, false)
    this._box(8.6, 0.06, 7.6, 0, H - 0.02, -10.5, M.ceiling, false, false)

  }

  /**
   * Entrance portal — a real architectural opening so the door never clips the
   * wall. Wide recessed portal (3.6 m) with fixed glass sidelights; the door
   * leaf (1.5 m) lives in a 2.0 m clear opening (0.5 m clearance) and pivots on
   * an axis OFFSET 200 mm from its edge, swinging into free interior space. The
   * camera path (x=0) clears the open leaf, which rests near x≈−0.6.
   */
  _buildEntrance() {
    const M = this.mat
    const OPEN_W = 3.6 // portal width
    const OPEN_H = 2.6 // portal height
    const REVEAL = 0.22 // depth the door is recessed behind the facade
    const SL = 0.8 // sidelight width
    const DOOROP = OPEN_W / 2 - SL // = 1.0 → door opening half-width (x ∈ [-1,1], 2.0 wide)
    const LW = 1.5 // door leaf width
    const LT = 0.1 // door leaf thickness (100mm)
    const LH = 2.35 // door leaf height

    // Front wall solid parts (pillars + header) around the portal.
    this._box(3 - OPEN_W / 2, H, T, -(3 + OPEN_W / 2) / 2, H / 2, 0, M.wFoyer) // left pillar
    this._box(3 - OPEN_W / 2, H, T, (3 + OPEN_W / 2) / 2, H / 2, 0, M.wFoyer) // right pillar
    this._box(OPEN_W, H - OPEN_H, T, 0, OPEN_H + (H - OPEN_H) / 2, 0, M.wFoyer) // header

    // Recessed reveal: side + top returns from the facade (z=0) back to the door plane.
    this._box(0.24, OPEN_H, REVEAL, -OPEN_W / 2 + 0.12, OPEN_H / 2, -REVEAL / 2, M.stoneWall)
    this._box(0.24, OPEN_H, REVEAL, OPEN_W / 2 - 0.12, OPEN_H / 2, -REVEAL / 2, M.stoneWall)
    this._box(OPEN_W, 0.24, REVEAL, 0, OPEN_H - 0.12, -REVEAL / 2, M.stoneWall)
    this._box(OPEN_W, 0.1, 0.5, 0, 0.0, -REVEAL / 2, M.stoneSlab) // premium stone threshold

    // Fixed glass sidelights (static, no collision) + warm interior glow behind.
    for (const sx of [-(DOOROP + SL / 2), DOOROP + SL / 2]) {
      this._box(SL, OPEN_H, 0.04, sx, OPEN_H / 2, -REVEAL, M.glass)
      this._box(SL - 0.1, OPEN_H - 0.3, 0.02, sx, OPEN_H / 2, -REVEAL - 0.06, M.glassWarm, false, false)
    }
    // Walnut mullions/jambs framing the central door opening (x = ±1.0).
    for (const mx of [-DOOROP, DOOROP]) this._box(0.1, OPEN_H, 0.16, mx, OPEN_H / 2, -REVEAL, M.walnut)
    this._box(2 * DOOROP, 0.14, 0.16, 0, LH + 0.05, -REVEAL, M.walnut) // door head jamb
    // Recessed-ceiling LED strip glowing onto the door.
    this._box(2 * DOOROP - 0.2, 0.05, 0.18, 0, OPEN_H - 0.05, -REVEAL + 0.02, M.led, false, false)

    // --- TRUE PIVOT DOOR (offset axis), opens INWARD, clears all geometry ---
    const pivotX = -LW / 2 + 0.2 // axis 200mm in from the leaf's left edge
    const pivot = new THREE.Group()
    pivot.position.set(pivotX, 0, -REVEAL) // recessed door plane
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(LW, LH, LT), M.walnut)
    leaf.position.set(-pivotX, LH / 2, 0) // leaf centred in the opening (world x≈0 when closed)
    leaf.castShadow = this.renderer.shadowMap.enabled
    pivot.add(leaf)
    // Vertical brushed-brass pull near the leading (right) edge, on the exterior face.
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.0, 14), M.gold)
    handle.position.set(-pivotX + LW / 2 - 0.12, LH / 2, LT / 2 + 0.04)
    pivot.add(handle)
    this.houseGroup.add(pivot)
    this.frontDoor = pivot
  }

  // ---- exterior villa facade -------------------------------------------
  _buildFacade() {
    const M = this.mat
    // Ground / lawn + driveway.
    this._box(90, 0.1, 60, 0, -0.06, 16, new THREE.MeshStandardMaterial({ color: '#13130f', roughness: 1 }), false, true)
    this._box(5, 0.12, 16, 0, 0.0, 8, this.mat.stoneSlab, false, true) // pathway

    // Facade elevation (two storeys) flanking the entrance — clear of the portal.
    this._box(7, 6.4, 0.4, -5.5, 3.2, 0.2, M.stoneWall) // left stone mass
    this._box(7, 6.4, 0.4, 5.5, 3.2, 0.2, M.wFoyer) // right stucco mass
    // Upper-centre facade ABOVE the entrance only (never covers the opening).
    this._box(4.2, 6.4 - 2.7, 0.4, 0, 2.7 + (6.4 - 2.7) / 2, 0.2, M.wFoyer)
    // Wooden cladding slats on the left mass.
    for (let i = 0; i < 8; i++) this._box(0.18, 5.6, 0.08, -8.4 + i * 0.5, 3.0, 0.02, M.walnut)
    // Cantilevered entry canopy over the door (real overhang) + soffit downlights.
    this._box(4.6, 0.28, 1.6, 0, 2.75, 0.8, M.accent)
    for (const px of [-1.4, 0, 1.4]) this._box(0.24, 0.06, 0.24, px, 2.6, 0.9, M.pathLight, false, false)

    // Landscape: planters, path lights, stylised trees/palms.
    for (const sx of [-2.6, 2.6]) {
      this._box(0.2, 0.5, 0.2, sx, 0.25, 5.5, M.pathLight, false, false) // bollard light
      this.procLights.push(this._point('#ffcf8a', 3, 4, sx, 0.6, 5.5))
    }
    // Garden trees — slimmer trunks, irregular canopies, set further back and
    // higher so they read as landscape depth behind the facade rather than as
    // props parked on the lawn.
    for (const [tx, tz, s] of [[-7.6, 4.2, 1.35], [8.2, 5.4, 1.55], [-3.6, 7.2, 1.05]]) {
      this._box(0.16 * s, 3.0 * s, 0.16 * s, tx, 1.5 * s, tz, M.walnut)
      this._canopy(tx, 3.15 * s, tz, 0.95 * s, Math.round(Math.abs(tx * 2 + tz)))
    }
    // Low planters by the door.
    for (const sx of [-1.1, 1.1]) this._plant(sx, 1.4, 0.8)
  }

  // ---- grand double-height foyer ---------------------------------------
  _shaft(x, y, z, w, h, rotX, rotY) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: '#ffdca0', transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    )
    m.position.set(x, y, z)
    m.rotation.set(rotX, rotY, 0)
    m.renderOrder = 2
    this.houseGroup.add(m)
  }

  _buildFoyer() {
    const M = this.mat
    const FH = 5.6 // double-height ceiling
    // Upper wall bands lifting the foyer to double height.
    this._box(6, FH - H, T, 0, (H + FH) / 2, 0, M.wFoyer) // front upper
    this._box(T, FH - H, 6, -3, (H + FH) / 2, -3, M.wFoyer) // left upper
    this._box(T, FH - H, 6, 3, (H + FH) / 2, -3, M.wFoyer) // right upper
    this._box(6, FH - H, T, 0, (H + FH) / 2, -6, M.wFoyer) // back upper
    this._box(6, 0.12, 6, 0, FH + 0.06, -3, M.ceiling) // tall ceiling
    this._box(5, 0.06, 5, 0, FH - 0.12, -3, M.led, false, false) // ceiling cove glow
    // Clerestory windows → natural sunlight from above.
    this._box(1.7, 1.1, 0.06, -1.3, 4.4, 0.04, M.glassWarm, false, false)
    this._box(1.7, 1.1, 0.06, 1.3, 4.4, 0.04, M.glassWarm, false, false)

    // Statement chandelier hanging into the void.
    this._box(0.08, 1.4, 0.08, 0, FH - 0.7, -3, M.gold)
    for (let i = 0; i < 3; i++) {
      const r = 0.9 - i * 0.22
      this._box(r, 0.05, r, 0, FH - 1.5 - i * 0.4, -3, M.led, false, false)
    }
    this._point('#ffe3b0', 9, 9, 0, FH - 1.8, -3)

    // Floating staircase: cantilevered marble treads + glass railing (right side).
    for (let i = 0; i < 7; i++) {
      this._box(1.5, 0.14, 0.46, 2.2, 0.28 + i * 0.32, -1.2 - i * 0.5, M.marble)
    }
    this._box(0.05, 1.2, 3.4, 1.45, 1.4, -2.6, M.glass) // glass railing
    this._box(0.05, 0.32, 3.6, 2.95, 2.3, -2.6, M.led, false, false) // stair under-glow strip

    // Large artwork + olive tree + console styling.
    this._box(0.05, 2.0, 1.3, -2.93, 2.2, -3.2, M.art)
    this._plant(2.5, -5.3, 1.7) // indoor olive tree (tall)
    this._box(0.34, 0.4, 0.34, 0.5, 0.85, -5.6, M.gold) // sculpture on the console

    // Warm light spilling from the doorway into the foyer.
    this._shaft(0, 1.6, -1.6, 3.2, 3.4, -0.5, 0)
    this._shaft(-0.5, 1.4, -2.4, 2.4, 3.2, -0.6, 0.3)
    this._shaft(0.6, 1.5, -2.2, 2.2, 3.0, -0.6, -0.3)
    this._point('#ffdca0', 7, 9, 0, 2.3, -1.5) // threshold spill light
  }

  // ---- living room ------------------------------------------------------
  _buildLiving() {
    const M = this.mat
    this.boxSeating = new THREE.Group()
    this.houseGroup.add(this.boxSeating)
    const wx = -4.86
    this._box(0.1, 2.8, 5.4, wx, 1.6, -10.5, M.marble)
    this._box(0.12, 1.3, 2.4, wx + 0.06, 1.6, -10.5, M.black)
    for (let i = 0; i < 4; i++) this._box(0.42, 0.06, 2.6, wx + 0.25, 0.7 + i * 0.62, -12.6, M.walnut)
    this._box(0.06, 2.6, 2.6, wx + 0.02, 1.6, -12.6, M.led, false, false)
    this._box(0.5, 2.7, 2.7, wx + 0.28, 1.6, -12.6, M.walnut)
    this._box(0.55, 0.5, 4.6, wx + 0.35, 0.25, -10.2, M.walnut)
    this._box(0.06, 0.32, 4.6, wx + 0.64, 0.3, -10.2, M.led, false, false)

    const sf = M.fabric
    this._target = this.boxSeating // box sofa + armchair (hidden if real props load)
    this._box(5.0, 0.45, 1.2, -0.7, 0.35, -14.0, sf)
    this._box(5.0, 0.7, 0.3, -0.7, 0.8, -14.5, sf)
    this._box(0.3, 0.6, 1.2, -3.05, 0.65, -14.0, sf)
    for (let i = 0; i < 4; i++) this._box(1.05, 0.45, 0.5, -2.6 + i * 1.2, 0.78, -14.05, sf)
    this._box(1.3, 0.45, 2.6, 1.65, 0.35, -13.0, sf)
    this._box(1.3, 0.22, 2.6, 1.65, 0.66, -13.0, sf)
    this._box(0.55, 0.55, 0.2, -2.4, 0.85, -13.7, M.cushionA)
    this._box(0.55, 0.55, 0.2, -1.4, 0.85, -13.7, M.cushionB)
    this._box(0.55, 0.55, 0.2, -0.2, 0.85, -13.7, M.cushionC)
    this._box(0.55, 0.55, 0.2, 0.9, 0.85, -13.7, M.cushionA)
    this._box(1.2, 0.08, 1.3, 1.65, 0.74, -12.6, M.throw)
    this._contact(-0.4, -13.6, 6.2, 3.4)

    this._box(1.0, 0.45, 1.0, -1.8, 0.32, -11.4, M.fabricDark)
    this._box(1.0, 0.7, 0.25, -1.8, 0.75, -11.8, M.fabricDark)
    this._box(0.22, 0.55, 1.0, -2.35, 0.6, -11.4, M.fabricDark)
    this._box(0.22, 0.55, 1.0, -1.25, 0.6, -11.4, M.fabricDark)
    this._box(0.5, 0.45, 0.18, -1.8, 0.8, -11.75, M.cushionA)
    this._contact(-1.8, -11.4, 1.6, 1.6)
    this._target = null // end box-seating group

    this._box(1.7, 0.16, 0.95, -0.4, 0.5, -12.5, M.stone)
    this._box(1.5, 0.42, 0.8, -0.4, 0.26, -12.5, M.bronze)
    this._box(0.42, 0.08, 0.3, -0.7, 0.62, -12.5, M.glassCool)
    this._box(0.4, 0.06, 0.28, -0.7, 0.69, -12.5, M.cushionB)
    this._box(0.14, 0.3, 0.14, -0.1, 0.73, -12.4, M.black)
    this._box(0.1, 0.22, 0.1, 0.12, 0.69, -12.6, M.black)
    this._contact(-0.4, -12.5, 2.1, 1.3)

    this._box(6.2, 0.04, 4.4, -0.5, 0.02, -12.6, M.rug, false, true)

    this._box(0.6, 0.5, 0.6, 3.6, 1.9, -13.6, M.lampShade, false, false)
    for (const a of [-0.25, 0, 0.25]) this._box(0.05, 1.7, 0.05, 3.6 + a, 0.85, -13.6 + a, M.black)

    this._box(0.05, 2.0, 1.4, 4.92, 1.7, -13.8, M.art)
    this._plant(-4.2, -7.2, 1.15)
    this._plant(3.4, -7.6, 0.95)

    for (let i = 0; i < 6; i++) this._box(1.6, 0.18, 0.5, 3.2, 0.09 + i * 0.18, -14.6, M.marble)
    this._box(0.06, 1.1, 1.4, 4.0, 0.9, -14.6, M.glass)

    // ── DINING (open-plan, in the living room's north half) ───────────────
    // Sits on the walk between the foyer and the turn toward the kitchen, so the
    // camera passes through it naturally — see the dining waypoint in config.js.
    const dx0 = 3.1
    const dz0 = -9.2

    this._box(2.4, 0.08, 1.1, dx0, 0.75, dz0, M.walnut) // solid timber top
    for (const [ox, oz] of [
      [-1.0, -0.42],
      [1.0, -0.42],
      [-1.0, 0.42],
      [1.0, 0.42],
    ])
      this._box(0.09, 0.75, 0.09, dx0 + ox, 0.37, dz0 + oz, M.black)

    // Six chairs — fabric seat, walnut back, brass feet.
    for (const [cx, cz, back] of [
      [-0.8, -0.85, -1],
      [0, -0.85, -1],
      [0.8, -0.85, -1],
      [-0.8, 0.85, 1],
      [0, 0.85, 1],
      [0.8, 0.85, 1],
    ]) {
      this._box(0.46, 0.06, 0.46, dx0 + cx, 0.45, dz0 + cz, M.fabric)
      this._box(0.46, 0.55, 0.05, dx0 + cx, 0.75, dz0 + cz + back * 0.22, M.walnut)
      for (const fx of [-0.18, 0.18])
        this._box(0.04, 0.45, 0.04, dx0 + cx + fx, 0.22, dz0 + cz, M.gold)
    }

    // Low pendant cluster over the table — three brass shades, warm.
    for (const px of [-0.7, 0, 0.7]) {
      this._box(0.03, 1.05, 0.03, dx0 + px, 2.35, dz0, M.gold, false, false)
      this._box(0.3, 0.22, 0.3, dx0 + px, 1.75, dz0, M.gold, false, false)
      this._box(0.24, 0.03, 0.24, dx0 + px, 1.63, dz0, M.led, false, false)
    }
    this.diningLights = [
      this._point('#ffcf95', 5, 6, dx0 - 0.7, 1.6, dz0),
      this._point('#ffcf95', 5, 6, dx0 + 0.7, 1.6, dz0),
    ]

    // Sideboard + marble bowl against the wall behind.
    this._box(2.0, 0.72, 0.42, dx0 + 0.4, 0.36, dz0 - 1.9, M.walnut)
    this._box(2.06, 0.05, 0.46, dx0 + 0.4, 0.75, dz0 - 1.9, M.marble)
    this._box(0.34, 0.14, 0.34, dx0 + 0.1, 0.84, dz0 - 1.9, M.stone, false, false)
    this._box(0.05, 1.3, 1.0, dx0 + 0.4, 1.85, dz0 - 2.1, M.art)

    this._box(3.4, 0.04, 2.6, dx0, 0.02, dz0, M.rug, false, true)
    this._contact(dx0, dz0, 3.2, 2.4)
  }

  // ---- other rooms ------------------------------------------------------
  _buildOtherFurniture() {
    const M = this.mat
    this._box(1.6, 0.85, 0.4, 0, 0.42, -5.6, M.walnut)
    this._box(0.9, 1.4, 0.05, 0, 1.7, -5.95, M.gold)
    this._plant(2.4, -5.4, 1)

    this._box(2.6, 0.9, 1.2, 10, 0.45, -11.5, M.walnut)
    this._box(2.85, 0.12, 1.45, 10, 0.96, -11.5, M.marble)
    this._box(4.5, 0.9, 0.6, 12.4, 0.45, -7.6, M.walnut)
    this._box(4.6, 0.12, 0.62, 12.4, 0.96, -7.6, M.marble)
    this._box(4.5, 0.7, 0.35, 12.4, 2.2, -7.4, M.walnut)
    for (const sx of [-0.8, 0.8]) this._box(0.4, 0.6, 0.4, 10 + sx, 0.3, -10.6, M.black)
    for (const px of [-0.7, 0.7]) this._box(0.18, 0.4, 0.18, 10 + px, 2.25, -11.5, M.led)
    this._contact(10, -11.5, 3.2, 1.8)

    this._box(5, 0.04, 4, 10, 0.02, -21, M.rug, false, true)
    this._box(2.7, 0.4, 3.2, 10, 0.3, -22.2, M.walnut)
    this._box(2.7, 0.28, 3.2, 10, 0.62, -22.2, M.fabric)
    this._box(2.9, 1.1, 0.2, 10, 1.0, -25.6, M.fabricDark)
    for (const dx of [-0.8, 0.8]) this._box(0.9, 0.22, 0.5, 10 + dx, 0.86, -23.7, M.fabric)
    for (const nx of [-1.9, 1.9]) {
      this._box(0.6, 0.5, 0.5, 10 + nx, 0.3, -25.2, M.walnut)
      this._box(0.22, 0.4, 0.22, 10 + nx, 0.9, -25.2, M.lampShade, false, false)
    }
    this._box(2.4, 2.4, 0.6, 14.4, 1.2, -21, M.walnut)
    this._contact(10, -22.4, 3.4, 3.6)

    // ── WARDROBE (was the bathroom) ──────────────────────────────────────
    // Re-blocked as the walk-in dressing room the brief asks for. Same floor
    // plate, same camera path — only the joinery changed, so the waypoints and
    // ranges in config.js still line up exactly.
    const wz = -21

    // Full-height wardrobe run along the west wall: fluted walnut shutters with
    // a lit reveal between each bay. The LED strip behind the shutters is what
    // sells "built-in" rather than "cupboard".
    for (let i = 0; i < 5; i++) {
      const z = wz - 4.2 + i * 1.75
      this._box(0.62, 2.7, 1.62, -4.55, 1.35, z, M.walnut) // carcass
      this._box(0.04, 2.5, 0.06, -4.22, 1.35, z + 0.84, M.led, false, false) // lit reveal
      this._box(0.05, 0.03, 0.9, -4.2, 1.9, z, M.gold, false, false) // brass finger-pull
    }
    // Open display bay — brass rail, folded stacks, a lit shelf.
    this._box(0.6, 2.7, 1.7, -4.55, 1.35, wz + 2.1, M.black)
    this._box(0.06, 0.06, 1.5, -4.35, 2.0, wz + 2.1, M.gold, false, false) // hanging rail
    for (let i = 0; i < 3; i++)
      this._box(0.52, 0.05, 1.5, -4.55, 0.55 + i * 0.5, wz + 2.1, M.walnut)
    this._box(0.55, 0.03, 1.5, -4.55, 1.62, wz + 2.1, M.led, false, false)

    // Island dresser: walnut body, Italian marble top, brass tray.
    this._box(2.2, 0.78, 1.05, -1.4, 0.39, wz, M.walnut)
    this._box(2.35, 0.06, 1.18, -1.4, 0.81, wz, M.marble)
    this._box(0.5, 0.02, 0.34, -1.9, 0.85, wz, M.gold, false, false)
    this._box(0.16, 0.26, 0.16, -1.0, 0.94, wz - 0.1, M.glassCool, false, false)
    this._contact(-1.4, wz, 2.6, 1.5)

    // Full-height mirror + upholstered bench.
    this._box(0.06, 2.2, 1.0, 4.9, 1.35, wz - 1.4, M.glassCool)
    this._box(1.5, 0.42, 0.55, 3.6, 0.28, wz + 1.6, M.fabric)
    for (const bx of [-0.6, 0.6]) this._box(0.07, 0.3, 0.07, 3.6 + bx, 0.14, wz + 1.6, M.gold)
    this._contact(3.6, wz + 1.6, 1.8, 0.9)

    this._box(3.2, 0.04, 2.6, -1.4, 0.02, wz, M.rug, false, true)
    this._plant(-4, -24.6, 0.9)
  }

  // ---- lights -----------------------------------------------------------
  /**
   * Interior fills are registered in `this.interiorLights` with their design
   * intensity remembered, so the day→evening ramp can scale them without
   * accumulating rounding error (we always lerp from the ORIGINAL value, never
   * from the current one).
   */
  _point(color, intensity, dist, x, y, z) {
    const l = new THREE.PointLight(color, intensity, dist, 2)
    l.position.set(x, y, z)
    l.userData.baseIntensity = intensity
    this.scene.add(l)
    this.procLights.push(l)
    this.interiorLights.push(l)
    return l
  }

  _rect(color, intensity, w, h, x, y, z, look) {
    const l = new THREE.RectAreaLight(color, intensity, w, h)
    l.position.set(x, y, z)
    l.lookAt(look.x, look.y, look.z)
    l.userData.baseIntensity = intensity
    this.scene.add(l)
    this.procLights.push(l)
    this.interiorLights.push(l)
    return l
  }

  _lights() {
    const shadows = this.renderer.shadowMap.enabled
    const hemi = new THREE.HemisphereLight('#fff2e0', '#1a120a', LIGHTING.hemi.dayIntensity)
    this.scene.add(hemi)
    this.hemi = hemi

    const sun = new THREE.DirectionalLight(LIGHTING.sun.dayColor, LIGHTING.sun.dayIntensity)
    sun.position.set(7, 11, 15)
    this.sun = sun
    if (shadows) {
      sun.castShadow = true
      sun.shadow.mapSize.set(2048, 2048)
      Object.assign(sun.shadow.camera, { near: 1, far: 80, left: -24, right: 24, top: 24, bottom: -24 })
      sun.shadow.bias = -0.0004
    }
    this.scene.add(sun)
    this.procLights.push(sun)

    this._rect('#ffe7c4', 2.6, 7, 6, 0, H - 0.2, -10.5, new THREE.Vector3(0, 0, -10.5))
    this._rect('#cfe2f5', 1.8, 5, 2.2, 0, 1.7, -14.9, new THREE.Vector3(0, 1.7, 0))
    this._point('#ffe2b0', 6, 9, 3.6, 1.9, -13.6)
    this._point('#ffd9a0', 4, 6, -4.4, 1.6, -12.6)
    this._point('#ffe6c0', 5, 14, 0, 2.7, -10.5)

    this._point('#ffdca0', 8, 13, 0, 2.7, -4)
    this._rect('#ffe7c4', 2.4, 4, 4, 10, H - 0.2, -11.5, new THREE.Vector3(10, 0, -11.5))
    this._point('#ffe6c0', 6, 15, 10, 2.7, -11.5)
    this._point('#ffd9a0', 8, 17, 10, 2.7, -21)
    this._point('#ffcf95', 4, 6, 10, 1.0, -25.2)
    this._point('#dbeaff', 7, 15, 0, 2.6, -21)
    this._point('#cfe2f5', 5, 12, -5, 1.8, -21)

    if (shadows) {
      const spot = new THREE.SpotLight('#fff0d6', 60, 26, Math.PI / 4, 0.5, 1.5)
      spot.position.set(0, 3, -11)
      spot.target.position.set(0, 0, -12.5)
      spot.castShadow = true
      spot.shadow.mapSize.set(2048, 2048)
      spot.shadow.bias = -0.0004
      this.scene.add(spot, spot.target)
      this.procLights.push(spot)
    }
  }

  // ---- optional real assets --------------------------------------------
  _loadAssets() {
    // MOBILE BUDGET: the HDRI is ~5.5 MB and RGBELoader parses it on the main
    // thread. On a phone that alone pushes LCP/TBT into the tens of seconds, so
    // mobile keeps the procedural lighting (the same graceful path already used
    // when the HDRI fails to load). Desktop still gets the full golden-hour IBL.
    if (ASSETS.hdri && !this.mobile) {
      new RGBELoader().load(
        ASSETS.hdri,
        (hdr) => {
          hdr.mapping = THREE.EquirectangularReflectionMapping
          this.scene.environment = this.pmrem.fromEquirectangular(hdr).texture
          if (ASSETS.hdriAsBackground) {
            this.scene.background = hdr // sharp sky/garden through the windows
            this.scene.backgroundBlurriness = 0.0
          } else {
            hdr.dispose()
          }
          this.scene.fog = null // let the real environment define depth
          console.info('[HouseScene] HDRI environment active.')
        },
        undefined,
        () => console.warn('[HouseScene] HDRI failed to load — keeping procedural lighting.'),
      )
    }

    if (ASSETS.model) {
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)
      loader.load(
        ASSETS.model,
        (gltf) => {
          const m = gltf.scene
          m.scale.setScalar(ASSETS.modelScale || 1)
          m.position.set(...(ASSETS.modelPosition || [0, 0, 0]))
          m.rotation.y = ASSETS.modelRotationY || 0
          const s = this.renderer.shadowMap.enabled
          m.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = s
              o.receiveShadow = s
              if (o.material && o.material.map) o.material.map.anisotropy = this.aniso
            }
          })
          this.scene.add(m)
          this.model = m
          // Hand the room over to the real asset: hide procedural house + fills.
          this.houseGroup.visible = false
          this.procLights.forEach((l) => (l.visible = false))
          if (this.hemi) this.hemi.intensity = 0.1
          console.info('[HouseScene] GLTF villa loaded — walking the real model.')
        },
        undefined,
        () => console.warn('[HouseScene] GLTF failed to load — keeping procedural home.'),
      )
    }
  }

  /** Load real modelled furniture, auto-fit to scale, seat on floor, place. */
  _loadProps() {
    if (!PROPS || !PROPS.length) return
    // MOBILE BUDGET: the furniture GLBs total ~7 MB and are parsed on the main
    // thread. Phones keep the lightweight procedural stand-ins already built into
    // the scene (the same path used when a prop fails to load), so the walkthrough
    // still reads correctly at a fraction of the cost.
    if (this.mobile) return
    const loader = new GLTFLoader()
    const V = THREE.Vector3
    const s = this.renderer.shadowMap.enabled
    PROPS.forEach((p) => {
      loader.load(
        p.url,
        (g) => {
          const o = g.scene
          o.rotation.y = p.rotationY || 0
          o.updateMatrixWorld(true)
          let box = new THREE.Box3().setFromObject(o)
          const size = box.getSize(new V())
          o.scale.setScalar((p.targetWidth || 2) / Math.max(size.x, size.z, 0.001))
          o.updateMatrixWorld(true)
          box = new THREE.Box3().setFromObject(o)
          const c = box.getCenter(new V())
          o.position.x += p.position[0] - c.x
          o.position.z += p.position[1] - c.z
          o.position.y += -box.min.y
          o.traverse((m) => {
            if (m.isMesh) {
              m.castShadow = s
              m.receiveShadow = s
              if (m.material && m.material.map) m.material.map.anisotropy = this.aniso
            }
          })
          this.scene.add(o)
          if (this.boxSeating) this.boxSeating.visible = false
          console.info('[HouseScene] prop loaded:', p.url)
        },
        undefined,
        () => console.warn('[HouseScene] prop failed to load:', p.url),
      )
    })
  }

  // ---- post-processing --------------------------------------------------
  _composer() {
    const composer = new EffectComposer(this.renderer)
    composer.addPass(new RenderPass(this.scene, this.camera))

    // Handheld motion smear. Kept very low — this is a slow architectural
    // walk, not a chase. It is driven by camera speed in _loop().
    this.afterimage = new AfterimagePass(0.0)
    this.afterimage.uniforms.damp.value = 0.0
    composer.addPass(this.afterimage)

    const w = window.innerWidth
    const h = window.innerHeight

    // DEPTH OF FIELD — desktop only.
    // BokehPass renders a separate DEPTH pass every frame, which roughly doubles
    // the scene's draw calls. That is affordable on a desktop GPU and absolutely
    // is not on a phone, where we already drop to a photographic hero anyway.
    //
    // The aperture is deliberately tiny. Real architectural cinematography holds
    // almost everything in focus and lets only the extreme foreground/background
    // fall away — a big aperture reads as a video-game "portrait mode", which is
    // exactly the gaming effect the brief rules out.
    if (!this.mobile && POST.depthOfField) {
      this.bokeh = new BokehPass(this.scene, this.camera, {
        focus: 8.0, // metres — re-aimed each frame at what the camera is looking at
        aperture: 0.00022,
        maxblur: 0.006,
      })
      composer.addPass(this.bokeh)
    }

    // Soft bloom ONLY on genuine highlights: threshold 0.95 means nothing blooms
    // except the emissive coves, lamp shades and LED reveals. Low strength — a
    // glow, not a haze.
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.14, 0.5, 0.95)
    composer.addPass(this.bloom)

    composer.addPass(new OutputPass())
    this.composer = composer
  }

  // ---- drive ------------------------------------------------------------
  setProgress(t) {
    this.targetT = THREE.MathUtils.clamp(t, 0, 1)
    this._lastInputMs = performance.now()
    this.wake()
  }
  jumpTo(t) {
    this.curT = this.targetT = this.prevT = THREE.MathUtils.clamp(t, 0, 1)
    this._lastInputMs = performance.now()
    this.wake()
  }

  /** Start the render loop if idle, visible and alive. */
  wake() {
    if (this.disposed || this._running || !this._visible) return
    this._running = true
    this._raf = requestAnimationFrame(this._loop)
  }

  /** Section visibility (offscreen → stop rendering entirely). */
  setVisible(v) {
    this._visible = v
    if (v) this.wake()
    else {
      this._running = false
      cancelAnimationFrame(this._raf)
    }
  }

  _exposureAt(t) {
    const r = this.rooms.find((rm) => t >= rm.range[0] && t < rm.range[1])
    return (r || this.rooms[this.rooms.length - 1]).exposure
  }

  /**
   * DAY → EVENING.
   * The walk starts at golden hour and ends after dusk: the sun sinks and goes
   * warm-then-dim while the interior lights come up. `d` is 0 at the start of
   * LIGHTING.duskRange and 1 at the end, smoothstepped so nothing snaps.
   *
   * Cheap by construction — we only scale intensities and lerp two colours on
   * lights that already exist. No new draw calls, no extra passes. Guarded by
   * `_duskT` so a frame where the value hasn't meaningfully changed touches
   * nothing at all.
   */
  _applyDusk(t) {
    const [a, b] = LIGHTING.duskRange
    const raw = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1)
    const d = raw * raw * (3 - 2 * raw) // smoothstep

    if (Math.abs(d - this._duskT) < 0.004) return
    this._duskT = d

    const S = LIGHTING.sun
    if (this.sun) {
      this.sun.intensity = THREE.MathUtils.lerp(S.dayIntensity, S.duskIntensity, d)
      this.sun.color.copy(this._sunDay).lerp(this._sunDusk, d)
    }
    if (this.hemi) {
      this.hemi.intensity = THREE.MathUtils.lerp(
        LIGHTING.hemi.dayIntensity,
        LIGHTING.hemi.duskIntensity,
        d,
      )
    }

    // Interior fills ramp UP as the daylight leaves — the house lighting itself.
    const mul = THREE.MathUtils.lerp(
      LIGHTING.interior.dayMultiplier,
      LIGHTING.interior.duskMultiplier,
      d,
    )
    for (const l of this.interiorLights) {
      l.intensity = (l.userData.baseIntensity ?? l.intensity) * mul
    }
  }

  _loop = () => {
    if (this.disposed) {
      this._running = false
      return
    }
    this.time += 0.016
    const J = this.journey
    this.curT += (this.targetT - this.curT) * J.inertia
    const speed = Math.min(1, Math.abs(this.curT - this.prevT) * 140)

    this._applyDusk(this.curT)

    this.path.sample(this.curT, this._pos, this._look)
    const t = this.time
    this._pos.x += Math.sin(t * 1.3) * 0.022 + Math.sin(t * 0.7) * 0.016
    this._pos.y += Math.cos(t * 1.1) * 0.014 + Math.sin(t * 9) * 0.02 * speed
    this._look.x += Math.sin(t * 0.9) * 0.05
    this._look.y += Math.cos(t * 1.2) * 0.035

    this.camera.position.copy(this._pos)
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(this._look)

    // Rack focus: the focal plane tracks whatever the camera is aimed at, so the
    // subject of each room stays sharp and only the extreme fore/background
    // softens. A FIXED focus distance would blur the very thing being presented
    // — the classic way DOF ruins an architectural walkthrough.
    if (this.bokeh) {
      const dist = this._pos.distanceTo(this._look)
      const u = this.bokeh.uniforms ?? this.bokeh.materialBokeh?.uniforms
      if (u?.focus) u.focus.value += (dist - u.focus.value) * 0.08 // eased, never snaps
    }

    this._dir.copy(this._look).sub(this._pos).normalize()
    const turn = this._prevDir.angleTo(this._dir)
    this._tmp.crossVectors(this._prevDir, this._dir)
    const roll = THREE.MathUtils.clamp(-this._tmp.y * 6, -0.05, 0.05) + Math.sin(t * 0.6) * 0.004
    this.camera.rotateZ(roll)
    this._prevDir.copy(this._dir)

    if (!this.mobile && this.afterimage) {
      const target = THREE.MathUtils.clamp(turn * 22 + speed * 0.12, 0, 0.72)
      const d = this.afterimage.uniforms.damp
      d.value += (target - d.value) * 0.2
    }

    const targetExp = this._exposureAt(this.curT)
    this.renderer.toneMappingExposure += (targetExp - this.renderer.toneMappingExposure) * 0.04

    const [d0, d1] = this.doorRange
    const dp = THREE.MathUtils.smoothstep(this.curT, d0, d1)
    // Opens INWARD (+rotation swings the leaf front toward −z into the foyer),
    // 90° so it rests perpendicular, fully clear of the wall, frame and camera.
    if (this.frontDoor) this.frontDoor.rotation.y = dp * Math.PI * 0.5

    this.prevT = this.curT
    // Mobile: plain single-pass render (skip bloom + motion-blur composer passes
    // — by far the heaviest per-frame cost on low-power GPUs). Desktop keeps the
    // full cinematic post-processing stack.
    if (this.mobile) this.renderer.render(this.scene, this.camera)
    else this.composer.render()

    // On-demand: keep rendering only while the camera is still easing toward its
    // scroll target or input arrived recently; otherwise hold this frame and idle
    // (frees the main thread — the big mobile TBT win). Scrolling re-wakes it.
    const settling = Math.abs(this.curT - this.targetT) > 0.0001
    const recentInput = performance.now() - this._lastInputMs < 250
    if (settling || recentInput) {
      this._raf = requestAnimationFrame(this._loop)
    } else {
      this._running = false // idle on the last painted frame
    }
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
    clearTimeout(this._buildTimer)
    // Cancel the deferred HDRI/GLB fetch — otherwise navigating away before the
    // idle callback fires still pulls 12.5 MB for a scene that no longer exists.
    if (this._idleId != null) {
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(this._idleId)
      clearTimeout(this._idleId)
      this._idleId = null
    }
    this.scene?.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
    })
    this.scene.environment?.dispose?.()
    this.pmrem?.dispose?.()
    this.composer?.dispose?.()
    this.renderer?.dispose()
  }
}
