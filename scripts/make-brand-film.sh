#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

python3 "$ROOT_DIR/scripts/make-realistic-films.py"
python3 "$ROOT_DIR/scripts/cosmos-transfer-hubb.py"

ICON_DIR="$ROOT_DIR/public/icons"
mkdir -p "$ICON_DIR"
for size in 192 512; do
  logo_width=$(( size * 82 / 100 ))
  ffmpeg -hide_banner -loglevel error -y \
    -f lavfi -i "color=c=0x0e0c09:s=${size}x${size}" \
    -i "$ROOT_DIR/public/brand/hubb-logo.webp" \
    -filter_complex "[1:v]scale=${logo_width}:-2[logo];[0:v][logo]overlay=(W-w)/2:(H-h)/2,format=rgba" \
    -frames:v 1 "$ICON_DIR/hubb-${size}.png"
done

printf 'Created HUBB cinematic films, Cosmos transfer recipes, and PWA icons.\n'
