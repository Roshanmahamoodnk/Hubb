---
name: award-caliber-brand-commerce
description: Researches, designs, implements, and audits distinctive award-caliber brand-commerce websites. Use for Awwwards-level art direction, packaging-led ecommerce, motion systems, cinematic product storytelling, interaction design, or when a site feels generic, static, or visually inconsistent.
---

# Award-caliber brand commerce

## Principle

Build desire, recognition, trust, and action in that order. Awards are evidence of craft, not the product goal. Never copy a reference's identity, layout, copy, or signature asset.

Read [RESEARCH_MEMORY.md](../../../docs/RESEARCH_MEMORY.md) before redesigning HUBB or another packaging-led commerce site.

## Workflow

1. Audit the real page at desktop and mobile sizes. Record its strongest owned asset, weakest credibility moment, conversion path, media dimensions, reduced-motion behavior, and largest critical assets.
2. Define one emotional word, one physical sensation set, and one visual metaphor. Name the direction. Reject generic dark-purple glow, glass-card grids, symmetric badge/H1/button heroes, and decorative motion.
3. Triangulate references: one awarded website, one non-web cultural reference, and one packaging-award reference. Borrow mechanics only.
4. Write a compact contract: display/text typography, OKLCH palette, layout DNA, texture, motion easing/duration/stagger, and one signature interaction.
5. Implement the first viewport and signature interaction with real product content. Use transform and opacity for motion. Keep native links, focus states, touch behavior, and `prefers-reduced-motion` fallbacks.
6. Make every narrative scene useful: discover a product, compare it, understand it, add it, or continue its story.
7. Validate build, keyboard flow, 320/768/1440 layouts, contrast, media source selection, no horizontal overflow, and no console errors.

## The human-attention algorithm

Use this sequence per viewport:

1. **Orient (0–1s):** unmistakable brand/product silhouette and a readable premise.
2. **Reward (1–4s):** one visual surprise caused by the brand idea.
3. **Invite (4–8s):** a clear, low-risk interaction with immediate feedback.
4. **Deepen:** reveal proof, sensory detail, process, or culture.
5. **Convert:** show the product, price, and action without breaking the story.

Do not optimize for raw time-on-page. Optimize flavor/product discovery, meaningful interaction completion, add-to-cart, multi-item baskets, and checkout completion.

## Motion budget

- Give 60% of the motion budget to one signature scene.
- Use one easing family and one duration range across the site.
- Hero choreography completes within 1.6 seconds.
- Ordinary reveals run once; scrub only narrative scenes.
- Pause hidden/offscreen media and respect data-saving preferences.
- Never use low-resolution video as a full-width desktop hero. Prefer a sharp poster or product choreography until production footage is credible.

## Packaging-led rules

- Preserve pack silhouette and legibility at thumbnail size.
- Treat each SKU color as navigation/data, not decoration.
- Show real material behavior: matte, foil, tear seam, shell, kernel, seasoning, hand scale.
- Keep Arabic art direction primary when the brand is Arabic-first; English supports rather than duplicates.
- Avoid invented factories, people, locations, ingredients, sustainability, health, scarcity, or reviews.

## Output

For research work, update `docs/RESEARCH_MEMORY.md`. For implementation, record the named direction, signature interaction, assets replaced, performance risks, accessibility behavior, and remaining production needs.

