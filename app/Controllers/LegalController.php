<?php

namespace App\Controllers;

class LegalController extends BaseController
{
    public function privacy(): void
    {
        $this->render('legal/privacy', [
            'meta' => [
                'title' => 'Privacy Policy | RGL Decors',
                'description' => 'Privacy policy detailing data collection, processing, and lead protection for RGL Decors home interior clients.',
                'canonical_path' => '/privacy-policy',
            ],
        ]);
    }

    public function terms(): void
    {
        $this->render('legal/terms', [
            'meta' => [
                'title' => 'Terms & Conditions | RGL Decors',
                'description' => 'Terms of service and interior design execution agreement terms for RGL Decors clients.',
                'canonical_path' => '/terms-and-conditions',
            ],
        ]);
    }

    public function refund(): void
    {
        $this->render('legal/refund', [
            'meta' => [
                'title' => 'Cancellation & Refund Policy | RGL Decors',
                'description' => 'Cancellation milestones and refund policies for interior design projects and custom modular orders.',
                'canonical_path' => '/cancellation-refund-policy',
            ],
        ]);
    }

    public function gst(): void
    {
        $this->render('legal/gst', [
            'meta' => [
                'title' => 'GST Policy & Billing Information | RGL Decors',
                'description' => 'GST compliance, tax invoices, and itemised billing terms for RGL Decors home interior services.',
                'canonical_path' => '/gst-policy',
            ],
        ]);
    }

    public function cookie(): void
    {
        $this->render('legal/cookie', [
            'meta' => [
                'title' => 'Cookie Policy | RGL Decors',
                'description' => 'Information on essential cookies, analytics, and session privacy for visitors of RGL Decors.',
                'canonical_path' => '/cookie-policy',
            ],
        ]);
    }
}
