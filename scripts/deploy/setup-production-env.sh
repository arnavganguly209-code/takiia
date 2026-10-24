#!/usr/bin/env bash
set -euo pipefail
umask 077

# Privileged one-time writer for Takiia production env files.
# Does not start apps, migrate, change Nginx, or restart services.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-db-url.sh
source "$SCRIPT_DIR/lib/takiia-db-url.sh"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
CREDENTIALS_FILE="${TAKIIA_DB_CREDENTIALS_FILE:-/root/takiia-db-credentials.txt}"
API_ENV="$APP_ROOT/apps/api/.env"
WEB_ENV="$APP_ROOT/apps/web/.env.production"
APP_USER="${TAKIIA_APP_USER:-takiia}"

EXPECTED_DB="takiia_db"
EXPECTED_USER="takiia_app"
EXPECTED_HOST_LOCAL="127.0.0.1"
EXPECTED_PORT="5432"

fail() {
  echo "$1" >&2
  exit 1
}

if [[ "$(id -u)" -ne 0 ]]; then
  fail "Run this setup script as root so it can read the root-only credentials file."
fi

if [[ ! -f "$CREDENTIALS_FILE" ]]; then
  fail "Takiia credentials file is missing."
fi

owner="$(stat -c '%U' "$CREDENTIALS_FILE")"
mode="$(stat -c '%a' "$CREDENTIALS_FILE")"
if [[ "$owner" != "root" ]]; then
  fail "Takiia credentials file owner is not root."
fi
if [[ "$mode" != "600" ]]; then
  fail "Takiia credentials file permissions must be 600."
fi

declare -A CREDS=()
takiia_read_allowlisted_env_file "$CREDENTIALS_FILE" CREDS

db_name="${CREDS[DB_NAME]:-}"
db_user="${CREDS[DB_USER]:-}"
db_host="${CREDS[DB_HOST]:-}"
db_port="${CREDS[DB_PORT]:-}"
database_url="${CREDS[DATABASE_URL]:-}"

if [[ -z "$database_url" || -z "$db_name" || -z "$db_user" || -z "$db_host" || -z "$db_port" ]]; then
  fail "Takiia credentials file is missing one or more required database fields."
fi

if [[ "$db_name" != "$EXPECTED_DB" ]]; then
  fail "Configured database name is not the dedicated Takiia database."
fi
if [[ "$db_user" != "$EXPECTED_USER" ]]; then
  fail "Configured database role is not the dedicated Takiia role."
fi
if ! takiia_is_local_db_host "$db_host"; then
  fail "Configured database host is not local-only."
fi
if [[ "$db_port" != "$EXPECTED_PORT" ]]; then
  fail "Configured database port is not the expected Takiia port."
fi

takiia_validate_production_database_url "$database_url" "$EXPECTED_DB" "$EXPECTED_USER" "$EXPECTED_PORT" \
  || fail "Credentials do not match the expected Takiia production database."

if [[ "$TAKIIA_URL_DB" != "$db_name" || "$TAKIIA_URL_USER" != "$db_user" || "$TAKIIA_URL_PORT" != "$db_port" ]]; then
  fail "Credential fields do not agree with the parsed database URL."
fi
if ! takiia_is_local_db_host "$TAKIIA_URL_HOST"; then
  fail "Parsed database host is not local-only."
fi
if [[ "$db_host" != "$TAKIIA_URL_HOST" && ! ( "$db_host" == "localhost" && "$TAKIIA_URL_HOST" == "127.0.0.1" ) && ! ( "$db_host" == "127.0.0.1" && "$TAKIIA_URL_HOST" == "localhost" ) ]]; then
  fail "Credential host field does not agree with the parsed database URL."
fi

if [[ ! -d "$APP_ROOT/.git" ]]; then
  fail "Takiia application checkout is missing."
fi

takiia_require_ignored_by_git "$APP_ROOT" "apps/api/.env"
takiia_require_ignored_by_git "$APP_ROOT" "apps/web/.env.production"

if [[ -e "$API_ENV" || -e "$WEB_ENV" ]]; then
  echo "An existing Takiia production environment file was found. Refusing to overwrite it." >&2
  echo "Inspect metadata only, for example: sudo stat $API_ENV && sudo stat $WEB_ENV" >&2
  echo "Do not print file contents. Remove or rename a confirmed-broken file before rerunning." >&2
  exit 1
fi

if ! id -u "$APP_USER" >/dev/null 2>&1; then
  fail "Dedicated Takiia application user is missing."
fi

