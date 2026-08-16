# HUBB real-media production shot list

The website deliberately avoids synthetic people, places and “AI food photography.” Use real product, real hands and real Saudi settings. Approved packaging renders may bridge the pre-production phase.

The live V4 site now includes a cinematic 15-second pack-study film made from the approved pouch images composited onto photoreal flavor-world plates, plus a vertical cut, a macro crack study and seven 6-second SKU loops. It is finished web media, but it does not replace the real-hand macro shoot below.

| Media key | Deliverable | Composition | Website use |
|---|---|---|---|
| `home.hero.[sku]` | 7 × 4:5 high-resolution stills | Pack upright, golden sandstone, raking warm light, visible matte/foil contrast | Hero and SKU selector |
| `flavor.ingredients.[sku]` | 7 × 1:1 macro sets | Naturally roasted kernel, clean split shell, real ingredients; no green-coated Matcha kernel | SKU sensory world |
| `film.crack.15s` | 4K 16:9 + 9:16, 15 seconds | Hand positions seed, clean crack, kernel reveal; sound recorded separately | Home film stage/social |
| `ritual.match-night` | 16:9 and 4:5 | Real Saudi friends’ hands around match table; no identifiable faces required | Ritual story/journal |
| `ritual.road-trip` | 9:16 | Passenger-side use only, parked/controlled production, car tub later | Short-form/social |
| `ritual.majlis` | 16:9 | Pouches passed across a contemporary majlis, authentic props | Story/Ghawa |
| `process.roast` | 16:9 documentary footage | Only verified production steps at actual facility | Trust/story after launch |
| `pack.back.[sku]` | 7 × straight-on stills | Readable final nutrition, ingredients and regulatory marks | Product accordions/SEO |
| `ugc.template` | 9:16 edit template | Crack sound, flavor color, reaction, pack end card | Creator program |

## Film treatment

- macro lens, tactile sound, 24/60fps mix, natural skin texture;
- golden Saudi light with real night-match contrast;
- color enters through flavor ingredients, wardrobe accents and the pack brushstroke;
- no fake Arabic, generic “desert luxury,” torii/temple cues for Matcha, or factory imagery from stock libraries;
- collect model/property releases and music/SFX licenses before publishing.

## Delivery and CMS

- still master: 4000px long edge, 16-bit working file; web derivatives in AVIF/WebP;
- video master: ProRes 422; web H.264/H.265 with poster frame and captions;
- naming: `hubb_[media-key]_[sku]_[ratio]_v01.ext`;
- always add Arabic and English alt text, transcript/captions and focal-point coordinates;
- upload only through the admin media field after the dedicated Supabase Storage bucket is secured.
