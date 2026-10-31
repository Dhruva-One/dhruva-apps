import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api is proxied to dhruva-platform so the browser avoids CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PLATFORM_URL ?? 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
});
