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
        body: "Separate the shell, take the kernel, then repeat. If you wipe the husk, the kernel should still taste the flavor — that is the HUBB proof.",
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
        heading: "Flavor belongs in the kernel",
        headingAr: "النكهة في اللب",
        body: "HUBB uses two layers: vacuum liquor through the husk into the kernel, then a 72–100 mesh outer dust. Wipe the shell. The kernel still tastes umami, kabsa or coffee.",
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
        body: "HUBB gives every flavor a sharp visual signal. Retail keeps umami salt, garlic and bahar. Chocolate and coffee stay on e-com so brown hands stay off the majlis.",
      },
      {
        heading: "Choose the first two",
        headingAr: "ابدأ باثنين",
        body: "For a shared match table, start with Umami salt and Spice mix (bahar). Lemon salt is the citrus collectible. Vanilla caramel stays an e-com drop.",
      },
    ],
  },
  {
    slug: "vacuum-kernel-infusion",
    eyebrow: "PROCESS · العملية",
    title: "Why 0.05 MPa is the number to remember",
    titleAr: "ليش 0.05 ميجا باسكال هو الرقم",
    excerpt: "Vacuum pulls flavor through the husk. Dust is only the Snap moment. The taste is in the kernel.",
    readingTime: "4 MIN",
    published: "2026-08-17",
    sections: [
      {
        heading: "Layer 1 — Kernel infusion",
        headingAr: "الطبقة ١ — نقع اللب",
        body: "At about 0.05 MPa, a 60–70°C liquor of water-soluble oleoresins or yeast extract is pulled through the husk into the kernel. Proof is simple: wipe the shell. The kernel still tastes umami, kabsa, garlic, coffee.",
      },
      {
        heading: "Layer 2 — Outer dust",
        headingAr: "الطبقة ٢ — غبار القشرة",
        body: "A vacuum tumble lays 72–100 mesh salt and flavor dust on the husk. Hands smell it. Cameras love it. If the dust wipes off, layer 1 is already done.",
      },
      {
        heading: "Lock — Roast and nitrogen",
        headingAr: "القفل — تحميص ونيتروجين",
        body: "Roast to 1.5–2.0% moisture, water activity at or below 0.40, then an N2 pillow. Packed in Riyadh. Halal. The mill is Rozana. The mark on the bag is HUBB.",
      },
    ],
  },
];

export const journalBySlug = (slug: string) => journalPosts.find((post) => post.slug === slug);
