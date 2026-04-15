import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on all interfaces so phones on the same Wi‑Fi can open http://<your-mac-ip>:5173
    host: '0.0.0.0',
    port: 5173,
    // If 5173 is taken, fail instead of silently using 5174 (which breaks scanned QR URLs).
    strictPort: true,
  },
})
