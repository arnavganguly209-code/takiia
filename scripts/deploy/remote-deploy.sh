#!/usr/bin/env bash
set -euo pipefail

# Manual production deploy for Takiia only.
# Requires: verified backup, approved commit, and explicit migration approval when needed.
# Manages only takiia-api and takiia-web under the takiia user's PM2 home.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
API_ENV="$APP_ROOT/apps/api/.env"
WEB_ENV="$APP_ROOT/apps/web/.env.production"
export TAKIIA_BACKUP_DIR="${TAKIIA_BACKUP_DIR:-/var/backups/takiia}"
export TAKIIA_API_ENV="${TAKIIA_API_ENV:-$API_ENV}"
export PM2_HOME="${PM2_HOME:-/home/takiia/.pm2}"
ECOSYSTEM="$APP_ROOT/infra/pm2/ecosystem.config.example.cjs"

if [[ "$(id -un)" == "root" ]]; then
  echo "Re-running Takiia application deploy as the dedicated app user."
  exec runuser -u takiia -- env \
    TAKIIA_DEPLOY_APPROVED="${TAKIIA_DEPLOY_APPROVED:-}" \
    TAKIIA_RUN_MIGRATIONS="${TAKIIA_RUN_MIGRATIONS:-}" \
    TAKIIA_APP_ROOT="$APP_ROOT" \
    TAKIIA_BACKUP_DIR="$TAKIIA_BACKUP_DIR" \
    TAKIIA_API_ENV="$TAKIIA_API_ENV" \
    PM2_HOME="$PM2_HOME" \
    "$APP_ROOT/scripts/deploy/remote-deploy.sh"
fi

takiia_require_user "takiia"

if [[ "${TAKIIA_DEPLOY_APPROVED:-}" != "yes" ]]; then
  echo "Set TAKIIA_DEPLOY_APPROVED=yes after reviewing the commit and CI status." >&2
  exit 1
fi

if [[ ! -f "$API_ENV" || ! -f "$WEB_ENV" ]]; then
  echo "Production environment files are missing. Run setup-production-env.sh as root first." >&2
  exit 1
fi

if [[ ! -d "$TAKIIA_BACKUP_DIR" ]]; then
  echo "Takiia backup directory is missing." >&2
  exit 1
fi

backup_path="$("$APP_ROOT/scripts/backup/takiia-db-backup.sh")"
if [[ ! -s "$backup_path" ]]; then
  echo "Backup verification failed before deploy." >&2
  exit 1
fi
echo "Verified Takiia database backup archive."

cd "$APP_ROOT"
npm ci
(
  cd apps/api
  npx prisma generate
  if [[ "${TAKIIA_RUN_MIGRATIONS:-}" == "yes" ]]; then
    echo "Applying pending Prisma migrations with migrate deploy."
    npx prisma migrate deploy
  else
    echo "Skipping migrations. Set TAKIIA_RUN_MIGRATIONS=yes after backup review."
  fi
)
npm run build

if [[ ! -f "$ECOSYSTEM" ]]; then
  echo "Takiia PM2 ecosystem file is missing." >&2
  exit 1
fi

if takiia_pm2 describe takiia-api >/dev/null 2>&1; then
  takiia_pm2 reload takiia-api --update-env
else
  takiia_pm2 start "$ECOSYSTEM" --only takiia-api
fi

if takiia_pm2 describe takiia-web >/dev/null 2>&1; then
  takiia_pm2 reload takiia-web --update-env
else
  takiia_pm2 start "$ECOSYSTEM" --only takiia-web
fi

"$APP_ROOT/scripts/deploy/verify-health.sh"
echo "Takiia deploy finished for $(git -C "$APP_ROOT" rev-parse HEAD)"
