'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { routes } from '@/lib/routes'

/**
 * SCROLL STORY — the cinematic room sequence.
 * =========================================
 * A tall section containing a `position: sticky` stage. As you scroll through
 * it, the room photographs cross-fade and drift while the copy changes beside
 * them — the Apple-product-page / luxury-property-film cadence the brief asks
 * for, on BOTH desktop and mobile.
 *
 * WHY IT LIVES BELOW THE HERO, NOT IN IT
 * A multi-image hero was measured on this codebase as a real regression: the
 * images competed with the JS chunks for bandwidth on throttled mobile and cost
 * Performance 70 / TBT 570ms. Down here every frame is below the fold, so the
 * images lazy-load and cost the LCP exactly nothing — the cinematic experience
 * is free.
 *
 * WHY `sticky`, NOT GSAP `pin`
 * A GSAP pin uses `position: fixed`, which is shattered by ANY ancestor with a
 * transform/filter/perspective — and this page is full of them. `position:
 * sticky` is unaffected by that rule, so this composes safely with everything
 * around it. It also needs no JS to hold position.
 *
 * MOTION: opacity + transform only → compositor-driven, 60fps, zero layout.
 * Reduced motion: the stage stops moving and every scene is simply stacked and
 * legible.
 */

export type Scene = {
  id: string
  index: string
  eyebrow: string
  title: string
  body: string
  image: string
  alt: string
  href: string
}

