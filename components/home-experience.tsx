"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ProductCard, SensoryBars } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { useCart } from "@/components/cart-provider";
import { HowToCrack } from "@/components/how-to-crack";
import { ProcessChapter } from "@/components/process-chapter";
import { ComparisonGrid } from "@/components/comparison-grid";
import { ChannelStory } from "@/components/channel-story";
import { HubbFaq } from "@/components/hubb-faq";
import { PackPlate } from "@/components/pack-plate";
import { flavorById, flavors, formatSar, PROCESS, starterBundle, type Flavor } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";
import { readSavedFlavorId } from "@/lib/taste-memory";
import { RITUAL_FILM, WORLD_FILM } from "@/lib/films";
import { formatFilmTime, useCinemaPolicy } from "@/lib/cinema";
import { useLanguage } from "@/lib/language";

const CINEMA_DURATION = 15;
const CINEMA_CHAPTER = CINEMA_DURATION / flavors.length;

function WorldSources() {
  return (
    <>
      <source src={WORLD_FILM.mobile} type="video/mp4" media="(max-width: 720px)" />
      <source src={WORLD_FILM.webm} type="video/webm" />
      <source src={WORLD_FILM.src} type="video/mp4" />
    </>
  );
}

function Hero() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 260, damping: 28, mass: 0.35 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 260, damping: 28, mass: 0.35 });
  const { reducedMotion, saveData } = useCinemaPolicy();
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !saveData && !userPaused.current) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.15 });
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

  useEffect(() => {
    const loop = loopRef.current;
    if (!loop || reducedMotion || saveData || !flavor.loopSrc) {
      loop?.pause();
      return;
    }
    void loop.play().catch(() => undefined);
  }, [flavor.loopSrc, reducedMotion, saveData]);

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

  return (
    <section
      ref={heroRef}
      className="v2-hero cinema-hero hero-bleed"
      data-playing={playing}
      style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}
    >
      <div className="hero-video-bleed" aria-hidden="true">
        {reducedMotion ? (
          <div className="cinema-still" style={{ backgroundImage: `url(${RITUAL_FILM.poster})` }} />
        ) : (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload={saveData ? "none" : "metadata"}
            poster={RITUAL_FILM.poster}
            tabIndex={-1}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={RITUAL_FILM.src} type="video/mp4" />
          </video>
        )}
        <div className="hero-cinema-shade" />
      </div>
      <div className="hero-noise" />
      <div className="hero-copy">
        <motion.span key={`${flavor.id}-num`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{flavor.number} / 07</motion.span>
        <AnimatePresence mode="wait">
          <motion.div key={`${flavor.id}-copy`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
            <p>{t(PROCESS.promiseAr, PROCESS.promiseEn)}</p>
            <h1 lang={language}>{t(PROCESS.heroAr, PROCESS.heroEn)}</h1>
            <h2>{flavor.ar} <small>{flavor.en}</small></h2>
            <blockquote>{language === "ar" ? flavor.lineAr : flavor.lineEn}</blockquote>
          </motion.div>
        </AnimatePresence>
        <div className="hero-ctas">
          <button data-cursor="ADD" onClick={() => add(flavor.id)}>{t("أضف للحقيبة", "ADD TO BAG")}<b>{formatSar(flavor.priceSar)}</b></button>
          <Link href={`/flavors/${flavor.id}`}>{t("ادخل النكهة", "ENTER THE FLAVOR")} ↗</Link>
        </div>
        <aside className="hero-ticket">
          <span>{t("رقمك", "YOUR NUMBER")}</span>
          <b>{flavor.number}</b>
          <small>{flavor.ar} · {flavor.en}</small>
        </aside>
      </div>
      <div className="hero-pack-stage">
        <span className="paint-swipe" />
        {flavor.loopSrc && !reducedMotion ? (
          <video ref={loopRef} className="hero-flavor-loop" muted loop playsInline preload="none" poster={flavor.loopPoster} aria-hidden="true">
            <source src={flavor.loopSrc} type="video/mp4" />
          </video>
        ) : null}
        <AnimatePresence mode="wait">
          <motion.div key={flavor.id} className="hero-pack-frame" initial={{ opacity: 0, scale: 0.86, rotate: -4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.08, rotate: 4 }} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }} style={{ rotateX: smoothTiltY, rotateY: smoothTiltX }}>
            <PackPlate flavor={flavor} />
          </motion.div>
        </AnimatePresence>
        <small>{t("حرّك المؤشر · الكيس في الإطار", "MOVE TO FEEL THE PACK")}</small>
      </div>
      <div className="flavor-rail" role="tablist" aria-label={t("اختر نكهة", "Choose a flavor")}>
        {flavors.map((item, index) => (
          <button type="button" key={item.id} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} style={{ "--dot": item.color } as CSSProperties} role="tab" aria-selected={index === active}>
            <i /> <span>{item.ar}</span><small>{item.en}</small>
          </button>
        ))}
      </div>
      <div className="hero-cinema-control">
        <button type="button" onClick={() => void toggleCinema()} disabled={reducedMotion} aria-label={playing ? t("أوقف الفيلم", "Pause ritual film") : t("شغّل الفيلم", "Play ritual film")}>
          <span aria-hidden="true">{reducedMotion ? "●" : playing ? "Ⅱ" : "▶"}</span>
          <b>{reducedMotion ? "STILL MODE" : playing ? t("إيقاف", "PAUSE FILM") : t("تشغيل", "PLAY FILM")}</b>
        </button>
        <small>{reducedMotion ? t("تم احترام تقليل الحركة", "MOTION PREFERENCE RESPECTED") : saveData ? t("اضغط للتحميل", "TAP TO LOAD") : t("طقس القرمشة · طقّ. ذُق. مرّر.", "RITUAL CUT · CRACK. TASTE. PASS.")}</small>
      </div>
      <div className="hero-scroll">{t("انزل للطقّة", "SCROLL TO CRACK")} <span>↓</span></div>
    </section>
  );
}

