"use client";

import { useLanguage } from "@/lib/language";

const columns = [
  { id: "hubb", ar: "حُبّ", en: "HUBB" },
  { id: "baja", ar: "باجا", en: "Baja" },
  { id: "chacheer", ar: "تشاتشير", en: "ChaCheer" },
  { id: "souq", ar: "سوق فلت", en: "Loose souq" },
];

const rows = [
  {
    ar: "اللب متبّل؟",
    en: "Kernel flavored?",
    values: ["yes", "no", "no", "no"],
    notesAr: ["تفريغ عبر القشرة", "ملح على القشرة فقط", "سلق وعشب", "غبار برا"],
    notesEn: ["Vacuum through the husk", "Shell salt only", "Boil, Chinese herb", "Dust on the outside"],
  },
  {
    ar: "تفريغ؟",
    en: "Vacuum?",
    values: ["yes", "no", "no", "no"],
    notesAr: ["0.05 ميجا باسكال", "—", "—", "—"],
    notesEn: ["0.05 MPa", "—", "—", "—"],
  },
  {
    ar: "نكهات سعودية؟",
    en: "Saudi flavors?",
    values: ["yes", "no", "thin", "varies"],
    notesAr: ["كبسة، أومامي، قهوة كاكاو", "ملح عام", "عربي خفيف", "على المزاج"],
    notesEn: ["Kabsa, umami, coffee cocoa", "Generic salt", "Thin Arabic", "Depends on the stall"],
  },
  {
    ar: "كيس ثنائي اللغة؟",
    en: "Bilingual pack?",
    values: ["yes", "no", "no", "no"],
    notesAr: ["عربي أولًا", "غالبًا إنجليزي", "صيني/عربي", "بلا كيس"],
    notesEn: ["Arabic first", "Mostly English", "CN / AR", "No pack"],
  },
  {
    ar: "اليد تتوسخ؟",
    en: "Hands dirty?",
    values: ["dust", "salt", "wet", "dust"],
    notesAr: ["غبار، واللب نظيف الطعم", "ملح القشرة", "رطوبة وعشب", "غبار بلا دليل في اللب"],
    notesEn: ["Dust, then a flavored kernel", "Shell salt", "Wet herb", "Dust with no kernel proof"],
  },
];

const tone: Record<string, string> = {
  yes: "is-yes",
  no: "is-no",
  thin: "is-mid",
  varies: "is-mid",
  dust: "is-mid",
  salt: "is-no",
  wet: "is-no",
};

export function ComparisonGrid() {
  const { t, language } = useLanguage();
  return (
    <section className="compare-grid" id="compare">
      <div className="section-heading">
        <p className="section-kicker">{t("حُبّ ضدهم", "HUBB VS THEM")}</p>
        <h2>{t("اللب هو الفرق.", "The kernel is the difference.")}<br /><em>{t("مو الغبار.", "Not the dust.")}</em></h2>
      </div>
      <div className="compare-table" role="table" aria-label={t("مقارنة النقع", "Process comparison")}>
        <div className="compare-row compare-head" role="row">
          <span role="columnheader">{t("السؤال", "Question")}</span>
          {columns.map((column) => (
            <span key={column.id} role="columnheader" className={column.id === "hubb" ? "is-hubb" : ""}>
              {language === "ar" ? column.ar : column.en}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <div className="compare-row" role="row" key={row.en}>
            <span role="rowheader">{language === "ar" ? row.ar : row.en}</span>
            {row.values.map((value, index) => (
              <span key={`${row.en}-${columns[index].id}`} role="cell" className={`${tone[value]} ${index === 0 ? "is-hubb" : ""}`}>
                <b>{language === "ar" ? row.notesAr[index] : row.notesEn[index]}</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
