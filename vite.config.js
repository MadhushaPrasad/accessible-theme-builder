import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Detect target browser from environment variable, default to chrome
  const targetBrowser = process.env.VITE_BROWSER || 'chrome'

  return {
    plugins: [
      vue(),
      UnoCSS(),
      {
        name: 'copy-extension-files',
        // This hook runs after the entire build is finished
        closeBundle: async () => {
          const extensionSrc = resolve(__dirname, `src/extension/${targetBrowser}`)
          const outDir = resolve(__dirname, 'dist')

          if (fs.existsSync(extensionSrc)) {
            try {
              // Copy manifest, devtools, from src/extension/[browser] to dist/
              // ensures folders like /popup and /images are copied too
              fs.cpSync(extensionSrc, outDir, { recursive: true })
              console.log(`✅ ${targetBrowser.toUpperCase()} extension files moved to dist root.`)
            } catch (err) {
              console.error(`❌ Error copying ${targetBrowser} files:`, err)
            }
          } else {
            console.warn(`⚠️ Source folder not found: ${extensionSrc}`)
          }
        },
      },
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true, // Clears dist before each build
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
  }
})
