import type { Metadata } from "next";
import { PartnersView } from "@/components/pages/PartnersView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description: "Clients, strategic partners, and technical collaborators of NEZA GROUP.",
};

export default function EnPartnersPage() {
  return <PartnersView lang="en" />;
}

