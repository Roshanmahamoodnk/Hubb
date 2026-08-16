export type JournalPost = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAr: string;
  excerpt: string;
  readingTime: string;
  published: string;
  sections: Array<{ heading: string; headingAr?: string; body: string }>;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "how-to-eat-sunflower-seeds",
    eyebrow: "THE CRACK GUIDE · دليل القرمشة",
    title: "How to eat in-shell sunflower seeds without losing the rhythm",
    titleAr: "كيف تأكل حب دوّار الشمس وتحافظ على إيقاع القرمشة",
    excerpt: "A simple three-step ritual: position, crack, reveal. No performance required.",
    readingTime: "3 MIN",
    published: "2026-08-16",
    sections: [
      {
        heading: "01 — Position",
        headingAr: "١ — ثبّت الحبة",
        body: "Place one seed lengthwise between your front teeth. The pointed end faces inward and the shell seam sits where the pressure can find it.",
      },
      {
        heading: "02 — Crack",
        headingAr: "٢ — اكسر القشرة",
        body: "Use a controlled bite instead of crushing the whole shell. The goal is a clean split that protects the roasted kernel inside.",
      },
      {
        heading: "03 — Reveal",
        headingAr: "٣ — استخرج اللُّب",
        body: "Separate the shell, take the kernel, then repeat. The tiny rhythm is why in-shell seeds belong to matches, drives and long conversations.",
      },
    ],
  },
  {
    slug: "what-makes-a-clean-crack",
    eyebrow: "SEED SCIENCE · علم الحبة",
    title: "What makes a sunflower seed crack cleanly?",
    titleAr: "ما الذي يجعل قشرة حب دوّار الشمس تنفتح بنظافة؟",
    excerpt: "Shell integrity, roast control and seed grading matter before flavor ever arrives.",
    readingTime: "4 MIN",
    published: "2026-08-16",
    sections: [
      {
        heading: "The shell is part of the experience",
        headingAr: "القشرة جزء من التجربة",
        body: "An in-shell seed is not only a carrier. Its size, dryness and seam determine how easily the shell opens and whether the kernel stays whole.",
      },
      {
        heading: "Roast needs a window",
        headingAr: "التحميص له نافذة دقيقة",
        body: "Too little heat leaves the eating experience flat. Too much can make both shell and kernel brittle. Commercial specifications must therefore be validated with real pilot trials.",
      },
      {
        heading: "Flavor belongs with the kernel experience",
        headingAr: "النكهة تكمل تجربة اللُّب",
        body: "HUBB is designed around the payoff after the crack: aroma on opening, seasoning during the ritual and a roasted kernel at the centre.",
      },
    ],
  },
  {
    slug: "saudi-match-night-snack-ritual",
    eyebrow: "MATCH NIGHT · ليلة المباراة",
    title: "The Saudi match-night seed ritual, redesigned for now",
    titleAr: "طقس الحب في ليلة المباراة بروح سعودية جديدة",
    excerpt: "One pouch, many hands, and a flavor code everyone can spot across the room.",
    readingTime: "3 MIN",
    published: "2026-08-16",
    sections: [
      {
        heading: "A snack that keeps pace",
        headingAr: "سناك يعيش مع إيقاع المباراة",
        body: "Sunflower seeds stretch across the whole match. The repeated crack creates a ritual that is slower than a handful of chips and more social than an individual bar.",
      },
      {
        heading: "Seven colors, one table",
        headingAr: "سبعة ألوان على طاولة واحدة",
        body: "HUBB gives every flavor a sharp visual signal while the Saudi calligraphy, black base and modern Sadu rhythm keep the family unmistakably connected.",
      },
      {
        heading: "Choose the first two",
        headingAr: "ابدأ باثنين",
        body: "For a shared match table, start with one bright flavor such as Lemon Salt and one deeper profile such as Spices or Americano. The contrast makes choosing part of the fun.",
      },
    ],
  },
];

export const journalBySlug = (slug: string) => journalPosts.find((post) => post.slug === slug);
