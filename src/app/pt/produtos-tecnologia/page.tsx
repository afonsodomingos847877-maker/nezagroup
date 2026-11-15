import type { Metadata } from "next";
import { ProductsView } from "@/components/pages/ProductsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Produtos e Tecnologia",
  description: "Painéis eléctricos, MCCs, mini-subestações, sistemas CFTV, vigilância remota e centro de controlo 24 horas.",
};

export default function PtProductsPage() {
  return <ProductsView lang="pt" />;
}

