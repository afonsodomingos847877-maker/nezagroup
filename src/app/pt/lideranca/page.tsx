import type { Metadata } from "next";
import { LeadershipView } from "@/components/pages/LeadershipView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Liderança e Administração",
  description: "Conselho de Administração e equipa executiva da NEZA GROUP.",
};

export default function PtLeadershipPage() {
  return <LeadershipView lang="pt" />;
}