function SceneLayer({
  scene,
  i,
  total,
  progress,
  reduce,
  armed,
}: {
  scene: Scene
  i: number
  total: number
  progress: MotionValue<number>
  reduce: boolean | null
  armed: boolean
}) {
  // Each scene owns a slice of the scroll. Neighbouring slices overlap slightly
  // so one image is always fading in as the last fades out — never a blank stage.
  const start = i / total
  const end = (i + 1) / total
  const pad = 0.5 / total

  const opacity = useTransform(
    progress,
    [start - pad, start + pad * 0.6, end - pad * 0.6, end + pad],
    [0, 1, 1, 0],
  )
  // A slow push-in across the scene's whole window — the "camera" never rests.
  const scale = useTransform(progress, [start - pad, end + pad], [1.04, 1.14])
  const y = useTransform(progress, [start - pad, end + pad], ['2%', '-2%'])

  return (
    <motion.div
      style={reduce ? undefined : { opacity }}
      className={`absolute inset-0 ${reduce && i > 0 ? 'hidden' : ''}`}
      aria-hidden={i > 0 ? 'true' : undefined}
    >
      <motion.div style={reduce ? undefined : { scale, y }} className="absolute inset-0">
        {/* The <img> is not mounted until `armed` — and that is deliberate.
            `loading="lazy"` is NOT sufficient here: Chrome scales its lazy-load
            distance threshold with the effective connection type (~1250px on
            4G, but ~2500-3000px on slower links). This story sits ~1650px down,
            so on Slow 4G all five room photos were fetched IMMEDIATELY —
            measured at ~185 KB starting at 1.23s and saturating the pipe until
            3.4s, which starved the hero and pushed LCP to 2.6s.

            Gating on an IntersectionObserver keeps them out of the DOM entirely
            until you are actually approaching, so they can't compete with the
            first paint. They still arrive well before you reach them. */}
        {armed && (
          <Image
            src={scene.image}
            alt={scene.alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 60vw"
            quality={70}
            className="object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function ScrollStory({ scenes }: { scenes: Scene[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Arm the photographs only once the story is within ~700px of the viewport.
  // `once: true` — having armed, never disarm; re-mounting <img>s on scroll-back
  // would refetch them.
  const armed = useInView(ref, { margin: '700px 0px 700px 0px', once: true })

  return (
    <section
      id="gallery"
      aria-labelledby="story-heading"
      ref={ref}
      className="relative bg-olive-deep text-white"
      // Each scene gets a viewport of scroll to breathe through. Slower than it
      // sounds — luxury pacing is the point.
      style={{ height: `${scenes.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── The stage ──────────────────────────────────────────────────── */}
        <div className="absolute inset-0">
          {scenes.map((s, i) => (
            <SceneLayer
              key={s.id}
              scene={s}
              i={i}
              total={scenes.length}
              progress={scrollYProgress}
              reduce={reduce}
              armed={armed}
            />
          ))}
          {/* Grade: a soft olive-black vignette so white type always clears AA
              over ANY photograph — including the bright ones. This is the only
              thing standing between "editorial" and "unreadable". */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-olive-deep/90 via-olive-deep/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-olive-deep/80 via-transparent to-olive-deep/30"
          />
        </div>

        {/* ── The copy ───────────────────────────────────────────────────── */}
        <div className="shell relative flex h-full flex-col justify-end pb-20 lg:justify-center lg:pb-0">
          <h2 id="story-heading" className="sr-only">
            A walk through one home, room by room
          </h2>

          <div className="max-w-xl">
            {scenes.map((s, i) => (
              <SceneCopy
                key={s.id}
                scene={s}
                i={i}
                total={scenes.length}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>

          {/* Room rail — a contents list that tracks the camera. */}
          <ol className="mt-12 hidden items-center gap-8 lg:flex" aria-hidden="true">
            {scenes.map((s, i) => (
              <RailItem
                key={s.id}
                scene={s}
                i={i}
                total={scenes.length}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function SceneCopy({
  scene,
  i,
  total,
  progress,
  reduce,
}: {
  scene: Scene
  i: number
  total: number
  progress: MotionValue<number>
  reduce: boolean | null
}) {
  const start = i / total
  const end = (i + 1) / total
  const pad = 0.5 / total

  const opacity = useTransform(
    progress,
    [start - pad * 0.5, start + pad * 0.7, end - pad * 0.7, end + pad * 0.5],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start - pad, end + pad], [40, -40])

  // Reduced motion: stack the scenes as plain, permanently-visible content.
  if (reduce) {
    return (
      <div className={i === 0 ? '' : 'mt-16'}>
        <p className="font-caps text-[10px] uppercase tracking-wide4 text-gold">{scene.eyebrow}</p>
        <p className="mt-6 font-serif text-headline font-light leading-[1.05]">{scene.title}</p>
        <p className="mt-6 max-w-md leading-relaxed text-white/75">{scene.body}</p>
        <Link href={scene.href} className="mt-8 inline-flex items-center gap-2 text-sm text-gold">
          Explore <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <motion.div style={{ opacity, y }} className={i === 0 ? 'relative' : 'absolute inset-x-0'}>
      <p className="font-caps text-[10px] uppercase tracking-wide4 text-gold">{scene.eyebrow}</p>
      <p className="mt-6 font-serif text-headline font-light leading-[1.05]">{scene.title}</p>
      <p className="mt-6 max-w-md leading-relaxed text-white/75">{scene.body}</p>
      <Link
        href={scene.href}
        className="lux-underline mt-8 inline-flex items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-gold"
      >
        Explore {scene.title}
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

function RailItem({
  scene,
  i,
  total,
  progress,
  reduce,
}: {
  scene: Scene
  i: number
  total: number
  progress: MotionValue<number>
  reduce: boolean | null
}) {
  const start = i / total
  const end = (i + 1) / total
  const scaleX = useTransform(progress, [start, end], [0, 1])

  // NO opacity dimming on the label. Fading the row to indicate "inactive" also
  // fades the GOLD numeral, and gold-on-olive has very little contrast headroom
  // to give away: at 0.35 opacity it computed to 1.92:1 and at 0.7 to 3.59:1 —
  // both axe colour-contrast failures. At full opacity it is 5.67:1 and passes.
  //
  // The active state doesn't need dimming anyway: it is already carried by the
  // gold rule filling left-to-right underneath the label, which is both more
  // legible and a better cue.
  return (
    <li className="flex-1">
      <span className="font-caps text-[10px] uppercase tracking-wide2">
        <span className="text-gold">{scene.index}</span>{' '}
        <span className="text-white">{scene.title}</span>
      </span>
      <span className="mt-2 block h-px w-full bg-white/20">
        <motion.span
          style={reduce ? undefined : { scaleX }}
          className="block h-px w-full origin-left bg-gold"
        />
      </span>
    </li>
  )
}

/** Default scene set — the five rooms of the walkthrough, mapped to real routes. */
export const HOME_SCENES: Scene[] = [
  {
    id: 'living',
    index: '01',
    eyebrow: 'Scene 01 · The Living Room',
    title: 'Living',
    body: 'The room that holds everything else together. We design living rooms around how a family actually gathers — light, seating lines, and the long sightline that makes a flat feel like a home.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=75',
    alt: 'Calm contemporary living room with linen seating and warm timber',
    // No dedicated living-room service slug exists — this correctly resolves to
    // the services index rather than inventing a 404.
    href: routes.services,
  },
  {
    id: 'kitchen',
    index: '02',
    eyebrow: 'Scene 02 · The Kitchen',
    title: 'Kitchen',
    body: 'Factory-built modules, humidity-rated boards and hardware chosen for Chennai — not for a catalogue. The kitchen is where an interior is judged, so it is where we are strictest.',
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=75',
    alt: 'Modular kitchen with handleless fronts and stone worktop',
    href: routes.service('modular-kitchen-chennai'),
  },
  {
    id: 'bedroom',
    index: '03',
    eyebrow: 'Scene 03 · The Bedroom',
    title: 'Bedroom',
    body: 'Quiet materials, soft layered light, and storage that disappears into the architecture. A bedroom should feel like the end of the day, not another room to manage.',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=75',
    alt: 'Serene bedroom with upholstered headboard and concealed wardrobe',
    href: routes.service('bedroom-interior-chennai'),
  },
  {
    id: 'wardrobe',
    index: '04',
    eyebrow: 'Scene 04 · The Wardrobe',
    title: 'Wardrobe',
    body: 'Built to the millimetre of your wall, not to a standard size. Internals planned around what you actually own — so the doors close, and stay closed.',
    image:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=75',
    alt: 'Walk-in wardrobe with fluted timber shutters and integrated lighting',
    href: routes.service('wardrobe-design-chennai'),
  },
  {
    id: 'dining',
    index: '05',
    eyebrow: 'Scene 05 · Dining & Detail',
    title: 'Dining',
    body: 'The last ten percent — the lighting, the joinery reveal, the handle you touch every day. It is the part nobody specifies and everybody notices.',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=75',
    alt: 'Dining space with pendant lighting over a solid timber table',
    href: routes.portfolio,
  },
]
