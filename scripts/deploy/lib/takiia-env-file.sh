#!/usr/bin/env bash
# Read KEY=VALUE env files without printing values. Compatible with Node --env-file.

takiia_strip_env_quotes() {
  local value="$1"
  if [[ "$value" == \"*\" && "$value" == *\" ]]; then
    value="${value#\"}"
    value="${value%\"}"
  elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
    value="${value#\'}"
    value="${value%\'}"
  fi
  printf '%s' "$value"
}

# Reads allowlisted keys from $1 into nameref map $2. Ignores unknown keys.
takiia_read_allowlisted_env_file() {
  local file="$1"
  local -n _takiia_env_dest="$2"
  local line key value

  if [[ ! -f "$file" ]]; then
    echo "Environment file is missing." >&2
    return 1
  fi

  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"
    [[ -z "$line" || "$line" == \#* ]] && continue
    if [[ "$line" == export[[:space:]]* ]]; then
      line="${line#export}"
      line="${line#"${line%%[![:space:]]*}"}"
    fi
    [[ "$line" == *"="* ]] || continue
    key="${line%%=*}"
    value="${line#*=}"
    key="${key%"${key##*[![:space:]]}"}"
    key="${key#"${key%%[![:space:]]*}"}"
    case "$key" in
      DB_NAME|DB_USER|DB_HOST|DB_PORT|DATABASE_URL|SESSION_SECRET|CSRF_SECRET|NODE_ENV|HOST|PORT|WEB_ORIGIN|COOKIE_DOMAIN|COOKIE_SECURE|PAYMENTS_ENABLED|EMAIL_DELIVERY_ENABLED|SOCIAL_PUBLISH_ENABLED|WEBRTC_CALLS_ENABLED|LIVEKIT_MEETINGS_ENABLED|GOOGLE_ADS_ENABLED|GOOGLE_ADS_DEVELOPER_TOKEN|GOOGLE_ADS_CLIENT_ID|GOOGLE_ADS_CLIENT_SECRET|NEXT_PUBLIC_API_URL|NEXT_PUBLIC_SITE_URL|ORBIT_PASSKEY|ORBIT_SESSION_SECRET|TAKIIA_SITE_DATA_DIR)
        _takiia_env_dest["$key"]="$(takiia_strip_env_quotes "$value")"
        ;;
    esac
  done < "$file"
}

takiia_require_ignored_by_git() {
  local repo="$1"
  local relative="$2"
  if ! git -C "$repo" check-ignore -q -- "$relative"; then
    echo "Refusing to write a secret file that Git would track: $relative" >&2
    return 1
  fi
}

takiia_require_user() {
  local expected="${1:-takiia}"
  local current
  current="$(id -un)"
  if [[ "$current" != "$expected" ]]; then
    echo "This step must run as $expected (current user is not the Takiia app user)." >&2
    return 1
  fi
}

takiia_pm2() {
  command pm2 "$@"
}
