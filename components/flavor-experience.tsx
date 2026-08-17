"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useCart } from "@/components/cart-provider";
import { SensoryBars } from "@/components/product-card";
import { PackPlate } from "@/components/pack-plate";
import { CinemaVideo } from "@/components/cinema-video";
import { flavors, formatSar, PROCESS, type Flavor } from "@/lib/catalog";
import { RITUAL_FILM } from "@/lib/films";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { rememberFlavor, useSavedFlavorId } from "@/lib/taste-memory";
import { useLanguage } from "@/lib/language";

export function FlavorExperience({ flavor }: { flavor: Flavor }) {
  const { add } = useCart();
  const { t, language } = useLanguage();
  const savedFlavorId = useSavedFlavorId();
  const saved = savedFlavorId === flavor.id;
  const related = flavors.filter((item) => item.id !== flavor.id).slice(0, 3);
  const retail = Boolean(flavor.retailPriceSar);
  const toggleSaved = async () => {
    const next = !saved;
    rememberFlavor(next ? flavor.id : null);
    const client = getSupabaseBrowserClient();
    if (!client) return;
    const { data: { user } } = await client.auth.getUser();
    if (user) await client.from("profiles").update({ preferred_flavor: next ? flavor.id : null, updated_at: new Date().toISOString() }).eq("id", user.id);
  };
  return (
    <main className="page-main flavor-page" style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties}>
      <section className="flavor-hero-detail">
        <div className="flavor-title">
          <span>{flavor.number} / 07 · {flavor.sku}</span>
          <h1>{flavor.ar}</h1>
          <h2>{flavor.en}</h2>
          <blockquote>{language === "ar" ? flavor.lineAr : flavor.lineEn}</blockquote>
          <p lang="ar">{language === "ar" ? flavor.noteAr : flavor.noteEn}</p>
        </div>
        <motion.div className="flavor-pack" initial={{ y: 60, rotate: -6, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <i />
          <PackPlate flavor={flavor} />
        </motion.div>
        <div className="flavor-buy">
          <span>{flavor.weightGrams}G · {t("حب دوّار الشمس بالقشرة", "IN-SHELL SUNFLOWER SEEDS")} · {flavor.band.toUpperCase()}</span>
          <p>{language === "ar" ? flavor.processAr : flavor.processEn}</p>
          <div>
            <button data-cursor="ADD" onClick={() => add(flavor.id)}>{t("أضف للحقيبة", "ADD TO BAG")} <b>{formatSar(flavor.priceSar)}</b></button>
            <button className={`save-taste ${saved ? "is-saved" : ""}`} aria-pressed={saved} onClick={toggleSaved}>{saved ? t("محفوظة كنكهتي ✓", "SAVED AS MY FLAVOR ✓") : t("احفظ كنكهتي ♡", "SAVE AS MY FLAVOR ♡")}</button>
            <small>{t("٢٣٠غ متجر", "230g e-com")} · {flavor.sku}{retail ? ` · ${t("تجزئة", "retail")} ${flavor.skuRetail} · ${formatSar(flavor.retailPriceSar ?? 0)}` : ` · ${t("مو في التجزئة", "not in retail")}`}</small>
          </div>
        </div>
      </section>
      <section className="flavor-world-film">
        {flavor.loopSrc ? (
          <CinemaVideo poster={flavor.loopPoster} posterStill={flavor.loopPoster} aria-label={`${flavor.en} loop`}>
            <source src={flavor.loopSrc} type="video/mp4" />
          </CinemaVideo>
        ) : (
          <CinemaVideo poster={RITUAL_FILM.poster} posterStill={RITUAL_FILM.poster} aria-label={t("ماكرو القرمشة", "Crack macro")}>
            <source src={RITUAL_FILM.src} type="video/mp4" />
          </CinemaVideo>
        )}
        <div>
          <p>{t("عالم النكهة", "FLAVOR WORLD")}</p>
          <h2>{t("الكيس في نوره.", "THE BAG,")}<br /><em>{t("واللب وراه.", "IN ITS LIGHT.")}</em></h2>
          <p>{language === "ar" ? flavor.layer1Ar : flavor.layer1En} {language === "ar" ? flavor.layer2Ar : flavor.layer2En}</p>
        </div>
      </section>
      <section className="flavor-sense">
        <div>
          <p>{t("بصمة النكهة", "SENSORY SIGNAL")}</p>
          <h2>{t("ذقّها", "TASTE IT")}<br />{t("قبل", "BEFORE THE")}<br /><em>{t("أول طقّة.", "FIRST CRACK.")}</em></h2>
        </div>
        <SensoryBars flavor={flavor} />
        <aside>
          <span>{t("مصمّمة لـ", "BUILT FOR")}</span>
          <h3>{language === "ar" ? flavor.ritualAr : flavor.ritual}</h3>
          <p>{flavor.tags.join(" · ")}</p>
        </aside>
      </section>
      <section className="ingredient-world">
        <div className="ingredient-art">
          <span className="kernel k1" />
          <span className="kernel k2" />
          <span className="shell s1" />
          <span className="shell s2" />
          <i />
        </div>
        <div>
          <p>{t("الطبقة الأولى", "LAYER ONE")}</p>
          <h2>{PROCESS.promiseAr}<br /><em>{PROCESS.promiseEn}.</em></h2>
          <p>{language === "ar" ? flavor.noteAr : flavor.noteEn} {t("معبّأ في الرياض. حلال. اللب محمّص ذهبي — بلا طلاء أخضر.", "Packed in Riyadh. Halal. The kernel stays a naturally roasted gold — never a painted coat.")}</p>
        </div>
      </section>
      <section className="flavor-next">
        <p>{t("طقّة بعدها", "NEXT CRACK")}</p>
        <div>{related.map((item) => <Link href={`/flavors/${item.id}`} key={item.id} style={{ "--next": item.color } as CSSProperties}><span>{item.number}</span><img src={item.image} alt="" /><b>{item.ar}</b><small>{item.en} ↗</small></Link>)}</div>
      </section>
    </main>
  );
}
