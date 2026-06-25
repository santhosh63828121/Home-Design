# RGL Decors — Full Website Strategy & Rebuild Plan
**Source:** https://www.rgldecors.com (Wix) · Interior design firm, Chennai/Tamil Nadu
**Prepared from live scraped data** — Home, About, Plans & Pricing, Kitchen, Project Walkthroughs + navigation/footer across all pages.

---

## 0. SCRAPED DATA (Source of Truth — nothing dropped)

### 0.1 Business identity
| Field | Value (as found on site) |
|---|---|
| Brand | RGL DECORS (RGL Décors Home Interiors) |
| Tagline | "DREAMS DELIVERED" / "Complete interiors solution for your Dream home — one place, any budget" |
| Category | Interior designers · modular kitchens · wardrobes · turnkey/full-home interiors |
| Base | Chennai, Tamil Nadu |
| Phone | +91 86374 20482 |
| Email | rgldecors@gmail.com |
| WhatsApp | wa.me/message/YCV7Y4IV2343N1 |
| Platform | Wix.com Website Builder |
| Copyright | © RGLDECORS.COM 2021 |
| Entry price signal | "Kitchen / Bedroom Interiors **From Rs. 50,000**" |

### 0.2 Service areas (named on site)
Chennai · Dharmapuri · Salem · Coimbatore · Kanchipuram · Chengalpattu · Krishnagiri · Hosur · Tamil Nadu (state-wide)

### 0.3 Social profiles
- Facebook: facebook.com/RGL-Décors-110995801229346
- Instagram: instagram.com/rgl_decors/
- YouTube: youtube.com/channel/UCs_DL58FGnUhGFieKO_Yg2w
- Twitter/X: twitter.com/DecorsRgl
- Pinterest: in.pinterest.com/rgldecors/

### 0.4 Current sitemap (15 live URLs)
| # | Page | URL |
|---|---|---|
| 1 | Home | `/` |
| 2 | Who We Are | `/aboutus-whoweare` |
| 3 | Project Walkthroughs | `/3d-projectswalkthroughs` |
| 4 | RGL Museum (gallery hub) | `/rgl-museum` |
| 5 | Plans & Pricing | `/plans-pricing` |
| 6 | Entertainment / TV Units | `/entertainment-units-interiors` |
| 7 | Bedroom Interiors | `/bedroom-units-interiors` |
| 8 | Kitchen Interiors | `/kitchen-units-interiors` |
| 9 | Wardrobe Interiors | `/wardrobe-units-interiors` |
| 10 | Contact Us | `/contactus` |
| 11 | Privacy Policy | `/privacypolicy` |
| 12 | Terms & Conditions | `/copy-of-privacy-policy-1` |
| 13 | Cancellation/Refund/Return | `/copy-of-privacy-policy` |
| 14 | Blog | `/blog` |
| 15 | Photo Albums | `/photo-albums` |

### 0.5 Stated USPs (8 — keep these, they're strong selling points)
1. **Free 3D Walkthrough** — "India's 1st enterprise providing complete 3D walkthrough… HD quality & 99% accuracy, free of cost."
2. **On-time delivery** — guaranteed move-in within **45 days** (T&C).
3. **Best price** — market-lowest-price guarantee vs competitors, superior material.
4. **Precision build** — fully manufactured in modular automated factory; smooth, error- and bubble-free panels.
5. **Hassle-free for a decade** — **10-year warranty** on core materials (physical damage excluded).
6. **100+ quality checks** per product.
7. **Make it colorful** — 1000+ laminate colors, textures, styles.
8. **Free customization** — 100% customized wardrobes, modular kitchens & units.

### 0.6 Service categories advertised on Home (15)
TV units · Wardrobes · Cabinets · Wallpapers & Paintings · Crockery units · Modular kitchens · Storage units · Study units · Smart Homes · Bathroom fixtures · Art gallery & Artifacts · Plants & Landscaping · Home Appliances · Finished Furniture · Indoor & Outdoor Lighting

> ⚠️ Only **4** of these have real pages (TV, Bedroom, Kitchen, Wardrobe). The other 11 are dead icons.

