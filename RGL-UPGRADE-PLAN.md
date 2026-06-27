# RGL Decors — Upgrade Plan (v2.0 doc → existing build)

**Status:** awaiting approval to begin Phase A.
**Principle (unchanged):** nothing invented goes live. Every figure/claim stays behind its gate
(`PRICING_INDICATIVE`, `REVIEWS_VERIFIED`, `STATS_VERIFIED`, gated Review/FAQ schema) until RGL
confirms it. This plan only *extends* the verified build — it never removes working content or
regresses the Lighthouse / a11y / single-H1 / CWV results.

---

## Locked decisions (from sign-off)

| Axis | Decision |
|---|---|
| **Design identity** | **Hybrid** — keep the green base; add **gold `#C8973A`** CTAs/labels, **teal `#1B6F72`** accents, **Cormorant Garamond** display headings. Token-level; structure/content untouched. |
| **Local geography** | **Both** — keep the 8 Tamil Nadu city pages **and** add 12 Chennai suburb pages (doc §7.2), each with genuinely unique copy. |
| **Pricing** | **4-tier grid + estimator** — add Essential/Elite/Luxury/Signature feature grid (doc §4.6); keep the interactive estimator; per-sq.ft figures stay indicative (`*` + footnote) until confirmed (§2.1). |
| **Sequencing** | **Plan first** (this doc), then phased build; verify after each phase. |

---

## What's already built and matches the doc (reused, not rebuilt)
Honesty gates + gated schema · phased build · CWV/a11y/Lighthouse · single-H1 · sitemap/robots ·
lead pipeline (validate→store→email→WhatsApp + autoresponder) · floating Call/WhatsApp/Quote ·
Home (cinematic) · About · Services (16) · Pricing hub + estimator + 2BHK/3BHK/kitchen pages ·
Portfolio + case studies + albums · Blog (MDX) with prices read from `pricing.ts` · Contact ·
Careers · Refer & Earn · legal ×3 · 3D Walkthrough · Locations hub + pages · Testimonials ·
Get-Free-Quote · tagline "Dreams Delivered."

---

## Upgrade phases

Each phase ships a reviewable result and re-runs the audit suite (Lighthouse, motion, overflow,
single-H1, gates) before the next begins.

| Ph | Focus | Key outputs | Gated on (from doc §2) |
|---|---|---|---|
| **A** | **Design retheme (hybrid)** | Tailwind tokens (`gold`, `teal`, keep `accent`); add Cormorant via next/font; apply Cormorant to display headings, gold to primary CTAs (ink text — contrast-checked), teal to accents/icons. | — (brand assets later, §2.2) |
| **B** | **Nav & shell** | Top nav → 7-item: Home · About Us · Services · Portfolio · Pricing · Blogs · Contact. 3D Walkthrough + Locations move to footer/sub-pages (still real routes). Footer adds Process, Material Partners, area pages, FAQ. | Logo (§2.2) |
| **C** | **Pricing (4-tier + estimator)** | Add `tiers` to `pricing.ts` (feature grid + per-sq.ft, indicative-gated); render tier grid on the hub with the estimator; residential timeline tables (planning targets, labelled). | Pricing units + warranty (§2.1/2.3) |
| **D** | **Services taxonomy** | Re-IA into the doc's 8 categories (§4.4); generate individual service pages from Appendix C (~70), each using its matching category copy (no thin boilerplate). Current 16 mapped in. | — |
| **E** | **Locations (cities + suburbs)** | Add 12 Chennai suburb pages (Avadi, Anna Nagar, Porur, Velachery, OMR, ECR, Adyar, T.Nagar, Chromepet, Mogappair, Tambaram, Nungambakkam) via the existing unique-copy engine; keep 8 TN cities; update hub, sitemap, `areaServed`; NAP → Avadi (pending §2.1). | Verified NAP (§2.1); area photos/local testimonials (§2.2) |
| **F** | **Portfolio depth** | Extend case-study template: stat block (type/location/area/style/services/timeline/tier), narrative (brief→challenge→solution→result+quote), 360°/before-after/material-palette/gallery; filters Category/Type/Style/Budget/Area — all degrade gracefully to placeholders. | Real projects + consent (§2.2) |
| **G** | **Process · lead form · lead-gen** | 16-step process page (interactive timeline); multi-step (3-step) lead form extending the Phase-0 action + Prisma model (type/property/area/budget/date/scope/channel); design-style quiz; email-gated lookbook (gated until assets). | Lookbook assets (§2.2) |
| **H** | **Blog & FAQ content** | Wire the 10 blog categories + seed more of the 100 topics (Appendix A); FAQ page from Appendix B (100 FAQs) — FAQPage schema stays **off** until the figures inside are confirmed (§7.3). | Confirmed figures inside FAQs (§2.1) |
| **I** | **SEO / schema / analytics** | `areaServed` + area-page schema; Article schema (present); Review/AggregateRating + FAQPage stay **gated**; GA4 + Clarity + GTM scaffold (env-gated, off by default) — privacy policy updated to disclose when enabled. | Reviews/GBP (§2.1); analytics decision; legal copy (§2.2) |
| **J** | **QA & honesty-gate sign-off** | Re-run full audit suite; verify the §6.3 launch checklist; output the remaining §2 "confirm/supply" list as the go-live gate. | Final sign-off |

---

