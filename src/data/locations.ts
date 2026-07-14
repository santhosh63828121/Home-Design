/**
 * CANONICAL LOCATIONS MODEL — single typed source for the 8 city pages.
 * ----------------------------------------------------------------------------
 * The /interior-designers hub, the 8 city pages, the sitemap and the city
 * schema all read from here.
 *
 * ANTI-DUPLICATE-CONTENT: each city has GENUINELY UNIQUE copy — real local
 * context (areas served, housing mix), a distinct intro and a city-specific FAQ
 * set — not one template with the name swapped in. `geo` is the city's real
 * coordinates, used as a SERVICE-AREA centre (not a fabricated storefront — RGL
 * has one Chennai base; see cityCoverageSchema).
 *
 * `projectKey` matches an (optional) Project.city in portfolio.ts so a city's
 * own case studies surface automatically once they're tagged.
 */

export type CityFaq = { q: string; a: string }
export type City = {
  slug: string // route slug: "interior-designers-<city>"
  projectKey: string // short key to match Project.city
  name: string
  geo: { lat: number; lng: number }
  tagline: string
  metaDescription: string
  intro: string
  housing: string
  areas: string[] // real localities we cover in/around the city
  nearby?: string // nearby towns/districts also covered
  faqs: CityFaq[]
}