### 0.7 Design styles described
Traditional · Modern · Contemporary

### 0.8 Real projects (from Walkthroughs page — your social proof goldmine)
| Client | Project |
|---|---|
| Mr. Divakar | Restaurant / hotel interior walkthrough |
| Mr. Kiran | 2BHK apartment, fully furnished |
| Mr. Anbu | 2BHK apartment & villa |
| Mr. Muthu | Office interiors + 3BHK villa |

### 0.9 🔴 Critical problems found (the real value of this audit)
1. **Plans & Pricing page is EMPTY** — renders "No plans available." Yet its SEO title promises *"Interior Design Packages Chennai | 2BHK & 3BHK Pricing."* Highest-intent page on the site is blank.
2. **Kitchen page contains a COMPETITOR'S content** — body text reads *"At Design Arc we create kitchen designs…"* and links **twice** to `designarcinteriors.com`. You are passing link equity and credibility to a competitor. Copy-paste job never edited.
3. **All FAQ answers are IDENTICAL** — wardrobe, furniture, landscaping, bathroom questions all return the same "office interiors" paragraph. Duplicate content + broken UX.
4. **Footer city list is plain text, not links** — "Top Interior Designs in Chennai/Salem/Coimbatore…" ×27 entries. Pure keyword stuffing, zero SEO value, zero internal linking.
5. **CTAs are `tel:` links only** — no lead-capture form on most pages, no WhatsApp click-to-chat as primary action, no email capture. Mobile users who don't call are lost.
6. **About/Vision copy is spun/garbled** — "hoist their spaces," "scrupulousness to comfort your psyche," "draw in with their surroundings." Reads as machine-spun; erodes trust.
7. **Image alt text is keyword-stuffed nonsense** — e.g. *"Kitchen Interiors Bedroom Interiors From Rs:50,000 kitchen design ideas,modular kitchen design,modul…"* Bad for accessibility and image SEO.
8. **Meta titles are concatenated/duplicated** — multiple titles jammed into one tag across pages.
9. **Non-semantic URLs** — Terms = `/copy-of-privacy-policy-1`, Cancellation = `/copy-of-privacy-policy`.
10. **`noimageindex` robots tag** — actively blocks image indexing for a *visual* business that should win Google Images.
11. **No real trust signals** — no review counts, no testimonials with names, no "X homes delivered," no team, no Google rating embed.
12. **Thin/empty content pages** — most category icons lead nowhere; no city landing pages despite targeting 9 cities.

---

## 1. COMPLETE WEBSITE SITEMAP (Proposed)

Hub-and-spoke structure. Bold = new/rebuilt. Designed for crawl depth ≤ 3 from home.

