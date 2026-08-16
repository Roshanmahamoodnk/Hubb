"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
import { flavors, formatSar, starterBundle } from "@/lib/catalog";

const filters = [
  { id: "all", label: "ALL SEVEN", ar: "الكل" },
  { id: "bright", label: "BRIGHT", ar: "منعش" },
  { id: "heat", label: "HEAT", ar: "حار" },
  { id: "roast", label: "ROAST-LED", ar: "تحميص" },
];

export function ShopExperience() {
  const [filter, setFilter] = useState("all");
  const { addBundle } = useCart();
  const visible = useMemo(() => {
    if (filter === "bright") return flavors.filter((f) => ["lemon-salt", "matcha", "classic"].includes(f.id));
    if (filter === "heat") return flavors.filter((f) => ["hot-salt", "spices"].includes(f.id));
    if (filter === "roast") return flavors.filter((f) => ["classic", "ghawa", "americano"].includes(f.id));
    return flavors;
  }, [filter]);
  return (
    <main className="page-main shop-page">
      <header className="shop-hero"><div><p>PICK YOUR BAG · اختر نكهتك</p><h1>SEVEN FLAVORS.<br /><em>START WITH ONE.</em></h1></div><p>Go bright, hot or roast-led. Not sure? The Taste Lab takes four taps.</p></header>
      <div className="shop-filter" role="tablist">{filters.map((item) => <button className={filter === item.id ? "is-active" : ""} onClick={() => setFilter(item.id)} key={item.id}><b>{item.label}</b><small>{item.ar}</small></button>)}</div>
      <motion.div className="product-grid shop-grid" layout>{visible.map((flavor, index) => <motion.div layout key={flavor.id}><ProductCard flavor={flavor} priority={index < 3} /></motion.div>)}</motion.div>
      <section className="shop-bundle">
        <div className="bundle-fan">{flavors.map((flavor, index) => <img src={flavor.image} alt="" key={flavor.id} style={{ "--i": index } as CSSProperties} />)}</div>
        <div><p>THE TRY-EVERYTHING BOX</p><h2>{starterBundle.ar}</h2><h3>{starterBundle.en}</h3><ul><li>7 flavor pouches × 100g</li><li>Bright, hot, spiced and roast-led</li><li>Made for the table</li></ul><button data-cursor="ADD 7" onClick={() => addBundle(flavors.map((flavor) => flavor.id))}>ADD THE FULL SET <b>{formatSar(starterBundle.priceSar)}</b></button></div>
      </section>
    </main>
  );
}
