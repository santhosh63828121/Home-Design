<?php

namespace App\Services;

class BusinessData
{
    public static function getBusiness(): array
    {
        return [
            'brand' => 'RGL Decors',
            'legalName' => 'RGL Décors Home Interiors',
            'tagline' => 'Dreams Delivered',
            'taglineLong' => 'Complete interiors solution for your dream home. One place. Any budget.',
            'niche' => 'Interior designers · modular kitchens · wardrobes · turnkey / full-home interiors',
            'established' => 2018,
            'nap' => [
                'phoneDisplay' => '+91 86374 20482',
                'phoneE164' => '+918637420482',
                'tel' => 'tel:+918637420482',
                'email' => 'enquiry@rgldecors.com',
                'emailSecondary' => 'rgldecors@gmail.com',
                'whatsappChat' => 'https://wa.me/message/YCV7Y4IV2343N1',
                'whatsappPhone' => '918637420482',
                'addressLocality' => 'Chennai',
                'addressRegion' => 'Tamil Nadu',
                'addressCountry' => 'IN',
                'postalCode' => '600041',
                'hoursLabel' => 'Mon–Sat: 9:00 AM – 7:00 PM',
            ],
            'contacts' => [
                'departments' => [
                    ['role' => 'Creative Director', 'name' => 'Lokeshwaran', 'email' => 'lokeshwaran@rgldecors.com'],
                    ['role' => 'Sales', 'name' => 'Sabarinathan', 'email' => 'sabarinathan@rgldecors.com'],
                    ['role' => 'Project Manager', 'name' => 'Srikrishna', 'email' => 'srikrishna@rgldecors.com'],
                    ['role' => 'Admin Head', 'name' => 'Ranjitha Raju', 'email' => 'ranjitha.raju@rgldecors.com'],
                ],
                'phones' => [
                    ['label' => 'Company', 'display' => '+91 86374 20482', 'e164' => '+918637420482'],
                    ['label' => 'Project Manager', 'display' => '+91 74484 00338', 'e164' => '+917448400338'],
                    ['label' => 'Sales Head', 'display' => '+91 74484 00339', 'e164' => '+917448400339'],
                ],
            ],
            'geo' => ['latitude' => 13.0827, 'longitude' => 80.2707],
            'openingHours' => [
                'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'opens' => '09:00',
                'closes' => '19:00',
            ],
            'entryPriceSignal' => 'From ₹50,000',
        ];
    }

    public static function getSocials(): array
    {
        return [
            ['name' => 'Facebook', 'icon' => 'Facebook', 'url' => 'https://www.facebook.com/rgldecorshomeinteriors/'],
            ['name' => 'Instagram', 'icon' => 'Instagram', 'url' => 'https://www.instagram.com/rgl_decors/'],
            ['name' => 'YouTube', 'icon' => 'Youtube', 'url' => 'https://www.youtube.com/channel/UCs_DL58FGnUhGFieKO_Yg2w'],
            ['name' => 'Twitter', 'icon' => 'Twitter', 'url' => 'https://twitter.com/DecorsRgl'],
            ['name' => 'Pinterest', 'icon' => 'Music2', 'url' => 'https://in.pinterest.com/rgldecors/_created/'],
        ];
    }

    public static function getUsps(): array
    {
        return [
            [
                'icon' => 'Wrench',
                'title' => 'Premium Turnkey Execution',
                'description' => 'A complete turnkey interior experience — designed, managed and delivered by one accountable RGL team, under one roof.',
            ],
            [
                'icon' => 'Clapperboard',
                'title' => 'Technology-Led Visualisation',
                'description' => 'Visualise before you build — immersive 3D walkthroughs that turn render into reality, so you see every room before it exists.',
            ],
            [
                'icon' => 'Factory',
                'title' => 'Factory-Engineered Precision',
                'description' => 'Panels cut, drilled and 360° edge-banded in an automated factory — warranty-backed joinery engineered for the coast.',
            ],
            [
                'icon' => 'Palette',
                'title' => 'Curated Materials & Quality',
                'description' => 'Every finish, fitting, surface and fixture is selected for durability, elegance and everyday performance.',
            ],
            [
                'icon' => 'ShieldCheck',
                'title' => 'One-Year Post-Service Care',
                'description' => 'Complimentary one-year post-service care — because premium living deserves premium aftercare, long after handover.',
            ],
            [
                'icon' => 'CheckCircle2',
                'title' => '100+ Quality Checks',
                'description' => 'A formal 100+ point inspection and a snagging walkthrough with you, before you ever move in.',
            ],
            [
                'icon' => 'Clock',
                'title' => 'On-Time Delivery Record',
                'description' => 'Factory production runs in parallel with site works, tracked by a single project engineer — so your date holds.',
            ],
            [
                'icon' => 'BadgeIndianRupee',
                'title' => 'Transparent Costing',
                'description' => 'Detailed drawings, material specs and itemised costing locked in together. No hidden markups, no vague estimates.',
            ],
        ];
    }

