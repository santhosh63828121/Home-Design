/**
 * CINEMATIC WALKTHROUGH CONFIG — TRUE 3D HOUSE
 * ============================================
 * One continuous virtual camera travels a path through a single connected
 * luxury home (Entrance → Living → Kitchen → Bedroom → Bathroom). Everything
 * here is data the CameraPath + HouseScene consume, so the whole tour can be
 * re-blocked without touching engine code.
 *
 * Coordinates are in metres. +x = right, -z = deeper into the house, y = up.
 * Eye height ≈ 1.6m. The floor plan (see HouseScene) is laid out to match these
 * waypoints so the camera always passes through real doorways.
 */

export const JOURNEY = {
  scrollLengthVh: 9, // pin length = viewport height × this (longer = slower walk)
  scrub: 1.1, // ScrollTrigger smoothing
  inertia: 0.06, // camera momentum (lower = heavier / more lag)
  perspectiveFov: 62, // camera field of view
}

/**
 * CAMERA PATH — paired position + look-at waypoints.
 * The camera interpolates position along one CatmullRom curve and its look
 * target along another, so turns happen naturally as the look target swings
 * ahead of the body (real-estate flythrough style).
 */
export const WAYPOINTS = [
  { pos: [0, 1.6, 7.5], look: [0, 1.5, 2] }, // outside, facing the front door
  { pos: [0, 1.6, 2.6], look: [0, 1.5, -3] }, // at the threshold, door opening
  { pos: [0, 1.6, -3], look: [0, 1.5, -8] }, // through the foyer
  { pos: [0, 1.6, -8.5], look: [0, 1.5, -13] }, // entering the living room
  { pos: [0, 1.6, -11.5], look: [4.5, 1.45, -12] }, // living centre, turning right →
  { pos: [4.2, 1.6, -12], look: [9, 1.45, -12] }, // through the doorway, facing kitchen
  { pos: [9, 1.6, -12], look: [10.3, 1.45, -17] }, // kitchen, turning left toward bedroom
  { pos: [10, 1.6, -16], look: [10, 1.5, -21] }, // through the doorway into the bedroom
  { pos: [10, 1.6, -20.5], look: [5, 1.45, -21] }, // bedroom, turning left toward bathroom
  { pos: [5, 1.6, -21], look: [0, 1.5, -21] }, // through the doorway into the bathroom
  { pos: [1.2, 1.6, -21], look: [-3, 1.5, -21.4] }, // settle inside the spa bathroom
]

/**
 * ROOM STATIONS — the side label + exposure for each space.
 * `range` is the scroll-progress window (0–1) during which the label is shown
 * and the camera adapts to that room's exposure.
 */
export const ROOMS = [
  {
    id: 'entrance',
    name: 'The Entrance',
    eyebrow: 'RGL DECORS · ONE-TAKE WALKTHROUGH',
    title: 'Welcome\nHome',
    body: 'Step through the front door and walk the whole home in a single, continuous take.',
    cta: { label: 'Explore The Home', target: '#story' },
    side: 'left',
    range: [0.0, 0.26],
    exposure: 1.05,
    hero: true,
  },
  {
    id: 'living',
    name: 'Living Room',
    eyebrow: 'SCENE 02 · LIVING ROOM',
    title: 'Living Room',
    body: 'Sculptural sofa, marble floors and light pouring through full-height glass.',
    cta: { label: 'View Interior Details', target: '#gallery' },
    side: 'right',
    range: [0.26, 0.48],
    exposure: 1.18,
  },
  {
    id: 'kitchen',
    name: 'Designer Kitchen',
    eyebrow: 'SCENE 03 · THE KITCHEN',
    title: 'Designer Kitchen',
    body: 'A honed-marble island, handleless cabinetry and warm pendant light.',
    cta: { label: 'Discover Materials', target: '#why' },
    side: 'left',
    range: [0.48, 0.64],
    exposure: 1.12,
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    eyebrow: 'SCENE 04 · MASTER SUITE',
    title: 'Master Bedroom',
    body: 'A private sanctuary wrapped in wood, layered textures and soft evening light.',
    cta: { label: 'Experience Comfort', target: '#story' },
    side: 'right',
    range: [0.64, 0.84],
    exposure: 0.92,
  },
  {
    id: 'bathroom',
    name: 'Spa Bathroom',
    eyebrow: 'SCENE 05 · SPA BATH',
    title: 'Spa Bathroom',
    body: 'Book-matched marble, a freestanding tub and calm, reflective light.',
    cta: { label: 'Book Consultation', target: '#contact' },
    side: 'left',
    range: [0.84, 1.0],
    exposure: 1.06,
  },
]

// The front door swings open across this scroll window (camera approaching).
export const DOOR_OPEN_RANGE = [0.04, 0.2]
