export type TasteProfile = {
  salt: number;
  heat: number;
  roast: number;
  aroma: number;
};

export type FlavorChannel = "ecom" | "retail" | "cafe";

export type Flavor = {
  id: string;
  sku: string;
  skuRetail?: string;
  number: string;
  en: string;
  ar: string;
  color: string;
  pale: string;
  ink: string;
  band: string;
  image: string;
  worldImage: string;
  loopSrc: string;
  loopPoster: string;
  priceSar: number;
  retailPriceSar?: number;
  weightGrams: number;
  sizes: number[];
  channels: FlavorChannel[];
  moodEn: string;
  moodAr: string;
  noteEn: string;
  noteAr: string;
  lineEn: string;
  lineAr: string;
  processEn: string;
  processAr: string;
  layer1En: string;
  layer1Ar: string;
  layer2En: string;
  layer2Ar: string;
  ritual: string;
  ritualAr: string;
  taste: TasteProfile;
  tags: string[];
};

export const flavors: Flavor[] = [
  {
    id: "umami-salt",
    sku: "HUBB-USA-230-EC",
    skuRetail: "HUBB-USA-230-RT",
    number: "01",
    en: "Umami salt",
    ar: "ملح أومامي",
    color: "#7a8454",
    pale: "#d8ddc0",
    ink: "#12140c",
    band: "salt olive",
    image: "/products/umami-salt.svg",
    worldImage: "/products/classic.webp",
    loopSrc: "/video/loops/classic.mp4",
    loopPoster: "/video/loops/classic-poster.webp",
    priceSar: 26.9,
    retailPriceSar: 16.9,
    weightGrams: 230,
    sizes: [15, 85, 230],
    channels: ["ecom", "retail"],
    moodEn: "The original. No salty burn.",
    moodAr: "الأصل. ملح بلا حرق.",
    noteEn: "Yeast extract is pulled into the kernel. Wipe the shell — the taste stays.",
    noteAr: "مستخلص الخميرة ينسحب إلى اللب. امسح القشرة — الطعم باقٍ.",
    lineEn: "Crack it. The kernel is umami.",
    lineAr: "طقّها. اللب أومامي.",
    processEn: "Vacuum liquor with water-soluble yeast extract through the husk, then a 72–100 mesh olive-salt dust.",
    processAr: "شراب أومامي تحت التفريغ عبر القشرة، ثم غبار ملح زيتوني 72–100 مش.",
    layer1En: "Yeast extract in the kernel. Soft salt. No throat burn.",
    layer1Ar: "مستخلص الخميرة في اللب. ملح ناعم. بلا حرق.",
    layer2En: "Olive-salt dust on the husk. Hands smell it. Snap moment.",
    layer2Ar: "غبار ملح زيتوني على القشرة. اليد تشمّه. لحظة السناب.",
    ritual: "Everyday crack · Match night · First bag",
    ritualAr: "القرمشة اليومية · ليلة المباراة · أول كيس",
    taste: { salt: 58, heat: 2, roast: 74, aroma: 62 },
    tags: ["original", "umami", "retail", "e-com"],
  },
  {
    id: "umami-garlic",
    sku: "HUBB-GAR-230-EC",
    skuRetail: "HUBB-GAR-230-RT",
    number: "02",
    en: "Umami garlic",
    ar: "ثوم أومامي",
    color: "#e8d9b8",
    pale: "#f7f1e0",
    ink: "#2a2418",
    band: "garlic cream",
    image: "/products/umami-garlic.svg",
    worldImage: "/products/lemon-salt.webp",
    loopSrc: "",
    loopPoster: "/video/hubb-crack-study-poster.webp",
    priceSar: 26.9,
    retailPriceSar: 16.9,
    weightGrams: 230,
    sizes: [15, 85, 230],
    channels: ["ecom", "retail"],
    moodEn: "Garlic in the kernel. Cream on the pack.",
    moodAr: "ثوم في اللب. كريم على الكيس.",
    noteEn: "Water-soluble garlic oleoresin through the husk. The cream is the signal, not a coating.",
    noteAr: "أوليوريزين الثوم عبر القشرة. الكريم إشارة، مو طبقة على اللب.",
    lineEn: "Crack it. Garlic, then roast.",
    lineAr: "طقّها. ثوم، وبعده التحميص.",
    processEn: "Garlic liquor at 60–70°C under ~0.05 MPa, then a cream-salt outer dust.",
    processAr: "شراب ثوم عند 60–70°م تحت 0.05 ميجا باسكال، ثم غبار ملح كريمي.",
    layer1En: "Garlic in the kernel. Proof: wipe the shell.",
    layer1Ar: "ثوم في اللب. الدليل: امسح القشرة.",
    layer2En: "Cream-salt dust. Quiet in retail. Loud in the bag.",
    layer2Ar: "غبار ملح كريمي. هادئ في التجزئة. واضح في الكيس.",
    ritual: "Majlis · Shared table · Night drive",
    ritualAr: "المجلس · الطاولة · مشوار الليل",
    taste: { salt: 54, heat: 8, roast: 70, aroma: 88 },
    tags: ["garlic", "umami", "retail", "e-com"],
  },
  {
    id: "umami-capsicum",
    sku: "HUBB-CAP-230-EC",
    number: "03",
    en: "Umami capsicum",
    ar: "فلفل أومامي",
    color: "#c4452d",
    pale: "#f4b3a4",
    ink: "#fff1ec",
    band: "capsicum red",
    image: "/products/umami-capsicum.svg",
    worldImage: "/products/hot-salt.webp",
    loopSrc: "/video/loops/hot-salt.mp4",
    loopPoster: "/video/loops/hot-salt-poster.webp",
    priceSar: 27.9,
    weightGrams: 230,
    sizes: [85, 230],
    channels: ["ecom"],
    moodEn: "Heat with a clean kernel finish.",
    moodAr: "حرارة، والنهاية نظيفة في اللب.",
    noteEn: "Capsicum oleoresin in the kernel. The red lives on the pack and the dust — never as a stained seed.",
    noteAr: "فلفل في اللب. الأحمر على الكيس والغبار — مو صبغة على الحبة.",
    lineEn: "Crack it. Heat, then umami.",
    lineAr: "طقّها. حرارة، وبعدها أومامي.",
    processEn: "Capsicum liquor through the husk, then a 72–100 mesh chilli-salt tumble.",
    processAr: "شراب فلفل عبر القشرة، ثم تبلور غبار شطة وملح.",
    layer1En: "Capsicum in the kernel. No throat scrap.",
    layer1Ar: "فلفل في اللب. بلا خدش في الحلق.",
    layer2En: "Red dust on the shell. Hands first. Kernel second.",
    layer2Ar: "غبار أحمر على القشرة. اليد أولًا. اللب ثانيًا.",
    ritual: "Night energy · E-com drop · Heat seekers",
    ritualAr: "طاقة الليل · دروب المتجر · الباحثون عن الحرارة",
    taste: { salt: 60, heat: 84, roast: 72, aroma: 76 },
    tags: ["capsicum", "heat", "e-com"],
  },
  {
    id: "spice-mix",
    sku: "HUBB-BHR-230-EC",
    skuRetail: "HUBB-BHR-230-RT",
    number: "04",
    en: "Spice mix",
    ar: "بهار",
    color: "#6e1f32",
    pale: "#e7a3b0",
    ink: "#fde8ea",
    band: "spice burgundy",
    image: "/products/spice-mix.svg",
    worldImage: "/products/spices.webp",
    loopSrc: "/video/loops/spices.mp4",
    loopPoster: "/video/loops/spices-poster.webp",
    priceSar: 27.9,
    retailPriceSar: 16.9,
    weightGrams: 230,
    sizes: [15, 85, 230],
    channels: ["ecom", "retail"],
    moodEn: "Kabsa in the kernel. Dust on the husk.",
    moodAr: "كبسة في اللب. غبار على القشرة.",
    noteEn: "Black lime, cardamom, cumin — infused, then a kabsa outer dust. No masala on the front.",
    noteAr: "لومي، هيل، كمون — داخل اللب، ثم غبار كبسة. بلا كلمة مسالا على الواجهة.",
    lineEn: "Crack it. The kernel is kabsa.",
    lineAr: "طقّها. اللب كبسة.",
    processEn: "Kabsa liquor under vacuum, then burgundy kabsa dust in the tumble.",
    processAr: "شراب كبسة تحت التفريغ، ثم غبار كبسة عنابي في التبلور.",
    layer1En: "Black lime, cardamom, cumin in the kernel.",
    layer1Ar: "لومي وهيل وكمون في اللب.",
    layer2En: "Kabsa dust. The Snap/TikTok smell.",
    layer2Ar: "غبار كبسة. ريحة السناب والتيك توك.",
    ritual: "Majlis centre · Group chat · Slow evenings",
    ritualAr: "وسط المجلس · القروب · السهر الهادئ",
    taste: { salt: 52, heat: 38, roast: 80, aroma: 96 },
    tags: ["kabsa", "bahar", "retail", "e-com"],
  },
  {
    id: "vanilla-caramel",
    sku: "HUBB-VCC-230-EC",
    number: "05",
    en: "Vanilla caramel chocolate",
    ar: "فانيليا كراميل شوكو",
    color: "#5c3a2e",
    pale: "#c4a484",
    ink: "#f6ece0",
    band: "chocolate cocoa",
    image: "/products/vanilla-caramel.svg",
    worldImage: "/products/americano.webp",
    loopSrc: "/video/loops/americano.mp4",
    loopPoster: "/video/loops/americano-poster.webp",
    priceSar: 29.9,
    weightGrams: 230,
    sizes: [85, 230],
    channels: ["ecom"],
    moodEn: "Vanilla in. Cocoa on. E-com only.",
    moodAr: "فانيليا داخل. كاكاو برا. للمتجر فقط.",
    noteEn: "Dextrose and vanilla under vacuum, a gentler roast, then caramel-cocoa outer dust. Not for the majlis table.",
    noteAr: "دكستروز وفانيليا تحت التفريغ، تحميص ألطف، ثم غبار كراميل وكاكاو. مو لطاولة المجلس.",
    lineEn: "Crack it. Vanilla, then cocoa.",
    lineAr: "طقّها. فانيليا، وبعدها كاكاو.",
    processEn: "Vanilla-dextrose vacuum, gentler roast, caramel-cocoa tumble. E-com only — brown hands stay off retail.",
    processAr: "تفريغ فانيليا ودكستروز، تحميص ألطف، تبلور كراميل وكاكاو. للمتجر فقط — اليد البنية تبقى برا التجزئة.",
    layer1En: "Vanilla and dextrose pulled into the kernel.",
    layer1Ar: "فانيليا ودكستروز ينسحبون إلى اللب.",
    layer2En: "Caramel-cocoa dust. Loud pack. Quiet roast.",
    layer2Ar: "غبار كراميل وكاكاو. كيس صاخب. تحميص هادئ.",
    ritual: "Night desk · Gift drop · E-com only",
    ritualAr: "مكتب الليل · هدية · للمتجر فقط",
    taste: { salt: 18, heat: 0, roast: 68, aroma: 90 },
    tags: ["chocolate", "vanilla", "e-com"],
  },
  {
    id: "coffee-cocoa",
    sku: "HUBB-CCK-230-EC",
    number: "06",
    en: "Coffee cocoa",
    ar: "قهوة كاكاو",
    color: "#1e1612",
    pale: "#b08a6c",
    ink: "#f3e9dc",
    band: "coffee dark",
    image: "/products/coffee-cocoa.svg",
    worldImage: "/products/ghawa.webp",
    loopSrc: "/video/loops/ghawa.mp4",
    loopPoster: "/video/loops/ghawa-poster.webp",
    priceSar: 29.9,
    weightGrams: 230,
    sizes: [85, 230],
    channels: ["ecom", "cafe"],
    moodEn: "Coffee in the kernel. Cocoa on the shell.",
    moodAr: "قهوة في اللب. كاكاو على القشرة.",
    noteEn: "Coffee liquor under vacuum, cocoa dust on the husk. E-com and café — not Panda, not the majlis.",
    noteAr: "شراب قهوة تحت التفريغ، كاكاو على القشرة. متجر ومقهى — مو بنده، مو المجلس.",
    lineEn: "Crack it. Coffee, then cocoa.",
    lineAr: "طقّها. قهوة، وبعدها كاكاو.",
    processEn: "Coffee vacuum infusion, cocoa outer dust, N2 pack. Café counter and e-com.",
    processAr: "قهوة تحت التفريغ، غبار كاكاو، تعبئة نيتروجين. كاونتر المقهى والمتجر.",
    layer1En: "Coffee pulled through the husk into the kernel.",
    layer1Ar: "القهوة تنسحب عبر القشرة إلى اللب.",
    layer2En: "Cocoa on the shell. Café smell. Dark pack.",
    layer2Ar: "كاكاو على القشرة. ريحة المقهى. كيس داكن.",
    ritual: "Café counter · After coffee · Night drive",
    ritualAr: "كاونتر المقهى · بعد القهوة · مشوار الليل",
    taste: { salt: 16, heat: 4, roast: 94, aroma: 92 },
    tags: ["coffee", "cocoa", "e-com", "cafe"],
  },
  {
    id: "lemon-salt",
    sku: "HUBB-LMS-230-EC",
    number: "07",
    en: "Lemon salt",
    ar: "ليمون وملح",
    color: "#e7d829",
    pale: "#fff58b",
    ink: "#19170a",
    band: "citrus gold",
    image: "/products/lemon-salt.svg",
    worldImage: "/products/lemon-salt.webp",
    loopSrc: "/video/loops/lemon-salt.mp4",
    loopPoster: "/video/loops/lemon-salt-poster.webp",
    priceSar: 26.9,
    weightGrams: 230,
    sizes: [85, 230],
    channels: ["ecom"],
    moodEn: "A citrus collectible. Bright kernel. Clean salt.",
    moodAr: "إصدار حمضي. لب لامع. ملح نظيف.",
    noteEn: "Citrus liquor in the kernel, lemon-salt dust on the husk. The seventh number in the set — e-com drop.",
    noteAr: "حمضيات في اللب، غبار ليمون وملح على القشرة. الرقم السابع — دروب المتجر.",
    lineEn: "Crack it. Lemon, then salt.",
    lineAr: "طقّها. ليمون، وبعده ملح.",
    processEn: "Citrus-salt vacuum infusion, then a citrine outer dust. Collectible 07/07.",
    processAr: "تفريغ ليمون وملح، ثم غبار أصفر. الإصدار 07/07.",
    layer1En: "Lemon in the kernel. Wipe the shell — still citrus.",
    layer1Ar: "ليمون في اللب. امسح القشرة — الحمض باقٍ.",
    layer2En: "Lemon-salt dust. The bright Snap moment.",
    layer2Ar: "غبار ليمون وملح. لحظة السناب اللامعة.",
    ritual: "Sunny drives · First pick · Collectible",
    ritualAr: "مشاوير الشمس · أول اختيار · إصدار",
    taste: { salt: 68, heat: 2, roast: 60, aroma: 86 },
    tags: ["citrus", "collectible", "e-com"],
  },
];

export const processLine = flavors.filter((flavor) => flavor.id !== "lemon-salt");
export const retailFlavors = flavors.filter((flavor) => flavor.channels.includes("retail"));
export const ecomFlavors = flavors.filter((flavor) => flavor.channels.includes("ecom"));

export const flavorById = (id: string) => flavors.find((flavor) => flavor.id === id);

export const starterBundle = {
  id: "kernel-sampler",
  en: "The Kernel Sampler",
  ar: "عيّنة اللب",
  priceSar: 149,
  compareAtSar: 169.4,
  count: 6,
  flavorIds: processLine.map((flavor) => flavor.id),
};

export const formatSar = (value: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

export const PROCESS = {
  vacuumMpa: "0.05",
  liquorC: "60–70°C",
  mesh: "72–100",
  moisture: "1.5–2.0%",
  aw: "≤ 0.40",
  mill: "Rozana, Riyadh",
  promiseAr: "الطعم في اللب",
  promiseEn: "The taste is in the kernel",
  heroAr: "القرمشة الكاملة — في كل مرة",
  heroEn: "The perfect crack — every time",
};
