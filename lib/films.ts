import { flavors, type Flavor } from "@/lib/catalog";

export type FilmCut = {
  id: string;
  title: string;
  titleAr: string;
  kicker: string;
  kickerAr: string;
  body: string;
  bodyAr: string;
  src: string;
  webm?: string;
  poster: string;
  ratio: "wide" | "vertical";
};

export const brandCuts: FilmCut[] = [
  {
    id: "cinema",
    title: "The ritual, then the line.",
    titleAr: "الطقس، ثم الخط.",
    kicker: "01 / WIDE CUT",
    kickerAr: "٠١ / قصّة عريضة",
    body: "Fifteen seconds of pack, kernel and color. The crack is the interface.",
    bodyAr: "خمس عشرة ثانية: كيس، لب، ولون. القرمشة هي الواجهة.",
    src: "/video/hubb-seven-worlds-cinema.mp4",
    webm: "/video/hubb-seven-worlds-cinema.webm",
    poster: "/video/hubb-seven-worlds-poster.webp",
    ratio: "wide",
  },
  {
    id: "vertical",
    title: "Made for the thumb.",
    titleAr: "مقصوص للإبهام.",
    kicker: "02 / VERTICAL CUT",
    kickerAr: "٠٢ / قصّة عمودية",
    body: "The same fifteen seconds, cut for Reels, TikTok and Shorts.",
    bodyAr: "نفس الخمس عشرة ثانية، مقصوصة للريلز والتيك توك.",
    src: "/video/hubb-seven-worlds-mobile.mp4",
    poster: "/video/hubb-seven-worlds-mobile-poster.webp",
    ratio: "vertical",
  },
  {
    id: "crack",
    title: "Open. Crack. The kernel is already flavored.",
    titleAr: "افتح. طقّ. اللب متبّل أصلًا.",
    kicker: "03 / MACRO STUDY",
    kickerAr: "٠٣ / دراسة ماكرو",
    body: "Shell, seam, golden kernel. Wipe the husk — the taste stays inside.",
    bodyAr: "قشرة، خط، لب ذهبي. امسح القشرة — الطعم يبقى في اللب.",
    src: "/video/hubb-crack-study.mp4",
    poster: "/video/hubb-crack-study-poster.webp",
    ratio: "wide",
  },
];

export const flavorLoopSrc = (flavor: Flavor | string) => {
  const item = typeof flavor === "string" ? flavors.find((entry) => entry.id === flavor) : flavor;
  return item?.loopSrc || "";
};

export const flavorLoopPoster = (flavor: Flavor | string) => {
  const item = typeof flavor === "string" ? flavors.find((entry) => entry.id === flavor) : flavor;
  return item?.loopPoster || "/video/hubb-crack-study-poster.webp";
};

export const RITUAL_FILM = {
  src: "/video/hubb-crack-study.mp4",
  poster: "/video/hubb-crack-study-poster.webp",
};

export const WORLD_FILM = {
  src: "/video/hubb-seven-worlds.mp4",
  webm: "/video/hubb-seven-worlds.webm",
  mobile: "/video/hubb-seven-worlds-mobile.mp4",
  poster: "/video/hubb-seven-worlds-poster.webp",
  mobilePoster: "/video/hubb-seven-worlds-mobile-poster.webp",
};
