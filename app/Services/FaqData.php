<?php

namespace App\Services;

class FaqData
{
    public static function getFaqCategories(): array
    {
        return [
            [
                'id' => 'pricing-cost',
                'name' => 'Pricing & Costing',
                'faqs' => [
                    ['q' => 'How much does home interior cost in Chennai?', 'a' => 'Interiors depend on scope and finish. An Essentials 2BHK starts around ₹3.5–6 lakh, a Premium 3BHK around ₹6–12 lakh, and a modular kitchen from ₹50,000.'],
                    ['q' => 'What is included in your interior packages?', 'a' => 'Packages include modular kitchen, wardrobes, TV unit and a free 3D walkthrough. Premium scopes add false ceiling, lighting and painting.'],
                    ['q' => 'Do you offer EMI or no-cost EMI?', 'a' => 'Yes, EMI options are available up to 24 months with no-cost EMI on select plans.'],
                ],
            ],
            [
                'id' => 'process-timeline',
                'name' => 'Process & Timelines',
                'faqs' => [
                    ['q' => 'What is your 45-day execution process?', 'a' => 'Factory manufacturing runs in parallel with site preparation so on-site installation is completed fast and clean.'],
                    ['q' => 'Is the 3D design walkthrough really free?', 'a' => 'Yes, the HD 3D walkthrough and itemised quote are 100% free with no obligation.'],
                ],
            ],
            [
                'id' => 'materials-quality',
                'name' => 'Materials & Quality',
                'faqs' => [
                    ['q' => 'What materials do you use for modular kitchens and wardrobes?', 'a' => 'We use factory-cut, 360° edge-banded BWP ply and HDHMR boards with branded soft-close hardware (Hettich, Hafele, Blum).'],
                    ['q' => 'How does your warranty work?', 'a' => 'We offer 5-year hardware warranty and 1-year coverage on shutters and carcass, backed by 1-year complimentary post-service care.'],
                ],
            ],
        ];
    }
}
