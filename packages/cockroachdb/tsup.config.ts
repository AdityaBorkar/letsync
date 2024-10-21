import { defineConfig } from 'tsup';

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ['src/**/*.ts', '!src/**/*.test.*'],
	format: 'esm',
	outDir: 'lib',
	sourcemap: true,
});

// bunfig.toml
[build];
entrypoints = ['./src/index.ts'];
outdir = './dist';
target = 'node';
format = 'esm';

// bun build ./index.tsx --outdir ./build
