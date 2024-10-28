import type { BuildConfig } from "bun";

const defaultBuildConfig: BuildConfig = {
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
};

await Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    format: "esm",
    naming: "[dir]/[name].js",
  }),
]);
