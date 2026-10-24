#!/usr/bin/env bash
set -euo pipefail

# Manual production deploy for Takiia only.
# Requires: verified backup, approved commit, CI success on that commit.
# Never targets every PM2 process. Reload only takiia-api and takiia-web.

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
API_ENV="$APP_ROOT/apps/api/.env"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [[ "${TAKIIA_DEPLOY_APPROVED:-}" != "yes" ]]; then
  echo "Set TAKIIA_DEPLOY_APPROVED=yes after reviewing the commit and CI status." >&2
  exit 1
fi

if [[ ! -f "$API_ENV" ]]; then
  echo "Production API env is missing. Create $API_ENV on the VPS only." >&2
  exit 1
fi

"$REPO_ROOT/scripts/backup/takiia-db-backup.sh"

cd "$APP_ROOT"
npm ci
npm run prisma:generate
(
  cd apps/api
  if [[ "${TAKIIA_RUN_MIGRATIONS:-}" == "yes" ]]; then
    echo "Applying pending Prisma migrations with migrate deploy."
    npx prisma migrate deploy
  else
    echo "Skipping migrations. Set TAKIIA_RUN_MIGRATIONS=yes after backup review."
  fi
)
npm run build

if pm2 describe takiia-api >/dev/null 2>&1; then
  pm2 reload takiia-api --update-env
else
  pm2 start "$APP_ROOT/infra/pm2/ecosystem.config.example.cjs" --only takiia-api
fi

if pm2 describe takiia-web >/dev/null 2>&1; then
  pm2 reload takiia-web --update-env
else
  pm2 start "$APP_ROOT/infra/pm2/ecosystem.config.example.cjs" --only takiia-web
fi

"$REPO_ROOT/scripts/deploy/verify-health.sh"
echo "Takiia deploy finished for $(git -C "$APP_ROOT" rev-parse HEAD)"
