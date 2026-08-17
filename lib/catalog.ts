export type TasteProfile = {
  salt: number;
  heat: number;
  roast: number;
  aroma: number;
};

export type Flavor = {
  id: string;
  sku: string;
  number: string;
  en: string;
  ar: string;
  color: string;
  pale: string;
  ink: string;
  image: string;
  priceSar: number;
  weightGrams: number;
  moodEn: string;
  moodAr: string;
  noteEn: string;
  noteAr: string;
  ritual: string;
  taste: TasteProfile;
  tags: string[];
};

export const flavors: Flavor[] = [
  {
    id: "classic",
    sku: "HUBB-CLS-100",
    number: "01",
    en: "Classic",
    ar: "كلاسيك",
    color: "#2459ff",
    pale: "#a9bfff",
    ink: "#dce6ff",
    image: "/products/classic.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "The original blue crack.",
    moodAr: "القرمشة الزرقاء الأصلية.",
    noteEn: "Roasted, salted, and made for the hand that always reaches back.",
    noteAr: "محمّص ومملّح لليد التي تعود دائمًا إلى الكيس.",
    ritual: "Match night · Road trip · Everyday crack",
    taste: { salt: 62, heat: 4, roast: 76, aroma: 48 },
    tags: ["original", "roasted", "match night"],
  },
  {
    id: "lemon-salt",
    sku: "HUBB-LMS-100",
    number: "02",
    en: "Lemon Salt",
    ar: "ليمون وملح",
    color: "#e7d829",
    pale: "#fff58b",
    ink: "#19170a",
    image: "/products/lemon-salt.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "A bright, electric squeeze.",
    moodAr: "عصرة حمضية بنكهة كهربائية.",
    noteEn: "Citrus lift first. Clean salt second. One more crack after that.",
    noteAr: "انتعاش الليمون أولًا، ثم ملوحة نظيفة وقرمشة أخرى.",
    ritual: "Sunny drives · Shared tables · First pick",
    taste: { salt: 70, heat: 2, roast: 62, aroma: 86 },
    tags: ["citrus", "bright", "bestseller"],
  },
  {
    id: "hot-salt",
    sku: "HUBB-HOT-100",
    number: "03",
    en: "Hot & Salt",
    ar: "حار وملح",
    color: "#df332f",
    pale: "#ff9b8e",
    ink: "#ffe1da",
    image: "/products/hot-salt.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "Heat with a clean finish.",
    moodAr: "حرارة واضحة ونهاية نظيفة.",
    noteEn: "A direct chilli hit that leaves room for the roasted kernel.",
    noteAr: "حرارة فلفل واضحة تترك المجال لطعم اللُّب المحمّص.",
    ritual: "Derby energy · Late nights · Heat seekers",
    taste: { salt: 68, heat: 88, roast: 70, aroma: 72 },
    tags: ["hot", "chilli", "football"],
  },
  {
    id: "spices",
    sku: "HUBB-SPC-100",
    number: "04",
    en: "Spices",
    ar: "بهارات",
    color: "#d87522",
    pale: "#f6ad69",
    ink: "#ffead9",
    image: "/products/spices.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "Warm spice, layered and social.",
    moodAr: "بهارات دافئة بطبقات للمشاركة.",
    noteEn: "A rounded Saudi spice mood designed for the centre of the majlis.",
    noteAr: "مزاج بهارات سعودي متوازن صُمّم لوسط المجلس.",
    ritual: "Majlis table · Group chat · Slow evenings",
    taste: { salt: 58, heat: 40, roast: 78, aroma: 92 },
    tags: ["spiced", "majlis", "aromatic"],
  },
  {
    id: "ghawa",
    sku: "HUBB-GHW-100",
    number: "05",
    en: "Ghawa",
    ar: "قهوة عربية",
    color: "#b87333",
    pale: "#dfaa76",
    ink: "#ffe6cb",
    image: "/products/ghawa.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "Arabic coffee, reimagined.",
    moodAr: "القهوة العربية بروح جديدة.",
    noteEn: "Roast-led, aromatic and unmistakably tied to Saudi hospitality.",
    noteAr: "تحميص عطري مرتبط بروح الضيافة السعودية.",
    ritual: "After coffee · Airport gift · Saudi signature",
    taste: { salt: 30, heat: 6, roast: 92, aroma: 94 },
    tags: ["ghawa", "coffee", "saudi"],
  },
  {
    id: "matcha",
    sku: "HUBB-MTC-100",
    number: "06",
    en: "Matcha",
    ar: "ماتشا",
    color: "#2e6d4a",
    pale: "#83ad8f",
    ink: "#e2f2e7",
    image: "/products/matcha.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "Jade energy. Naturally roasted kernels.",
    moodAr: "طاقة اليشم. لُبّ محمّص بطبيعته.",
    noteEn: "The green lives in the artwork. The kernel stays naturally roasted.",
    noteAr: "الأخضر في الفن، أما اللُّب فيبقى محمّصًا بطبيعته.",
    ritual: "Creative desk · Café mood · New-school ritual",
    taste: { salt: 32, heat: 0, roast: 64, aroma: 82 },
    tags: ["matcha", "cafe", "natural kernel"],
  },
  {
    id: "americano",
    sku: "HUBB-AMR-100",
    number: "07",
    en: "Americano",
    ar: "أمريكانو",
    color: "#604333",
    pale: "#b09079",
    ink: "#f3e9dc",
    image: "/products/americano.webp",
    priceSar: 5,
    weightGrams: 100,
    moodEn: "Dark roast, after-hours mood.",
    moodAr: "تحميص داكن لمزاج ما بعد السهرة.",
    noteEn: "Coffee depth, restrained sweetness and a bone-white visual hit.",
    noteAr: "عمق القهوة بلمسة هادئة وتباين عاجي.",
    ritual: "Night drive · Study session · Dark roast crowd",
    taste: { salt: 28, heat: 0, roast: 96, aroma: 88 },
    tags: ["americano", "coffee", "night"],
  },
];

export const flavorById = (id: string) => flavors.find((flavor) => flavor.id === id);

export const starterBundle = {
  id: "seven-crack-box",
  en: "The Seven Crack Box",
  ar: "صندوق السبع قرمشات",
  priceSar: 32,
  compareAtSar: 35,
  count: 7,
};

export const formatSar = (value: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
