// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // サイトURL（デプロイ時に使用）
  site: 'https://monolith-blog.vercel.app', 
  
  integrations: [
    react(), 
    mdx()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});