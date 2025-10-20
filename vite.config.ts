import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import fs from 'fs';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    },
    port: 5173
  }
})