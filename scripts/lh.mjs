// Lighthouse runner — real numbers, stated config.
// Mobile = Lighthouse default (Moto-G-class, Slow 4G: RTT 150ms / 1.6Mbps DL,
// 4× CPU slowdown, 360×640). Desktop = desktop preset (light throttle, 1350×940).
// Usage: node scripts/lh.mjs <formFactor: mobile|desktop> <path> [path...]
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const BASE = process.env.BASE || 'http://localhost:3199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const form = process.argv[2] === 'desktop' ? 'desktop' : 'mobile'
// Routes hardcoded / from LH_PATHS env (Git Bash mangles leading-slash argv).
const paths = (process.env.LH_PATHS || '/,/services,/interior-design-cost-chennai,/blog/modular-kitchen-cost-chennai')
  .split(',')
  .map((s) => s.trim())

const chrome = await chromeLauncher.launch({
  chromePath: CHROME,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader'],
})

const opts = {
  port: chrome.port,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: form,
  screenEmulation:
    form === 'desktop'
      ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }
      : { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
  ...(form === 'desktop'
    ? { throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } }
    : {}),
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n=== LIGHTHOUSE (${form}) ===`)
console.log(pad('path', 34), 'Perf  A11y  BP   SEO  | LCP      TBT      CLS')
console.log('-'.repeat(86))
for (const p of paths) {
  const runnerResult = await lighthouse(`${BASE}${p}`, opts)
  const { categories, audits } = runnerResult.lhr
  const sc = (c) => Math.round((categories[c]?.score ?? 0) * 100)
  const m = (id) => audits[id]?.displayValue || 'n/a'
  if (process.env.LH_DETAIL) {
    const lcpEl = audits['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet
    console.log(`    LCP element: ${lcpEl || 'n/a'}`)
    const opps = (runnerResult.lhr.categories.performance.auditRefs || [])
      .filter((r) => r.group === 'load-opportunities' || r.group === 'diagnostics')
      .map((r) => audits[r.id])
      .filter((a) => a && a.score !== null && a.score < 0.9 && a.displayValue)
      .slice(0, 5)
    for (const o of opps) console.log(`    · ${o.title}: ${o.displayValue}`)
    const a11yFails = (categories.accessibility.auditRefs || [])
      .map((r) => audits[r.id])
      .filter((a) => a && a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary')
    for (const a of a11yFails) console.log(`    a11y✗ ${a.id}: ${a.title}`)
  }
  console.log(
    pad(p, 34),
    pad(sc('performance'), 5),
    pad(sc('accessibility'), 5),
    pad(sc('best-practices'), 4),
    pad(sc('seo'), 4),
    '|',
    pad(m('largest-contentful-paint'), 8),
    pad(m('total-blocking-time'), 8),
    m('cumulative-layout-shift'),
  )
}
await chrome.kill()
