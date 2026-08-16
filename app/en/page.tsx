import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: "Saudi sunflower seeds, reimagined",
  description: "Explore all seven HUBB sunflower-seed flavors through taste, ritual and modern Saudi design.",
  alternates: { canonical: "/en", languages: { "ar-SA": "/", "en-SA": "/en" } },
};

export default function EnglishHomePage() {
  return <HomeExperience initialLanguage="en" />;
}
