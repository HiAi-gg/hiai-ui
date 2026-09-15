/**
 * Classifier for consumer `@hiai-gg/hiai-ui` dependency specs.
 * Allowed portable: exact npm version, npm: alias at an exact version,
 * full-SHA github pin, v* tag. Sibling `file:` is allowed for local dev
 * only. Floating refs (`^`, `~`, `latest`, `#main`, `workspace:*`) are
 * forbidden.
 */

export const HIAI_UI_PACKAGE_NAME = "@hiai-gg/hiai-ui" as const;
export const HIAI_UI_PACKAGE_VERSION = "0.1.3" as const;
export const HIAI_UI_GITHUB_SLUG = "HiAi-gg/hiai-ui" as const;

export const HIAI_UI_PIN_KINDS = [
	"npm-exact",
	"npm-alias-exact",
	"dev-file",
	"immutable-sha",
	"release-tag",
	"forbidden-float",
] as const;

export type HiaiUiPinKind = (typeof HIAI_UI_PIN_KINDS)[number];

const FULL_SHA = /^[0-9a-f]{40}$/i;
const RELEASE_TAG = /^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const EXACT_VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

function filePath(spec: string): string {
	return spec.slice("file:".length).replace(/\\/g, "/");
}

function isHiaiUiFilePath(path: string): boolean {
	const normalized = path.replace(/\/+$/, "");
	return (
		normalized === "hiai-ui" ||
		normalized === "." ||
		normalized.endsWith("/hiai-ui")
	);
}

function parseGitHubSpec(
	spec: string,
): { slug: string; ref: string | undefined } | null {
	const github = /^github:([^#]+)(?:#(.*))?$/.exec(spec);
	if (github) {
		return { slug: github[1], ref: github[2] };
	}
	const ssh = /^git\+ssh:\/\/git@github\.com\/([^#]+?)(?:\.git)?(?:#(.*))?$/.exec(
		spec,
	);
	if (ssh) {
		return { slug: ssh[1].replace(/\.git$/, ""), ref: ssh[2] };
	}
	const https = /^https:\/\/github\.com\/([^#]+?)(?:\.git)?(?:#(.*))?$/.exec(
		spec,
	);
	if (https) {
		return { slug: https[1].replace(/\.git$/, ""), ref: https[2] };
	}
	return null;
}

export function classifyHiaiUiPin(spec: string): HiaiUiPinKind {
	const trimmed = spec.trim();
	if (trimmed.startsWith("file:")) {
		return isHiaiUiFilePath(filePath(trimmed)) ? "dev-file" : "forbidden-float";
	}

	const npmAlias = /^npm:@hiai-gg\/hiai-ui@(.+)$/.exec(trimmed);
	if (npmAlias) {
		return EXACT_VERSION.test(npmAlias[1]) ? "npm-alias-exact" : "forbidden-float";
	}

	const git = parseGitHubSpec(trimmed);
	if (git) {
		if (git.slug !== HIAI_UI_GITHUB_SLUG) return "forbidden-float";
		if (git.ref && FULL_SHA.test(git.ref)) return "immutable-sha";
		if (git.ref && RELEASE_TAG.test(git.ref)) return "release-tag";
		return "forbidden-float";
	}

	if (EXACT_VERSION.test(trimmed)) return "npm-exact";
	return "forbidden-float";
}

export function isAllowedHiaiUiPin(spec: string): boolean {
	return classifyHiaiUiPin(spec) !== "forbidden-float";
}

export function isPortableHiaiUiPin(spec: string): boolean {
	const kind = classifyHiaiUiPin(spec);
	return (
		kind === "npm-exact" ||
		kind === "npm-alias-exact" ||
		kind === "immutable-sha" ||
		kind === "release-tag"
	);
}
