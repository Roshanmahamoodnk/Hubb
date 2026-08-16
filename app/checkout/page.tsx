import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/checkout-experience";
export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };
export default function CheckoutPage() { return <CheckoutExperience />; }
