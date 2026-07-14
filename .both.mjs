import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const OUT = process.argv[2]
fs.mkdirSync(OUT, { recursive: true })
const PAGES = (process.env.P || '/about,/services,/blog,/services/modular-kitchen-chennai').split(',')

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-webgl'],
})

let bad = 0
for (const p of PAGES) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3199' + p, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y <= Math.min(h, 6000); y += 300) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 130))
    }
  })
  await new Promise((r) => setTimeout(r, 2500))

  // Any image that is loaded but rendering at zero height = a collapsed plate.
  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll('main img')].map((i) => {
      const r = i.getBoundingClientRect()
      return { w: Math.round(r.width), h: Math.round(r.height), complete: i.complete, src: i.currentSrc.slice(-30) }
    }),
  )
  const collapsed = imgs.filter((i) => i.w > 10 && i.h < 5)
  const unloaded = imgs.filter((i) => !i.complete)
  if (collapsed.length || unloaded.length) bad++
  console.log(
    `${p.padEnd(36)} imgs=${String(imgs.length).padStart(2)}  collapsed=${collapsed.length}  unloaded=${unloaded.length}` +
      (collapsed.length || unloaded.length ? '   <-- BROKEN' : ''),
  )
  await page.screenshot({ path: `${OUT}/${p.replace(/\//g, '_') || 'home'}.png` })
  await page.close()
}
console.log('\nPAGES WITH BROKEN PLATES:', bad)
await browser.close()
