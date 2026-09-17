<?php

namespace App\Controllers;

use App\Services\PortfolioData;

class PortfolioController extends BaseController
{
    public function index(): void
    {
        $this->render('portfolio/index', [
            'meta' => [
                'title' => 'Interior Design Portfolio & Case Studies | RGL Decors',
                'description' => 'Explore real interior design case studies across Chennai — 2BHK flats, 3BHK villas, and commercial spaces with project details and 3D walkthroughs.',
                'canonical_path' => '/portfolio',
            ],
            'projects' => PortfolioData::getProjects(),
        ]);
    }

    public function show(string $slug): void
    {
        $project = PortfolioData::getBySlug($slug);
        if (!$project) {
            http_response_code(404);
            $this->render('pages/404');
            return;
        }

        $this->render('portfolio/show', [
            'meta' => [
                'title' => $project['title'] . ' | RGL Decors Case Study',
                'description' => $project['summary'],
                'canonical_path' => '/portfolio/' . $slug,
            ],
            'project' => $project,
        ]);
    }

    public function albums(): void
    {
        $this->render('portfolio/albums', [
            'meta' => [
                'title' => 'Photo Albums & Gallery | RGL Decors',
                'description' => 'High-resolution photo albums of completed modular kitchens, wardrobes, living room TV walls, and luxury bedrooms in Chennai.',
                'canonical_path' => '/portfolio/albums',
            ],
            'projects' => PortfolioData::getProjects(),
        ]);
    }
}
