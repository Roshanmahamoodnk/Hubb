import Link from "next/link";
import type { CSSProperties } from "react";
import { flavors } from "@/lib/catalog";
import { brandCuts, flavorLoopPoster, flavorLoopSrc } from "@/lib/films";

export function FilmsExperience() {
  const wide = brandCuts[0];
  const vertical = brandCuts[1];
  const crack = brandCuts[2];
  return (
    <main className="page-main films-page">
      <header>
        <p>HUBB FILMS · أفلام حُبّ</p>
        <h1>FIFTEEN SECONDS.<br /><em>SEVEN WORLDS.</em></h1>
        <blockquote lang="ar">لون يجي بعد لون. والقرمشة تجمعهم.</blockquote>
      </header>
      <section className="film-wide">
        <video controls muted playsInline preload="metadata" poster={wide.poster}>
          {wide.webm ? <source src={wide.webm} type="video/webm" /> : null}
          <source src={wide.src} type="video/mp4" />
        </video>
        <div>
          <span>{wide.kicker}</span>
          <h2>THE SEVEN,<br />SIDE BY SIDE.</h2>
          <p>{wide.body}</p>
        </div>
      </section>
      <section className="film-vertical">
        <div>
          <span>{vertical.kicker}</span>
          <h2>MADE FOR<br /><em>THE THUMB.</em></h2>
          <p>{vertical.body}</p>
          <Link href="/shop">PICK YOUR FIRST BAG ↗</Link>
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
          <span>{crack.kicker}</span>
          <h2>SHELL.<br />SEAM.<br /><em>KERNEL.</em></h2>
          <p>{crack.body}</p>
        </div>
      </section>
      <section className="film-loops">
        <div className="section-heading">
          <p className="section-kicker">SKU LOOPS · حلقات النكهة</p>
          <h2>SIX SECONDS<br /><em>EACH WORLD.</em></h2>
        </div>
        <div className="loop-grid">
          {flavors.map((flavor) => (
              <article key={flavor.id} style={{ "--loop": flavor.color } as CSSProperties}>
              <video muted loop playsInline preload="none" poster={flavorLoopPoster(flavor.id)} controls>
                <source src={flavorLoopSrc(flavor.id)} type="video/mp4" />
              </video>
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
