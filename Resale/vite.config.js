import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      utils: path.resolve(__dirname, "src/utils"),
      pages: path.resolve(__dirname, "src/Pages"),
      store: path.resolve(__dirname, "src/Store"),
      lib: path.resolve(__dirname, "src/lib"),
      routes: path.resolve(__dirname, "src/Routes"),
    },
  },
});
