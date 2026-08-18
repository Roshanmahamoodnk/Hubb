"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ProductCard, SensoryBars } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { useCart } from "@/components/cart-provider";
import { flavorById, flavors, formatSar, starterBundle, type Flavor } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";
import { readSavedFlavorId } from "@/lib/taste-memory";

type Language = "ar" | "en";

const CINEMA_DURATION = 15;
const CINEMA_CHAPTER = CINEMA_DURATION / flavors.length;

type BrowserConnection = EventTarget & { saveData?: boolean };

function useCinemaPolicy() {
  const reducedMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const connection = (navigator as Navigator & { connection?: BrowserConnection }).connection;
    const sync = () => {
      setIsMobile(mobileQuery.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    sync();
    mobileQuery.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    return () => {
      mobileQuery.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
    };
  }, []);

  return { reducedMotion, isMobile, saveData };
}

function CinemaSources() {
  return (
    <>
      <source src="/video/hubb-seven-worlds-mobile.mp4" type="video/mp4" media="(max-width: 720px)" />
      <source src="/video/hubb-seven-worlds-cinema.webm" type="video/webm" media="(min-width: 721px)" />
      <source src="/video/hubb-seven-worlds-cinema.mp4" type="video/mp4" />
    </>
  );
}

function Hero({ language }: { language: Language }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 260, damping: 28, mass: 0.35 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 260, damping: 28, mass: 0.35 });
  const { reducedMotion, isMobile, saveData } = useCinemaPolicy();
  const { add } = useCart();
  const flavor = flavors[active];
  const onMove = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientX - box.left) / box.width - 0.5) * 10);
    tiltY.set(((event.clientY - box.top) / box.height - 0.5) * -8);
  };

  useEffect(() => {
    const video = videoRef.current;
    const stage = heroRef.current;
    if (!video || !stage || reducedMotion) {
      video?.pause();
      return;
    }

    video.playbackRate = 0.42;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !saveData && !userPaused.current) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.2 });
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (!saveData && !userPaused.current && stage.getBoundingClientRect().bottom > 0) void video.play().catch(() => undefined);
    };
    observer.observe(stage);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion, saveData]);

  const toggleCinema = async () => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (video.paused) {
      userPaused.current = false;
      await video.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const chooseFlavor = async (index: number) => {
    setActive(index);
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.currentTime = index * CINEMA_CHAPTER + 0.08;
    if (!saveData && !userPaused.current) await video.play().catch(() => undefined);
  };

  return (
    <section ref={heroRef} className="v2-hero cinema-hero" data-playing={playing} style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties} onPointerMove={onMove} onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}>
      <motion.div className="hero-cinema-layer" aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={saveData ? "none" : "metadata"}
          poster={isMobile ? "/video/hubb-seven-worlds-mobile-poster.webp" : "/video/hubb-seven-worlds-poster.webp"}
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => {
            const time = event.currentTarget.currentTime;
            const next = Math.min(flavors.length - 1, Math.floor(time / CINEMA_CHAPTER));
            setActive((current) => current === next ? current : next);
            setProgress(time / CINEMA_DURATION);
          }}
        >
          <CinemaSources />
        </video>
        <div className="hero-cinema-shade" />
      </motion.div>
      <div className="hero-noise" />
      <div className="hero-orbit" aria-hidden="true"><span>CRACK</span><i>ذوق</i><span>REPEAT</span><i>حُبّ</i></div>
      <div className="hero-copy">
        <motion.span key={`${flavor.id}-num`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{flavor.number} / 07</motion.span>
        <AnimatePresence mode="wait">
          <motion.div key={`${flavor.id}-copy`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
            <p>{language === "ar" ? "افتح. اكسر. ذُق." : "OPEN. CRACK. TASTE."}</p>
            <h1 lang="ar">{flavor.ar}</h1>
            <h2>{flavor.en}</h2>
            <blockquote>{language === "ar" ? flavor.moodAr : flavor.moodEn}</blockquote>
          </motion.div>
        </AnimatePresence>
        <div className="hero-ctas">
          <button data-cursor="ADD" onClick={() => add(flavor.id)}>{language === "ar" ? "أضف للحقيبة" : "ADD TO BAG"}<b>{formatSar(flavor.priceSar)}</b></button>
          <Link href={`/flavors/${flavor.id}`}>{language === "ar" ? "اكتشف النكهة" : "ENTER THE FLAVOR"} ↗</Link>
        </div>
      </div>
      <div className="hero-pack-stage">
        <span className="paint-swipe" />
        <AnimatePresence mode="wait">
          <motion.img key={flavor.id} src={flavor.image} alt={`HUBB ${flavor.en}`} loading="eager" fetchPriority="high" decoding="async" initial={{ opacity: 0, scale: .86, rotate: -4 }} animate={{ opacity: 1, scale: 1 }} style={{ rotateX: smoothTiltY, rotateY: smoothTiltX }} exit={{ opacity: 0, scale: 1.08, rotate: 4 }} transition={{ duration: .62, ease: [0.16, 1, 0.3, 1] }} />
        </AnimatePresence>
        <small>MOVE TO FEEL THE PACK · حرّك المؤشر</small>
      </div>
      <div className="flavor-rail" role="tablist" aria-label="Choose a flavor">
        {flavors.map((item, index) => (
          <button type="button" key={item.id} className={index === active ? "is-active" : ""} onClick={() => void chooseFlavor(index)} style={{ "--dot": item.color } as CSSProperties} role="tab" aria-selected={index === active}>
            <i /> <span>{item.ar}</span><small>{item.en}</small>
          </button>
        ))}
      </div>
      <div className="hero-cinema-control">
        <button type="button" onClick={() => void toggleCinema()} disabled={reducedMotion} aria-label={playing ? "Pause cinematic flavor film" : "Play cinematic flavor film"}>
          <span aria-hidden="true">{reducedMotion ? "●" : playing ? "Ⅱ" : "▶"}</span><b>{reducedMotion ? "STILL MODE" : playing ? "PAUSE FILM" : "PLAY FILM"}</b>
        </button>
        <div className="hero-cinema-progress" aria-hidden="true"><motion.i style={{ scaleX: progress, transformOrigin: "left" }} /></div>
        <small>{reducedMotion ? "MOTION PREFERENCE RESPECTED" : saveData ? "TAP TO LOAD · توفير البيانات" : `${flavor.number} / 07 · CINEMA CUT`}</small>
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
        <p className="section-kicker">PICK BY TASTE · اختر حسب مزاجك</p>
        <h2>FIND TONIGHT’S<br /><em>CRACK.</em></h2>
        <p>Tap a flavor. See the salt, heat, roast and aroma before you open the bag.</p>
        <Link href="/taste-lab">FIND MINE IN 30 SECONDS ↗</Link>
      </div>
      <div className="switch-board">
        <div className="switch-tabs">
          {flavors.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} style={{ "--tab": item.color } as CSSProperties}><span>{item.number}</span><b>{item.ar}</b><small>{item.en}</small></button>)}
        </div>
        <div className="switch-reading">
          <AnimatePresence mode="wait"><motion.div key={flavor.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <span>{flavor.ritual}</span><h3>{flavor.moodEn}</h3><p lang="ar">{flavor.noteAr}</p><SensoryBars flavor={flavor} />
          </motion.div></AnimatePresence>
          <img src={flavor.image} alt={`${flavor.en} flavor`} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}

