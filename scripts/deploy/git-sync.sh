#!/usr/bin/env bash
set -euo pipefail

# Updates the Takiia checkout only. Does not migrate, restart, or touch other apps.
# With TAKIIA_DEPLOY_SHA, checks out that exact commit if it is on origin/main.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"
# shellcheck source=lib/takiia-git.sh
source "$SCRIPT_DIR/lib/takiia-git.sh"

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
EXPECTED_BRANCH="${TAKIIA_GIT_BRANCH:-main}"
DEPLOY_SHA="${TAKIIA_DEPLOY_SHA:-}"

takiia_require_user "takiia"

if [[ ! -d "$APP_ROOT/.git" ]]; then
  echo "Missing Takiia git checkout at the configured application root." >&2
  exit 1
fi

takiia_require_takiia_origin "$APP_ROOT"
takiia_require_clean_worktree "$APP_ROOT"

cd "$APP_ROOT"
git fetch origin "$EXPECTED_BRANCH"

if [[ -n "$DEPLOY_SHA" ]]; then
  takiia_require_sha_on_branch "$APP_ROOT" "$DEPLOY_SHA" "$EXPECTED_BRANCH"
  git checkout --detach "$DEPLOY_SHA"
else
  git checkout "$EXPECTED_BRANCH"
  git pull --ff-only origin "$EXPECTED_BRANCH"
fi

git rev-parse HEAD
