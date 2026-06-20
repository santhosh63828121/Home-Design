# HDRI environment lighting

Drop an equirectangular `.hdr` here and set `ASSETS.hdri` in
`src/cinematic/config.js`. It drives image-based lighting + realistic
reflections on every PBR material, and (optionally) shows through the windows.

```js
export const ASSETS = {
  hdri: '/hdri/your_interior_4k.hdr',
  hdriAsBackground: true, // visible behind glass / windows
}
```

- Use a **2K–4K** interior or warm-sky HDRI (larger = slower load).
- CC0 source: Poly Haven (`polyhaven.com/hdris`) — e.g. an indoor or sunny-sky
  HDRI for warm daylight bounce.
- The loader is `RGBELoader`; if you only have `.exr`, ask me to add `EXRLoader`.

Falls back to the built-in procedural `RoomEnvironment` if missing or it fails
to load.
