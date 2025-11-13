import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Disable Fast Refresh in library builds to prevent HMR code in production bundle
      jsxRuntime: 'classic',
    })
  ],
  build: {
    lib: {
      entry: './src/chat-component-embed.jsx',
      name: 'ChatComponent',
      fileName: (format) => `chat-component.${format}.js`,
    },
    rollupOptions: {
      // Bundle React 19 directly with the component for self-contained distribution
      // This creates a larger bundle (~600KB) but eliminates external dependencies
      external: [],
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
})
