import { rm } from "fs/promises";

const rootDir = new URL("../", import.meta.url);
const packagesDir = new URL("packages/", rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Root node_modules
	new URL("node_modules/", rootDir),

	// Dist folders
	new URL("eslint-config/node_modules/", packagesDir),
	new URL("prettier-config/node_modules/", packagesDir),
	new URL("ts-config/node_modules/", packagesDir),

	// Turbo folders
	new URL("eslint-config/dist/", packagesDir),
	new URL("prettier-config/dist/", packagesDir),
	new URL("ts-config/dist/", packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
