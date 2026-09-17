<?php

namespace App\Services;

class PortfolioData
{
    public const PORTFOLIO_BUDGET_INDICATIVE = true;
    public const PORTFOLIO_BUDGET_FOOTNOTE = 'Budget bands are indicative ranges, not the client’s actual spend.';
    public const PORTFOLIO_MEDIA_NOTE = 'Imagery shown illustrates the design direction and materials specified for this project. Final photography of the completed home is being prepared.';

    private static function refImages(): array
    {
        return [
            'living' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Living',
                'width' => 1400,
                'height' => 1750,
            ],
            'kitchen' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Kitchen',
                'width' => 1400,
                'height' => 1050,
            ],
            'bedroom' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Bedroom',
                'width' => 1400,
                'height' => 1750,
            ],
            'wardrobe' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Wardrobe',
                'width' => 1400,
                'height' => 1050,
            ],
            'dining' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Dining',
                'width' => 1400,
                'height' => 1750,
            ],
            'workspace' => fn($alt) => [
                'src' => 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=75',
                'alt' => $alt,
                'room' => 'Workspace',
                'width' => 1400,
                'height' => 1050,
            ],
        ];
    }

    public static function getProjects(): array
    {
        $ref = self::refImages();

        return [
            [
                'slug' => 'divakar-restaurant',
                'client' => 'Mr. Divakar',
                'title' => 'Restaurant & Hotel Interior',
                'space' => 'Commercial',
                'bhk' => null,
                'style' => 'Contemporary',
                'budgetBand' => '₹12L+ / Custom',
                'scope' => 'Full restaurant / hotel interior, designed and presented as a 3D walkthrough.',
                'summary' => 'A complete hospitality fit-out for Mr. Divakar — dining, service and ambience designed end to end and previewed as an HD 3D walkthrough before execution.',
                'services' => ['indoor-outdoor-lighting', 'finished-furniture'],
                'featured' => true,
                'media' => [
                    'cover' => $ref['dining']('Contemporary hospitality dining room with pendant lighting over timber tables'),
                    'gallery' => [
                        $ref['dining']('Dining hall — solid timber tables under a low pendant cluster'),
                        $ref['living']('Lounge and waiting area with layered, low lighting'),
                        $ref['workspace']('Service counter and back-of-house circulation'),
                        $ref['kitchen']('Commercial kitchen and pass, planned around service flow'),
                    ],
                ],
                'testimonial' => null,
            ],
            [
                'slug' => 'kiran-2bhk',
                'client' => 'Mr. Kiran',
                'title' => 'Fully Furnished 2BHK Apartment',
                'space' => 'Apartment',
                'bhk' => '2BHK',
                'style' => 'Modern',
                'budgetBand' => '₹3–6L',
                'scope' => 'Complete, fully furnished 2BHK interior — kitchen, wardrobes and living spaces.',
                'summary' => 'A turnkey 2BHK for Mr. Kiran: modular kitchen, bedroom wardrobes and a living-room TV unit, designed and factory-built for a clean, modern finish.',
                'services' => ['modular-kitchen-chennai', 'wardrobe-design-chennai', 'tv-units-chennai'],
                'featured' => true,
                'media' => [
                    'cover' => $ref['living']('Modern living room with a full-height TV unit and warm timber'),
                    'gallery' => [
                        $ref['living']('Living room — TV unit, seating line and concealed storage'),
                        $ref['kitchen']('Modular kitchen with handleless fronts and a stone worktop'),
                        $ref['bedroom']('Master bedroom with an upholstered headboard'),
                        $ref['wardrobe']('Bedroom wardrobe with fluted shutters and a lit reveal'),
                    ],
                ],
                'testimonial' => null,
            ],
            [
                'slug' => 'anbu-2bhk-villa',
                'client' => 'Mr. Anbu',
                'title' => '2BHK Apartment & Villa',
                'space' => 'Villa',
                'bhk' => '2BHK',
                'style' => 'Contemporary',
                'budgetBand' => '₹6–12L',
                'scope' => 'Interiors across a 2BHK apartment and a villa.',
                'summary' => 'Two spaces for Mr. Anbu — a 2BHK apartment and a villa — with coordinated modular units, storage and finishes across both homes.',
                'services' => ['modular-kitchen-chennai', 'wardrobe-design-chennai'],
                'featured' => false,
                'media' => [
                    'cover' => $ref['kitchen']('Contemporary modular kitchen with a stone worktop'),
                    'gallery' => [
                        $ref['kitchen']('Modular kitchen — humidity-rated boards and soft-close hardware'),
                        $ref['wardrobe']('Coordinated wardrobe joinery across both homes'),
                        $ref['living']('Living space with coordinated finishes'),
                        $ref['bedroom']('Bedroom with concealed storage'),
                    ],
                ],
                'testimonial' => null,
            ],
            [
                'slug' => 'muthu-office-3bhk-villa',
                'client' => 'Mr. Muthu',
                'title' => 'Office Interior & 3BHK Villa',
                'space' => 'Office',
                'bhk' => '3BHK',
                'style' => 'Modern',
                'budgetBand' => '₹12L+ / Custom',
                'scope' => 'Commercial office fit-out plus a full 3BHK villa interior.',
                'summary' => 'A dual project for Mr. Muthu — a functional commercial office fit-out and a complete 3BHK villa interior, delivered with factory precision.',
                'services' => ['finished-furniture', 'indoor-outdoor-lighting'],
                'featured' => true,
                'media' => [
                    'cover' => $ref['workspace']('Commercial office fit-out with natural light and timber detailing'),
                    'gallery' => [
                        $ref['workspace']('Office floor — workstations, lighting and acoustic treatment'),
                        $ref['living']('Villa living room with layered lighting'),
                        $ref['dining']('Villa dining under a pendant cluster'),
                        $ref['bedroom']('Villa bedroom with fitted storage'),
                    ],
                ],
                'testimonial' => null,
            ],
        ];
    }

    public static function getBySlug(string $slug): ?array
    {
        foreach (self::getProjects() as $p) {
            if ($p['slug'] === $slug) {
                return $p;
            }
        }
        return null;
    }

    public static function getFeatured(): array
    {
        return array_values(array_filter(self::getProjects(), fn($p) => $p['featured']));
    }
}