```
/
├── /about                                  (rewrite of /aboutus-whoweare)
│   ├── /about/team
│   └── /about/process                      ← the 45-day, 6-step delivery journey
│
├── SERVICES (hub)            /interior-design-services
│   ├── /modular-kitchen-chennai            (rebuild /kitchen-units-interiors)
│   ├── /wardrobe-design-chennai            (rebuild /wardrobe-units-interiors)
│   ├── /tv-units-entertainment-chennai     (rebuild /entertainment-units-interiors)
│   ├── /bedroom-interior-chennai           (rebuild /bedroom-units-interiors)
│   ├── /living-room-interior-chennai       ★ new
│   ├── /full-home-interior-chennai         ★ new — turnkey hero offer
│   ├── /office-commercial-interior-chennai ★ new (you already pitch this in FAQ)
│   ├── /pooja-unit-crockery-storage        ★ new (consolidate crockery/storage/study)
│   └── /false-ceiling-lighting-painting    ★ new (consolidate ceiling/lighting/wallpaper)
│
├── PRICING                   /interior-design-cost-chennai   ← REBUILD (currently empty)
│   ├── /modular-kitchen-price-chennai
│   ├── /2bhk-interior-cost-chennai
│   └── /3bhk-interior-cost-chennai
│
├── PORTFOLIO (hub)           /portfolio                       (rebuild /rgl-museum + /photo-albums)
│   ├── /portfolio/modular-kitchens
│   ├── /portfolio/wardrobes
│   ├── /portfolio/full-home
│   └── /portfolio/[project-slug]           ← case studies (Kiran 2BHK, Divakar restaurant…)
│
├── 3D WALKTHROUGHS           /3d-walkthrough-interior         (rebuild /3d-projectswalkthroughs)
│
├── LOCATIONS (hub)           /interior-designers              ★ new
│   ├── /interior-designers-chennai
│   ├── /interior-designers-coimbatore
│   ├── /interior-designers-salem
│   ├── /interior-designers-hosur
│   ├── /interior-designers-krishnagiri
│   ├── /interior-designers-dharmapuri
│   ├── /interior-designers-kanchipuram
│   └── /interior-designers-chengalpattu
│
├── /testimonials                           ★ new
├── /blog  +  /blog/[slug]                  (activate /blog)
├── /contact                                (rebuild /contactus)
├── /get-free-quote                         ★ new — dedicated conversion landing page
├── /careers  (Join as a Designer)          ★ new
├── /refer-and-earn                         ★ new (referral is already mentioned)
│
└── LEGAL
    ├── /privacy-policy
    ├── /terms-and-conditions               (fix from /copy-of-privacy-policy-1)
    └── /cancellation-refund-policy         (fix from /copy-of-privacy-policy)
```

**Plus a real `sitemap.xml` + `robots.txt`** (remove `noimageindex`; allow image crawl).

---

## 2. PAGE-WISE LAYOUT & CONTENT PLAN

Pattern for every page: **Hero → Proof → Value → Detail → Social proof → FAQ → CTA**.

### 2.1 Home `/`
1. **Sticky header** — logo, nav, phone, persistent "Free Quote" button + WhatsApp icon.
2. **Hero** — H1 + sub + dual CTA ("Get Free Quote" / "Book Free 3D Walkthrough") + hero image or 8-sec muted walkthrough loop. Trust strip: *10-yr warranty · 45-day move-in · 100+ QC · From ₹50,000*.
3. **Why RGL (8 USP cards)** — keep all 8, as icon cards.
4. **Services grid (15 categories)** — every card links to a real page (no dead icons). 
5. **Style selector** — Traditional / Modern / Contemporary, each → filtered portfolio.
6. **Featured projects** — 3 real case studies (Kiran 2BHK, Divakar restaurant, Muthu 3BHK villa).
7. **3D walkthrough teaser** — embedded YouTube + "Get your free 3D walkthrough."
8. **Pricing teaser** — "2BHK from ₹X · 3BHK from ₹Y · Kitchen from ₹50,000" → Pricing page.
9. **Process (6 steps)** — consult → 3D design → factory build → 100+ QC → install → 10-yr warranty.
10. **Brands strip** — hardware/laminate brands used.
11. **Testimonials + Google rating.**
12. **Lead form** (name, phone, home type, city) + WhatsApp.
13. **FAQ (5–6 unique).**
14. **Footer** — real linked columns (services, locations, company, legal, social).

### 2.2 About `/about`
Rewrite the spun copy in clean English. Blocks: founder story + mission · "Why homeowners choose us" (warranty/factory/3D) · stats (homes delivered, years, designers, cities) · team photos · mini process · culture/careers link · CTA.

### 2.3 Service pages (template, e.g. Modular Kitchen)
H1 "Modular Kitchen Designs in Chennai" → intro (original, **remove all Design Arc text**) → layout types (L/U/parallel/island) → materials & finishes (1000+ laminates) → branded hardware → price range + EMI → 8–12 portfolio images (real alt text) → "Get free 3D design" CTA → process → 4–5 unique FAQs → internal links to wardrobe/full-home/pricing.

### 2.4 Pricing `/interior-design-cost-chennai` (HIGHEST PRIORITY — fix the blank page)
Transparent ranges (not just "request quote"):

