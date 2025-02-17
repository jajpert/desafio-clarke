import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "/var/www/desafio-clarke/backend",
  format: "esm",
  splitting: true,
});