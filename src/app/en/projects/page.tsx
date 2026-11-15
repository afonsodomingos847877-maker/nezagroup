import type { Metadata } from "next";
import { ProjectsView } from "@/components/pages/ProjectsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "NEZA GROUP project portfolio across energy, renewable energy, water, infrastructure, oil & gas, and transport.",
};

export default function EnProjectsPage() {
  return <ProjectsView lang="en" />;
}

