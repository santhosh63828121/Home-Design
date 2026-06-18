/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F1',
        ink: '#1A1A1A',
        accent: '#2D6A5A',
        'accent-dark': '#235446',
        muted: '#888888',
        divider: '#E8E4DE',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        caps: ['"DM Sans"', 'system-ui', 'sans-serif'],
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
