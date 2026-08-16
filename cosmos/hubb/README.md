# HUBB × NVIDIA Cosmos video pipeline

HUBB uses NVIDIA Cosmos 3 to turn pack-study videos into more physically realistic
worlds. The live website still shows **approved pouches** composited on cinematic
plates. It does not invent people, hands, Saudi locations, or Matcha kernels with
a green coating.

## What this folder is

| Path | Role |
|---|---|
| `specs/seven-worlds-edge.json` | Cosmos Framework `video2video` spec (edge + blur) |
| `prompts/seven-worlds.json` | Dense Generator caption for the 15-second film |
| `vllm-omni-recipes.md` | Written at build time with per-SKU prompts |

Do not vendor the NVIDIA Cosmos source tree in this repository. Clone it beside
the site when you have a GPU:

```bash
gh repo clone NVIDIA/cosmos
```

## Local films (no GPU)

```bash
python3 scripts/make-realistic-films.py
```

This composites each approved pouch onto a photoreal flavor plate, Ken-Burns
the stills into a 15-second seven-chapter film, writes wide/vertical/mobile
encodes, seven 6-second SKU loops, a macro crack study, and a Sobel edge
control map at `public/video/controls/hubb-seven-worlds-edge.mp4`.

## Video-to-video on a Cosmos host

1. Follow [NVIDIA/cosmos](https://github.com/NVIDIA/cosmos) to serve
   Cosmos3-Nano or Cosmos3-Super with vLLM-Omni.
2. Point the HUBB client at that server:

```bash
export COSMOS_API_URL=http://127.0.0.1:8000
python3 scripts/cosmos-transfer-hubb.py --all
```

The client posts the existing HUBB film as `input_reference` and the edge
control as a transfer hint. Outputs land in `public/video/cosmos/`.

Cosmos Framework equivalent (from the cosmos-framework checkout):

```bash
.venv/bin/python -m cosmos_framework.scripts.inference \
  --parallelism-preset=latency \
  -i cosmos/hubb/specs/seven-worlds-edge.json \
  -o work/cosmos-out/ \
  --checkpoint-path Cosmos3-Nano \
  --seed 2026
```

## Guardrails for HUBB

- Keep pack typography from the approved dieline. Do not ask the model to redraw Arabic.
- Matcha kernels stay naturally roasted gold.
- No people, faces or hands in generated worlds until a real shoot replaces them.
- Website copy should describe a pack study, not an AI demo.
