/**
 * THE 16-STEP PROCESS (doc §4.7) — single typed source for the /process page.
 * Durations are indicative planning guides; they reconcile with the timeline
 * tables in pricing.ts and any published delivery commitment (§2.3).
 */
export type ProcessStep = {
  n: string
  stage: string
  duration: string
  what: string
  clientRole: string
}

export const processSteps: ProcessStep[] = [
  { n: '01', stage: 'Discovery conversation', duration: '1–2 hrs', what: 'We listen to your vision, lifestyle, priorities and non-negotiables — the brief that drives everything.', clientRole: 'High — your brief leads' },
  { n: '02', stage: 'Site visit & measure', duration: 'Half day', what: 'Laser-accurate measurement, plus light, ventilation, structure and utilities checked on site.', clientRole: 'Be present or send a video' },
  { n: '03', stage: 'Space planning', duration: '3–5 days', what: 'Floor plans and traffic flow, with storage designed into the walls rather than added on.', clientRole: 'Approve the floor plan' },
  { n: '04', stage: 'Concept & mood board', duration: '3–5 days', what: 'Two to three design directions — palettes, materials and a clear design language.', clientRole: 'Select a direction' },
  { n: '05', stage: 'Material selection', duration: '1–2 sessions', what: 'Guided curation through our material library so every finish is chosen, not defaulted.', clientRole: 'Approvals required' },
  { n: '06', stage: '3D design walkthrough', duration: '7–10 days', what: 'Photorealistic renders and an HD walkthrough video — you see the home before it’s built.', clientRole: 'Approve or revise' },
  { n: '07', stage: 'BOQ preparation', duration: '3–5 days', what: 'A line-by-line itemised cost — every material, brand and quantity in writing.', clientRole: 'Review the pricing' },
  { n: '08', stage: 'Budget approval', duration: '1 session', what: 'We adjust grades and scope together until the budget is exactly right.', clientRole: 'Final sign-off' },
  { n: '09', stage: 'Agreement & payment plan', duration: '1 day', what: 'Sign the agreement, set the milestone schedule and lock the kickoff date.', clientRole: 'Sign + first milestone' },
  { n: '10', stage: 'Procurement', duration: '5–10 days', what: 'We source verified materials and quality-check every delivery on arrival.', clientRole: 'None needed' },
  { n: '11', stage: 'Factory manufacturing', duration: '12–20 days', what: 'Modular units are made in our automated factory under strict quality control.', clientRole: 'Factory visit welcome' },
  { n: '12', stage: 'Site preparation', duration: 'Overlapping', what: 'Civil, ceiling, electrical, plumbing and tiling run in parallel to compress the timeline.', clientRole: 'Weekly updates' },
  { n: '13', stage: 'Installation', duration: '7–14 days', what: 'Factory units installed to millimetre precision, with fittings and lighting.', clientRole: 'Site-visit milestone' },
  { n: '14', stage: 'Quality inspection', duration: '1–2 days', what: 'A multi-point QC pass — drawers, hinges, surfaces and finish, all checked.', clientRole: 'Joint inspection' },
  { n: '15', stage: 'Styling & handover', duration: '1 day', what: 'Décor, artwork and accessories styled in; photoshoot; then keys and manuals.', clientRole: 'Be present' },
  { n: '16', stage: 'After-sales support', duration: 'Ongoing', what: '12-month support, AMC available, and fast warranty response when you need it.', clientRole: 'Call / WhatsApp anytime' },
]
