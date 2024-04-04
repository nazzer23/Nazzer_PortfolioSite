import postcss from "./postcss.config.js";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), splitVendorChunkPlugin()],
  css: [postcss],
  build: {
    modulePreload: {
      polyfill:true
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        }
      }
    }
  }
});
