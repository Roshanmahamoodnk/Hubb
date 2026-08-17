"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS, flavors } from "@/lib/catalog";
import { RITUAL_FILM } from "@/lib/films";
import { useLanguage } from "@/lib/language";
import { PackPlate } from "@/components/pack-plate";
import { CinemaVideo } from "@/components/cinema-video";

const layers = [
  {
    kicker: "LAYER 01",
    kickerAr: "الطبقة ٠١",
    titleEn: "Kernel infusion",
    titleAr: "نقع اللب",
    bodyEn: "Vacuum ~0.05 MPa. 60–70°C liquor. Water-soluble oleoresins and yeast extract pulled through the husk into the kernel.",
    bodyAr: "تفريغ ~0.05 ميجا باسكال. شراب 60–70°م. أوليوريزينات ومستخلص خميرة ينسحبون عبر القشرة إلى اللب.",
    proofEn: "Proof: wipe the shell. The kernel still tastes the flavor.",
    proofAr: "الدليل: امسح القشرة. اللب ما زال يطعم النكهة.",
  },
  {
    kicker: "LAYER 02",
    kickerAr: "الطبقة ٠٢",
    titleEn: "Outer dust",
    titleAr: "غبار القشرة",
    bodyEn: "Vacuum tumble. 72–100 mesh salt and flavor dust. Hands smell it. The Snap/TikTok moment.",
    bodyAr: "تبلور تحت التفريغ. ملح ونكهة 72–100 مش. اليد تشمّه. لحظة السناب والتيك توك.",
    proofEn: "If the dust wipes off, the kernel is already done.",
    proofAr: "لو الغبار راح، اللب جاهز أصلًا.",
  },
  {
    kicker: "LOCK",
    kickerAr: "القفل",
    titleEn: "Roast, then N2",
    titleAr: "تحميص، ثم نيتروجين",
    bodyEn: "Roast to 1.5–2.0% moisture, aw ≤ 0.40. Nitrogen pillow. Packed in Riyadh. Halal.",
    bodyAr: "تحميص حتى رطوبة 1.5–2.0%، نشاط مائي ≤ 0.40. وسادة نيتروجين. معبّأ في الرياض. حلال.",
    proofEn: "Mill: Rozana. Brand: HUBB. No vitamin lecture. No TCM.",
    proofAr: "المطحنة: روزانا. العلامة: حُبّ. بلا محاضرة فيتامين. بلا طب صيني.",
  },
];

export function ProcessChapter() {
  const { t, language } = useLanguage();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const pack = flavors[3];
  return (
    <section className="process-chapter" id="process" ref={section} style={{ "--flavor": pack.color } as CSSProperties}>
      <div className="process-sticky">
        <div className="process-visual">
          <CinemaVideo className="process-film" poster={RITUAL_FILM.poster} posterStill={RITUAL_FILM.poster} aria-label={t("ماكرو القشرة واللب", "Macro husk and kernel")}>
            <source src={RITUAL_FILM.src} type="video/mp4" />
          </CinemaVideo>
          <motion.div className="process-number" style={{ y: numberY }}>
            <span>{PROCESS.vacuumMpa}</span>
            <small>MPa</small>
          </motion.div>
          <PackPlate flavor={pack} className="process-pack" />
          <svg className="process-diagram" viewBox="0 0 280 160" aria-hidden="true">
            <rect x="18" y="28" width="110" height="104" rx="54" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="73" y="24" textAnchor="middle" fill="currentColor" fontSize="9">VACUUM</text>
            <ellipse cx="73" cy="80" rx="18" ry="32" fill="#d6b987" stroke="#7b5a2e" strokeWidth="2" />
            <path d="M128 80 H168" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="148" y="70" textAnchor="middle" fill="currentColor" fontSize="8">0.05 MPa</text>
            <rect x="176" y="36" width="86" height="88" rx="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="219" y="80" textAnchor="middle" fill="currentColor" fontSize="11">{language === "ar" ? "اللب" : "KERNEL"}</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="process-story">
          <p className="section-kicker">{t("العملية هي المنتج", "PROCESS IS THE PRODUCT")}</p>
          <h2>{PROCESS.promiseAr}<br /><em>{PROCESS.promiseEn}</em></h2>
          {layers.map((layer) => (
            <article key={layer.kicker}>
              <span>{language === "ar" ? layer.kickerAr : layer.kicker}</span>
              <h3>{language === "ar" ? layer.titleAr : layer.titleEn}</h3>
              <p>{language === "ar" ? layer.bodyAr : layer.bodyEn}</p>
              <small>{language === "ar" ? layer.proofAr : layer.proofEn}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
