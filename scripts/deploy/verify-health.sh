#!/usr/bin/env bash
set -euo pipefail

API_HEALTH="${TAKIIA_API_HEALTH:-http://127.0.0.1:3033/health}"
API_READY="${TAKIIA_API_READY:-http://127.0.0.1:3033/ready}"
WEB_HEALTH="${TAKIIA_WEB_HEALTH:-http://127.0.0.1:3034}"

fail() {
  echo "$1" >&2
  exit 1
}

api_health="$(curl -fsS "$API_HEALTH" || true)"
echo "$api_health" | grep -q '"status":"ok"' || fail "takiia-api /health failed"

api_ready="$(curl -fsS "$API_READY" || true)"
echo "$api_ready" | grep -q '"status":"ready"' || fail "takiia-api /ready failed"

curl -fsS -o /dev/null "$WEB_HEALTH" || fail "takiia-web did not respond on 127.0.0.1:3034"

echo "Takiia localhost health checks passed."
