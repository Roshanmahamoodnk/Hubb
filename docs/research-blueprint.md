# HUBB Website — Evidence & Creative Blueprint

## Outcome

Build a bilingual, mobile-first launch experience that makes HUBB feel like a new Saudi snack signal: premium enough for gifting, energetic enough for Gen Z, and clear enough to sell seven SKUs at a glance.

The design is original. The benchmark sites below are used to extract interaction and information patterns, not visual assets or layouts.

## Top 10 benchmark set

| Reference | Evidence observed | Pattern worth adapting for HUBB | What not to copy |
|---|---|---|---|
| [Cometeer](https://cometeer.com/) | The home page turns a new format into a simple ritual—melt, mix, enjoy—and repeats product proof through steps, recipes, and comparisons. | Make the crack/reveal/taste ritual a central scroll story; explain the differentiated product in seconds. | Its science-lab tone and subscription architecture. |
| [SMACKIN' Sunflower Seeds](https://smackinsunflowerseeds.com/) | Direct category benchmark with flavor discovery, bundles, limited editions, founder energy, and bold social-first merchandising. | Put the seven flavors first, use a collectible series, and make the sampler/variety behavior obvious. | American sports vernacular, emoji-heavy urgency, and its specific typography. |
| [Bateel KSA](https://bateel.com/en_sa/) | Saudi-origin premium dates organized around quality, luxury gifting, occasion, and restrained hospitality codes. | Use Saudi confidence, generous space, bone/gold material cues, and a gifting-ready chapter. | Traditional luxury minimalism as the whole experience; HUBB needs more youth energy. |
| [Fly By Jing](https://flybyjing.com/) | Culture-led founder voice and product-first food imagery position authenticity as contemporary, loud, and useful. | Let Arabic identity lead without explaining or exoticizing it; make flavor imagery tactile and close. | Its Sichuan color language or founder narrative structure. |
| [Graza](https://www.graza.co/) | Product naming and use cases turn a commodity into distinct characters; a simple packaging silhouette becomes a digital icon. | Give each SKU a recognizable mood and color code; use the pack as the interface's recurring character. | Green palette, illustrated olive language, or jokey copy voice. |
| [Omsom](https://omsom.com/) | “Proud + loud” positioning makes culture, saturated color, and convenience feel mutually reinforcing. | Treat Saudi visual culture as an active design system; allow expressive color without losing the black masterbrand. | Its exact maximalist density and Asian-American voice. |
| [OLIPOP](https://drinkolipop.com/) | A large flavor portfolio stays navigable through color, variety packs, and product-led imagery. | Use a fast seven-color navigation rail and a “find your flavor” behavior on mobile. | Health claims, soda nostalgia, and can-stacking compositions. |
| [Chamberlain Coffee](https://chamberlaincoffee.com/) | Gen-Z commerce balances approachable voice, creator familiarity, matcha/coffee categories, and bundles. | Keep interactions conversational, shareable, and low-friction; make Matcha and coffee flavors feel native to one system. | Creator-led equity or its mascot/illustration style. |
| [NewmixCoffee on Awwwards](https://www.awwwards.com/sites/newmixcoffee) | WebGL interaction translates the tactile act of mixing coffee into the digital experience. | Use motion to simulate a real ritual—cracking—not as unrelated decoration. Implement as progressive enhancement so the site stays fast. | Heavy 3D as a launch dependency. |
| [More Nutrition Matcha on Awwwards](https://www.awwwards.com/sites/more-nutrition) | Product staging combines 3D, gestures, GSAP, large imagery, and color-led animation. | Stage one hero pack at a time; transition the environmental color with the SKU; preserve user control. | Sound by default, long preloaders, and GPU-heavy effects on mobile. |

Additional movement references: [Awwwards animation gallery](https://www.awwwards.com/websites/animation/), [food and drink gallery](https://www.awwwards.com/websites/food-drink/), [parallax examples](https://www.awwwards.com/awwwards/collections/parallax/), [Moonshot Snacks](https://www.awwwards.com/sites/moonshot-snacks), and [MiCha Kombucha](https://www.awwwards.com/sites/micha-kombucha).

## Strategic synthesis

### Core idea

**The Crack Is the Interface.**

The physical behavior of sunflower seeds gives HUBB an ownable interaction language:

1. Closed shell = mystery / anticipation.
2. Crack = sharp motion, sound typography, and reveal.
3. Kernel = flavor payoff.
4. Passing the bag = social loop.

### Homepage narrative

1. **Hero:** one oversized pack; active color sweeps behind it; user selects 01–07.
2. **Positioning:** “Not just a seed. A Saudi snack signal.”
3. **Flavor explorer:** a full-screen product stage with Arabic-first names and a persistent seven-color rail.
4. **Crack ritual:** shell separates, natural roasted kernel appears, three-step copy.
5. **Saudi Neo-Craft:** calligraphy, Sadu rhythm, and maker thumbprint.
6. **Collectible set:** the seven black packs form a coherent block.
7. **Social identity:** “What’s your HUBB number?” creates a shareable flavor ticket.
8. **Launch CTA:** clear path back to flavor discovery.

## Motion system

| Motion token | Purpose | Desktop | Mobile | Reduced motion |
|---|---|---|---|---|
| Pack entrance | Signal a flavor change | 650–700 ms, slight depth and rise | 450 ms fade/rise | Instant dissolve |
| Color field | Maintain flavor recognition | 500–600 ms background transition | Same, no blur | Instant color change |
| Pointer parallax | Add premium tactility | Max 7° product tilt, 20 px layer drift | Disabled by pointer model | Disabled |
| Crack loop | Teach the ritual | 4 s shell open/reveal loop | Same with smaller travel | Static open state |
| Scroll reveals | Establish pacing | 750 ms, 34 px rise | 550 ms, 20 px rise | Content visible by default |
| Marquee | Add social energy | 26–30 s constant movement | 22–26 s | One static line |

Rules:

- Movement must reveal product meaning or orientation.
- Keep user controls available; autoplay pauses after selection or hover.
- Never require motion to read copy or navigate.
- Avoid audio autoplay.
- Reserve WebGL/3D for a later enhancement only after mobile LCP is safe.

## Performance and accessibility budget

- Target LCP under 2.5 seconds on a mid-tier 4G phone.
- Compress product imagery to AVIF/WebP after art approval; provide stable dimensions.
- Keep initial JavaScript lean; use CSS transforms and IntersectionObserver before adding GSAP.
- Maintain a 44 px minimum target for core mobile controls.
- Every interactive flavor has `aria-selected`; all pack images have useful alt text.
- Respect `prefers-reduced-motion` globally.
- Arabic text must have explicit direction and must be tested with production fonts before launch.

## Image-generation production pipeline

### 1. Source lock

Do not ask an image model to redraw the approved HUBB logo or final package typography. Use the approved flat artwork and dieline as immutable source assets. AI generates the environment, light, ingredients, and compositional plates; the real pack is composited later.

### 2. Master website plate prompt

> Premium commercial product photography plate for a Saudi Gen-Z sunflower seed brand, warm AlUla-inspired sandstone and soft black studio surfaces, golden-hour raking light from camera-left, highly realistic natural roasted striped sunflower seeds and golden kernels, subtle modern Najdi Sadu geometry expressed through light and shadow, energetic hand-painted accent in [SKU COLOR], tactile editorial composition, 85 mm lens, high contrast, premium but playful, generous negative space for product package compositing, no text, no logos, no pouch, no people, no green-coated kernels, no Japanese temple imagery, no Quranic text, no glossy plastic.

### 3. SKU modifiers

| SKU | Web plate cue |
|---|---|
| Classic | Cobalt blue paint sweep; salt crystal sparkle; clean, iconic composition. |
| Lemon Salt | Citrine yellow light shard; real lemon peel and restrained salt crystals. |
| Hot & Salt | Chili-red pigment cloud; realistic dried chili fragments; hard side light. |
| Spices | Saffron-orange dust; warm spice fragments; layered majlis warmth. |
| Ghawa | Copper reflection; coffee beans and cardamom; abstract dallah shadow only. |
| Matcha | Deep jade brush paint and small matcha powder trace; all kernels remain naturally roasted golden. |
| Americano | Matte espresso-brown plane; crema-colored highlight; dark coffee beans. |

### 4. Asset list

- One 16:9 hero environment per SKU.
- One 4:5 product-story plate per SKU.
- Three 9:16 social crops per launch wave.
- Transparent pack render at 2400 px height from the approved dieline, not AI typography.
- Transparent roasted seed and cracked-shell macro cutouts.
- One reusable sandstone texture and one soft-black texture.

### 5. Composite and QA

1. Place the approved product render into the generated plate.
2. Match contact shadow and light temperature.
3. Check the Arabic mark, flavor name, 01/07 numbering, and weight at 100% zoom.
4. Verify natural roasted kernels on every SKU; Matcha must not show green-coated kernels.
5. Export desktop AVIF/WebP at 2400 px wide and mobile at 1200 px wide.
6. Run a 100 px thumbnail test: brand, flavor color, and SKU number must remain recognizable.
7. Reject garbled script, cultural clichés, floating ingredients with impossible physics, or surfaces that imply unapproved pack finishes.

## Build phases

| Phase | Deliverable | Gate |
|---|---|---|
| 1. Visual prototype | Hero, flavor switcher, mobile navigation | All seven SKUs selectable; Classic defaults blue. |
| 2. Story system | Crack ritual, Saudi craft, collectible grid | Narrative works without animation. |
| 3. Production imagery | Approved composites and responsive crops | Arabic/pack details pass 100% QA. |
| 4. Commerce | Product detail, sampler, cart, market selector | SFDA content and final pricing available. |
| 5. Launch hardening | Analytics, SEO, accessibility, performance | Lighthouse and real-device QA complete. |

## Deferred decisions

- Final commerce platform and checkout.
- Price, shipping, and retail availability.
- Production Arabic/Latin type licenses.
- Final legal claims, nutrition, and product-detail content.
- Whether audio is used in campaign media (never autoplay on the website).
