import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop-experience";

export const metadata: Metadata = {
  title: "Shop all seven flavors",
  description: "Shop HUBB Classic, Lemon Salt, Hot & Salt, Spices, Ghawa, Matcha and Americano sunflower seeds.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopExperience />;
}
