import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Our story", description: "How HUBB turns a familiar Saudi seed ritual into a contemporary flavor and design system.", alternates: { canonical: "/story" } };

export default function StoryPage() {
  return <main className="page-main story-page">
    <header className="story-hero"><p>OUR STORY · قصتنا</p><h1>A FAMILIAR RITUAL.<br /><em>A NEW SAUDI VOICE.</em></h1><blockquote>الحب ليس مجرد سناك. هو صوت، حركة، ووقت نقضيه معًا.</blockquote></header>
    <section className="story-chapter"><span>01 / THE OBSERVATION</span><div><h2>THE BAG ALWAYS<br />LIVES IN THE MIDDLE.</h2><p>At the match, in the car, across the majlis: in-shell seeds are not eaten in one rushed bite. They live through the whole conversation. HUBB starts with that behaviour, not with a trend board.</p></div><aside><b>CRACK</b><small>the sound</small><b>PASS</b><small>the social gesture</small><b>REPEAT</b><small>the ritual</small></aside></section>
    <section className="story-black"><div className="story-calligraphy"><span>حُبّ</span><i /></div><div><p>02 / THE MARK</p><h2>A BRUSHED NAME.<br /><em>A MAKER&apos;S PRINT.</em></h2><p>The calligraphy is commissioned as a human gesture, not generated type. A gold seed completes the mark. The thumbprint says somebody made this. The imperfections are not decoration; they are the point.</p></div></section>
    <section className="story-sadu"><div><p>03 / THE PATTERN</p><h2>HERITAGE,<br />NOT A COSTUME.</h2><p>Najdi Sadu geometry is abstracted into a quiet structural rhythm. It appears through light, emboss and movement rather than becoming a loud cultural wallpaper.</p><ul><li>Arabic leads</li><li>Bone and black ground the family</li><li>One brushstroke carries each flavor</li></ul></div><div className="sadu-field" /></section>
    <section className="story-law"><p>04 / THE DESIGN LAW</p><h2>ONE PACK.<br />ONE FLAVOR.<br /><em>ONE BRUSHSTROKE.</em></h2><Link href="/shop">MEET ALL SEVEN ↗</Link></section>
  </main>;
}
