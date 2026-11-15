import type { Metadata } from "next";
import { PartnersView } from "@/components/pages/PartnersView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clientes e Parceiros",
  description: "Clientes, parceiros estratégicos e colaboradores técnicos da NEZA GROUP.",
};

export default function PtPartnersPage() {
  return <PartnersView lang="pt" />;
}

