import type { Metadata } from "next";
import { TasteLab } from "@/components/taste-lab";

export const metadata: Metadata = { title: "Taste Lab", description: "Crack. Taste. Decide. Three HUBB matchups and one champion kernel.", alternates: { canonical: "/taste-lab" } };
export default function TasteLabPage() { return <TasteLab />; }
