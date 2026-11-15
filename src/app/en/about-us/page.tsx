import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "About Us",
  description: "Institutional identity, vision, mission, values, and corporate strategy of NEZA GROUP.",
};

export default function EnAboutPage() {
  return <AboutView lang="en" />;
}

