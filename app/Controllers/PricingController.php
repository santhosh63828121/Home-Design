<?php

namespace App\Controllers;

use App\Services\PricingData;

class PricingController extends BaseController
{
    public function index(): void
    {
        $this->render('pricing/index', [
            'meta' => [
                'title' => 'Interior Design Cost in Chennai (2026 Price Guide) | RGL Decors',
                'description' => 'Honest, transparent interior design costs in Chennai. 2BHK, 3BHK, modular kitchen prices, price-per-sqft rates, and cost calculator.',
                'canonical_path' => '/interior-design-cost-chennai',
            ],
            'packages' => PricingData::getPackages(),
            'tiers' => PricingData::getDesignTiers(),
            'features' => PricingData::getTierFeatures(),
            'faqs' => PricingData::getFaqs('hub'),
        ]);
    }

    public function kitchen(): void
    {
        $this->render('pricing/kitchen', [
            'meta' => [
                'title' => 'Modular Kitchen Price in Chennai (2026) | RGL Decors',
                'description' => 'Modular kitchen cost guide for Chennai starting from ₹50,000. L-shape, U-shape, parallel layouts with BWP plywood and soft-close hardware.',
                'canonical_path' => '/modular-kitchen-price-chennai',
            ],
            'faqs' => PricingData::getFaqs('kitchen'),
        ]);
    }

    public function cost2bhk(): void
    {
        $this->render('pricing/2bhk', [
            'meta' => [
                'title' => '2BHK Interior Cost in Chennai (2026 Price Guide) | RGL Decors',
                'description' => 'Complete 2BHK interior design cost breakdown in Chennai — ₹3.5L to ₹6L Essentials package with kitchen, wardrobes, TV unit, and 3D walkthrough.',
                'canonical_path' => '/2bhk-interior-cost-chennai',
            ],
            'faqs' => PricingData::getFaqs('2bhk'),
        ]);
    }

    public function cost3bhk(): void
    {
        $this->render('pricing/3bhk', [
            'meta' => [
                'title' => '3BHK Interior Cost in Chennai (2026 Price Guide) | RGL Decors',
                'description' => 'Full 3BHK interior design cost breakdown in Chennai — ₹6L to ₹12L Premium package with kitchen, 3 wardrobes, TV wall, ceilings, and lighting.',
                'canonical_path' => '/3bhk-interior-cost-chennai',
            ],
            'faqs' => PricingData::getFaqs('3bhk'),
        ]);
    }
}
