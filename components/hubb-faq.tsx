"use client";

import { useLanguage } from "@/lib/language";

const faqs = [
  {
    qAr: "هذي مجرد حب مملّح؟",
    qEn: "Is this just salted seeds?",
    aAr: "لا. طبقة الغبار على القشرة. النكهة في اللب. امسح القشرة — الطعم باقٍ.",
    aEn: "No. Dust is on the husk. Flavor is in the kernel. Wipe the shell — the taste stays.",
  },
  {
    qAr: "ليش التفريغ؟",
    qEn: "Why vacuum?",
    aAr: "عند ~0.05 ميجا باسكال، الشراب (60–70°م) ينسحب عبر القشرة إلى اللب. بدون تفريغ يبقى الملح برا.",
    aEn: "At ~0.05 MPa, 60–70°C liquor is pulled through the husk into the kernel. Without vacuum, salt stays on the shell.",
  },
  {
    qAr: "لو الغبار انمسح؟",
    qEn: "What if the dust wipes off?",
    aAr: "هذا الطبقة الثانية. الطبقة الأولى خلاص داخل اللب. الغبار للأنف واليد. اللب للطقّة.",
    aEn: "That’s layer two. Layer one is already in the kernel. Dust is for the hand. The kernel is the crack.",
  },
  {
    qAr: "ليش الشوكو مو في بنده؟",
    qEn: "Why isn’t chocolate in Panda?",
    aAr: "اليد البنية ما تناسب المجلس. فانيليا كراميل شوكو وقهوة كاكاو للمتجر والمقهى.",
    aEn: "Brown hands don’t belong on a majlis table. Vanilla caramel and coffee cocoa stay on e-com and café.",
  },
  {
    qAr: "وين ينعبّى؟",
    qEn: "Where is it packed?",
    aAr: "في الرياض. حلال. المطحنة روزانا. العلامة حُبّ.",
    aEn: "Riyadh. Halal. The mill is Rozana. The brand on the bag is HUBB.",
  },
];

export function HubbFaq() {
  const { language, t } = useLanguage();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: language === "ar" ? item.qAr : item.qEn,
      acceptedAnswer: { "@type": "Answer", text: language === "ar" ? item.aAr : item.aEn },
    })),
  };
  return (
    <section className="hubb-faq" id="faq">
      <div className="section-heading">
        <p className="section-kicker">{t("أسئلة قصيرة", "SHORT ANSWERS")}</p>
        <h2>{t("مو درس بقالة.", "No grocery homework.")}<br /><em>{t("الطعم في اللب.", "The taste is in the kernel.")}</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.qEn}>
            <summary>{language === "ar" ? item.qAr : item.qEn}<span>+</span></summary>
            <p>{language === "ar" ? item.aAr : item.aEn}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
