import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 使用相对路径，方便部署到任意静态托管
  base: './',
  server: {
    // 开发环境：将 /api 请求代理到本地后端服务（npm run dev:server）
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 600
  }
})