function RememberedTaste() {
  const [flavor, setFlavor] = useState<Flavor | null>(null);
  const { add } = useCart();
  useEffect(() => {
    const saved = readSavedFlavorId();
    const sync = window.setTimeout(() => { if (saved) setFlavor(flavorById(saved) ?? null); }, 0);
    return () => window.clearTimeout(sync);
  }, []);
  if (!flavor) return null;
  return (
    <motion.aside className="remembered-taste" style={{ "--remembered": flavor.color } as CSSProperties} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <img src={flavor.image} alt="" loading="lazy" decoding="async" />
      <div><span>WELCOME BACK · أهلًا برجعتك</span><h2>Your last match was <em>{flavor.en}.</em></h2><p>Still your mood? Pick up where you left off.</p></div>
      <button data-cursor="ADD" onClick={() => add(flavor.id)}>ADD {flavor.en.toUpperCase()} <b>{formatSar(flavor.priceSar)}</b></button>
    </motion.aside>
  );
}

const moments = [
  { id: "match", ar: "ليلة المباراة", en: "MATCH NIGHT", flavorId: "classic", line: "Easy salt. Busy hands. No missed minutes." },
  { id: "drive", ar: "مشوار الليل", en: "NIGHT DRIVE", flavorId: "americano", line: "Dark roast for the long way home." },
  { id: "majlis", ar: "وسط المجلس", en: "MAJLIS", flavorId: "spices", line: "Warm spice for the middle of the table." },
  { id: "desk", ar: "وقت التركيز", en: "STUDY", flavorId: "matcha", line: "Calm aroma. Naturally roasted kernels." },
];

