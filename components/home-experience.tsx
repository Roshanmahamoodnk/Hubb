"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ProductCard, SensoryBars } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { useCart } from "@/components/cart-provider";
import { flavors, formatSar, starterBundle } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";

type Language = "ar" | "en";

function Hero({ language }: { language: Language }) {
  const [active, setActive] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { add } = useCart();
  const flavor = flavors[active];
  const onMove = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientX - box.left) / box.width - 0.5) * 10, y: ((event.clientY - box.top) / box.height - 0.5) * -8 });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % flavors.length), 6500);
    return () => window.clearInterval(timer);
  }, [autoRotate]);

  return (
    <section className="v2-hero" style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties} onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="hero-noise" />
      <div className="hero-orbit" aria-hidden="true"><span>CRACK</span><i>ذوق</i><span>REPEAT</span><i>حُبّ</i></div>
      <div className="hero-copy">
        <motion.span key={`${flavor.id}-num`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{flavor.number} / 07</motion.span>
        <AnimatePresence mode="wait">
          <motion.div key={`${flavor.id}-copy`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
            <p>{language === "ar" ? "نكهة سعودية بصوت جديد" : "A NEW SAUDI FLAVOR VOICE"}</p>
            <h1 lang="ar">{flavor.ar}</h1>
            <h2>{flavor.en}</h2>
            <blockquote>{language === "ar" ? flavor.moodAr : flavor.moodEn}</blockquote>
          </motion.div>
        </AnimatePresence>
        <div className="hero-ctas">
          <button onClick={() => add(flavor.id)}>{language === "ar" ? "أضف للحقيبة" : "ADD TO BAG"}<b>{formatSar(flavor.priceSar)}</b></button>
          <Link href={`/flavors/${flavor.id}`}>{language === "ar" ? "اكتشف النكهة" : "ENTER THE FLAVOR"} ↗</Link>
        </div>
      </div>
      <div className="hero-pack-stage">
        <span className="paint-swipe" />
        <AnimatePresence mode="wait">
          <motion.img key={flavor.id} src={flavor.image} alt={`HUBB ${flavor.en}`} initial={{ opacity: 0, scale: .86, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotateX: tilt.y, rotateY: tilt.x }} exit={{ opacity: 0, scale: 1.08, rotate: 4 }} transition={{ duration: .62, ease: [0.16, 1, 0.3, 1] }} />
        </AnimatePresence>
        <small>MOVE TO FEEL THE PACK · حرّك المؤشر</small>
      </div>
      <div className="flavor-rail" role="tablist" aria-label="Choose a flavor">
        {flavors.map((item, index) => (
          <button key={item.id} className={index === active ? "is-active" : ""} onClick={() => { setActive(index); setAutoRotate(false); }} style={{ "--dot": item.color } as CSSProperties} role="tab" aria-selected={index === active}>
            <i /> <span>{item.ar}</span><small>{item.en}</small>
          </button>
        ))}
      </div>
      <div className="hero-scroll">SCROLL TO CRACK <span>↓</span></div>
    </section>
  );
}

function TasteSwitchboard() {
  const [active, setActive] = useState(2);
  const flavor = flavors[active];
  return (
    <section className="taste-switchboard" style={{ "--flavor": flavor.color, "--pale": flavor.pale } as CSSProperties}>
      <div className="switch-copy">
        <p className="section-kicker">TASTE, NOT JUST A COLOR · النكهة أولًا</p>
        <h2>WHAT DOES YOUR<br /><em>MOOD TASTE LIKE?</em></h2>
        <p>Seven sensory signatures. Tap a color, read the profile, then choose the crack that fits your moment.</p>
        <Link href="/taste-lab">TAKE THE 30-SECOND TASTE TEST ↗</Link>
      </div>
      <div className="switch-board">
        <div className="switch-tabs">
          {flavors.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} style={{ "--tab": item.color } as CSSProperties}><span>{item.number}</span><b>{item.ar}</b><small>{item.en}</small></button>)}
        </div>
        <div className="switch-reading">
          <AnimatePresence mode="wait"><motion.div key={flavor.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <span>{flavor.ritual}</span><h3>{flavor.moodEn}</h3><p lang="ar">{flavor.noteAr}</p><SensoryBars flavor={flavor} />
          </motion.div></AnimatePresence>
          <img src={flavor.image} alt={`${flavor.en} flavor`} />
        </div>
      </div>
    </section>
  );
}

