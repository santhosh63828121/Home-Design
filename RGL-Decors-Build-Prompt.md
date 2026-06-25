# BUILD PROMPT — RGL Decors Modern Website (paste into VS Code / Claude Code)

> **How to use:** Save this file as `PROJECT_SPEC.md` (or `CLAUDE.md`) at the repo root and tell Claude Code: *"Read PROJECT_SPEC.md and build the full project per spec. Start by scaffolding, then build page by page. Ask before destructive changes."* Or paste the whole thing as your first message.

---

## 🎯 ROLE & OBJECTIVE

You are a **senior full-stack engineer + product designer**. Build a **production-ready, fully SEO-optimized, richly animated marketing website** for **RGL Decors**, an interior design firm in Chennai, India.

**Hard rules:**
- ✅ Use **ONLY the content/data + page structure** provided below (extracted from the existing site). Reproduce **every page** — do not drop a single one.
- ❌ Do **NOT** copy the old visual design. Create a **brand-new, unique, premium UI/UX** that out-classes the competitors listed in §8.
- ✅ Rewrite weak/spun copy into clean, original English (§9). Remove all competitor leakage.
- ✅ Every interactive element and section must use **modern, tasteful motion** (§7).
- ✅ Target **100/100 technical SEO** and green Core Web Vitals (§6).

---

## 🧱 1. TECH STACK (use exactly this)

- **Framework:** Next.js 14+ (App Router, Server Components, TypeScript, strict mode)
- **Styling:** Tailwind CSS + **shadcn/ui** (Radix primitives)
- **Animation:** **Framer Motion** (page/section/scroll/hover) + Tailwind transitions for micro-states; `lenis` for smooth scroll
- **Images:** `next/image` (AVIF/WebP, blur placeholders, lazy by default)
- **Icons:** `lucide-react`
- **Forms:** React Hook Form + Zod validation → **Server Actions** → store lead (Prisma + Postgres/SQLite) → email via Nodemailer/Resend → WhatsApp deep-link fallback
- **CMS-ready:** model Projects, Services, Blog, Pricing, Testimonials, Cities as typed content (MDX or a `content/` JSON layer) so they're editable without touching components
- **SEO:** native `generateMetadata`, `next-sitemap`, JSON-LD via a `<Schema>` component
- **Analytics:** GA4 + Search Console + Meta Pixel hooks (env-gated)
- **Quality:** ESLint + Prettier + TypeScript; responsive mobile-first; WCAG 2.1 AA
- **No** `localStorage`/`sessionStorage` reliance for core state; **no** unused dependencies.

**Folder structure:**
```
/app           → routes (App Router)
/components     → ui/ (shadcn), sections/, motion/, forms/
/content        → projects/, services/, blog/, cities/, pricing/, testimonials/
/lib            → seo.ts, schema.ts, validations.ts, actions.ts, utils.ts
/public         → images, og, icons, robots.txt
```

---

## 🏢 2. BRAND & BUSINESS DATA (single source of truth — use verbatim)

| Field | Value |
|---|---|
| Brand | **RGL DECORS** (RGL Décors Home Interiors) |
| Tagline | **"Dreams Delivered"** — *Complete interiors solution for your dream home. One place. Any budget.* |
| Niche | Interior designers · modular kitchens · wardrobes · turnkey/full-home interiors |
| HQ | Chennai, Tamil Nadu, India |
| Phone | **+91 86374 20482** (use as `tel:+918637420482`) |
| Email | **rgldecors@gmail.com** |
| WhatsApp | `https://wa.me/message/YCV7Y4IV2343N1` |
| Entry price signal | **"From ₹50,000"** (kitchen/bedroom) |
| Established | 2021 |

**Service-area cities (build pages for each):** Chennai · Coimbatore · Salem · Hosur · Krishnagiri · Dharmapuri · Kanchipuram · Chengalpattu (state-wide: Tamil Nadu)

