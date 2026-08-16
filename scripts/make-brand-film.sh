#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIDEO_DIR="$ROOT_DIR/public/video"
ICON_DIR="$ROOT_DIR/public/icons"

mkdir -p "$VIDEO_DIR" "$ICON_DIR"

PRODUCTS=(
  "$ROOT_DIR/public/products/classic.webp"
  "$ROOT_DIR/public/products/lemon-salt.webp"
  "$ROOT_DIR/public/products/hot-salt.webp"
  "$ROOT_DIR/public/products/spices.webp"
  "$ROOT_DIR/public/products/ghawa.webp"
  "$ROOT_DIR/public/products/matcha.webp"
  "$ROOT_DIR/public/products/americano.webp"
)

INPUTS=()
for product in "${PRODUCTS[@]}"; do
  INPUTS+=( -loop 1 -t 2.5 -i "$product" )
done

WIDE_FILTER='
[0:v]scale=1920:2880,crop=1920:1080:0:260+70*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v0];
[1:v]scale=1920:2880,crop=1920:1080:0:520+82*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v1];
[2:v]scale=1920:2880,crop=1920:1080:0:960+62*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v2];
[3:v]scale=1920:2880,crop=1920:1080:0:430+78*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v3];
[4:v]scale=1920:2880,crop=1920:1080:0:820+66*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v4];
[5:v]scale=1920:2880,crop=1920:1080:0:980+56*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v5];
[6:v]scale=1920:2880,crop=1920:1080:0:500+76*t,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v6];
[v0][v1]xfade=transition=wipeleft:duration=0.35:offset=2.15[x1];
[x1][v2]xfade=transition=slideup:duration=0.35:offset=4.30[x2];
[x2][v3]xfade=transition=wiperight:duration=0.35:offset=6.45[x3];
[x3][v4]xfade=transition=slidedown:duration=0.35:offset=8.60[x4];
[x4][v5]xfade=transition=wipeleft:duration=0.35:offset=10.75[x5];
[x5][v6]xfade=transition=fade:duration=0.35:offset=12.90,trim=duration=15,setpts=PTS-STARTPTS[v]'

ffmpeg -hide_banner -loglevel error -y "${INPUTS[@]}" \
  -filter_complex "$WIDE_FILTER" -map '[v]' -an -r 30 \
  -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  "$VIDEO_DIR/hubb-seven-worlds.mp4"

ffmpeg -hide_banner -loglevel error -y "${INPUTS[@]}" \
  -filter_complex "$WIDE_FILTER" -map '[v]' -an -r 30 \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 \
  "$VIDEO_DIR/hubb-seven-worlds.webm"

VERTICAL_FILTER='
[0:v]scale=1280:1920,crop=1080:1920:40+30*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v0];
[1:v]scale=1280:1920,crop=1080:1920:100-24*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v1];
[2:v]scale=1280:1920,crop=1080:1920:35+32*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v2];
[3:v]scale=1280:1920,crop=1080:1920:105-27*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v3];
[4:v]scale=1280:1920,crop=1080:1920:40+29*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v4];
[5:v]scale=1280:1920,crop=1080:1920:100-22*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v5];
[6:v]scale=1280:1920,crop=1080:1920:40+25*t:0,setsar=1,eq=contrast=1.04:saturation=1.08,format=yuv420p[v6];
[v0][v1]xfade=transition=wipeleft:duration=0.35:offset=2.15[x1];
[x1][v2]xfade=transition=slideup:duration=0.35:offset=4.30[x2];
[x2][v3]xfade=transition=wiperight:duration=0.35:offset=6.45[x3];
[x3][v4]xfade=transition=slidedown:duration=0.35:offset=8.60[x4];
[x4][v5]xfade=transition=wipeleft:duration=0.35:offset=10.75[x5];
[x5][v6]xfade=transition=fade:duration=0.35:offset=12.90,trim=duration=15,setpts=PTS-STARTPTS[v]'

ffmpeg -hide_banner -loglevel error -y "${INPUTS[@]}" \
  -filter_complex "$VERTICAL_FILTER" -map '[v]' -an -r 30 \
  -c:v libx264 -preset slow -crf 25 -movflags +faststart \
  "$VIDEO_DIR/hubb-seven-worlds-vertical.mp4"

ffmpeg -hide_banner -loglevel error -y -ss 5.8 -i "$VIDEO_DIR/hubb-seven-worlds.mp4" \
  -frames:v 1 -c:v libwebp -quality 84 "$VIDEO_DIR/hubb-seven-worlds-poster.webp"

for size in 192 512; do
  logo_width=$(( size * 82 / 100 ))
  ffmpeg -hide_banner -loglevel error -y \
    -f lavfi -i "color=c=0x0e0c09:s=${size}x${size}" \
    -i "$ROOT_DIR/public/brand/hubb-logo.webp" \
    -filter_complex "[1:v]scale=${logo_width}:-2[logo];[0:v][logo]overlay=(W-w)/2:(H-h)/2,format=rgba" \
    -frames:v 1 "$ICON_DIR/hubb-${size}.png"
done

printf 'Created HUBB films and PWA icons in public/video and public/icons.\n'
