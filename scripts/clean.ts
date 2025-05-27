import fs from 'fs';
import path from 'path';

import { rimraf } from 'rimraf'; // Import async version

// Load workspace data
import data from '../package.json';

const DIRS_TO_CLEAN = ['dist', 'out', 'logs', 'node_modules', '.cache', '.next', '.turbo'];
const WORKSPACE = data.workspaces.map((ws: string) => ws.replace('/*', ''));

WORKSPACE.push('.');

// New structure for storing directories to clean
interface CleanDirInfo {
	name: string;
	paths: string[];
}

function findDirsToClean(baseDir: string, dir: string, dirsToClean: CleanDirInfo[], packageName: string = ''): void {
	let files: string[];
	try {
		files = fs.readdirSync(dir);
	} catch (error) {
		console.error(`[CLEAN] Error reading directory ${dir}: ${error}`);
		return; // Skip this directory if it cannot be read
	}

	// Try to find a package.json in the current directory first
	let currentPackageName = packageName;
	const packageJsonPath = path.join(dir, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		try {
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
			currentPackageName = packageJson.name;
		} catch (error) {
			console.error(`Error reading package.json in ${dir}: ${error}`);
		}
	}

	for (const file of files) {
		const fullPath = path.join(dir, file);
		let isDirectory: boolean;

		try {
			isDirectory = fs.lstatSync(fullPath).isDirectory();
		} catch (error) {
			// Ignore errors like permission denied or file not found during check
			// console.warn(`[CLEAN] Error checking path ${fullPath}: ${error}`);
			continue; // Skip this entry if stat fails
		}

		if (isDirectory) {
			// If currentPackageName is still empty, use the directory name as a fallback
			let effectivePackageName = currentPackageName || path.basename(fullPath);

			if (DIRS_TO_CLEAN.includes(file)) {
				// Check if the directory exists before adding
				if (fs.existsSync(fullPath)) {
					let packageInfo = dirsToClean.find((p) => p.name === effectivePackageName);
					if (!packageInfo) {
						packageInfo = { name: effectivePackageName, paths: [] };
						dirsToClean.push(packageInfo);
					}
					packageInfo.paths.push(fullPath);
				}
			} else {
				// Continue searching in subdirectories
				// Only pass down the packageName if it was found in the current directory or above
				findDirsToClean(baseDir, fullPath, dirsToClean, currentPackageName ? currentPackageName : '');
			}
		}
	}
}

// Check for --dry-run flag
const dryRun = process.argv.includes('--dry-run');

(async () => {
	// Make IIFE async
	console.log('[CLEAN] Starting workspace cleanup...');
	if (dryRun) {
		console.log('[CLEAN] DRY RUN active. No files will be deleted.');
	}

	const dirsToClean: CleanDirInfo[] = [];

	WORKSPACE.forEach((workspace) => {
		const fullPath = path.resolve(workspace);
		if (fs.existsSync(fullPath)) {
			findDirsToClean(fullPath, fullPath, dirsToClean);
		}
	});

	// Filter out entries with empty paths
	const filteredDirsToClean = dirsToClean.filter((info) => info.paths.length > 0);

	if (dryRun) {
		console.log('[CLEAN] Directories identified for deletion (Dry Run):');
		filteredDirsToClean.forEach((info) => {
			console.log(`  Package: ${info.name}`);
			info.paths.forEach((dir) => {
				console.log(`    - ${path.relative(process.cwd(), dir)}`); // Show relative path
			});
		});
	} else {
		console.log('[CLEAN] Removing identified directories...');
		const deletionPromises = filteredDirsToClean.flatMap((info) =>
			info.paths.map(async (dir) => {
				try {
					// console.log(`[CLEAN] Removing ${path.relative(process.cwd(), dir)} for package ${info.name}...`); // Optional: Log start
					await rimraf(dir);
					// console.log(`[CLEAN] Successfully removed ${path.relative(process.cwd(), dir)}`); // Optional: Log success
				} catch (error) {
					console.error(`[CLEAN] Failed to remove ${path.relative(process.cwd(), dir)}: ${error}`);
				}
			}),
		);

		await Promise.all(deletionPromises);
		console.log('[CLEAN] Directory removal complete.');
	}

	// Run `bun pm cache rm` to clear the cache
	console.log('[CLEAN] Clearing cache...');
	const proc = Bun.spawnSync(['bun', 'pm', 'cache', 'rm']);
	if (proc.exitCode !== 0) {
		// Check exit code instead of success
		// Log stderr for detailed error info
		const stderr = proc.stderr ? Buffer.from(proc.stderr).toString() : 'Unknown error';
		console.error(`[CLEAN] Error clearing cache (exit code: ${proc.exitCode}): ${stderr}`);
	}

	console.log('[CLEAN] Clearing turbo...');
	const proc3 = Bun.spawnSync(['rm', '-rf', '.turbo']);
	if (proc3.exitCode !== 0) {
		const stderr = proc3.stderr ? Buffer.from(proc3.stderr).toString() : 'Unknown error';
		console.error(`[CLEAN] Error clearing turbo (exit code: ${proc3.exitCode}): ${stderr}`);
	}

	console.log('[CLEAN] Completed.');
})();
