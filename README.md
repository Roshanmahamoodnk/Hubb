# HUBB حُبّ — Digital Launch Experience

A bilingual, motion-led commerce experience for HUBB, a process-backed Saudi sunflower-seed brand.

## Creative direction

**The Crack Is the Interface.**

The site turns the sunflower-seed ritual—open, crack, reveal, pass—into a launch story. Vacuum kernel infusion is the product. The pack stays in frame. Arabic leads.

Promise: **الطعم في اللب / The taste is in the kernel.** Hero line: **The perfect crack — every time.**

## Flavor system

| No. | English | Arabic | Band | Channels |
|---|---|---|---|---|
| 01 | Umami salt | ملح أومامي | salt olive | E-com + retail |
| 02 | Umami garlic | ثوم أومامي | garlic cream | E-com + retail |
| 03 | Umami capsicum | فلفل أومامي | capsicum red | E-com |
| 04 | Spice mix | بهار | spice burgundy | E-com + retail |
| 05 | Vanilla caramel chocolate | فانيليا كراميل شوكو | chocolate cocoa | E-com |
| 06 | Coffee cocoa | قهوة كاكاو | coffee dark | E-com + café |
| 07 | Lemon salt | ليمون وملح | citrus gold | E-com collectible |

Kernels stay naturally roasted gold. Color lives on the pack band and the outer dust — never as a painted kernel.

Retail / Panda / Othaim: 15g, 85g, 230g of umami salt, garlic and bahar only (230g SAR 16.90). E-com: 85g / 230g, louder packs, 230g SAR 26.90–29.90. Chocolate and coffee stay off the majlis table.

## Experience map

1. Full-bleed ritual video hero. Pack, accent, copy and ticket update together.
2. How to crack — three steps, 15g Now vs 230g Majlis.
3. Process chapter: 0.05 MPa, outer dust, roast + N2.
4. Comparison grid vs shell-salt, boiled-herb and loose souq.
5. Dual channel: loud e-com / calm retail.
6. Taste Lab as a flavor-vs-flavor drop.
7. Shop grid + Kernel Sampler.
8. Saudi neo-craft without a museum voice.
9. `prefers-reduced-motion` stills. Add-to-bag stays on the page.

## Repository map

```text
app/page.tsx                 Home
lib/catalog.ts               Process-backed SKU data
app/globals.css              Visual, responsive, and motion system
public/brand/                Approved logo lockup crop
public/products/             Pack plates (SVG) + legacy WebP worlds
public/video/                Wide, vertical and macro HUBB pack films
public/video/loops/          Six-second cinematic worlds (wired to new SKUs)
docs/research-blueprint.md   Benchmark study and motion plan
docs/HUBB_UX_MOTION_AUDIT.md V4 evidence, decisions and remaining QA
```

## Run locally

Requirements: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
npm test
```

Render static-site build:

```bash
npm ci
npm run build:render
```

```bash
npm run film:build
```

Requires `ffmpeg`. On a GPU host with NVIDIA Cosmos 3 serving at `COSMOS_API_URL`, the same command video-to-video transfers the pack films. See [cosmos/hubb/README.md](cosmos/hubb/README.md).

## Research and build blueprint

See [docs/research-blueprint.md](docs/research-blueprint.md) for the evidence matrix covering Cometeer, SMACKIN’, Bateel and others. Steal the system (ritual film, how-it-works, one memorable process number, comparison, sampler drop) — not the coffee.