function TasteSwitchboard() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(3);
  const flavor = flavors[active];
  return (
    <section className="taste-switchboard" style={{ "--flavor": flavor.color, "--pale": flavor.pale } as CSSProperties}>
      <div className="switch-copy">
        <p className="section-kicker">{t("اختر حسب اللب", "PICK BY THE KERNEL")}</p>
        <h2>{t("طقّة الليلة.", "TONIGHT’S")}<br /><em>{t("من اللب.", "CRACK.")}</em></h2>
        <p>{t("اضغط النكهة. شوف الملح والحرارة والتحميص قبل تفتح الكيس.", "Tap a flavor. See salt, heat, roast and aroma before you open the bag.")}</p>
        <Link href="/taste-lab">{t("دروب المختبر ↗", "TASTE LAB DROP ↗")}</Link>
      </div>
      <div className="switch-board">
        <div className="switch-tabs">
          {flavors.map((item, index) => (
            <button key={item.id} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} style={{ "--tab": item.color } as CSSProperties}>
              <span>{item.number}</span><b>{item.ar}</b><small>{item.en}</small>
            </button>
          ))}
        </div>
        <div className="switch-reading">
          <AnimatePresence mode="wait">
            <motion.div key={flavor.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <span>{language === "ar" ? flavor.ritualAr : flavor.ritual}</span>
              <h3>{language === "ar" ? flavor.moodAr : flavor.moodEn}</h3>
              <p lang="ar">{language === "ar" ? flavor.noteAr : flavor.noteEn}</p>
              <SensoryBars flavor={flavor} />
            </motion.div>
          </AnimatePresence>
          <PackPlate flavor={flavor} className="switch-pack" />
        </div>
      </div>
    </section>
  );
}

function RememberedTaste() {
  const { t } = useLanguage();
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
      <div>
        <span>{t("رجعنا لك", "WELCOME BACK")}</span>
        <h2>{t("آخر طقّة كانت", "Your last match was")} <em>{flavor.en}.</em></h2>
        <p>{t("نفس الجو؟ كمّل من هنا.", "Still your mood? Pick up where you left off.")}</p>
      </div>
      <button data-cursor="ADD" onClick={() => add(flavor.id)}>{t("أضف", "ADD")} {flavor.en.toUpperCase()} <b>{formatSar(flavor.priceSar)}</b></button>
    </motion.aside>
  );
}