**Social (footer `sameAs` + schema):**
- Facebook: `https://www.facebook.com/RGL-Décors-110995801229346/`
- Instagram: `https://www.instagram.com/rgl_decors/`
- YouTube: `https://www.youtube.com/channel/UCs_DL58FGnUhGFieKO_Yg2w`
- Twitter/X: `https://twitter.com/DecorsRgl`
- Pinterest: `https://in.pinterest.com/rgldecors/`

### 2.1 The 8 USPs (render as feature cards — keep all 8)
1. **Free 3D Walkthrough** — India's 1st enterprise to provide a complete 3D interior walkthrough in HD with 99% accuracy, free of cost.
2. **On-Time Delivery** — guaranteed move-in within **45 days** (T&C apply).
3. **Best Price** — market-lowest-price guarantee vs competitors, with superior materials.
4. **Precision Build** — everything manufactured in a modular automated factory; smooth, error- and bubble-free panels.
5. **10-Year Warranty** — on all core materials (physical damage excluded).
6. **100+ Quality Checks** — every product passes 100+ checks.
7. **1000+ Finishes** — laminate colors, textures, styles & design options.
8. **100% Free Customization** — fully customized wardrobes, modular kitchens & units to fit any space.

### 2.2 Service categories (15 — every one needs a real destination; no dead links)
TV/Entertainment units · Wardrobes · Cabinets · Wallpapers & Paintings · Crockery units · Modular kitchens · Storage units · Study units · Smart Homes · Bathroom fixtures · Art gallery & Artifacts · Plants & Landscaping · Home Appliances · Finished Furniture · Indoor & Outdoor Lighting

### 2.3 Design styles
Traditional · Modern · Contemporary (use as a portfolio filter + style-quiz outcomes)

### 2.4 Real projects (build as case studies — do not invent fake ones)
| Client | Project |
|---|---|
| Mr. Divakar | Restaurant / hotel interior (3D walkthrough) |
| Mr. Kiran | 2BHK apartment, fully furnished |
| Mr. Anbu | 2BHK apartment & villa |
| Mr. Muthu | Office interior + 3BHK villa |

---

## 🗺️ 3. COMPLETE SITEMAP — OLD → NEW (do not lose any page; add 301 redirects)

Every legacy URL must resolve via a **301 redirect** in `next.config.js` to its new clean URL.

| Legacy URL | New URL | Notes |
|---|---|---|
| `/` | `/` | Home — full rebuild |
| `/aboutus-whoweare` | `/about` | rewrite spun copy |
| `/3d-projectswalkthroughs` | `/3d-walkthrough` | video hub |
| `/rgl-museum` | `/portfolio` | gallery hub |
| `/photo-albums` | `/portfolio/albums` | merge into portfolio |
| `/plans-pricing` | `/interior-design-cost-chennai` | **was empty — must fill** |
| `/kitchen-units-interiors` | `/services/modular-kitchen-chennai` | **remove "Design Arc" text** |
| `/wardrobe-units-interiors` | `/services/wardrobe-design-chennai` | |
| `/entertainment-units-interiors` | `/services/tv-units-chennai` | |
| `/bedroom-units-interiors` | `/services/bedroom-interior-chennai` | |
| `/contactus` | `/contact` | add real form |
| `/blog` | `/blog` | activate |
| `/privacypolicy` | `/privacy-policy` | |
| `/copy-of-privacy-policy-1` | `/terms-and-conditions` | fix junk URL |
| `/copy-of-privacy-policy` | `/cancellation-refund-policy` | fix junk URL |

**New pages to add (close the gaps):**
```
/services                              (services hub — all 15 categories)
/services/living-room-interior-chennai
/services/full-home-interior-chennai   (turnkey hero offer)
/services/office-commercial-interior-chennai
/services/pooja-crockery-storage-units
/services/false-ceiling-lighting-painting
/services/smart-home-chennai
/interior-design-cost-chennai          (pricing hub)
  /modular-kitchen-price-chennai
  /2bhk-interior-cost-chennai
  /3bhk-interior-cost-chennai
/portfolio/[slug]                      (case studies)
/interior-designers                    (locations hub)
  /interior-designers-chennai
  /interior-designers-coimbatore
  /interior-designers-salem
  /interior-designers-hosur
  /interior-designers-krishnagiri
  /interior-designers-dharmapuri
  /interior-designers-kanchipuram
  /interior-designers-chengalpattu
/testimonials
/get-free-quote                        (distraction-free conversion landing)
/refer-and-earn
/careers                               (Join as a Designer)
/blog/[slug]
```

