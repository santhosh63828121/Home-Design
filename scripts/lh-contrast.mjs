import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
const BASE = 'http://localhost:3199'
const chrome = await chromeLauncher.launch({
  chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader'],
})
for (const p of (process.env.LH_PATHS || '/services').split(',')) {
  const r = await lighthouse(`${BASE}${p}`, {
    port: chrome.port, output: 'json', logLevel: 'error',
    onlyCategories: ['accessibility'], formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
  })
  console.log(`\n### ${p}`)
  for (const id of ['color-contrast', 'heading-order']) {
    const a = r.lhr.audits[id]
    if (a?.score === 1 || !a?.details?.items?.length) continue
    console.log(`-- ${id}`)
    for (const it of a.details.items.slice(0, 8)) {
      console.log('   ', (it.node?.snippet || '').slice(0, 110))
      if (it.node?.explanation) console.log('      ', it.node.explanation.slice(0, 120))
    }
  }
}
await chrome.kill()
