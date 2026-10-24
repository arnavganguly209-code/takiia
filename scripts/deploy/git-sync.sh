#!/usr/bin/env bash
set -euo pipefail

# Updates the Takiia checkout only. Does not migrate, restart, or touch other apps.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/takiia-env-file.sh
source "$SCRIPT_DIR/lib/takiia-env-file.sh"

APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
EXPECTED_BRANCH="${TAKIIA_GIT_BRANCH:-main}"
EXPECTED_REPO="arnavganguly209-code/takiia"

takiia_github_identity() {
  local remote="$1"
  remote="${remote%.git}"
  remote="${remote%/}"
  case "$remote" in
    git@github.com:arnavganguly209-code/takiia) printf '%s' "$EXPECTED_REPO" ;;
    ssh://git@github.com/arnavganguly209-code/takiia) printf '%s' "$EXPECTED_REPO" ;;
    https://github.com/arnavganguly209-code/takiia) printf '%s' "$EXPECTED_REPO" ;;
    http://github.com/arnavganguly209-code/takiia) printf '%s' "$EXPECTED_REPO" ;;
    *) printf '' ;;
  esac
}

takiia_require_user "takiia"

if [[ ! -d "$APP_ROOT/.git" ]]; then
  echo "Missing Takiia git checkout at the configured application root." >&2
  exit 1
fi

cd "$APP_ROOT"
current_remote="$(git remote get-url origin)"
if [[ "$(takiia_github_identity "$current_remote")" != "$EXPECTED_REPO" ]]; then
  echo "Origin remote is not the Takiia repository." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing to sync: the Takiia checkout has local changes." >&2
  exit 1
fi

git fetch origin "$EXPECTED_BRANCH"
git checkout "$EXPECTED_BRANCH"
git pull --ff-only origin "$EXPECTED_BRANCH"
git rev-parse HEAD
