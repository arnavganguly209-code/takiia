#!/usr/bin/env bash
set -euo pipefail

# Inspect-only. Does not copy, enable, or reload Nginx.
# Run on the VPS as root before activating the Takiia site file.

ENABLED="${TAKIIA_NGINX_ENABLED:-/etc/nginx/sites-enabled}"
AVAILABLE="${TAKIIA_NGINX_AVAILABLE:-/etc/nginx/sites-available}"
HOSTS=("takiia.com" "www.takiia.com" "api.takiia.com")

if [[ ! -d "$ENABLED" ]]; then
  echo "Nginx sites-enabled directory was not found." >&2
  exit 1
fi

conflicts=0
for host in "${HOSTS[@]}"; do
  matches="$(grep -Rsl --include='*' "server_name[^;]*[[:space:]]${host}[[:space:];]" "$ENABLED" 2>/dev/null || true)"
  if [[ -n "$matches" ]]; then
    echo "Hostname $host already appears in:"
    echo "$matches"
    while IFS= read -r file; do
      [[ -z "$file" ]] && continue
      if [[ "$(basename "$file")" != "takiia.conf" ]]; then
        echo "CONFLICT: $host is served by a non-Takiia site file."
        conflicts=1
      fi
    done <<< "$matches"
  else
    echo "Hostname $host is not present in $ENABLED."
  fi
done

if [[ -e "$AVAILABLE/takiia.conf" ]]; then
  echo "A Takiia available-site file already exists. Back it up before replacing it."
fi

if [[ "$conflicts" -ne 0 ]]; then
  echo "Refusing to recommend activation while another site owns a Takiia hostname." >&2
  exit 1
fi

echo "Preflight found no foreign server_name conflict for Takiia hostnames."
echo "Next operator step is a manual copy of infra/nginx/takiia.conf.example, then nginx -t."