    public static function getServiceCategories(): array
    {
        return [
            ['name' => 'TV / Entertainment Units', 'slug' => 'tv-units-chennai', 'group' => 'core'],
            ['name' => 'Wardrobes', 'slug' => 'wardrobe-design-chennai', 'group' => 'core'],
            ['name' => 'Bedroom Interiors', 'slug' => 'bedroom-interior-chennai', 'group' => 'core'],
            ['name' => 'Cabinets', 'slug' => 'cabinets', 'group' => 'core'],
            ['name' => 'Wallpapers & Paintings', 'slug' => 'wallpapers-paintings', 'group' => 'add-on'],
            ['name' => 'Crockery Units', 'slug' => 'crockery-units', 'group' => 'core'],
            ['name' => 'Modular Kitchens', 'slug' => 'modular-kitchen-chennai', 'group' => 'core'],
            ['name' => 'Storage Units', 'slug' => 'storage-units', 'group' => 'core'],
            ['name' => 'Study Units', 'slug' => 'study-units', 'group' => 'core'],
            ['name' => 'Smart Homes', 'slug' => 'smart-home-chennai', 'group' => 'add-on'],
            ['name' => 'Bathroom Fixtures', 'slug' => 'bathroom-fixtures', 'group' => 'add-on'],
            ['name' => 'Art Gallery & Artifacts', 'slug' => 'art-gallery-artifacts', 'group' => 'add-on'],
            ['name' => 'Plants & Landscaping', 'slug' => 'plants-landscaping', 'group' => 'add-on'],
            ['name' => 'Home Appliances', 'slug' => 'home-appliances', 'group' => 'add-on'],
            ['name' => 'Finished Furniture', 'slug' => 'finished-furniture', 'group' => 'core'],
            ['name' => 'Indoor & Outdoor Lighting', 'slug' => 'indoor-outdoor-lighting', 'group' => 'add-on'],
        ];
    }

    public static function getServiceAreas(): array
    {
        return [
            ['name' => 'Chennai', 'slug' => 'interior-designers-chennai'],
            ['name' => 'Coimbatore', 'slug' => 'interior-designers-coimbatore'],
            ['name' => 'Salem', 'slug' => 'interior-designers-salem'],
            ['name' => 'Hosur', 'slug' => 'interior-designers-hosur'],
            ['name' => 'Krishnagiri', 'slug' => 'interior-designers-krishnagiri'],
            ['name' => 'Dharmapuri', 'slug' => 'interior-designers-dharmapuri'],
            ['name' => 'Kanchipuram', 'slug' => 'interior-designers-kanchipuram'],
            ['name' => 'Chengalpattu', 'slug' => 'interior-designers-chengalpattu'],
            ['name' => 'Tamil Nadu', 'slug' => null, 'statewide' => true],
        ];
    }

    public static function getCities(): array
    {
        return array_values(array_filter(self::getServiceAreas(), fn($a) => empty($a['statewide'])));
    }

    public static function getCompanyStats(): array
    {
        return [
            ['value' => 10, 'suffix' => '+', 'label' => 'Years of Experience'],
            ['value' => 150, 'suffix' => '+', 'label' => 'Homes Transformed'],
            ['value' => 80, 'suffix' => '%', 'label' => 'Client Satisfaction'],
            ['value' => count(self::getCities()), 'suffix' => '', 'label' => 'Cities Served'],
        ];
    }

    public static function whatsappLink(string $text): string
    {
        $b = self::getBusiness();
        return sprintf("https://wa.me/%s?text=%s", $b['nap']['whatsappPhone'], urlencode($text));
    }
}
