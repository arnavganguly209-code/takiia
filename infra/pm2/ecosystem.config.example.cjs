/**
 * Example only. Copy to a VPS-local file that is not committed if you need edits.
 * Start with: pm2 start infra/pm2/ecosystem.config.example.cjs --only takiia-api
 * then:       pm2 start infra/pm2/ecosystem.config.example.cjs --only takiia-web
 * Never run pm2 restart all / reload all / delete all / save from Takiia scripts.
 */
module.exports = {
  apps: [
    {
      name: "takiia-api",
      cwd: "/srv/apps/takiia/apps/api",
      script: "dist/index.js",
      interpreter: "node",
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
        PORT: "3034"
      }
    }
  ]
};
