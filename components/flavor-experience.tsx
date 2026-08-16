"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useCart } from "@/components/cart-provider";
import { SensoryBars } from "@/components/product-card";
import { flavors, formatSar, type Flavor } from "@/lib/catalog";

export function FlavorExperience({ flavor }: { flavor: Flavor }) {
  const { add } = useCart();
  const related = flavors.filter((item) => item.id !== flavor.id).slice(0, 3);
  return (
    <main className="page-main flavor-page" style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties}>
      <section className="flavor-hero-detail">
        <div className="flavor-title"><span>{flavor.number} / 07 · {flavor.sku}</span><h1>{flavor.ar}</h1><h2>{flavor.en}</h2><blockquote>{flavor.moodEn}</blockquote><p lang="ar">{flavor.moodAr}</p></div>
        <motion.div className="flavor-pack" initial={{ y: 60, rotate: -6, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}><i /><img src={flavor.image} alt={`HUBB ${flavor.en} pack`} /></motion.div>
        <div className="flavor-buy"><span>{flavor.weightGrams}G · IN-SHELL SUNFLOWER SEEDS</span><p>{flavor.noteEn}</p><div><button onClick={() => add(flavor.id)}>ADD TO BAG <b>{formatSar(flavor.priceSar)}</b></button><small>VAT included · delivery calculated later</small></div></div>
      </section>
      <section className="flavor-sense"><div><p>SENSORY SIGNAL · بصمة النكهة</p><h2>TASTE IT<br />BEFORE THE<br /><em>FIRST CRACK.</em></h2></div><SensoryBars flavor={flavor} /><aside><span>BUILT FOR</span><h3>{flavor.ritual}</h3><p>{flavor.tags.join(" · ")}</p></aside></section>
      <section className="ingredient-world"><div className="ingredient-art"><span className="kernel k1" /><span className="kernel k2" /><span className="shell s1" /><span className="shell s2" /><i /></div><div><p>THE PAYOFF · المكافأة</p><h2>THE COLOR IS THE SIGNAL.<br /><em>THE ROAST IS REAL.</em></h2><p>The flavor world may be vivid, but the centre stays a naturally roasted sunflower kernel. Matcha included—green belongs in the artwork, never as an artificial-looking kernel coat.</p></div></section>
      <section className="flavor-next"><p>NEXT CRACK · جرّب بعدها</p><div>{related.map((item) => <Link href={`/flavors/${item.id}`} key={item.id} style={{ "--next": item.color } as CSSProperties}><span>{item.number}</span><img src={item.image} alt="" /><b>{item.ar}</b><small>{item.en} ↗</small></Link>)}</div></section>
    </main>
  );
}
