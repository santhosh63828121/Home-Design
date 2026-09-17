# PHP Routes Specification

This document maps all Next.js page routes, dynamic routes, and legacy 301 redirects to the PHP routing table.

## 1. Primary Site Web Routes

| Next.js Route | HTTP Method | Target Controller & Method | PHP Route Pattern |
|---|---|---|---|
| `/` | GET | `HomeController@index` | `/` |
| `/about` | GET | `PageController@about` | `/about` |
| `/process` | GET | `PageController@process` | `/process` |
| `/services` | GET | `ServiceController@index` | `/services` |
| `/services/[slug]` | GET | `ServiceController@show` | `/services/{slug}` |
| `/portfolio` | GET | `PortfolioController@index` | `/portfolio` |
| `/portfolio/albums` | GET | `PortfolioController@albums` | `/portfolio/albums` |
| `/portfolio/[slug]` | GET | `PortfolioController@show` | `/portfolio/{slug}` |
| `/3d-walkthrough` | GET | `WalkthroughController@index` | `/3d-walkthrough` |
| `/interior-design-cost-chennai` | GET | `PricingController@index` | `/interior-design-cost-chennai` |
| `/modular-kitchen-price-chennai` | GET | `PricingController@kitchen` | `/modular-kitchen-price-chennai` |
| `/2bhk-interior-cost-chennai` | GET | `PricingController@cost2bhk` | `/2bhk-interior-cost-chennai` |
| `/3bhk-interior-cost-chennai` | GET | `PricingController@cost3bhk` | `/3bhk-interior-cost-chennai` |
| `/blog` | GET | `BlogController@index` | `/blog` |
| `/blog/[slug]` | GET | `BlogController@show` | `/blog/{slug}` |
| `/interior-designers` | GET | `LocationController@index` | `/interior-designers` |
| `/interior-designers-adyar` | GET | `LocationController@city` | `/interior-designers-adyar` |
| `/interior-designers-anna-nagar` | GET | `LocationController@city` | `/interior-designers-anna-nagar` |
| `/interior-designers-avadi` | GET | `LocationController@city` | `/interior-designers-avadi` |
| `/interior-designers-chengalpattu` | GET | `LocationController@city` | `/interior-designers-chengalpattu` |
| `/interior-designers-chennai` | GET | `LocationController@city` | `/interior-designers-chennai` |
| `/interior-designers-chromepet` | GET | `LocationController@city` | `/interior-designers-chromepet` |
| `/interior-designers-coimbatore` | GET | `LocationController@city` | `/interior-designers-coimbatore` |
| `/interior-designers-dharmapuri` | GET | `LocationController@city` | `/interior-designers-dharmapuri` |
| `/interior-designers-ecr` | GET | `LocationController@city` | `/interior-designers-ecr` |
| `/interior-designers-hosur` | GET | `LocationController@city` | `/interior-designers-hosur` |
| `/interior-designers-kanchipuram` | GET | `LocationController@city` | `/interior-designers-kanchipuram` |
| `/interior-designers-krishnagiri` | GET | `LocationController@city` | `/interior-designers-krishnagiri` |
| `/interior-designers-mogappair` | GET | `LocationController@city` | `/interior-designers-mogappair` |
| `/interior-designers-nungambakkam` | GET | `LocationController@city` | `/interior-designers-nungambakkam` |
| `/interior-designers-omr` | GET | `LocationController@city` | `/interior-designers-omr` |
| `/interior-designers-porur` | GET | `LocationController@city` | `/interior-designers-porur` |
| `/interior-designers-salem` | GET | `LocationController@city` | `/interior-designers-salem` |
| `/interior-designers-t-nagar` | GET | `LocationController@city` | `/interior-designers-t-nagar` |
| `/interior-designers-tambaram` | GET | `LocationController@city` | `/interior-designers-tambaram` |
| `/interior-designers-velachery` | GET | `LocationController@city` | `/interior-designers-velachery` |
| `/contact` | GET | `PageController@contact` | `/contact` |
| `/get-free-quote` | GET | `PageController@getQuote` | `/get-free-quote` |
| `/design-style-quiz` | GET | `QuizController@index` | `/design-style-quiz` |
| `/careers` | GET | `CareerController@index` | `/careers` |
| `/refer-and-earn` | GET | `PageController@refer` | `/refer-and-earn` |
| `/testimonials` | GET | `PageController@testimonials` | `/testimonials` |
| `/faq` | GET | `PageController@faq` | `/faq` |
| `/sustainability` | GET | `PageController@sustainability` | `/sustainability` |
| `/warranty` | GET | `PageController@warranty` | `/warranty` |
| `/after-sales-care` | GET | `PageController@afterSales` | `/after-sales-care` |
| `/privacy-policy` | GET | `LegalController@privacy` | `/privacy-policy` |
| `/terms-and-conditions` | GET | `LegalController@terms` | `/terms-and-conditions` |
| `/cancellation-refund-policy` | GET | `LegalController@refund` | `/cancellation-refund-policy` |
| `/gst-policy` | GET | `LegalController@gst` | `/gst-policy` |
| `/cookie-policy` | GET | `LegalController@cookie` | `/cookie-policy` |
| `/robots.txt` | GET | `SeoController@robots` | `/robots.txt` |
| `/sitemap.xml` | GET | `SeoController@sitemap` | `/sitemap.xml` |

## 2. API & Form Action Routes

| Next.js Action / Route | HTTP Method | Target Controller | PHP Endpoint |
|---|---|---|---|
| `lead.ts` (Form Submit) | POST | `LeadController@submit` | `/api/leads/submit` |
| `contact.ts` (Contact Submit) | POST | `ContactController@submit` | `/api/contact/submit` |
| `career.ts` (Application Submit) | POST | `CareerController@submit` | `/api/careers/submit` |
| `lookbook.ts` (Lookbook Request) | POST | `LookbookController@submit` | `/api/lookbook/submit` |

## 3. Legacy URL 301 Redirect Rules

The 13 legacy Wix redirects will be enforced via `RedirectMiddleware.php` & Apache `.htaccess`:

```text
/aboutus-whoweare                --> 301 --> /about
/3d-projectswalkthroughs         --> 301 --> /3d-walkthrough
/rgl-museum                      --> 301 --> /portfolio
/photo-albums                    --> 301 --> /portfolio/albums
/plans-pricing                   --> 301 --> /interior-design-cost-chennai
/kitchen-units-interiors         --> 301 --> /services/modular-kitchen-chennai
/wardrobe-units-interiors        --> 301 --> /services/wardrobe-design-chennai
/entertainment-units-interiors  --> 301 --> /services/tv-units-chennai
/bedroom-units-interiors         --> 301 --> /services/bedroom-interior-chennai
/contactus                       --> 301 --> /contact
/privacypolicy                   --> 301 --> /privacy-policy
/copy-of-privacy-policy-1        --> 301 --> /terms-and-conditions
/copy-of-privacy-policy          --> 301 --> /cancellation-refund-policy
```
