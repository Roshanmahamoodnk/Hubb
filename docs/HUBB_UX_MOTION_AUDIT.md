# HUBB V4 — experience, motion and conversion audit

Date: 2026-08-16  
Scope: homepage, shop, product selection, Taste Lab, cart feedback, film, mobile installability, motion accessibility and performance.

## Executive verdict

The strongest asset is the seven-pack system: each pouch is recognizable, Arabic-first and visually collectible. The previous site showed that system well, but it sometimes sounded like an agency presentation instead of a snack brand, used a non-working concept-film placeholder, and interrupted comparison by opening the bag after every add.

V4 turns the site into a shopping experience with a point of view:

- one real 15-second pack film in WebM and MP4, plus a vertical social cut;
- a remembered Taste Lab result and a four-moment picker;
- a non-disruptive “Added” confirmation with explicit “Keep looking” and “View bag” choices;
- a restrained pointer halo, flavor-synced pack depth and scroll progress signal;
- install-to-home-screen support, two app shortcuts and a conservative offline shell;
- shorter, more conversational copy;
- reduced-motion handling and video pause/play control.

## Before/after audit

| Area | Before | V4 decision | Why it matters |
|---|---|---|---|
| Hero | Strong pack selector, long positioning line | “Open. Crack. Taste.” | Product and action land in one breath. |
| Film | Static background with a play button that did not play | Actual 15-second seven-pack film with chapter jumps | The interface now keeps its promise. |
| Add to bag | Opened the cart drawer after every add | Toast keeps the customer on the current page | Comparing seven flavors stays uninterrupted. |
| Personalization | Same sequence for every visitor | Remembers Taste Lab flavor and last ritual | Helpful continuity without collecting identity data. |
| Product discovery | Sensory switchboard only | Sensory switchboard + Match/Drive/Majlis/Study picker | Customers can shop by taste or by real moment. |
| Cursor/motion | Hero tilt and isolated reveals | Consistent pointer halo, progress signal and response labels | Movement communicates “view,” “pick,” “add” and “play.” |
| Mobile return | Manifest existed, but install path was incomplete | PNG icons, service worker, custom prompt and shortcuts | Repeat visitors can keep HUBB beside other apps. |
| Copy | Several long, presentation-like statements | Short lines written for customers | Easier to scan, say and remember. |
| Accessibility | Reduced-motion CSS existed | Reduced-motion also stops film and removes pointer effects | Motion remains optional. |

## Award-reference study: what transferred

These are references, not templates. No layout, copy or identity was copied.

