import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output directory for Fastify to serve
  },
  server: {
    port: 5173, // Dev server port
    strictPort: true,
  },
});