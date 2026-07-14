import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [reactRouter(), tailwindcss()],
  optimizeDeps: {
    include: ["react-use-websocket"],
  },
});
