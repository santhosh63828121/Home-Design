# PHP Migration Map

This document establishes the 1-to-1 migration mapping from the existing Next.js / TypeScript / Prisma codebase to the target PHP MVC architecture for RGL Decors.

## 1. Core Framework & Configuration Mapping

| Next.js / TS File | Target PHP File | Purpose / Role | Migration Status |
|---|---|---|---|
| `package.json` / `tsconfig.json` | `composer.json` | Dependency management & PSR-4 autoloading | PLANNED |
| `next.config.mjs` | `config/app.php` | App settings, base paths, headers | PLANNED |
| `.env` / `.env.example` | `.env` / `.env.example` | Environment variables (DB, Mail, App) | PLANNED |
| `src/middleware.ts` | `app/Middleware/RedirectMiddleware.php` & `public/.htaccess` | 301 Legacy redirects & routing engine | PLANNED |
| `prisma/schema.prisma` | `database/migrations/001_create_leads_table.sql` | Database schema & MySQL table creation | PLANNED |
| `src/lib/db.ts` | `app/Services/Database.php` | PDO MySQL database connection helper | PLANNED |

## 2. Server Actions & Backend Logic Mapping

| Next.js Server Action | Target PHP Controller / Service | Purpose | Migration Status |
|---|---|---|---|
| `src/app/actions/lead.ts` | `app/Controllers/LeadController.php` | Form submission, lead validation, DB store | PLANNED |
| `src/app/actions/contact.ts` | `app/Controllers/ContactController.php` | Contact form submission handler | PLANNED |
| `src/app/actions/career.ts` | `app/Controllers/CareerController.php` | Career application & file upload processing | PLANNED |
| `src/app/actions/lookbook.ts` | `app/Controllers/LookbookController.php` | Lookbook access request & lead capture | PLANNED |
| `src/lib/email.ts` | `app/Services/EmailService.php` | PHPMailer / SMTP transactional email system | PLANNED |
| `src/lib/leads.ts` | `app/Models/Lead.php` | Lead model & data manipulation | PLANNED |

## 3. Data Store Mapping (`src/data/` → PHP Data Models/Services)

| Next.js Data File | Target PHP Class / File | Architecture Role | Migration Status |
|---|---|---|---|
| `src/data/business.ts` | `app/Services/BusinessData.php` | Core business info, USPs, contacts | PLANNED |
| `src/data/services.ts` | `app/Services/ServiceData.php` | 15 Service categories & specifications | PLANNED |
| `src/data/pricing.ts` | `app/Services/PricingData.php` | Pricing tiers, 2BHK/3BHK costs, kitchen price | PLANNED |
| `src/data/portfolio.ts` | `app/Services/PortfolioData.php` | Case studies, project galleries, before/after | PLANNED |
| `src/data/locations.ts` | `app/Services/LocationData.php` | City location landing page data (16 areas) | PLANNED |
| `src/data/faq.ts` | `app/Services/FaqData.php` | FAQ categories and Q&A items | PLANNED |
| `src/data/blogCategories.ts` | `app/Services/BlogData.php` | Blog categories & taxonomy | PLANNED |
| `src/data/lookbook.ts` | `app/Services/LookbookData.php` | Lookbook download assets data | PLANNED |
| `src/data/process.ts` | `app/Services/ProcessData.php` | 45-day execution process steps | PLANNED |
| `src/data/redirects.ts` | `config/redirects.php` | 301 legacy URL mapping array | PLANNED |
| `src/data/reviews.ts` | `app/Services/ReviewData.php` | Client testimonials and reviews | PLANNED |
| `src/data/styleQuiz.ts` | `app/Services/QuizData.php` | Style quiz questions and recommendation engine | PLANNED |

## 4. UI Layouts & Global Components Mapping

