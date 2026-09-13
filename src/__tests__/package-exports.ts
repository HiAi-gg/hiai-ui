import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";

const root = process.cwd();

type ExportTarget = string | { [condition: string]: ExportTarget };

export function readPackageJson() {
  return JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
    name: string;
    exports: Record<string, ExportTarget>;
  };
}

/** Resolve a consumer subpath through package.json `exports` (svelte → default → string). */
export function resolvePackageExport(subpath: string): string {
  const pkg = readPackageJson();
  const key =
    subpath === "." || subpath === pkg.name
      ? "."
      : subpath.startsWith("./")
        ? subpath
        : `./${subpath}`;
  const entry = pkg.exports[key];
  if (entry === undefined) {
    throw new Error(`package.json exports missing ${key}`);
  }
  const target = pickExportTarget(entry);
  const abs = isAbsolute(target) ? target : resolve(root, target);
  if (!existsSync(abs)) {
    throw new Error(`export ${key} -> ${target} does not exist`);
  }
  return abs;
}

function pickExportTarget(entry: ExportTarget): string {
  if (typeof entry === "string") return entry;
  for (const condition of ["svelte", "import", "default"]) {
    const next = entry[condition];
    if (typeof next === "string") return next;
    if (next && typeof next === "object") return pickExportTarget(next);
  }
  throw new Error("no svelte/import/default target");
}
