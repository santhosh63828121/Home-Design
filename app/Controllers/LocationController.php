<?php

namespace App\Controllers;

use App\Services\LocationData;

class LocationController extends BaseController
{
    public function index(): void
    {
        $this->render('locations/index', [
            'meta' => [
                'title' => 'Interior Designers in Tamil Nadu & Chennai Suburbs | RGL Decors',
                'description' => 'Explore interior design services across 8 cities and 12 Chennai suburbs including Adyar, Anna Nagar, Velachery, OMR, ECR, Coimbatore, and Salem.',
                'canonical_path' => '/interior-designers',
            ],
            'cities' => LocationData::getCities(),
            'suburbs' => LocationData::getSuburbs(),
        ]);
    }

    public function show(string $slug): void
    {
        $location = LocationData::getBySlug($slug);
        if (!$location) {
            http_response_code(404);
            $this->render('pages/404');
            return;
        }

        $this->render('locations/show', [
            'meta' => [
                'title' => 'Interior Designers in ' . $location['name'] . ' | RGL Decors',
                'description' => $location['metaDescription'],
                'canonical_path' => '/' . $slug,
                'json_ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Service',
                    'name' => 'Interior Design in ' . $location['name'],
                    'provider' => [
                        '@type' => 'LocalBusiness',
                        'name' => 'RGL Decors',
                        'telephone' => '+918637420482',
                    ],
                    'areaServed' => $location['name'],
                ]
            ],
            'location' => $location,
        ]);
    }
}
