import type { Metadata } from "next";
import { LocalContentView } from "@/components/pages/LocalContentView";

export const metadata: Metadata = {
  title: "Business Improvement & Local Content",
  description: "NEZA GROUP's commitment to local content, supplier development, and local support services in Mozambique.",
};

export default function EnLocalContentPage() {
  return <LocalContentView lang="en" />;
}

