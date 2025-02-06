import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/qodweather/", // Ensure this matches your repo name
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
