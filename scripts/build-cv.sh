#!/usr/bin/env bash
# Prints the portfolio's resume (index.html under its print stylesheet) to
#   cv/anis-tigrini-cv-en.pdf
#   cv/anis-tigrini-cv-fr.pdf
#
# The page is served over HTTP (not file://) so the TryHackMe stats JSON loads.
# Runs in the GitHub Pages workflow; locally: bash scripts/build-cv.sh
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-8123}"
CHROME="${CHROME:-$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)}"

if [ -z "$CHROME" ]; then
  echo "build-cv: Chrome/Chromium not found (set CHROME=/path/to/chrome)" >&2
  exit 1
fi

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 50); do
  if python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:$PORT/index.html')" 2>/dev/null; then break; fi
  sleep 0.1
done

mkdir -p cv

for lang in en fr; do
  out="cv/anis-tigrini-cv-$lang.pdf"
  "$CHROME" --headless=new --disable-gpu --no-sandbox \
    --no-pdf-header-footer --print-to-pdf-no-header \
    --virtual-time-budget=10000 \
    --print-to-pdf="$out" \
    "http://127.0.0.1:$PORT/index.html?lang=$lang" 2>/dev/null

  if [ ! -s "$out" ]; then
    echo "build-cv: failed to write $out" >&2
    exit 1
  fi
  echo "build-cv: wrote $out"
done
