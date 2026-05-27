import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  deps: {
    neverBundle: ['vite', 'html-minifier-next'],
  },
  outputOptions(options) {
    options.exports = 'named'
  },
})
