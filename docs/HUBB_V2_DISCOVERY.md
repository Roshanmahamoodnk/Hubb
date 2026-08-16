# HUBB V2 — discovery, persuasion system and build blueprint

Date: 2026-08-16  
Scope: multi-page bilingual Saudi e-commerce experience for seven in-shell sunflower-seed SKUs.

## The strategic decision

HUBB should not imitate a snack site. It should behave like a taste instrument: every meaningful click reveals a flavor, ritual, sound or product fact, while the buying action stays one step away. The experience combines three proven mechanics without borrowing another brand’s visual skin:

1. guided discovery and bundles from premium direct-to-consumer food;
2. unapologetic flavor confidence from youth snack brands;
3. Saudi gifting, craft and hospitality codes from regional luxury commerce.

The proprietary HUBB idea is **crack → reveal → taste**. It governs interaction, copy, motion and the purchase journey.

## Ten reference experiences and the usable lesson

| Reference | Useful conversion/design mechanic | HUBB translation | Do not copy |
|---|---|---|---|
| [Comeeter](https://cometeer.com/) | Curated discovery, mix-and-match, subscription framing | Taste Lab, Seven Crack Box, repeat-order account | Coffee visual language or capsule metaphors |
| [SMACKIN’](https://smackinsunflowerseeds.com/) | Strong flavor claims, sampler pack, guarantee, early-access capture | Confident SKU pages, starter set, First Crack Club | Typography, tone, palette or pack staging |
| [Bateel](https://bateel.com/en/dates/) | Saudi premium gifting and product provenance | Giftable seven-pack, hospitality-led Ghawa story | Date-palm luxury styling or ornament |
| [Graza](https://www.graza.co/) | Playful education, products with clear “jobs,” recipes | “Built for” rituals, direct seed education, journal | Mascot illustration or olive-oil voice |
| [Fly By Jing](https://flybyjing.com/) | Flavor arsenal, bundles, membership, editorial depth | Full taste spectrum, bundles, account and journal | Chinese visual/cultural codes |
| [Ghia](https://drinkghia.com/) | Sensory language and low-risk discovery sets | Salt/heat/roast/aroma profiles and mood matching | Aperitif art direction |
| [Partake](https://partakefoods.com/) | Trust, mission, transparent category education | Clear kernel/shell explanation and verified nutrition area | Founder-story structure or pastel system |
| [Liquid Death](https://liquiddeath.com/) | Lifestyle world, drops and a memorably consistent voice | First Crack Club and cultural moments | Shock language, gothic styling or merch model |
| [MiCha Kombucha on Awwwards](https://www.awwwards.com/sites/micha-kombucha) | Flavor interaction, microinteractions, gestures | Seven-color rail and reactive pack stage | Page composition and bottle interaction |
| [More Nutrition on Awwwards](https://www.awwwards.com/sites/more-nutrition) | Staged product motion and tactile transitions | Cinematic product chapters used sparingly | Heavy 3D, audio autoplay and scroll capture |

## Conversion journey

| Stage | Customer thought | Interface answer | Primary action |
|---|---|---|---|
| First 3 seconds | “What is this?” | One huge Arabic flavor, one pack, one colored signal | Switch flavor |
| 3–15 seconds | “Which one is me?” | Taste switchboard and four-question Taste Lab | Get a match |
| 15–45 seconds | “What will it feel like?” | Salt/heat/roast/aroma, ritual, crack story, real film | Enter SKU |
| Evaluation | “Is it credible?” | Natural-kernel explanation, real-media slots, articles | Add one pack |
| Basket building | “Should I try more?” | Related flavors and Seven Crack Box | Add bundle |
| Retention | “Why return?” | Account, saved orders, First Crack Club, drops | Sign up / reorder |

## Motion grammar

- **Crack:** a quick split, mask, or snap transition when an element opens.
- **Reveal:** content enters after the crack with a softer 400–700ms settle.
- **Taste:** color expands only after user intent; black remains the stable brand field.
- **Pass:** horizontal movement connects products and shared rituals.
- Respect `prefers-reduced-motion`; never hijack scrolling or autoplay audio.

The initial production stack uses [Motion](https://motion.dev/docs) for component and scroll motion. It intentionally avoids WebGL, GSAP and smooth-scroll interception in V2 launch so the visual experience stays fast and accessible. [GSAP](https://gsap.com/docs/v3/) and [Lenis](https://github.com/darkroomengineering/lenis) remain optional only for a future, tested campaign experience.

## Open-source intelligence stack

[Crawl4AI](https://github.com/unclecode/crawl4AI) belongs in a scheduled research pipeline—not in the shopper’s browser. Its job would be to capture public competitor page structures, product taxonomy, editorial cadence and metadata for a monthly human review. It must honor robots rules, rate limits, terms and copyright. It should never reproduce competitor copy or artwork.

Recommended pipeline:

1. maintained allowlist of official public brand URLs;
2. monthly Crawl4AI structured extraction;
3. normalized page-type and interaction inventory;
4. diff report flagging new bundles, content and navigation patterns;
5. human brand strategist decides what principle is useful;
6. original HUBB concept and copy are created from that principle.

## SEO and answer-engine discovery

- Separate Arabic and English URLs with self-referencing canonical and hreflang signals, following [Google’s localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).
- Product pages expose Product/Offer structured data; editorial pages expose Article; the guide exposes FAQ. Google recommends combining structured data with Merchant Center feeds for the broadest commerce eligibility: [e-commerce structured data](https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce).
- Product claims must match visible page content and final inventory/price. See [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product).
- `robots.txt` explicitly permits OAI-SearchBot and GPTBot on public editorial/product pages while keeping account, checkout and admin private. Bot definitions: [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
- `llms.txt` is included as an experimental machine-readable map based on the [llms.txt proposal](https://llmstxt.org/). It is not presented as a ranking guarantee.
- Build clusters around useful Saudi questions: how to crack seeds, match-night snacks, in-shell vs kernel, flavor selection, clean shell and verified nutrition.
- Add real Saudi product availability, merchant feed, local-business signals and Arabic editorial depth at launch. No technical file can substitute for authority, reviews and genuinely useful content.

## Content and real-media system

The site is designed so real production media replaces placeholders through stable media keys. People, Saudi locations, ingredients, factory/process footage and nutrition panels should be photographed or filmed—not AI-generated—because trust is part of the conversion mechanism. Approved pack renders can be used until the first physical pilot arrives.

## Commerce architecture

- Static, fast Next.js storefront and local cart for immediate browsing.
- Supabase Auth for customer accounts.
- Postgres + row-level security for products, profiles, orders and order lines.
- Supabase Storage for admin-managed product and film media.
- A server-priced database function creates orders; browser-submitted prices are ignored.
- Payment handoff remains an adapter boundary for a licensed Saudi gateway supporting the final required mix (for example mada/Apple Pay). No live capture is claimed before merchant onboarding.

## Launch gates

1. real pack photography and 15-second film replace concept slots;
2. verified nutrition, ingredients, allergens, price and inventory;
3. dedicated HUBB Supabase project and security-policy review;
4. payment-provider onboarding and signed webhook verification;
5. Arabic editorial review and legal/privacy pages;
6. performance budget: mobile LCP ≤2.5s at p75, INP ≤200ms, CLS ≤0.1;
7. structured-data, sitemap, Merchant Center and Search Console validation;
8. cart-to-checkout and account recovery testing on Saudi mobile networks.
