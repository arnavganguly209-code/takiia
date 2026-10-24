import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const blockedNames = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  "id_rsa",
  "id_ed25519"
]);

const secretPattern =
  /(DATABASE_URL\s*=\s*postgresql:\/\/[^:]+:[^@]+@|SESSION_SECRET\s*=\s*(?!CHANGE_ME)[A-Za-z0-9+/=_-]{24,}|BEGIN (RSA |OPENSSH )?PRIVATE KEY)/;

const skipDirs = new Set([".git", "node_modules", ".next", "dist", "coverage"]);
const failures = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (skipDirs.has(entry)) {
      continue;
    }
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (blockedNames.has(entry) && !entry.endsWith(".example")) {
      failures.push(`Blocked file present: ${relative(root, full)}`);
      continue;
    }
    if (!/\.(ts|tsx|js|mjs|cjs|md|yml|yaml|json|env\.example|sh)$/i.test(entry) && entry !== ".env.example") {
      continue;
    }
    const text = readFileSync(full, "utf8");
    if (
      secretPattern.test(text) &&
      !full.endsWith(".example") &&
      !full.includes("check-secrets") &&
      !full.includes(`${join(".github", "workflows")}`) &&
      !full.includes(`${join("scripts", "deploy", "test")}`)
    ) {
      failures.push(`Possible secret material in ${relative(root, full)}`);
    }
  }
}

walk(root);

if (existsSync(join(root, ".git"))) {
  const tracked = execSync("git ls-files", { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  for (const file of tracked) {
    if (blockedNames.has(file.split(/[\\/]/).pop() ?? "")) {
      failures.push(`Tracked secret-like file: ${file}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Secret leak check passed.");
