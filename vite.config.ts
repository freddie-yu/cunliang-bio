import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // When deploying to GitHub Pages, set VITE_DEPLOY_TARGET=github
  const isGithub = process.env.VITE_DEPLOY_TARGET === 'github'

  return {
    // Dynamic base path
    base: isGithub ? '/cunliang-bio/' : '/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      assetsInlineLimit: 0,
      outDir: 'dist',
      emptyOutDir: true,

      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
          },

          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },

      sourcemap: false,
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    },
  }
})