| Package | Scope | Indicative range |
|---|---|---|
| Modular Kitchen | Base + tall + loft, hardware | From ₹50,000 |
| Essentials 2BHK | Kitchen + 2 wardrobes + TV unit | ₹X–₹Y |
| Premium 3BHK | Full home, branded fittings | ₹X–₹Y |
| Full Home Turnkey | Civil + false ceiling + furniture | Custom |

Add: what's included/excluded · material tiers · **EMI/no-cost-EMI** · add-ons · interactive **cost calculator** (your build) · "Get exact quote" form. *Even ₹-ranges convert far better than a blank page.*

### 2.5 Portfolio `/portfolio` + case studies
Filterable grid (room type / style / BHK / budget). Each project = brief, BHK, area, scope, budget band, before/after, 3D-vs-final, walkthrough embed, testimonial, "Get similar design" CTA.

### 2.6 3D Walkthrough page
Lead with the "India's 1st / 99% accuracy / free" claim → 4–6 YouTube embeds (Divakar, Kiran, Anbu, Muthu) → how it works → **"Book your free 3D walkthrough"** form.

### 2.7 Location pages (template)
H1 "Interior Designers in {City}" → local intro → services → {City} projects → coverage areas → local FAQ → form. *Differentiate copy per city — no duplication.*

### 2.8 Contact / Get-Free-Quote
Form (name, phone, email, city, home type, budget, message) + click-to-call + WhatsApp + map + hours + response-time promise. `/get-free-quote` = distraction-free landing page for ad traffic.

### 2.9 Blog
Activate with SEO clusters (see §5.6). Each post → relevant service + CTA.

### 2.10 Legal — clean URLs, plain-language summaries on top.

---

## 3. UI/UX CONCEPTS & DESIGN IDEAS

### 3.1 Direction
Premium-but-warm. Let interiors be the hero: large imagery, generous whitespace, restrained type. Mobile-first (most TN homeowner traffic is mobile).

### 3.2 Visual system
- **Palette:** warm neutrals (ivory, sand, charcoal) + one accent (deep green or terracotta). Light default.
- **Type:** display serif for headings (e.g. *Fraunces/Playfair*), clean sans for body (*Inter*). Max 2 families.
- **Imagery:** consistent ratios, real projects only, lazy-loaded, `next/image` AVIF/WebP, blur placeholder.
- **Components:** rounded-2xl cards, soft shadows, subtle hover lift.

### 3.3 Signature interactions
- **Before/After slider** on case studies.
- **3D-vs-reality toggle** (render ↔ photo).
- **Sticky cost calculator** that follows scroll on service pages.
- **Style quiz** ("Find your style in 30s") → email capture + tailored portfolio.
- **Floating action stack** (mobile): Call · WhatsApp · Quote, always visible.

### 3.4 Recommended stack (matches your toolset)
- **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.**
- CMS: **Sanity/Payload** (or MDX) for projects/blog/pricing — non-devs edit without touching code.
- Forms: server actions → DB (Prisma) + email (Nodemailer/Resend) + WhatsApp link.
- Images: `next/image` + Cloudinary.
- **This kills the Wix limitations**: clean URLs, real schema, image SEO, Core Web Vitals control.

### 3.5 Performance & a11y
LCP < 2.5s, CLS < 0.1 · skeleton loaders on portfolio/forms · semantic headings · descriptive alt text · visible focus states · WCAG AA contrast.

---

## 4. SEO STRATEGY

### 4.1 Primary keywords
`interior designers in chennai` · `modular kitchen chennai` · `wardrobe designs chennai` · `home interiors chennai` · `2bhk / 3bhk interior design chennai` · `interior design cost chennai` · `full home interior chennai` · `office interior designers chennai` · `best interior designers in tamil nadu`
Long-tail: `modular kitchen price in chennai`, `interior designers in coimbatore/salem/hosur`, `small modular kitchen design india`, `turnkey interior chennai 45 days`.

### 4.2 Title tags & H1s (one focused title per page)

