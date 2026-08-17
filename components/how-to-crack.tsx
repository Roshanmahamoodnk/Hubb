"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { flavors } from "@/lib/catalog";
import { RITUAL_FILM } from "@/lib/films";
import { useLanguage } from "@/lib/language";
import { PackPlate } from "@/components/pack-plate";
import { CinemaVideo } from "@/components/cinema-video";

const steps = [
  {
    id: "open",
    number: "01",
    ar: "افتح الكيس",
    en: "Open the bag",
    detailAr: "وسادة نيتروجين. ريحة الغبار تطلع أول.",
    detailEn: "N2 pillow. The dust hits the nose first.",
  },
  {
    id: "crack",
    number: "02",
    ar: "طقّ القشرة",
    en: "Crack the husk",
    detailAr: "ثبّت الحبة. اكسر الخط. لا تهرس اللب.",
    detailEn: "Find the seam. Split it. Don’t crush the kernel.",
  },
  {
    id: "kernel",
    number: "03",
    ar: "اللب متبّل أصلًا",
    en: "The kernel is already flavored",
    detailAr: "امسح القشرة. الطعم باقٍ. كبسة. أومامي. قهوة.",
    detailEn: "Wipe the shell. The taste stays. Kabsa. Umami. Coffee.",
  },
];

const modes = [
  { id: "now", ar: "١٥غ / السيارة", en: "15g / Now", lineAr: "كيس صغير. يد واحدة. المشوار.", lineEn: "One hand. One bag. The car." },
  { id: "majlis", ar: "٢٣٠غ / المجلس", en: "230g / Majlis", lineAr: "الكيس في الوسط. يدور.", lineEn: "The bag sits in the middle. It travels." },
];

export function HowToCrack() {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState(1);
  const pack = flavors[mode === 0 ? 0 : 3];
  return (
    <section className="how-crack" id="how-to-crack" style={{ "--flavor": pack.color } as CSSProperties}>
      <div className="how-crack-copy">
        <p className="section-kicker">{t("كيف تطقّها · HOW TO CRACK", "HOW TO CRACK · كيف تطقّها")}</p>
        <h2>{t("ثلاث حركات.", "Three moves.")}<br /><em>{t("قرمشة كاملة.", "A complete crack.")}</em></h2>
        <div className="how-modes" role="tablist" aria-label={t("حجم الكيس", "Bag size")}>
          {modes.map((item, index) => (
            <button key={item.id} type="button" role="tab" aria-selected={mode === index} className={mode === index ? "is-active" : ""} onClick={() => setMode(index)}>
              <b>{language === "ar" ? item.ar : item.en}</b>
              <small>{language === "ar" ? item.lineAr : item.lineEn}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="how-crack-stage">
        <div className="how-crack-film">
          <CinemaVideo poster={RITUAL_FILM.poster} posterStill={RITUAL_FILM.poster} aria-label={t("فيلم القرمشة", "Crack ritual film")}>
            <source src={RITUAL_FILM.src} type="video/mp4" />
          </CinemaVideo>
          <PackPlate flavor={pack} face={mode === 0 ? "retail" : "ecom"} className="how-crack-pack" />
        </div>
        <ol className="how-steps">
          {steps.map((step) => (
            <li key={step.id}>
              <b>{step.number}</b>
              <div>
                <h3 lang="ar">{step.ar}</h3>
                <h4>{step.en}</h4>
                <p>{language === "ar" ? step.detailAr : step.detailEn}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={mode} className="how-crack-foot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {mode === 0
            ? t("١٥غ في التجزئة: ملح أومامي، ثوم، بهار.", "15g in retail: umami salt, garlic, spice mix.")
            : t("٢٣٠غ للمجلس والمتجر. الشوكو والقهوة تبقى للمتجر.", "230g for majlis and e-com. Chocolate and coffee stay on e-com.")}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
