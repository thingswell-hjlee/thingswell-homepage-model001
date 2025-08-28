import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'global': 'globalThis',
    },
  },
  server: {
    https: true,
    host: true,
  },
  preview: {
    https: true,
    host: true,
  },
})
