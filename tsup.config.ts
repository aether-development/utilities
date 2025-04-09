import { relative, resolve as resolveDir } from 'node:path';

import type { Options } from 'tsup';

import { defineConfig } from 'tsup';

const baseOptions: Options = {
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2021',
	tsconfig: relative(__dirname, resolveDir(process.cwd(), 'tsconfig.json')),
	keepNames: true,
	treeshake: true,
};

export function createTsupConfig(options: EnhancedTsupOptions) {
	return [
		defineConfig({
			...baseOptions,
			outDir: 'dist',
			format: 'esm',
			...options.esmOptions,
		}),
	];
}

interface EnhancedTsupOptions {
	cjsOptions?: Options;
	esmOptions?: Options;
}
