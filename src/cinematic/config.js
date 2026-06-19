/**
 * CINEMATIC JOURNEY CONFIG
 * ========================
 * The single source of truth for the pinned luxury walkthrough. Every scene
 * boundary, camera move, transition and atmosphere value lives here so the
 * whole film can be re-timed without touching controller code.
 *
 * The timeline runs on a normalised 0–100 scale (percent of the journey).
 * Scene `range: [start, end]` maps 1:1 to the brief's 0/20/40/60/80/100 beats.
 * The connector that walks you INTO a scene is centred on its `range[0]`.
 */

export const JOURNEY = {
  // Pin length = viewport height × this. Larger = slower, more cinematic scroll.
  scrollLengthVh: 8.5,
  // ScrollTrigger scrub smoothing (seconds of catch-up) → damped camera feel.
  scrub: 1.15,
  // Where the final pull-back / floor-plan exit begins on the 0–100 timeline.
  exitStart: 90,
  // CSS-3D camera perspective (px). Lower = stronger depth on corner turns.
  perspective: 1500,
  // Idle hand-held micro-movement + scroll-velocity sway.
  micro: { idleAmp: 6, idleSpeed: 0.25, velAmp: 0.06, damp: 0.06 },
}

/**
 * exposure  → brightness multiplier the camera adapts to on entering the room
 *             (dark dusk exterior → bright interiors → calm spa).
 * camera    → dolly[scaleFrom,scaleTo], pan in %, rotateY in deg, z push (px).
 * enter     → the connector transition that reveals this scene.
 *             types: pivot-door | corner-turn | focus-pull | slide-door
 * fx        → ThreeFX atmosphere weights for this room.
 */
export const SCENES = [
  {
    id: 'exterior',
    name: 'Exterior',
    range: [0, 20],
    eyebrow: 'RGL DECORS · PRIVATE RESIDENCE',
    title: 'LUXURY LIVING\nREDEFINED',
    body: 'Crafting timeless spaces where architecture meets lifestyle.',
    cta: { label: 'Explore The Home', target: '#story' },
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80',
    alt: 'Modern luxury villa exterior at golden hour with glass façade',
    exposure: 1.0,
    camera: { dolly: [1.05, 1.22], pan: { x: 0, y: 1.5 }, rotateY: [3, 0], z: 0 },
    mood: { particleColor: '#ffe6b8', rayColor: '#ffd27a', fog: '#0e1a24', intensity: 0.55 },
    fx: { dust: 0.7, rays: 0.5, flare: 1, steam: 0 },
    clouds: true,
    enter: null, // first scene — no connector
  },
  {
    id: 'living',
    name: 'Living Room',
    range: [20, 40],
    eyebrow: 'SCENE 02',
    title: 'LIVING ROOM',
    body: 'Designed for comfort, elegance, and memorable moments.',
    cta: { label: 'View Interior Details', target: '#gallery' },
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury living room with designer sofa, marble floor, chandelier and panoramic windows',
    exposure: 1.18,
    camera: { dolly: [1.28, 1.04], pan: { x: 4, y: -1 }, rotateY: [-6, 0], z: 0 },
    mood: { particleColor: '#fff0d6', rayColor: '#ffdca0', fog: '#171410', intensity: 0.72 },
    fx: { dust: 1, rays: 1, flare: 0.2, steam: 0 },
    enter: { type: 'pivot-door', light: '#ffdca0', label: 'Front Entrance' },
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    range: [40, 60],
    eyebrow: 'SCENE 03',
    title: 'DESIGNER KITCHEN',
    body: 'Where functionality meets exceptional craftsmanship.',
    cta: { label: 'Discover Materials', target: '#why' },
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2400&q=80',
    alt: 'Open-concept designer kitchen with marble island and pendant lighting',
    exposure: 1.12,
    camera: { dolly: [1.24, 1.05], pan: { x: -5, y: 1 }, rotateY: [14, 0], z: 0 },
    mood: { particleColor: '#fffaf0', rayColor: '#ffe9c2', fog: '#14110c', intensity: 0.66 },
    fx: { dust: 1, rays: 0.7, flare: 0.1, steam: 0 },
    // Corner turn: walk around into the kitchen rather than fade.
    enter: { type: 'corner-turn', turn: 18, label: 'Hallway' },
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    range: [60, 80],
    eyebrow: 'SCENE 04',
    title: 'MASTER BEDROOM',
    body: 'A private sanctuary crafted for ultimate relaxation.',
    cta: { label: 'Experience Comfort', target: '#story' },
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80',
    alt: 'Luxury master bedroom with king bed, wooden accent wall and floor-to-ceiling curtains',
    exposure: 0.92,
    camera: { dolly: [1.22, 1.06], pan: { x: 3, y: -1.5 }, rotateY: [-10, 0], z: 0 },
    mood: { particleColor: '#ffd9a0', rayColor: '#ffb866', fog: '#1a1108', intensity: 0.6 },
    fx: { dust: 0.8, rays: 0.6, flare: 0.1, steam: 0 },
    // Focus pull: foreground blurs, focus shifts onto the bed.
    enter: { type: 'focus-pull', label: 'Corridor' },
  },
  {
    id: 'bathroom',
    name: 'Spa Bathroom',
    range: [80, 100],
    eyebrow: 'SCENE 05',
    title: 'SPA BATHROOM',
    body: 'Elevating daily rituals into extraordinary experiences.',
    cta: { label: 'Book Design Consultation', target: '#contact' },
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2400&q=80',
    alt: 'Spa-inspired luxury bathroom with marble walls and freestanding bathtub',
    exposure: 1.08,
    camera: { dolly: [1.2, 1.04], pan: { x: -2, y: 1 }, rotateY: [8, 0], z: 0 },
    mood: { particleColor: '#e6f4ff', rayColor: '#bfe3ff', fog: '#0c1620', intensity: 0.78 },
    fx: { dust: 0.5, rays: 0.5, flare: 0, steam: 1 },
    // Sliding glass door into the spa.
    enter: { type: 'slide-door', light: '#cfeaff', label: 'Walk-In' },
  },
]

// Final cinematic exit copy (shown during the camera pull-back).
export const EXIT = {
  title: 'CRAFTING EXTRAORDINARY SPACES',
  subtitle: 'Luxury Interior Design Tailored To Your Lifestyle.',
}
