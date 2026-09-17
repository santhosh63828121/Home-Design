<?php

namespace App\Services;

class LookbookData
{
    public static function getLookbook(): array
    {
        return [
            'title' => 'RGL Decors 2026 Interior Lookbook',
            'description' => 'A curated 48-page collection of luxury living rooms, modular kitchens, wardrobes, and material palettes.',
            'pagesCount' => 48,
            'downloadUrl' => '/assets/downloads/RGL-Decors-Lookbook-2026.pdf',
        ];
    }
}
