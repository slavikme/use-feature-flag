import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "useFeatureFlag",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "usehooks-ts"],
      output: {
        globals: {
          react: "React",
          "usehooks-ts": "usehooks-ts",
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ["src/index.ts", "src/useFeatureFlag.ts"],
      exclude: ["src/**/*.test.ts", "src/test/**"],
      rollupTypes: true,
    }),
  ],
});
