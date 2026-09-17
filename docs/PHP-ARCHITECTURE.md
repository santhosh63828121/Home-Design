# PHP Architecture & Folder Specification

This document details the target PHP architecture for migrating the RGL Decors application from Next.js 15 to clean, modern, production-ready PHP 8.2+ with Apache/MySQL support.

## 1. Directory Structure Overview

```text
Design/
│
├── app/
│   ├── Controllers/
│   │   ├── BaseController.php
│   │   ├── HomeController.php
│   │   ├── PageController.php
│   │   ├── ServiceController.php
│   │   ├── PortfolioController.php
│   │   ├── PricingController.php
│   │   ├── LocationController.php
│   │   ├── BlogController.php
│   │   ├── LeadController.php
│   │   ├── CareerController.php
│   │   ├── QuizController.php
│   │   ├── LegalController.php
│   │   └── SeoController.php
│   │
│   ├── Models/
│   │   ├── BaseModel.php
│   │   └── Lead.php
│   │
│   ├── Services/
│   │   ├── Database.php
│   │   ├── BusinessData.php
│   │   ├── ServiceData.php
│   │   ├── PricingData.php
│   │   ├── PortfolioData.php
│   │   ├── LocationData.php
│   │   ├── BlogData.php
│   │   ├── FaqData.php
│   │   ├── ReviewData.php
│   │   ├── EmailService.php
│   │   └── MarkdownParser.php
│   │
│   ├── Helpers/
│   │   ├── view_helpers.php
│   │   └── seo_helpers.php
│   │
│   └── Middleware/
│       ├── CSRFMiddleware.php
│       └── RedirectMiddleware.php
│
├── config/
│   ├── app.php
│   ├── database.php
│   ├── mail.php
│   └── redirects.php
│
├── database/
│   ├── migrations/
│   │   └── 001_create_leads_table.sql
│   └── seeders/
│       └── 001_seed_initial_data.sql
│
├── public/
│   ├── index.php
│   ├── .htaccess
│   ├── assets/
│   │   ├── css/
│   │   │   ├── globals.css
│   │   │   └── cinematic.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── cursor.js
│   │   │   ├── magnetic.js
│   │   │   ├── scroll_progress.js
│   │   │   └── 3d/
│   │   │       ├── CameraPath.js
│   │   │       ├── CinematicEngine.js
│   │   │       ├── HouseScene.js
│   │   │       ├── ScrollController.js
│   │   │       ├── config.js
│   │   │       └── textures.js
│   │   └── images/
│   ├── models/
│   │   ├── chair.glb
│   │   └── sofa.glb
│   └── hdri/
│       └── golden_2k.hdr
│
├── resources/
│   └── views/
│       ├── layouts/
│       │   ├── main.php
│       │   ├── header.php
│       │   └── footer.php
│       ├── components/
│       │   ├── navbar.php
│       │   ├── footer.php
│       │   ├── mega_menu.php
│       │   ├── hero.php
│       │   ├── floating_contact.php
│       │   └── forms/
│       │       ├── lead_form.php
│       │       ├── contact_form.php
│       │       └── career_form.php
│       ├── pages/
│       │   ├── home.php
│       │   ├── about.php
│       │   ├── process.php
│       │   ├── walkthrough.php
│       │   ├── contact.php
│       │   ├── get_quote.php
│       │   ├── careers.php
│       │   ├── quiz.php
│       │   ├── refer.php
│       │   ├── testimonials.php
│       │   ├── faq.php
│       │   ├── sustainability.php
│       │   ├── warranty.php
│       │   └── after_sales.php
│       ├── services/
│       │   ├── index.php
│       │   └── show.php
│       ├── portfolio/
│       │   ├── index.php
│       │   ├── show.php
│       │   └── albums.php
│       ├── pricing/
│       │   ├── index.php
│       │   ├── kitchen.php
│       │   ├── 2bhk.php
│       │   └── 3bhk.php
│       ├── locations/
│       │   ├── index.php
│       │   └── show.php
│       ├── blog/
│       │   ├── index.php
│       │   └── show.php
│       └── legal/
│           ├── privacy.php
│           ├── terms.php
│           ├── refund.php
│           ├── gst.php
│           └── cookie.php
│
├── storage/
│   ├── content/
│   │   └── blog/ (MDX/MD files)
│   └── logs/
│
├── docs/
│
├── .env
├── .env.example
├── .htaccess (root rewrite fallback to public/)
├── composer.json
└── README.md
```

## 2. Framework & Architectural Principles

1. **Lightweight Custom MVC Architecture**:
   - Zero unnecessary bloat. Fast request lifecycle execution.
   - Built on standard PSR-4 autoloading via Composer (`App\Controllers`, `App\Models`, `App\Services`, etc.).

2. **Router Component (`App\Services\Router`)**:
   - Handles static routes (e.g., `/about`, `/contact`).
   - Dynamic regex parameter extraction (e.g., `/blog/{slug}`, `/services/{slug}`, `/portfolio/{slug}`, `/interior-designers-{city}`).
   - Automatic execution of pre-routing Middleware (e.g., 301 legacy URL redirects, CSRF token validation).

3. **View Engine & Component System**:
   - Native PHP rendering engine with helper functions for layout inheritance (`renderView('pages/home', $data)`).
   - Component include helper (`component('navbar', $props)`) allowing modular reuse of UI elements without duplicating HTML.

4. **Security Layer**:
   - Prepared SQL statements via PDO for 100% SQL injection prevention.
   - Output escaping (`e($str)` helper wrapper around `htmlspecialchars`).
   - CSRF protection for all POST form submissions with session-backed tokens.
   - IP hashing and rate-limiting helper for lead submission triage.

5. **Apache Clean URLs & Base Path Handling**:
   - Automatic detection of base URI path (`/Design/` when served under XAMPP `c:\xampp\htdocs\Design` vs `/` in production domain).
   - `.htaccess` URL rewriting rules redirecting all web traffic to `public/index.php`.
