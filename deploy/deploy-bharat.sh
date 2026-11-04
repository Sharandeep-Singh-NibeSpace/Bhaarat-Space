#!/usr/bin/env bash
# Deploy Bharat Space beside the apps already on this VPS.
#
# Public URL: http://200.97.168.12/Bharat
# This script only adds a /Bharat location. It does not edit the other
# location blocks, and it listens on 127.0.0.1:3010 so it does not take
# ports 3000, 8000, 8080, or 9090.
#
# Run on the server as root, after the project has been uploaded:
#   bash deploy/deploy-bharat.sh
#
# From Windows, pack first with deploy/pack-for-vps.ps1, upload the tar,
# then on the server:
#   mkdir -p /tmp/bharat-src
#   tar -xzf /root/bharat-space-deploy.tar.gz -C /tmp/bharat-src
#   bash /tmp/bharat-src/deploy/deploy-bharat.sh

set -euo pipefail

APP_DIR=/var/www/bharat-space
PORT=3010
BASE_PATH=/Bharat
SNIPPET_DIR=/etc/nginx/snippets
SNIPPET_FILE="$SNIPPET_DIR/bharat-space.conf"
SERVICE_NAME=bharat-space
PUBLIC_IP=200.97.168.12

if [ "$(id -u)" -ne 0 ]; then
  echo "Run this script as root: bash deploy/deploy-bharat.sh"
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
SOURCE_DIR=$(cd "$SCRIPT_DIR/.." && pwd)

echo "Source: $SOURCE_DIR"
echo "Install: $APP_DIR"

if [ ! -f "$SOURCE_DIR/package.json" ] || [ ! -f "$SOURCE_DIR/package-lock.json" ]; then
  echo "package.json or package-lock.json is missing in $SOURCE_DIR"
  exit 1
fi

mkdir -p "$APP_DIR"

# Keep contact-form records and server env files across redeploys.
PRESERVE_DIR=$(mktemp -d)
if [ -f "$APP_DIR/data/inquiries.json" ]; then
  cp "$APP_DIR/data/inquiries.json" "$PRESERVE_DIR/inquiries.json"
fi
if [ -f "$APP_DIR/.env.production.local" ]; then
  cp "$APP_DIR/.env.production.local" "$PRESERVE_DIR/env.production.local"
fi

if [ "$SOURCE_DIR" != "$APP_DIR" ]; then
  echo "Copying project into $APP_DIR"
  tar -C "$SOURCE_DIR" \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=data/inquiries.json \
    -cf - . | tar -C "$APP_DIR" -xf -
fi

mkdir -p "$APP_DIR/data"
if [ -f "$PRESERVE_DIR/inquiries.json" ]; then
  cp "$PRESERVE_DIR/inquiries.json" "$APP_DIR/data/inquiries.json"
elif [ ! -f "$APP_DIR/data/inquiries.json" ]; then
  printf '[]\n' > "$APP_DIR/data/inquiries.json"
fi
if [ -f "$PRESERVE_DIR/env.production.local" ]; then
  cp "$PRESERVE_DIR/env.production.local" "$APP_DIR/.env.production.local"
fi
rm -rf "$PRESERVE_DIR"

ENV_FILE="$APP_DIR/.env.production.local"
touch "$ENV_FILE"
if grep -q '^NEXT_PUBLIC_BASE_PATH=' "$ENV_FILE"; then
  sed -i "s|^NEXT_PUBLIC_BASE_PATH=.*|NEXT_PUBLIC_BASE_PATH=${BASE_PATH}|" "$ENV_FILE"
else
  printf '\nNEXT_PUBLIC_BASE_PATH=%s\n' "$BASE_PATH" >> "$ENV_FILE"
fi

if ! command -v node >/dev/null 2>&1; then
  if [ -s /root/.nvm/nvm.sh ]; then
    # shellcheck disable=SC1091
    . /root/.nvm/nvm.sh
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Installing Node.js 20."
  echo "The app already running on port 3000 is not restarted."
  apt-get update -y
  apt-get install -y ca-certificates curl gnupg
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

if ! node -e 'const [maj, min] = process.versions.node.split(".").map(Number); process.exit(maj > 18 || (maj === 18 && min >= 18) ? 0 : 1)'; then
  echo "Node.js $(node -v) is too old. This app needs Node.js 18.18 or newer."
  echo "The system Node.js was not replaced, so the other applications stay as they are."
  exit 1
