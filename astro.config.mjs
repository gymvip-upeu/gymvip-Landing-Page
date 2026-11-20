import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://gymvip.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'never',
  compressHTML: true
});