export const cities: City[] = [
  {
    slug: 'interior-designers-chennai',
    projectKey: 'chennai',
    name: 'Chennai',
    geo: { lat: 13.0827, lng: 80.2707 },
    tagline: 'Our home base — the largest market we serve.',
    metaDescription:
      'Interior designers in Chennai — RGL Decors for modular kitchens, wardrobes and full-home interiors across OMR, ECR, Velachery, Anna Nagar and more. Free 3D design, 10-yr warranty.',
    intro:
      'Chennai is our home turf and our largest market. From high-rise apartments along the OMR and ECR IT corridors to independent houses in the older neighbourhoods, we design and factory-build interiors to fit every kind of Chennai home — and install with minimal disruption to your move-in plans.',
    housing:
      'Chennai homes split between apartment living (heavy along OMR, ECR and the southern suburbs) and independent houses in established areas — so our work ranges from compact 2BHK fit-outs to full villa interiors.',
    areas: ['Velachery', 'OMR / Sholinganallur', 'ECR', 'Adyar', 'Anna Nagar', 'T. Nagar', 'Porur', 'Tambaram', 'Perambur'],
    nearby: 'We also cover the greater Chennai belt including Pallavaram, Chromepet, Madhavaram and Avadi.',
    faqs: [
      {
        q: 'Do you handle apartment interiors on OMR and ECR?',
        a: 'Yes — a large share of our Chennai projects are apartments along the OMR and ECR corridors. Because units are factory-built, installation in high-rise flats is fast and clean, and we coordinate with your builder or society on access and timings.',
      },
      {
        q: 'Can you work within gated-community and society rules?',
        a: 'We regularly work inside gated communities and handle society formalities — work-hour windows, service-lift booking, debris removal and deposits — so your interiors get done without friction with the association.',
      },
      {
        q: 'How quickly can you deliver interiors in Chennai?',
        a: 'Timelines depend on scope, but factory-built modules keep site time short. Being local, our site visits, measurements and installation are quick to schedule across the city.',
      },
    ],
  },
  {
    slug: 'interior-designers-coimbatore',
    projectKey: 'coimbatore',
    name: 'Coimbatore',
    geo: { lat: 11.0168, lng: 76.9558 },
    tagline: 'Independent-house interiors in the textile city.',
    metaDescription:
      'Interior designers in Coimbatore — RGL Decors for independent houses, villas and IT-corridor apartments. Modular kitchens, wardrobes and full-home interiors with free 3D design.',
    intro:
      'Coimbatore homes lean towards independent houses and villas, with apartment living growing fast around the Saravanampatti IT corridor. We bring factory-grade modular kitchens, wardrobes and full-home interiors to the city, with finishes chosen for larger, light-filled Kovai homes.',
    housing:
      'Unlike apartment-dense Chennai, Coimbatore is largely independent houses and villas — so projects here often involve more square footage, dedicated pooja and utility spaces, and bespoke storage.',
    areas: ['RS Puram', 'Saibaba Colony', 'Peelamedu', 'Race Course', 'Vadavalli', 'Saravanampatti', 'Singanallur', 'Ganapathy'],
    nearby: 'We also serve the surrounding belt including Pollachi, Mettupalayam and Tiruppur on request.',
    faqs: [
      {
        q: 'Do you design interiors for independent houses and villas in Coimbatore?',
        a: 'Yes — most of our Coimbatore work is for independent houses and villas. We plan full-home interiors including modular kitchens, wardrobes, living and pooja spaces, scaled for the larger floor plans common in the city.',
      },
      {
        q: 'Do you cover apartments near the Saravanampatti IT corridor?',
        a: 'We do. The Saravanampatti and Peelamedu belt has growing apartment demand from IT professionals, and we deliver quick, factory-built fit-outs for these flats.',
      },
      {
        q: 'You are based in Chennai — how do you deliver in Coimbatore?',
        a: 'Our units are precision-built in our automated factory and shipped for local installation, so Coimbatore clients get the same factory quality with on-site project coordination.',
      },
    ],
  },
  {
    slug: 'interior-designers-salem',
    projectKey: 'salem',
    name: 'Salem',
    geo: { lat: 11.6643, lng: 78.146 },
    tagline: 'Practical, durable interiors for Salem homes.',
    metaDescription:
      'Interior designers in Salem — RGL Decors for independent-house interiors, modular kitchens and wardrobes. Durable factory-built finishes, free 3D design and a written warranty.',
    intro:
      'Salem is predominantly an independent-house city, and homeowners here value durable, practical interiors that hold up for years. We bring factory-built modular kitchens, wardrobes and full-home interiors to Salem, with a focus on hard-wearing finishes and smart storage.',
    housing:
      'Salem homes are mostly independent houses, often multi-generational — so kitchens, wardrobes and storage are planned for everyday durability and capacity rather than compact apartment living.',
    areas: ['Fairlands', 'Hasthampatti', 'Five Roads', 'Alagapuram', 'Suramangalam', 'Kondalampatti'],
    nearby: 'We also cover nearby towns including Attur and Mettur on request.',
    faqs: [
      {
        q: 'Do you build interiors for independent homes in Salem?',
        a: 'Yes — almost all Salem projects are independent houses. We design full-home interiors with durable, factory-built modular kitchens, wardrobes and storage suited to busy family homes.',
      },
      {
        q: 'What makes factory-built interiors a good fit for Salem?',
        a: 'Factory manufacturing means consistent quality and hard-wearing, bubble-free panels — a practical advantage for Salem homeowners who want interiors that last without local-carpentry variability.',
      },
      {
        q: 'How do site visits work for Salem clients?',
        a: 'We schedule measurement and design visits, share a free 3D walkthrough for sign-off, then deliver and install your factory-built units within the agreed timeline.',
      },
    ],
  },
  {
    slug: 'interior-designers-hosur',
    projectKey: 'hosur',
    name: 'Hosur',
    geo: { lat: 12.7409, lng: 77.8253 },
    tagline: 'Fast interiors for the industrial belt near Bangalore.',
    metaDescription:
      'Interior designers in Hosur — RGL Decors for apartments and homes in the SIPCOT industrial belt. Quick factory-built modular kitchens, wardrobes and full-home interiors with free 3D design.',
    intro:
      'Hosur sits on the Tamil Nadu–Karnataka border and is driven by its SIPCOT industrial belt, with steady apartment demand from a working professional population. We deliver quick, factory-built interiors for Hosur flats and homes, designed for fast handover so you can move in without delay.',
    housing:
      'Hosur has a growing share of apartments built for its industrial and IT workforce, alongside independent homes — so demand here skews towards efficient, move-in-ready 2BHK and 3BHK fit-outs.',
    areas: ['Bagalur Road', 'SIPCOT', 'Mathigiri', 'Shoolagiri', 'Hosur Town', 'Zuzuvadi'],
    nearby: 'Being on the border, we also serve professionals commuting from the nearby Karnataka fringe.',
    faqs: [
      {
        q: 'Do you furnish apartments for working professionals in Hosur?',
        a: 'Yes — much of Hosur’s housing serves its SIPCOT and industrial workforce. We specialise in quick, factory-built 2BHK and 3BHK fit-outs that are ready for a fast move-in.',
      },
      {
        q: 'Hosur is close to Bangalore — do you serve the border areas?',
        a: 'We cover Hosur and the surrounding belt, including professionals living on the Karnataka fringe who work in and around the Hosur industrial corridor.',
      },
      {
        q: 'How fast can you complete a Hosur apartment interior?',
        a: 'Factory-built units keep installation short — the heavy work is done off-site, so on-site time in a Hosur flat is minimal. Your timeline is confirmed with your quote.',
      },
    ],
  },
  {
    slug: 'interior-designers-krishnagiri',
    projectKey: 'krishnagiri',
    name: 'Krishnagiri',
    geo: { lat: 12.5186, lng: 78.2137 },
    tagline: 'Full-home interiors along the NH-44 belt.',
    metaDescription:
      'Interior designers in Krishnagiri — RGL Decors for independent-house interiors, modular kitchens and wardrobes along the NH-44 belt. Factory-built quality with free 3D design.',
    intro:
      'Krishnagiri, the mango-belt district headquarters on the NH-44 highway, is largely a town of independent houses. We bring factory-built interiors to Krishnagiri homeowners who would otherwise rely on local carpentry — delivering consistent, warranty-backed modular kitchens, wardrobes and full-home interiors.',
    housing:
      'Krishnagiri is dominated by independent houses, so projects here are typically full-home with generous kitchens and storage rather than compact apartment fit-outs.',
    areas: ['Krishnagiri Town', 'Rayakottai Road', 'Bargur', 'Hosur Road belt'],
    nearby: 'We also serve the wider district including towns along the NH-44 corridor between Hosur and Dharmapuri.',
    faqs: [
      {
        q: 'Do you serve independent homes in Krishnagiri town and the district?',
        a: 'Yes — we cover Krishnagiri town and the surrounding district, bringing factory-built modular interiors to homeowners across the NH-44 belt.',
      },
      {
        q: 'Why choose factory-built interiors over a local carpenter in Krishnagiri?',
        a: 'Factory manufacturing gives you precise, bubble-free panels, soft-close branded hardware and a written warranty — a level of consistency and finish that on-site carpentry in smaller towns often cannot match.',
      },
      {
        q: 'Do I need to travel to a showroom?',
        a: 'No — we come to you for measurements, share a free 3D walkthrough remotely for approval, then deliver and install. Distance from the metro does not change the process.',
      },
    ],
  },
  {
    slug: 'interior-designers-dharmapuri',
    projectKey: 'dharmapuri',
    name: 'Dharmapuri',
    geo: { lat: 12.1277, lng: 78.1582 },
    tagline: 'Warranty-backed interiors for Dharmapuri homes.',
    metaDescription:
      'Interior designers in Dharmapuri — RGL Decors for independent-house interiors, modular kitchens and wardrobes. Factory-built, warranty-backed finishes with a free 3D design.',
    intro:
      'Dharmapuri is an agricultural district headquarters where homes are almost entirely independent houses. We make factory-grade interiors accessible to Dharmapuri families — modular kitchens, wardrobes and full-home interiors with warranty-backed finishes that are hard to source locally.',
    housing:
      'Homes in Dharmapuri are predominantly independent houses, frequently multi-generational, so storage capacity, a proper pooja space and a durable kitchen tend to drive the brief.',
    areas: ['Dharmapuri Town', 'Pennagaram Road', 'Palacode belt', 'Harur'],
    nearby: 'We also cover district towns along the route between Dharmapuri and Krishnagiri.',
    faqs: [
      {
        q: 'Do you deliver interiors to Dharmapuri and its district towns?',
        a: 'Yes — we serve Dharmapuri town and surrounding areas, bringing factory-built modular interiors to a region where consistent, warranty-backed finishes are otherwise hard to find.',
      },
      {
        q: 'What does a typical Dharmapuri project include?',
        a: 'Most are full-home projects for independent houses — a modular kitchen, wardrobes, storage and a dedicated pooja unit, all designed around how the family uses the home.',
      },
      {
        q: 'Is the 3D design and quote free for Dharmapuri clients?',
        a: 'Yes — the HD 3D walkthrough and an itemised quote are free, with no obligation, wherever you are in the district.',
      },
    ],
  },
  {
    slug: 'interior-designers-kanchipuram',
    projectKey: 'kanchipuram',
    name: 'Kanchipuram',
    geo: { lat: 12.8342, lng: 79.7036 },
    tagline: 'Where tradition meets modern interiors.',
    metaDescription:
      'Interior designers in Kanchipuram — RGL Decors blending traditional and modern home interiors. Modular kitchens, wardrobes, pooja units and full-home interiors with free 3D design.',
    intro:
      'Kanchipuram, the historic temple and silk-weaving city, is home to both heritage independent houses and a new wave of apartments driven by its proximity to the Sriperumbudur industrial corridor. Our Kanchipuram interiors are about blending tradition with modern living — clean modular convenience alongside thoughtfully designed pooja spaces.',
    housing:
      'Kanchipuram mixes traditional independent homes with newer apartments near the industrial belt, so briefs here often pair a modern modular kitchen with a prominent, well-crafted pooja unit.',
    areas: ['Kanchipuram Town', 'Little Kanchipuram', 'Sriperumbudur belt', 'Walajabad Road'],
    nearby: 'We also serve the Sriperumbudur–Oragadam industrial corridor nearby.',
    faqs: [
      {
        q: 'Can you blend a traditional look with modern modular interiors?',
        a: 'Yes — this is a common Kanchipuram brief. We pair modern, factory-built modular kitchens and wardrobes with a well-crafted pooja unit and traditional accents, so the home feels both contemporary and rooted.',
      },
      {
        q: 'Do you design a dedicated pooja room or unit?',
        a: 'Absolutely. A prominent, well-designed pooja space is central to many Kanchipuram homes, and we plan it carefully alongside the rest of the interior.',
      },
      {
        q: 'Do you cover new apartments near Sriperumbudur?',
        a: 'Yes — the Sriperumbudur and Oragadam industrial corridor near Kanchipuram has growing apartment demand, and we deliver quick factory-built fit-outs there.',
      },
    ],
  },
  {
    slug: 'interior-designers-chengalpattu',
    projectKey: 'chengalpattu',
    name: 'Chengalpattu',
    geo: { lat: 12.6921, lng: 79.976 },
    tagline: 'New-home interiors on Chennai’s southern growth corridor.',
    metaDescription:
      'Interior designers in Chengalpattu — RGL Decors for new apartment and villa interiors along the GST Road / NH-45 corridor. Modular kitchens, wardrobes, full-home interiors, free 3D design.',
    intro:
      'Chengalpattu is one of the fastest-growing pockets on Chennai’s southern fringe, powered by the GST Road (NH-45) corridor, Mahindra World City and Maraimalai Nagar. With new apartment and villa projects handing over here, we specialise in fresh-home interiors — taking a bare new flat to a fully finished, move-in-ready home.',
    housing:
      'Chengalpattu is seeing a surge of new apartments and gated villa projects along GST Road, so a lot of our work here is first-time fit-outs for newly handed-over homes.',
    areas: ['Chengalpattu Town', 'GST Road / NH-45', 'Maraimalai Nagar', 'Singaperumal Koil', 'Mahindra World City belt', 'Guduvanchery'],
    nearby: 'We also cover the adjoining OMR-south and Vandalur–Kelambakkam stretch.',
    faqs: [
      {
        q: 'Do you take on newly handed-over apartments along GST Road?',
        a: 'Yes — first-time fit-outs for new flats and villas along the GST Road (NH-45) corridor are a big part of our Chengalpattu work. We take a bare, just-handed-over home to fully finished and move-in-ready.',
      },
      {
        q: 'Do you serve the Mahindra World City and Maraimalai Nagar belt?',
        a: 'We do — the Maraimalai Nagar, Singaperumal Koil and Mahindra World City belt has strong demand from professionals settling into new homes, and we cover it fully.',
      },
      {
        q: 'How does Chengalpattu’s proximity to Chennai help my project?',
        a: 'Chengalpattu is well-connected to our Chennai base along GST Road, so site visits, delivery and installation are quick and easy to coordinate.',
      },
    ],
  },
]

