import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.test.*"],
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});
