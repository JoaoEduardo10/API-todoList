import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup.ts"],
    environment: "node",
    coverage: {
      exclude: [
        "src/server/helpers/*.ts",
        "test/**/**/*.ts",
        "src/server/types/*.ts",
        "src/server/models/*.ts",
        "src/server/models/**/*.ts",
      ],
    },
  },
});
