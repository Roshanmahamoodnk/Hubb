#!/usr/bin/env python3
"""Build cinematic HUBB films from approved packs + photoreal plates.

The local path composites each SKU pouch onto a flavor world plate, then
Ken-Burns the stills into a 15-second seven-chapter film (wide + vertical),
six-second SKU loops, and a macro crack study. When COSMOS_API_URL is set,
scripts/cosmos-transfer-hubb.py can video-to-video the result through
NVIDIA Cosmos 3 Transfer.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLATES = ROOT / "scripts" / "assets" / "plates"
PRODUCTS = ROOT / "public" / "products"
VIDEO = ROOT / "public" / "video"
LOOPS = VIDEO / "loops"
WORK = ROOT / "work" / "films"
SPECS = ROOT / "cosmos" / "hubb" / "specs"

CHAPTER = 2.49
XFADE = 0.40
FPS = 24
WIDE = (1920, 1080)
VERTICAL = (1080, 1920)
WEB = (1280, 720)
MOBILE = (720, 1280)

SKUS = [
    {
        "id": "classic",
        "plate": "hubb-plate-classic.webp",
        "color": "0x2459FF",
        "key": "0xc6a789",
        "wide_x": 0.56,
        "vert_y": 0.18,
    },
    {
        "id": "lemon-salt",
        "plate": "hubb-plate-lemon.webp",
        "color": "0xE7D829",
        "key": "0xc3a583",
        "wide_x": 0.54,
        "vert_y": 0.16,
    },
    {
        "id": "hot-salt",
        "plate": "hubb-plate-chili.webp",
        "color": "0xDF332F",
        "key": "0xc2a284",
        "wide_x": 0.55,
        "vert_y": 0.17,
    },
    {
        "id": "spices",
        "plate": "hubb-plate-spices.webp",
        "color": "0xD87522",
        "key": "0xc3a485",
        "wide_x": 0.57,
        "vert_y": 0.18,
    },
    {
        "id": "ghawa",
        "plate": "hubb-plate-ghawa.webp",
        "color": "0xB87333",
        "key": "0xc2a181",
        "wide_x": 0.56,
        "vert_y": 0.17,
    },
    {
        "id": "matcha",
        "plate": "hubb-roasted-seeds.webp",
        "color": "0x2E6D4A",
        "key": "0xbc9d7e",
        "wide_x": 0.55,
        "vert_y": 0.16,
        "grade": "colorchannelmixer=rr=0.86:gg=1.08:bb=0.90:aa=1",
    },
    {
        "id": "americano",
        "plate": "hubb-plate-americano.webp",
        "color": "0x604333",
        "key": "0xc2a482",
        "wide_x": 0.57,
        "vert_y": 0.18,
    },
]


def run(cmd: list[str], **kwargs) -> None:
    print("+", " ".join(str(part) for part in cmd[:8]), "..." if len(cmd) > 8 else "")
    subprocess.run(cmd, check=True, **kwargs)


def ffmpeg(*args: str) -> None:
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args])


def still_filter(sku: dict, width: int, height: int, pack_height: int, pack_x: str, pack_y: str) -> str:
    grade = sku.get("grade", "null")
    return f"""
