/**
 * HOW WE CRAFT — the client's ten-step process (PDF §How we craft), the single
 * typed source for the /process page.
 *
 * `duration` values are INDICATIVE planning guides only. They are derived from
 * the client's own day-by-day execution blueprint (PDF §The 45-Day Execution
 * Blueprint) rather than invented, and the page labels them as indicative.
 */
export type ProcessStep = {
  n: string
  stage: string
  duration: string
  what: string
  clientRole: string
}

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    stage: 'Discover & Brief',
    duration: 'Days 1–5',
    what: 'We begin by listening — your lifestyle, taste, budget and aspirations shape everything that follows. This isn’t just about interiors; it’s about understanding who you are, so your space reflects your identity.',
    clientRole: 'High — your brief leads',
  },
  {
    n: '02',
    stage: 'Site Assessment & Feasibility',
    duration: 'Days 1–5',
    what: 'Our team visits your property to measure, assess and uncover opportunities most overlook. This ensures your vision is grounded in reality, with no surprises later.',
    clientRole: 'Site access; be present if you can',
  },
  {
    n: '03',
    stage: 'Concept & Mood Boards',
    duration: 'Days 6–10',
    what: 'We present curated palettes, material stories and spatial concepts. This is where your identity begins to take visual form — elegant, aspirational and unmistakably yours.',
    clientRole: 'Choose a direction',
  },
  {
    n: '04',
    stage: 'Design & 3D Visualisation',
    duration: 'Days 6–10',
    what: 'Immersive 3D walkthroughs bring your future space to life. You see every room before it’s built — precise, photoreal and aligned with your lifestyle.',
    clientRole: 'Approve or revise',
  },
  {
    n: '05',
    stage: 'Design Finalisation & Costing',
    duration: 'Day 10',
    what: 'Detailed drawings, material specs and transparent costing are locked in together. No hidden markups, no vague estimates — just clarity before commitment.',
    clientRole: 'Final sign-off',
  },
  {
    n: '06',
    stage: 'Procurement',
    duration: 'From day 11',
    what: 'Premium materials and trusted brands are sourced to match your approved design. Every item is tracked and quality-verified, ensuring durability and refinement.',
    clientRole: 'None needed',
  },
  {
    n: '07',
    stage: 'Craft & Build',
    duration: 'Days 11–42',
    what: 'Factory-engineered production meets meticulous on-site execution. With 100+ quality checks and one accountable team, your interiors are crafted for elegance and lasting performance.',
    clientRole: 'Weekly updates; factory visit welcome',
  },
  {
    n: '08',
    stage: 'Quality Inspection & Snagging',
    duration: 'Days 43–45',
    what: 'Before handover, we run a formal 100+ point inspection and a snagging walkthrough with you — ensuring perfection before you move in.',
    clientRole: 'Joint walkthrough',
  },
  {
    n: '09',
    stage: 'Styling & Final Finish',
    duration: 'Days 43–45',
    what: 'Curated furnishings, lighting accents and décor details complete the space. Your interiors feel finished and elevated from day one.',
    clientRole: 'Be present',
  },
  {
    n: '10',
    stage: 'Handover & Aftercare',
    duration: 'Day 45, then ongoing',
    what: 'Keys, documentation and your written warranty are delivered with confidence — followed by complimentary one-year post-service care. This isn’t just project completion; it’s the handover of a lifestyle.',
    clientRole: 'Call / WhatsApp anytime',
  },
]