| Page | Title tag (≤60 chars) | H1 |
|---|---|---|
| Home | Interior Designers in Chennai \| RGL Decors | Interior Designers in Chennai — Dreams Delivered |
| Kitchen | Modular Kitchen Chennai \| Designs from ₹50,000 | Modular Kitchen Designs in Chennai |
| Wardrobe | Wardrobe Designs Chennai \| Custom Wardrobes | Custom Wardrobe Designs in Chennai |
| Bedroom | Bedroom Interior Designers in Chennai \| RGL | Bedroom Interior Designs in Chennai |
| TV Units | TV Unit & Entertainment Designs Chennai | TV Unit & Entertainment Interiors |
| Full Home | Full Home Interiors Chennai \| Turnkey 45 Days | Full Home Interior Design in Chennai |
| Pricing | Interior Design Cost in Chennai \| 2&3BHK Pricing | Interior Design Cost in Chennai |
| 3D | Free 3D Interior Walkthrough \| RGL Decors | Free 3D Interior Walkthroughs |
| Portfolio | Interior Design Portfolio Chennai \| RGL Decors | Our Interior Design Projects |
| About | About RGL Decors \| Interior Designers Chennai | About RGL Decors |
| Contact | Contact RGL Decors \| Free Interior Quote | Get Your Free Interior Quote |
| City | Interior Designers in {City} \| RGL Decors | Interior Designers in {City} |

**Rule:** exactly **one H1** per page; sub-sections use H2/H3. (Today titles are duplicated/concatenated — fix all.)

### 4.3 Meta descriptions
150–160 chars, unique, benefit + CTA. e.g. Kitchen: *"Modular kitchen designs in Chennai from ₹50,000. 1000+ laminates, branded hardware, 10-yr warranty & free 3D design. Book a free site visit."*

### 4.4 URL rules
Lowercase, hyphenated, keyword-first, no `copy-of-…`. Migrate old → new with **301 redirects** (map every one of the 15 URLs).

### 4.5 Technical SEO
- Remove `noimageindex`; submit `sitemap.xml`; clean `robots.txt`.
- **Schema:** LocalBusiness/HomeAndConstructionBusiness (NAP, geo, hours, social `sameAs`), Service, FAQPage (real Qs only), BreadcrumbList, ImageObject, Review/AggregateRating.
- **Google Business Profile** per city + embed reviews.
- Fix the FAQ duplication (Google may flag/ignore identical answers).
- Compress images; preconnect fonts; ship Core Web Vitals green.

### 4.6 Content/blog clusters
*Cost & planning:* "Modular kitchen cost in Chennai 2026", "How much to furnish a 2BHK in Chennai". *Ideas:* "20 small modular kitchen designs", "Wardrobe designs for small bedrooms". *Comparisons:* "Acrylic vs laminate", "Carcass materials compared". *Local:* "Best interior styles for Chennai apartments". Each post links to its money page.

---

## 5. CONTENT FLOW & CTAs

### 5.1 Funnel mapping
- **TOFU** (blog, style quiz, Pinterest) → soft CTA: "Download price guide / Take style quiz."
- **MOFU** (service, portfolio, 3D) → "Book free 3D walkthrough / See pricing."
- **BOFU** (pricing, contact, location) → "Get free quote / WhatsApp now / Book site visit."

### 5.2 CTA system (replace tel-only)
- **Primary:** *Get Free Quote* (form) — every page.
- **Secondary:** *WhatsApp Us* (click-to-chat) — your strongest channel for this market.
- **Tertiary:** *Call Now* (keep `tel:`).
- **Micro:** *Book Free 3D Walkthrough*, *Download Price Guide*, *Take Style Quiz*.
One primary CTA repeated 3–4× per long page (hero, mid, end, sticky bar).

### 5.3 Per-page primary CTA
Home → Free Quote · Service → Free 3D Design · Pricing → Get Exact Quote · Portfolio → Get Similar Design · 3D → Book Walkthrough · Blog → Download Guide · City → Free Site Visit.

### 5.4 Form best practice
Short (name + phone + city + home type), inline validation, skeleton on submit, thank-you with WhatsApp + response-time promise, autoresponder email.

---

## 6. BACKLINK & INTERNAL LINKING STRATEGY

