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
  // --- Cinematic entrance: slow golden-hour approach → threshold → reveal ---
  { pos: [0, 1.62, 9.5], look: [0, 1.7, 3] }, // 0 far approach — read the facade
  { pos: [0, 1.6, 5.6], look: [0, 1.55, 1] }, // 1 nearing, interior light through the gaps
  { pos: [0, 1.6, 3.1], look: [0, 1.5, -1.5] }, // 2 the door is opening ahead
  { pos: [0, 1.58, 1.9], look: [0, 1.5, -3.5] }, // 3 AT the threshold (close to #2 → slows, anticipation)
  { pos: [0, 1.6, -1.2], look: [0, 1.5, -5] }, // 4 crossing — the frame passes around you
  { pos: [0, 1.62, -4], look: [0, 1.62, -8] }, // 5 grand foyer reveal
  // --- Continuous walk through the rest of the home ---
  { pos: [0, 1.6, -8.5], look: [0, 1.5, -13] }, // 6 entering the living room
  { pos: [0, 1.6, -11.5], look: [4.5, 1.45, -12] }, // 7 living centre, turning right →
  { pos: [4.2, 1.6, -12], look: [9, 1.45, -12] }, // 8 through the doorway, facing kitchen
  { pos: [9, 1.6, -12], look: [10.3, 1.45, -17] }, // 9 kitchen, turning left toward bedroom
  { pos: [10, 1.6, -16], look: [10, 1.5, -21] }, // 10 through the doorway into the bedroom
  { pos: [10, 1.6, -20.5], look: [5, 1.45, -21] }, // 11 bedroom, turning left toward bathroom
  { pos: [5, 1.6, -21], look: [0, 1.5, -21] }, // 12 through the doorway into the bathroom
  { pos: [1.2, 1.6, -21], look: [-3, 1.5, -21.4] }, // 13 settle inside the spa bathroom
]

/**
 * ROOM STATIONS — the side label + exposure for each space.
 * `range` is the scroll-progress window (0–1) during which the label is shown
 * and the camera adapts to that room's exposure.
 */
/**
 * Room copy is the client's own (PDF §Hero / §Rooms). The camera path, ranges,
 * exposure, sides and CTA targets are UNCHANGED — only the words differ, so the
 * walkthrough animation and timing are byte-for-byte identical.
 */
export const ROOMS = [
  {
    id: 'entrance',
    name: 'Foyer / Entrance',
    eyebrow: 'RGL DÉCORS · ONE-TAKE WALKTHROUGH',
    title: 'More Than\nPremium Spaces',
    body: 'Your entrance is more than a doorway — it is the first impression of your identity. We design foyers that announce your lifestyle, setting the tone for everything that follows inside.',
    cta: { label: 'Explore The Home', target: '#story' },
    side: 'left',
    range: [0.0, 0.42],
    exposure: 0.82,
    hero: true,
  },
  {
    id: 'living',
    name: 'Living Room',
    eyebrow: 'SCENE 02 · LIVING ROOM',
    title: 'Living Room',
    body: 'We craft living rooms that become the soul of your home — spaces where elegance meets identity, and every detail reflects your stature.',
    cta: { label: 'View Interior Details', target: '#gallery' },
    side: 'right',
    range: [0.42, 0.58],
    exposure: 0.78,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    eyebrow: 'SCENE 03 · THE KITCHEN',
    title: 'Kitchen',
    body: 'More than a place to cook — the heart of your home, designed to reflect warmth and sophistication. We blend premium functionality with the identity of your family’s story.',
    cta: { label: 'Discover Materials', target: '#why' },
    side: 'left',
    range: [0.58, 0.73],
    exposure: 0.8,
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    eyebrow: 'SCENE 04 · THE BEDROOM',
    title: 'Bedroom',
    body: 'Bedrooms that whisper comfort and luxury — sanctuaries where your individuality is beautifully mirrored. Every detail reflects not just how you rest, but who you are.',
    cta: { label: 'Experience Comfort', target: '#story' },
    side: 'right',
    range: [0.73, 0.88],
    exposure: 0.7,
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    eyebrow: 'SCENE 05 · THE BATHROOM',
    title: 'Bathroom',
    body: 'Bathrooms designed as private retreats — elegant spaces that elevate your daily rituals into a reflection of refined living. Not just functionality, but a symbol of how you live.',
    cta: { label: 'Book Private Consultation', target: '#contact' },
    side: 'left',
    range: [0.88, 1.0],
    exposure: 0.78,
  },
]

// The front door swings open across this scroll window (≈90° as you reach the
// threshold, so you walk through an open door).
export const DOOR_OPEN_RANGE = [0.06, 0.22]

/**
 * OPTIONAL REAL ASSETS — the path to true photorealism.
 * Drop files into /public and set the paths here. When `model` is set the
 * procedural house is hidden and the camera walks the real GLTF instead; when
 * `hdri` is set it drives image-based lighting + reflections. Both are optional
 * and fall back gracefully to the procedural home. See /public/models/README.md.
 *
 * Build the model in metres with the SAME floor plan as WAYPOINTS (front door at
 * z=0, living ≈ z−10.5, kitchen ≈ x10/z−11.5, bedroom ≈ x10/z−21, bath ≈ z−21)
 * so the camera path lines up. Use `modelPosition`/`modelScale` to fine-tune.
 */
export const ASSETS = {
  hdri: '/hdri/golden_2k.hdr', // CC0 Poly Haven golden-hour HDRI → warm IBL + reflections
  hdriAsBackground: true, // show the HDRI through windows / behind glass
  model: null, // e.g. '/models/villa.glb' — full villa replaces the procedural house
  modelScale: 1,
  modelPosition: [0, 0, 0],
  modelRotationY: 0,
}

/**
 * REAL FURNITURE PROPS — individual modelled GLBs dropped into the procedural
 * house (real meshes + PBR materials beat any hand-coded box). Each is
 * auto-fitted to `targetWidth` (metres) and seated on the floor at `position`
 * [x, z]; tune `rotationY` to face it. Sample assets © Khronos / Wayfair,
 * CC-BY 4.0 (see public/models/CREDITS.md). When seating props load, the box
 * placeholders are hidden automatically.
 */
export const PROPS = [
  { url: '/models/sofa.glb', position: [-0.7, -13.8], targetWidth: 3.4, rotationY: 0 },
  { url: '/models/chair.glb', position: [-2.0, -11.3], targetWidth: 1.15, rotationY: 2.4 },
]
