import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:12000",
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "@mui/material", "axios"],
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
        },
      },
    },
  },
});
