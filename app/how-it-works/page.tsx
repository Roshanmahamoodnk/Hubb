import type { Metadata } from "next";
import { HowItWorksExperience } from "@/components/how-it-works-experience";

export const metadata: Metadata = {
  title: "How it works — كيف تطقّها",
  description: "Open the N2 bag, crack the husk, the kernel is already flavored. Vacuum infusion at 0.05 MPa. Packed in Riyadh.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return <HowItWorksExperience />;
}
