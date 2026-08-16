import type { Metadata } from "next";
import { TasteLab } from "@/components/taste-lab";

export const metadata: Metadata = { title: "Taste Lab", description: "Find your HUBB sunflower-seed flavor in four sensory questions.", alternates: { canonical: "/taste-lab" } };
export default function TasteLabPage() { return <TasteLab />; }
