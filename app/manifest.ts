import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "HUBB حُبّ — Flavor in the Kernel",
    short_name: "HUBB",
    description: "Seven Saudi sunflower-seed flavors. Pick tonight’s crack.",
    lang: "ar-SA",
    dir: "rtl",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0e0c09",
    theme_color: "#0e0c09",
    categories: ["food", "shopping", "lifestyle"],
    icons: [
      { src: "/icons/hubb-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/hubb-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Shop all seven", short_name: "Shop", url: "/shop", icons: [{ src: "/icons/hubb-192.png", sizes: "192x192" }] },
      { name: "Find my flavor", short_name: "Taste Lab", url: "/taste-lab", icons: [{ src: "/icons/hubb-192.png", sizes: "192x192" }] },
    ],
  };
}
