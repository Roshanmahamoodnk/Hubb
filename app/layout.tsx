import type { Metadata } from "next";
import "./globals.css";
import "./policies.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteShell } from "@/components/site-shell";
import { LanguageProvider } from "@/lib/language";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.onrender.com"),
  title: {
    default: "HUBB حُبّ — الطعم في اللب",
    template: "%s · HUBB حُبّ",
  },
  description: "The perfect crack — every time. Vacuum-infused Saudi sunflower seeds, packed in Riyadh. الطعم في اللب.",
  keywords: ["sunflower seeds Saudi Arabia", "حب دوار الشمس", "Saudi snacks", "HUBB seeds", "بذور دوار الشمس"],
  alternates: { canonical: "/", languages: { "ar-SA": "/", "en-SA": "/en" } },
  openGraph: {
    title: "HUBB حُبّ — The taste is in the kernel",
    description: "The perfect crack — every time. Vacuum kernel infusion. Packed in Riyadh.",
    url: "/",
    siteName: "HUBB حُبّ",
    locale: "ar_SA",
    type: "website",
    images: [{ url: "/products/umami-salt.svg", width: 1200, height: 1500, alt: "HUBB Umami salt sunflower seeds" }],
  },
  twitter: { card: "summary_large_image", title: "HUBB حُبّ", description: "The taste is in the kernel.", images: ["/products/umami-salt.svg"] },
  other: {
    "codex-preview": "development",
    "theme-color": "#0e0c09",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icons/hubb-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HUBB",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HUBB حُبّ",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.onrender.com",
    logo: "/brand/hubb-logo.webp",
    foundingLocation: { "@type": "Country", name: "Saudi Arabia" },
    description: "A modern Saudi sunflower-seed brand built around the perfect crack.",
  };
  return (
    <html lang="ar" dir="ltr">
      <head>
        <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/noto-kufi-arabic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider><LanguageProvider><SiteShell>{children}</SiteShell></LanguageProvider></CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