---

## 📄 4. PER-PAGE CONTENT & SECTION PLAN

**Global pattern:** `Hero → Trust strip → Value → Detail → Social proof → FAQ → CTA`.

**Sticky header (all pages):** logo, nav (Services ▾, Pricing, Portfolio, 3D Walkthrough, Locations ▾, About, Contact), persistent **"Get Free Quote"** button + click-to-call + WhatsApp icon. Mobile: hamburger + **floating action stack** (Call · WhatsApp · Quote).

**Home:** hero (H1 + dual CTA + trust badges: *10-yr warranty · 45-day move-in · 100+ QC · From ₹50,000*) → 8 USP cards → 15-category services grid (all linked) → style selector (Traditional/Modern/Contemporary) → 3 featured case studies → 3D walkthrough teaser (YouTube) → pricing teaser → 6-step process → brands strip → testimonials + rating → lead form → FAQ (unique) → footer.

**About:** clean rewritten story + mission → "why choose us" → stats counters (homes delivered, years, designers, cities — animate count-up) → team → mini process → CTA.

**Service page template:** H1 "{Service} in Chennai" → original intro → types/options → materials & finishes (1000+ laminates) → branded hardware → price range + EMI → 8–12 portfolio images (**real alt text**) → "Get free 3D design" CTA → process → 4–5 **unique** FAQs → internal links to related services + pricing.

**Pricing hub (`/interior-design-cost-chennai`) — TOP PRIORITY (legacy page was blank):** transparent ranges table (Modular Kitchen from ₹50,000 · Essentials 2BHK · Premium 3BHK · Full-Home Turnkey) → what's included/excluded → material tiers → **EMI / no-cost-EMI** → **interactive cost calculator** (room/BHK/finish inputs → live estimate → capture lead) → "Get exact quote" form.

**Portfolio:** filterable masonry grid (room / style / BHK / budget) with skeleton loaders; each `/portfolio/[slug]` = brief, BHK, area, scope, budget band, **before/after slider**, 3D-vs-final toggle, walkthrough embed, testimonial, "Get similar design" CTA.

**3D Walkthrough:** lead with "India's 1st / 99% accuracy / free" → YouTube embeds (Divakar, Kiran, Anbu, Muthu) → how it works → booking form.

**Location template:** H1 "Interior Designers in {City}" → **unique** local intro (no duplication) → services → {City} projects → coverage areas → local FAQ → form. Each city page = LocalBusiness schema.

**Contact / Get-Free-Quote:** full form (name, phone, email, city, home type, budget, message) + click-to-call + WhatsApp + Google Map embed + hours + response-time promise + autoresponder.

**Blog:** index + article template (TOC, share, related posts, CTA). Seed with cost/ideas/comparison clusters.

**Legal:** clean URLs, plain-language summary up top.

---

## 🎨 5. DESIGN SYSTEM (make it unique & premium — not a template)

- **Mood:** premium, warm, editorial — let interior photography be the hero. Generous whitespace, confident type, restrained accent.
- **Palette:** warm neutrals (ivory `#FAF7F2`, sand, charcoal `#1C1B19`) + **one** accent (deep forest green **or** terracotta). Light theme default; optional dark.
- **Typography:** display serif for headings (Fraunces / Playfair Display), clean sans for body (Inter). Max 2 families. Fluid type scale (`clamp()`).
- **Components:** `rounded-2xl` cards, soft layered shadows, subtle hover lift, glassy sticky header on scroll.
- **Imagery:** consistent aspect ratios, real projects only, AVIF/WebP, blur-up placeholders.
- **Signature UI:** before/after slider · 3D-vs-reality toggle · sticky cost calculator · "Find your style in 30s" quiz (email capture) · animated stat counters · floating contact stack.
- Define everything as **design tokens** (Tailwind theme: colors, spacing, radius, shadows, typography) so the system is consistent and themeable.