| Reference | Recognition / evidence | Useful pattern | HUBB translation |
|---|---|---|---|
| [TeaFlow](https://www.awwwards.com/sites/teaflow) | Awwwards Honorable Mention; page highlights cart, custom cursor, main animation and product pages | Cursor feedback belongs to the commerce system, not just the hero | Pointer halo changes meaning on View, Pick, Add, Play and Bag controls. |
| [SILV](https://www.awwwards.com/sites/silv) | Awwwards Honorable Mention; hero, scroll, review and hover animations are highlighted | Repeatable motion language across the journey | HUBB uses flavor color and transform/opacity feedback from hero through product cards. |
| [NewmixCoffee](https://www.awwwards.com/sites/newmixcoffee) | Awwwards Honorable Mention; tactile mixing interaction, category interaction and gallery motion | Let the ritual become the interface | HUBB maps position → crack → reveal and lets the pack respond to the hand/pointer. |
| [Partake Foods](https://www.awwwards.com/sites/partake-foods) | 2026 Awwwards nominee; homepage, navigation, product page and GSAP animation highlighted | Packaging identity should stay visible through every commerce surface | Each HUBB moment, chapter and toast keeps the actual pouch and flavor code visible. |
| [PAWWW](https://www.awwwards.com/sites/pawww) | Awwwards Honorable Mention; playful hover and collision interactions highlighted | Delight can be small and frequent | HUBB uses compact feedback rather than a heavy full-screen transition for every click. |

The design guardrail is usability. Awwwards’ own scoring separates design, usability and creativity; motion cannot compensate for a broken task. The site therefore keeps native links, visible focus, Escape-to-close cart behavior and explicit video control.

## Motion and performance rules

1. Animate meaning: pack choice, add confirmation, film state, progress.
2. Use transform and opacity for moving interface elements. Web.dev recommends these properties because they can remain in the compositing stage: [high-performance CSS animations](https://web.dev/articles/animations-guide).
3. Do not animate layout on pointer move.
4. Do not autoplay sound. The film is silent, muted and inline; Web.dev documents this pattern for web video: [video basics](https://web.dev/articles/video-basics).
5. Serve WebM first and MP4 as fallback. The wide files are approximately 2.2 MB and 4.3 MB.
6. Pause motion for `prefers-reduced-motion`. W3C guidance says non-essential interaction animation should be suppressible: [WCAG animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
7. Keep the custom cursor additive. The native cursor is not removed.

## Installability

The app prompt follows the browser event instead of showing a dead “install” button. Web.dev recommends listening for `beforeinstallprompt`, storing the event and triggering it from a customer action: [custom install experience](https://web.dev/articles/customize-install).

Included:

- standalone manifest;
- 192px and 512px maskable icons;
- `/shop` and `/taste-lab` app shortcuts;
- app-installed detection;
- iOS Add to Home Screen guidance;
- network-first service worker with a small offline shell;
- no video caching, which avoids filling device storage.

## Human copy system

Voice rule: one idea per line, ordinary words, no unsupported claims.

Approved recurring lines:

- “Open. Crack. Taste.”
- “Seven flavors. Start with one.”
- “Find tonight’s crack.”
- “Pick the moment.”
- “Added. Keep looking.”
- “One bag is enough to start.”

Avoid:

- explaining that the site is innovative;
- self-congratulating design language on shopping surfaces;
- fake scarcity or fake reviews;
- unverified health, ingredient, local-production or bestseller claims;
- copy that talks about “AI,” templates or design trends to the customer.

## Video delivery

| Asset | Use | Duration | Approx. size |
|---|---|---:|---:|
| `hubb-seven-worlds.webm` | Preferred website film | 15s | 2.2 MB |
| `hubb-seven-worlds.mp4` | Website fallback | 15s | 4.3 MB |
| `hubb-seven-worlds-vertical.mp4` | Reels/TikTok/Shorts draft | 15s | 5.1 MB |
| `hubb-seven-worlds-poster.webp` | Reduced motion / loading | still | 0.22 MB |

The current film is an honest pack study made from approved product imagery. It does not pretend to show customers, a factory or a Saudi location. The real production phase should replace or extend it with macro seed cracking, real hands, real match-night/majlis use and recorded crack sound. Matcha kernels must remain naturally roasted, never green-coated.

## V6 conversion pass

The film is now a shopping surface without becoming an advert grid. Its chapter rail controls the active SKU, and a compact card follows that chapter with the real pack, Arabic and English flavor name, price, taste-note link and add action. Video remains `preload="none"`; commerce was added without bringing the film into the first-load path.

Taste memory now has one honest rule: HUBB remembers one preferred flavor on the customer’s device. The Taste Lab and flavor detail pages write to the same preference, the home page welcomes the choice back, and the account surface lets a member change it across all seven colors. When a dedicated Supabase project is connected, the preference also syncs to the member’s own RLS-protected profile.

The signed-in account is no longer a placeholder. It is prepared to show recent orders and their SKU packs, status, total and date, then rebuild the exact order in the device-local bag with one tap. Checkout sends unsigned customers to sign in with explicit reassurance that their bag stays on the device. The mobile menu now exposes the account directly.

Release checks: 12 rendered-route and source-invariant tests pass, the bounded Vinext production build passes, the install cache is versioned to V6, and lint has no errors. Product photography intentionally remains on plain `<img>` elements in the current static-export architecture; the remaining lint notices are advisory image-optimization warnings, not runtime failures.

## Remaining production priorities

1. Shoot one 15-second macro ritual film and seven 6-second SKU loops.
2. Photograph the back of every final pack after nutrition/legal approval.
3. Connect verified price, inventory, delivery and payment data before accepting money.
4. Connect production Supabase Auth/Orders/Storage only after project credentials and RLS review.
5. Run Arabic copy review with a Saudi editor.
6. Run real-device checks on low-memory Android, iPhone Safari and dim-screen outdoor use.

## Commerce data guardrails

The future Supabase order function calculates price from database products, never from a number sent by the browser. V4 also aligns the SAR 3 full-set saving in the client and the SQL function. The schema keeps RLS enabled, uses ownership checks for customer reads, takes admin authorization only from `app_metadata`, revokes default function execution and grants the order RPC only to authenticated users. These choices follow Supabase’s current guidance on [database function privileges](https://supabase.com/docs/guides/database/functions) and [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

The schema includes explicit role grants rather than relying on automatic public-schema exposure, matching Supabase’s announced [2026 Data API exposure change](https://supabase.com/changelog). The SQL remains a reviewed foundation file, not an applied production migration: no HUBB Supabase project credentials are connected in this repository. Run the project’s RLS tester/advisors and an order transaction test before production deployment.

## Conversion measurement plan

Track only events needed to improve the journey:

| Event | Question |
|---|---|
| `hero_flavor_selected` | Which packs create curiosity? |
| `moment_selected` | Which ritual drives discovery? |
| `taste_lab_completed` | Does guided choice reduce indecision? |
| `film_played` / `film_completed` | Does the film earn attention? |
| `product_added` | Which flavor converts? |
| `add_notice_view_bag` / `add_notice_keep_shopping` | Does non-disruptive feedback improve multi-SKU baskets? |
| `pwa_install_accepted` | Do repeat customers value quick return? |
| `checkout_started` / `order_completed` | Where does commerce drop? |

Do not optimize for cursor movement, raw time-on-site or animation plays alone. The primary outcomes are flavor discovery, add-to-bag rate, multi-SKU basket rate, checkout completion and return visits.