[0:v]scale={width}:{height}:force_original_aspect_ratio=increase,crop={width}:{height},{grade},eq=contrast=1.06:saturation=1.07:gamma=0.97[bg];
[1:v]scale=-1:{pack_height},colorkey={sku["key"]}:0.32:0.20,format=rgba,split=2[p][s];
[s]colorchannelmixer=aa=0.40:rr=0:gg=0:bb=0,boxblur=16:2[shadow];
[bg][shadow]overlay={pack_x}+18:{pack_y}+28[bg2];
[bg2][p]overlay={pack_x}:{pack_y},unsharp=5:5:0.6,vignette=PI/5,format=rgb24
""".replace("\n", "")


def render_still(sku: dict, out: Path, size: tuple[int, int], vertical: bool) -> None:
    plate = PLATES / sku["plate"]
    pack = PRODUCTS / f"{sku['id']}.webp"
    w, h = size
    if vertical:
        pack_h = 1180
        pack_x = f"(W-w)/2"
        pack_y = f"H*{sku['vert_y']}"
    else:
        pack_h = 860
        pack_x = f"W*{sku['wide_x']}"
        pack_y = "(H-h)/2-24"
    ffmpeg(
        "-i", str(plate),
        "-i", str(pack),
        "-filter_complex", still_filter(sku, w, h, pack_h, pack_x, pack_y),
        "-frames:v", "1",
        str(out),
    )


def ken_burns(still: Path, out: Path, seconds: float, size: tuple[int, int], zoom_end: float, y_bias: str) -> None:
    w, h = size
    frames = int(round(seconds * FPS))
    src_w, src_h = int(w * 1.22), int(h * 1.22)
    zoom = f"min(1+{zoom_end - 1}*on/{frames},{zoom_end})"
    ffmpeg(
        "-loop", "1", "-i", str(still),
        "-filter_complex",
        f"[0:v]scale={src_w}:{src_h},zoompan=z='{zoom}':x='iw/2-(iw/zoom/2)':y='{y_bias}':d={frames}:s={w}x{h}:fps={FPS},"
        f"eq=contrast=1.04:saturation=1.05:brightness=0.01,noise=alls=4:allf=t+u,format=yuv420p",
        "-frames:v", str(frames),
        "-an", "-r", str(FPS),
        "-c:v", "libx264", "-preset", "fast", "-crf", "16", "-pix_fmt", "yuv420p",
        str(out),
    )


def xfade_concat(clips: list[Path], out: Path, fade: float = XFADE) -> None:
    inputs: list[str] = []
    for clip in clips:
        inputs += ["-i", str(clip)]
    graph = []
    last = "0:v"
    offset = CHAPTER - fade
    for index in range(1, len(clips)):
        label = f"x{index}"
        src = last if index == 1 else f"[{last}]"
        if index == 1:
            src = "[0:v]"
        graph.append(f"{src}[{index}:v]xfade=transition=fade:duration={fade}:offset={offset:.3f}[{label}]")
        last = label
        offset += CHAPTER - fade
    graph.append(f"[{last}]trim=duration=15,setpts=PTS-STARTPTS[v]")
    ffmpeg(
        *inputs,
        "-filter_complex", ";".join(graph),
        "-map", "[v]",
        "-an", "-r", str(FPS),
        "-c:v", "libx264", "-preset", "fast", "-crf", "16", "-pix_fmt", "yuv420p",
        str(out),
    )


def encode_mp4(src: Path, dest: Path, size: tuple[int, int], crf: int) -> None:
    w, h = size
    ffmpeg(
        "-i", str(src),
        "-an", "-r", str(FPS),
        "-vf", f"scale={w}:{h}:flags=lanczos,format=yuv420p",
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.1",
        "-preset", "slow", "-crf", str(crf), "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(dest),
    )


def encode_webm(src: Path, dest: Path, size: tuple[int, int], crf: int) -> None:
    w, h = size
    ffmpeg(
        "-i", str(src),
        "-an", "-r", str(FPS),
        "-vf", f"scale={w}:{h}:flags=lanczos,format=yuv420p",
        "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", str(crf), "-row-mt", "1",
        "-pix_fmt", "yuv420p",
        str(dest),
    )


def poster(src: Path, dest: Path, timestamp: float) -> None:
    ffmpeg("-ss", f"{timestamp:.2f}", "-i", str(src), "-frames:v", "1", "-c:v", "libwebp", "-quality", "84", str(dest))


def edge_control(src: Path, dest: Path) -> None:
    ffmpeg(
        "-i", str(src),
        "-vf", "scale=640:360,format=gray,sobel,eq=contrast=1.8:brightness=0.05,format=yuv420p",
        "-an", "-r", "12", "-c:v", "libx264", "-preset", "fast", "-crf", "32",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        str(dest),
    )


def crack_film(out: Path) -> None:
    crack = PLATES / "hubb-macro-crack.webp"
    seeds = PLATES / "hubb-roasted-seeds.webp"
    a = WORK / "crack-a.mp4"
    b = WORK / "crack-b.mp4"
    ken_burns(crack, a, 5.2, WIDE, 1.14, "ih/2-(ih/zoom/2)+18*on/120")
    ken_burns(seeds, b, 5.2, WIDE, 1.12, "ih/2-(ih/zoom/2)-12*on/120")
    ffmpeg(
        "-i", str(a), "-i", str(b),
        "-filter_complex", "[0:v][1:v]xfade=transition=fade:duration=0.8:offset=4.4,unsharp=5:5:0.4,vignette=PI/6,format=yuv420p",
        "-an", "-r", str(FPS), "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(out),
    )


def assert_size(path: Path, max_bytes: int) -> None:
    size = path.stat().st_size
    if size > max_bytes:
        raise SystemExit(f"{path.name} is {size} bytes; keep under {max_bytes}")
    if size < 400_000:
        raise SystemExit(f"{path.name} is only {size} bytes; encode looks empty")


def write_manifest() -> None:
    SPECS.mkdir(parents=True, exist_ok=True)
    manifest = {
        "model_mode": "video2video",
        "source": "public/video/hubb-seven-worlds-cinema.mp4",
        "edge": "public/video/controls/hubb-seven-worlds-edge.mp4",
        "skus": [sku["id"] for sku in SKUS],
    }
    (WORK / "manifest.json").write_text(json.dumps(manifest, indent=2))


def main() -> int:
    for path in (VIDEO, LOOPS, WORK, VIDEO / "controls"):
        path.mkdir(parents=True, exist_ok=True)

    wide_stills = []
    vert_stills = []
    for sku in SKUS:
        wide = WORK / f"{sku['id']}-wide.png"
        vert = WORK / f"{sku['id']}-vert.png"
        render_still(sku, wide, WIDE, vertical=False)
        render_still(sku, vert, VERTICAL, vertical=True)
        wide_stills.append(wide)
        vert_stills.append(vert)

    wide_clips = []
    vert_clips = []
    for sku, still in zip(SKUS, wide_stills):
        clip = WORK / f"{sku['id']}-wide.mp4"
        ken_burns(still, clip, CHAPTER, WIDE, 1.11, "ih/2-(ih/zoom/2)-8")
        wide_clips.append(clip)
    for sku, still in zip(SKUS, vert_stills):
        clip = WORK / f"{sku['id']}-vert.mp4"
        ken_burns(still, clip, CHAPTER, VERTICAL, 1.10, "ih*0.08+(ih-ih/zoom)/3")
        vert_clips.append(clip)

    wide_master = WORK / "seven-wide-master.mp4"
    vert_master = WORK / "seven-vert-master.mp4"
    xfade_concat(wide_clips, wide_master)
    xfade_concat(vert_clips, vert_master)

    encode_mp4(wide_master, VIDEO / "hubb-seven-worlds.mp4", WEB, 27)
    encode_webm(wide_master, VIDEO / "hubb-seven-worlds.webm", WEB, 38)
    encode_mp4(wide_master, VIDEO / "hubb-seven-worlds-cinema.mp4", WIDE, 24)
    encode_webm(wide_master, VIDEO / "hubb-seven-worlds-cinema.webm", WIDE, 36)
    encode_mp4(vert_master, VIDEO / "hubb-seven-worlds-vertical.mp4", VERTICAL, 26)
    encode_mp4(vert_master, VIDEO / "hubb-seven-worlds-mobile.mp4", MOBILE, 28)
    poster(VIDEO / "hubb-seven-worlds.mp4", VIDEO / "hubb-seven-worlds-poster.webp", 5.8)
    poster(VIDEO / "hubb-seven-worlds-mobile.mp4", VIDEO / "hubb-seven-worlds-mobile-poster.webp", 5.8)

    for sku, still in zip(SKUS, wide_stills):
        loop = LOOPS / f"{sku['id']}.mp4"
        ken_burns(still, WORK / f"{sku['id']}-loop-src.mp4", 6.0, WIDE, 1.08, "ih/2-(ih/zoom/2)")
        encode_mp4(WORK / f"{sku['id']}-loop-src.mp4", loop, (960, 540), 29)
        poster(loop, LOOPS / f"{sku['id']}-poster.webp", 1.2)

    crack_film(VIDEO / "hubb-crack-study.mp4")
    poster(VIDEO / "hubb-crack-study.mp4", VIDEO / "hubb-crack-study-poster.webp", 2.4)
    edge_control(VIDEO / "hubb-seven-worlds-cinema.mp4", VIDEO / "controls" / "hubb-seven-worlds-edge.mp4")
    write_manifest()

    assert_size(VIDEO / "hubb-seven-worlds.webm", 5_000_000)
    assert_size(VIDEO / "hubb-seven-worlds.mp4", 5_000_000)
    print("Created cinematic HUBB films in public/video.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
