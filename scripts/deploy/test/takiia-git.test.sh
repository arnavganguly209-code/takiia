#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../lib/takiia-git.sh
source "$SCRIPT_DIR/../lib/takiia-git.sh"

failures=0
assert_eq() {
  if [[ "$1" != "$2" ]]; then
    echo "Expected '$2' got '$1'" >&2
    failures=$((failures + 1))
  fi
}

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

assert_eq "$(takiia_github_identity 'git@github.com:arnavganguly209-code/takiia.git')" "arnavganguly209-code/takiia"
assert_eq "$(takiia_github_identity 'https://github.com/arnavganguly209-code/takiia.git')" "arnavganguly209-code/takiia"
assert_eq "$(takiia_github_identity 'ssh://git@github.com/arnavganguly209-code/takiia')" "arnavganguly209-code/takiia"
assert_eq "$(takiia_github_identity 'git@github.com:someone-else/other.git')" ""

assert_ok takiia_is_hex_sha "486deaefe19e8f396934e66fbbafe0a5e6ebd3a0"
assert_fail takiia_is_hex_sha "main"
assert_fail takiia_is_hex_sha "486deae"
assert_fail takiia_is_hex_sha "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"

if [[ "$failures" -ne 0 ]]; then
  echo "takiia-git tests failed: $failures" >&2
  exit 1
fi
echo "takiia-git tests passed."
