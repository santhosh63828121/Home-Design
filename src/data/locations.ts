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
        a: 'Most Chennai homes are delivered within our guaranteed 45-day timeline. Being local, our site visits, measurements and installation are quick to schedule across the city.',
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
      'Interior designers in Salem — RGL Decors for independent-house interiors, modular kitchens and wardrobes. Durable factory-built finishes with free 3D design and 10-year warranty.',
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
        a: 'Factory-built units keep installation short — most Hosur flats are delivered within our 45-day timeline, with the heavy work done off-site so on-site time is minimal.',
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
        a: 'Factory manufacturing gives you precise, bubble-free panels, soft-close hardware and a 10-year warranty — a level of consistency and finish that on-site carpentry in smaller towns often cannot match.',
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

export const getCity = (slug: string) => cities.find((c) => c.slug === slug)
