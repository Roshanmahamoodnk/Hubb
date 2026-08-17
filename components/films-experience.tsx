"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { flavors } from "@/lib/catalog";
import { brandCuts } from "@/lib/films";
import { useLanguage } from "@/lib/language";

export function FilmsExperience() {
  const { language, t } = useLanguage();
  const wide = brandCuts[0];
  const vertical = brandCuts[1];
  const crack = brandCuts[2];
  return (
    <main className="page-main films-page">
      <header>
        <p>{t("أفلام حُبّ", "HUBB FILMS")}</p>
        <h1>{t("خمس عشرة ثانية.", "FIFTEEN SECONDS.")}<br /><em>{t("الطقّة أولًا.", "THE CRACK FIRST.")}</em></h1>
        <blockquote lang="ar">{t("افتح. طقّ. اللب متبّل أصلًا.", "Open. Crack. The kernel is already flavored.")}</blockquote>
      </header>
      <section className="film-wide">
        <video controls muted playsInline preload="metadata" poster={wide.poster}>
          {wide.webm ? <source src={wide.webm} type="video/webm" /> : null}
          <source src={wide.src} type="video/mp4" />
        </video>
        <div>
          <span>{language === "ar" ? wide.kickerAr : wide.kicker}</span>
          <h2>{language === "ar" ? wide.titleAr : wide.title}</h2>
          <p>{language === "ar" ? wide.bodyAr : wide.body}</p>
        </div>
      </section>
      <section className="film-vertical">
        <div>
          <span>{language === "ar" ? vertical.kickerAr : vertical.kicker}</span>
          <h2>{t("مقصوص", "MADE FOR")}<br /><em>{t("للإبهام.", "THE THUMB.")}</em></h2>
          <p>{language === "ar" ? vertical.bodyAr : vertical.body}</p>
          <Link href="/shop">{t("اختر أول كيس ↗", "PICK YOUR FIRST BAG ↗")}</Link>
        </div>
        <video controls muted playsInline preload="none" poster={vertical.poster}>
          <source src={vertical.src} type="video/mp4" />
        </video>
      </section>
      <section className="film-wide film-crack">
        <video controls muted playsInline preload="none" poster={crack.poster}>
          <source src={crack.src} type="video/mp4" />
        </video>
        <div>
          <span>{language === "ar" ? crack.kickerAr : crack.kicker}</span>
          <h2>{t("قشرة.", "SHELL.")}<br />{t("خط.", "SEAM.")}<br /><em>{t("لب.", "KERNEL.")}</em></h2>
          <p>{language === "ar" ? crack.bodyAr : crack.body}</p>
        </div>
      </section>
      <section className="film-loops">
        <div className="section-heading">
          <p className="section-kicker">{t("حلقات النكهة", "SKU LOOPS")}</p>
          <h2>{t("ست ثوانٍ", "SIX SECONDS")}<br /><em>{t("لكل عالم.", "EACH WORLD.")}</em></h2>
        </div>
        <div className="loop-grid">
          {flavors.map((flavor) => (
            <article key={flavor.id} style={{ "--loop": flavor.color } as CSSProperties}>
              {flavor.loopSrc ? (
                <video muted loop playsInline preload="none" poster={flavor.loopPoster} controls>
                  <source src={flavor.loopSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="cinema-still" style={{ backgroundImage: `url(${flavor.loopPoster})` }} />
              )}
              <span>{flavor.number} / 07</span>
              <b lang="ar">{flavor.ar}</b>
              <small>{flavor.en}</small>
              <Link href={`/flavors/${flavor.id}`}>ENTER ↗</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
