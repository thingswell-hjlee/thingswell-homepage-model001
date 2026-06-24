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
  build: {
    // 이미지 인라인 크기 제한 (4KB 이하만 base64 인라인)
    assetsInlineLimit: 4096,
    // 대형 번들 경고 임계값 (현재 1MB+ 번들이 있으므로 임시 상향)
    chunkSizeWarningLimit: 1200,
  },
})
