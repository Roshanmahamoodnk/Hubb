import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest { return { name: "HUBB حُبّ", short_name: "HUBB", description: "Flavor in the kernel.", start_url: "/", display: "standalone", background_color: "#0e0c09", theme_color: "#0e0c09", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] }; }
