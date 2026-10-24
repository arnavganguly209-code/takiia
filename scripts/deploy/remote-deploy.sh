#!/usr/bin/env bash
set -euo pipefail

# Manual or Actions production deploy for Takiia only.
# Requires: verified backup, approved commit, and explicit migration approval when needed.
# Manages only takiia-api and takiia-web under the takiia user's PM2 home.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"
# shellcheck source=lib/takiia-git.sh
source "$SCRIPT_DIR/lib/takiia-git.sh"

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
API_ENV="$APP_ROOT/apps/api/.env"
WEB_ENV="$APP_ROOT/apps/web/.env.production"
export TAKIIA_BACKUP_DIR="${TAKIIA_BACKUP_DIR:-/var/backups/takiia}"
export TAKIIA_API_ENV="${TAKIIA_API_ENV:-$API_ENV}"
export PM2_HOME="${PM2_HOME:-/home/takiia/.pm2}"
ECOSYSTEM="$APP_ROOT/infra/pm2/ecosystem.config.example.cjs"
PREV_SHA=""
TARGET_SHA="${TAKIIA_DEPLOY_SHA:-}"

if [[ "$(id -un)" == "root" ]]; then
  echo "Re-running Takiia application deploy as the dedicated app user."
  exec runuser -u takiia -- env \
    TAKIIA_DEPLOY_APPROVED="${TAKIIA_DEPLOY_APPROVED:-}" \
    TAKIIA_RUN_MIGRATIONS="${TAKIIA_RUN_MIGRATIONS:-}" \
    TAKIIA_DEPLOY_SHA="${TAKIIA_DEPLOY_SHA:-}" \
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

if [[ "${TAKIIA_RUN_MIGRATIONS:-}" == "yes" ]]; then
  echo "Migration mode enabled: prisma migrate deploy will run after a verified backup."
elif [[ -n "${TAKIIA_RUN_MIGRATIONS:-}" && "${TAKIIA_RUN_MIGRATIONS}" != "no" ]]; then
  echo "TAKIIA_RUN_MIGRATIONS must be yes or no." >&2
  exit 1
else
  TAKIIA_RUN_MIGRATIONS="no"
fi

LAUNCH_FILE="$APP_ROOT/.launch-ready"
if [[ ! -f "$LAUNCH_FILE" ]]; then
  echo "Initial launch gate is closed. After env files, SSH diagnostic, and the launch checklist are verified, write only the word ready to $LAUNCH_FILE as user takiia." >&2
  exit 1
fi
if [[ "$(tr -d '[:space:]' < "$LAUNCH_FILE")" != "ready" ]]; then
  echo "Launch gate file exists but is not marked ready." >&2
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

echo "STAGE: record-previous-commit"
PREV_SHA="$(git -C "$APP_ROOT" rev-parse HEAD)"

echo "STAGE: git-sync"
if [[ -n "$TARGET_SHA" ]]; then
  TAKIIA_DEPLOY_SHA="$TARGET_SHA" "$SCRIPT_DIR/git-sync.sh"
else
  echo "No TAKIIA_DEPLOY_SHA set; deploying the current Takiia checkout."
fi

takiia_build() {
  cd "$APP_ROOT"
  npm ci
  (
    cd apps/api
    npx prisma generate
    if [[ "${TAKIIA_RUN_MIGRATIONS}" == "yes" && "${1:-}" == "forward" ]]; then
      echo "Applying pending Prisma migrations with migrate deploy."
      npx prisma migrate deploy
    else
      echo "Skipping migrations."
    fi
  )
  npm run build
}

takiia_reload_processes() {
  if [[ ! -f "$ECOSYSTEM" ]]; then
    echo "Takiia PM2 ecosystem file is missing." >&2
    return 1
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
}

takiia_rollback() {
  echo "STAGE: rollback"
  echo "Health check failed. Rolling back only Takiia to $PREV_SHA." >&2
  if [[ -z "$PREV_SHA" || "$PREV_SHA" == "$(git -C "$APP_ROOT" rev-parse HEAD)" ]]; then
    echo "No distinct previous Takiia commit is available to restore." >&2
    return 1
  fi
  TAKIIA_RUN_MIGRATIONS="no"
  TAKIIA_DEPLOY_SHA="$PREV_SHA" "$SCRIPT_DIR/git-sync.sh"
  takiia_build rollback
  takiia_reload_processes
  "$SCRIPT_DIR/verify-health.sh"
  echo "Takiia process rollback completed. If a migration ran, restore takiia_db from the backup archive." >&2
  return 1
}

echo "STAGE: backup"
backup_path="$("$APP_ROOT/scripts/backup/takiia-db-backup.sh")"
if [[ ! -s "$backup_path" ]]; then
  echo "Backup verification failed before deploy." >&2
  exit 1
fi
echo "Verified Takiia database backup archive."

echo "STAGE: build"
takiia_build forward
echo "STAGE: reload"
takiia_reload_processes
echo "STAGE: health"
if ! "$SCRIPT_DIR/verify-health.sh"; then
  takiia_rollback
  exit 1
fi

echo "Takiia deploy finished for $(git -C "$APP_ROOT" rev-parse HEAD)"
