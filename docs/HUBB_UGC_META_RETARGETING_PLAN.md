# HUBB UGC + Meta Retargeting Launch Plan

## Executive decision

Run a six-week Saudi-first pilot around **“One Crack Later / بعد أول قرمشة.”** The commercial hero is the SAR 32 seven-flavor box. A SAR 5 single bag is useful for discovery, but it is unlikely to absorb creator, media, payment and delivery costs on its own. Optimize the campaign toward bundle-level average order value and repeat purchase.

This is a launch operating plan, not a forecast or guarantee. Media and creator bands must be replaced with HUBB's actual gross margin, delivery cost and existing Meta account baseline before spend is approved.

## Audience map

| Priority | Meta Custom Audience | Window | Message | Exclusions |
| --- | --- | --- | --- | --- |
| 1 | InitiateCheckout or AddToCart | 7 days | “The crack is still here” + return to cart | Purchasers 30 days |
| 2 | Product ViewContent | 14 days | Flavor-specific creator reaction | Purchasers 30 days |
| 3 | `taste_lab_completed` | 30 days | Creator shares the same mood/flavor match | Purchasers 30 days |
| 4 | 50% video viewers and Instagram engagers | 30 days | “One crack later” social proof | Purchasers 30 days |
| 5 | Purchasers | 30–180 days | Cross-sell untried flavors / full-box reorder | Recent refund or support-risk users |

Start with Saudi Arabia, Arabic-first with English variants. Expand to GCC only after Saudi creative and checkout economics are proven. Do not over-segment a small warm pool: consolidate ad sets when delivery is constrained and watch frequency.

## Creator profile and hiring

Recruit Saudi/GCC micro creators for four real contexts: match table, night drive (parked car or passenger only), majlis hospitality and taste reviewer. Select on cultural fluency, hook delivery, product handling, clean 9:16 footage, audio, editing rhythm and reliability—not follower count alone.

### Paid launch bands

- Starter: SAR 450–800 for one 15–30 second edited vertical, one hook, captions, one revision and organic brand usage.
- Performance: SAR 900–1,500 for one core edit, three hook variants, clean B-roll selects and 90-day paid-social usage.
- Creator-handle partnership ad permission: add roughly 30–50%, negotiated explicitly.
- Retainer: SAR 2,400–5,000 for three to five monthly videos after a creator proves performance.

Rates are planning ranges. Contract separately for posting, raw footage, category exclusivity, territory, duration and renewals. Avoid perpetual buyouts by default.

### Selection scorecard (100 points)

- First-two-second hook: 25
- Believability and cultural fit: 20
- Product and pack clarity: 15
- Pacing / rewatch potential: 15
- Technical picture and audio: 10
- Brand and ad-policy safety: 10
- On-time delivery: 5

Hiring flow: portfolio screen → 15-minute fit call → paid test brief → 48-hour scored review → rights negotiation → performance retainer. Never request unpaid speculative production.

## Creative system

Produce four concepts, three hooks per concept and two CTAs: **24 addressable variants**. Deliver 9:16 master files with key copy inside platform safe zones, burned Arabic captions, licensed/original audio, clean B-roll and no unsupported health, energy or nutrition claims.

1. **One Crack Later:** “قلت باخذ حبة…” → one seed → escalating pass-around → pack beauty shot → “One Crack Later.”
2. **Cart Return:** “لسه تفكر في اللون؟” → creator names the flavor/mood → box reveal → “Your bag is still here.”
3. **Taste Match:** “طلع مزاجي…” → quick Taste Lab result → creator reaction → matched pack → “Find yours.”
4. **Seven at the Table:** seven packs passed through a match-night or majlis group → each person claims a color → full-box CTA.

Hook examples:

- “قلت باخذ حبة… بس اسمع القرمشة.”
- “إذا اخترت هذا اللون، أعرف مزاجك.”
- “لسه تاركها في السلة؟ هذا تذكير بدون ضغط.”

CTA ladder: flavor viewers go to the exact flavor page; Taste Lab users return to their saved match; cart abandoners return to checkout; video engagers go to the campaign landing page; past purchasers see the seven-flavor box.

## Meta implementation

Use the Sales objective with website conversion location. Install Meta Pixel plus Conversions API only after HUBB has a reviewed privacy notice and consent behavior. Track `PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase`, and a custom `taste_lab_completed` event. Send a shared `event_id` for browser/server deduplication and verify currency/value/content IDs.

Build product-level audiences from content IDs and exclude purchasers from abandonment sets. Use partnership ads for proven creators only after written authorization. Keep a standard brand-handle version of every winning edit so delivery does not depend on one creator permission.

## Budget scenarios (six weeks)

| Scenario | Creator production | Media | Tracking / landing QA | Contingency | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Lean proof | SAR 5,000 | SAR 5,000 | SAR 1,000 | SAR 1,000 | **SAR 12,000** |
| Standard pilot | SAR 8,500 | SAR 13,000 | SAR 1,500 | SAR 2,000 | **SAR 25,000** |

Within media, begin around 50% cart/product retargeting, 25% video/Instagram re-engagement and 25% creative-cell testing. Rebalance weekly based on marginal CPA and audience frequency. Do not force the full budget into a saturated warm audience.

## Measurement and decision rules

Set the maximum allowable CPA from contribution margin: net revenue minus product cost, fulfillment, payment fees, delivery subsidy, returns and variable support. Scale only when CPA is below that ceiling and purchase data is trustworthy.

- Creative leading indicators: 3-second hold, 25% view, average watch time and outbound CTR versus the HUBB account baseline.
- Funnel: landing-page-view → add-to-cart → checkout → purchase, split by audience, placement, creator and hook.
- Refresh a creative when frequency rises and CTR or hold rate declines materially.
- Kill technical failures immediately; pause creative cells after enough spend for a meaningful comparison, not after a handful of impressions.
- Week 1: instrumentation and creator tests. Weeks 2–3: identify hook/creator winners. Weeks 4–5: rights and iteration. Week 6: incrementality review, cohort quality and retainer decisions.

## Rights, safety and compliance checklist

- Creator is 18+; every visible person has a release.
- Written scope covers territory, channels, paid usage term, edit rights, raw footage, exclusivity and renewal fee.
- Creator uses the required paid-partnership/ad disclosure.
- Music and third-party locations/assets are cleared for paid use.
- No driving while filming; no unsafe seed-eating stunt; no unsupported health or performance claim.
- Store consent and deletion instructions exist before Pixel/CAPI activation.
- Final ads, spend and creator contracts receive accountable human approval.

## Pages delivered

- `/creators`: public paid-roster brief, creator archetypes, rates, process and application requirements.
- `/ugc-retargeting`: return experience for product viewers, Taste Lab users, cart abandoners and video engagers.

Before recruitment goes live, connect a verified HUBB submission address/form and consent release. Before ads go live, connect the real checkout/payment flow, Meta Business assets, consent management, Pixel/CAPI and verified Purchase events.
