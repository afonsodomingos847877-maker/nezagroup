import type { Metadata } from "next";
import { ProjectsView } from "@/components/pages/ProjectsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projectos",
  description: "Portefólio de projectos da NEZA GROUP em energia, energias renováveis, água, infraestruturas, petróleo e gás e transportes.",
};

export default function PtProjectsPage() {
  return <ProjectsView lang="pt" />;
}

