/**
 * Example only. Copy to a VPS-local file that is not committed if you need edits.
 * Run exclusively as Linux user `takiia` with PM2_HOME=/home/takiia/.pm2
 *
 *   PM2_HOME=/home/takiia/.pm2 pm2 start infra/pm2/ecosystem.config.example.cjs --only takiia-api
 *   PM2_HOME=/home/takiia/.pm2 pm2 start infra/pm2/ecosystem.config.example.cjs --only takiia-web
 *
 * Final API command is:
 *   node --env-file=/srv/apps/takiia/apps/api/.env dist/index.js
 *
 * Secrets stay in the env file. This file must not contain credentials.
 * Never target every PM2 process from Takiia scripts.
 */
module.exports = {
  apps: [
    {
      name: "takiia-api",
      cwd: "/srv/apps/takiia/apps/api",
      script: "dist/index.js",
      interpreter: "node",
      node_args: "--env-file=/srv/apps/takiia/apps/api/.env",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3033"
      }
    },
    {
      name: "takiia-web",
      cwd: "/srv/apps/takiia/apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3034",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3034",
        HOSTNAME: "127.0.0.1"
      }
    }
  ]
};
