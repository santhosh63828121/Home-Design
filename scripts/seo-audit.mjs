// SEO completeness audit — crawls every route and fingerprints it.
// Run against the running prod server: node scripts/seo-audit.mjs
const BASE = 'http://localhost:3199'
const SITE = 'https://www.rgldecors.com'

const decode = (s) =>
  s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&#x2F;/g, '/')

async function getSitemapUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/')
}

function audit(html) {
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length
  const titleM = html.match(/<title>([^<]*)<\/title>/)
  const title = titleM ? decode(titleM[1]) : ''
  const descM = html.match(/<meta name="description" content="([^"]*)"/)
  const desc = descM ? decode(descM[1]) : ''
  const canM = html.match(/<link rel="canonical" href="([^"]*)"/)
  const canonical = canM ? canM[1] : ''
  const ogTitle = /<meta property="og:title"/.test(html)
  const ogDesc = /<meta property="og:description"/.test(html)
  const ogUrl = (html.match(/<meta property="og:url" content="([^"]*)"/) || [])[1] || ''
  const ogImg = /<meta property="og:image"/.test(html)
  const twCard = /<meta name="twitter:card"/.test(html)
  // JSON-LD @types
  const types = []
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1])
      const arr = Array.isArray(data) ? data : [data]
      for (const node of arr) if (node && node['@type']) types.push(node['@type'])
    } catch {
      types.push('PARSE_ERROR')
    }
  }
  // Images missing alt (alt attribute absent). Empty alt="" is allowed (decorative).
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  const imgMissingAlt = imgs.filter((t) => !/\salt=/.test(t)).length
  const imgEmptyAlt = imgs.filter((t) => /\salt=""/.test(t)).length
  // Honesty-gate signals in meta/og text
  const metaBlob = `${title} ${desc} ${(html.match(/og:description" content="([^"]*)"/) || [])[1] || ''}`
  return {
    h1s, title, tLen: title.length, desc, dLen: desc.length, canonical,
    ogTitle, ogDesc, ogUrl, ogImg, twCard, types,
    imgMissingAlt, imgEmptyAlt, metaBlob: decode(metaBlob),
  }
}

const routes = await getSitemapUrls()
const rows = []
for (const r of routes) {
  const res = await fetch(`${BASE}${r}`)
  const html = await res.text()
  rows.push({ route: r, status: res.status, ...audit(html) })
}

// ---- Report ----------------------------------------------------------------
console.log(`\nAUDITED ${rows.length} ROUTES (from sitemap)\n`)
const pad = (s, n) => String(s).padEnd(n).slice(0, n)
console.log(pad('route', 40), 'st', 'h1', 'tLen', 'dLen', 'can', 'og4', 'schema')
console.log('-'.repeat(120))
for (const x of rows) {
  const can = x.canonical ? 'Y' : '-'
  const og4 = (x.ogTitle && x.ogDesc && x.ogImg && x.twCard) ? 'Y' : 'N'
  console.log(
    pad(x.route, 40),
    pad(x.status, 2),
    pad(x.h1s, 2),
    pad(x.tLen, 4),
    pad(x.dLen, 4),
    pad(can, 3),
    pad(og4, 3),
    x.types.join(','),
  )
}

// ---- Findings --------------------------------------------------------------
console.log('\n================ FINDINGS ================')
const f = []
// 1. h1 != 1
for (const x of rows) if (x.h1s !== 1) f.push(`H1≠1 (${x.h1s}) on ${x.route}`)
// 2. title length / missing
for (const x of rows) {
  if (!x.title) f.push(`MISSING title on ${x.route}`)
  else if (x.tLen > 60) f.push(`TITLE >60 (${x.tLen}) ${x.route} :: ${x.title}`)
}
// 3. duplicate titles
const byTitle = {}
for (const x of rows) (byTitle[x.title] ||= []).push(x.route)
for (const [t, rs] of Object.entries(byTitle)) if (rs.length > 1) f.push(`DUPLICATE title "${t}" :: ${rs.join(' , ')}`)
// 4. description length
for (const x of rows) {
  if (!x.desc) f.push(`MISSING description on ${x.route}`)
  else if (x.dLen < 150 || x.dLen > 160) f.push(`DESC ${x.dLen} (want 150-160) ${x.route}`)
}
// 5. canonical/og/twitter presence
for (const x of rows) {
  if (!x.canonical) f.push(`NO canonical ${x.route}`)
  if (!(x.ogTitle && x.ogDesc && x.ogImg && x.twCard)) f.push(`OG/Twitter incomplete ${x.route}`)
  if (x.canonical && !x.canonical.startsWith('https://')) f.push(`canonical not absolute ${x.route} :: ${x.canonical}`)
}
// 6. schema parse errors
for (const x of rows) if (x.types.includes('PARSE_ERROR')) f.push(`JSON-LD PARSE ERROR ${x.route}`)
// 7. images missing alt
for (const x of rows) if (x.imgMissingAlt > 0) f.push(`${x.imgMissingAlt} <img> MISSING alt on ${x.route}`)
// 8. honesty gates in meta text
for (const x of rows) {
  if (/\bAggregateRating\b/.test(x.types.join(','))) f.push(`GATE: AggregateRating schema on ${x.route}`)
  if (/500\+|happy families|95%|98% satisf|client satisfaction/i.test(x.metaBlob)) f.push(`GATE: fabricated stat in meta ${x.route}`)
}

if (f.length === 0) console.log('No findings — all checks passed.')
else for (const x of f) console.log('  • ' + x)
console.log(`\nTOTAL FINDINGS: ${f.length}`)

// ---- Schema coverage summary ----------------------------------------------
console.log('\n================ SCHEMA COVERAGE ================')
for (const x of rows) console.log(pad(x.route, 40), x.types.filter((t) => !['Organization', 'WebSite', 'HomeAndConstructionBusiness'].includes(t)).join(',') || '(global only)')
