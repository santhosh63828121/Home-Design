<?php

namespace App\Services;

class ServiceData
{
    public static function getPositioning(): string
    {
        return 'From False Ceilings to Fine Art — Every Service Under One Roof.';
    }

    public static function getServiceGroups(): array
    {
        return [
            [
                'id' => 'residential',
                'letter' => 'A',
                'name' => 'Residential Interiors',
                'body' => 'Complete homes designed and built end-to-end — from compact apartments to multi-floor villas. Vastu-aware planning, NRI remote management, and one accountable partner from concept to handover.',
                'items' => [
                    ['name' => 'Full home design (1–5 BHK)'],
                    ['name' => 'Luxury apartments, villas, duplex & penthouse'],
                    ['name' => 'Bedroom interiors', 'slug' => 'bedroom-interior-chennai'],
                    ['name' => 'Vastu-compliant layouts'],
                    ['name' => 'NRI remote-managed projects'],
                ],
            ],
            [
                'id' => 'commercial',
                'letter' => 'B',
                'name' => 'Commercial Interiors',
                'body' => 'Workplaces and customer-facing spaces engineered to perform — productive offices, conversion-focused retail, and hospitality interiors that hold up to heavy daily use.',
                'items' => [
                    ['name' => 'Corporate offices & workstations'],
                    ['name' => 'Cabins & leadership suites'],
                    ['name' => 'Conference & meeting rooms'],
                    ['name' => 'Retail & boutique stores'],
                    ['name' => 'Salon & spa interiors'],
                    ['name' => 'Restaurants & cafés'],
                    ['name' => 'Clinics & healthcare spaces'],
                    ['name' => 'Hotels, resorts & showrooms'],
                ],
            ],
            [
                'id' => 'design-planning',
                'letter' => 'C',
                'name' => 'Interior Design & Planning',
                'body' => 'The thinking before the building. Space planning, drawings and photoreal visualisation, with a transparent bill of quantities so you see exactly what your money buys before anything is cut.',
                'items' => [
                    ['name' => 'Turnkey interior solutions'],
                    ['name' => 'Design consultation & space planning'],
                    ['name' => '2D layouts & 3D visualisation'],
                    ['name' => 'Working & shop drawings'],
                    ['name' => 'Mood boards & material selection'],
                    ['name' => 'BOQ & transparent costing'],
                    ['name' => 'Project management'],
                ],
            ],
            [
                'id' => 'modular',
                'letter' => 'D',
                'name' => 'Modular Interiors',
                'body' => 'Factory-engineered cabinetry, cut and 360° edge-banded on an automated line. Precise, repeatable and built to survive Chennai’s humidity — the core of almost every project we deliver.',
                'items' => [
                    ['name' => 'Modular kitchens', 'slug' => 'modular-kitchen-chennai'],
                    ['name' => 'Wardrobes & walk-in closets', 'slug' => 'wardrobe-design-chennai'],
                    ['name' => 'TV & media walls', 'slug' => 'tv-units-chennai'],
                    ['name' => 'Crockery & bar units', 'slug' => 'crockery-units'],
                    ['name' => 'Cabinets', 'slug' => 'cabinets'],
                    ['name' => 'Storage & utility units', 'slug' => 'storage-units'],
                    ['name' => 'Study & home-office units', 'slug' => 'study-units'],
                    ['name' => 'Shoe racks, vanity & foyer solutions'],
                    ['name' => 'Loft, utility & pantry cabinets'],
                    ['name' => 'Pooja units'],
                    ['name' => 'Home appliance integration', 'slug' => 'home-appliances'],
                ],
            ],
            [
                'id' => 'furniture',
                'letter' => 'E',
                'name' => 'Custom Furniture',
                'body' => 'Loose and built-in furniture made to your dimensions rather than a catalogue’s — upholstered seating, dining, beds and executive pieces, finished to match the room they live in.',
                'items' => [
                    ['name' => 'Sofas & upholstered seating'],
                    ['name' => 'Dining & coffee tables'],
                    ['name' => 'Beds & side tables'],
                    ['name' => 'Reception desks & office workstations'],
                    ['name' => 'Executive & conference tables'],
                    ['name' => 'Bookshelves, display & storage units'],
                    ['name' => 'Finished furniture', 'slug' => 'finished-furniture'],
                ],
            ],
            [
                'id' => 'civil',
                'letter' => 'F',
                'name' => 'Civil & Structural Works',
                'body' => 'The works that happen before the beautiful part — masonry, waterproofing, flooring, ceilings and wall finishes, sequenced so the trades never collide and the site never stalls.',
                'items' => [
                    ['name' => 'Masonry, brickwork & partitions'],
                    ['name' => 'Demolition & alterations'],
                    ['name' => 'Plastering, screeding & waterproofing'],
                    ['name' => 'Flooring (marble, granite, wood, SPC, epoxy, vinyl)'],
                    ['name' => 'False ceilings (gypsum, POP, cove, acoustic, decorative)'],
                    ['name' => 'Wall finishes, wallpapers & painting', 'slug' => 'wallpapers-paintings'],
                    ['name' => 'Wall panels, cladding & mirrors'],
                ],
            ],
            [
                'id' => 'mep-smart',
                'letter' => 'G',
                'name' => 'MEP & Smart Home',
                'body' => 'Everything behind the wall, done properly: concealed electricals, plumbing, HVAC and a layered lighting design — plus automation that makes the house respond to you, not the other way round.',
                'items' => [
                    ['name' => 'Electrical wiring & concealed services'],
                    ['name' => 'Lighting design (indoor, outdoor, decorative)', 'slug' => 'indoor-outdoor-lighting'],
                    ['name' => 'Plumbing & sanitary systems'],
                    ['name' => 'HVAC (split, cassette, VRV/VRF, ventilation)'],
                    ['name' => 'Smart home automation', 'slug' => 'smart-home-chennai'],
                    ['name' => 'Home theatre & security (CCTV, biometric, alarms)'],
                ],
            ],
            [
                'id' => 'glass-metal',
                'letter' => 'H',
                'name' => 'Glass, Aluminium & Metal Works',
                'body' => 'Fabrication that carries the architecture — structural glazing, shower cubicles, railings and cladding, engineered and installed to tolerances that keep glass and metal aligned for years.',
                'items' => [
                    ['name' => 'Toughened glass, partitions & shower cubicles'],
                    ['name' => 'Glass railings & structural glazing'],
                    ['name' => 'Aluminium windows, sliding & casement systems'],
                    ['name' => 'ACP cladding, pergolas & canopies'],
                    ['name' => 'Stainless steel railings, gates & fabrication'],
                ],
            ],
            [
                'id' => 'doors-windows',
                'letter' => 'I',
                'name' => 'Doors & Windows',
                'body' => 'The thresholds you touch every day. Main, bedroom and bathroom doors, space-saving sliding and pocket systems, and window systems specified for coastal wind and rain.',
                'items' => [
                    ['name' => 'Main, bedroom & bathroom doors'],
                    ['name' => 'Sliding & pocket doors'],
                    ['name' => 'UPVC & aluminium windows'],
                    ['name' => 'Mosquito mesh systems'],
                ],
            ],
            [
                'id' => 'kitchen-bath',
                'letter' => 'J',
                'name' => 'Kitchen & Bathroom Solutions',
                'body' => 'The two hardest-working rooms in the home, and the two most punished by Chennai’s humidity. Appliances, tall units, vanities and fixtures — specified for water, heat and daily use.',
                'items' => [
                    ['name' => 'Kitchen appliances (chimney, hob, dishwasher, refrigerator)'],
                    ['name' => 'Pantry & tall units'],
                    ['name' => 'Bathroom renovation & fixtures', 'slug' => 'bathroom-fixtures'],
                    ['name' => 'Vanity units, faucets & accessories'],
                    ['name' => 'Shower enclosures & mirrors'],
                ],
            ],
            [
                'id' => 'soft-furnishing',
                'letter' => 'K',
                'name' => 'Soft Furnishings & Décor',
                'body' => 'The final layer — the one that makes a finished room feel like a home. Curtains, upholstery, rugs, art and the styling details that are usually left to the client and rarely done well.',
                'items' => [
                    ['name' => 'Curtains, blinds & motorised systems'],
                    ['name' => 'Upholstery & custom sofas'],
                    ['name' => 'Cushions, rugs, carpets & bed linen'],
                    ['name' => 'Artwork, sculptures & artifacts', 'slug' => 'art-gallery-artifacts'],
                    ['name' => 'Indoor & artificial plants', 'slug' => 'plants-landscaping'],
                    ['name' => 'Luxury accessories & styling'],
                ],
            ],
            [
                'id' => 'lighting',
                'letter' => 'L',
                'name' => 'Lighting',
                'body' => 'Light is the cheapest way to make a room feel expensive — and the easiest thing to get wrong. We layer ambient, task and accent light so the space works at 8am and at midnight.',
                'items' => [
                    ['name' => 'Chandeliers & pendant lights'],
                    ['name' => 'Cove & profile lighting'],
                    ['name' => 'Track & spotlights'],
                    ['name' => 'Decorative lamps'],
                    ['name' => 'Garden & landscape lighting', 'slug' => 'indoor-outdoor-lighting'],
                ],
            ],
            [
                'id' => 'outdoor',
                'letter' => 'M',
                'name' => 'Outdoor & Landscaping',
                'body' => 'Terraces, balconies and gardens treated as rooms rather than leftovers — planted, lit, drained and furnished so the outside of the home gets used as much as the inside.',
                'items' => [
                    ['name' => 'Landscape & garden development', 'slug' => 'plants-landscaping'],
                    ['name' => 'Terrace & balcony design'],
                    ['name' => 'Pergolas, gazebos & outdoor kitchens'],
                    ['name' => 'Water features & pools'],
                    ['name' => 'Outdoor decking & seating'],
                    ['name' => 'Irrigation systems'],
                ],
            ],
            [
                'id' => 'specialty',
                'letter' => 'N',
                'name' => 'Specialty Services',
                'body' => 'Where the brief is unusual — a full villa, a lived-in home that must be renovated around a family, a Vastu remit, or a client who wants the greenest build we can responsibly deliver.',
                'items' => [
                    ['name' => 'Luxury villa & apartment interiors'],
                    ['name' => 'Renovation & remodelling (home, office, villa)'],
                    ['name' => 'Space optimisation & Vastu consultation'],
                    ['name' => 'Sustainable & green building solutions'],
                ],
            ],
            [
                'id' => 'after-sales',
                'letter' => 'O',
                'name' => 'After-Sales & Care',
                'body' => 'The part most studios stop caring about. Every RGL project includes complimentary one-year post-service care, with annual maintenance and fast warranty support available after that.',
                'items' => [
                    ['name' => 'One-year complimentary post-service care'],
                    ['name' => 'Annual maintenance contracts (AMC)'],
                    ['name' => 'Warranty service & fast support'],
                    ['name' => 'Furniture maintenance & repairs'],
                    ['name' => 'Deep cleaning & move-in ready refresh'],
                    ['name' => 'Renovation & upgrades'],
                ],
            ],
        ];
    }

    public static function getBySlug(string $slug): ?array
    {
        foreach (self::getServiceGroups() as $group) {
            foreach ($group['items'] as $item) {
                if (isset($item['slug']) && $item['slug'] === $slug) {
                    return array_merge($item, ['group_name' => $group['name'], 'group_id' => $group['id']]);
                }
            }
        }
        return null;
    }
}
