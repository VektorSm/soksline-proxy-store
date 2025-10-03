import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic"
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    globals: true,
    include: ["__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", "dist/**", ".next/**", "playwright/**"]
  }
});
