import * as THREE from 'three'

/**
 * Procedural PBR textures
 * -----------------------
 * All material detail is generated on a canvas at runtime — no external files,
 * so nothing can 404 and the bundle stays light. Each returns a CanvasTexture
 * ready to use as a `map`; grayscale variants double as roughness/bump maps.
 *
 * `aniso` (renderer.capabilities.getMaxAnisotropy()) is applied for crisp
 * grazing-angle detail on the floor.
 */

function makeCanvas(size = 512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return c
}

function finish(canvas, { repeat = 1, aniso = 1, srgb = true } = {}) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.anisotropy = aniso
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  tex.needsUpdate = true
  return tex
}

// Smooth value-noise-ish wash by stacking soft radial blobs.
function washes(g, size, count, colorFn, r0, r1) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = r0 + Math.random() * (r1 - r0)
    const grd = g.createRadialGradient(x, y, 0, x, y, r)
    const col = colorFn()
    grd.addColorStop(0, col)
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, size, size)
  }
}

/** Veined marble. `dark` controls vein/base contrast. */
export function marble(opts = {}) {
  const { base = '#f1ede6', vein = 'rgba(120,110,95,0.5)', size = 512, repeat = 1, aniso = 1 } = opts
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  g.fillStyle = base
  g.fillRect(0, 0, size, size)
  // soft cloudy tonal variation
  washes(g, size, 22, () => 'rgba(255,255,255,0.06)', size * 0.2, size * 0.6)
  washes(g, size, 14, () => 'rgba(150,140,120,0.05)', size * 0.2, size * 0.5)
  // veins: meandering strokes
  const veinCount = 10
  for (let i = 0; i < veinCount; i++) {
    g.beginPath()
    let x = Math.random() * size
    let y = -10
    g.moveTo(x, y)
    const steps = 28
    for (let s = 0; s < steps; s++) {
      x += (Math.random() - 0.5) * size * 0.12
      y += size / steps
      g.lineTo(x, y)
    }
    g.strokeStyle = vein
    g.lineWidth = 0.6 + Math.random() * 1.8
    g.globalAlpha = 0.4 + Math.random() * 0.5
    g.stroke()
    // faint hairline branches
    g.globalAlpha = 0.15
    g.lineWidth = 0.5
    g.stroke()
  }
  g.globalAlpha = 1
  return finish(c, { repeat, aniso })
}

/** Walnut wood with vertical grain. */
export function wood(opts = {}) {
  const { size = 512, repeat = 1 } = opts
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  const baseCol = opts.base || '#43301d'
  g.fillStyle = baseCol
  g.fillRect(0, 0, size, size)
  for (let x = 0; x < size; x += 1) {
    const n = Math.sin(x * 0.06) * 0.5 + Math.sin(x * 0.21) * 0.3 + (Math.random() - 0.5) * 0.4
    const l = 0.5 + n * 0.18
    g.strokeStyle = `rgba(${Math.floor(90 * l)},${Math.floor(62 * l)},${Math.floor(36 * l)},0.5)`
    g.beginPath()
    g.moveTo(x, 0)
    g.lineTo(x + (Math.random() - 0.5) * 4, size)
    g.stroke()
  }
  // long grain streaks
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * size
    g.strokeStyle = `rgba(20,12,6,${0.05 + Math.random() * 0.12})`
    g.lineWidth = 0.5 + Math.random() * 1.5
    g.beginPath()
    g.moveTo(x, 0)
    g.lineTo(x + (Math.random() - 0.5) * 8, size)
    g.stroke()
  }
  return finish(c, { repeat, aniso: opts.aniso || 1 })
}

/** Woven fabric (subtle weave + tonal cloth). */
export function fabric(opts = {}) {
  const { base = '#b3a692', size = 256, repeat = 1 } = opts
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  g.fillStyle = base
  g.fillRect(0, 0, size, size)
  washes(g, size, 16, () => 'rgba(255,255,255,0.04)', size * 0.15, size * 0.5)
  washes(g, size, 10, () => 'rgba(80,70,55,0.05)', size * 0.15, size * 0.45)
  // weave
  g.globalAlpha = 0.06
  for (let i = 0; i < size; i += 3) {
    g.strokeStyle = '#ffffff'
    g.beginPath(); g.moveTo(0, i); g.lineTo(size, i); g.stroke()
    g.strokeStyle = '#000000'
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i, size); g.stroke()
  }
  g.globalAlpha = 1
  return finish(c, { repeat })
}

/** Soft noisy rug. */
export function rug(opts = {}) {
  const { base = '#cdc4b4', size = 256, repeat = 1 } = opts
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  g.fillStyle = base
  g.fillRect(0, 0, size, size)
  washes(g, size, 40, () => `rgba(255,255,255,${0.03 + Math.random() * 0.04})`, 10, 60)
  washes(g, size, 40, () => `rgba(90,80,65,${0.03 + Math.random() * 0.04})`, 10, 60)
  return finish(c, { repeat })
}

