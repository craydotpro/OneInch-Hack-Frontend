import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vitePluginRequire from "vite-plugin-require";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginRequire.default()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
