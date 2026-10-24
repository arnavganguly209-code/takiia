#!/usr/bin/env bash
# Takiia repository identity and SHA gates. Never print secrets.

TAKIIA_EXPECTED_REPO="arnavganguly209-code/takiia"

takiia_github_identity() {
  local remote="$1"
  remote="${remote%.git}"
  remote="${remote%/}"
  case "$remote" in
    git@github.com:arnavganguly209-code/takiia) printf '%s' "$TAKIIA_EXPECTED_REPO" ;;
    ssh://git@github.com/arnavganguly209-code/takiia) printf '%s' "$TAKIIA_EXPECTED_REPO" ;;
    https://github.com/arnavganguly209-code/takiia) printf '%s' "$TAKIIA_EXPECTED_REPO" ;;
    http://github.com/arnavganguly209-code/takiia) printf '%s' "$TAKIIA_EXPECTED_REPO" ;;
    *) printf '' ;;
  esac
}

takiia_is_hex_sha() {
  [[ "${1:-}" =~ ^[0-9a-f]{40}$ ]]
}

takiia_require_clean_worktree() {
  local root="$1"
  if [[ -n "$(git -C "$root" status --porcelain)" ]]; then
    echo "Refusing to sync: the Takiia checkout has local changes." >&2
    return 1
  fi
}

takiia_require_takiia_origin() {
  local root="$1"
  local current
  current="$(git -C "$root" remote get-url origin)"
  if [[ "$(takiia_github_identity "$current")" != "$TAKIIA_EXPECTED_REPO" ]]; then
    echo "Origin remote is not the Takiia repository." >&2
    return 1
  fi
}

takiia_require_sha_on_branch() {
  local root="$1"
  local sha="$2"
  local branch="$3"
  if ! takiia_is_hex_sha "$sha"; then
    echo "Deployment SHA is not a complete 40-character commit id." >&2
    return 1
  fi
  if ! git -C "$root" merge-base --is-ancestor "$sha" "refs/remotes/origin/${branch}"; then
    echo "Deployment SHA is not on the approved Takiia branch." >&2
    return 1
  fi
}
