# HUBB حُبّ — Digital Launch Experience

A bilingual, motion-led website prototype for HUBB, a seven-SKU Saudi sunflower-seed brand.

## Creative direction

**The Crack Is the Interface.**

The site transforms the sunflower-seed ritual—crack, reveal, taste, pass—into an interactive launch story. It combines the locked soft-black packaging system with one live flavor color, Arabic-first identity, a modern Najdi Sadu rhythm, and collectible 01/07–07/07 numbering.

## Seven-SKU system

| No. | English | Arabic | Digital accent |
|---|---|---|---|
| 01 | Classic | كلاسيك | Cobalt blue `#2459FF` |
| 02 | Lemon Salt | ليمون وملح | Citrine yellow `#E8DA26` |
| 03 | Hot & Salt | حار وملح | Chili red `#DF332F` |
| 04 | Spices | بهارات | Saffron orange `#D87522` |
| 05 | Ghawa | قهوة عربية | Copper `#B87333` |
| 06 | Matcha | ماتشا | Jade `#2E6D4A` |
| 07 | Americano | أمريكانو | Espresso `#604333` |

Matcha uses naturally roasted golden kernels; green appears in the visual flavor cue, not as a kernel coating.

## Experience map

1. Color-reactive hero and seven-flavor selector.
2. Positioning manifesto: “Not just a seed. A Saudi snack signal.”
3. Bilingual flavor stage with product, mood, and fast SKU rail.
4. Animated crack/reveal/taste ritual.
5. Saudi Neo-Craft story: calligraphy, Sadu rhythm, maker thumbprint.
6. Full collectible SKU grid.
7. Shareable “What’s your HUBB number?” ticket.
8. Launch close and flavor CTA.

## Interaction behavior

- Hero cycles through flavors until the visitor selects one.
- Product stage, interface accent, copy, and share card update together.
- Pointer movement adds restrained product depth on desktop.
- Scroll reveals pace the narrative.
- `prefers-reduced-motion` removes looping and transitional movement.
- Arabic/English control changes the main narrative copy without hiding SKU names.

## Repository map

```text
app/page.tsx                 Interactive content and seven-SKU data
app/globals.css              Visual, responsive, and motion system
app/layout.tsx               Metadata and document shell
public/brand/                Approved logo lockup crop
public/products/             Optimized 1024×1536 product WebP assets
docs/research-blueprint.md   Top-10 benchmark study, motion plan, image pipeline
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

Use `out` as the Render publish directory. No server, database, or paid instance is required for the current launch experience.

## Production handoff checklist

- Replace prototype package renders with color-managed dieline exports.
- Replace the raster logo crop with the calligrapher’s final SVG master.
- Add licensed Arabic and Latin production fonts.
- Confirm final flavor copy, legal claims, ingredients, nutrition, pricing, and availability.
- Connect the chosen commerce stack and analytics.
- Generate and composite the final web photography plates using the workflow in `docs/research-blueprint.md`.
- Run Arabic QA, keyboard QA, real-device performance, and 100 px thumbnail tests.

## Research and build blueprint

See [docs/research-blueprint.md](docs/research-blueprint.md) for the evidence matrix covering Cometeer, SMACKIN’, Bateel, Fly By Jing, Graza, Omsom, OLIPOP, Chamberlain Coffee, and two Awwwards motion references, plus the image-generation prompt system and phased production plan.
