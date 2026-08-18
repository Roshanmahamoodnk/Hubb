import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create with HUBB",
  description: "Join the HUBB Saudi creator roster. Paid vertical-video briefs, clear usage rights, and culturally real snack stories.",
  alternates: { canonical: "/creators" },
};

const creatorTypes = [
  ["01", "THE MATCH TABLE", "Football-night hosts, reaction creators and friend groups who can make the crack feel social."],
  ["02", "THE NIGHT DRIVE", "Saudi lifestyle voices who shoot safely from the passenger seat or a parked car after dark."],
  ["03", "THE MAJLIS", "Hospitality, food and family creators who understand the bag belongs in the middle."],
  ["04", "THE TASTE NERD", "Food reviewers who can describe salt, roast, aroma and heat without invented claims."],
];

export default function CreatorsPage() {
  return <main className="ugc-page creator-page">
    <header className="ugc-hero creator-hero">
      <div><p>HUBB CREATOR ROSTER · صُنّاع حُبّ</p><h1>DON&apos;T ACT<br />LIKE AN AD.<br /><em>CRACK IT.</em></h1><blockquote lang="ar">نبحث عن أصوات سعودية حقيقية، مو إعلان محفوظ.</blockquote></div>
      <div className="ugc-phone" aria-label="Example vertical creator framing"><span>9:16 / SAFE ZONE</span><img src="/products/hot-salt.webp" alt="HUBB Hot and Salt pack" /><b>“قلت باخذ حبة…”</b><small>…ONE CRACK LATER</small></div>
    </header>

    <section className="ugc-intro"><p>THE OPEN CALL · الدعوة</p><h2>WE HIRE <em>POINT OF VIEW,</em><br />NOT FOLLOWER COUNT.</h2><div><p>HUBB is building a paid Saudi and GCC creator roster for Reels, Stories and partnership ads. You do not need a huge audience. You need a recognisable voice, clean vertical footage, believable product handling and the instinct to hook attention without sounding scripted.</p><Link href="#brief">SEE THE PAID BRIEF ↓</Link></div></section>

    <section className="creator-types"><header><p>WHO WE WANT · مين نبحث عنه</p><h2>FOUR REAL<br /><em>POINTS OF VIEW.</em></h2></header>{creatorTypes.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>

    <section className="creator-pay" id="brief"><header><p>PAID TEST · تجربة مدفوعة</p><h2>CLEAR WORK.<br /><em>CLEAR RIGHTS.</em></h2></header><div className="pay-grid">
      <article><span>STARTER</span><strong>SAR 450–800</strong><p>One edited 15–30s vertical video, one hook, captions, one revision, organic brand usage.</p></article>
      <article><span>PERFORMANCE</span><strong>SAR 900–1,500</strong><p>One core edit, three hook variants, clean B-roll selects and 90-day paid-social usage.</p></article>
      <article><span>PARTNERSHIP</span><strong>+30–50%</strong><p>Creator-handle partnership ad permission for 90 days. Organic posting is negotiated separately.</p></article>
      <article><span>RETAINER</span><strong>SAR 2,400–5,000</strong><p>Three to five monthly videos for proven creators. Scope, rights and exclusivity are written per cycle.</p></article>
    </div><small>Indicative launch bands, not a promise to every applicant. Final fee depends on concept, production, creator fit, deliverables, posting, exclusivity and usage term.</small></section>

    <section className="creator-process"><p>HOW HIRING WORKS · طريقة الاختيار</p><ol><li><b>01</b><span><strong>SHOW YOUR VOICE</strong>Send three vertical samples and tell us which HUBB moment is naturally yours.</span></li><li><b>02</b><span><strong>15-MINUTE FIT CHECK</strong>We confirm availability, language, category conflicts, rates and comfort on camera.</span></li><li><b>03</b><span><strong>PAID TEST BRIEF</strong>One product, one audience problem, three hook options and one measurable action.</span></li><li><b>04</b><span><strong>48-HOUR REVIEW</strong>We score hook, watchability, product clarity, authenticity, technical quality and ad-policy safety.</span></li><li><b>05</b><span><strong>SCALE THE WINNER</strong>Winning concepts earn hook iterations, partnership-ad rights and a monthly retainer discussion.</span></li></ol></section>

    <section className="creator-application"><div><p>APPLICATION KIT · ملف التقديم</p><h2>COME WITH<br /><em>A REAL ANGLE.</em></h2><blockquote lang="ar">وش يصير بعد أول قرمشة؟ ورّنا بطريقتك.</blockquote></div><div><h3>Prepare this before applying</h3><ul><li>Name, city, languages and age confirmation (18+)</li><li>Instagram/TikTok/Snapchat handles</li><li>Three strongest vertical examples</li><li>Your chosen HUBB moment and a one-line hook</li><li>Rate for one video, raw footage and 90-day paid usage</li><li>Recent food/snack partnerships and conflicts</li></ul><p className="application-note">The verified submission address and consent form must be connected before applications open. HUBB will never request unpaid speculative videos or perpetual rights by default.</p><Link href="/ugc-retargeting">READ THE CAMPAIGN BRIEF ↗</Link></div></section>
  </main>;
}

