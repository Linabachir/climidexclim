#!/usr/bin/env bash
set -euo pipefail

cd /root/climidex/apps/storefront

export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY="$(node -e 'const config = require("/root/climidex/ecosystem.config.js"); const app = config.apps.find((item) => item.name === "climidex-storefront"); process.stdout.write(app.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY)')"
export NEXT_PUBLIC_MEDUSA_BACKEND_URL="https://api.climidex.com"
export NEXT_PUBLIC_DEFAULT_REGION="fr"
export NEXT_PUBLIC_BASE_URL="https://climidex.com"

# Les valeurs propres à la production restent sur le serveur et hors de Git.
# `set -a` les exporte pour que Next.js puisse les figer dans le bundle client.
if [ ! -f .env.production.local ]; then
  echo "Missing apps/storefront/.env.production.local" >&2
  exit 1
fi
set -a
. ./.env.production.local
set +a
: "${NEXT_PUBLIC_STRIPE_KEY:?Missing NEXT_PUBLIC_STRIPE_KEY in .env.production.local}"

# Safari et certains caches intermédiaires peuvent conserver un ancien HTML
# pendant quelques minutes. Next.js supprimant normalement les anciens chunks
# lors du build, cet HTML se retrouverait alors sans CSS. On conserve les
# fichiers statiques du build précédent pour assurer la transition.
previous_static="$(mktemp -d)"
cleanup() {
  rm -rf -- "$previous_static"
}
trap cleanup EXIT

if [ -d .next/static ]; then
  cp -a .next/static/. "$previous_static/"
fi

npm run build

if [ -n "$(find "$previous_static" -mindepth 1 -print -quit)" ]; then
  cp -an "$previous_static/." .next/static/
fi

pm2 restart climidex-storefront --update-env
pm2 save
