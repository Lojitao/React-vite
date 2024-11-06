import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'  // 正確引入 Node.js 的 path 模組
import UnoCSS from 'unocss/vite'; //UnoCSS
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(), // 添加 UnoCSS 插件
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // 將 '@' 指向 'src' 目錄
    }
  },
  server: {
    proxy: {  // 請確認此行
      '/api': {
        target: 'https://giving.ntua.edu.tw/service', // 指向後端的 API 根地址，不需要 /api
        changeOrigin: true, // 避免 CORS 問題
        secure: false, // 如果後端使用自簽名證書，設為 false
      },
    },
  },
})
