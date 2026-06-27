/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F1',
        ink: '#1A1A1A',
        accent: '#2D6A5A', // green — dominant brand (structure, links, most buttons)
        'accent-dark': '#235446',
        // Hybrid retheme (RGL doc §5.2): gold = premium CTAs/labels, teal = accents.
        gold: '#C8973A',
        'gold-dark': '#B0832F', // hover for gold fills
        teal: '#1B6F72',
        'teal-dark': '#155659',
        muted: '#6B6B6B', /* darkened from #888 to clear WCAG AA 4.5:1 on light bgs */
        divider: '#E8E4DE',
      },
      fontFamily: {
        // Driven by next/font CSS variables (see app/layout.tsx).
        // serif = display headings → Cormorant Garamond (doc §5.3).
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        caps: ['var(--font-dmsans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        caps: '0.12em',
        wide2: '0.15em',
        wide3: '0.2em',
      },
      boxShadow: {
        nav: '0 2px 20px rgba(0,0,0,0.08)',
        card: '0 20px 40px rgba(0,0,0,0.12)',
        form: '0 20px 60px rgba(0,0,0,0.15)',
        feature: '0 24px 50px rgba(45,106,90,0.18)',
      },
      transitionTimingFunction: {
        accordion: 'cubic-bezier(0.4,0,0.2,1)',
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
      },
      animation: {
        bounceArrow: 'bounceArrow 1.8s ease-in-out infinite',
        pulseRing: 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
