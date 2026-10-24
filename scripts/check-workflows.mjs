import { readFileSync } from "node:fs";

const files = [
  ".github/workflows/ci.yml",
  ".github/workflows/deploy-production.yml",
  ".github/workflows/ssh-diagnostic.yml"
];
let failed = false;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (!text.includes("name:") || !text.includes("on:") || !text.includes("jobs:")) {
    console.error(`${file} is missing required workflow keys`);
    failed = true;
  }
  if (text.includes("BEGIN OPENSSH") || text.includes("-----BEGIN")) {
    console.error(`${file} appears to contain key material`);
    failed = true;
  }
  if (text.includes("StrictHostKeyChecking=no") || text.includes("ssh-keyscan")) {
    console.error(`${file} disables or bypasses SSH host verification`);
    failed = true;
  }
}

const deploy = readFileSync(".github/workflows/deploy-production.yml", "utf8");
for (const required of [
  "workflow_run",
  "takiia-production",
  "production-migrate",
  "head_repository.full_name",
  "TAKIIA_DEPLOY_KNOWN_HOSTS",
  "TAKIIA_LAUNCH_READY",
  "actions-deploy.sh"
]) {
  if (!deploy.includes(required)) {
    console.error(`deploy-production.yml missing ${required}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log("Workflow YAML structural checks passed.");
