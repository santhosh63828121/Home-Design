/**
 * FAQ CONTENT (doc §7.3, Appendix B).
 * ----------------------------------------------------------------------------
 * Genuinely useful, honest answers — grouped by topic. The single source of
 * truth for the /faq page.
 *
 * HONESTY GATES:
 *  - No answer asserts an unconfirmed price, percentage or warranty period.
 *    Figure-dependent questions point to the pricing page (one source of truth)
 *    or are answered as indicative ranges, never as hard claims.
 *  - `FAQ_SCHEMA_ENABLED` controls FAQPage rich-result schema. It stays FALSE
 *    until the figures referenced inside these answers are confirmed (§2.1/§2.3),
 *    because emitting FAQPage markup with provisional numbers risks a structured-
 *    data penalty and misrepresents the business. Flip it to true only after
 *    sign-off. Answers that quote pricing/warranty are tagged `gated: true` so a
 *    future partial-schema build can include only the safe (evergreen) ones.
 */

export type FaqItem = { q: string; a: string; gated?: boolean }
export type FaqGroup = { id: string; title: string; items: FaqItem[] }

/** Flip true only after every figure referenced below is client-confirmed (§2.1). */
export const FAQ_SCHEMA_ENABLED = false

export const faqGroups: FaqGroup[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      {
        q: 'How do I start a project with RGL Decors?',
        a: 'Start with a free consultation — call or WhatsApp us, or request a free quote on the website. We discuss your space, needs and budget, then arrange a site visit to take real measurements before any design work begins.',
      },
      {
        q: 'Is the first consultation really free?',
        a: 'Yes. The initial consultation, site discussion and design concept are free and come with no obligation to proceed. You only commit once you are happy with the design and the detailed quote.',
      },
      {
        q: 'Do you handle both design and execution?',
        a: 'Yes — we are a design-and-build studio, so the same team that designs your home also manufactures and installs it. That removes the gap between the person who drew it and the team who builds it, which is where most interior projects go wrong.',
      },
      {
        q: 'Can you work with my existing furniture and layout?',
        a: 'Absolutely. Many clients keep pieces they love. During the site visit we note what you want to retain and design around it, so the new and existing work as one cohesive scheme.',
      },
      {
        q: 'I only need one room done — is that okay?',
        a: 'Yes. We take on single rooms — a kitchen, a wardrobe, a living room — as well as full-home interiors. The process is the same, just scaled to your scope.',
      },
      {
        q: 'What information should I have ready for the first meeting?',
        a: 'A rough budget range, who lives in the home and how you use each room, anything that is not working today, and a few reference images of looks you like. That short brief lets us design to your needs from day one.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & payments',
    items: [
      {
        q: 'How much does interior design cost in Chennai?',
        a: 'It depends on the size of the home, the scope of work and the materials you choose. We publish indicative ranges and tier-by-tier pricing on our interior design cost page, and our online estimator gives a ballpark in a couple of minutes. Your firm number comes after a free site visit and a detailed, itemised quote.',
        gated: true,
      },
      {
        q: 'Why can’t you give a fixed price over the phone?',
        a: 'An honest price needs real measurements and your material choices. A number quoted blind is either padded to be safe or too low to be real. After a site visit we give you an itemised quote (a bill of quantities) so you can see exactly what each rupee buys.',
      },
      {
        q: 'What is included in your quote?',
        a: 'Our quotes are itemised line by line — each unit, finish and major work item is listed with its specification, so there are no vague lump sums. You can see where the money goes and adjust scope or finish before committing.',
      },
      {
        q: 'Do you offer different budget levels?',
        a: 'Yes. Our pricing is structured into tiers so you can choose the level of finish and materials that fits your budget, from a smart essential build up to a fully bespoke signature one. The tiers and what each includes are on our pricing page.',
        gated: true,
      },
      {
        q: 'How are payments staged?',
        a: 'Payments are tied to project milestones rather than taken all at once — typically a booking amount to start design and production, with further instalments as work reaches agreed stages, and a balance near completion. The exact schedule is set out in your agreement before you commit.',
        gated: true,
      },
      {
        q: 'Will the final bill match the quote?',
        a: 'It matches the agreed scope. The quote is fixed for what is specified; the only changes are ones you request — adding work, upgrading a finish — and those are quoted and approved before they happen, so there are no surprises.',
      },
      {
        q: 'Do you offer EMI or finance options?',
        a: 'Where finance options are available we’ll explain them transparently during your quote discussion, including any terms involved. Please ask us directly so we can give you accurate, current information.',
        gated: true,
      },
    ],
  },
  {
    id: 'design',
    title: 'Design & 3D',
    items: [
      {
        q: 'Will I see my home before it’s built?',
        a: 'Yes — we produce a 3D visualisation of your space so you can see the layout, colours and finishes before anything is manufactured. Changes on screen are free, so this is where we get it exactly right.',
      },
      {
        q: 'How many design revisions do I get?',
        a: 'We refine the design with you until you are confident in it. The 3D stage exists precisely so you can try options and adjust — we’d far rather change a wall on screen than after it’s built.',
      },
      {
        q: 'Can you match a specific look or reference image I have?',
        a: 'Yes. Reference images are one of the most useful things you can share. We translate the look you love into a design that fits your actual space, budget and how you live.',
      },
      {
        q: 'What if I don’t know my style?',
        a: 'That’s normal. Our 2-minute design-style quiz helps you discover whether you lean modern, contemporary or traditional, and our designers guide you from there. You don’t need design vocabulary — that’s our job.',
      },
      {
        q: 'Do you provide a 3D walkthrough, not just images?',
        a: 'Yes, we offer immersive 3D walkthroughs for projects where it helps you experience the space, in addition to still visualisations. We’ll show you the most useful format for your project.',
      },
    ],
  },
  {
    id: 'materials',
    title: 'Materials & quality',
    items: [
      {
        q: 'What materials do you use?',
        a: 'We use quality, brand-name boards, laminates, hardware and fittings appropriate to the tier you choose, and we’re transparent about exactly what goes into your home. The specification is listed in your quote, so you know what you’re paying for.',
      },
      {
        q: 'Which finish is best — laminate, acrylic or veneer?',
        a: 'None is “best” in the abstract — they suit different priorities. Laminate is the hard-wearing, cost-effective all-rounder; acrylic gives a premium high-gloss look; veneer brings natural wood warmth. Our blog compares laminate and acrylic in detail to help you choose.',
      },
      {
        q: 'How do you handle Chennai’s humidity?',
        a: 'Humidity is the real test of joinery here, so for areas exposed to moisture we recommend moisture-resistant boards (such as BWR/BWP-grade plywood) and appropriate hardware. Spending on the core material is invisible but it’s exactly where a kitchen or wardrobe lasts or fails over the years.',
      },
      {
        q: 'Do you use branded hardware and fittings?',
        a: 'Yes. Hinges, channels, handles and mechanisms are where daily smoothness and longevity are decided, so we use reputable brands suited to your tier and list them in your quote.',
      },
      {
        q: 'Can I upgrade specific materials and not others?',
        a: 'Yes. A common, smart approach is to invest where it shows or works hardest — say a premium finish on feature units and a durable laminate elsewhere. Because our quotes are itemised, you can mix tiers line by line.',
      },
    ],
  },
  {
    id: 'timelines',
    title: 'Timelines & execution',
    items: [
      {
        q: 'How long will my project take?',
        a: 'It depends on scope. A single room is faster than a full home, and running some work in parallel shortens the calendar. We share indicative timelines on our pricing page so you can plan around realistic dates, and your agreement states the schedule for your specific project.',
        gated: true,
      },
      {
        q: 'Can I live in the home while work is happening?',
        a: 'For smaller or phased work, often yes; for a full-home fit-out it’s usually smoother (and faster) with the home vacant. We’ll advise honestly based on your scope so you can plan accordingly.',
      },
      {
        q: 'Who manages the work on site?',
        a: 'We coordinate the trades and the sequence so the right work happens at the right time. Because design and execution are under one roof, there’s a single point of accountability rather than you chasing separate contractors.',
      },
      {
        q: 'What happens if something is delayed?',
        a: 'We keep you informed rather than leaving you guessing. If a genuine delay arises — a material lead time, for instance — we tell you early and adjust the plan. Clear communication is part of how we run a project.',
      },
      {
        q: 'How do you ensure quality before handover?',
        a: 'Before you move in we walk through with a snag list and fix anything that isn’t right — a finish to touch up, a drawer to adjust — before final handover. We’d rather catch it than have you find it later.',
      },
    ],
  },
  {
    id: 'after-sales',
    title: 'Warranty & after-sales',
    items: [
      {
        q: 'Do you provide a warranty?',
        a: 'Yes, our work is covered by a warranty. The exact coverage and period are confirmed in writing in your agreement — please ask us for the current terms so we give you accurate, up-to-date information rather than a number that might change.',
        gated: true,
      },
      {
        q: 'What does the warranty cover?',
        a: 'Warranties typically cover workmanship and certain materials and fittings, with the precise scope set out in your agreement. We’ll walk you through exactly what is and isn’t covered before you commit.',
        gated: true,
      },
      {
        q: 'What if I have an issue after handover?',
        a: 'Reach out and we’ll help. After-sales support is part of the relationship — we want your home to keep working well long after the project ends, not just on handover day.',
      },
      {
        q: 'Do you help with maintenance or care advice?',
        a: 'Yes. At handover we explain how to care for your finishes and fittings so they stay looking and working their best, and we’re available if you have questions later.',
      },
    ],
  },
  {
    id: 'service-area',
    title: 'Service area',
    items: [
      {
        q: 'Which areas do you serve?',
        a: 'We’re based in Chennai and serve homes across the city and its suburbs, with project experience extending to other parts of Tamil Nadu. Our locations pages list the areas we cover.',
      },
      {
        q: 'Do you take projects outside Chennai?',
        a: 'We do take suitable projects across Tamil Nadu. The best way to confirm is to get in touch with your location and scope, and we’ll tell you honestly whether we can serve you well.',
      },
      {
        q: 'Do you design commercial spaces too, or only homes?',
        a: 'Both. Alongside residential interiors we design and execute commercial spaces such as offices and retail. Share your requirement and we’ll tell you how we can help.',
      },
    ],
  },
]

/** Flat list (for counts and a future schema build). */
export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items)
export const faqCount = allFaqs.length
