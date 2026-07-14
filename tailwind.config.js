/** @type {import('tailwindcss').Config} */

/**
 * RGL DÉCORS — QUIET-LUXURY DESIGN SYSTEM
 * ======================================
 * Palette discipline: 70% white · 20% olive · 10% gold. No jade, no teal, no
 * neon, no dark-black canvases, no gradient soup.
 *
 * The TOKEN NAMES are deliberately unchanged (`accent`, `teal`, `gold`,
 * `background`, `ink`, `muted`, `divider`). ~60 files reference them. Remapping
 * the VALUES retints the entire site atomically with zero component churn — then
 * layout/motion work happens page by page on a palette that is already correct.
 *
 * CONTRAST (measured, not eyeballed — see the note on each token):
 *   olive #5E6746 on white ........ 5.99:1  AA ✓  (text, links, icons)
 *   white on olive #5E6746 ........ 5.99:1  AA ✓  (primary button)
 *   gold  #C5A572 on white ........ 2.33:1  ✗ FAILS — decorative use only
 *   ink   on gold #C5A572 ......... 7.46:1  AA ✓  (gold button = INK text)
 *   gold  #C5A572 on olive-deep ... 5.67:1  AA ✓  (footer)
 *   gold-ink #8A6C33 on white ..... 4.91:1  AA ✓  (the ONLY gold-as-text token)
 */
export default {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Canvas (70%) ─────────────────────────────────────────────────
           Pure white page; `bone` is a whisper-off-white used ONLY to band
           alternating sections so the eye gets rhythm without beige. Cards are
           pure white on white and are defined by a hairline, not a shadow —
           that hairline-over-shadow choice is what separates a gallery from a
           SaaS dashboard. */
        background: '#FFFFFF',
        bone: '#FAF9F6',
        ink: '#1C1C1A',
        muted: '#6B6B67', // 5.4:1 on white — AA for body text
        divider: '#E7E6E1',

        /* ── Olive (20%) — the brand voice ───────────────────────────────── */
        accent: '#5E6746', // primary: links, buttons, active states (5.99:1 ✓)
        'accent-dark': '#4A5238', // hover/pressed (8.22:1 ✓)
        'olive-deep': '#2C3222', // footer + dark editorial panels
        'olive-wash': '#F1F2EC', // 6% olive tint — section washes, chips

        /* `teal` is RETIRED as a hue but kept as a token name so the ~40
           existing `text-teal` / `bg-teal/10` usages retint instead of breaking.
           It now resolves to deep olive. Do not use it in new code — use
           `accent-dark`. */
        teal: '#4A5238',
        'teal-dark': '#3D4430',

        /* ── Gold (10%) — the thread ─────────────────────────────────────── */
        gold: '#C5A572', // decorative ONLY on light: rules, fills, dark-bg text
        'gold-dark': '#B89A5E', // hover for gold fills
        'gold-ink': '#8A6C33', // the only gold safe as TEXT on white (4.91:1 ✓)
      },

      fontFamily: {
        // serif = editorial display → Cormorant Garamond. At display sizes the
        // LIGHT weights (300/400) read expensive; the heavy ones read like a
        // wedding invitation. Weight is chosen per-use, not globally.
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        caps: ['var(--font-dmsans)', 'system-ui', 'sans-serif'],
      },

      /* ── Editorial type scale ───────────────────────────────────────────
         Fluid clamp()s so headlines are genuinely huge on desktop and still
         composed on a 320px phone — with NO layout shift, because clamp is
         resolved at paint, not by JS. */
      fontSize: {
        'display-xl': ['clamp(3rem, 8.5vw, 8.5rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        headline: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        title: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        lede: ['clamp(1.0625rem, 1.4vw, 1.375rem)', { lineHeight: '1.65' }],
      },

      letterSpacing: {
        caps: '0.12em',
        wide2: '0.15em',
        wide3: '0.2em',
        wide4: '0.32em', // the tracked-out eyebrow — pure editorial signal
      },

      /* ── THE SPACING SYSTEM ─────────────────────────────────────────────
         An 8px base scale. Every margin, pad and gap in the site resolves to a
         step on this ladder — there are no hand-picked values.

           s1 8 · s2 16 · s3 24 · s4 32 · s6 48 · s8 64 · s12 96 · s16 128

         SECTION RHYTHM — measured, then fixed.
         `section` used to be clamp(5.5rem, 11vw, 11rem) = 176px. Because it pads
         BOTH edges, two adjacent sections stacked 176 + 176 = 352px of dead
         space between their content. The layout audit measured real gaps of
         236-411px on the homepage; the stats band was 467px tall around ~150px
         of content. That is the "large empty white area" — it was arithmetic,
         not taste.

         Now 88px (s11), so the gap between two sections lands at 176px — a
         genuine editorial rhythm rather than a canyon. Run
         `node scripts/layout-audit.mjs` after changing this; it will tell you. */
      spacing: {
        s1: '0.5rem', //   8
        s2: '1rem', //    16
        s3: '1.5rem', //  24
        s4: '2rem', //    32
        s6: '3rem', //    48
        s8: '4rem', //    64
        s12: '6rem', //   96
        s16: '8rem', //  128

        section: 'clamp(3.5rem, 5.5vw, 5.5rem)', //  56 → 88
        'section-sm': 'clamp(2rem, 3.5vw, 3.5rem)', // 32 → 56
        gutter: 'clamp(1.25rem, 5vw, 4rem)', //        20 → 64
      },

      maxWidth: {
        editorial: '78rem', // the content measure for magazine layouts
        prose2: '38rem', // the reading measure — ~66 characters
      },

      /* ── Shadows ────────────────────────────────────────────────────────
         Luxury shadows are LOW-CONTRAST and LARGE. The old `0 20px 40px
         rgba(0,0,0,.12)` is a Bootstrap shadow — it makes cards look cheap and
         plastic. These are diffuse, tinted with the ink hue, and mostly absent
         at rest: elevation is earned on hover, not given by default. */
      boxShadow: {
        nav: '0 1px 40px -12px rgba(28,28,26,0.10)',
        card: '0 1px 2px rgba(28,28,26,0.02), 0 12px 30px -24px rgba(28,28,26,0.14)',
        lift: '0 30px 60px -32px rgba(28,28,26,0.24)',
        form: '0 40px 90px -50px rgba(28,28,26,0.28)',
        feature: '0 30px 60px -32px rgba(94,103,70,0.30)',
        gold: '0 18px 40px -18px rgba(197,165,114,0.50)',
      },

      /* ── Motion ─────────────────────────────────────────────────────────
         Luxury motion is slow-out, never bouncy. `lux` (expo-out) is the house
         curve: fast start, long elegant settle. `silk` is its gentler sibling
         for large-surface moves. NOTHING in this system overshoots. */
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'lux-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        accordion: 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        lux: '700ms',
      },

      keyframes: {
        bounceArrow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        // Slow drift for the hero's Ken-Burns stills.
        kenBurns: {
          '0%': { transform: 'scale(1.06) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.14) translate3d(-1.5%,-1.5%,0)' },
        },
        // The hairline that draws itself under a section heading.
        ruleIn: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        bounceArrow: 'bounceArrow 1.8s ease-in-out infinite',
        pulseRing: 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        kenBurns: 'kenBurns 18s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}
