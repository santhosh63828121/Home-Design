# PHP Animation & WebGL Engine Migration Specification

This document details how Three.js, WebGL, GSAP, scroll controllers, custom cursors, magnetic buttons, and reveal animations are preserved in the PHP application.

## 1. WebGL & 3D Engine Architecture

The 3D interactive experience (chair/sofa models, HDRI environment lighting, cinematic scroll-driven camera motion) is a pure client-side JavaScript engine. It is framework-independent and is preserved 100% in the PHP frontend.

### Asset Delivery:
- `public/models/chair.glb` (served directly via Apache static file handling)
- `public/models/sofa.glb` (served directly via Apache static file handling)
- `public/hdri/golden_2k.hdr` (served directly via Apache static file handling)

### Engine Modules (`public/assets/js/3d/`):
- `HouseScene.js`: Initializes Three.js WebGLRenderer, Scene, PerspectiveCamera, OrbitControls, GLTFLoader, RGBELoader (HDRI environment), directional/ambient lighting, materials, and mesh hierarchy.
- `CinematicEngine.js`: Orchestrates render loops (`requestAnimationFrame`), viewport resize handlers, canvas binding.
- `CameraPath.js`: Computes smooth 3D Bezier curve positions for the camera based on scroll progress (0.0 to 1.0).
- `ScrollController.js`: Listens to window scroll events, calculates scroll ratio across canvas sections, updates `CameraPath` progress.
- `config.js`: Contains exact 3D camera keyframes `(x, y, z)` and target lookAt vectors `(x, y, z)` matching Next.js camera trajectory.
- `textures.js`: Generates procedural canvas textures for material surfaces.

## 2. Micro-Interactions & Frontend Animations

- **Magnetic Buttons (`public/assets/js/magnetic.js`)**:
  - Replaces `useMagnetic.ts` hook. Uses mousemove listeners to apply spring physics `transform: translate3d(x, y, 0)` on hover.
- **Custom Cursor (`public/assets/js/cursor.js`)**:
  - Replaces `CustomCursor.tsx`. Smooth trailing dot and expanding outer ring following cursor coordinates.
- **Scroll Progress Bar (`public/assets/js/scroll_progress.js`)**:
  - Replaces `ScrollProgress.tsx`. Updates top fixed progress bar width based on `(window.scrollY / totalScrollHeight) * 100%`.
- **Section & Element Reveals (`public/assets/js/reveal.js`)**:
  - Uses native `IntersectionObserver` to trigger fade-in / slide-up animations when `.reveal-item` elements enter the viewport.
- **Lenis Smooth Scroll**:
  - Embedded via lightweight client JS (`public/assets/js/lenis.min.js`) for smooth inertial momentum scrolling across pages.
