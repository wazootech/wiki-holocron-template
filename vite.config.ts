import { defineConfig } from 'vite'
import { holocron } from '@holocron.so/vite'

export default defineConfig({
  clearScreen: false,
  base: process.env.GH_PAGES ? '/wiki-holocron-template/' : undefined,
  plugins: [holocron({ pagesDir: './src' })],
})
