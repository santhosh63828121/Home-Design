<?php

namespace App\Services;

class PricingData
{
    public const PRICING_INDICATIVE = true;
    public const PRICING_FOOTNOTE = '*Indicative range. Final quote after free site visit.';

    public static function formatINR(float $n): string
    {
        if ($n >= 1e7) {
            $r = round(($n / 1e7) * 10) / 10;
            return '₹' . ($r == floor($r) ? (int)$r : sprintf("%.1f", $r)) . 'Cr';
        }
        if ($n >= 1e5) {
            $r = round(($n / 1e5) * 10) / 10;
            return '₹' . ($r == floor($r) ? (int)$r : sprintf("%.1f", $r)) . 'L';
        }
        return '₹' . number_format(round($n));
    }

    public static function priceLabel(array $r, bool $indicative = self::PRICING_INDICATIVE): string
    {
        $star = $indicative ? '*' : '';
        if (!isset($r['min']) || $r['min'] === null) return 'Custom quote';
        if (!isset($r['max']) || $r['max'] === null) return 'From ' . self::formatINR($r['min']) . $star;
        if ($r['min'] === $r['max']) return self::formatINR($r['min']) . $star;
        return self::formatINR($r['min']) . '–' . self::formatINR($r['max']) . $star;
    }

    public static function getPackages(): array
    {
        return [
            [
                'id' => 'modular-kitchen',
                'name' => 'Modular Kitchen',
                'scope' => 'Base + tall + loft units, branded hardware, counter',
                'range' => ['min' => 50000, 'max' => null],
                'indicative' => false,
                'included' => ['Carcass + shutters', 'Soft-close hardware', 'Loft & tall units', 'Free 3D design'],
                'excluded' => ['Countertop stone', 'Chimney & hob', 'Sink & faucet', 'Civil / plumbing work'],
            ],
            [
                'id' => 'essentials-2bhk',
                'name' => 'Essentials 2BHK',
                'scope' => 'Modular kitchen + 2 wardrobes + TV unit',
                'range' => ['min' => 350000, 'max' => 600000],
                'indicative' => true,
                'included' => ['Modular kitchen', '2 wardrobes', 'TV / entertainment unit', 'Free 3D walkthrough'],
                'excluded' => ['False ceiling', 'Painting', 'Loose furniture', 'Appliances'],
            ],
            [
                'id' => 'premium-3bhk',
                'name' => 'Premium 3BHK',
                'scope' => 'Full home with branded fittings & finishes',
                'range' => ['min' => 600000, 'max' => 1200000],
                'indicative' => true,
                'included' => [
                    'Kitchen + 3 wardrobes',
                    'TV unit, crockery & storage',
                    'False ceiling + lighting',
                    'Painting + 3D walkthrough',
                ],
                'excluded' => ['Major civil work', 'Premium appliances', 'Smart-home add-ons'],
            ],
            [
                'id' => 'full-home-turnkey',
                'name' => 'Full Home Turnkey',
                'scope' => 'Civil + false ceiling + furniture, end-to-end',
                'range' => ['min' => null, 'max' => null],
                'indicative' => true,
                'included' => ['Everything in Premium', 'Civil & electrical coordination', 'Loose furniture & décor', 'Smart-home & landscaping (optional)'],
                'excluded' => ['Statutory approvals', 'Structural changes'],
            ],
        ];
    }

    public static function getFinishTiers(): array
    {
        return [
            ['id' => 'essential', 'name' => 'Essential', 'blurb' => 'Quality laminates, reliable hardware', 'multiplier' => 1.0],
            ['id' => 'premium', 'name' => 'Premium', 'blurb' => 'Acrylic / membrane finishes, branded hardware', 'multiplier' => 1.35],
            ['id' => 'luxury', 'name' => 'Luxury', 'blurb' => 'PU / veneer, designer hardware & lighting', 'multiplier' => 1.75],
        ];
    }

