import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://gymvip.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'never',
  compressHTML: true
});
