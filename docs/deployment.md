# Takiia deployment and rollback

Target VPS layout:

- App root: `/srv/apps/takiia`
- Linux user: `takiia`
- API: `127.0.0.1:3033` (`takiia-api`)
- Web: `127.0.0.1:3034` (`takiia-web`)
- Nginx: `takiia.com` / `www.takiia.com` → web, `api.takiia.com` → API, `/socket.io/` upgraded

This repository prepares files. It does not SSH to the VPS or create databases.

## First install (operator)

1. Clone `https://github.com/arnavganguly209-code/takiia.git` into `/srv/apps/takiia`
2. Create `/srv/apps/takiia/apps/api/.env` from `apps/api/.env.example` using production values that stay on the server
3. Create `/srv/apps/takiia/apps/web/.env` with public URLs only (`https://api.takiia.com`, `https://takiia.com`)
4. Install Node 20, `npm ci`, `npm run prisma:generate`, then `prisma migrate deploy` after a backup
5. `npm run build`
6. Start only `takiia-api` and `takiia-web` from `infra/pm2/ecosystem.config.example.cjs`
7. Add `infra/nginx/takiia.conf.example` as a new site file and issue certificates

Do not edit Nginx or PM2 names that belong to other sites.

## Approved deploy

1. Confirm CI passed on the exact commit
2. Run `scripts/backup/takiia-db-backup.sh` and inspect the gzip
3. `TAKIIA_DEPLOY_APPROVED=yes scripts/deploy/git-sync.sh`
4. `TAKIIA_DEPLOY_APPROVED=yes TAKIIA_RUN_MIGRATIONS=yes scripts/deploy/remote-deploy.sh`
5. `scripts/deploy/verify-health.sh`

Forbidden: global PM2 actions that affect every process, persisting the entire PM2 process list, and schema-push against production. Use named Takiia reloads and `migrate deploy` only.

## Rollback

1. Keep the previous successful commit SHA
2. Restore `takiia_db` from the backup taken before the failed deploy if a migration ran
3. `git -C /srv/apps/takiia checkout <previous-sha>`
4. `npm ci` and `npm run build` at that SHA
5. `pm2 reload takiia-api --update-env`
6. `pm2 reload takiia-web --update-env`
7. Re-run `verify-health.sh`

GitHub Actions `deploy-production.yml` is manual (`workflow_dispatch`) and requires the `production` environment reviewers. It does not deploy on push.
