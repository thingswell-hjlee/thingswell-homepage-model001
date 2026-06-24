import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // safegai.com 루트 도메인 배포이므로 base는 '/' (기본값)
  base: '/',
  build: {
    // 빌드 결과물 디렉토리
    outDir: 'dist',
    // 에셋 파일명에 content hash 포함 (캐시 버스팅)
    assetsDir: 'assets',
    // 소스맵 비활성화 (프로덕션 배포)
    sourcemap: false,
  },
})
