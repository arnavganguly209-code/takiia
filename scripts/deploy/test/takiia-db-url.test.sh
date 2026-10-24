#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../lib/takiia-db-url.sh
source "$SCRIPT_DIR/../lib/takiia-db-url.sh"
# shellcheck source=../lib/takiia-env-file.sh
source "$SCRIPT_DIR/../lib/takiia-env-file.sh"

failures=0
assert_ok() {
  if ! "$@"; then
    echo "Expected success: $*" >&2
    failures=$((failures + 1))
  fi
}

assert_fail() {
  if "$@"; then
    echo "Expected failure: $*" >&2
    failures=$((failures + 1))
  fi
}

good='postgresql://takiia_app:CHANGE_ME_LOCAL@127.0.0.1:5432/takiia_db'
assert_ok takiia_validate_production_database_url "$good" takiia_db takiia_app 5432

assert_fail takiia_validate_production_database_url 'postgresql://takiia_app:CHANGE_ME_LOCAL@10.0.0.8:5432/takiia_db' takiia_db takiia_app 5432
assert_fail takiia_validate_production_database_url 'postgresql://other_app:CHANGE_ME_LOCAL@127.0.0.1:5432/takiia_db' takiia_db takiia_app 5432
assert_fail takiia_validate_production_database_url 'postgresql://takiia_app:CHANGE_ME_LOCAL@127.0.0.1:5432/other_db' takiia_db takiia_app 5432
assert_fail takiia_validate_production_database_url $'postgresql://takiia_app:x@127.0.0.1:5432/takiia_db\n' takiia_db takiia_app 5432
assert_fail takiia_validate_production_database_url 'mysql://takiia_app:x@127.0.0.1:5432/takiia_db' takiia_db takiia_app 5432

# Bracket glob regression: a valid URL must not be rejected by literal *takiia_db* comparison.
if [[ "$good" != *"takiia_db"* ]]; then
  echo "Test fixture no longer contains the production database name." >&2
  failures=$((failures + 1))
fi

tmp="$(mktemp)"
cat > "$tmp" <<'EOF'
# comment
export DB_NAME=takiia_db
DB_USER=takiia_app
DB_HOST=127.0.0.1
DB_PORT=5432
DATABASE_URL=postgresql://takiia_app:CHANGE_ME_LOCAL@127.0.0.1:5432/takiia_db
EOF
declare -A parsed=()
takiia_read_allowlisted_env_file "$tmp" parsed
rm -f "$tmp"
if [[ "${parsed[DB_NAME]}" != "takiia_db" || "${parsed[DB_USER]}" != "takiia_app" ]]; then
  echo "Allowlisted env parser failed." >&2
  failures=$((failures + 1))
fi

if [[ "$failures" -ne 0 ]]; then
  echo "takiia-db-url tests failed: $failures" >&2
  exit 1
fi
echo "takiia-db-url tests passed."
