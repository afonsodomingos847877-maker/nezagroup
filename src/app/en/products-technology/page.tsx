import type { Metadata } from "next";
import { ProductsView } from "@/components/pages/ProductsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products & Technology",
  description: "Electrical panels, MCCs, mini-substations, CCTV systems, remote surveillance, and 24-hour security control center.",
};

export default function EnProductsPage() {
  return <ProductsView lang="en" />;
}

