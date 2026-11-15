import type { Metadata } from "next";
import { LocalContentView } from "@/components/pages/LocalContentView";

export const metadata: Metadata = {
  title: "Serviços de Melhoria Empresarial e Conteúdo Local",
  description: "Compromisso da NEZA GROUP com o conteúdo local, capacitação de fornecedores e serviços de apoio em Moçambique.",
};

export default function PtLocalContentPage() {
  return <LocalContentView lang="pt" />;
}

