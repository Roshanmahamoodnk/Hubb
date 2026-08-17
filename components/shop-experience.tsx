"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
import { flavors, formatSar, starterBundle } from "@/lib/catalog";
import { useLanguage } from "@/lib/language";

const filters = [
  { id: "all", label: "ALL", ar: "الكل" },
  { id: "retail", label: "RETAIL", ar: "تجزئة" },
  { id: "heat", label: "HEAT", ar: "حار" },
  { id: "night", label: "NIGHT", ar: "ليل" },
];

export function ShopExperience() {
  const [filter, setFilter] = useState("all");
  const { addBundle } = useCart();
  const { t } = useLanguage();
  const visible = useMemo(() => {
    if (filter === "retail") return flavors.filter((flavor) => flavor.channels.includes("retail"));
    if (filter === "heat") return flavors.filter((flavor) => ["umami-capsicum", "spice-mix"].includes(flavor.id));
    if (filter === "night") return flavors.filter((flavor) => ["vanilla-caramel", "coffee-cocoa"].includes(flavor.id));
    return flavors;
  }, [filter]);
  return (
    <main className="page-main shop-page">
      <header className="shop-hero">
        <div>
          <p>{t("اختر نكهتك", "PICK YOUR BAG")}</p>
          <h1>{t("ست نكهات عملية.", "SIX PROCESS FLAVORS.")}<br /><em>{t("وإصدار سابع.", "ONE COLLECTIBLE.")}</em></h1>
        </div>
        <p>{t("متجر بصوت عالي. تجزئة أهدى. عيّنة اللب تختصر الخط.", "Loud e-com. Calmer retail. The Kernel Sampler is the whole process line.")}</p>
      </header>
      <div className="shop-filter" role="tablist">{filters.map((item) => <button className={filter === item.id ? "is-active" : ""} onClick={() => setFilter(item.id)} key={item.id}><b>{item.label}</b><small>{item.ar}</small></button>)}</div>
      <motion.div className="product-grid shop-grid" layout>{visible.map((flavor, index) => <motion.div layout key={flavor.id}><ProductCard flavor={flavor} priority={index < 3} /></motion.div>)}</motion.div>
      <section className="shop-bundle">
        <div className="bundle-fan">{flavors.slice(0, 6).map((flavor, index) => <img src={flavor.image} alt="" key={flavor.id} style={{ "--i": index } as CSSProperties} />)}</div>
        <div>
          <p>{t("علبة المختبر", "THE TASTE DROP")}</p>
          <h2>{starterBundle.ar}</h2>
          <h3>{starterBundle.en}</h3>
          <ul>
            <li>{t("٦ نكهات عملية × ٢٣٠غ", "6 process pouches × 230g")}</li>
            <li>{t("أومامي، بهار، شوكو، قهوة", "Umami, bahar, chocolate, coffee")}</li>
            <li>{t("ليمون وملح يبقى إصدار", "Lemon salt stays a collectible")}</li>
          </ul>
          <button data-cursor="ADD 6" onClick={() => addBundle(starterBundle.flavorIds)}>{t("أضف العيّنة", "ADD THE SAMPLER")} <b>{formatSar(starterBundle.priceSar)}</b></button>
        </div>
      </section>
    </main>
  );
}
