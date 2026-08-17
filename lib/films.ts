export type FilmCut = {
  id: string;
  title: string;
  titleAr: string;
  kicker: string;
  body: string;
  src: string;
  webm?: string;
  poster: string;
  ratio: "wide" | "vertical";
};

export const brandCuts: FilmCut[] = [
  {
    id: "cinema",
    title: "The seven, side by side.",
    titleAr: "السبع، واحد واحد.",
    kicker: "01 / WIDE CUT",
    body: "Classic blue opens the film. Americano closes it. Every bag gets a cinematic world.",
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
    body: "The same fifteen seconds, cut for Reels, TikTok and Shorts.",
    src: "/video/hubb-seven-worlds-mobile.mp4",
    poster: "/video/hubb-seven-worlds-mobile-poster.webp",
    ratio: "vertical",
  },
  {
    id: "crack",
    title: "The crack, close.",
    titleAr: "القرمشة عن قرب.",
    kicker: "03 / MACRO STUDY",
    body: "Shell, seam, golden kernel. No green coating. The roast stays honest.",
    src: "/video/hubb-crack-study.mp4",
    poster: "/video/hubb-crack-study-poster.webp",
    ratio: "wide",
  },
];

export const flavorLoopSrc = (id: string) => `/video/loops/${id}.mp4`;
export const flavorLoopPoster = (id: string) => `/video/loops/${id}-poster.webp`;
