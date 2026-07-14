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
  { pos: [0.6, 1.6, -11.2], look: [3.1, 1.42, -9.2] }, // 7 DINING — the head turns onto the table
  { pos: [1.4, 1.6, -11.8], look: [4.5, 1.45, -12] }, // 8 living centre, turning right →
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
    title: 'More than\npremium spaces',
    body: 'Your entrance is more than a doorway — it is the first impression of your identity. We design foyers that announce your lifestyle, setting the tone for everything that follows inside.',
    cta: { label: 'Explore the home', target: '#story' },
    side: 'left',
    range: [0.0, 0.4],
    exposure: 0.82,
    hero: true,
  },
  {
    id: 'living',
    name: 'Living Room',
    eyebrow: 'Scene 02 · Living Room',
    title: 'Living',
    body: 'The room that holds everything else together. Layered light, honest materials and a long sightline — designed around how your family actually gathers.',
    cta: { label: 'View interior details', target: '#gallery' },
    side: 'right',
    range: [0.4, 0.54],
    exposure: 0.78,
  },
  {
    id: 'dining',
    name: 'Dining',
    eyebrow: 'Scene 03 · Dining',
    title: 'Dining',
    body: 'Solid timber under a low pendant, marble catching the last of the light. The table is where a house finally becomes a home.',
    cta: { label: 'See our work', target: '#gallery' },
    side: 'left',
    range: [0.54, 0.65],
    exposure: 0.8,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    eyebrow: 'Scene 04 · The Kitchen',
    title: 'Kitchen',
    body: 'Factory-built modules, humidity-rated boards and hardware chosen for Chennai. The kitchen is where an interior is judged — so it is where we are strictest.',
    cta: { label: 'Discover materials', target: '#why' },
    side: 'right',
    range: [0.65, 0.78],
    exposure: 0.8,
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    eyebrow: 'Scene 05 · The Bedroom',
    title: 'Bedroom',
    body: 'Quiet materials, soft layered light, storage that disappears into the architecture. A bedroom should feel like the end of the day.',
    cta: { label: 'Experience comfort', target: '#story' },
    side: 'left',
    range: [0.78, 0.9],
    exposure: 0.68,
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe',
    eyebrow: 'Scene 06 · The Wardrobe',
    title: 'Wardrobe',
    body: 'Built to the millimetre of your wall, lit from within, planned around what you actually own — so the doors close, and stay closed.',
    cta: { label: 'Book a private consultation', target: '#contact' },
    side: 'right',
    range: [0.9, 1.0],
    exposure: 0.72,
  },
]

/**
 * POST-PROCESSING BUDGET.
 * Each of these is measured, not assumed — see the numbers in HouseScene's
 * _composer(). Flip one on and re-run `node scripts/lh.mjs desktop` before
 * believing it is free.
 */
export const POST = {
  /**
   * Depth of field (BokehPass). MEASURED COST: it renders a full extra DEPTH
   * pass every frame, roughly doubling draw calls — desktop Total Blocking Time
   * went 2,000ms → 4,300-8,300ms and Performance fell to 43. That is a page-
   * ruining price for an effect most visitors would not consciously notice on an
   * architectural walk that is already almost entirely in focus.
   *
   * Left OFF. The cinematic depth cue is carried instead by fog + the dusk ramp,
   * which cost nothing. Turn on only if the scene is ever swapped for a real
   * villa GLB and re-measured.
   */
  depthOfField: false,
}

/**
 * DAY → EVENING.
 * The walk begins at golden hour and ends after dusk: the sun sinks and cools
 * out while the interior lights come up. `t` is scroll progress (0–1).
 *
 * This is what makes the walkthrough read as a film rather than a viewer. It is
 * also nearly free — we are only lerping light intensities and colours that
 * already exist; no extra draw calls, no extra passes.
 */
export const LIGHTING = {
  /** Scroll window over which the sun sets and the interior lights ramp up. */
  duskRange: [0.35, 0.85],
  sun: {
    dayColor: '#ffe2b0',
    duskColor: '#ff9d5c',
    dayIntensity: 1.5,
    duskIntensity: 0.18,
  },
  hemi: {
    dayIntensity: 0.25,
    duskIntensity: 0.06,
  },
  /** Interior fills are multiplied by this as evening falls (they "turn on"). */
  interior: {
    dayMultiplier: 0.35,
    duskMultiplier: 1.0,
  },
}

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
