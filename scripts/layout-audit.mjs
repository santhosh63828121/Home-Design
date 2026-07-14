// LAYOUT AUDIT — measures what the eye suspects, so "it feels off" becomes a number.
//
// For every top-level section on every page it reports:
//   · GAP        — dead vertical space between the bottom of one section's last
//                  painted child and the top of the next section's first child.
//   · LEFT EDGE  — the x of the section's first text/heading. Every section must
//                  start on the SAME grid column; a stray edge is a misalignment.
//   · EMPTY TAIL — space between a section's last painted child and its own
//                  bottom border (over-padding, the "big blank area" bug).
//
// Usage: PAGES="/,/about" WIDTHS="1440" node scripts/layout-audit.mjs
import puppeteer from 'puppeteer-core'

const BASE = process.env.BASE || 'http://localhost:3199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PAGES = (process.env.PAGES || '/').split(',')
const WIDTHS = (process.env.WIDTHS || '1440').split(',').map(Number)
const GAP_LIMIT = Number(process.env.GAP_LIMIT || 220) // px of dead space we tolerate

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  // --disable-webgl is load-bearing. This audit SCROLLS every page, and the
  // homepage now boots three.js on first scroll intent. Under headless
  // swiftshader that software-rasterises the whole scene and reliably crashed
  // the renderer ("Target closed") a couple of pages in, taking the run with it.
  // With WebGL off the site does exactly what it does on any WebGL-less browser:
  // falls back to the photographic hero. The layout we are measuring is
  // unchanged, and the run completes.
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=swiftshader', '--disable-webgl'],
})

let problems = 0

for (const path of PAGES) {
  for (const w of WIDTHS) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: 900 })
    await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 })
    // Scroll through so every whileInView reveal has fired and nothing is still
    // sitting at opacity 0 (which would fake an "empty" region).
    // Walk the page so every whileInView reveal fires — otherwise a still-hidden
    // (opacity:0) block reads as "not painted" and invents a phantom gap.
    // Step count is CAPPED: some pages are 20,000px tall (the sticky scroll
    // tracks), and an unbounded loop here blew past puppeteer's evaluate timeout
    // and killed the run outright.
    await page.evaluate(async () => {
      const h = document.body.scrollHeight
      const STEPS = Math.min(40, Math.ceil(h / 400))
      const step = h / STEPS
      for (let i = 0; i <= STEPS; i++) {
        window.scrollTo(0, i * step)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await new Promise((r) => setTimeout(r, 800))

    const report = await page.evaluate(() => {
      const painted = (el) => {
        const r = el.getBoundingClientRect()
        const s = getComputedStyle(el)
        if (r.width < 2 || r.height < 2) return false
        if (s.visibility === 'hidden' || s.display === 'none') return false
        if (parseFloat(s.opacity) < 0.05) return false
        return true
      }
      const abs = (el) => {
        const r = el.getBoundingClientRect()
        return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, left: r.left }
      }
      // The content extent of a section = union of its painted leaf-ish children.
      const extent = (sec) => {
        let top = Infinity
        let bottom = -Infinity
        let left = Infinity
        sec.querySelectorAll('h1,h2,h3,h4,p,li,img,canvas,button,a,input,textarea,dd,dt,figure,iframe,svg,summary,details,table').forEach(
          (el) => {
            if (!painted(el)) return
            const a = abs(el)
            if (a.top < top) top = a.top
            if (a.bottom > bottom) bottom = a.bottom
            if (a.left < left) left = a.left
          },
        )
        return { top, bottom, left }
      }

      const main = document.querySelector('main') || document.body
      const secs = [...main.children].filter(painted)

      const rows = []
      for (let i = 0; i < secs.length; i++) {
        const s = secs[i]
        const box = abs(s)
        const ex = extent(s)
        if (!isFinite(ex.top)) continue

        const tag = s.tagName.toLowerCase()
        const id = s.id ? '#' + s.id : ''
        const cls = (s.className?.toString?.() || '').split(' ').slice(0, 2).join('.')

        const headPad = Math.round(ex.top - box.top)
        const tailPad = Math.round(box.bottom - ex.bottom)

        let gapToNext = null
        if (i < secs.length - 1) {
          const nx = extent(secs[i + 1])
          if (isFinite(nx.top)) gapToNext = Math.round(nx.top - ex.bottom)
        }

        // A section whose content is sticky is a scroll TRACK: its height is the
        // journey length by design, so 'empty tail' and 'dead gap' are meaningless.
        const isTrack = !!s.querySelector('.cine-track, [class*="sticky"]') ||
          [...s.children].some((c) => getComputedStyle(c).position === 'sticky')
        // A .bleed element intentionally breaks the text grid to reach the edge.
        const bleeds = !!s.querySelector('.bleed')

        // CENTRED content has no left grid edge to speak of: a `justify-center`
        // row starts its first child inboard by however wide the row happens to
        // be. /get-free-quote is a deliberately centred conversion column, and
        // reporting its inset children as "off-grid" is measuring the wrong thing.
        // What matters there is that the CONTAINERS share an axis, which they do.
        const cs = getComputedStyle(s)
        const centred =
          cs.textAlign === 'center' ||
          /center/.test(cs.justifyContent) ||
          !!s.querySelector('.text-center, [class*="justify-center"], [class*="items-center"]')

        rows.push({
          isTrack,
          bleeds,
          centred,
          label: `${tag}${id}${cls ? '.' + cls : ''}`.slice(0, 46),
          headPad,
          tailPad,
          gapToNext,
          left: Math.round(ex.left),
          height: Math.round(box.bottom - box.top),
        })
      }
      return rows
    })

    // Left-edge consensus: the grid column most sections start on.
    const lefts = report.map((r) => r.left).filter((l) => l > 0 && l < 900)
    const counts = {}
    lefts.forEach((l) => (counts[l] = (counts[l] || 0) + 1))
    const grid = Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0)

    console.log(`\n=== ${path} @${w} ===   (grid column x=${grid})`)
    for (let i = 0; i < report.length; i++) {
      const r = report[i]
      const flags = []
      // A gap measured INTO a scroll track is meaningless: the track's copy is
      // vertically centred inside a sticky stage, so its "first painted child"
      // sits half a viewport below the track's real top. Skip both sides.
      const nextIsTrack = report[i + 1]?.isTrack
      if (!r.isTrack && !nextIsTrack && r.gapToNext !== null && r.gapToNext > GAP_LIMIT)
        flags.push(`DEAD-GAP ${r.gapToNext}px`)
      if (!r.isTrack && r.tailPad > GAP_LIMIT) flags.push(`EMPTY-TAIL ${r.tailPad}px`)
      if (!r.bleeds && !r.centred && grid && r.left > 0 && Math.abs(r.left - grid) > 4 && r.left < 900)
        flags.push(`OFF-GRID x=${r.left} (want ${grid})`)
      if (flags.length) problems++
      console.log(
        `  ${r.label.padEnd(46)} h=${String(r.height).padStart(5)}  gap=${String(r.gapToNext ?? '-').padStart(5)}  tail=${String(r.tailPad).padStart(4)}  x=${String(r.left).padStart(4)}  ${flags.join(' · ')}`,
      )
    }
    await page.close()
  }
}

console.log(`\nTOTAL LAYOUT PROBLEMS: ${problems}`)
await browser.close()
process.exit(problems ? 1 : 0)