| React Component | Target PHP View Component | Description | Migration Status |
|---|---|---|---|
| `src/app/layout.tsx` | `resources/views/layouts/main.php` | Base HTML skeleton, head tags, header/footer wrapper | PLANNED |
| `src/components/Navbar.jsx` | `resources/views/components/navbar.php` | Top navigation header with mega-menus | PLANNED |
| `src/components/Footer.jsx` | `resources/views/components/footer.php` | Global footer with multi-column sitemap | PLANNED |
| `src/components/FloatingContact.tsx` | `resources/views/components/floating_contact.php` | Floating WhatsApp & Call CTA buttons | PLANNED |
| `src/components/CustomCursor.tsx` | `public/assets/js/cursor.js` | Custom animated cursor dot & ring | PLANNED |
| `src/components/MagneticButton.tsx` | `public/assets/js/magnetic.js` | Magnetic hover physics for buttons | PLANNED |
| `src/components/ScrollProgress.tsx` | `public/assets/js/scroll_progress.js` | Top scroll progress bar | PLANNED |
| `src/components/MultiStepLeadForm.tsx` | `resources/views/components/forms/lead_form.php` | Interactive multi-step consultation form | PLANNED |
| `src/components/CareerForm.tsx` | `resources/views/components/forms/career_form.php` | Career application form | PLANNED |
| `src/components/StyleQuiz.tsx` | `resources/views/components/quiz.php` | 2-minute design style quiz | PLANNED |

## 5. Page & Route Mapping

| Next.js Route (`src/app/...`) | Target PHP Controller & View | URL Route | Migration Status |
|---|---|---|---|
| `src/app/page.tsx` | `HomeController@index` → `pages/home.php` | `/` | PLANNED |
| `src/app/about/page.tsx` | `PageController@about` → `pages/about.php` | `/about` | PLANNED |
| `src/app/process/page.tsx` | `PageController@process` → `pages/process.php` | `/process` | PLANNED |
| `src/app/services/page.tsx` | `ServiceController@index` → `services/index.php` | `/services` | PLANNED |
| `src/app/services/[slug]/page.tsx` | `ServiceController@show` → `services/show.php` | `/services/{slug}` | PLANNED |
| `src/app/portfolio/page.tsx` | `PortfolioController@index` → `portfolio/index.php` | `/portfolio` | PLANNED |
| `src/app/portfolio/[slug]/page.tsx` | `PortfolioController@show` → `portfolio/show.php` | `/portfolio/{slug}` | PLANNED |
| `src/app/portfolio/albums/page.tsx` | `PortfolioController@albums` → `portfolio/albums.php` | `/portfolio/albums` | PLANNED |
| `src/app/3d-walkthrough/page.tsx` | `WalkthroughController@index` → `pages/walkthrough.php` | `/3d-walkthrough` | PLANNED |
| `src/app/interior-design-cost-chennai/page.tsx` | `PricingController@index` → `pricing/index.php` | `/interior-design-cost-chennai` | PLANNED |
| `src/app/modular-kitchen-price-chennai/page.tsx` | `PricingController@kitchen` → `pricing/kitchen.php` | `/modular-kitchen-price-chennai` | PLANNED |
| `src/app/2bhk-interior-cost-chennai/page.tsx` | `PricingController@cost2bhk` → `pricing/2bhk.php` | `/2bhk-interior-cost-chennai` | PLANNED |
| `src/app/3bhk-interior-cost-chennai/page.tsx` | `PricingController@cost3bhk` → `pricing/3bhk.php` | `/3bhk-interior-cost-chennai` | PLANNED |
| `src/app/blog/page.tsx` | `BlogController@index` → `blog/index.php` | `/blog` | PLANNED |
| `src/app/blog/[slug]/page.tsx` | `BlogController@show` → `blog/show.php` | `/blog/{slug}` | PLANNED |
| `src/app/interior-designers/page.tsx` | `LocationController@index` → `locations/index.php` | `/interior-designers` | PLANNED |
| `src/app/interior-designers-[city]/page.tsx` | `LocationController@show` → `locations/show.php` | `/interior-designers-{city}` | PLANNED |
| `src/app/contact/page.tsx` | `PageController@contact` → `pages/contact.php` | `/contact` | PLANNED |
| `src/app/get-free-quote/page.tsx` | `PageController@getQuote` → `pages/get_quote.php` | `/get-free-quote` | PLANNED |
| `src/app/design-style-quiz/page.tsx` | `QuizController@index` → `pages/quiz.php` | `/design-style-quiz` | PLANNED |
| `src/app/careers/page.tsx` | `CareerController@index` → `pages/careers.php` | `/careers` | PLANNED |
| `src/app/refer-and-earn/page.tsx` | `PageController@refer` → `pages/refer.php` | `/refer-and-earn` | PLANNED |
| `src/app/testimonials/page.tsx` | `PageController@testimonials` → `pages/testimonials.php` | `/testimonials` | PLANNED |
| `src/app/faq/page.tsx` | `PageController@faq` → `pages/faq.php` | `/faq` | PLANNED |
| `src/app/sustainability/page.tsx` | `PageController@sustainability` → `pages/sustainability.php` | `/sustainability` | PLANNED |
| `src/app/warranty/page.tsx` | `PageController@warranty` → `pages/warranty.php` | `/warranty` | PLANNED |
| `src/app/after-sales-care/page.tsx` | `PageController@afterSales` → `pages/after_sales.php` | `/after-sales-care` | PLANNED |
| `src/app/privacy-policy/page.tsx` | `LegalController@privacy` → `legal/privacy.php` | `/privacy-policy` | PLANNED |
| `src/app/terms-and-conditions/page.tsx` | `LegalController@terms` → `legal/terms.php` | `/terms-and-conditions` | PLANNED |
| `src/app/cancellation-refund-policy/page.tsx` | `LegalController@refund` → `legal/refund.php` | `/cancellation-refund-policy` | PLANNED |
| `src/app/gst-policy/page.tsx` | `LegalController@gst` → `legal/gst.php` | `/gst-policy` | PLANNED |
| `src/app/cookie-policy/page.tsx` | `LegalController@cookie` → `legal/cookie.php` | `/cookie-policy` | PLANNED |
| `src/app/robots.ts` | `SeoController@robots` → Output TXT | `/robots.txt` | PLANNED |
| `src/app/sitemap.ts` | `SeoController@sitemap` → Output XML | `/sitemap.xml` | PLANNED |

