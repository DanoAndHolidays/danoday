import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/danoday/', // 建议与仓库名一致，方便部署到 GitHub Pages
})