function MomentPicker() {
  const [active, setActive] = useState(0);
  const { add } = useCart();
  const moment = moments[active];
  const flavor = flavorById(moment.flavorId) ?? flavors[0];
  const pick = (index: number) => {
    setActive(index);
    window.localStorage.setItem("hubb-last-moment", moments[index].id);
  };
  useEffect(() => {
    const saved = window.localStorage.getItem("hubb-last-moment");
    const index = moments.findIndex((item) => item.id === saved);
    const sync = window.setTimeout(() => { if (index >= 0) setActive(index); }, 0);
    return () => window.clearTimeout(sync);
  }, []);
  return (
    <section className="moment-picker" style={{ "--moment": flavor.color, "--moment-pale": flavor.pale } as CSSProperties}>
      <div className="moment-copy"><p className="section-kicker">WHAT’S TONIGHT? · وش جوّ الليلة؟</p><h2>PICK THE<br /><em>MOMENT.</em></h2><p>No quiz. Just tell us where the bag is going.</p></div>
      <div className="moment-tabs" role="tablist" aria-label="Choose tonight's moment">
        {moments.map((item, index) => <button key={item.id} role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} data-cursor="PICK" onClick={() => pick(index)}><span>0{index + 1}</span><b>{item.ar}</b><small>{item.en}</small></button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="moment-result" key={moment.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
          <img src={flavor.image} alt={`HUBB ${flavor.en}`} loading="lazy" decoding="async" />
          <div><span>TRY THIS · جرّب</span><h3>{flavor.ar}</h3><h4>{flavor.en}</h4><p>{moment.line}</p><button data-cursor="ADD" onClick={() => add(flavor.id)}>ADD TO BAG <b>{formatSar(flavor.priceSar)}</b></button></div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function FilmStage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { reducedMotion } = useCinemaPolicy();
  const { add } = useCart();
  const flavor = flavors[active];

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % flavors.length), 2400);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  const jump = (index: number) => {
    setActive(index);
    setPlaying(false);
  };

  return (
    <section className="film-stage pack-cinema" id="film" style={{ "--film-accent": flavor.color, "--film-pale": flavor.pale } as CSSProperties}>
      <div className="pack-cinema-frame" data-playing={playing} data-world={flavor.number}>
        <div className="pack-cinema-word" lang="ar" aria-hidden="true">{flavor.ar}</div>
        <div className="pack-cinema-grid" aria-hidden="true" />
        <div className="film-copy"><p>{flavor.number} / 07 · {flavor.ar}</p><h2>SEVEN WORLDS.<br /><em>ONE CRACK.</em></h2><span>{flavor.en.toUpperCase()} · {flavor.moodEn.toUpperCase()}</span></div>
        <AnimatePresence mode="wait">
          <motion.div className="pack-cinema-product" key={flavor.id} initial={reducedMotion ? false : { opacity: 0, scale: .78, rotate: -7, y: 70 }} animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 1.12, rotate: 8, y: -45 }} transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}>
            <img src={flavor.image} alt={`HUBB ${flavor.en} pack`} loading="lazy" decoding="async" />
            <i aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.aside className="film-buy-signal" key={flavor.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <img src={flavor.image} alt="" loading="lazy" decoding="async" />
            <div><span>NOW CRACKING · الآن</span><b lang="ar">{flavor.ar}</b><small>{flavor.en}</small></div>
            <button data-cursor="ADD" onClick={() => add(flavor.id)}>ADD <b>{formatSar(flavor.priceSar)}</b></button>
            <Link href={`/flavors/${flavor.id}`}>TASTE NOTES ↗</Link>
          </motion.aside>
        </AnimatePresence>
      </div>
      <div className="cinema-controls pack-cinema-controls" role="group" aria-label="Seven flavor presentation controls">
        <button type="button" className="cinema-toggle" onClick={() => setPlaying((value) => !value)} disabled={reducedMotion} aria-label={playing ? "Pause flavor presentation" : "Play flavor presentation"}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{reducedMotion ? "STILL MODE" : playing ? "PAUSE" : "AUTO PLAY"}</button>
        <div className="pack-cinema-meter" aria-hidden="true"><i style={{ width: `${((active + 1) / flavors.length) * 100}%` }} /></div>
        <span className="cinema-time">WORLD {flavor.number} / 07</span>
        <Link className="pack-cinema-film-link" href="/films">REAL FILM ARCHIVE ↗</Link>
      </div>
      <div className="film-chapters">{flavors.map((item, index) => <button type="button" key={item.id} className={index === active ? "is-active" : ""} style={{ "--chapter": item.color } as CSSProperties} onClick={() => jump(index)} aria-label={`Show ${item.en} world`} aria-pressed={index === active}><span>{item.number}</span>{item.en}</button>)}</div>
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
        <div className="ritual-visual"><motion.div className="seed-shell" style={{ rotate: spin }}><i /><i /></motion.div><motion.img src="/products/classic.webp" alt="HUBB Classic pack" loading="lazy" decoding="async" style={{ y: rise }} /></div>
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
  const { addBundle } = useCart();
  return (
    <main className="home-v2">
      <Hero language={initialLanguage} />
      <RememberedTaste />
      <section className="manifesto"><Reveal><span>حُبّ</span><h2>SEVEN FLAVORS.<br />START WITH ONE.</h2><p>A familiar Saudi ritual, redrawn in color. Pick a bag for tonight, pass it around, then reach back in.</p><blockquote>حبة نعرفها. تجربة نبي نكررها.</blockquote></Reveal></section>
      <TasteSwitchboard />
      <MomentPicker />
      <FilmStage />
      <RitualScroll />
      <section className="home-shop">
        <div className="section-heading"><p className="section-kicker">THE FIRST FOUR · أول أربع قرمشات</p><h2>PICK ONE.<br /><em>PASS IT ON.</em></h2><Link href="/shop">SHOP ALL 7 ↗</Link></div>
        <div className="product-grid">{flavors.slice(0, 4).map((flavor) => <ProductCard flavor={flavor} key={flavor.id} />)}</div>
        <div className="bundle-banner"><div><span>7 × 100G · SAVE SAR 3</span><h3>{starterBundle.ar}</h3><h2>{starterBundle.en}</h2><p>All seven. Put them on the table and watch which color disappears first.</p></div><div className="bundle-packs">{flavors.map((flavor, index) => <img key={flavor.id} src={flavor.image} alt="" loading="lazy" decoding="async" style={{ "--i": index } as CSSProperties} />)}</div><button data-cursor="ADD 7" onClick={() => addBundle(flavors.map((flavor) => flavor.id))}>ADD ALL SEVEN <b>{formatSar(starterBundle.priceSar)}</b></button></div>
      </section>
      <section className="maker-section"><div className="maker-art"><span className="maker-brush">حُبّ</span><i className="maker-print" /></div><div><p className="section-kicker">MADE BY A HAND, NOT A TEMPLATE</p><h2>SAUDI CRAFT.<br /><em>DRAWN FOR NOW.</em></h2><p>The brush, thumbprint and modern Sadu rhythm stay a little imperfect on purpose. Each color changes the mood. The family still feels like HUBB.</p><Link href="/story">READ THE DESIGN STORY ↗</Link></div></section>
      <section className="journal-preview"><div className="section-heading"><p className="section-kicker">THE CRACK JOURNAL · مجلة حُبّ</p><h2>KNOW YOUR<br /><em>SEED.</em></h2><Link href="/journal">READ ALL ↗</Link></div><div className="journal-grid">{journalPosts.map((post, index) => <Link href={`/journal/${post.slug}`} key={post.slug}><span>0{index + 1}</span><p>{post.eyebrow}</p><h3>{post.titleAr}</h3><h4>{post.title}</h4><small>{post.readingTime} · READ ↗</small></Link>)}</div></section>
      <section className="final-crack"><img src="/products/classic.webp" alt="HUBB Classic" loading="lazy" decoding="async" /><div><span>ONE BAG IS ENOUGH TO START.</span><h2>اختر لونك.<br /><em>وخله يدور.</em></h2><Link href="/shop">PICK YOUR FIRST ↗</Link></div></section>
    </main>
  );
}
