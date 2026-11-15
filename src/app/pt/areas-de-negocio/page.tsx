import type { Metadata } from "next";
import { BusinessView } from "@/components/pages/BusinessView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nossas Áreas de Negócio",
  description: "Os cinco clusters da NEZA GROUP: Design e Engenharia, Construção e Materiais, Operações e Manutenção, Tecnologia e Serviços, Investimentos e Concessões.",
};

export default function PtBusinessPage() {
  return <BusinessView lang="pt" />;
}

