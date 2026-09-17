<?php

namespace App\Services;

class LocationData
{
    public static function getCities(): array
    {
        return [
            [
                'slug' => 'interior-designers-chennai',
                'projectKey' => 'chennai',
                'name' => 'Chennai',
                'geo' => ['lat' => 13.0827, 'lng' => 80.2707],
                'tagline' => 'Our home base — the largest market we serve.',
                'metaDescription' => 'Interior designers in Chennai — RGL Decors for modular kitchens, wardrobes and full-home interiors across OMR, ECR, Velachery, Anna Nagar and more. Free 3D design, 10-yr warranty.',
                'intro' => 'Chennai is our home turf and our largest market. From high-rise apartments along the OMR and ECR IT corridors to independent houses in the older neighbourhoods, we design and factory-build interiors to fit every kind of Chennai home — and install with minimal disruption to your move-in plans.',
                'housing' => 'Chennai homes split between apartment living (heavy along OMR, ECR and the southern suburbs) and independent houses in established areas — so our work ranges from compact 2BHK fit-outs to full villa interiors.',
                'areas' => ['Velachery', 'OMR / Sholinganallur', 'ECR', 'Adyar', 'Anna Nagar', 'T. Nagar', 'Porur', 'Tambaram', 'Perambur'],
                'nearby' => 'We also cover the greater Chennai belt including Pallavaram, Chromepet, Madhavaram and Avadi.',
                'faqs' => [
                    ['q' => 'Do you handle apartment interiors on OMR and ECR?', 'a' => 'Yes — a large share of our Chennai projects are apartments along the OMR and ECR corridors.'],
                    ['q' => 'Can you work within gated-community and society rules?', 'a' => 'We regularly work inside gated communities and handle society formalities.'],
                    ['q' => 'How quickly can you deliver interiors in Chennai?', 'a' => 'Timelines depend on scope, but factory-built modules keep site time short.'],
                ],
            ],
            [
                'slug' => 'interior-designers-coimbatore',
                'projectKey' => 'coimbatore',
                'name' => 'Coimbatore',
                'geo' => ['lat' => 11.0168, 'lng' => 76.9558],
                'tagline' => 'Independent-house interiors in the textile city.',
                'metaDescription' => 'Interior designers in Coimbatore — RGL Decors for independent houses, villas and IT-corridor apartments.',
                'intro' => 'Coimbatore homes lean towards independent houses and villas, with apartment living growing fast around the Saravanampatti IT corridor.',
                'housing' => 'Unlike apartment-dense Chennai, Coimbatore is largely independent houses and villas.',
                'areas' => ['RS Puram', 'Saibaba Colony', 'Peelamedu', 'Race Course', 'Vadavalli', 'Saravanampatti', 'Singanallur', 'Ganapathy'],
                'faqs' => [
                    ['q' => 'Do you design interiors for independent houses and villas in Coimbatore?', 'a' => 'Yes — most of our Coimbatore work is for independent houses and villas.'],
                ],
            ],
            [
                'slug' => 'interior-designers-salem',
                'projectKey' => 'salem',
                'name' => 'Salem',
                'geo' => ['lat' => 11.6643, 'lng' => 78.146],
                'tagline' => 'Practical, durable interiors for Salem homes.',
                'metaDescription' => 'Interior designers in Salem — RGL Decors for independent-house interiors, modular kitchens and wardrobes.',
                'intro' => 'Salem is predominantly an independent-house city, and homeowners here value durable, practical interiors.',
                'housing' => 'Salem homes are mostly independent houses, often multi-generational.',
                'areas' => ['Fairlands', 'Hasthampatti', 'Five Roads', 'Alagapuram', 'Suramangalam', 'Kondalampatti'],
                'faqs' => [
                    ['q' => 'Do you build interiors for independent homes in Salem?', 'a' => 'Yes — almost all Salem projects are independent houses.'],
                ],
            ],
            [
                'slug' => 'interior-designers-hosur',
                'projectKey' => 'hosur',
                'name' => 'Hosur',
                'geo' => ['lat' => 12.7409, 'lng' => 77.8253],
                'tagline' => 'Fast interiors for the industrial belt near Bangalore.',
                'metaDescription' => 'Interior designers in Hosur — RGL Decors for apartments and homes in the SIPCOT industrial belt.',
                'intro' => 'Hosur sits on the Tamil Nadu–Karnataka border and is driven by its SIPCOT industrial belt.',
                'housing' => 'Hosur has a growing share of apartments built for its industrial and IT workforce.',
                'areas' => ['Bagalur Road', 'SIPCOT', 'Mathigiri', 'Shoolagiri', 'Hosur Town', 'Zuzuvadi'],
                'faqs' => [
                    ['q' => 'Do you furnish apartments for working professionals in Hosur?', 'a' => 'Yes — much of Hosur’s housing serves its SIPCOT and industrial workforce.'],
                ],
            ],
            [
                'slug' => 'interior-designers-krishnagiri',
                'projectKey' => 'krishnagiri',
                'name' => 'Krishnagiri',
                'geo' => ['lat' => 12.5186, 'lng' => 78.2137],
                'tagline' => 'Full-home interiors along the NH-44 belt.',
                'metaDescription' => 'Interior designers in Krishnagiri — RGL Decors for independent-house interiors.',
                'intro' => 'Krishnagiri, the mango-belt district headquarters on the NH-44 highway, is largely a town of independent houses.',
                'housing' => 'Krishnagiri is dominated by independent houses.',
                'areas' => ['Krishnagiri Town', 'Rayakottai Road', 'Bargur', 'Hosur Road belt'],
                'faqs' => [
                    ['q' => 'Do you serve independent homes in Krishnagiri town and the district?', 'a' => 'Yes — we cover Krishnagiri town and the surrounding district.'],
                ],
            ],
            [
                'slug' => 'interior-designers-dharmapuri',
                'projectKey' => 'dharmapuri',
                'name' => 'Dharmapuri',
                'geo' => ['lat' => 12.1277, 'lng' => 78.1582],
                'tagline' => 'Warranty-backed interiors for Dharmapuri homes.',
                'metaDescription' => 'Interior designers in Dharmapuri — RGL Decors for independent-house interiors.',
                'intro' => 'Dharmapuri is an agricultural district headquarters where homes are almost entirely independent houses.',
                'housing' => 'Homes in Dharmapuri are predominantly independent houses.',
                'areas' => ['Dharmapuri Town', 'Pennagaram Road', 'Palacode belt', 'Harur'],
                'faqs' => [
                    ['q' => 'Do you deliver interiors to Dharmapuri and its district towns?', 'a' => 'Yes — we serve Dharmapuri town and surrounding areas.'],
                ],
            ],
            [
                'slug' => 'interior-designers-kanchipuram',
                'projectKey' => 'kanchipuram',
                'name' => 'Kanchipuram',
                'geo' => ['lat' => 12.8342, 'lng' => 79.7036],
                'tagline' => 'Where tradition meets modern interiors.',
                'metaDescription' => 'Interior designers in Kanchipuram — RGL Decors blending traditional and modern home interiors.',
                'intro' => 'Kanchipuram, the historic temple and silk-weaving city, is home to both heritage independent houses and a new wave of apartments.',
                'housing' => 'Kanchipuram mixes traditional independent homes with newer apartments.',
                'areas' => ['Kanchipuram Town', 'Little Kanchipuram', 'Sriperumbudur belt', 'Walajabad Road'],
                'faqs' => [
                    ['q' => 'Can you blend a traditional look with modern modular interiors?', 'a' => 'Yes — this is a common Kanchipuram brief.'],
                ],
            ],
            [
                'slug' => 'interior-designers-chengalpattu',
                'projectKey' => 'chengalpattu',
                'name' => 'Chengalpattu',
                'geo' => ['lat' => 12.6921, 'lng' => 79.976],
                'tagline' => 'New-home interiors on Chennai’s southern growth corridor.',
                'metaDescription' => 'Interior designers in Chengalpattu — RGL Decors for new apartment and villa interiors.',
                'intro' => 'Chengalpattu is one of the fastest-growing pockets on Chennai’s southern fringe.',
                'housing' => 'Chengalpattu is seeing a surge of new apartments and gated villa projects.',
                'areas' => ['Chengalpattu Town', 'GST Road / NH-45', 'Maraimalai Nagar', 'Singaperumal Koil', 'Mahindra World City belt', 'Guduvanchery'],
                'faqs' => [
                    ['q' => 'Do you take on newly handed-over apartments along GST Road?', 'a' => 'Yes — first-time fit-outs for new flats and villas are a big part of our work.'],
                ],
            ],
        ];
    }

