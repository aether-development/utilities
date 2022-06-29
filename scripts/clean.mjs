import { rm } from "fs/promises";

const rootDir = new URL("../", import.meta.url);
const packagesDir = new URL("packages/", rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Dist folders
	new URL("config-eslint/dist/", packagesDir),
	new URL("config-prettier/dist/", packagesDir),
	new URL("config-tsconfig/build/", packagesDir),

	// Turbo folders
	new URL("config-eslint/.turbo/", packagesDir),
	new URL("config-prettier/.turbo/", packagesDir),
	new URL("config-tsconfig/.turbo/", packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
