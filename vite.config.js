import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist',
    afterBuild: () => {
      const sourcePath = resolve(__dirname, 'ads.txt');
      const destinationPath = resolve(__dirname, 'dist/ads.txt');
      copyFileSync(sourcePath, destinationPath);
    },
  },
});
