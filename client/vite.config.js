import react from "@vitejs/plugin-react";
import path from "path";
import process from "process";
import { defineConfig } from "vite";
const __dirname = path.resolve(); // or use `process.cwd()`

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: []
    }
  },
  define: {
    "process.env": process.env
  }

});
