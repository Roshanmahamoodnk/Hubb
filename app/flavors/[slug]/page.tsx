import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlavorExperience } from "@/components/flavor-experience";
import { flavorById, flavors } from "@/lib/catalog";

export function generateStaticParams() { return flavors.map((flavor) => ({ slug: flavor.id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flavor = flavorById(slug);
  if (!flavor) return {};
  return {
    title: `${flavor.en} — ${flavor.ar}`,
    description: `${flavor.noteEn} Shop HUBB ${flavor.en} ${flavor.weightGrams}g sunflower seeds.`,
    alternates: { canonical: `/flavors/${flavor.id}` },
    openGraph: { title: `HUBB ${flavor.en}`, description: flavor.moodEn, images: [flavor.image] },
  };
}

export default async function FlavorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flavor = flavorById(slug);
  if (!flavor) notFound();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hubb-seeds.r0shan911.chatgpt.site";
  const schema = {
    "@context": "https://schema.org", "@type": "Product", name: `HUBB ${flavor.en} Sunflower Seeds`,
    description: flavor.noteEn, image: [`${base}${flavor.image}`], sku: flavor.sku, brand: { "@type": "Brand", name: "HUBB حُبّ" },
    offers: { "@type": "Offer", priceCurrency: "SAR", price: flavor.priceSar, availability: "https://schema.org/InStock", url: `${base}/flavors/${flavor.id}` },
  };
  return <><FlavorExperience flavor={flavor} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
