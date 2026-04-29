import { defineConfig } from 'astro/config';

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function', 'abs-percent'],
        },
      },
    },
  },
  server: {
    host: true,
  },
});
