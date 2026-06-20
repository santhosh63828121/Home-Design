# Real villa model (the path to true photorealism)

Drop a furnished GLTF/GLB here and point `ASSETS.model` at it in
`src/cinematic/config.js`. When set, the procedural house is hidden and the
camera walks your real model instead — the camera path and engine don't change.

```js
// src/cinematic/config.js
export const ASSETS = {
  model: '/models/villa.glb',
  modelScale: 1,
  modelPosition: [0, 0, 0],
  modelRotationY: 0,
  hdri: '/hdri/interior_4k.hdr', // optional but strongly recommended
  hdriAsBackground: true,
}
```

## Coordinate spec (so the camera lines up)

Units are **metres**, +x = right, **−z = deeper into the house**, y = up, eye
height ≈ 1.6 m. Build/align the model to this plan (same as `WAYPOINTS`):

| Space        | Approx. centre (x, z) | Notes |
|--------------|-----------------------|-------|
| Front door   | (0, 0)                | facade/threshold; door faces +z (outside) |
| Foyer        | (0, −3)               | |
| Living room  | (0, −10.5)            | |
| Kitchen      | (10, −11.5)           | doorway from living at x≈5, z≈−12 |
| Bedroom      | (10, −21)             | doorway from kitchen at x≈10, z≈−16 |
| Bathroom     | (0, −21)              | doorway from bedroom at x≈5, z≈−21 |

Doorways must be **≥ 1.6 m wide / 2.3 m tall** and clear along the path so the
camera passes through cleanly. If your model uses a different scale/origin, fix
it with `modelScale` / `modelPosition` / `modelRotationY` (or re-export from
Blender with "Y up", 1 unit = 1 m, origin at the front door).

## Asset tips for photoreal results
- **Furnished, PBR-textured** GLB (metalness/roughness workflow, with normal +
  AO maps baked into the materials). Real furniture meshes are what make it read
  as a photo rather than a 3D model.
- Draco-compressed GLB is supported (decoder loads from the gstatic CDN).
- Keep it reasonable for the web: aim < ~40–60 MB, textures ≤ 2–4 K, use KTX2 if
  you can (ask me to add the KTX2 loader if your model needs it).
- Good CC0 sources: Poly Haven (HDRIs + some models), Khronos glTF Sample Assets,
  Sketchfab "Downloadable + CC0". A bespoke ₹5-cr villa needs a commissioned or
  purchased model / photogrammetry scan.

If the file fails to load, the app logs a warning and falls back to the
procedural home automatically.
