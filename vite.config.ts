import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Auto-detect base path for GitHub Pages - more flexible approach
    let base = '/';
    if (mode === 'production') {
      // Use environment variable if set, otherwise use repository name
      base = env.VITE_BASE_PATH || '/Open-Bio-Template/';
    }
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
