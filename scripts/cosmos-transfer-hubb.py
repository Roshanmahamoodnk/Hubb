#!/usr/bin/env python3
"""Video-to-video HUBB films through NVIDIA Cosmos 3 Transfer.

Takes the cinematic pack-study videos produced by make-realistic-films.py and
sends them to a Cosmos 3 Generator endpoint (vLLM-Omni or Cosmos Framework).
Without COSMOS_API_URL the script writes control maps and curl recipes, then
exits 0 so local film builds still succeed.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public" / "video"
SPECS = ROOT / "cosmos" / "hubb"

NEGATIVE = (
    "blurry, distorted, low quality, jittery, deformed, extra fingers, "
    "green-coated sunflower kernels, fake Arabic calligraphy, people, faces, "
    "hands, stock desert cliches, Japanese temple, glossy plastic pouch, "
    "slideshow motion, floating product, unreadable pack typography"
)


def flavor_prompt(name: str, world: str, accent: str) -> str:
    return (
        f"Photoreal commercial product cinematography of an approved HUBB {name} "
        f"matte-black sunflower-seed pouch standing on warm AlUla sandstone. "
        f"{world} Golden-hour raking light from camera left, shallow depth of field, "
        f"85mm lens, physically accurate foil and matte pack materials, natural roasted "
        f"striped sunflower seeds and golden kernels, {accent} color entering only through "
        f"light and ingredients. Slow tactile camera push. No people, no hands, no faces, "
        f"no new logos, no invented Arabic, no green-coated kernels."
    )


PROMPTS = {
    "classic": flavor_prompt("Classic", "Coarse salt crystals sparkle on dark stone.", "cobalt-blue"),
    "lemon-salt": flavor_prompt("Lemon Salt", "Lemon peel and clean salt sit in the foreground.", "citrine-yellow"),
    "hot-salt": flavor_prompt("Hot & Salt", "Dried chili fragments catch hard side light.", "chili-red"),
    "spices": flavor_prompt("Spices", "Saffron dust and warm spice fragments drift in the air.", "saffron-orange"),
    "ghawa": flavor_prompt("Ghawa", "Coffee beans and cardamom rest in copper light.", "copper"),
    "matcha": flavor_prompt("Matcha", "A jade powder trace stays in the artwork; kernels stay naturally roasted gold.", "jade"),
    "americano": flavor_prompt("Americano", "Dark espresso beans sit in low-key after-hours light.", "espresso-brown"),
    "seven-worlds": (
        "Photoreal seven-chapter commercial film of HUBB sunflower-seed pouches. "
        "Each chapter holds one real matte-black pack in its flavor world, slow cinematic "
        "push, physically accurate materials, golden Saudi light, natural roasted kernels. "
        "No people, no hands, no fake Arabic, no green-coated Matcha kernels."
    ),
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def post_v2v(api: str, video: Path, prompt: str, dest: Path, size: str = "1280x720") -> None:
    boundary = "----HubbCosmosBoundary"
    extra = json.dumps({
        "use_resolution_template": False,
        "use_duration_template": False,
        "guardrails": True,
        "condition_frame_indexes_vision": [0, 1],
        "condition_video_keep": "first",
        "edge": {"control_path": str(VIDEO / "controls" / "hubb-seven-worlds-edge.mp4")},
        "control_guidance": 1.5,
    })
    fields = {
        "prompt": prompt,
        "negative_prompt": NEGATIVE,
        "size": size,
        "num_frames": "121",
        "fps": "24",
        "num_inference_steps": "35",
        "guidance_scale": "6.0",
        "flow_shift": "10.0",
        "seed": "2026",
        "extra_params": extra,
    }
    body = bytearray()
    for key, value in fields.items():
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(f'Content-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
    payload = video.read_bytes()
    body.extend(f"--{boundary}\r\n".encode())
    body.extend(
        f'Content-Disposition: form-data; name="input_reference"; filename="{video.name}"\r\n'
        "Content-Type: video/mp4\r\n\r\n".encode()
    )
    body.extend(payload)
    body.extend(b"\r\n")
    body.extend(f"--{boundary}--\r\n".encode())
    request = urllib.request.Request(
        api.rstrip("/") + "/v1/videos/sync",
        data=bytes(body),
        headers={
            "Accept": "video/mp4",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=3600) as response:
            dest.write_bytes(response.read())
    except urllib.error.URLError as error:
        raise SystemExit(f"Cosmos transfer failed: {error}") from error


def write_recipes() -> None:
    recipes = SPECS / "vllm-omni-recipes.md"
    lines = [
        "# HUBB Cosmos 3 video-to-video recipes",
        "",
        "Clone NVIDIA Cosmos, start a Generator server, then transfer the HUBB pack films:",
        "",
        "```bash",
        "gh repo clone NVIDIA/cosmos",
        "export COSMOS_API_URL=http://127.0.0.1:8000",
        "python3 scripts/cosmos-transfer-hubb.py --all",
        "```",
        "",
        "vLLM-Omni transfer uses `POST /v1/videos/sync` with the existing HUBB film as",
        "`input_reference` and the Sobel edge map in `public/video/controls`.",
        "",
    ]
    for key, prompt in PROMPTS.items():
        lines += [f"## {key}", "", prompt, ""]
    recipes.write_text("\n".join(lines))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--sku", choices=list(PROMPTS))
    args = parser.parse_args()
    SPECS.mkdir(parents=True, exist_ok=True)
    write_recipes()

    api = os.environ.get("COSMOS_API_URL", "").strip()
    targets = list(PROMPTS) if args.all else [args.sku] if args.sku else ["seven-worlds"]
    if not api:
        print("COSMOS_API_URL is unset. Wrote cosmos/hubb/vllm-omni-recipes.md")
        print("Local cinematic films remain in public/video; run transfer on a GPU host.")
        return 0

    VIDEO.mkdir(parents=True, exist_ok=True)
    out_dir = VIDEO / "cosmos"
    out_dir.mkdir(exist_ok=True)
    for key in targets:
        source = VIDEO / ("hubb-seven-worlds-cinema.mp4" if key == "seven-worlds" else f"loops/{key}.mp4")
        if not source.exists():
            raise SystemExit(f"Missing source video {source}")
        dest = out_dir / f"{key}.mp4"
        print(f"Transferring {source.name} -> {dest}")
        post_v2v(api, source, PROMPTS[key], dest)
    return 0


if __name__ == "__main__":
    sys.exit(main())
