import type { Metadata } from "next";
import { FilmsExperience } from "@/components/films-experience";

export const metadata: Metadata = {
  title: "Films — سبع نكهات في 15 ثانية",
  description: "Watch the HUBB ritual film, the vertical cut, the macro crack study and six-second flavor loops.",
};

export default function FilmsPage() {
  return <FilmsExperience />;
}