## Decisions still open (doc §2.3) — gate content, not the build
Warranty offer (1 / 10 / tiered) · delivery guarantee (per-day clause?) · ™ on pillar names ·
finish count (1,000+ vs 2,500+) · BOQ-vs-margin pricing story · optional tier "collection" names.
Until decided: superlatives ship as **defensible wording**, ™ names render as plain labels, and
warranty rows stay gated.

## Go-live gate (doc §6.3) — unchanged from the build's honesty rules
No placeholder stat/testimonial/project/partner-logo live · Review/FAQ schema only when real ·
superlatives softened · pricing + warranty each one source of truth · legal pages in place ·
analytics + forms firing to the right inbox · CWV + a11y pass mobile + desktop.

---

## Phase J — QA & honesty-gate sign-off (completed 2026-06-27)

**Build:** clean. **Phases A–I shipped & verified.**

### Audit results (production build, `next start`)
- **SEO/gates crawl** (whole sitemap): **1 finding** — `/services/tv-units-chennai` meta description 149 chars (target 150–160). Pre-existing, cosmetic, shared 16-service template; not fixed to avoid destabilising the other 15. Non-blocking.
- **Lighthouse (mobile):** A11y **100**, Best-Practices **100**, SEO **100** on every page sampled. Perf 94–100 on all pages **except** the home page (**86**, LCP 4.1s) — see known item below.
- **CLS:** 0.000–0.007 across the board.
- **Overflow 320–1920px:** clean on all 12 key pages **except** the home hero (known item).
- **Motion / reduced-motion:** single-H1 ✓, count-ups show final values (no 0→N) ✓, reveal tweens normal / snaps reduced ✓, CLS 0.0000 ✓. **1 fail** = reduced-motion home hero (known item).

### Honesty gates — all holding
- `PRICING_INDICATIVE=true` → every price carries `*` + footnote (verified: 5 footnotes, 29 asterisks on the cost page).
- `REVIEWS_VERIFIED=false` → **no AggregateRating/Review** schema anywhere (verified 0).
- `STATS_VERIFIED=false` → placeholder stats (Homes Delivered etc.) **not rendered** (verified 0).
- New `/faq` page → **FAQPage schema OFF** (`FAQ_SCHEMA_ENABLED=false`, verified 0).
- Tier-grid warranty row → deferred to "confirmed in your written quotation" (no asserted period).
- Analytics → **OFF by default**, zero trackers in the default build; privacy policy says "no analytics". With IDs set, scripts load AND privacy auto-discloses them (both read `lib/analytics.ts`).

### Known items (intentional / pre-existing — NOT regressions)
1. **Home hero (Perf 86 / LCP 4.1s / reduced-motion blank / 1 overflow / 1 motion-fail).** All trace to the **commented-out static cinematic hero** in `CinematicExperience.jsx` — a deliberate change left in place. Restoring it (with the user's go-ahead) clears all five at once.
2. **tv-units meta description 149 vs 150.** 1 char under target; cosmetic.

### NEW honesty item surfaced in QA — needs a decision
- **Pricing-page `FAQPage` schema (pre-existing) emits indicative figures + an EMI claim as rich-result data.** On `/interior-design-cost-chennai` (and the 2BHK/3BHK/kitchen cost pages) the FAQPage JSON-LD asserts "Essentials 2BHK ₹3.5–6 lakh… modular kitchen from ₹50,000" and **"EMI up to 24 months, no-cost EMI on select plans"** while `PRICING_INDICATIVE` is still true and EMI terms are a §2 confirm item. Inconsistent with the gate held elsewhere. **Recommendation:** gate these FAQPage schemas behind `PRICING_INDICATIVE`/figure-confirmation (the FAQs still render on-page; only the structured markup waits), exactly like the new `/faq` page. Quick change — awaiting go-ahead.

### Consolidated go-live gate (§2 confirm / supply) — hand to RGL
**Confirm (§2.1 / §2.3):**
- NAP — Avadi 600054 address + `hello@rgldecors.com` (currently Chennai + `rgldecors@gmail.com`).
- Warranty offer — reconcile USP "10-year" vs tier grid (Essential/Elite/Luxury/Signature); set the real period(s).
- Pricing units & per-sq.ft figures — confirm so `PRICING_INDICATIVE` can flip to false.
- EMI / no-cost-EMI terms — confirm or remove the claim (see NEW item above).
- Delivery guarantee — "45-day" clause wording / T&C.
- Finish count (1,000+ vs other) and any ™ on pillar names.

**Supply (§2.2):**
- Real projects (photos + consent), testimonials/ratings (to flip `REVIEWS_VERIFIED`), team/about figures (to flip `STATS_VERIFIED`).
- Logo + brand assets; area photos / local testimonials.
- Lookbook PDF (flip `LOOKBOOK.available` + set `url`).
- Verified email sender domain (`LEAD_FROM_EMAIL` / SMTP) so auto-replies deliver.
- Analytics decision + IDs (GA4 / GTM / Clarity / Pixel) — drop into env to enable; privacy auto-discloses.

**When the above are in:** flip the gate flags (one place each), drop in the assets, enable Review/AggregateRating + FAQPage schema, and re-run this suite.

---

## Recommended start
**Phase A (Design retheme)** — no client input needed, immediately visible, and it's the
foundation everything else inherits. One caution I'll handle in A: a gold fill (`#C8973A`) fails
AA contrast with white text, so gold CTAs use **charcoal/ink text** (or gold as accent/border) to
keep Accessibility at 100.