function FilmStage() {
  const frames = [
    { image: "/products/classic.webp", tag: "01 / THE SOUND", title: "HEAR THE CLEAN CRACK." },
    { image: "/products/lemon-salt.webp", tag: "02 / THE AROMA", title: "OPEN. INHALE. WAKE UP." },
    { image: "/products/spices.webp", tag: "03 / THE RITUAL", title: "ONE BAG. MANY HANDS." },
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="film-stage">
      <div className="film-frame" style={{ backgroundImage: `linear-gradient(90deg,rgba(14,12,9,.8),rgba(14,12,9,.08)),url(${frames[active].image})` }}>
        <button className="film-play" aria-label="Play concept film"><span>▶</span><small>PLAY THE CRACK<br />00:15 CONCEPT FILM</small></button>
        <div><p>{frames[active].tag}</p><h2>{frames[active].title}</h2><span>REAL-PRODUCTION MEDIA SLOT · READY TO REPLACE IN ADMIN</span></div>
      </div>
      <div className="film-chapters">{frames.map((frame, index) => <button key={frame.tag} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>0{index + 1}</span>{frame.title}</button>)}</div>
    </section>
  );
}

function RitualScroll() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const spin = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const rise = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section className="ritual-scroll" ref={section}>
      <div className="ritual-sticky">
        <div className="ritual-visual"><motion.div className="seed-shell" style={{ rotate: spin }}><i /><i /></motion.div><motion.img src="/products/classic.webp" alt="HUBB Classic pack" style={{ y: rise }} /></div>
        <div className="ritual-story">
          <p className="section-kicker">THE HUBB RITUAL · طقس حُبّ</p>
          <h2>POSITION.<br />CRACK.<br /><em>REVEAL.</em></h2>
          <ol><li><b>01</b><span>Find the seam<small>ثبّت الحبة</small></span></li><li><b>02</b><span>Make it sing<small>اكسر القشرة</small></span></li><li><b>03</b><span>Meet the roast<small>اكتشف اللُّب</small></span></li></ol>
          <Link href="/journal/how-to-eat-sunflower-seeds">LEARN THE CLEAN CRACK ↗</Link>
        </div>
      </div>
    </section>
  );
}

export function HomeExperience({ initialLanguage }: { initialLanguage: Language }) {
  const { add } = useCart();
  return (
    <main className="home-v2">
      <Hero language={initialLanguage} />
      <section className="manifesto"><Reveal><span>حُبّ</span><h2>NOT ANOTHER BLACK SNACK BAG.</h2><p>HUBB turns a familiar Saudi ritual into seven vivid flavor worlds—made to be held, cracked, passed around and remembered.</p><blockquote>سناك مألوف، بتجربة لم ترها من قبل.</blockquote></Reveal></section>
      <TasteSwitchboard />
      <FilmStage />
      <RitualScroll />
      <section className="home-shop">
        <div className="section-heading"><p className="section-kicker">THE FIRST FOUR · أول أربع قرمشات</p><h2>START WITH<br /><em>A COLOR.</em></h2><Link href="/shop">SHOP ALL 7 ↗</Link></div>
        <div className="product-grid">{flavors.slice(0, 4).map((flavor) => <ProductCard flavor={flavor} key={flavor.id} />)}</div>
        <div className="bundle-banner"><div><span>7 × 100G · SAVE SAR 3</span><h3>{starterBundle.ar}</h3><h2>{starterBundle.en}</h2><p>Every flavor. One giftable first crack. Built for the table, the road and the group chat.</p></div><div className="bundle-packs">{flavors.map((flavor, index) => <img key={flavor.id} src={flavor.image} alt="" style={{ "--i": index } as CSSProperties} />)}</div><button onClick={() => flavors.forEach((flavor) => add(flavor.id))}>ADD ALL SEVEN <b>{formatSar(starterBundle.priceSar)}</b></button></div>
      </section>
      <section className="maker-section"><div className="maker-art"><span className="maker-brush">حُبّ</span><i className="maker-print" /></div><div><p className="section-kicker">MADE BY A HAND, NOT A TEMPLATE</p><h2>SAUDI CRAFT.<br /><em>DRAWN FOR NOW.</em></h2><p>The calligraphic gesture, thumbprint and re-cut Sadu rhythm carry human irregularity on purpose. Every flavor changes the energy. The family never loses its voice.</p><Link href="/story">READ THE DESIGN STORY ↗</Link></div></section>
      <section className="journal-preview"><div className="section-heading"><p className="section-kicker">THE CRACK JOURNAL · مجلة حُبّ</p><h2>KNOW YOUR<br /><em>SEED.</em></h2><Link href="/journal">READ ALL ↗</Link></div><div className="journal-grid">{journalPosts.map((post, index) => <Link href={`/journal/${post.slug}`} key={post.slug}><span>0{index + 1}</span><p>{post.eyebrow}</p><h3>{post.titleAr}</h3><h4>{post.title}</h4><small>{post.readingTime} · READ ↗</small></Link>)}</div></section>
      <section className="final-crack"><img src="/products/classic.webp" alt="HUBB Classic" /><div><span>YOUR FIRST CRACK IS WAITING.</span><h2>اختر لونك.<br /><em>وافتح عالمك.</em></h2><Link href="/shop">SHOP THE SEVEN ↗</Link></div></section>
    </main>
  );
}