session_secret="$(openssl rand -hex 32)"
csrf_secret="$(openssl rand -hex 32)"
if [[ ${#session_secret} -lt 64 || ${#csrf_secret} -lt 64 || "$session_secret" == "$csrf_secret" ]]; then
  fail "Failed to generate independent secrets."
fi

api_tmp="$(mktemp "$APP_ROOT/apps/api/.env.tmp.XXXXXX")"
web_tmp="$(mktemp "$APP_ROOT/apps/web/.env.production.tmp.XXXXXX")"
cleanup() {
  rm -f "$api_tmp" "$web_tmp"
}
trap cleanup EXIT

{
  printf '%s\n' "NODE_ENV=production" "HOST=127.0.0.1" "PORT=3033"
  printf 'DATABASE_URL="%s"\n' "$database_url"
  printf 'SESSION_SECRET="%s"\n' "$session_secret"
  printf 'CSRF_SECRET="%s"\n' "$csrf_secret"
  printf '%s\n' \
    "WEB_ORIGIN=https://takiia.com" \
    "COOKIE_DOMAIN=.takiia.com" \
    "COOKIE_SECURE=true" \
    "PAYMENTS_ENABLED=false" \
    "EMAIL_DELIVERY_ENABLED=false" \
    "SOCIAL_PUBLISH_ENABLED=false" \
    "WEBRTC_CALLS_ENABLED=false" \
    "LIVEKIT_MEETINGS_ENABLED=false"
} > "$api_tmp"

orbit_session="$(openssl rand -hex 32)"
{
  printf '%s\n' "NEXT_PUBLIC_API_URL=https://api.takiia.com" "NEXT_PUBLIC_SITE_URL=https://takiia.com"
  printf '%s\n' "TAKIIA_SITE_DATA_DIR=/srv/apps/takiia/data" "ORBIT_PASSKEY="
  printf 'ORBIT_SESSION_SECRET="%s"\n' "$orbit_session"
} > "$web_tmp"

chown "$APP_USER:$APP_USER" "$api_tmp" "$web_tmp"
chmod 600 "$api_tmp" "$web_tmp"
mv -f "$api_tmp" "$API_ENV"
mv -f "$web_tmp" "$WEB_ENV"
trap - EXIT

declare -A WRITTEN=()
takiia_read_allowlisted_env_file "$API_ENV" WRITTEN
takiia_validate_production_database_url "${WRITTEN[DATABASE_URL]:-}" "$EXPECTED_DB" "$EXPECTED_USER" "$EXPECTED_PORT" \
  || fail "Wrote an API environment file that failed database validation."

[[ "${WRITTEN[NODE_ENV]:-}" == "production" ]] || fail "API environment NODE_ENV is incorrect."
[[ "${WRITTEN[HOST]:-}" == "127.0.0.1" ]] || fail "API environment HOST is incorrect."
[[ "${WRITTEN[PORT]:-}" == "3033" ]] || fail "API environment PORT is incorrect."
[[ "${WRITTEN[WEB_ORIGIN]:-}" == "https://takiia.com" ]] || fail "API environment WEB_ORIGIN is incorrect."
[[ "${WRITTEN[COOKIE_SECURE]:-}" == "true" ]] || fail "API environment COOKIE_SECURE is incorrect."
[[ "${#WRITTEN[SESSION_SECRET]}" -ge 32 && "${#WRITTEN[CSRF_SECRET]}" -ge 32 ]] || fail "Generated secrets are too short."
[[ "${WRITTEN[PAYMENTS_ENABLED]:-}" == "false" && "${WRITTEN[EMAIL_DELIVERY_ENABLED]:-}" == "false" ]] || fail "Integration flags must stay disabled."
[[ "${WRITTEN[SOCIAL_PUBLISH_ENABLED]:-}" == "false" && "${WRITTEN[WEBRTC_CALLS_ENABLED]:-}" == "false" && "${WRITTEN[LIVEKIT_MEETINGS_ENABLED]:-}" == "false" ]] || fail "Integration flags must stay disabled."

api_owner="$(stat -c '%U:%G %a' "$API_ENV")"
web_owner="$(stat -c '%U:%G %a' "$WEB_ENV")"
[[ "$api_owner" == "$APP_USER:$APP_USER 600" ]] || fail "API environment ownership or mode is incorrect."
[[ "$web_owner" == "$APP_USER:$APP_USER 600" ]] || fail "Web environment ownership or mode is incorrect."

declare -A WEB=()
takiia_read_allowlisted_env_file "$WEB_ENV" WEB
[[ "${WEB[NEXT_PUBLIC_API_URL]:-}" == "https://api.takiia.com" ]] || fail "Web API public URL is incorrect."
[[ "${WEB[NEXT_PUBLIC_SITE_URL]:-}" == "https://takiia.com" ]] || fail "Web site public URL is incorrect."

echo "Takiia production environment files were created."
echo "Validated ownership, mode, required keys, localhost bind, and database identity without printing secrets."
echo "No application start, migration, Nginx change, or service restart was performed."
