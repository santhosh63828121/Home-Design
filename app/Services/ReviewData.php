<?php

namespace App\Services;

class ReviewData
{
    public static function getReviews(): array
    {
        return [
            [
                'id' => '1',
                'name' => 'Kiran Kumar',
                'location' => 'Velachery, Chennai',
                'project' => '2BHK Interior',
                'rating' => 5,
                'quote' => 'RGL Decors transformed our 2BHK with incredible precision. The 3D walkthrough match was 100% accurate, and the factory-finished wardrobes are seamless.',
            ],
            [
                'id' => '2',
                'name' => 'Anbu Chezian',
                'location' => 'OMR, Chennai',
                'project' => '3BHK Villa',
                'rating' => 5,
                'quote' => 'Being an NRI, I managed the entire 3BHK villa project remotely. The team gave weekly video updates and delivered on the exact promised date.',
            ],
            [
                'id' => '3',
                'name' => 'Divakar Raju',
                'location' => 'Anna Nagar, Chennai',
                'project' => 'Restaurant Fit-out',
                'rating' => 5,
                'quote' => 'Their turnkey approach saved us weeks of hassle. The commercial dining layout and custom lighting design exceeded our expectations.',
            ],
        ];
    }
}
