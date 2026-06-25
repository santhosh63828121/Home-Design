# Phase 0 — Recon & Foundation

Reconciliation of the current Next.js codebase against the master spec
(`RGL-Decors-Build-Prompt.md` + `RGL-Decors-Website-Strategy (1).md`).
Phase 0 added **no new pages** — it aligned the data layer, redirects and lead
pipeline so later phases build on solid ground.

## Recon map — what exists vs. what the spec requires

| Area | Spec requires | Before Phase 0 | After Phase 0 |
|---|---|---|---|
| Business data (NAP, USPs, services, styles, projects, cities, pricing, social) | One typed source of truth | Scattered/duplicated across `seo.ts`, `content.js`, `services.ts`; **email drift** (`info@` vs `rgldecors@gmail.com`); placeholder socials | ✅ `src/data/business.ts` (typed); `seo.ts` + `content.js` project from it |
| 8 USPs | All 8, verbatim | 8 in `content.js` (paraphrased) | ✅ canonical in `business.ts`; `FEATURES` re-exports them |
| 15 service categories | All 15 as data | only 6 SEO pages, no canonical 15 | ✅ `serviceCategories` (15) in `business.ts` *(pages reconciled in a later phase)* |
| 3 design styles | Traditional/Modern/Contemporary | not modelled | ✅ `designStyles` |
| 4 real projects | Divakar / Kiran / Anbu / Muthu | not modelled | ✅ `projects` (slugs + scope, no invented data) |
| 9 service areas | 8 cities + state-wide TN | string only | ✅ `serviceAreas` (8 city slugs + Tamil Nadu state-wide) |
| Pricing signals | Kitchen ₹50k + 2/3BHK + turnkey | none | ✅ `pricingPackages` (kitchen firm; 2/3BHK flagged `indicative`) + disclaimer |
| Social links | 5 exact spec URLs | placeholder URLs | ✅ exact URLs in `socials` (footer + schema) |
| Legacy → new 301s | 15-row map, **301** | none | ✅ literal **301** via `middleware.ts` + `data/redirects.ts` |
| Lead pipeline | validate → store → email → WhatsApp | Zod-only, no persistence/email/WA | ✅ Prisma `Lead` + migration; persist → email (Resend/SMTP, gated) → WhatsApp deep-link |

## Files added / changed this phase

**Added:** `src/data/business.ts`, `src/data/redirects.ts`, `src/middleware.ts`,
`prisma/schema.prisma` (+ `prisma/migrations/…_init_lead`), `src/lib/db.ts`,
`src/lib/leads.ts`, `src/lib/email.ts`, `docs/PHASE-0-RECON.md`.

**Changed:** `src/lib/seo.ts`, `src/data/content.js`, `src/app/actions/contact.ts`,
`src/components/ContactSection.jsx`, `next.config.mjs`, `package.json`,
`.env.example`, `.gitignore`.

## Verified
- `npm run build` ✓ · Middleware compiled ✓
- 301 redirects return literal `301` to correct new URLs ✓
- Prisma `Lead` create + count ✓ (SQLite dev DB)
- Home HTML shows canonical email (`rgldecors@gmail.com`) + exact Facebook URL ✓

## Deferred to later phases (intentionally not done in Phase 0)
- New pages: services hub/15 pages, pricing hub + calculator, portfolio/case
  studies, 3D, location pages, blog, legal, careers, refer-and-earn.
- Reconcile the 6 existing service pages with the canonical 15 categories.
- Confirm the indicative 2BHK/3BHK pricing figures with the client.
