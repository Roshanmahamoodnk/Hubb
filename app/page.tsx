"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Flavor = {
  id: string;
  number: string;
  en: string;
  ar: string;
  image: string;
  color: string;
  ink: string;
  pale: string;
  moodEn: string;
  moodAr: string;
  noteEn: string;
  noteAr: string;
};

const flavors: Flavor[] = [
  {
    id: "classic",
    number: "01",
    en: "Classic",
    ar: "كلاسيك",
    image: "/products/classic.webp",
    color: "#2459ff",
    ink: "#dce6ff",
    pale: "#a9bfff",
    moodEn: "The original blue crack.",
    moodAr: "القرمشة الزرقاء الأصلية.",
    noteEn: "Roasted. Salted. Unmistakably HUBB.",
    noteAr: "محمّص. مملّح. بطابع حُبّ.",
  },
  {
    id: "lemon-salt",
    number: "02",
    en: "Lemon Salt",
    ar: "ليمون وملح",
    image: "/products/lemon-salt.webp",
    color: "#e8da26",
    ink: "#13130a",
    pale: "#fff795",
    moodEn: "A bright, electric squeeze.",
    moodAr: "عصرة حمضية بنكهة كهربائية.",
    noteEn: "Citrus energy meets the perfect crack.",
    noteAr: "انتعاش الليمون يلتقي بالقرمشة المثالية.",
  },
  {
    id: "hot-salt",
    number: "03",
    en: "Hot & Salt",
    ar: "حار وملح",
    image: "/products/hot-salt.webp",
    color: "#df332f",
    ink: "#ffe1da",
    pale: "#ff9c8f",
    moodEn: "Heat with a clean finish.",
    moodAr: "حرارة واضحة ونهاية نظيفة.",
    noteEn: "Chili attitude, made for the next handful.",
    noteAr: "جرأة الفلفل ليدٍ لا تتوقف.",
  },
  {
    id: "spices",
    number: "04",
    en: "Spices",
    ar: "بهارات",
    image: "/products/spices.webp",
    color: "#d87522",
    ink: "#ffead9",
    pale: "#f6ad69",
    moodEn: "Warm spice, layered and social.",
    moodAr: "بهارات دافئة بطبقات للمشاركة.",
    noteEn: "A modern majlis mood in every crack.",
    noteAr: "مزاج مجلس عصري في كل قرمشة.",
  },
  {
    id: "ghawa",
    number: "05",
    en: "Ghawa",
    ar: "قهوة عربية",
    image: "/products/ghawa.webp",
    color: "#b87333",
    ink: "#ffe6cb",
    pale: "#dfaa76",
    moodEn: "Arabic coffee, reimagined.",
    moodAr: "القهوة العربية بروح جديدة.",
    noteEn: "Hospitality heritage with a copper glow.",
    noteAr: "ضيافة أصيلة بوهج نحاسي.",
  },
  {
    id: "matcha",
    number: "06",
    en: "Matcha",
    ar: "ماتشا",
    image: "/products/matcha.webp",
    color: "#2e6d4a",
    ink: "#e2f2e7",
    pale: "#83ad8f",
    moodEn: "Jade energy. Naturally roasted kernels.",
    moodAr: "طاقة اليشم. لُبّ محمّص بطبيعته.",
    noteEn: "Green lives in the artwork—not on the kernel.",
    noteAr: "الأخضر في الفن، وليس على اللُّب.",
  },
  {
    id: "americano",
    number: "07",
    en: "Americano",
    ar: "أمريكانو",
    image: "/products/americano.webp",
    color: "#604333",
    ink: "#f3e9dc",
    pale: "#b09079",
    moodEn: "Dark roast, after-hours mood.",
    moodAr: "تحميص داكن لمزاج ما بعد السهرة.",
    noteEn: "Espresso depth with a bone-white highlight.",
    noteAr: "عمق الإسبريسو بلمسة عاجية.",
  },
];

function SeedGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 108" aria-hidden="true">
      <path
        d="M30 3C47 21 56 41 56 62c0 24-12 43-26 43S4 86 4 62C4 41 13 21 30 3Z"
        fill="currentColor"
      />
      <path d="M30 15v78" fill="none" stroke="#0e0c09" strokeWidth="4" opacity=".48" />
      <path d="M17 31c7 8 11 17 13 27M43 31c-7 8-11 17-13 27" fill="none" stroke="#0e0c09" strokeWidth="3" opacity=".35" />
    </svg>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [paused, setPaused] = useState(false);
  const [shareLabel, setShareLabel] = useState("SHARE YOUR #");
  const active = flavors[activeIndex];

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % flavors.length),
      4800,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const theme = useMemo(
    () =>
      ({
        "--accent": active.color,
        "--accent-ink": active.ink,
        "--accent-pale": active.pale,
      }) as CSSProperties,
    [active],
  );

  const selectFlavor = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  const shareFlavor = async () => {
    const message = `HUBB ${active.number}/07 — ${active.ar} · ${active.en}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "HUBB", text: message, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${message} — ${window.location.href}`);
        setShareLabel("COPIED ✓");
        window.setTimeout(() => setShareLabel("SHARE YOUR #"), 1600);
      }
    } catch {
      // A dismissed share sheet should leave the interface unchanged.
    }
  };

  return (
    <main className="site-shell" style={theme}>
      <div className="announcement" aria-label="Brand statement">
        <div className="announcement-track">
          <span>النكهة في اللُّب</span><i>✦</i><span>FLAVOR IN THE KERNEL</span><i>✦</i>
          <span>٧ نكهات، قرمشة واحدة</span><i>✦</i><span>7 FLAVORS, ONE CRACK</span><i>✦</i>
          <span aria-hidden="true">النكهة في اللُّب</span><i aria-hidden="true">✦</i>
          <span aria-hidden="true">FLAVOR IN THE KERNEL</span><i aria-hidden="true">✦</i>
        </div>
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="HUBB home">
          <img src="/brand/hubb-logo.webp" alt="HUBB حُبّ" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#flavors">{language === "ar" ? "النكهات" : "Flavors"}</a>
          <a href="#ritual">{language === "ar" ? "القرمشة" : "The crack"}</a>
          <a href="#craft">{language === "ar" ? "الحرفة" : "Saudi craft"}</a>
        </nav>
        <div className="header-actions">
          <button
            className="language-switch"
            onClick={() => setLanguage((current) => (current === "ar" ? "en" : "ar"))}
            aria-label="Switch language"
          >
            <span className={language === "ar" ? "is-active" : ""}>ع</span>
            <span>/</span>
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
          <a className="pill-button" href="#collection">
            {language === "ar" ? "اكتشف الـ ٧" : "EXPLORE 7"}
          </a>
        </div>
      </header>

      <section
        className="hero"
        id="top"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
          event.currentTarget.style.setProperty("--mx", x.toFixed(3));
          event.currentTarget.style.setProperty("--my", y.toFixed(3));
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--mx", "0");
          event.currentTarget.style.setProperty("--my", "0");
        }}
      >
        <div className="hero-grid">
          <div className="hero-copy" dir={language === "ar" ? "rtl" : "ltr"}>
            <p className="eyebrow">
              <span className="eyebrow-dot" /> {language === "ar" ? "بذور دوّار الشمس · حرفة سعودية جديدة" : "SUNFLOWER SEEDS · SAUDI NEO-CRAFT"}
            </p>
            {language === "ar" ? (
              <>
                <h1><span>النكهة</span><br />في <em>اللُّب</em></h1>
                <p className="hero-intro">سبع نكهات. هوية سعودية جديدة. وقرمشة مصممة لتُرى، تُسمع، وتُشارك.</p>
              </>
            ) : (
              <>
                <h1><span>FLAVOR</span><br />IN THE <em>KERNEL</em></h1>
                <p className="hero-intro">Seven flavors. One new Saudi voice. A crack designed to be seen, heard, and shared.</p>
              </>
            )}
            <div className="hero-ctas">
              <a className="cta-primary" href="#flavors">{language === "ar" ? "اختر نكهتك" : "FIND YOUR FLAVOR"}<span>↘</span></a>
              <button className="text-button" onClick={() => selectFlavor((activeIndex + 1) % flavors.length)}>
                {language === "ar" ? "النكهة التالية" : "NEXT FLAVOR"} <span>→</span>
              </button>
            </div>
          </div>

          <div
            className="hero-product"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="paint-swipe" aria-hidden="true" />
            <div className="seed-field" aria-hidden="true">
              <SeedGlyph className="floating-seed seed-one" />
              <SeedGlyph className="floating-seed seed-two" />
              <SeedGlyph className="floating-seed seed-three" />
            </div>
            <div className="product-frame" key={active.id}>
              <img
                src={active.image}
                alt={`HUBB ${active.en} sunflower seed package, ${active.number} of 07`}
              />
              <span className="frame-corner frame-corner-top">{active.number}/07</span>
              <span className="frame-corner frame-corner-bottom">100 G</span>
            </div>
            <div className="active-flavor-label" aria-live="polite">
              <span className="active-number">{active.number}</span>
              <span><b dir="rtl">{active.ar}</b><small>{active.en}</small></span>
            </div>
          </div>
        </div>

        <div className="flavor-dial" role="tablist" aria-label="Choose a flavor">
          {flavors.map((flavor, index) => (
            <button
              key={flavor.id}
              className={index === activeIndex ? "is-active" : ""}
              style={{ "--dot": flavor.color } as CSSProperties}
              onClick={() => selectFlavor(index)}
              role="tab"
              aria-selected={index === activeIndex}
            >
              <span className="dial-dot" />
              <span className="dial-number">{flavor.number}</span>
              <span className="dial-name">{flavor.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <p className="section-index">[ 01 — WHY HUBB ]</p>
        <div className="manifesto-copy">
          <p dir="rtl">مو مجرد حب.</p>
          <h2>NOT JUST A SEED.<br /><span>A SAUDI SNACK SIGNAL.</span></h2>
        </div>
        <div className="manifesto-aside">
          <p>Hand-brushed calligraphy. Modern Najdi rhythm. A flavor code you can recognize from across the aisle—or at 100 pixels on your phone.</p>
          <a href="#craft">SEE THE DESIGN DNA <span>↘</span></a>
        </div>
      </section>

      <section className="flavor-explorer" id="flavors">
        <div className="section-heading" data-reveal>
          <p className="section-index">[ 02 — THE SEVEN ]</p>
          <h2><span>CHOOSE</span> YOUR<br />CRACK.</h2>
          <p className="heading-ar" dir="rtl">اختر نكهتك</p>
        </div>

        <div className="flavor-feature" style={theme} data-reveal>
          <div className="feature-copy">
            <p className="feature-counter">{active.number} <span>/ 07</span></p>
            <div>
              <h3 dir="rtl">{active.ar}</h3>
              <p className="feature-en">{active.en}</p>
            </div>
            <p className="feature-mood" dir={language === "ar" ? "rtl" : "ltr"}>
              {language === "ar" ? active.moodAr : active.moodEn}
            </p>
            <p className="feature-note" dir={language === "ar" ? "rtl" : "ltr"}>
              {language === "ar" ? active.noteAr : active.noteEn}
            </p>
            <div className="feature-buttons">
              <button
                aria-label="Previous flavor"
                onClick={() => selectFlavor((activeIndex - 1 + flavors.length) % flavors.length)}
              >←</button>
              <button
                aria-label="Next flavor"
                onClick={() => selectFlavor((activeIndex + 1) % flavors.length)}
              >→</button>
            </div>
          </div>
          <div className="feature-image-wrap">
            <div className="feature-stamp">FLAVOR<br />IN THE<br />KERNEL</div>
            <img key={`feature-${active.id}`} src={active.image} alt={`${active.ar} — ${active.en}`} />
          </div>
          <div className="feature-rail" role="tablist" aria-label="All seven flavors">
            {flavors.map((flavor, index) => (
              <button
                key={flavor.id}
                onClick={() => selectFlavor(index)}
                className={index === activeIndex ? "is-active" : ""}
                style={{ "--rail-color": flavor.color } as CSSProperties}
                role="tab"
                aria-selected={index === activeIndex}
              >
                <span>{flavor.number}</span>
                <b dir="rtl">{flavor.ar}</b>
                <small>{flavor.en}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="crack-section" id="ritual">
        <div className="crack-visual" data-reveal>
          <div className="crack-halo" />
          <div className="shell shell-left"><SeedGlyph /></div>
          <div className="kernel"><span /></div>
          <div className="shell shell-right"><SeedGlyph /></div>
          <div className="sound-word sound-one">CRACK</div>
          <div className="sound-word sound-two" dir="rtl">طَقّ</div>
        </div>
        <div className="crack-copy" data-reveal>
          <p className="section-index">[ 03 — THE RITUAL ]</p>
          <h2>THE SOUND<br />BEFORE THE<br /><em>FLAVOR.</em></h2>
          <p dir="rtl" className="crack-ar">قشرة نظيفة. قرمشة مثالية. والنكهة داخل اللُّب.</p>
          <p>HUBB turns the tiny sunflower-seed ritual into the hero: crack, reveal, taste, repeat.</p>
          <div className="steps">
            <div><span>01</span><b>CRACK</b><small>اكسر</small></div>
            <div><span>02</span><b>TASTE</b><small>تذوّق</small></div>
            <div><span>03</span><b>PASS</b><small>شارك</small></div>
          </div>
        </div>
      </section>

      <section className="craft-section" id="craft">
        <div className="sadu-ribbon" aria-hidden="true"><span>حُبّ</span><i>◆</i><span>HUBB</span><i>◆</i><span>حُبّ</span><i>◆</i><span>HUBB</span></div>
        <div className="craft-grid">
          <div className="craft-title" data-reveal>
            <p className="section-index">[ 04 — SAUDI NEO-CRAFT ]</p>
            <h2>ROOTED<br />HERE.<br /><span>MADE FOR NOW.</span></h2>
          </div>
          <div className="craft-story" data-reveal>
            <p className="craft-ar" dir="rtl">من نسيج السدو، إلى ضربة الفرشاة، إلى بصمة الصانع.</p>
            <p>The identity translates Saudi craft into a living Gen-Z system: heritage as rhythm, not decoration.</p>
          </div>
        </div>
        <div className="craft-cards">
          <article data-reveal>
            <span>01</span>
            <div className="brush-demo">حُبّ</div>
            <h3>THE HUMAN MARK</h3>
            <p>Expressive Arabic calligraphy keeps every touchpoint unmistakably human.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <div className="pattern-demo" />
            <h3>THE SAUDI RHYTHM</h3>
            <p>A modern Najdi Sadu geometry moves through the interface like a woven beat.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <div className="thumb-demo"><i /><i /><i /><i /><i /></div>
            <h3>THE MAKER&apos;S PRINT</h3>
            <p>A thumbprint signals the maker, the batch, and the beauty of imperfection.</p>
          </article>
        </div>
      </section>

      <section className="collection-section" id="collection">
        <div className="collection-heading" data-reveal>
          <div>
            <p className="section-index">[ 05 — COLLECT THE SET ]</p>
            <h2>7 MOODS.<br /><span>ONE BLACK BLOCK.</span></h2>
          </div>
          <p>Every pack has one color, one brushstroke, and one number. Together they become a shelf billboard—and a shareable set.</p>
        </div>
        <div className="collection-grid">
          {flavors.map((flavor, index) => (
            <button
              className="collection-card"
              key={flavor.id}
              style={{ "--card-accent": flavor.color, "--delay": `${index * 55}ms` } as CSSProperties}
              onClick={() => {
                selectFlavor(index);
                document.querySelector("#flavors")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-reveal
            >
              <div className="collection-image"><img src={flavor.image} alt="" /></div>
              <div className="collection-meta">
                <span>{flavor.number}/07</span>
                <b dir="rtl">{flavor.ar}</b>
                <small>{flavor.en}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="social-section">
        <div className="social-orbit" aria-hidden="true"><SeedGlyph /><SeedGlyph /><SeedGlyph /></div>
        <div className="social-copy" data-reveal>
          <p>YOUR FLAVOR SAYS A LOT.</p>
          <h2 dir="rtl">إنت أي رقم؟</h2>
          <h3>WHAT&apos;S YOUR<br />HUBB NUMBER?</h3>
          <button onClick={shareFlavor}>{shareLabel} <span>{active.number}/07</span></button>
        </div>
        <div className="social-ticket" data-reveal>
          <div className="ticket-top"><span>MY HUBB</span><b>{active.number}</b></div>
          <div className="ticket-flavor" style={{ background: active.color }}>
            <span dir="rtl">{active.ar}</span><small>{active.en}</small>
          </div>
          <div className="ticket-bottom"><span>#HUBBCRACK</span><span>07 / 2026</span></div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-marquee" aria-hidden="true"><span>CRACK THE ORDINARY · اكسر الروتين · CRACK THE ORDINARY · اكسر الروتين · </span></div>
        <div className="final-inner" data-reveal>
          <p>LAUNCH EDITION · SAUDI ARABIA</p>
          <h2><span dir="rtl">حُبّ من أول</span><br />CRACK.</h2>
          <a href="#flavors">FIND YOUR FLAVOR <span>↗</span></a>
        </div>
      </section>

      <footer>
        <a className="footer-logo" href="#top"><img src="/brand/hubb-logo.webp" alt="HUBB حُبّ" /></a>
        <p>FLAVOR IN THE KERNEL · النكهة في اللُّب</p>
        <div><a href="#flavors">FLAVORS</a><a href="#craft">STORY</a><span>© 2026 HUBB</span></div>
      </footer>
    </main>
  );
}
