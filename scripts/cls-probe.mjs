// Focused CLS probe: load home, then scroll SMOOTHLY (like a real user, small
// steps) and also in LARGE JUMPS, N times each, capturing every shift's source.
// Goal: find what shifts and whether realistic scrolling triggers it.
import puppeteer from 'puppeteer-core'
const BASE = process.env.BASE || 'http://localhost:3199'
const CHROME = process.env.CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=swiftshader', '--window-size=1366,900'],
})

async function probe(mode) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 900 })
  await page.evaluateOnNewDocument(() => {
    window.__cls = 0
    window.__shifts = []
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (!e.hadRecentInput) {
          window.__cls += e.value
          const srcs = (e.sources || []).map((s) => {
            const n = s.node
            if (!n) return '?'
            const cls = (n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className || '').toString().trim().split(/\s+/)[0]
            return `${n.nodeName}${n.id ? '#' + n.id : ''}${cls ? '.' + cls : ''}`
          })
          window.__shifts.push({ v: Number(e.value.toFixed(4)), t: Math.round(performance.now()), srcs })
        }
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 4500)) // settle cinematic + ScrollTrigger refresh
  const loadCls = await page.evaluate(() => window.__cls)

  if (mode === 'smooth') {
    await page.evaluate(async () => {
      const max = document.body.scrollHeight
      for (let y = 0; y < max; y += 60) {
        window.scrollTo(0, y)
        await new Promise((r) => requestAnimationFrame(r))
      }
    })
  } else {
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 250))
      }
    })
  }
  await new Promise((r) => setTimeout(r, 600))
  const { cls, shifts } = await page.evaluate(() => ({ cls: window.__cls, shifts: window.__shifts }))
  await page.close()
  return { loadCls, cls, shifts }
}

for (const mode of ['smooth', 'jump']) {
  console.log(`\n### ${mode.toUpperCase()} scroll — 5 runs`)
  for (let i = 0; i < 5; i++) {
    const { loadCls, cls, shifts } = await probe(mode)
    const top = shifts.sort((a, b) => b.v - a.v)[0]
    console.log(
      `  run${i + 1}: loadCLS=${loadCls.toFixed(4)} totalCLS=${cls.toFixed(4)}` +
        (top ? `  | biggest ${top.v} @${top.t}ms [${top.srcs.join(',')}]` : ''),
    )
  }
}
await browser.close()
