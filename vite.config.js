import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    _API_BASE__: JSON.stringify(process.env.VITE_API_BASE || "/api"),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api/deezer": {
        target: "https://api.deezer.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deezer/, ""),
      },
    },
    strictPort: true,
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
    },
    fs: {
      strict: false,
    },
  },
  logLevel: "info",
});