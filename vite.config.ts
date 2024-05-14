import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import filesize from "rollup-plugin-filesize";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "./src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    chunkSizeWarningLimit: 1024,
    sourcemap: true,
    rollupOptions: {
      plugins: [filesize()],
      output: {
        manualChunks: {
          vue: ["vue"],
          router: ["vue-router"],
          element: ["element-plus"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@u": path.resolve(__dirname, "./src/utils"),
      "@c": path.resolve(__dirname, "./src/components"),
    },
  },
  proxy: {
    "/": {
      target: "http://localhost:9527/",
      changeOrigin: true,
      rewrite: "/",
    },
  },
});
