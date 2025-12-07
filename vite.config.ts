import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Smart base path detection
    let base = '/';
    
    // Only use custom base path for GitHub Pages
    if (mode === 'production' && env.VITE_DEPLOY_TARGET === 'github') {
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
      },
      build: {
        // Ensure assets are properly bundled
        assetsInlineLimit: 0,
        rollupOptions: {
          output: {
            // Better code splitting for deployment
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'framer-motion': ['framer-motion'],
            }
          }
        }
      }
    };
});