---

## ⚙️ 6. SEO — 100% (technical + on-page + schema + performance)

**On-page (per page via `generateMetadata`):**
- Exactly **one `<h1>`** per page; logical H2/H3 nesting.
- Unique title (≤60 chars) + meta description (150–160 chars) + canonical + OG/Twitter tags. Use the table below.
- Descriptive, keyword-relevant **alt text** on every image (no stuffing).
- Clean, lowercase, hyphenated, keyword-first URLs (already defined in §3).

| Page | Title | H1 |
|---|---|---|
| Home | Interior Designers in Chennai \| RGL Decors | Interior Designers in Chennai — Dreams Delivered |
| Modular Kitchen | Modular Kitchen Chennai \| Designs from ₹50,000 | Modular Kitchen Designs in Chennai |
| Wardrobe | Wardrobe Designs Chennai \| Custom Wardrobes | Custom Wardrobe Designs in Chennai |
| Bedroom | Bedroom Interior Designers in Chennai \| RGL | Bedroom Interior Designs in Chennai |
| TV Units | TV Unit & Entertainment Designs Chennai | TV Unit & Entertainment Interiors |
| Full Home | Full Home Interiors Chennai \| Turnkey 45 Days | Full Home Interior Design in Chennai |
| Pricing | Interior Design Cost in Chennai \| 2 & 3BHK Pricing | Interior Design Cost in Chennai |
| 3D | Free 3D Interior Walkthrough \| RGL Decors | Free 3D Interior Walkthroughs |
| Portfolio | Interior Design Portfolio Chennai \| RGL Decors | Our Interior Design Projects |
| About | About RGL Decors \| Interior Designers Chennai | About RGL Decors |
| Contact | Contact RGL Decors \| Free Interior Quote | Get Your Free Interior Quote |
| City | Interior Designers in {City} \| RGL Decors | Interior Designers in {City} |

**Technical:**
- `sitemap.xml` (next-sitemap) + clean `robots.txt`. **Remove any `noimageindex`** — allow image indexing (visual business).
- **JSON-LD schema:** `LocalBusiness`/`HomeAndConstructionBusiness` (NAP, geo, hours, `sameAs`), `Service`, `BreadcrumbList`, `FAQPage` (real Qs only), `ImageObject`, `AggregateRating`/`Review`.
- Breadcrumbs site-wide. Internal-linking hub-and-spoke (Home → services + cities; service ↔ related + pricing + portfolio; blog → money pages).
- **Footer:** convert the old plain-text city list into **real `<Link>`s** to city/service pages (no keyword stuffing).

**Performance / CWV (target green):** LCP < 2.5s, CLS < 0.1, INP < 200ms. Image optimization, font `display: swap` + preconnect, code-splitting, minimal JS on first paint, skeleton loaders. Run Lighthouse — aim **95+** across Performance/SEO/Best-Practices/Accessibility.

---

## 🎬 7. ANIMATION SYSTEM (every click + every section — tasteful, performant)

Use **Framer Motion**; respect `prefers-reduced-motion` (disable non-essential motion).

- **Page transitions:** subtle fade/slide between routes.
- **Scroll reveals:** sections fade-up + stagger children on enter (`whileInView`, `viewport={{ once: true }}`).
- **Hover/tap micro-interactions:** buttons (scale + shadow), cards (lift + image zoom), nav links (animated underline), icons (subtle bounce). Every clickable element has a visible motion + focus state.
- **Hero:** parallax or slow Ken-Burns on hero image; staggered headline word reveal.
- **Counters:** count-up when stats scroll into view.
- **Portfolio:** layout animations on filter (`layout` prop), image hover zoom, lightbox spring open.
- **Before/after:** draggable slider with spring.
- **Sticky header:** shrink + blur background on scroll.
- **Forms:** animated inline validation, loading spinner/skeleton on submit, success checkmark animation.
- **Floating CTA stack:** gentle entrance + pulse on the primary action.
- Keep durations 150–500ms, easing natural (`easeOut`/spring). **No jank, no layout shift** from animation.

