import { rm } from "fs/promises";

const rootDir = new URL("../", import.meta.url);
const packagesDir = new URL("packages/", rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Root node_modules
	new URL("node_modules/", rootDir),

	// Dist folders
	new URL("config-eslint/node_modules/", packagesDir),
	new URL("config-prettier/node_modules/", packagesDir),
	new URL("config-tsconfig/node_modules/", packagesDir),

	// Turbo folders
	new URL("config-eslint/dist/", packagesDir),
	new URL("config-prettier/dist/", packagesDir),
	new URL("config-tsconfig/dist/", packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
