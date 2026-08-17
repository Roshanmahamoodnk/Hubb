import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: "Saudi sunflower seeds, reimagined",
  description: "The perfect crack — every time. Vacuum-infused HUBB sunflower seeds, packed in Riyadh.",
  alternates: { canonical: "/en", languages: { "ar-SA": "/", "en-SA": "/en" } },
};

export default function EnglishHomePage() {
  return <HomeExperience initialLanguage="en" />;
}
