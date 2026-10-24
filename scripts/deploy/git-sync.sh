#!/usr/bin/env bash
set -euo pipefail

# Updates the Takiia checkout only. Does not migrate, restart, or touch other apps.
APP_ROOT="${TAKIIA_APP_ROOT:-/srv/apps/takiia}"
EXPECTED_REMOTE="${TAKIIA_GIT_REMOTE:-https://github.com/arnavganguly209-code/takiia.git}"
EXPECTED_BRANCH="${TAKIIA_GIT_BRANCH:-main}"

if [[ ! -d "$APP_ROOT/.git" ]]; then
  echo "Missing Takiia git checkout at $APP_ROOT" >&2
  exit 1
fi

cd "$APP_ROOT"
current_remote="$(git remote get-url origin)"
if [[ "$current_remote" != "$EXPECTED_REMOTE" && "$current_remote" != "${EXPECTED_REMOTE%.git}" && "$current_remote" != "${EXPECTED_REMOTE}.git" ]]; then
  echo "Origin remote is not the Takiia repository." >&2
  exit 1
fi

git fetch origin "$EXPECTED_BRANCH"
git checkout "$EXPECTED_BRANCH"
git pull --ff-only origin "$EXPECTED_BRANCH"
git rev-parse HEAD
