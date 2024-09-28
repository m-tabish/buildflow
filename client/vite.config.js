import path from "path";
import { fileURLToPath } from "url"; // Import 'fileURLToPath'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Resolve the equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    build: {
      rollupOptions: {
        external: ['react-redux'],
      },
    }
  },
});
