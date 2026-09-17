<?php

namespace App\Controllers;

use App\Services\ServiceData;
use App\Services\PortfolioData;
use App\Services\LocationData;
use App\Services\BlogData;

class SeoController extends BaseController
{
    public function sitemap(): void
    {
        header('Content-Type: application/xml; charset=utf-8');

        $baseUrl = rtrim(url('/'), '/');
        
        $urls = [
            '/',
            '/about',
            '/process',
            '/3d-walkthrough',
            '/contact',
            '/get-free-quote',
            '/careers',
            '/find-your-style',
            '/refer-and-earn',
            '/testimonials',
            '/faq',
            '/sustainability',
            '/warranty',
            '/after-sales-care',
            '/privacy-policy',
            '/terms-and-conditions',
            '/cancellation-refund-policy',
            '/gst-policy',
            '/cookie-policy',
            '/services',
            '/portfolio',
            '/portfolio/albums',
            '/interior-design-cost-chennai',
            '/modular-kitchen-price-chennai',
            '/2bhk-interior-cost-chennai',
            '/3bhk-interior-cost-chennai',
            '/interior-designers',
            '/blog',
        ];

        // Dynamic Service URLs
        foreach (ServiceData::getServiceGroups() as $g) {
            foreach ($g['items'] as $item) {
                if (isset($item['slug'])) {
                    $urls[] = '/services/' . $item['slug'];
                }
            }
        }

        // Dynamic Portfolio URLs
        foreach (PortfolioData::getProjects() as $p) {
            $urls[] = '/portfolio/' . $p['slug'];
        }

        // Dynamic Location URLs
        foreach (LocationData::getCities() as $c) {
            $urls[] = '/' . $c['slug'];
        }
        foreach (LocationData::getSuburbs() as $sub) {
            $urls[] = '/' . $sub['slug'];
        }

        // Dynamic Blog URLs
        foreach (BlogData::getAllPosts() as $post) {
            $urls[] = '/blog/' . $post['slug'];
        }

        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $path) {
            echo "  <url>\n";
            echo "    <loc>" . htmlspecialchars($baseUrl . $path, ENT_XML1, 'UTF-8') . "</loc>\n";
            echo "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
            echo "    <changefreq>weekly</changefreq>\n";
            echo "    <priority>" . ($path === '/' ? '1.0' : '0.8') . "</priority>\n";
            echo "  </url>\n";
        }

        echo '</urlset>';
    }

    public function robots(): void
    {
        header('Content-Type: text/plain; charset=utf-8');
        $baseUrl = rtrim(url('/'), '/');

        echo "User-agent: *\n";
        echo "Allow: /\n\n";
        echo "Sitemap: " . $baseUrl . "/sitemap.xml\n";
    }
}