/** Polished black stone (subtle pearl swirl). */
export function blackStone(opts = {}) {
  const { size = 512 } = opts
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  g.fillStyle = '#0e0d0c'
  g.fillRect(0, 0, size, size)
  washes(g, size, 16, () => `rgba(120,110,95,${0.04 + Math.random() * 0.05})`, size * 0.1, size * 0.4)
  washes(g, size, 8, () => 'rgba(200,190,170,0.04)', size * 0.05, size * 0.2)
  return finish(c, {})
}

/**
 * Build a tangent-space normal map from a grayscale height drawing (Sobel).
 * Gives real surface relief (no flat shading) without external assets.
 */
export function buildNormal(draw, { size = 512, strength = 2.4, repeat = 1, aniso = 1 } = {}) {
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  g.fillStyle = '#808080'
  g.fillRect(0, 0, size, size)
  draw(g, size)
  const src = g.getImageData(0, 0, size, size).data
  const out = makeCanvas(size)
  const og = out.getContext('2d')
  const img = og.createImageData(size, size)
  const d = img.data
  const Hh = (x, y) => {
    x = (x + size) % size
    y = (y + size) % size
    return src[(y * size + x) * 4] / 255
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (Hh(x + 1, y) - Hh(x - 1, y)) * strength
      const dy = (Hh(x, y + 1) - Hh(x, y - 1)) * strength
      const len = Math.hypot(dx, dy, 1)
      const i = (y * size + x) * 4
      d[i] = (-dx / len * 0.5 + 0.5) * 255
      d[i + 1] = (-dy / len * 0.5 + 0.5) * 255
      d[i + 2] = (1 / len * 0.5 + 0.5) * 255
      d[i + 3] = 255
    }
  }
  og.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(out)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.anisotropy = aniso
  tex.colorSpace = THREE.NoColorSpace
  return tex
}

export const floorNormal = (repeat = 3, aniso = 1) =>
  buildNormal(
    (g, s) => {
      for (let i = 0; i < 8; i++) {
        g.beginPath()
        let x = Math.random() * s
        g.moveTo(x, 0)
        for (let y = 0; y < s; y += s / 20) {
          x += (Math.random() - 0.5) * s * 0.1
          g.lineTo(x, y)
        }
        g.strokeStyle = Math.random() > 0.5 ? '#a0a0a0' : '#606060'
        g.lineWidth = 1 + Math.random() * 2
        g.stroke()
      }
    },
    { repeat, aniso, strength: 1.2 },
  )

export const woodNormal = (repeat = 2) =>
  buildNormal(
    (g, s) => {
      for (let x = 0; x < s; x += 2) {
        const v = 128 + Math.sin(x * 0.2) * 40 + (Math.random() - 0.5) * 30
        g.strokeStyle = `rgb(${v | 0},${v | 0},${v | 0})`
        g.beginPath()
        g.moveTo(x, 0)
        g.lineTo(x, s)
        g.stroke()
      }
    },
    { repeat, strength: 1.6 },
  )

export const fabricNormal = (repeat = 2) =>
  buildNormal(
    (g, s) => {
      for (let i = 0; i < s; i += 3) {
        g.strokeStyle = '#b0b0b0'
        g.beginPath(); g.moveTo(0, i); g.lineTo(s, i); g.stroke()
        g.strokeStyle = '#505050'
        g.beginPath(); g.moveTo(i, 0); g.lineTo(i, s); g.stroke()
      }
    },
    { repeat, strength: 2.6 },
  )

/** Soft round shadow used as a fake contact shadow / AO blob under furniture. */
export function shadowBlob() {
  const c = makeCanvas(128)
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 3, 64, 64, 64)
  grd.addColorStop(0, 'rgba(0,0,0,0.5)')
  grd.addColorStop(0.6, 'rgba(0,0,0,0.22)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.NoColorSpace
  return t
}

/** Abstract artwork echoing the reference (navy / gold / cream). */
export function artwork(opts = {}) {
  const w = 512
  const h = 700
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  g.fillStyle = '#efe9dd'
  g.fillRect(0, 0, w, h)
  // cream field
  g.fillStyle = '#e7dcc6'
  g.beginPath()
  g.moveTo(0, h * 0.1)
  g.bezierCurveTo(w * 0.3, h * 0.25, w * 0.2, h * 0.6, w * 0.55, h)
  g.lineTo(0, h)
  g.closePath()
  g.fill()
  // navy organic shape
  g.fillStyle = '#1f3148'
  g.beginPath()
  g.moveTo(w, h * 0.32)
  g.bezierCurveTo(w * 0.55, h * 0.34, w * 0.55, h * 0.62, w, h * 0.72)
  g.closePath()
  g.fill()
  // gold block
  g.fillStyle = '#b08a4e'
  g.beginPath()
  g.moveTo(w * 0.6, h * 0.7)
  g.lineTo(w, h * 0.62)
  g.lineTo(w, h * 0.86)
  g.lineTo(w * 0.62, h * 0.9)
  g.closePath()
  g.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
