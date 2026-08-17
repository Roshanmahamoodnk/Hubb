"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/cart-provider";
import { PackPlate } from "@/components/pack-plate";
import { flavorById, flavors, formatSar, type Flavor } from "@/lib/catalog";
import { rememberFlavor } from "@/lib/taste-memory";
import { useLanguage } from "@/lib/language";

const bracket: Array<[string, string]> = [
  ["umami-salt", "spice-mix"],
  ["umami-garlic", "umami-capsicum"],
  ["vanilla-caramel", "coffee-cocoa"],
];

export function TasteLab() {
  const { add } = useCart();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [winners, setWinners] = useState<string[]>([]);
  const [finalist, setFinalist] = useState<string | null>(null);
  const pair = bracket[step];
  const left = pair ? flavorById(pair[0]) : null;
  const right = pair ? flavorById(pair[1]) : null;
  const finalists = useMemo(() => winners.map((id) => flavorById(id)).filter((item): item is Flavor => Boolean(item)), [winners]);
  const champion = finalist ? flavorById(finalist) ?? flavors[0] : flavors[0];

  const pickMatch = (id: string) => {
    const next = [...winners, id];
    setWinners(next);
    setStep((value) => value + 1);
  };

  const pickChampion = (id: string) => {
    setFinalist(id);
    rememberFlavor(id);
  };

  const reset = () => {
    setStep(0);
    setWinners([]);
    setFinalist(null);
  };

  return (
    <main className="page-main taste-lab-page taste-drop" style={{ "--result": champion.color } as CSSProperties}>
      <div className="lab-intro">
        <span>{t("دروب المختبر / WORLD CRACK", "TASTE LAB / WORLD CRACK")}</span>
        <h1>{t("طقّ.", "CRACK.")}<br /><em>{t("ذُق. قرّر.", "TASTE. DECIDE.")}</em></h1>
        <p>{t("ثلاث مواجهات. بطل واحد. حُبّ تتذكر النتيجة على جهازك.", "Three matchups. One champion. HUBB remembers the result on this device.")}</p>
      </div>
      <div className="lab-machine drop-machine">
        <div className="lab-progress">
          {[0, 1, 2, 3].map((index) => <i key={index} className={index < step || (index === 3 && finalist) ? "is-done" : index === step ? "is-active" : ""} />)}
        </div>
        <AnimatePresence mode="wait">
          {step < bracket.length && left && right ? (
            <motion.section className="drop-match" key={pair.join("-")} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <span>{t(`مواجهة 0${step + 1} / 03`, `MATCH 0${step + 1} / 03`)}</span>
              <h2>{t("مين يفوز الليلة؟", "Who wins tonight?")}</h2>
              <div className="drop-pair">
                <MatchCard flavor={left} language={language} onPick={() => pickMatch(left.id)} pickLabel={t("هذه", "THIS ONE")} />
                <b>{t("ضد", "VS")}</b>
                <MatchCard flavor={right} language={language} onPick={() => pickMatch(right.id)} pickLabel={t("هذه", "THIS ONE")} />
              </div>
            </motion.section>
          ) : !finalist ? (
            <motion.section className="drop-match" key="final" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span>{t("النهائي", "THE FINAL")}</span>
              <h2>{t("توج بطل اللب.", "Crown the kernel.")}</h2>
              <div className="drop-final">
                {finalists.map((flavor) => (
                  <button key={flavor.id} type="button" className="drop-finalist" style={{ "--flavor": flavor.color } as CSSProperties} onClick={() => pickChampion(flavor.id)}>
                    <PackPlate flavor={flavor} size="sm" />
                    <b lang="ar">{flavor.ar}</b>
                    <small>{flavor.en}</small>
                  </button>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section className="lab-result drop-result" key="result" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
              <div>
                <span>{t("بطل الليلة", "TONIGHT’S CHAMPION")}</span>
                <h2>{champion.ar}</h2>
                <h3>{champion.en}</h3>
                <p>{language === "ar" ? champion.lineAr : champion.lineEn}</p>
                <div>
                  <button data-cursor="ADD" onClick={() => add(champion.id)}>{t("أضف للحقيبة", "ADD TO BAG")} <b>{formatSar(champion.priceSar)}</b></button>
                  <Link href={`/flavors/${champion.id}`}>{t("شاهد النكهة ↗", "SEE THE FLAVOR ↗")}</Link>
                </div>
                <button className="lab-reset" onClick={reset}>{t("أعد الدروب ↻", "RUN THE DROP AGAIN ↻")}</button>
              </div>
              <img src={champion.image} alt={`Your flavor is ${champion.en}`} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function MatchCard({ flavor, language, onPick, pickLabel }: { flavor: Flavor; language: "ar" | "en"; onPick: () => void; pickLabel: string }) {
  return (
    <article className="drop-card" style={{ "--flavor": flavor.color } as CSSProperties}>
      {flavor.loopSrc ? (
        <video muted loop playsInline autoPlay preload="metadata" poster={flavor.loopPoster} aria-hidden="true">
          <source src={flavor.loopSrc} type="video/mp4" />
        </video>
      ) : null}
      <PackPlate flavor={flavor} />
      <h3 lang="ar">{flavor.ar}</h3>
      <h4>{flavor.en}</h4>
      <p>{language === "ar" ? flavor.lineAr : flavor.lineEn}</p>
      <button type="button" data-cursor="PICK" onClick={onPick}>{pickLabel} ↗</button>
    </article>
  );
}
