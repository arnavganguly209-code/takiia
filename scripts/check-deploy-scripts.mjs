import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function resolveBash() {
  const candidates = [
    process.env.BASH_PATH,
    "bash",
    "C:\\Program Files\\Git\\bin\\bash.exe",
    "C:\\Program Files\\Git\\usr\\bin\\bash.exe"
  ].filter(Boolean);
  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ["-lc", "echo ok"], { encoding: "utf8" });
    if (!probe.error && probe.status === 0) {
      return candidate;
    }
    if (existsSync(candidate) && candidate.endsWith(".exe")) {
      return candidate;
    }
  }
  return null;
}

const bashBin = resolveBash();

const files = [
  "scripts/deploy/remote-deploy.sh",
  "scripts/deploy/verify-health.sh",
  "scripts/deploy/git-sync.sh",
  "scripts/deploy/setup-production-env.sh",
  "scripts/deploy/actions-deploy.sh",
  "scripts/deploy/nginx-preflight.sh",
  "scripts/backup/takiia-db-backup.sh",
  "scripts/deploy/lib/takiia-db-url.sh",
  "scripts/deploy/lib/takiia-env-file.sh",
  "scripts/deploy/lib/takiia-git.sh",
  "scripts/deploy/test/takiia-db-url.test.sh",
  "scripts/deploy/test/takiia-git.test.sh",
  "scripts/deploy/test/takiia-deploy-gates.test.sh"
];

const forbidden = ["pm2 restart all", "pm2 reload all", "pm2 delete all", "pm2 save", "prisma db push", "prisma migrate reset"];
let failed = false;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("#!/usr/bin/env bash")) {
    console.error(`${file} is missing a bash shebang`);
    failed = true;
  }
  if (file.endsWith(".sh") && !file.includes("/lib/") && !text.includes("set -euo pipefail")) {
    console.error(`${file} must use set -euo pipefail`);
    failed = true;
  }
  for (const item of forbidden) {
    if (file.includes("/test/") || file.includes("\\test\\")) {
      continue;
    }
    if (text.includes(item)) {
      console.error(`${file} contains forbidden command: ${item}`);
      failed = true;
    }
  }
}

const backup = readFileSync("scripts/backup/takiia-db-backup.sh", "utf8");
if (!backup.includes("/var/backups/takiia")) {
  console.error("Backup script must default to /var/backups/takiia");
  failed = true;
}
if (backup.includes("set -a") || /^\s*source "\$ENV_FILE"/m.test(backup)) {
  console.error("Backup script must not source the entire API env file into the shell");
  failed = true;
}

const gitSync = readFileSync("scripts/deploy/git-sync.sh", "utf8");
const gitLib = readFileSync("scripts/deploy/lib/takiia-git.sh", "utf8");
if (!gitLib.includes("git@github.com:arnavganguly209-code/takiia")) {
  console.error("git identity helper must accept the SSH Takiia origin");
  failed = true;
}
if (!gitLib.includes("https://github.com/arnavganguly209-code/takiia")) {
  console.error("git identity helper must accept the HTTPS Takiia origin");
  failed = true;
}
if (!gitSync.includes("TAKIIA_DEPLOY_SHA") || !gitSync.includes("checkout --detach")) {
  console.error("git-sync must check out an exact approved SHA");
  failed = true;
}

const deploy = readFileSync("scripts/deploy/remote-deploy.sh", "utf8");
if (!deploy.includes('PM2_HOME="${PM2_HOME:-/home/takiia/.pm2}"')) {
  console.error("remote-deploy must use the takiia PM2 home");
  failed = true;
}
if (!deploy.includes("takiia_require_user")) {
  console.error("remote-deploy must require the takiia user");
  failed = true;
}

const ecosystem = readFileSync("infra/pm2/ecosystem.config.example.cjs", "utf8");
if (!ecosystem.includes('node_args: "--env-file=/srv/apps/takiia/apps/api/.env"')) {
  console.error("PM2 ecosystem must pass --env-file for takiia-api");
  failed = true;
}
if (/PASSWORD|SECRET=|postgresql:\/\//.test(ecosystem)) {
  console.error("PM2 ecosystem must not contain secrets");
  failed = true;
}

if (!bashBin) {
  console.error("bash is not available; shell syntax was not checked with bash -n");
  failed = true;
} else {
  for (const file of files) {
    const bash = spawnSync(bashBin, ["-n", file], { encoding: "utf8" });
    if (bash.status !== 0) {
      console.error(bash.stderr || bash.stdout || `${file} failed bash -n`);
      failed = true;
    }
  }
  for (const unitFile of [
    "scripts/deploy/test/takiia-db-url.test.sh",
    "scripts/deploy/test/takiia-git.test.sh",
    "scripts/deploy/test/takiia-deploy-gates.test.sh"
  ]) {
    const unit = spawnSync(bashBin, [unitFile], { encoding: "utf8" });
    if (unit.status !== 0) {
      console.error(unit.stderr || unit.stdout);
      failed = true;
    } else {
      process.stdout.write(unit.stdout);
    }
  }
}

if (failed) {
  process.exit(1);
}
console.log("Deploy script syntax checks passed.");
