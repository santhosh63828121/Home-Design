import * as THREE from 'three'

/**
 * ThreeFX
 * -------
 * Atmospheric layer above the room imagery, below the copy. Renders floating
 * dust, soft volumetric light rays, an exterior sun flare and bathroom steam,
 * and tints the air to each room's mood. As the scroll moves between rooms the
 * mood + per-room effect weights are interpolated, so the whole frame breathes
 * from golden-hour exterior to cool spa. Particle counts scale with viewport to
 * hold 60fps on mobile. No room geometry — pure cinematic atmosphere.
 */
export default class ThreeFX {
  constructor(canvas, scenes) {
    this.canvas = canvas
    this.scenes = scenes
    this.disposed = false
    this._raf = 0
    this._t = 0
    this._scrollX = 0
    this.mood = {
      particle: new THREE.Color(scenes[0].mood.particleColor),
      ray: new THREE.Color(scenes[0].mood.rayColor),
      intensity: scenes[0].mood.intensity,
      dust: scenes[0].fx?.dust ?? 1,
      rays: scenes[0].fx?.rays ?? 1,
      flare: scenes[0].fx?.flare ?? 0,
      steam: scenes[0].fx?.steam ?? 0,
    }
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    this.camera.position.z = 14

    this._sprite = this._makeSprite()
    this._buildParticles()
    this._buildRays()
    this._buildFlare()
    this._buildSteam()
    this.resize()
    this._loop()
  }

  _makeSprite() {
    const s = 64
    const c = document.createElement('canvas')
    c.width = c.height = s
    const g = c.getContext('2d')
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, s, s)
    return new THREE.CanvasTexture(c)
  }

  _buildParticles() {
    const mobile = window.innerWidth < 768
    const count = mobile ? 130 : 320
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16
      speeds[i] = 0.05 + Math.random() * 0.12
    }
    this._speeds = speeds
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.particleMat = new THREE.PointsMaterial({
      size: mobile ? 0.16 : 0.13,
      map: this._sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: this.mood.particle.clone(),
      opacity: 0.8,
    })
    this.particles = new THREE.Points(geo, this.particleMat)
    this.scene.add(this.particles)
  }

  _buildRays() {
    this.rays = new THREE.Group()
    const geo = new THREE.PlaneGeometry(3.4, 30)
    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: this.mood.ray.clone(),
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const ray = new THREE.Mesh(geo, mat)
      ray.position.set(-9 + i * 5.5, 2, -4 - i)
      ray.rotation.z = 0.32
      this.rays.add(ray)
    }
    this.scene.add(this.rays)
  }

  /** Soft sun flare for the exterior (additive sprite, upper-right). */
  _buildFlare() {
    this.flareMat = new THREE.SpriteMaterial({
      map: this._sprite,
      color: new THREE.Color('#ffe6b8'),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.flare = new THREE.Sprite(this.flareMat)
    this.flare.scale.set(16, 16, 1)
    this.flare.position.set(8, 5, -2)
    this.scene.add(this.flare)
  }

  /** Rising steam for the spa bathroom (reuses the particle field, tinted). */
  _buildSteam() {
    const count = 60
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.steamMat = new THREE.PointsMaterial({
      size: 2.6,
      map: this._sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: new THREE.Color('#dceaf2'),
      opacity: 0,
    })
    this.steam = new THREE.Points(geo, this.steamMat)
    this.scene.add(this.steam)
  }

  /** Blend mood + effect weights toward a fractional scene index. */
  update(sceneFloat) {
    const max = this.scenes.length - 1
    const f = Math.max(0, Math.min(max, sceneFloat))
    const a = Math.floor(f)
    const b = Math.min(max, a + 1)
    const t = f - a
    const sa = this.scenes[a]
    const sb = this.scenes[b]
    const lerp = (x, y) => x + (y - x) * t
    this.mood.particle.set(sa.mood.particleColor).lerp(new THREE.Color(sb.mood.particleColor), t)
    this.mood.ray.set(sa.mood.rayColor).lerp(new THREE.Color(sb.mood.rayColor), t)
    this.mood.intensity = lerp(sa.mood.intensity, sb.mood.intensity)
    this.mood.dust = lerp(sa.fx?.dust ?? 1, sb.fx?.dust ?? 1)
    this.mood.rays = lerp(sa.fx?.rays ?? 1, sb.fx?.rays ?? 1)
    this.mood.flare = lerp(sa.fx?.flare ?? 0, sb.fx?.flare ?? 0)
    this.mood.steam = lerp(sa.fx?.steam ?? 0, sb.fx?.steam ?? 0)
    this._scrollX = (f / max - 0.5) * 4
  }

  /** Scroll velocity feeds a tiny lens-breathing parallax. */
  setVelocity(v) {
    this._vel = v
  }

  _loop = () => {
    if (this.disposed) return
    this._t += 0.016

    // Dust drift + recycle.
    const pos = this.particles.geometry.attributes.position
    for (let i = 0; i < this._speeds.length; i++) {
      let y = pos.array[i * 3 + 1] + this._speeds[i] * 0.04
      if (y > 11) y = -11
      pos.array[i * 3 + 1] = y
      pos.array[i * 3] += Math.sin(this._t * 0.5 + i) * 0.002
    }
    pos.needsUpdate = true
    if (this.particleMat) {
      this.particleMat.color.copy(this.mood.particle)
      this.particleMat.opacity = (0.5 + this.mood.intensity * 0.4) * this.mood.dust
    }

    // Light rays.
    this.rays.children.forEach((r, i) => {
      r.material.color.copy(this.mood.ray)
      r.material.opacity =
        (0.05 + this.mood.intensity * 0.12) * this.mood.rays * (0.7 + 0.3 * Math.sin(this._t * 0.4 + i))
    })

    // Sun flare (exterior only via weight).
    if (this.flareMat) {
      this.flareMat.opacity = this.mood.flare * (0.5 + 0.15 * Math.sin(this._t * 0.6))
    }

    // Steam rises (bathroom only via weight).
    if (this.steam) {
      const sp = this.steam.geometry.attributes.position
      for (let i = 0; i < sp.count; i++) {
        let y = sp.array[i * 3 + 1] + 0.012
        if (y > 8) y = -8
        sp.array[i * 3 + 1] = y
        sp.array[i * 3] += Math.sin(this._t * 0.3 + i) * 0.003
      }
      sp.needsUpdate = true
      this.steamMat.opacity = this.mood.steam * 0.5
    }

    // Camera parallax: scroll target + a touch of velocity breathing.
    const targetX = (this._scrollX || 0) + (this._vel || 0) * 0.02
    this.camera.position.x += (targetX - this.camera.position.x) * 0.04
    this.camera.lookAt(0, 0, 0)

    this.renderer.render(this.scene, this.camera)
    this._raf = requestAnimationFrame(this._loop)
  }

  resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this._raf)
    this.particles?.geometry.dispose()
    this.particleMat?.dispose()
    this.steam?.geometry.dispose()
    this.steamMat?.dispose()
    this.rays?.children.forEach((r) => {
      r.geometry.dispose()
      r.material.dispose()
    })
    this.flareMat?.dispose()
    this._sprite?.dispose()
    this.renderer?.dispose()
  }
}
