import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    basicSsl(),
    react({
      // Disable Fast Refresh in library builds to prevent HMR code in production bundle
      jsxRuntime: 'classic',
    })
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'chat-component.opensource.mieweb.org',
    ],
    cors: {
      origin: '*', // Allow all origins in development
      credentials: true,
    },
  },
  build: {
    lib: {
      entry: './src/chat-component-embed.jsx',
      name: 'ChatComponent',
      fileName: (format) => `chat-component.${format}.js`,
    },
    rollupOptions: {
      // Force Rollup to include all imports in the bundle so the UMD is self-contained.
      // Returning false for every id means nothing is treated as external.
      // NOTE: this will include React/ReactDOM in the final UMD build.
      external: (id) => false,
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
})
