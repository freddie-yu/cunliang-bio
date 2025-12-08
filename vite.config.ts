import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Vercel 部署时使用根路径
  base: '/',

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
    // 确保资源正确打包
    assetsInlineLimit: 0,
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // 更好的代码分割
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },

        // 确保资源文件名一致
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },

    // 生成 source map 用于调试
    sourcemap: false,
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
});
