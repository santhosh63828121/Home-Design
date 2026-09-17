<?php

namespace App\Controllers;

use App\Services\BusinessData;
use App\Services\ServiceData;
use App\Services\PortfolioData;
use App\Services\ReviewData;
use App\Services\PricingData;

class HomeController extends BaseController
{
    public function index(): void
    {
        $this->render('pages/home', [
            'meta' => [
                'title' => 'Best Interior Designers in Chennai | 45-Day Delivery',
                'description' => 'RGL Decors is Chennai’s premier luxury interior design firm specializing in modular kitchens, wardrobes, and full-home turnkey interiors with 3D walkthroughs.',
                'canonical_path' => '/',
                'json_ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'LocalBusiness',
                    'name' => 'RGL Decors',
                    'description' => 'Luxury interior design, modular kitchens and full-home interiors in Chennai.',
                    'url' => 'https://www.rgldecors.com',
                    'telephone' => '+918637420482',
                    'priceRange' => '₹50,000 - ₹5,000,000',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => 'Chennai',
                        'addressRegion' => 'Tamil Nadu',
                        'postalCode' => '600041',
                        'addressCountry' => 'IN',
                    ]
                ]
            ],
            'business' => BusinessData::getBusiness(),
            'usps' => BusinessData::getUsps(),
            'stats' => BusinessData::getCompanyStats(),
            'services' => ServiceData::getServiceGroups(),
            'featuredProjects' => PortfolioData::getFeatured(),
            'reviews' => ReviewData::getReviews(),
            'packages' => PricingData::getPackages(),
        ]);
    }
}
