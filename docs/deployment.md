# Takiia deployment and rollback

Target VPS layout:

- App root: `/srv/apps/takiia`
- Linux user: `takiia`
- PM2 home: `/home/takiia/.pm2`
- API: `127.0.0.1:3033` (`takiia-api`)
- Web: `127.0.0.1:3034` (`takiia-web`)
- Backups: `/var/backups/takiia`
- Nginx: `takiia.com` / `www.takiia.com` → web, `api.takiia.com` → API, `/socket.io/` upgraded

This repository prepares files. It does not SSH to the VPS, create databases, or activate Nginx.

Node.js 20.11+ is supported. The VPS may keep its already-installed Node 22. Do not replace system-wide Node for other sites.

## First install (operator)

1. Confirm the checkout at `/srv/apps/takiia` uses the Takiia SSH or HTTPS origin
2. As root, run `scripts/deploy/setup-production-env.sh` once. It writes ignored env files and refuses to overwrite existing ones
3. As `takiia`, install dependencies and build: `npm ci && npm run build`
4. Apply migrations only after a verified `/var/backups/takiia` dump and explicit approval
5. Start only `takiia-api` and `takiia-web` from the Takiia PM2 home
6. Add `infra/nginx/takiia.conf.example` as a new site file when DNS is ready

Do not edit Nginx or PM2 names that belong to other sites. Do not run `pm2 startup` without a separate approval.

## Approved deploy

1. Confirm CI passed on the exact commit
2. As `takiia`, fast-forward with `scripts/deploy/git-sync.sh`
3. `TAKIIA_DEPLOY_APPROVED=yes scripts/deploy/remote-deploy.sh`
4. Migrations stay skipped unless `TAKIIA_RUN_MIGRATIONS=yes` is also set after backup review

Forbidden: global PM2 actions that affect every process, persisting the entire PM2 process list, and schema-push against production. Use named Takiia reloads and `migrate deploy` only.

## Rollback

1. Keep the previous successful commit SHA
2. Restore `takiia_db` from the backup taken before the failed deploy if a migration ran
3. `git -C /srv/apps/takiia checkout <previous-sha>`
4. `npm ci` and `npm run build` at that SHA
5. `PM2_HOME=/home/takiia/.pm2 pm2 reload takiia-api --update-env`
6. `PM2_HOME=/home/takiia/.pm2 pm2 reload takiia-web --update-env`
7. Re-run `verify-health.sh`

GitHub Actions `deploy-production.yml` remains manual and is not used until its environment secrets are configured. It does not deploy on push.
