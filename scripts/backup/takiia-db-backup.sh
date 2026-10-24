#!/usr/bin/env bash
set -euo pipefail

# Backs up only takiia_db. Never pass another database name.
# Reads DATABASE_URL from the VPS-only API env file.

ENV_FILE="${TAKIIA_API_ENV:-/srv/apps/takiia/apps/api/.env}"
BACKUP_DIR="${TAKIIA_BACKUP_DIR:-/srv/apps/takiia/backups}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing Takiia API env file." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set in the Takiia env file." >&2
  exit 1
fi

if [[ "$DATABASE_URL" != *"takiia_db"* ]]; then
  echo "Refusing to back up a URL that does not name takiia_db." >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/takiia_db-$STAMP.sql.gz"
pg_dump "$DATABASE_URL" --no-owner --no-privileges | gzip > "$OUT"

if [[ ! -s "$OUT" ]]; then
  echo "Backup file is empty." >&2
  exit 1
fi

echo "$OUT"
