#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
failures=0

assert_file_has() {
  if ! grep -q "$2" "$1"; then
    echo "Missing in $1: $2" >&2
    failures=$((failures + 1))
  fi
}

assert_file_lacks() {
  if grep -q "$2" "$1"; then
    echo "Forbidden in $1: $2" >&2
    failures=$((failures + 1))
  fi
}

SYNC="$ROOT/scripts/deploy/git-sync.sh"
DEPLOY="$ROOT/scripts/deploy/remote-deploy.sh"
ACTIONS="$ROOT/scripts/deploy/actions-deploy.sh"
WORKFLOW="$ROOT/.github/workflows/deploy-production.yml"

assert_file_has "$SYNC" "TAKIIA_DEPLOY_SHA"
assert_file_has "$SYNC" "checkout --detach"
assert_file_has "$ROOT/scripts/deploy/lib/takiia-git.sh" "merge-base --is-ancestor"
assert_file_lacks "$SYNC" "reset --hard"
assert_file_lacks "$SYNC" "git clean"

assert_file_has "$DEPLOY" "takiia_rollback"
assert_file_has "$DEPLOY" "verify-health.sh"
assert_file_has "$DEPLOY" 'TAKIIA_DEPLOY_APPROVED:-}" != "yes"'
assert_file_has "$ACTIONS" "takiia_is_hex_sha"
assert_file_has "$ACTIONS" "remote-deploy.sh"

assert_file_has "$WORKFLOW" "workflow_run"
assert_file_has "$WORKFLOW" "takiia-production"
assert_file_has "$WORKFLOW" "production-migrate"
assert_file_has "$WORKFLOW" "StrictHostKeyChecking=yes"
assert_file_has "$WORKFLOW" "actions-deploy.sh"
assert_file_has "$WORKFLOW" "head_repository.full_name"
assert_file_has "$WORKFLOW" "TAKIIA_LAUNCH_READY"
assert_file_has "$DEPLOY" ".launch-ready"
assert_file_has "$DEPLOY" "STAGE: backup"
assert_file_has "$DEPLOY" "STAGE: health"
assert_file_lacks "$WORKFLOW" "StrictHostKeyChecking=no"
assert_file_lacks "$WORKFLOW" "ssh-keyscan"
assert_file_lacks "$WORKFLOW" "BEGIN OPENSSH"
assert_file_lacks "$WORKFLOW" "pm2 restart all"
assert_file_lacks "$WORKFLOW" "prisma db push"

if [[ "$failures" -ne 0 ]]; then
  echo "takiia-deploy-gates tests failed: $failures" >&2
  exit 1
fi
echo "takiia-deploy-gates tests passed."
