#!/usr/bin/env bash
set -euo pipefail

# Entry point used by GitHub Actions over SSH. Runs only as user takiia.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-git.sh
source "$SCRIPT_DIR/lib/takiia-git.sh"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"

takiia_require_user "takiia"

if [[ -z "${TAKIIA_DEPLOY_SHA:-}" ]] || ! takiia_is_hex_sha "$TAKIIA_DEPLOY_SHA"; then
  echo "GitHub deploy requires TAKIIA_DEPLOY_SHA as a 40-character commit id." >&2
  exit 1
fi

if [[ "${TAKIIA_RUN_MIGRATIONS:-no}" != "yes" ]]; then
  TAKIIA_RUN_MIGRATIONS="no"
fi

export TAKIIA_DEPLOY_APPROVED=yes
export TAKIIA_DEPLOY_SHA
export TAKIIA_RUN_MIGRATIONS
export PM2_HOME="${PM2_HOME:-/home/takiia/.pm2}"

exec "$SCRIPT_DIR/remote-deploy.sh"
