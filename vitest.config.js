import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // 👈 cambia 'node' por 'jsdom'
    setupFiles: "./test/setupTests.js",
    coverage: {
      enabled: true, // activa la cobertura
      provider: "v8", // usa el motor nativo de Node
      reporter: ["html", "text", "json"], // genera los tres tipos de salida
    },
  },
});