const moments = [
  { id: "match", ar: "ليلة المباراة", en: "MATCH NIGHT", flavorId: "umami-salt", lineAr: "ملح أومامي. يد مشغولة. لا دقيقة تضيع.", lineEn: "Umami salt. Busy hands. No missed minutes." },
  { id: "drive", ar: "مشوار الليل", en: "NIGHT DRIVE", flavorId: "coffee-cocoa", lineAr: "قهوة في اللب للطريق الطويل.", lineEn: "Coffee in the kernel for the long way home." },
  { id: "majlis", ar: "وسط المجلس", en: "MAJLIS", flavorId: "spice-mix", lineAr: "طقّها. اللب كبسة.", lineEn: "Crack it. The kernel is kabsa." },
  { id: "desk", ar: "بعد منتصف الليل", en: "AFTER HOURS", flavorId: "vanilla-caramel", lineAr: "شوكو للمتجر. مو للمجلس.", lineEn: "Chocolate for e-com. Not for the majlis." },
];

function MomentPicker() {
  const { language, t } = useLanguage();
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
      <div className="moment-copy">
        <p className="section-kicker">{t("وش جوّ الليلة؟", "WHAT’S TONIGHT?")}</p>
        <h2>{t("اختر اللحظة.", "PICK THE")}<br /><em>{t("مو الاختبار.", "MOMENT.")}</em></h2>
        <p>{t("بلا اختبار. قله وين بيروح الكيس.", "No quiz. Tell us where the bag is going.")}</p>
      </div>
      <div className="moment-tabs" role="tablist" aria-label={t("لحظة الليلة", "Tonight's moment")}>
        {moments.map((item, index) => (
          <button key={item.id} role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} data-cursor="PICK" onClick={() => pick(index)}>
            <span>0{index + 1}</span><b>{item.ar}</b><small>{item.en}</small>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="moment-result" key={moment.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
          <img src={flavor.image} alt={`HUBB ${flavor.en}`} loading="lazy" decoding="async" />
          <div>
            <span>{t("جرّب", "TRY THIS")}</span>
            <h3>{flavor.ar}</h3>
            <h4>{flavor.en}</h4>
            <p>{language === "ar" ? moment.lineAr : moment.lineEn}</p>
            <button data-cursor="ADD" onClick={() => add(flavor.id)}>{t("أضف للحقيبة", "ADD TO BAG")} <b>{formatSar(flavor.priceSar)}</b></button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function FilmStage() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(CINEMA_DURATION);
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const { reducedMotion, isMobile, saveData } = useCinemaPolicy();
  const { add } = useCart();
  const flavor = flavors[active];

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage || reducedMotion) {
      video?.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !saveData && !userPaused.current) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.42 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [reducedMotion, saveData]);

  const toggle = async () => {
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

  const jump = async (index: number) => {
    const video = videoRef.current;
    setActive(index);
    if (!video || reducedMotion) return;
    video.currentTime = index * CINEMA_CHAPTER + 0.08;
    userPaused.current = false;
    await video.play().catch(() => undefined);
  };

  const enterFullscreen = async () => {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (frameRef.current?.requestFullscreen) {
      await frameRef.current.requestFullscreen().catch(() => undefined);
      return;
    }
    video?.webkitEnterFullscreen?.();
  };

  return (
    <section className="film-stage" id="film" ref={stageRef} style={{ "--film-accent": flavor.color, "--film-pale": flavor.pale } as CSSProperties}>
      <div ref={frameRef} className="film-frame film-is-real" data-playing={playing}>
        {reducedMotion ? (
          <div className="cinema-still" style={{ backgroundImage: `url(${isMobile ? WORLD_FILM.mobilePoster : WORLD_FILM.poster})` }} />
        ) : (
          <video ref={videoRef} muted loop playsInline preload={saveData ? "none" : "metadata"} poster={isMobile ? WORLD_FILM.mobilePoster : WORLD_FILM.poster} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || CINEMA_DURATION)} onTimeUpdate={(event) => {
            const time = event.currentTarget.currentTime;
            setCurrentTime(time);
            setActive(Math.min(flavors.length - 1, Math.floor(time / CINEMA_CHAPTER)));
          }}>
            <WorldSources />
          </video>
        )}
        <div className="film-shade" />
        <button type="button" className="film-play" data-cursor="PLAY" aria-label={t("شغّل فيلم حُبّ", "Play HUBB brand film")} onClick={() => void toggle()} disabled={reducedMotion}><span>▶</span><small>PLAY<br />00:15</small></button>
        <div className="film-copy">
          <p>{flavor.number} / 07 · {flavor.ar}</p>
          <h2>{t("سبع نكهات.", "SEVEN WORLDS.")}<br /><em>{t("طقّة واحدة.", "ONE CRACK.")}</em></h2>
          <span>{flavor.en.toUpperCase()} · {(languageLine(flavor))}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.aside className="film-buy-signal" key={flavor.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <img src={flavor.image} alt="" loading="lazy" decoding="async" />
            <div><span>{t("الآن", "NOW CRACKING")}</span><b lang="ar">{flavor.ar}</b><small>{flavor.en}</small></div>
            <button data-cursor="ADD" onClick={() => add(flavor.id)}>{t("أضف", "ADD")} <b>{formatSar(flavor.priceSar)}</b></button>
            <Link href={`/flavors/${flavor.id}`}>{t("ملاحظات الطعم ↗", "TASTE NOTES ↗")}</Link>
          </motion.aside>
        </AnimatePresence>
      </div>
      <div className="cinema-controls" role="group" aria-label={t("تحكم الفيلم", "HUBB brand film controls")}>
        <button type="button" className="cinema-toggle" onClick={() => void toggle()} disabled={reducedMotion} aria-label={playing ? "Pause" : "Play"}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{playing ? "PAUSE" : "PLAY"}</button>
        <label className="cinema-scrubber"><span className="sr-only">Film position</span><input type="range" min="0" max={duration} step="0.01" value={Math.min(currentTime, duration)} disabled={reducedMotion} onChange={(event) => {
          const value = Number(event.currentTarget.value);
          if (videoRef.current) videoRef.current.currentTime = value;
          setCurrentTime(value);
          setActive(Math.min(flavors.length - 1, Math.floor(value / CINEMA_CHAPTER)));
        }} style={{ "--film-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties} /></label>
        <span className="cinema-time">{formatFilmTime(currentTime)} / {formatFilmTime(duration)}</span>
        <button type="button" className="cinema-fullscreen" onClick={() => void enterFullscreen()}>FULL SCREEN ↗</button>
      </div>
      <div className="film-chapters">{flavors.map((item, index) => <button type="button" key={item.id} className={index === active ? "is-active" : ""} style={{ "--chapter": item.color } as CSSProperties} onClick={() => void jump(index)} aria-label={`Play ${item.en} chapter`}><span>{item.number}</span>{item.en}</button>)}</div>
    </section>
  );
}

function languageLine(flavor: Flavor) {
  return flavor.lineEn.toUpperCase();
}

export function HomeExperience({ initialLanguage: _initialLanguage }: { initialLanguage: "ar" | "en" }) {
  const { addBundle } = useCart();
  const { t } = useLanguage();
  return (
    <main className="home-v2">
      <Hero />
      <RememberedTaste />
      <section className="manifesto">
        <Reveal>
          <span>حُبّ</span>
          <h2>{PROCESS.promiseAr}<br />{PROCESS.promiseEn}.</h2>
          <p>{t("مو كيس ملح. طقّة سعودية: افتح، طقّ، اللب متبّل. معبّأ في الرياض. حلال.", "Not a salt bag. A Saudi crack: open, crack, the kernel is already flavored. Packed in Riyadh. Halal.")}</p>
          <blockquote>طقّها. اللب كبسة.</blockquote>
        </Reveal>
      </section>
      <HowToCrack />
      <TasteSwitchboard />
      <MomentPicker />
      <ProcessChapter />
      <ComparisonGrid />
      <ChannelStory />
      <FilmStage />
      <section className="home-shop">
        <div className="section-heading">
          <p className="section-kicker">{t("الخط العلمي", "THE PROCESS LINE")}</p>
          <h2>{t("اختر واحدة.", "PICK ONE.")}<br /><em>{t("مرّرها.", "PASS IT ON.")}</em></h2>
          <Link href="/shop">{t("كل النكهات ↗", "SHOP ALL ↗")}</Link>
        </div>
        <div className="product-grid">{flavors.slice(0, 4).map((flavor) => <ProductCard flavor={flavor} key={flavor.id} />)}</div>
        <div className="bundle-banner">
          <div>
            <span>6 × 230G · {t("وفّر", "SAVE")} {formatSar(starterBundle.compareAtSar - starterBundle.priceSar)}</span>
            <h3>{starterBundle.ar}</h3>
            <h2>{starterBundle.en}</h2>
            <p>{t("ست نكهات عملية. اللب هو المختبر. الليمون يبقى إصدار.", "Six process flavors. The kernel is the lab. Lemon salt stays a collectible.")}</p>
          </div>
          <div className="bundle-packs">{flavors.slice(0, 6).map((flavor, index) => <img key={flavor.id} src={flavor.image} alt="" loading="lazy" decoding="async" style={{ "--i": index } as CSSProperties} />)}</div>
          <button data-cursor="ADD 6" onClick={() => addBundle(starterBundle.flavorIds)}>{t("أضف العيّنة", "ADD THE SAMPLER")} <b>{formatSar(starterBundle.priceSar)}</b></button>
        </div>
      </section>
      <section className="maker-section">
        <div className="maker-art"><span className="maker-brush">حُبّ</span><i className="maker-print" /></div>
        <div>
          <p className="section-kicker">{t("صناعة نجدية، مو متحف", "SAUDI NEO-CRAFT, NOT A MUSEUM")}</p>
          <h2>{t("خط، سدو،", "BRUSH, SADU,")}<br /><em>{t("وبصمة يد.", "AND A THUMBPRINT.")}</em></h2>
          <p>{t("الخط العربي والسدو إيقاع، مو ديكور. المطحنة روزانا في الرياض. العلامة على الكيس حُبّ.", "Calligraphy and Sadu are rhythm, not costume. The mill is Rozana in Riyadh. The mark on the bag is HUBB.")}</p>
          <Link href="/story">{t("اقرأ القصة ↗", "READ THE DESIGN STORY ↗")}</Link>
        </div>
      </section>
      <HubbFaq />
      <section className="journal-preview">
        <div className="section-heading">
          <p className="section-kicker">{t("مجلة حُبّ", "THE CRACK JOURNAL")}</p>
          <h2>{t("اعرف", "KNOW YOUR")}<br /><em>{t("حبّتك.", "SEED.")}</em></h2>
          <Link href="/journal">{t("اقرأ الكل ↗", "READ ALL ↗")}</Link>
        </div>
        <div className="journal-grid">{journalPosts.map((post, index) => <Link href={`/journal/${post.slug}`} key={post.slug}><span>0{index + 1}</span><p>{post.eyebrow}</p><h3>{post.titleAr}</h3><h4>{post.title}</h4><small>{post.readingTime} · READ ↗</small></Link>)}</div>
      </section>
      <section className="final-crack">
        <img src={flavors[0].image} alt="HUBB Umami salt" loading="lazy" decoding="async" />
        <div>
          <span>{t("كيس واحد يكفي تبدأ.", "ONE BAG IS ENOUGH TO START.")}</span>
          <h2>{t("اختر لونك.", "Pick your number.")}<br /><em>{t("وخله يدور.", "Let it travel.")}</em></h2>
          <Link href="/shop">{t("أول طقّة ↗", "PICK YOUR FIRST ↗")}</Link>
        </div>
      </section>
    </main>
  );
}
