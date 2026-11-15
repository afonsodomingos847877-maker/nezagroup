import type { Metadata } from "next";
import { BusinessView } from "@/components/pages/BusinessView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Business Areas & Services",
  description: "NEZA GROUP's five clusters: Design & Engineering, Construction & Materials, Operations & Maintenance, Technology & Services, Investments & Concessions.",
};

export default function EnBusinessPage() {
  return <BusinessView lang="en" />;
}

