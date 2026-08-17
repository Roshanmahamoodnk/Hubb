import type { Metadata } from "next";
import Link from "next/link";
import { flavors, PROCESS } from "@/lib/catalog";

export const metadata: Metadata = { title: "Sunflower seeds in Saudi Arabia — guide", description: "How to crack in-shell sunflower seeds, why vacuum infusion flavors the kernel, and which HUBB packs belong in retail versus e-com.", alternates: { canonical: "/saudi-sunflower-seeds" } };

export default function SaudiSeedsGuide() {
  const faq = [
    { q: "What are in-shell sunflower seeds?", a: "Roasted sunflower seeds served inside their striped shells. You crack the husk and eat the kernel." },
    { q: "Is HUBB just salted seeds?", a: "No. Layer 1 is vacuum kernel infusion at ~0.05 MPa. Layer 2 is outer dust. Wipe the shell — the kernel still tastes the flavor." },
    { q: "Which flavors are in Panda / Othaim?", a: "Umami salt, umami garlic and spice mix (bahar). Chocolate and coffee stay on e-com and café so brown hands stay off the majlis table." },
    { q: "Are the kernels painted?", a: "No. Kernels stay naturally roasted gold. Color lives on the pack band and the outer dust, never as a green or chocolate-coated kernel." },
  ];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  return (
    <main className="page-main guide-page">
      <header>
        <p>THE SAUDI SEED GUIDE · دليل الحب</p>
        <h1>THE CRACK,<br />THE KERNEL,<br /><em>THE RITUAL.</em></h1>
        <blockquote>{PROCESS.promiseAr}. {PROCESS.promiseEn}. Packed in Riyadh. Halal.</blockquote>
      </header>
      <section>
        <p>01 / START HERE</p>
        <h2>WHAT YOU EAT IS THE KERNEL.</h2>
        <div>
          <p>Open the nitrogen pillow. Crack the husk. The kernel is already flavored — umami, kabsa, coffee — because liquor was pulled through the shell under vacuum. The dust on your fingers is layer two.</p>
          <Link href="/how-it-works">HOW TO CRACK ↗</Link>
        </div>
      </section>
      <section>
        <p>02 / CHOOSE BY MOMENT</p>
        <h2>SEVEN SIGNALS.<br />NO GUESSWORK.</h2>
        <div className="guide-flavors">{flavors.map((flavor) => <Link href={`/flavors/${flavor.id}`} key={flavor.id}><i style={{ background: flavor.color }} /><b>{flavor.ar}</b><small>{flavor.en} · {flavor.ritual}</small></Link>)}</div>
      </section>
      <section className="guide-faq">
        <p>03 / QUICK ANSWERS</p>
        <h2>PEOPLE ALSO<br /><em>ASK.</em></h2>
        {faq.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