    public static function getRoomRates(): array
    {
        return [
            ['id' => 'modular-kitchen', 'name' => 'Modular kitchen', 'base' => ['min' => 50000, 'max' => 250000], 'maxQty' => 2],
            ['id' => 'wardrobe', 'name' => 'Wardrobe', 'base' => ['min' => 35000, 'max' => 90000], 'maxQty' => 5, 'unitLabel' => 'wardrobe'],
            ['id' => 'tv-unit', 'name' => 'TV / entertainment unit', 'base' => ['min' => 25000, 'max' => 70000], 'maxQty' => 2],
            ['id' => 'crockery-unit', 'name' => 'Crockery unit', 'base' => ['min' => 20000, 'max' => 55000], 'maxQty' => 2],
            ['id' => 'storage-unit', 'name' => 'Storage / utility unit', 'base' => ['min' => 15000, 'max' => 45000], 'maxQty' => 4],
            ['id' => 'pooja-unit', 'name' => 'Pooja unit', 'base' => ['min' => 20000, 'max' => 60000], 'maxQty' => 1],
            ['id' => 'false-ceiling', 'name' => 'False ceiling + lighting', 'base' => ['min' => 25000, 'max' => 75000], 'maxQty' => 4, 'unitLabel' => 'room'],
            ['id' => 'painting', 'name' => 'Painting (full home)', 'base' => ['min' => 30000, 'max' => 80000], 'maxQty' => 1],
            ['id' => 'living-room', 'name' => 'Living room (sofa, console, décor)', 'base' => ['min' => 50000, 'max' => 150000], 'maxQty' => 1],
        ];
    }

    public static function getBhkPresets(): array
    {
        return [
            ['id' => '1bhk', 'label' => '1 BHK', 'rooms' => [['roomId' => 'modular-kitchen', 'qty' => 1], ['roomId' => 'wardrobe', 'qty' => 1], ['roomId' => 'tv-unit', 'qty' => 1]]],
            ['id' => '2bhk', 'label' => '2 BHK', 'rooms' => [['roomId' => 'modular-kitchen', 'qty' => 1], ['roomId' => 'wardrobe', 'qty' => 2], ['roomId' => 'tv-unit', 'qty' => 1]]],
            ['id' => '3bhk', 'label' => '3 BHK', 'rooms' => [['roomId' => 'modular-kitchen', 'qty' => 1], ['roomId' => 'wardrobe', 'qty' => 3], ['roomId' => 'tv-unit', 'qty' => 1], ['roomId' => 'false-ceiling', 'qty' => 2], ['roomId' => 'painting', 'qty' => 1]]],
            ['id' => 'full-home', 'label' => 'Full Home', 'rooms' => [['roomId' => 'modular-kitchen', 'qty' => 1], ['roomId' => 'wardrobe', 'qty' => 3], ['roomId' => 'tv-unit', 'qty' => 1], ['roomId' => 'crockery-unit', 'qty' => 1], ['roomId' => 'false-ceiling', 'qty' => 3], ['roomId' => 'painting', 'qty' => 1], ['roomId' => 'living-room', 'qty' => 1], ['roomId' => 'pooja-unit', 'qty' => 1]]],
        ];
    }

    public static function getDesignTiers(): array
    {
        return [
            ['id' => 'essential', 'name' => 'Essential', 'blurb' => 'Quality modular interiors, honestly priced.', 'perSqft' => ['min' => 700, 'max' => 900]],
            ['id' => 'elite', 'name' => 'Elite', 'blurb' => 'Branded hardware and a layered design plan.', 'perSqft' => ['min' => 1200, 'max' => 1500], 'featured' => true],
            ['id' => 'luxury', 'name' => 'Luxury', 'blurb' => 'Imported finishes and full design direction.', 'perSqft' => ['min' => 1800, 'max' => 2500]],
            ['id' => 'signature', 'name' => 'Signature', 'blurb' => 'Bespoke, client-specified, MD-led.', 'perSqft' => null],
        ];
    }

