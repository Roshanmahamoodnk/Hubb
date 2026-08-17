import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Our story", description: "HUBB is a Riyadh-packed sunflower-seed brand. Vacuum infusion, outer dust, Arabic-first packs. The mill is Rozana.", alternates: { canonical: "/story" } };

export default function StoryPage() {
  return <main className="page-main story-page">
    <header className="story-hero"><p>OUR STORY · قصتنا</p><h1>A FAMILIAR RITUAL.<br /><em>A NEW SAUDI VOICE.</em></h1><blockquote>طقّها. اللب كبسة. الطعم في اللب.</blockquote></header>
    <section className="story-chapter"><span>01 / THE OBSERVATION</span><div><h2>THE BAG ALWAYS<br />LIVES IN THE MIDDLE.</h2><p>At the match, in the car, across the majlis: in-shell seeds are not eaten in one rushed bite. They live through the whole conversation. HUBB starts with that behaviour, then puts flavor in the kernel — not only on the shell.</p></div><aside><b>CRACK</b><small>the sound</small><b>PASS</b><small>the social gesture</small><b>REPEAT</b><small>the ritual</small></aside></section>
    <section className="story-black"><div className="story-calligraphy"><span>حُبّ</span><i /></div><div><p>02 / THE MARK</p><h2>A BRUSHED NAME.<br /><em>A MAKER&apos;S PRINT.</em></h2><p>The public snack brand is HUBB / حُبّ. The mill is Rozana in Riyadh. Calligraphy is a human gesture, not generated type. A gold seed completes the mark. The thumbprint says somebody packed this.</p></div></section>
    <section className="story-sadu"><div><p>03 / THE PATTERN</p><h2>HERITAGE,<br />NOT A COSTUME.</h2><p>Najdi Sadu geometry is abstracted into a quiet structural rhythm. It appears through light, emboss and movement rather than becoming a loud cultural wallpaper. No masala bazaar. No museum vitrine.</p><ul><li>Arabic leads</li><li>Bone and black ground the family</li><li>One color band carries each flavor</li><li>Packed in Riyadh · Halal</li></ul></div><div className="sadu-field" /></section>
    <section className="story-chapter"><span>04 / THE PROCESS</span><div><h2>0.05 MPa.<br />THEN THE DUST.</h2><p>Vacuum pulls liquor through the husk into the kernel. Outer dust is the Snap moment. Roast to 1.5–2.0% moisture, nitrogen pack. E-com is loud. Retail is quieter. Same brand, two prices, two pack faces.</p></div><aside><b>0.05</b><small>MPa vacuum</small><b>72–100</b><small>mesh dust</small><b>N2</b><small>pillow pack</small></aside></section>
    <section className="story-law"><p>05 / THE DESIGN LAW</p><h2>ONE PACK.<br />ONE FLAVOR.<br /><em>ONE BRUSHSTROKE.</em></h2><Link href="/how-it-works">SEE HOW IT WORKS ↗</Link></section>
  </main>;
}
