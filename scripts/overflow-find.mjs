// Find elements causing horizontal overflow on each page/width.
import puppeteer from 'puppeteer-core'
const BASE = 'http://localhost:3199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=swiftshader'],
})
const PAGES = (process.env.PAGES || '/,/services,/portfolio/kiran-2bhk,/blog/modular-kitchen-cost-chennai').split(',')
const WIDTHS = (process.env.WIDTHS || '375,768,1280,1920').split(',').map(Number)
for (const p of PAGES) {
  for (const w of WIDTHS) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: 900 })
    await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {})
    await new Promise((r) => setTimeout(r, 600))
    const res = await page.evaluate((vw) => {
      const docW = document.documentElement.scrollWidth
      const overflow = docW > window.innerWidth + 1
      const bad = []
      if (overflow) {
        for (const el of document.querySelectorAll('*')) {
          const r = el.getBoundingClientRect()
          if (r.right > vw + 1 || r.left < -1) {
            const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().trim().split(/\s+/).slice(0, 3).join('.')
            bad.push(`${el.tagName}${cls ? '.' + cls : ''} [${Math.round(r.left)}..${Math.round(r.right)}]`)
          }
        }
      }
      return { docW, innerW: window.innerWidth, overflow, bad: [...new Set(bad)].slice(0, 6) }
    }, w)
    const flag = res.overflow ? `OVERFLOW (scrollW ${res.docW} > ${res.innerW})` : 'ok'
    console.log(`${p} @${w}: ${flag}`)
    for (const b of res.bad) console.log(`    ${b}`)
    await page.close()
  }
}
await browser.close()
