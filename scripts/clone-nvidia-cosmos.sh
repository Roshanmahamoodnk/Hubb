#!/usr/bin/env bash
set -euo pipefail
DEST="${1:-work/cosmos}"
mkdir -p "$(dirname "$DEST")"
if [ -d "$DEST/.git" ]; then
  git -C "$DEST" pull --ff-only
else
  gh repo clone NVIDIA/cosmos "$DEST"
fi
printf 'NVIDIA Cosmos is at %s\n' "$DEST"
printf 'HUBB transfer specs: cosmos/hubb/\n'
