# Homepage Hero — Google Flow (Veo 3) video prompts

The homepage hero is a **scroll-scrubbed image sequence** built from a rendered
walkthrough video. To regenerate the footage, generate two Veo clips in Google
Flow, join them, extract frames, and run the build script.

## Why the prompts are written the way they are

For a scroll-scrubbed hero the video MUST be:

- **one continuous take** — no cuts, no jump cuts;
- **constant speed** — no easing in/out, no stops (so scrubbing feels linear);
- **a straight, steady forward dolly** — gimbal-on-rails, locked horizon, no shake;
- **empty of people and text** — anything that moves independently of the camera
  breaks the "I am walking through this" illusion when scrubbed.

## Flow settings

- Model **Veo 3 (Quality)** · Aspect **16:9** · Resolution highest available.
- **Video 1:** Text-to-Video with Prompt 1.
- **Video 2:** Frames-to-Video with **Video 1's last frame as the first frame**
  (or use **Extend** on Video 1), then Prompt 2. This makes the join seamless.
- Generate several takes; keep the steadiest, most constant-speed one.

---

## PROMPT 1 — approach & entry

```
Photorealistic architectural visualization, cinematic real-estate walkthrough of a
modern luxury villa entrance in Chennai at golden hour dusk. Single continuous
one-take shot. The camera performs a slow, smooth, perfectly steady forward dolly
at eye level (approx 1.6m height), gliding straight ahead at a constant unchanging
speed — like a gimbal on rails — with no cuts, no stops, no zoom, no shake.

We begin a few metres back from the facade: a tall teak vertical-slat pivot door
with a long brushed-brass handle, warm interior light glowing through the gaps,
metal house numerals "27" on a smooth cream plaster wall, a black minimalist wall
sconce casting a soft warm downlight, a textured natural stone wall on the left, a
quiet water feature, and sculptural tropical planting — yucca, olive, potted
greenery — flanking wide stone steps. The camera climbs the steps and moves toward
the open doorway, passing through the threshold into a warm minimalist foyer with
oak-panelled walls and a polished marble floor reflecting soft light.

Palette: warm teak and walnut wood, cream plaster, olive green foliage, brushed
brass accents, soft 2700K interior lighting against a deep golden-blue dusk sky.
Mood: calm, expensive, serene, editorial. Ultra-detailed textures, realistic soft
shadows and reflections, shallow atmospheric depth. Colour graded warm and cinematic.

Camera: constant-velocity forward dolly, locked horizon, no roll, no handheld motion.
No people, no text, no captions, no lens flares, no fast movement.
```

## PROMPT 2 — continuation (interior)

Feed Video 1's **last frame** as the start frame, then:

```
Continue the exact same shot seamlessly from the previous frame — identical
constant-speed forward dolly at eye level, same warm dusk lighting, same steady
gimbal-on-rails motion with no cuts and no change of pace. The camera keeps gliding
straight forward, deeper into the same luxury villa.

It moves out of the foyer down a warm minimalist hallway lined with oak-panelled
walls and concealed cove lighting, marble floor reflecting the glow, passing an
open doorway that reveals a serene bedroom with an upholstered headboard and soft
layered lighting, then continues past into an open-plan living and dining space —
a low linen sofa, a solid timber dining table under a cluster of brass pendant
lights, floor-to-ceiling glass showing the blue dusk outside, olive and brass
accents throughout. The camera comes gently to rest facing the living space.

Same photoreal architectural-visualization style, same warm cinematic colour grade,
same palette of teak, cream, olive green and brushed brass. Ultra-detailed, realistic
soft shadows and reflections, calm and expensive mood.

Camera: constant-velocity forward dolly, locked horizon, no roll, no handheld motion.
No people, no text, no captions, no lens flares, no fast movement, no cuts.
```

## Negative prompt

```
cuts, jump cuts, fast motion, camera shake, handheld wobble, zoom, dolly zoom, whip
pan, people, humans, hands, text, watermark, captions, subtitles, UI, lens flare,
motion blur, warped geometry, distorted architecture, flickering, oversaturation
```

---

## Back into the site

1. Join the two clips in order (Video 1 → Video 2) into one MP4.
2. Extract frames, replacing `public/Images/`:
   ```
   ffmpeg -i walkthrough.mp4 -vf fps=30 public/Images/frame-%04d.png
   ```
3. Regenerate the optimized hero sequence:
   ```
   node scripts/build-hero-frames.mjs
   ```
   It re-optimizes to ~137 WebP frames + poster and rewrites
   `src/data/heroSequence.ts`. Nothing else to touch.

**Tips that matter for the scrub:** keep both clips the same camera speed so the
join isn't a visible slowdown, and if Flow eases at the clip ends, trim those few
frames before extracting — constant speed = smooth scroll.
```