## 6. 3D & WebGL Engine Mapping

| Next.js / JS File | Target WebGL Asset | Functional Purpose | Migration Status |
|---|---|---|---|
| `src/cinematic/HouseScene.js` | `public/assets/js/3d/HouseScene.js` | Three.js scene setup, materials, light setup | PLANNED |
| `src/cinematic/CinematicEngine.js` | `public/assets/js/3d/CinematicEngine.js` | WebGL canvas render loop & window resize | PLANNED |
| `src/cinematic/CameraPath.js` | `public/assets/js/3d/CameraPath.js` | Smooth camera bezier paths & keyframes | PLANNED |
| `src/cinematic/ScrollController.js` | `public/assets/js/3d/ScrollController.js` | Bind scroll position to camera progress | PLANNED |
| `src/cinematic/config.js` | `public/assets/js/3d/config.js` | Scene camera keyframe positions & targets | PLANNED |
| `src/cinematic/textures.js` | `public/assets/js/3d/textures.js` | Procedural canvas texture generation | PLANNED |
| `public/models/*.glb` | `public/models/*.glb` | 3D chair and sofa models served via HTTP | PLANNED |
| `public/hdri/*.hdr` | `public/hdri/*.hdr` | 2K HDRI environment lighting map | PLANNED |

## 7. Content Migration Mapping

| Source File | Destination | Parsing Technique | Migration Status |
|---|---|---|---|
| `src/content/blog/*.mdx` (21 articles) | `storage/content/blog/*.md` or MySQL `blog_posts` table | Parsed with `Parsedown` (Markdown parser with frontmatter metadata extractor) | PLANNED |
