import { readFileSync } from "node:fs";

const files = [
  "scripts/deploy/remote-deploy.sh",
  "scripts/deploy/verify-health.sh",
  "scripts/deploy/git-sync.sh",
  "scripts/backup/takiia-db-backup.sh"
];

const forbidden = ["pm2 restart all", "pm2 reload all", "pm2 delete all", "pm2 save", "prisma db push"];
let failed = false;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("#!/usr/bin/env bash")) {
    console.error(`${file} is missing a bash shebang`);
    failed = true;
  }
  if (!text.includes("set -euo pipefail")) {
    console.error(`${file} must use set -euo pipefail`);
    failed = true;
  }
  for (const item of forbidden) {
    if (text.includes(item)) {
      console.error(`${file} contains forbidden command: ${item}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}
console.log("Deploy script syntax checks passed.");
