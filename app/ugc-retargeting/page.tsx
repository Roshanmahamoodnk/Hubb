import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { flavors } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "One Crack Later",
  description: "The HUBB seven-flavor retargeting experience—return to the pack you viewed, finish your taste, or build the full box.",
  alternates: { canonical: "/ugc-retargeting" },
};

export default function UgcRetargetingPage() {
  return <main className="ugc-page retarget-page">
    <header className="retarget-hero"><div><p>ONE CRACK LATER · بعد أول قرمشة</p><h1>YOU SAW<br />THE BAG.<br /><em>NOW PICK<br />THE MOOD.</em></h1><p className="retarget-sub">Seven flavors. SAR 5 each. Start with the color you came back for.</p><Link href="#pick">PICK YOUR CRACK ↓</Link></div><div className="retarget-stack">{flavors.slice(0,4).map((flavor,index)=><img key={flavor.id} src={flavor.image} alt={`HUBB ${flavor.en}`} style={{"--stack":index} as CSSProperties}/>)}</div></header>

    <section className="retarget-paths"><p>WHY YOU CAME BACK · رجعت ليش؟</p><div><article><span>VIEWED A FLAVOR</span><h2>STILL THINKING<br />ABOUT THAT COLOR?</h2><p>Return to its taste notes, then add one bag without leaving the story.</p></article><article><span>LEFT A BAG</span><h2>THE CRACK<br />IS STILL HERE.</h2><p>Your device keeps the bag locally. No fake countdown, no invented scarcity.</p></article><article><span>FINISHED TASTE LAB</span><h2>YOUR MATCH<br />HAS A NUMBER.</h2><p>Use your saved result to continue with the flavor that fits your mood.</p></article></div></section>

    <section className="retarget-pick" id="pick"><header><p>07 FLAVORS · 07 CREATIVE ANGLES</p><h2>PICK THE ONE<br /><em>YOU&apos;D PASS AROUND.</em></h2></header><div>{flavors.map(flavor=><Link href={`/flavors/${flavor.id}`} key={flavor.id} style={{"--retarget":flavor.color} as CSSProperties}><span>{flavor.number}</span><img src={flavor.image} alt={`HUBB ${flavor.en} sunflower seeds`} /><h3 lang="ar">{flavor.ar}</h3><p>{flavor.en}</p><small>{flavor.moodEn} ↗</small></Link>)}</div></section>

    <section className="retarget-proof"><div><p>THE OFFER</p><h2>START SMALL.<br /><em>TASTE WIDE.</em></h2></div><ul><li><b>SAR 5</b><span>One 100g flavor</span></li><li><b>SAR 32</b><span>All seven · save SAR 3</span></li><li><b>NO FAKE URGENCY</b><span>Choose by taste, not pressure</span></li></ul><Link href="/shop">SHOP ALL SEVEN ↗</Link></section>
  </main>;
}
