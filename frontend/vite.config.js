import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Honour a PORT assigned by the environment; falls back to Vite's default.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    // Site copy is shared with the backend from backend/data/site-content,
    // outside this project, so the dev server must be allowed to serve it.
    fs: { allow: [searchForWorkspaceRoot(process.cwd()), '../backend/data/site-content'] },
  },
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
