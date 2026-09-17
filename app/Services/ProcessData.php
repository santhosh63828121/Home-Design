<?php

namespace App\Services;

class ProcessData
{
    public static function getSteps(): array
    {
        return [
            [
                'step' => '01',
                'title' => 'Discovery & Site Measurement',
                'description' => 'Free site visit, laser measurements, and initial style discovery meeting with our design team.',
            ],
            [
                'step' => '02',
                'title' => '3D Walkthrough & Material Selection',
                'description' => 'Photoreal 3D rendering of every room. Select laminates, acrylics, and hardware in real-time.',
            ],
            [
                'step' => '03',
                'title' => 'Transparent BOQ & Contract',
                'description' => 'Itemised cost breakdown with zero hidden fees. Material specs and delivery dates locked in.',
            ],
            [
                'step' => '04',
                'title' => 'Factory Production & Site Works',
                'description' => 'Panels cut, drilled and 360° edge-banded in our automated factory while civil/MEP work proceeds on site.',
            ],
            [
                'step' => '05',
                'title' => 'Snagging & Handover',
                'description' => '100+ point quality inspection, deep cleaning, snagging walkthrough, and 1-year complimentary care warranty handover.',
            ],
        ];
    }
}
