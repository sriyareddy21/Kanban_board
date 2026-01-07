import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Kanban_Board/",
  build: {
    outDir: "docs"
  },
  plugins: [react()]
})