/**
 * CHENNAI SUBURBS (doc §7.2) — neighbourhood-level local SEO. Same engine and
 * service-area schema as the cities; each carries genuinely distinct copy built
 * from the real character of the area (housing mix, localities, area-specific
 * FAQs). Avadi is RGL's home base.
 */
export const suburbs: City[] = [
  {
    slug: 'interior-designers-avadi',
    projectKey: 'avadi',
    name: 'Avadi',
    geo: { lat: 13.1147, lng: 80.0982 },
    tagline: 'Our home ground in north-west Chennai.',
    metaDescription:
      'Interior designers in Avadi, Chennai — RGL Decors, based here. Modular kitchens, wardrobes and full-home interiors for independent houses and new apartments. Free 3D design.',
    intro:
      'Avadi is our home ground. As a fast-growing township in north-west Chennai — anchored by its defence and railway establishments — Avadi has a healthy mix of long-held independent houses and a wave of new apartments, and being based here means quick site visits, measurements and installs with almost no travel overhead on your project.',
    housing:
      'Independent houses and plots sit alongside newer mid-segment apartments. Many Avadi projects are full-home builds for first homes or generational family houses, where smart storage and durable, value-honest finishes matter most.',
    areas: ['Avadi', 'Thirumullaivoyal', 'Pattabiram', 'Paruthipattu', 'Ambattur', 'Sevvapet'],
    nearby: 'We also cover the wider north-west belt — Thiruninravur, Pattabiram and the Poonamallee side.',
    faqs: [
      {
        q: 'Is RGL Decors actually based in Avadi?',
        a: 'Yes — Avadi is our home base, so for projects here you get the fastest possible site visits, measurements and installation scheduling, with our team minutes away.',
      },
      {
        q: 'Do you design interiors for independent houses in Avadi?',
        a: 'Absolutely. A large share of Avadi homes are independent houses, and we design and factory-build complete interiors for them — from modular kitchens and wardrobes to false ceilings, painting and full turnkey fit-outs.',
      },
    ],
  },
  {
    slug: 'interior-designers-anna-nagar',
    projectKey: 'anna-nagar',
    name: 'Anna Nagar',
    geo: { lat: 13.085, lng: 80.2101 },
    tagline: 'Premium interiors for one of Chennai’s most planned neighbourhoods.',
    metaDescription:
      'Interior designers in Anna Nagar, Chennai — RGL Decors for premium apartments and independent bungalows. Modular kitchens, wardrobes and turnkey interiors with free 3D design.',
    intro:
      'Anna Nagar is one of Chennai’s most established and planned neighbourhoods, and its homeowners expect interiors to match — refined, durable and beautifully detailed. From premium apartments around the Tower Park to independent bungalows on the leafy avenues, we deliver design-led interiors with the finish and accountability this address calls for.',
    housing:
      'A mix of upscale apartments and older independent bungalows. Many Anna Nagar projects are premium full-home interiors or thoughtful renovations of established homes, where material quality and craftsmanship lead the brief.',
    areas: ['Anna Nagar West', 'Shanthi Colony', 'Thirumangalam', 'Anna Nagar East', 'Blue Star Colony'],
    nearby: 'We also cover the adjacent Mogappair, Aminjikarai and Kilpauk neighbourhoods.',
    faqs: [
      {
        q: 'Do you handle premium and bespoke interiors in Anna Nagar?',
        a: 'Yes — Anna Nagar homeowners typically want premium finishes and bespoke detailing, and our Luxury and Signature tiers cover imported finishes, designer hardware and full design direction.',
      },
      {
        q: 'Can you renovate an older Anna Nagar bungalow?',
        a: 'We do. Many Anna Nagar homes are well-built older bungalows, and we handle full renovations — reworking layouts, modular systems, ceilings and finishes while respecting the home’s character.',
      },
    ],
  },
  {
    slug: 'interior-designers-porur',
    projectKey: 'porur',
    name: 'Porur',
    geo: { lat: 13.0382, lng: 80.1565 },
    tagline: 'Interiors for Porur’s fast-growing IT-corridor homes.',
    metaDescription:
      'Interior designers in Porur, Chennai — RGL Decors for gated-community apartments and new homes near the IT corridor. Modular kitchens, wardrobes and turnkey interiors, free 3D design.',
    intro:
      'Porur has transformed into one of west Chennai’s busiest residential and IT hubs, with gated communities and new apartments filling up fast around the Mount-Poonamallee Road belt. We design and factory-build interiors that suit working families settling into these homes — efficient, low-maintenance and ready to move into on a predictable timeline.',
    housing:
      'Largely new apartments and gated-community flats, with some independent houses. Porur projects are often time-sensitive move-in fit-outs for IT professionals, where a guaranteed timeline and a complete, hands-off turnkey scope matter.',
    areas: ['Porur', 'Iyyappanthangal', 'Mugalivakkam', 'Ramapuram', 'Kundrathur'],
    nearby: 'We also serve Vadapalani, Valasaravakkam and the Poonamallee stretch.',
    faqs: [
      {
        q: 'Can you finish a Porur apartment before my move-in date?',
        a: 'Yes — because units are factory-built, most apartment interiors install within our planned timeline. Share your move-in date at the consultation and we’ll plan the schedule around it.',
      },
      {
        q: 'Do you work in Porur gated communities?',
        a: 'Regularly. We follow each community’s working hours and access rules, coordinate with the facility team, and keep the site clean throughout — common in Porur’s gated developments.',
      },
    ],
  },
  {
    slug: 'interior-designers-velachery',
    projectKey: 'velachery',
    name: 'Velachery',
    geo: { lat: 12.9791, lng: 80.2204 },
    tagline: 'Smart interiors for Velachery’s compact, well-connected homes.',
    metaDescription:
      'Interior designers in Velachery, Chennai — RGL Decors for mid-segment apartments and compact homes near the IT belt. Space-smart modular kitchens, wardrobes and interiors. Free 3D design.',
    intro:
      'Velachery is one of south Chennai’s most connected and densely-built residential pockets, popular with families and professionals for its proximity to the Taramani–OMR IT belt. Homes here are often compact, so our work is all about making every inch count — clever storage, space-expanding layouts and finishes that keep a smaller home feeling open.',
    housing:
      'Predominantly mid-segment apartments, many of them compact 2 and 3BHKs. Velachery briefs lean toward space-maximising modular kitchens, tall wardrobes and multi-use units that earn their footprint.',
    areas: ['Velachery', 'Pallikaranai', 'Madipakkam', 'Taramani', 'Guindy'],
    nearby: 'We also cover Adambakkam, Keelkattalai and the Medavakkam side.',
    faqs: [
      {
        q: 'How do you make a small Velachery apartment feel bigger?',
        a: 'With layout-first design — floor-to-ceiling storage, handleless modular units, lighter finishes and well-planned lighting. You see it all in your 3D walkthrough before anything is built.',
      },
      {
        q: 'Do you design compact 2BHK interiors in Velachery?',
        a: 'Yes — compact 2 and 3BHKs are the most common Velachery brief. We specialise in storage-smart, move-in-ready interiors that fit the space and the budget.',
      },
    ],
  },
  {
    slug: 'interior-designers-omr',
    projectKey: 'omr',
    name: 'OMR',
    geo: { lat: 12.9009, lng: 80.2279 },
    tagline: 'Interiors for the OMR IT corridor’s high-rise homes.',
    metaDescription:
      'Interior designers on OMR, Chennai — RGL Decors for gated high-rise apartments along the IT corridor. NRI-friendly, factory-built modular interiors with free 3D design and remote tracking.',
    intro:
      'The OMR IT corridor — from Perungudi down to Sholinganallur, Navalur and Siruseri — is Chennai’s fastest-growing premium residential belt, full of gated high-rises bought by young professionals and NRI investors. We design and factory-build interiors for these homes with the precision and remote-friendly process this audience expects, including weekly video updates for owners who can’t be on site.',
    housing:
      'High-rise gated-community apartments dominate, many bought as first premium homes or NRI investments. OMR briefs often combine a premium finish with a fully remote-managed, milestone-tracked delivery.',
    areas: ['Sholinganallur', 'Navalur', 'Siruseri', 'Perungudi', 'Thoraipakkam', 'Karapakkam'],
    nearby: 'We also serve the Padur, Kelambakkam and Semmancheri stretch further down OMR.',
    faqs: [
      {
        q: 'I’m an NRI buying on OMR — can you manage the project remotely?',
        a: 'Yes. We run NRI projects end-to-end remotely: 3D approvals online, milestone payments, weekly WhatsApp photo updates and a video handover. Many of our OMR clients are overseas throughout.',
      },
      {
        q: 'Do you work within OMR gated high-rises?',
        a: 'Routinely. We handle society approvals, follow building work-hour rules, protect common areas and coordinate service lifts — standard practice across OMR’s gated towers.',
      },
    ],
  },
  {
    slug: 'interior-designers-ecr',
    projectKey: 'ecr',
    name: 'ECR',
    geo: { lat: 12.9494, lng: 80.2585 },
    tagline: 'Coastal-grade interiors for ECR villas and beach homes.',
    metaDescription:
      'Interior designers on ECR, Chennai — RGL Decors for sea-facing villas, beach houses and second homes. Coastal-grade, humidity-resistant interiors with a free 3D design.',
    intro:
      'The East Coast Road is Chennai’s premium coastal belt — sea-facing villas, beach houses and weekend second homes from Neelankarai down to Kovalam. The brief here is as much about engineering as aesthetics: salt air and humidity are tough on interiors, so we specify marine-grade substrates, moisture-barrier backings and anti-corrosive hardware built to last by the sea.',
    housing:
      'Independent villas, beach houses and farmhouse-style second homes, often large and design-led. ECR projects prioritise coastal durability alongside a luxury finish — exactly what our CoastalShield material approach is built for.',
    areas: ['Neelankarai', 'Injambakkam', 'Akkarai', 'Uthandi', 'Kovalam', 'Muttukadu'],
    nearby: 'We also cover the Palavakkam, Thiruvanmiyur-end and the stretch toward Mahabalipuram.',
    faqs: [
      {
        q: 'How do you protect ECR interiors from sea humidity and salt air?',
        a: 'We use marine-grade BWP/Gurjan substrates, moisture-barrier backings and anti-corrosive hardware engineered for coastal conditions — so your interiors hold up to ECR’s salt air and humidity.',
      },
      {
        q: 'Do you design second homes and villas on ECR?',
        a: 'Yes — sea-facing villas and weekend homes are a core ECR brief. We handle full turnkey villa interiors, and remote-manage them for owners who live elsewhere in the city or abroad.',
      },
    ],
  },
  {
    slug: 'interior-designers-adyar',
    projectKey: 'adyar',
    name: 'Adyar',
    geo: { lat: 13.0064, lng: 80.2574 },
    tagline: 'Refined interiors for Adyar’s established homes.',
    metaDescription:
      'Interior designers in Adyar, Chennai — RGL Decors for premium apartments and established independent homes. Renovations, modular interiors and turnkey fit-outs with free 3D design.',
    intro:
      'Adyar is one of Chennai’s most desirable and established neighbourhoods — leafy, central and home to a discerning, design-aware crowd. Many homes here are older independent houses ripe for renovation alongside premium apartments, so our work spans careful remodels that respect a home’s character and crisp new fit-outs with a refined, understated finish.',
    housing:
      'Established independent houses and premium apartments. Adyar briefs frequently involve renovation and remodelling of older homes, where layout rework and quality craftsmanship matter as much as new modular systems.',
    areas: ['Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Kotturpuram', 'Gandhi Nagar'],
    nearby: 'We also cover the Sastri Nagar, Indira Nagar and RA Puram pockets.',
    faqs: [
      {
        q: 'Do you renovate older homes in Adyar?',
        a: 'Yes — a large share of Adyar work is renovation of established homes. We rework layouts, upgrade modular systems, ceilings and finishes, and manage civil work, all to a single standard.',
      },
      {
        q: 'Can you match an understated, design-led look for an Adyar home?',
        a: 'Absolutely. Our brand is sophisticated rather than showy — curated materials, clean detailing and a refined palette, which suits the understated luxury Adyar homeowners tend to prefer.',
      },
    ],
  },
  {
    slug: 'interior-designers-t-nagar',
    projectKey: 't-nagar',
    name: 'T. Nagar',
    geo: { lat: 13.0418, lng: 80.2341 },
    tagline: 'Space-smart interiors for T. Nagar’s central, compact homes.',
    metaDescription:
      'Interior designers in T. Nagar, Chennai — RGL Decors for compact central apartments and older homes. Space-saving modular interiors and renovations with free 3D design and clean installs.',
    intro:
      'T. Nagar is the dense, vibrant heart of central Chennai — as much a commercial landmark as a residential one. Homes here are often older and space-constrained, tucked above or between the bustle, so our work focuses on smart, space-saving interiors and tidy renovations that work within tight footprints and busy, access-restricted streets.',
    housing:
      'Older apartments and compact homes, many in need of renovation or redevelopment. T. Nagar briefs reward space-efficient modular design, vertical storage and finishes that lift a compact, central home.',
    areas: ['T. Nagar', 'Pondy Bazaar', 'West Mambalam', 'Mambalam', 'Nungambakkam'],
    nearby: 'We also cover Kodambakkam, Saidapet and the Ashok Nagar side.',
    faqs: [
      {
        q: 'Can you work around T. Nagar’s tight access and busy streets?',
        a: 'Yes — we plan deliveries and installs around access constraints and society hours, and because units arrive factory-finished, on-site time and disruption stay minimal even in congested T. Nagar.',
      },
      {
        q: 'Do you design compact and older T. Nagar homes?',
        a: 'That’s our common brief here — space-saving modular kitchens, tall wardrobes and clever storage, plus full renovations of older central homes.',
      },
    ],
  },
  {
    slug: 'interior-designers-chromepet',
    projectKey: 'chromepet',
    name: 'Chromepet',
    geo: { lat: 12.9516, lng: 80.1402 },
    tagline: 'Value-honest interiors for Chromepet’s suburban homes.',
    metaDescription:
      'Interior designers in Chromepet, Chennai — RGL Decors for independent houses and mid-segment apartments along the GST Road belt. Modular kitchens, wardrobes and turnkey interiors, free 3D design.',
    intro:
      'Chromepet anchors Chennai’s southern suburban belt along the GST Road, with a practical mix of independent houses and mid-segment apartments owned by settled families. Briefs here are value-conscious and durability-led, and our transparent, itemised pricing — with no hidden costs — is exactly what Chromepet homeowners tell us they were looking for.',
    housing:
      'Independent houses and mid-segment apartments. Chromepet projects are typically full-home interiors for family homes, where honest pricing, sensible material grades and lasting build quality lead the decision.',
    areas: ['Chromepet', 'Pallavaram', 'Hasthinapuram', 'Chitlapakkam', 'Selaiyur'],
    nearby: 'We also cover Pammal, Anakaputhur and the Tambaram side.',
    faqs: [
      {
        q: 'Is RGL affordable for a Chromepet family home?',
        a: 'Our pricing is fully itemised and starts from the Essential tier, so you choose the material grade that fits your budget — and the BOQ you approve is the price you pay, with no hidden extras.',
      },
      {
        q: 'Do you design independent houses in Chromepet?',
        a: 'Yes — independent family homes are a core Chromepet brief, and we handle complete interiors for them, from modular kitchens and wardrobes to ceilings, painting and full turnkey work.',
      },
    ],
  },
  {
    slug: 'interior-designers-mogappair',
    projectKey: 'mogappair',
    name: 'Mogappair',
    geo: { lat: 13.0878, lng: 80.1757 },
    tagline: 'Interiors for Mogappair’s planned residential homes.',
    metaDescription:
      'Interior designers in Mogappair, Chennai — RGL Decors for planned-layout apartments and independent homes near Anna Nagar. Modular kitchens, wardrobes and turnkey interiors, free 3D design.',
    intro:
      'Mogappair is a well-planned, family-friendly residential pocket in north-west Chennai, popular with middle and upper-middle households drawn to its orderly layout and proximity to Anna Nagar. Homes range from planned-development apartments to independent houses, and we deliver polished, well-detailed interiors with the dependable timeline and finish settled families here expect.',
    housing:
      'Planned-layout apartments and independent houses, generally mid-to-premium. Mogappair briefs favour a clean, contemporary finish with practical storage for growing families.',
    areas: ['Mogappair East', 'Mogappair West', 'Golden George Nagar', 'Nolambur', 'Ambattur'],
    nearby: 'We also cover Padi, Korattur and the Anna Nagar West extension.',
    faqs: [
      {
        q: 'Do you serve both apartments and independent houses in Mogappair?',
        a: 'Yes — Mogappair has both, and we design and factory-build complete interiors for either, from compact apartment fit-outs to full independent-home turnkey projects.',
      },
      {
        q: 'How close is your team to Mogappair?',
        a: 'Very — our Avadi base is a short drive away, so site visits, measurements and installation scheduling in Mogappair are quick and easy to coordinate.',
      },
    ],
  },
  {
    slug: 'interior-designers-tambaram',
    projectKey: 'tambaram',
    name: 'Tambaram',
    geo: { lat: 12.9229, lng: 80.1275 },
    tagline: 'Interiors for Tambaram’s fast-growing southern homes.',
    metaDescription:
      'Interior designers in Tambaram, Chennai — RGL Decors for new apartments and independent houses around the GST Road and railway belt. Modular kitchens, wardrobes and turnkey interiors, free 3D design.',
    intro:
      'Tambaram is one of south Chennai’s fastest-growing suburban hubs — a major railway and road junction with new apartments and independent houses spreading out along the GST Road and toward Mudichur and Perungalathur. We design and factory-build move-in-ready interiors for these new homes, with value-honest pricing and a timeline families can plan around.',
    housing:
      'A growing mix of new apartments and independent houses as the suburb expands. Tambaram briefs are commonly full-home fit-outs for new family homes, balancing budget, durability and a fresh, contemporary look.',
    areas: ['East Tambaram', 'West Tambaram', 'Selaiyur', 'Mudichur', 'Perungalathur', 'Chitlapakkam'],
    nearby: 'We also cover Medavakkam, Camp Road and the Vandalur stretch.',
    faqs: [
      {
        q: 'Do you cover the newer developments around Tambaram?',
        a: 'Yes — including the Mudichur, Perungalathur and Camp Road growth corridors, where a lot of new homes are coming up. We handle full interiors for new apartments and independent houses alike.',
      },
      {
        q: 'Can you keep a Tambaram project within a sensible budget?',
        a: 'Our itemised pricing starts at the Essential tier and scales to your choice, so you control the grade and the cost — and the approved BOQ is exactly what you pay.',
      },
    ],
  },
  {
    slug: 'interior-designers-nungambakkam',
    projectKey: 'nungambakkam',
    name: 'Nungambakkam',
    geo: { lat: 13.0596, lng: 80.2426 },
    tagline: 'High-end interiors for Nungambakkam’s premium central homes.',
    metaDescription:
      'Interior designers in Nungambakkam, Chennai — RGL Decors for premium central apartments and bungalows. Luxury modular interiors, renovations and turnkey fit-outs with free 3D design.',
    intro:
      'Nungambakkam is one of central Chennai’s most upmarket addresses — a blend of premium apartments, gracious older bungalows, boutiques and consulates around the Khader Nawaz Khan Road set. Homeowners here expect a high-end, design-led finish, and we deliver luxury interiors with curated materials, designer hardware and the discreet, white-glove process this neighbourhood calls for.',
    housing:
      'Premium apartments and established bungalows, skewing high-end. Nungambakkam briefs centre on luxury finishes, bespoke detailing and careful renovation of distinguished older homes.',
    areas: ['Nungambakkam', 'Sterling Road', 'College Road', 'Thousand Lights', 'Egmore'],
    nearby: 'We also cover Kilpauk, Chetpet and the Greams Road pocket.',
    faqs: [
      {
        q: 'Do you offer luxury and bespoke interiors in Nungambakkam?',
        a: 'Yes — our Luxury and Signature tiers cover imported finishes, designer hardware, full design direction and MD-level oversight, suited to Nungambakkam’s high-end homes.',
      },
      {
        q: 'Can you renovate a heritage-style bungalow in Nungambakkam?',
        a: 'We can. We handle sensitive renovations of older, characterful homes — reworking layouts and services while preserving the home’s architectural personality.',
      },
    ],
  },
]

/** Every location page (TN cities + Chennai suburbs) — drives hub, sitemap, schema. */
export const allLocations: City[] = [...cities, ...suburbs]

export const getCity = (slug: string) => allLocations.find((c) => c.slug === slug)
