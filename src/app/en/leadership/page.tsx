import type { Metadata } from "next";
import { LeadershipView } from "@/components/pages/LeadershipView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership & Board of Directors",
  description: "Board of Directors and executive leadership team of NEZA GROUP.",
};

export default function EnLeadershipPage() {
  return <LeadershipView lang="en" />;
}

