import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop-experience";

export const metadata: Metadata = {
  title: "Shop the process line",
  description: "Shop HUBB Umami salt, Umami garlic, Umami capsicum, Spice mix, Vanilla caramel chocolate, Coffee cocoa and Lemon salt.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopExperience />;
}
