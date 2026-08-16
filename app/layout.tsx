import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HUBB حُبّ — Flavor in the Kernel",
  description: "Meet HUBB: seven bold sunflower-seed flavors with a new Saudi visual voice.",
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
  return (
    <html lang="ar" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
