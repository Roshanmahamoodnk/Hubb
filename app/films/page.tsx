import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Films — سبع نكهات في 15 ثانية",
  description: "Watch the HUBB seven-pack film in wide and vertical cuts.",
};

export default function FilmsPage() {
  return (
    <main className="page-main films-page">
      <header><p>HUBB FILMS · أفلام حُبّ</p><h1>FIFTEEN SECONDS.<br /><em>SEVEN WORLDS.</em></h1><blockquote lang="ar">لون يجي بعد لون. والقرمشة تجمعهم.</blockquote></header>
      <section className="film-wide"><video controls muted playsInline preload="metadata" poster="/video/hubb-seven-worlds-poster.webp"><source src="/video/hubb-seven-worlds-cinema.webm" type="video/webm" /><source src="/video/hubb-seven-worlds-cinema.mp4" type="video/mp4" /></video><div><span>01 / WIDE CUT</span><h2>THE SEVEN,<br />SIDE BY SIDE.</h2><p>Classic blue opens the film. Americano closes it. Every bag gets its moment.</p></div></section>
      <section className="film-vertical"><div><span>02 / VERTICAL CUT</span><h2>MADE FOR<br /><em>THE THUMB.</em></h2><p>The same fifteen seconds, cut for Reels, TikTok and Shorts.</p><Link href="/shop">PICK YOUR FIRST BAG ↗</Link></div><video controls muted playsInline preload="none" poster="/video/hubb-seven-worlds-mobile-poster.webp"><source src="/video/hubb-seven-worlds-mobile.mp4" type="video/mp4" /></video></section>
    </main>
  );
}