    public static function getSuburbs(): array
    {
        return [
            [
                'slug' => 'interior-designers-avadi',
                'projectKey' => 'avadi',
                'name' => 'Avadi',
                'geo' => ['lat' => 13.1147, 'lng' => 80.0982],
                'tagline' => 'Our home ground in north-west Chennai.',
                'metaDescription' => 'Interior designers in Avadi, Chennai — RGL Decors, based here.',
                'intro' => 'Avadi is our home ground. As a fast-growing township in north-west Chennai.',
                'housing' => 'Independent houses and plots sit alongside newer mid-segment apartments.',
                'areas' => ['Avadi', 'Thirumullaivoyal', 'Pattabiram', 'Paruthipattu', 'Ambattur', 'Sevvapet'],
                'faqs' => [['q' => 'Is RGL Decors actually based in Avadi?', 'a' => 'Yes — Avadi is our home base.']],
            ],
            [
                'slug' => 'interior-designers-anna-nagar',
                'projectKey' => 'anna-nagar',
                'name' => 'Anna Nagar',
                'geo' => ['lat' => 13.085, 'lng' => 80.2101],
                'tagline' => 'Premium interiors for one of Chennai’s most planned neighbourhoods.',
                'metaDescription' => 'Interior designers in Anna Nagar, Chennai — RGL Decors.',
                'intro' => 'Anna Nagar is one of Chennai’s most established and planned neighbourhoods.',
                'housing' => 'A mix of upscale apartments and older independent bungalows.',
                'areas' => ['Anna Nagar West', 'Shanthi Colony', 'Thirumangalam', 'Anna Nagar East', 'Blue Star Colony'],
                'faqs' => [['q' => 'Do you handle premium and bespoke interiors in Anna Nagar?', 'a' => 'Yes — Anna Nagar homeowners typically want premium finishes.']],
            ],
            [
                'slug' => 'interior-designers-porur',
                'projectKey' => 'porur',
                'name' => 'Porur',
                'geo' => ['lat' => 13.0382, 'lng' => 80.1565],
                'tagline' => 'Interiors for Porur’s fast-growing IT-corridor homes.',
                'metaDescription' => 'Interior designers in Porur, Chennai — RGL Decors.',
                'intro' => 'Porur has transformed into one of west Chennai’s busiest residential and IT hubs.',
                'housing' => 'Largely new apartments and gated-community flats, with some independent houses.',
                'areas' => ['Porur', 'Iyyappanthangal', 'Mugalivakkam', 'Ramapuram', 'Kundrathur'],
                'faqs' => [['q' => 'Can you finish a Porur apartment before my move-in date?', 'a' => 'Yes — because units are factory-built.']],
            ],
            [
                'slug' => 'interior-designers-velachery',
                'projectKey' => 'velachery',
                'name' => 'Velachery',
                'geo' => ['lat' => 12.9791, 'lng' => 80.2204],
                'tagline' => 'Smart interiors for Velachery’s compact, well-connected homes.',
                'metaDescription' => 'Interior designers in Velachery, Chennai — RGL Decors.',
                'intro' => 'Velachery is one of south Chennai’s most connected and densely-built residential pockets.',
                'housing' => 'Predominantly mid-segment apartments, many of them compact 2 and 3BHKs.',
                'areas' => ['Velachery', 'Pallikaranai', 'Madipakkam', 'Taramani', 'Guindy'],
                'faqs' => [['q' => 'How do you make a small Velachery apartment feel bigger?', 'a' => 'With layout-first design.']],
            ],
            [
                'slug' => 'interior-designers-omr',
                'projectKey' => 'omr',
                'name' => 'OMR',
                'geo' => ['lat' => 12.9009, 'lng' => 80.2279],
                'tagline' => 'Interiors for the OMR IT corridor’s high-rise homes.',
                'metaDescription' => 'Interior designers on OMR, Chennai — RGL Decors.',
                'intro' => 'The OMR IT corridor — from Perungudi down to Sholinganallur, Navalur and Siruseri.',
                'housing' => 'High-rise gated-community apartments dominate.',
                'areas' => ['Sholinganallur', 'Navalur', 'Siruseri', 'Perungudi', 'Thoraipakkam', 'Karapakkam'],
                'faqs' => [['q' => 'I’m an NRI buying on OMR — can you manage the project remotely?', 'a' => 'Yes. We run NRI projects end-to-end remotely.']],
            ],
            [
                'slug' => 'interior-designers-ecr',
                'projectKey' => 'ecr',
                'name' => 'ECR',
                'geo' => ['lat' => 12.9494, 'lng' => 80.2585],
                'tagline' => 'Coastal-grade interiors for ECR villas and beach homes.',
                'metaDescription' => 'Interior designers on ECR, Chennai — RGL Decors.',
                'intro' => 'The East Coast Road is Chennai’s premium coastal belt.',
                'housing' => 'Independent villas, beach houses and farmhouse-style second homes.',
                'areas' => ['Neelankarai', 'Injambakkam', 'Akkarai', 'Uthandi', 'Kovalam', 'Muttukadu'],
                'faqs' => [['q' => 'How do you protect ECR interiors from sea humidity and salt air?', 'a' => 'We use marine-grade BWP/Gurjan substrates.']],
            ],
            [
                'slug' => 'interior-designers-adyar',
                'projectKey' => 'adyar',
                'name' => 'Adyar',
                'geo' => ['lat' => 13.0064, 'lng' => 80.2574],
                'tagline' => 'Refined interiors for Adyar’s established homes.',
                'metaDescription' => 'Interior designers in Adyar, Chennai — RGL Decors.',
                'intro' => 'Adyar is one of Chennai’s most desirable and established neighbourhoods.',
                'housing' => 'Established independent houses and premium apartments.',
                'areas' => ['Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Kotturpuram', 'Gandhi Nagar'],
                'faqs' => [['q' => 'Do you renovate older homes in Adyar?', 'a' => 'Yes — a large share of Adyar work is renovation.']],
            ],
            [
                'slug' => 'interior-designers-t-nagar',
                'projectKey' => 't-nagar',
                'name' => 'T. Nagar',
                'geo' => ['lat' => 13.0418, 'lng' => 80.2341],
                'tagline' => 'Space-smart interiors for T. Nagar’s central, compact homes.',
                'metaDescription' => 'Interior designers in T. Nagar, Chennai — RGL Decors.',
                'intro' => 'T. Nagar is the dense, vibrant heart of central Chennai.',
                'housing' => 'Older apartments and compact homes.',
                'areas' => ['T. Nagar', 'Pondy Bazaar', 'West Mambalam', 'Mambalam', 'Nungambakkam'],
                'faqs' => [['q' => 'Can you work around T. Nagar’s tight access and busy streets?', 'a' => 'Yes — we plan deliveries around access constraints.']],
            ],
            [
                'slug' => 'interior-designers-chromepet',
                'projectKey' => 'chromepet',
                'name' => 'Chromepet',
                'geo' => ['lat' => 12.9516, 'lng' => 80.1402],
                'tagline' => 'Value-honest interiors for Chromepet’s suburban homes.',
                'metaDescription' => 'Interior designers in Chromepet, Chennai — RGL Decors.',
                'intro' => 'Chromepet anchors Chennai’s southern suburban belt along the GST Road.',
                'housing' => 'Independent houses and mid-segment apartments.',
                'areas' => ['Chromepet', 'Pallavaram', 'Hasthinapuram', 'Chitlapakkam', 'Selaiyur'],
                'faqs' => [['q' => 'Is RGL affordable for a Chromepet family home?', 'a' => 'Our pricing is fully itemised.']],
            ],
            [
                'slug' => 'interior-designers-mogappair',
                'projectKey' => 'mogappair',
                'name' => 'Mogappair',
                'geo' => ['lat' => 13.0878, 'lng' => 80.1757],
                'tagline' => 'Interiors for Mogappair’s planned residential homes.',
                'metaDescription' => 'Interior designers in Mogappair, Chennai — RGL Decors.',
                'intro' => 'Mogappair is a well-planned, family-friendly residential pocket.',
                'housing' => 'Planned-layout apartments and independent houses.',
                'areas' => ['Mogappair East', 'Mogappair West', 'Golden George Nagar', 'Nolambur', 'Ambattur'],
                'faqs' => [['q' => 'Do you serve both apartments and independent houses in Mogappair?', 'a' => 'Yes — Mogappair has both.']],
            ],
            [
                'slug' => 'interior-designers-tambaram',
                'projectKey' => 'tambaram',
                'name' => 'Tambaram',
                'geo' => ['lat' => 12.9229, 'lng' => 80.1275],
                'tagline' => 'Interiors for Tambaram’s fast-growing southern homes.',
                'metaDescription' => 'Interior designers in Tambaram, Chennai — RGL Decors.',
                'intro' => 'Tambaram is one of south Chennai’s fastest-growing suburban hubs.',
                'housing' => 'A growing mix of new apartments and independent houses.',
                'areas' => ['East Tambaram', 'West Tambaram', 'Selaiyur', 'Mudichur', 'Perungalathur', 'Chitlapakkam'],
                'faqs' => [['q' => 'Do you cover the newer developments around Tambaram?', 'a' => 'Yes — including Mudichur and Perungalathur.']],
            ],
            [
                'slug' => 'interior-designers-nungambakkam',
                'projectKey' => 'nungambakkam',
                'name' => 'Nungambakkam',
                'geo' => ['lat' => 13.0596, 'lng' => 80.2426],
                'tagline' => 'High-end interiors for Nungambakkam’s premium central homes.',
                'metaDescription' => 'Interior designers in Nungambakkam, Chennai — RGL Decors.',
                'intro' => 'Nungambakkam is one of central Chennai’s most upmarket addresses.',
                'housing' => 'Premium apartments and established bungalows.',
                'areas' => ['Nungambakkam', 'Sterling Road', 'College Road', 'Thousand Lights', 'Egmore'],
                'faqs' => [['q' => 'Do you offer luxury and bespoke interiors in Nungambakkam?', 'a' => 'Yes — our Luxury and Signature tiers cover imported finishes.']],
            ],
        ];
    }

    public static function getAllLocations(): array
    {
        return array_merge(self::getCities(), self::getSuburbs());
    }

    public static function getBySlug(string $slug): ?array
    {
        foreach (self::getAllLocations() as $loc) {
            if ($loc['slug'] === $slug) {
                return $loc;
            }
        }
        return null;
    }
}
