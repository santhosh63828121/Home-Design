import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split heavy libraries into their own chunks for better caching.
        // three/gsap/lenis are only pulled in by the lazy cinematic engine,
        // so they land in a deferred chunk away from the initial payload.
        manualChunks: {
          motion: ['framer-motion'],
          three: ['three'],
          gsap: ['gsap', 'lenis', 'split-type'],
        },
      },
    },
  },
})
