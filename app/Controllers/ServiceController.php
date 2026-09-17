<?php

namespace App\Controllers;

use App\Services\ServiceData;

class ServiceController extends BaseController
{
    public function index(): void
    {
        $this->render('services/index', [
            'meta' => [
                'title' => 'Interior Design Services | 15 Categories | RGL Decors',
                'description' => 'Explore 15 interior design categories in Chennai — modular kitchens, wardrobes, TV units, false ceilings, wallpaper, smart homes, and custom furniture.',
                'canonical_path' => '/services',
            ],
            'positioning' => ServiceData::getPositioning(),
            'groups' => ServiceData::getServiceGroups(),
        ]);
    }

    public function show(string $slug): void
    {
        $service = ServiceData::getBySlug($slug);
        if (!$service) {
            http_response_code(404);
            $this->render('pages/404');
            return;
        }

        $this->render('services/show', [
            'meta' => [
                'title' => $service['name'] . ' in Chennai | RGL Decors',
                'description' => 'Custom ' . strtolower($service['name']) . ' designed and factory-built in Chennai with 3D design and written warranty.',
                'canonical_path' => '/services/' . $slug,
            ],
            'service' => $service,
        ]);
    }
}
