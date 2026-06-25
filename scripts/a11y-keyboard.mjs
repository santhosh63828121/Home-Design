// Keyboard / focus a11y interaction test (beyond Lighthouse's static checks).
import puppeteer from 'puppeteer-core'
const BASE = 'http://localhost:3199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=swiftshader'],
})
let fails = 0
const expect = (label, cond, detail = '') => {
  if (!cond) fails++
  console.log(`  [${cond ? 'PASS' : 'FAIL'}] ${label}${detail ? ' :: ' + detail : ''}`)
}

// 1) Desktop: skip-link first, visible focus ring on keyboard tabbing.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => {
    const el = document.activeElement
    return { tag: el?.tagName, text: (el?.textContent || '').trim().slice(0, 30) }
  })
  expect('first Tab focuses the skip-to-content link', /skip/i.test(first.text), JSON.stringify(first))

  // Tab through 12 controls; every focused element must show a visible focus ring.
  let focusable = 0
  let ringed = 0
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const cs = getComputedStyle(el)
      const ring =
        (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) ||
        cs.boxShadow !== 'none'
      return { focusable: ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName), ring }
    })
    if (info?.focusable) {
      focusable++
      if (info.ring) ringed++
    }
  }
  expect('keyboard focus reaches interactive controls', focusable >= 6, `${focusable} controls`)
  expect('every focused control shows a visible focus ring', ringed === focusable, `${ringed}/${focusable}`)
  await page.close()
}

// 2) Mobile nav toggle operable by keyboard (focus → Enter → menu opens).
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 780 })
  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle2', timeout: 60000 })
  const toggle = await page.$('button[aria-controls="mobile-menu"], button[aria-label="Open menu"]')
  expect('mobile nav toggle exists with aria', !!toggle)
  if (toggle) {
    const beforeExpanded = await page.evaluate((b) => b.getAttribute('aria-expanded'), toggle)
    await toggle.focus()
    await page.keyboard.press('Enter')
    await new Promise((r) => setTimeout(r, 300))
    const after = await page.evaluate(() => {
      const b = document.querySelector('button[aria-controls="mobile-menu"], button[aria-label="Close menu"]')
      const menu = document.querySelector('#mobile-menu')
      const links = menu ? menu.querySelectorAll('a').length : 0
      return { expanded: b?.getAttribute('aria-expanded'), menuVisible: !!menu && menu.offsetHeight > 0, links }
    })
    expect('Enter opens the menu (aria-expanded true)', after.expanded === 'true', `was ${beforeExpanded}→${after.expanded}`)
    expect('open menu exposes focusable links', after.menuVisible && after.links >= 5, JSON.stringify(after))
  }
  await page.close()
}

// 3) Floating CTA stack: reachable + each has an accessible name.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 780 })
  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle2', timeout: 60000 })
  const cta = await page.evaluate(() => {
    const stack = document.querySelector('.fixed.bottom-5, .fixed.bottom-6') || document.querySelector('[class*="bottom-5"]')
    const links = stack ? [...stack.querySelectorAll('a')] : []
    return links.map((a) => (a.getAttribute('aria-label') || a.textContent || '').trim()).filter(Boolean)
  })
  expect('floating CTA stack has 3 named actions (Call/WhatsApp/Quote)', cta.length >= 3, cta.join(' | '))
  await page.close()
}

await browser.close()
console.log(`\nTOTAL FAILURES: ${fails}`)
process.exit(fails ? 1 : 0)
