# PHP SEO & Structured Data Migration Specification

This document details how 100% of Next.js metadata, OpenGraph, Twitter Cards, JSON-LD structured data, XML sitemaps, robots.txt, and canonical URLs are preserved in PHP.

## 1. Dynamic Meta & OpenGraph Generator (`app/Helpers/seo_helpers.php`)

Every PHP view invokes the SEO helper in the header component:

- `head_title($pageTitle)`: Concatenates title with canonical business name ("RGL Decors — Best Interior Designers in Chennai").
- `meta_description($description)`: Renders unique page description.
- `canonical_url($pathname)`: Computes absolute URL (`https://rgldecors.com/pathname`).
- `opengraph_tags($title, $description, $image, $url)`: Renders `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`.
- `twitter_tags($title, $description, $image)`: Renders `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

## 2. JSON-LD Structured Data Generators (`app/Services/SeoService.php`)

Recreates `src/lib/structured-data.tsx` in PHP to emit dynamic `<script type="application/ld+json">`:

1. **LocalBusiness Schema**: Name, address, geo-coordinates, phone, email, priceRange (`₹50,000 - ₹50,000,000`), opening hours, aggregate rating, logo.
2. **Organization Schema**: Legal name, URL, logo, contact points, social profile links.
3. **WebPage / Article Schema**: Headline, publish date, author, publisher logo, main entity.
4. **Service Schema**: Provider, service type, area served (Chennai & Tamil Nadu cities).
5. **FAQPage Schema**: Formatted mainEntity array with question and acceptedAnswer structures.
6. **BreadcrumbList Schema**: ItemListElement array representing path hierarchy.

## 3. Dynamic Sitemap Engine (`public/sitemap.xml` / `SeoController@sitemap`)

Generates compliant XML output (`<?xml version="1.0" encoding="UTF-8"?>`) dynamically:
- Contains all 28 static routes from `staticRoutes`.
- Adds dynamic blog routes (`/blog/{slug}`).
- Adds dynamic service routes (`/services/{slug}`).
- Adds dynamic portfolio routes (`/portfolio/{slug}`).
- Sets `<lastmod>` timestamps, `<changefreq>`, and `<priority>`.

## 4. Dynamic Robots Engine (`public/robots.txt` / `SeoController@robots`)

Outputs:
```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /storage/

Sitemap: https://rgldecors.com/sitemap.xml
```
