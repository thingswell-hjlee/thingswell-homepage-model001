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
    // 로컬 개발에서는 HTTPS 대신 HTTP 사용
    https: false,
    host: true,
  },
  preview: {
    // preview 모드에서도 HTTPS 비활성화
    https: false,
    host: true,
  },
})
