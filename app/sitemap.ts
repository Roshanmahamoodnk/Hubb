import type { MetadataRoute } from "next";
import { flavors } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.r0shan911.chatgpt.site";
  const now = new Date();
  const core = ["", "/en", "/shop", "/taste-lab", "/films", "/story", "/journal", "/saudi-sunflower-seeds", "/policies/privacy", "/policies/terms", "/policies/shipping"].map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: path === "" || path === "/shop" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/shop" ? .9 : path.startsWith("/policies") ? .3 : .75 }));
  const products = flavors.map((flavor) => ({ url: `${base}/flavors/${flavor.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: .85 }));
  const posts = journalPosts.map((post) => ({ url: `${base}/journal/${post.slug}`, lastModified: new Date(post.published), changeFrequency: "monthly" as const, priority: .7 }));
  return [...core, ...products, ...posts];
}
