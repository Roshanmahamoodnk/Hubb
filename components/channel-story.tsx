"use client";

import type { CSSProperties } from "react";
import { flavors, formatSar, retailFlavors } from "@/lib/catalog";
import { useLanguage } from "@/lib/language";
import { PackPlate } from "@/components/pack-plate";

export function ChannelStory() {
  const { t } = useLanguage();
  const retail = retailFlavors[0];
  const ecom = flavors.find((flavor) => flavor.id === "vanilla-caramel") ?? flavors[4];
  return (
    <section className="channel-story" id="channels">
      <div className="section-heading">
        <p className="section-kicker">{t("وجهان. علامة واحدة.", "TWO FACES. ONE BRAND.")}</p>
        <h2>{t("المتجر يصرخ.", "E-com is loud.")}<br /><em>{t("التجزئة تهدى.", "Retail stays calm.")}</em></h2>
      </div>
      <div className="channel-grid">
        <article className="channel-card is-ecom" style={{ "--flavor": ecom.color } as CSSProperties}>
          <PackPlate flavor={ecom} face="ecom" />
          <div>
            <span>{t("متجر · جيل زد", "E-COM · GEN Z")}</span>
            <h3>{t("٨٥غ / ٢٣٠غ", "85g / 230g")}</h3>
            <p>{t("سعر أعلى. تسويق حار. الشوكو والقهوة هنا.", "Higher price. High-heat marketing. Chocolate and coffee live here.")}</p>
            <b>{t(`٢٣٠غ ${formatSar(ecom.priceSar)}`, `230g ${formatSar(ecom.priceSar)}`)}</b>
            <small>HUBB-VCC-230-EC</small>
          </div>
        </article>
        <article className="channel-card is-retail" style={{ "--flavor": retail.color } as CSSProperties}>
          <PackPlate flavor={retail} face="retail" />
          <div>
            <span>{t("بنده / العثيم · المجلس", "PANDA / OTHAIM · MAJLIS")}</span>
            <h3>{t("١٥غ / ٨٥غ / ٢٣٠غ", "15g / 85g / 230g")}</h3>
            <p>{t("ملح أومامي، ثوم، بهار فقط. سعر أهدى. اليد تبقى نظيفة اللون.", "Umami salt, garlic, spice mix only. Calmer price. No brown hands on the majlis table.")}</p>
            <b>{t(`٢٣٠غ ${formatSar(retail.retailPriceSar ?? 16.9)}`, `230g ${formatSar(retail.retailPriceSar ?? 16.9)}`)}</b>
            <small>HUBB-USA-230-RT</small>
          </div>
        </article>
      </div>
    </section>
  );
}
