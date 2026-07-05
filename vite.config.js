import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // three.js / shader gradient 拆成独立 chunk，可被浏览器单独缓存，
          // 不再让首屏页面逻辑与 1MB+ 的 3D 库绑在一起
          three: ['@shadergradient/react', '@react-three/fiber', 'three', 'three-stdlib'],
        },
      },
    },
  },
})