---

## 🧲 8. COMPETITOR BENCHMARKS (visit, learn, then beat)

Open each, study their **hero, pricing/calculator, galleries, trust signals, CTAs, city pages, and lead flow**, then design something cleaner and more distinctive (don't clone):

- **Livspace Chennai** — `https://www.livspace.com/in/interiors/chennai` → polished room-wise catalog, "designs starting at" pricing, EMI, strong visual hierarchy.
- **DesignCafe Chennai** — `https://www.designcafe.com/cities/interior-designers-chennai/` → city pages, 3D design experience, design-ideas content, warranty messaging.
- **D'LIFE Chennai** — `https://dlifeinteriors.com/location/chennai/` → South-India focus, factory-made messaging, detailed product pages.
- **Decorpot Chennai** — `https://www.decorpot.com/interior-designers-in-chennai` → transparent package pricing + cost calculator, before/after.
- **Deejos Interiors** — `https://www.deejos.co.in/` → sq-ft-based pricing, local Chennai positioning.
- **The Plank Interiors** — `https://theplank.in/` → boutique aesthetic, project storytelling.
- **HomeLane** — `https://www.homelane.com/` → online design configurator/visualizer, "book free design session," reviews & trust badges.
- **Bizopo** — `https://bizopo.com/` → benchmark its lead-capture / directory conversion patterns.

**Differentiators to win on:** lead hard with the **free 3D walkthrough + 10-yr warranty + 45-day move-in + transparent ₹ pricing** (most rivals hide pricing) — wrapped in a more premium, editorial, animated experience.

---

## ✍️ 9. CONTENT REWRITE RULES (fix the legacy problems)

1. **Delete every trace of competitor "Design Arc" content** and any link to `designarcinteriors.com` from the kitchen/service copy. Write fresh, original service descriptions.
2. **FAQs:** the old site repeated one identical answer everywhere — write **unique, specific** Q&As per page (kitchen FAQs about layouts/materials, wardrobe FAQs about types, pricing FAQs about EMI, etc.).
3. **Rewrite the spun About/Vision copy** ("hoist their spaces," "scrupulousness to comfort your psyche," etc.) into clean, warm, professional English.
4. **No keyword-stuffed alt text** — write human, descriptive alt for each image.
5. Keep all factual claims from §2 (warranty, 45 days, 99% accuracy, ₹50,000, 100+ QC) — these are the brand's real selling points.

---

## ✅ 10. DEFINITION OF DONE (acceptance criteria)

- [ ] Every legacy page reproduced; every legacy URL 301-redirects to its new clean URL.
- [ ] All 15 service categories link to real pages (zero dead links).
- [ ] Pricing page is **fully populated** with ranges, EMI, and a working cost calculator.
- [ ] No competitor content/links anywhere; all FAQs unique; About copy rewritten.
- [ ] Working lead form (validation → stored → email → WhatsApp fallback) + autoresponder.
- [ ] Floating Call/WhatsApp/Quote stack on mobile; persistent Quote CTA in header.
- [ ] Unique title/description/canonical/OG + single H1 per page; JSON-LD schema on all relevant pages; sitemap + robots correct (image indexing allowed).
- [ ] Framer Motion animations on transitions, scroll reveals, hovers, counters, portfolio filter, before/after, forms — all respecting reduced-motion.
- [ ] Lighthouse ≥ 95 Performance/SEO/Best-Practices/Accessibility; CWV green; fully responsive; WCAG AA.
- [ ] Clean, typed, componentized code; content editable from `/content`; README with setup + env vars.

**Build order:** scaffold + design tokens + layout/header/footer → Home → Services + Pricing → Portfolio + case studies → 3D + Locations → About/Contact/Blog/Legal → SEO/schema/sitemap pass → animation polish → Lighthouse + a11y pass.
