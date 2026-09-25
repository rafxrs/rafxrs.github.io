/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { preloadFonts, publicAssets, siteMeta } from './scripts/vite-plugins.ts'

// https://vite.dev/config/
export default defineConfig({
  // rafxrs.github.io is a GitHub Pages *user* site, served from the domain root.
  // (A project site would live at https://<user>.github.io/<repo>/ and need base: '/<repo>/'.)
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    publicAssets(),
    siteMeta(),
    preloadFonts([/\/geist-latin-wght-normal-[\w-]+\.woff2$/]),
  ],
  define: {
    // Fixed at build time so the prerendered HTML and the hydrated app always agree.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    target: 'es2022',
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