fi

NODE_BIN=$(command -v node)
echo "Using Node $(node -v) at $NODE_BIN"

cd "$APP_DIR"
export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"
# Do not set NODE_ENV=production here. npm would skip Tailwind and PostCSS,
# which the production build needs.
npm ci --no-audit --no-fund
npm run build

if [ ! -d "$APP_DIR/.next" ]; then
  echo "next build did not produce .next"
  exit 1
fi

if id www-data >/dev/null 2>&1 && [[ "$NODE_BIN" != /root/* ]]; then
  SERVICE_USER=www-data
else
  # A Node binary under /root is not readable by www-data.
  SERVICE_USER=root
fi

chown -R "$SERVICE_USER:$SERVICE_USER" "$APP_DIR"
chmod 750 "$APP_DIR/data"
chmod 640 "$APP_DIR/data/inquiries.json" || true
chmod 600 "$APP_DIR"/.env.local "$APP_DIR"/.env.production.local 2>/dev/null || true

SERVICE_FILE=/etc/systemd/system/${SERVICE_NAME}.service
sed \
  -e "s|__USER__|${SERVICE_USER}|g" \
  -e "s|__APP_DIR__|${APP_DIR}|g" \
  -e "s|__NODE__|${NODE_BIN}|g" \
  "$APP_DIR/deploy/bharat-space.service" > "$SERVICE_FILE"

# Stop only this unit, then refuse to continue if something else owns the port.
systemctl stop "$SERVICE_NAME" 2>/dev/null || true
if ss -ltn | awk '{print $4}' | grep -Eq "(^|:)${PORT}$"; then
  echo "Port ${PORT} is already in use by another program. Nothing else was changed."
  ss -ltnp | grep ":${PORT}" || true
  exit 1
fi

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"

# Next serves pages at / on this port. The public /Bharat prefix is added by
# nginx, and the HTML is already built with that prefix.
ready=0
for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -fsS -o /dev/null --max-time 5 "http://127.0.0.1:${PORT}/"; then
    ready=1
    break
  fi
  sleep 1
done

if [ "$ready" -ne 1 ]; then
  echo "Bharat Space did not answer on 127.0.0.1:${PORT}/"
  systemctl status "$SERVICE_NAME" --no-pager || true
  journalctl -u "$SERVICE_NAME" -n 40 --no-pager || true
  exit 1
fi

home_html=$(curl -fsS --max-time 20 "http://127.0.0.1:${PORT}/")
if ! grep -q "${BASE_PATH}/_next/" <<<"$home_html"; then
  echo "The build is not prefixed with ${BASE_PATH}. nginx was not changed."
  exit 1
fi

for path in /about /contact /image-analytics /test /images/EO.avif; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "http://127.0.0.1:${PORT}${path}")
  if [ "$code" != "200" ]; then
    echo "Expected 200 from http://127.0.0.1:${PORT}${path} but got ${code}. nginx was not changed."
    exit 1
  fi
done

if ! command -v python3 >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y python3
fi

declare -A NGINX_SEEN=()
NGINX_FILES=()
while IFS= read -r conf; do
  [ -n "$conf" ] || continue
  real=$(readlink -f "$conf")
  if [ -z "${NGINX_SEEN[$real]:-}" ]; then
    NGINX_SEEN[$real]=1
    NGINX_FILES+=("$real")
  fi
done < <(grep -RslI -E "location /data-analysis/|location /image-analysis/|proxy_pass http://127.0.0.1:3000" /etc/nginx 2>/dev/null || true)

if [ -n "${NGINX_FILE:-}" ]; then
  NGINX_TARGET=$(readlink -f "$NGINX_FILE")
elif [ "${#NGINX_FILES[@]}" -eq 1 ]; then
  NGINX_TARGET="${NGINX_FILES[0]}"
elif [ "${#NGINX_FILES[@]}" -eq 0 ]; then
  echo "The app is running on 127.0.0.1:${PORT}${BASE_PATH}"
  echo "Could not find the nginx file that contains the other sites."
  echo "Paste the contents of deploy/nginx-bharat.conf inside that server { } block, then run: nginx -t && systemctl reload nginx"
  exit 1
else
  echo "More than one nginx file contains the existing sites:"
  printf '  %s\n' "${NGINX_FILES[@]}"
  echo "Re-run with NGINX_FILE=/path/to/the/right/file so the wrong file is not edited."
  exit 1
fi

echo "nginx file: $NGINX_TARGET"
mkdir -p "$SNIPPET_DIR"
cp "$APP_DIR/deploy/nginx-bharat.conf" "$SNIPPET_FILE"

BACKUP="${NGINX_TARGET}.bak-bharat-$(date +%Y%m%d%H%M%S)"
cp -a "$NGINX_TARGET" "$BACKUP"

LOCATION_BEFORE=$(grep -c "location " "$NGINX_TARGET" || true)
python3 "$APP_DIR/deploy/insert_nginx_include.py" "$NGINX_TARGET"
LOCATION_AFTER=$(grep -c "location " "$NGINX_TARGET" || true)
if [ "$LOCATION_BEFORE" != "$LOCATION_AFTER" ]; then
  echo "The nginx edit changed an existing location block. Restoring $BACKUP"
  cp -a "$BACKUP" "$NGINX_TARGET"
  exit 1
fi

# Status codes for the sites that were already deployed. /Bharat is new, so it
# is not part of this list.
EXISTING_PATHS=(
  /
  /api/
  /admin
  /data-analysis/
  /image-analysis/
  /server-monitor
  /solar-system
  /test
  /uploads/
)

snapshot_codes() {
  local path code
  for path in "${EXISTING_PATHS[@]}"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "http://127.0.0.1${path}" || echo "err")
    printf '%s %s\n' "$code" "$path"
  done
}

BEFORE_CODES=$(snapshot_codes)

if ! nginx -t; then
  echo "nginx -t failed. Restoring $BACKUP"
  cp -a "$BACKUP" "$NGINX_TARGET"
  nginx -t
  exit 1
fi

systemctl reload nginx
sleep 1

AFTER_CODES=$(snapshot_codes)
if [ "$BEFORE_CODES" != "$AFTER_CODES" ]; then
  sleep 2
  AFTER_CODES=$(snapshot_codes)
fi
if [ "$BEFORE_CODES" != "$AFTER_CODES" ]; then
  echo "Another site answered differently after the nginx reload. Restoring $BACKUP"
  echo "Before:"
  echo "$BEFORE_CODES"
  echo "After:"
  echo "$AFTER_CODES"
  cp -a "$BACKUP" "$NGINX_TARGET"
  nginx -t
  systemctl reload nginx
  exit 1
fi

public_html=$(curl -fsS --max-time 20 "http://127.0.0.1${BASE_PATH}" || true)
if ! grep -q "${BASE_PATH}/_next/" <<<"$public_html"; then
  echo "http://127.0.0.1${BASE_PATH} did not serve Bharat Space. Restoring $BACKUP"
  cp -a "$BACKUP" "$NGINX_TARGET"
  nginx -t
  systemctl reload nginx
  exit 1
fi

for path in \
  "${BASE_PATH}/about" \
  "${BASE_PATH}/contact" \
  "${BASE_PATH}/image-analytics" \
  "${BASE_PATH}/test" \
  "${BASE_PATH}/images/EO.avif"
do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "http://127.0.0.1${path}")
  if [ "$code" != "200" ]; then
    echo "http://127.0.0.1${path} returned ${code} through nginx. Restoring $BACKUP"
    cp -a "$BACKUP" "$NGINX_TARGET"
    nginx -t
    systemctl reload nginx
    exit 1
  fi
done

redirect=$(curl -sI --max-time 20 "http://127.0.0.1${BASE_PATH}/about/" | awk 'tolower($1)=="location:" {print $2}' | tr -d '\r' || true)
if [ "$redirect" != "${BASE_PATH}/about" ]; then
  echo "Trailing-slash redirect went to '${redirect}' instead of ${BASE_PATH}/about. Restoring $BACKUP"
  cp -a "$BACKUP" "$NGINX_TARGET"
  nginx -t
  systemctl reload nginx
  exit 1
fi

echo
echo "Bharat Space is live at http://${PUBLIC_IP}${BASE_PATH}"
echo "Other nginx locations were checked and their status codes did not change."
echo "Logs: journalctl -u ${SERVICE_NAME} -n 50 --no-pager"
