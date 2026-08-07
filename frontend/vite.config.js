import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Honour a PORT assigned by the environment; falls back to Vite's default.
  server: { port: process.env.PORT ? Number(process.env.PORT) : 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          swiper: ['swiper'],
          icons: ['react-icons'],
        },
      },
    },
  },
})
