import { rm } from "fs/promises";

const rootDir = new URL("../", import.meta.url);
const packagesDir = new URL("packages/", rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Dist folders
	new URL("eslint-config/dist/", packagesDir),
	new URL("prettier-config/dist/", packagesDir),
	new URL("ts-config/build/", packagesDir),

	// Turbo folders
	new URL("eslint-config/.turbo/", packagesDir),
	new URL("prettier-config/.turbo/", packagesDir),
	new URL("ts-config/.turbo/", packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
