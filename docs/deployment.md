# Takiia deployment and rollback

Target VPS layout:

- App root: `/srv/apps/takiia`
- Linux user: `takiia`
- PM2 home: `/home/takiia/.pm2`
- API: `127.0.0.1:3033` (`takiia-api`)
- Web: `127.0.0.1:3034` (`takiia-web`)
- Backups: `/var/backups/takiia`
- Nginx: `takiia.com` / `www.takiia.com` → web, `api.takiia.com` → API, `/socket.io/` upgraded

Automatic Cursor → GitHub `main` → live deploys are documented in `docs/auto-deploy.md`.

This repository does not SSH to the VPS, create databases, or activate Nginx by itself.

Node.js 20.11+ is supported. The VPS may keep its already-installed Node 22. Do not replace system-wide Node for other sites.

## First install (operator)

1. Confirm `/srv/apps/takiia` uses the Takiia SSH origin
2. As root, run `scripts/deploy/setup-production-env.sh` once
3. Create `/var/backups/takiia` owned by `takiia`
4. Configure GitHub Environments and the deploy SSH key as in `docs/auto-deploy.md`
5. Apply the first migration only through the manual Actions option
6. Add `infra/nginx/takiia.conf.example` as a new site file when DNS is ready

Do not edit Nginx or PM2 names that belong to other sites. Do not run `pm2 startup` without a separate approval.

## Local / emergency deploy

```bash
sudo -u takiia -H env TAKIIA_DEPLOY_SHA=<40-char-sha> TAKIIA_DEPLOY_APPROVED=yes \
  bash /srv/apps/takiia/scripts/deploy/remote-deploy.sh
```

Migrations stay skipped unless `TAKIIA_RUN_MIGRATIONS=yes`.

## Rollback

Failed health checks after reload restore the previous Takiia commit and reload only `takiia-api` and `takiia-web`. If a migration ran, restore `takiia_db` from `/var/backups/takiia` before trusting the rolled-back code.
