import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint'; // Add eslint plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      ignoreDuringBuilds: true, // Ignore ESLint errors during builds
    }),
  ],
  server: {
    port: 3000,
  },
});
