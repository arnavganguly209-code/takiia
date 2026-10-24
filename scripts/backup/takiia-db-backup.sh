#!/usr/bin/env bash
set -euo pipefail

# Backs up only takiia_db. Never pass another database name.
# Reads DATABASE_URL from the VPS-only API env file without printing it.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../deploy/lib/takiia-db-url.sh
source "$SCRIPT_DIR/../deploy/lib/takiia-db-url.sh"
# shellcheck source=../deploy/lib/takiia-env-file.sh
source "$SCRIPT_DIR/../deploy/lib/takiia-env-file.sh"

ENV_FILE="${TAKIIA_API_ENV:-/srv/apps/takiia/apps/api/.env}"
BACKUP_DIR="${TAKIIA_BACKUP_DIR:-/var/backups/takiia}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing Takiia API env file." >&2
  exit 1
fi

if [[ ! -d "$BACKUP_DIR" ]]; then
  echo "Takiia backup directory is missing." >&2
  exit 1
fi
if [[ ! -w "$BACKUP_DIR" ]]; then
  echo "Takiia backup directory is not writable by this account." >&2
  exit 1
fi

declare -A ENV_VALUES=()
takiia_read_allowlisted_env_file "$ENV_FILE" ENV_VALUES
database_url="${ENV_VALUES[DATABASE_URL]:-}"

if [[ -z "$database_url" ]]; then
  echo "DATABASE_URL is not set in the Takiia env file." >&2
  exit 1
fi

takiia_validate_production_database_url "$database_url" "takiia_db" "takiia_app" "5432" \
  || { echo "Refusing to back up a database that is not the isolated Takiia production database." >&2; exit 1; }

OUT="$BACKUP_DIR/takiia_db-$STAMP.sql.gz"
if ! pg_dump --dbname="$database_url" --no-owner --no-privileges | gzip > "$OUT"; then
  rm -f "$OUT"
  echo "pg_dump failed for the Takiia database." >&2
  exit 1
fi

if [[ ! -s "$OUT" ]]; then
  rm -f "$OUT"
  echo "Backup file is empty." >&2
  exit 1
fi

if ! gzip -t "$OUT"; then
  rm -f "$OUT"
  echo "Backup archive failed gzip verification." >&2
  exit 1
fi

if ! gzip -dc "$OUT" | head -c 256 | grep -q "PostgreSQL database dump"; then
  rm -f "$OUT"
  echo "Backup archive is not a PostgreSQL dump." >&2
  exit 1
fi

echo "$OUT"
