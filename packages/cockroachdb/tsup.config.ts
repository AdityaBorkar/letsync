import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});

// ! Migrate from tsup to rspack
// dev: rspack serve
// build: rspack build
