<?php

declare(strict_types=1);

// Start session for CSRF token & flash messages
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Autoload Composer dependencies
require_once __DIR__ . '/../vendor/autoload.php';

use App\Services\Router;
use App\Middleware\RedirectMiddleware;
use App\Middleware\CSRFMiddleware;

// Initialize Redirect Middleware for legacy Next.js 301 redirects
RedirectMiddleware::handle();

// Initialize Router
$router = new Router();

// ------------------------------------------------------------------
// Core Static Pages
// ------------------------------------------------------------------
$router->get('/', 'App\Controllers\HomeController@index');
$router->get('/about', 'App\Controllers\PageController@about');
$router->get('/process', 'App\Controllers\PageController@process');
$router->get('/3d-walkthrough', function() {
    (new \App\Controllers\BaseController())->render('pages/walkthrough', [
        'meta' => [
            'title' => '3D Interactive Walkthrough | RGL Decors',
            'description' => 'Walk through a photoreal 3D living room, modular kitchen, and bedroom in your browser before installation.',
            'canonical_path' => '/3d-walkthrough',
        ]
    ]);
});
$router->get('/contact', 'App\Controllers\PageController@contact');
$router->get('/get-free-quote', 'App\Controllers\PageController@getQuote');
$router->get('/careers', 'App\Controllers\PageController@careers');
$router->get('/find-your-style', function() {
    (new \App\Controllers\BaseController())->render('pages/quiz', [
        'meta' => [
            'title' => 'Design Style Quiz | RGL Decors',
            'description' => 'Discover your interior design style language with our 2-minute interactive quiz.',
            'canonical_path' => '/find-your-style',
        ]
    ]);
});
$router->get('/refer-and-earn', 'App\Controllers\PageController@refer');
$router->get('/testimonials', 'App\Controllers\PageController@testimonials');
$router->get('/faq', 'App\Controllers\PageController@faq');
$router->get('/sustainability', 'App\Controllers\PageController@sustainability');
$router->get('/warranty', 'App\Controllers\PageController@warranty');
$router->get('/after-sales-care', 'App\Controllers\PageController@afterSales');

// ------------------------------------------------------------------
// Legal Pages
// ------------------------------------------------------------------
$router->get('/privacy-policy', 'App\Controllers\LegalController@privacy');
$router->get('/terms-and-conditions', 'App\Controllers\LegalController@terms');
$router->get('/cancellation-refund-policy', 'App\Controllers\LegalController@refund');
$router->get('/gst-policy', 'App\Controllers\LegalController@gst');
$router->get('/cookie-policy', 'App\Controllers\LegalController@cookie');

// ------------------------------------------------------------------
// Services
// ------------------------------------------------------------------
$router->get('/services', 'App\Controllers\ServiceController@index');
$router->get('/services/{slug}', 'App\Controllers\ServiceController@show');

// ------------------------------------------------------------------
// Portfolio
// ------------------------------------------------------------------
$router->get('/portfolio', 'App\Controllers\PortfolioController@index');
$router->get('/portfolio/albums', 'App\Controllers\PortfolioController@albums');
$router->get('/portfolio/{slug}', 'App\Controllers\PortfolioController@show');

// ------------------------------------------------------------------
// Pricing Hub & Tiers
// ------------------------------------------------------------------
$router->get('/interior-design-cost-chennai', 'App\Controllers\PricingController@index');
$router->get('/modular-kitchen-price-chennai', 'App\Controllers\PricingController@kitchen');
$router->get('/2bhk-interior-cost-chennai', 'App\Controllers\PricingController@cost2bhk');
$router->get('/3bhk-interior-cost-chennai', 'App\Controllers\PricingController@cost3bhk');

// ------------------------------------------------------------------
// Locations Hub
// ------------------------------------------------------------------
$router->get('/interior-designers', 'App\Controllers\LocationController@index');

// ------------------------------------------------------------------
// Blog Hub & Posts
// ------------------------------------------------------------------
$router->get('/blog', 'App\Controllers\BlogController@index');
$router->get('/blog/{slug}', 'App\Controllers\BlogController@show');

// ------------------------------------------------------------------
// SEO & Feeds
// ------------------------------------------------------------------
$router->get('/sitemap.xml', 'App\Controllers\SeoController@sitemap');
$router->get('/robots.txt', 'App\Controllers\SeoController@robots');

// ------------------------------------------------------------------
// Form Submissions & API
// ------------------------------------------------------------------
$router->post('/api/leads/submit', function() {
    CSRFMiddleware::handle();
    (new \App\Controllers\LeadController())->submit();
});
$router->post('/api/contact/submit', function() {
    CSRFMiddleware::handle();
    (new \App\Controllers\ContactController())->submit();
});
$router->post('/api/careers/submit', function() {
    CSRFMiddleware::handle();
    (new \App\Controllers\CareerController())->submit();
});
$router->post('/api/lookbook/download', function() {
    CSRFMiddleware::handle();
    (new \App\Controllers\LookbookController())->submit();
});

// ------------------------------------------------------------------
// Dynamic Location Routes (Cities & Suburbs) - Catch-All Pattern
// ------------------------------------------------------------------
$router->get('/{slug}', 'App\Controllers\LocationController@show');

// Resolve the current HTTP request
$router->resolve();
