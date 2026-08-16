import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.r0shan911.chatgpt.site";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account", "/admin", "/checkout", "/cart"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/account", "/admin", "/checkout", "/cart"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/account", "/admin", "/checkout", "/cart"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
