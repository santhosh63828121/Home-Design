<?php

namespace App\Controllers;

use App\Services\BusinessData;
use App\Services\ProcessData;
use App\Services\ReviewData;
use App\Services\FaqData;

class PageController extends BaseController
{
    public function about(): void
    {
        $this->render('pages/about', [
            'meta' => [
                'title' => 'About RGL Decors | Interior Design Studio Chennai',
                'description' => 'Learn about RGL Decors — Chennai’s turnkey interior design firm founded in 2018. 150+ homes transformed with 100+ quality checks.',
                'canonical_path' => '/about',
            ],
            'business' => BusinessData::getBusiness(),
            'usps' => BusinessData::getUsps(),
        ]);
    }

    public function process(): void
    {
        $this->render('pages/process', [
            'meta' => [
                'title' => 'Our 45-Day Interior Execution Process | RGL Decors',
                'description' => 'Discover RGL Decors 5-step turnkey interior design process — site measurement, 3D walkthrough, factory precision, snagging, and handover.',
                'canonical_path' => '/process',
            ],
            'steps' => ProcessData::getSteps(),
        ]);
    }

    public function contact(): void
    {
        $this->render('pages/contact', [
            'meta' => [
                'title' => 'Contact RGL Decors | Interior Designers in Chennai',
                'description' => 'Get in touch with RGL Decors. Visit our Chennai design studio or request a call back for your modular kitchen & home interior project.',
                'canonical_path' => '/contact',
            ],
            'business' => BusinessData::getBusiness(),
        ]);
    }

    public function getQuote(): void
    {
        $this->render('pages/get_quote', [
            'meta' => [
                'title' => 'Get Free Interior Design Quote | RGL Decors',
                'description' => 'Request a free site measurement, 3D walkthrough, and itemised quotation for your 2BHK, 3BHK, or modular kitchen in Chennai.',
                'canonical_path' => '/get-free-quote',
            ],
        ]);
    }

    public function refer(): void
    {
        $this->render('pages/refer', [
            'meta' => [
                'title' => 'Refer & Earn | RGL Decors Referral Program',
                'description' => 'Refer friends and family to RGL Decors and earn cash rewards for every successful home interior project booked.',
                'canonical_path' => '/refer-and-earn',
            ],
        ]);
    }

    public function testimonials(): void
    {
        $this->render('pages/testimonials', [
            'meta' => [
                'title' => 'Client Reviews & Testimonials | RGL Decors',
                'description' => 'Read verified client reviews and feedback from homeowners across Chennai who transformed their homes with RGL Decors.',
                'canonical_path' => '/testimonials',
            ],
            'reviews' => ReviewData::getReviews(),
        ]);
    }

    public function faq(): void
    {
        $this->render('pages/faq', [
            'meta' => [
                'title' => 'Frequently Asked Questions | RGL Decors',
                'description' => 'Answers to common questions about interior design costs, modular kitchen warranties, 3D walkthroughs, and 45-day timelines.',
                'canonical_path' => '/faq',
            ],
            'categories' => FaqData::getFaqCategories(),
        ]);
    }

    public function sustainability(): void
    {
        $this->render('pages/sustainability', [
            'meta' => [
                'title' => 'Sustainable Interiors & Green Commitment | RGL Decors',
                'description' => 'Our commitment to eco-friendly materials, low-VOC finishes, zero-waste factory cutting, and sustainable home design.',
                'canonical_path' => '/sustainability',
            ],
        ]);
    }

    public function warranty(): void
    {
        $this->render('pages/warranty', [
            'meta' => [
                'title' => 'Warranty Coverage & Terms | RGL Decors',
                'description' => 'Detailed warranty coverage: 5-year hardware coverage, 1-year shutter/carcass warranty, and 1-year complimentary post-service care.',
                'canonical_path' => '/warranty',
            ],
        ]);
    }

    public function afterSales(): void
    {
        $this->render('pages/after_sales', [
            'meta' => [
                'title' => 'Complimentary 1-Year After-Sales Care | RGL Decors',
                'description' => 'Learn about our 1-year post-service care, snagging support, annual maintenance contracts (AMC), and warranty support.',
                'canonical_path' => '/after-sales-care',
            ],
        ]);
    }
}
