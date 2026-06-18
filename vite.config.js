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
        // Split heavy animation library into its own chunk for better caching.
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
