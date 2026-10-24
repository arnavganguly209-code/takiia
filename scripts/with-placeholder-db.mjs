import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://takiia_dev:CHANGE_ME_LOCAL_PASSWORD@127.0.0.1:5432/takiia_dev";
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Missing command");
  process.exit(1);
}

const result = spawnSync(args[0], args.slice(1), {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32"
});

process.exit(result.status ?? 1);
