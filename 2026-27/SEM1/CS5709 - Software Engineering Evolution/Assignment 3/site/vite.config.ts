import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is served from a sub-path on GitHub Pages. The deploy workflow passes that path in
 * `BASE_PATH`; local builds are served from the root.
 */
const base = process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
