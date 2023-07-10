import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['/src/main.js'],
    },
  },
  // Custom build configuration
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Custom build step to copy ads.txt
  build: {
    outDir: 'dist',
    afterBuild: () => {
      const sourcePath = resolve(__dirname, 'ads.txt');
      const destinationPath = resolve(__dirname, 'dist/ads.txt');
      copyFileSync(sourcePath, destinationPath);
    },
  },
});