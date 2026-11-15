import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Contacte a sede da NEZA GROUP em Maputo, Moçambique. Solicite uma proposta comercial ou informação técnica.",
};

export default function PtContactPage() {
  return <ContactView lang="pt" />;
}

