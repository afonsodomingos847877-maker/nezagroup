import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "NEZA GROUP | Engineering, Infrastructure, Energy & Technology in Africa",
    template: "%s | NEZA GROUP",
  },
  description:
    "NEZA GROUP — Mozambican engineering, electrical, civil, mechanical, renewable energy, infrastructure construction, O&M, security technology, and investment group.",
  alternates: {
    languages: {
      "pt-MZ": "/pt",
      "en": "/en",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}

