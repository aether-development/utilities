import fs from "fs";
import path from "path";

// Load workspace data
import data from "../package.json";

const DIRS_TO_CLEAN = ["dist", "out", "node_modules", ".next", ".cache"];
const WORKSPACE = data.workspaces.map((ws: string) => ws.replace("/*", ""));

WORKSPACE.push(".");

// New structure for storing directories to clean
interface CleanDirInfo {
  name: string;
  paths: string[];
}

function findDirsToClean(
  baseDir: string,
  dir: string,
  dirsToClean: CleanDirInfo[],
  packageName: string = "",
): void {
  const files = fs.readdirSync(dir);

  // Try to find a package.json in the current directory first
  let currentPackageName = packageName;
  const packageJsonPath = path.join(dir, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      currentPackageName = packageJson.name;
    } catch (error) {
      console.error(`Error reading package.json in ${dir}: ${error}`);
    }
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();

    if (isDirectory) {
      // If currentPackageName is still empty, use the directory name as a fallback
      let effectivePackageName = currentPackageName || path.basename(fullPath);

      if (DIRS_TO_CLEAN.includes(file)) {
        // Check if the directory exists before adding
        if (fs.existsSync(fullPath)) {
          let packageInfo = dirsToClean.find(
            (p) => p.name === effectivePackageName,
          );
          if (!packageInfo) {
            packageInfo = { name: effectivePackageName, paths: [] };
            dirsToClean.push(packageInfo);
          }
          packageInfo.paths.push(fullPath);
        }
      } else {
        // Continue searching in subdirectories
        // Only pass down the packageName if it was found in the current directory or above
        findDirsToClean(
          baseDir,
          fullPath,
          dirsToClean,
          currentPackageName ? currentPackageName : "",
        );
      }
    }
  }
}

(async () => {
  console.log("[CLEAN] Clearing workspace...");

  const dirsToClean: CleanDirInfo[] = [];

  WORKSPACE.forEach((workspace) => {
    const fullPath = path.resolve(workspace);
    if (fs.existsSync(fullPath)) {
      findDirsToClean(fullPath, fullPath, dirsToClean);
    }
  });

  // Filter out entries with empty paths
  const filteredDirsToClean = dirsToClean.filter(
    (info) => info.paths.length > 0,
  );

  // Here you would delete the directories, e.g., using rimraf or fs.rmSync with { recursive: true }
  filteredDirsToClean.forEach((info) =>
    info.paths.forEach((dir) => fs.rmSync(dir, { recursive: true })),
  );

  // Run `bun pm cache rm` to clear the cache
  console.log("[CLEAN] Clearing cache...");
  const proc = Bun.spawnSync(["bun", "pm", "cache", "rm"]);
  if (!proc.success) {
    console.error(`Error clearing cache: ${proc.stdout || proc.stderr}`);
  }

  console.log("[CLEAN] Clearing husky...");
  const proc2 = Bun.spawnSync(["rm", "-rf", ".husky/_/"]);
  if (!proc2.success) {
    console.error(`Error clearing cache: ${proc2.stdout || proc2.stderr}`);
  }

  console.log("[CLEAN] Completed.");
})();