    public static function getTierFeatures(): array
    {
        return [
            ['label' => 'Material core', 'cells' => ['HDHMR', 'Premium BWP ply', 'Marine / import ply', 'Client-specified']],
            ['label' => 'Shutter finish', 'cells' => ['Economy laminates', 'Greenlam / Merino', 'European laminates', 'Curated']],
            ['label' => 'Hardware', 'cells' => ['Standard', 'Hettich / Hafele', 'Blum full system', 'Brand of choice']],
            ['label' => 'Countertop', 'cells' => ['Granite (2cm)', 'Quartz', 'Italian marble', 'Client-specified']],
            ['label' => 'Lighting', 'cells' => ['Basic points', 'Layered plan', 'Full lux-calculated', 'Bespoke']],
            ['label' => 'Warranty', 'cells' => ['As per /warranty', 'As per /warranty', 'As per /warranty', 'As per /warranty']],
            ['label' => 'Project manager', 'cells' => ['Shared', 'Dedicated', 'Dedicated + Design Dir', 'MD-level oversight']],
            ['label' => '3D walkthrough', 'cells' => ['Included', 'Included', 'Premium renders', 'VR walkthrough']],
        ];
    }

    public static function getFaqs(string $key = 'hub'): array
    {
        $all = [
            'hub' => [
                ['q' => 'How much does home interior cost in Chennai?', 'a' => 'It depends on scope and finish. As a guide, an Essentials 2BHK starts around ₹3.5–6 lakh and a Premium 3BHK around ₹6–12 lakh, while a modular kitchen starts from ₹50,000. Use the calculator above for an instant range, then book a free site visit for an exact quote.'],
                ['q' => 'What is included in your interior packages?', 'a' => 'Packages typically include modular kitchen, wardrobes and a TV unit, plus your free 3D walkthrough. Premium and turnkey scopes add false ceiling, lighting and painting. Civil work, appliances and loose furniture are usually quoted separately.'],
                ['q' => 'Do you offer EMI or no-cost EMI?', 'a' => 'Yes. We offer EMI options up to 24 months, with no-cost EMI available on select plans.'],
                ['q' => 'Why is the price shown as a range and not a fixed number?', 'a' => 'Interiors are made to your space, layout and finish choice, so an honest figure is a range until we measure your home.'],
                ['q' => 'Is the 3D design and quote really free?', 'a' => 'Yes — the HD 3D walkthrough and the itemised quote are completely free.'],
            ],
            'kitchen' => [
                ['q' => 'How much does a modular kitchen cost in Chennai?', 'a' => 'Modular kitchens start from ₹50,000 and scale with size, layout and finish.'],
                ['q' => 'What kitchen layouts do you build?', 'a' => 'We build L-shaped, U-shaped, parallel and island layouts.'],
                ['q' => 'Is the countertop and chimney included in the price?', 'a' => 'The base price covers carcass, shutters, hardware and loft/tall units.'],
                ['q' => 'What finishes can I choose for my kitchen?', 'a' => 'From quality laminates (Essential) to acrylic and membrane (Premium) and PU or veneer (Luxury).'],
            ],
            '2bhk' => [
                ['q' => 'How much to do interiors for a 2BHK in Chennai?', 'a' => 'Our Essentials 2BHK — modular kitchen, two wardrobes and a TV unit — starts around ₹3.5–6 lakh.'],
                ['q' => 'What does the 2BHK package include?', 'a' => 'A modular kitchen, two wardrobes, a TV/entertainment unit and your free 3D walkthrough.'],
                ['q' => 'Can I do my 2BHK in phases?', 'a' => 'Yes. Many clients start with the kitchen and wardrobes, then add units later.'],
                ['q' => 'How long does a 2BHK take to deliver?', 'a' => 'Most of the work happens off-site in our factory and installation is quick.'],
            ],
            '3bhk' => [
                ['q' => 'How much to do interiors for a 3BHK in Chennai?', 'a' => 'Our Premium 3BHK — a full home with branded fittings — starts around ₹6–12 lakh.'],
                ['q' => 'What is the difference between Premium and Full Home Turnkey?', 'a' => 'Premium covers core modular & ceilings; Turnkey adds civil, electrical, loose furniture, and décor.'],
                ['q' => 'Do you provide branded hardware and fittings for a 3BHK?', 'a' => 'Yes — Premium and Luxury finishes use branded soft-close hardware.'],
                ['q' => 'Is EMI available for a full 3BHK project?', 'a' => 'Yes, EMI is available up to 24 months with no-cost EMI on select plans.'],
            ],
        ];
        return $all[$key] ?? $all['hub'];
    }
}
