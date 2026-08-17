"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { useCart } from "@/components/cart-provider";
import { formatSar, type Flavor } from "@/lib/catalog";

export function ProductCard({ flavor, priority = false }: { flavor: Flavor; priority?: boolean }) {
  const { add } = useCart();
  return (
    <motion.article className="product-card" style={{ "--flavor": flavor.color, "--flavor-pale": flavor.pale } as CSSProperties} whileHover={{ y: -8 }} transition={{ duration: 0.28 }}>
      <Link className="product-card-image" data-cursor="VIEW" href={`/flavors/${flavor.id}`}>
        <span>{flavor.number}/07</span>
        <img src={flavor.image} alt={`HUBB ${flavor.en} sunflower seed pouch`} loading={priority ? "eager" : "lazy"} />
        <i>{flavor.channels.includes("retail") ? "E-COM + RETAIL ↗" : flavor.channels.includes("cafe") ? "E-COM + CAFÉ ↗" : "E-COM ↗"}</i>
      </Link>
      <div className="product-card-copy">
        <div><h2>{flavor.ar}</h2><p>{flavor.en}</p></div>
        <div><b>{formatSar(flavor.priceSar)}</b><small>{flavor.weightGrams} G</small></div>
      </div>
      <button className="add-button" data-cursor="ADD" onClick={() => add(flavor.id)}>ADD TO BAG <span>+</span></button>
    </motion.article>
  );
}

export function SensoryBars({ flavor }: { flavor: Flavor }) {
  const dimensions = [
    ["SALT", "ملح", flavor.taste.salt],
    ["HEAT", "حرارة", flavor.taste.heat],
    ["ROAST", "تحميص", flavor.taste.roast],
    ["AROMA", "رائحة", flavor.taste.aroma],
  ] as const;
  return (
    <div className="sensory-bars">
      {dimensions.map(([en, ar, value]) => (
        <div key={en}><p><span>{en}</span><small>{ar}</small><b>{value}</b></p><i><em style={{ width: `${value}%` }} /></i></div>
      ))}
    </div>
  );
}
