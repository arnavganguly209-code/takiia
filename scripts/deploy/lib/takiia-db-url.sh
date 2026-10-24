#!/usr/bin/env bash
# Shared Takiia production database URL checks. Never print the URL or password.

takiia_url_has_unsafe_chars() {
  local value="$1"
  [[ "$value" == *$'\n'* || "$value" == *$'\r'* || "$value" == *'"'* || "$value" == *"'"* ]]
}

# Sets TAKIIA_URL_SCHEME, TAKIIA_URL_USER, TAKIIA_URL_HOST, TAKIIA_URL_PORT, TAKIIA_URL_DB.
# Returns 0 only when the URL can be parsed. Does not echo secrets.
takiia_parse_database_url() {
  local url="${1:-}"
  TAKIIA_URL_SCHEME=""
  TAKIIA_URL_USER=""
  TAKIIA_URL_HOST=""
  TAKIIA_URL_PORT=""
  TAKIIA_URL_DB=""

  if [[ -z "$url" ]] || takiia_url_has_unsafe_chars "$url"; then
    return 1
  fi

  local rest=""
  if [[ "$url" == postgresql://* ]]; then
    TAKIIA_URL_SCHEME="postgresql"
    rest="${url#postgresql://}"
  elif [[ "$url" == postgres://* ]]; then
    TAKIIA_URL_SCHEME="postgres"
    rest="${url#postgres://}"
  else
    return 1
  fi

  if [[ "$rest" != *"@"* || "$rest" != *"/"* ]]; then
    return 1
  fi

  local userinfo="${rest%%@*}"
  rest="${rest#*@}"
  TAKIIA_URL_USER="${userinfo%%:*}"
  if [[ -z "$TAKIIA_URL_USER" || "$TAKIIA_URL_USER" == *":"* ]]; then
    return 1
  fi

  local hostport="${rest%%/*}"
  local dbpart="${rest#*/}"
  if [[ -z "$hostport" || -z "$dbpart" ]]; then
    return 1
  fi

  TAKIIA_URL_HOST="${hostport%%:*}"
  if [[ "$hostport" == *:* ]]; then
    TAKIIA_URL_PORT="${hostport##*:}"
  else
    TAKIIA_URL_PORT="5432"
  fi
  if [[ ! "$TAKIIA_URL_PORT" =~ ^[0-9]+$ ]]; then
    return 1
  fi

  TAKIIA_URL_DB="${dbpart%%\?*}"
  TAKIIA_URL_DB="${TAKIIA_URL_DB%%\#*}"
  TAKIIA_URL_DB="${TAKIIA_URL_DB%%/*}"
  if [[ -z "$TAKIIA_URL_DB" ]]; then
    return 1
  fi
  return 0
}

takiia_is_local_db_host() {
  case "$1" in
    127.0.0.1|localhost|::1) return 0 ;;
    *) return 1 ;;
  esac
}

# Confirms the URL names the isolated Takiia production database on localhost.
takiia_validate_production_database_url() {
  local url="${1:-}"
  local expected_db="${2:-takiia_db}"
  local expected_user="${3:-takiia_app}"
  local expected_port="${4:-5432}"

  if ! takiia_parse_database_url "$url"; then
    echo "Database URL failed structural validation." >&2
    return 1
  fi
  if [[ "$TAKIIA_URL_DB" != "$expected_db" ]]; then
    echo "Database pathname is not the dedicated Takiia database." >&2
    return 1
  fi
  if [[ "$TAKIIA_URL_USER" != "$expected_user" ]]; then
    echo "Database role is not the dedicated Takiia role." >&2
    return 1
  fi
  if ! takiia_is_local_db_host "$TAKIIA_URL_HOST"; then
    echo "Database host is not a local-only Takiia address." >&2
    return 1
  fi
  if [[ "$TAKIIA_URL_PORT" != "$expected_port" ]]; then
    echo "Database port is not the expected Takiia port." >&2
    return 1
  fi
  return 0
}
