import type { Metadata } from "next";
import "./globals.css";
import "./policies.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.r0shan911.chatgpt.site"),
  title: {
    default: "HUBB حُبّ — النكهة في اللُّب",
    template: "%s · HUBB حُبّ",
  },
  description: "Seven bold sunflower-seed flavors, reimagined through a modern Saudi visual voice. سبع نكهات، قرمشة واحدة.",
  keywords: ["sunflower seeds Saudi Arabia", "حب دوار الشمس", "Saudi snacks", "HUBB seeds", "بذور دوار الشمس"],
  alternates: { canonical: "/", languages: { "ar-SA": "/", "en-SA": "/en" } },
  openGraph: {
    title: "HUBB حُبّ — Flavor in the Kernel",
    description: "Seven flavors. One unmistakably Saudi crack.",
    url: "/",
    siteName: "HUBB حُبّ",
    locale: "ar_SA",
    type: "website",
    images: [{ url: "/products/classic.webp", width: 1200, height: 1500, alt: "HUBB Classic sunflower seeds" }],
  },
  twitter: { card: "summary_large_image", title: "HUBB حُبّ", description: "Flavor in the kernel.", images: ["/products/classic.webp"] },
  other: {
    "codex-preview": "development",
    "theme-color": "#0e0c09",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HUBB حُبّ",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.r0shan911.chatgpt.site",
    logo: "/brand/hubb-logo.webp",
    foundingLocation: { "@type": "Country", name: "Saudi Arabia" },
    description: "A modern Saudi sunflower-seed brand built around the perfect crack.",
  };
  return (
    <html lang="ar" dir="ltr">
      <body>
        <CartProvider><SiteShell>{children}</SiteShell></CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