### 6.1 Internal linking (hub-and-spoke)
- Home → all service hubs + top cities (real links).
- Service ↔ related services + matching portfolio + pricing.
- Portfolio case study → its service + city page.
- Blog → money pages (3–5 contextual links each).
- City → services + city projects + contact.
- **Footer:** turn the 27 plain-text city entries into **real links** to city/service pages.
- Breadcrumbs site-wide. Descriptive anchors (not "click here").

### 6.2 Backlink acquisition
- **Citations/NAP:** JustDial, Sulekha, IndiaMART, Google Business, Bing Places, Houzz India, AsoMugulu/local directories — consistent NAP.
- **Niche:** Houzz, designer marketplaces, supplier/brand partner pages (hardware/laminate brands).
- **Local press & blogs:** Chennai lifestyle/real-estate sites, builder & apartment-community partnerships.
- **Content links:** original cost guides + project case studies → outreach to home-decor roundups.
- **Social/video:** YouTube walkthroughs (link in description), Pinterest boards (huge for interiors → drives referral + links), Instagram link-in-bio to quote page.
- **Reviews → links:** Google/JustDial review drive (also conversion proof).
- **Referral program** page = natural shares.
- ✅ **Reclaim the Design Arc links** — removing them stops leaking equity to a competitor (a backlink *win* by subtraction).

### 6.3 Avoid
Paid link farms, keyword-stuffed footers (current city list), thin duplicate city pages with spun text.

---

## 7. UX & LEAD-GENERATION IMPROVEMENTS (Priority-ordered)

### 🔴 Critical (do first)
1. **Fill the Pricing page** — ranges + EMI + calculator. Highest-intent page is currently blank.
2. **Delete all "Design Arc" content + links** from Kitchen (and audit every page for copied text).
3. **Add a real lead form** on Home, Service, Contact, Pricing — not just `tel:`.
4. **Add WhatsApp click-to-chat** as a persistent floating button.
5. **Fix duplicate FAQ answers** — write unique answers per question.

### 🟠 High
6. Rewrite spun About/Vision copy in clean English.
7. Make footer city entries real links (or remove the stuffing).
8. One unique H1 + clean title/meta per page.
9. Real alt text on every image; remove `noimageindex`.
10. Build the 11 missing service pages (or remove dead icons).
11. Add testimonials + Google rating + "homes delivered" counter.

### 🟡 Medium
12. Convert projects into full case studies (before/after, budget, walkthrough).
13. Launch city landing pages for all 9 areas.
14. Add the cost calculator + style quiz (lead magnets).
15. Activate blog with cost/ideas clusters.
16. Clean/301 all legacy URLs.

### 🟢 Ongoing
17. Exit-intent "Download free price guide" capture.
18. A/B test hero CTA copy.
19. Retarget form-starters; nurture via WhatsApp/email.
20. Monthly Core Web Vitals + Search Console review.

### Lead-gen quick wins (highest ROI, lowest effort)
- Floating **WhatsApp + Call + Quote** stack (mobile) → instant contact lift.
- **Pricing ranges** instead of blank page → captures the most commercial searches.
- **Sticky "Get Free Quote"** in header on every page.
- **Lead magnet** ("2026 Chennai Interior Price Guide PDF") → emails for nurture.

---

## 8. 30-60-90 EXECUTION ROADMAP

**Days 1–30 (stop the bleeding):** remove Design Arc content; fill Pricing; add forms + WhatsApp; fix FAQ; rewrite About; one H1/title/meta per page.
**Days 31–60 (rebuild on Next.js):** migrate off Wix → Next.js + Tailwind + shadcn + CMS; 301 map all URLs; build service + city + portfolio templates; schema + sitemap; image SEO.
**Days 61–90 (grow):** publish blog clusters + calculator + style quiz; citations & Google Business per city; review drive; Pinterest/YouTube link-building; analytics & CRO loop.

---

*Built entirely from live scraped data of rgldecors.com. Every current page, USP, service, project, contact detail, and defect above reflects what is actually published on the site today.*
