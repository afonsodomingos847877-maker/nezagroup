import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Identidade institucional, visão, missão, valores e estratégia empresarial da NEZA GROUP.",
};

export default function PtAboutPage() {
  return <AboutView lang="pt" />;
}

