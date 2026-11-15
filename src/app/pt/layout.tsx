import React from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "pt-MZ": "/pt",
      "en": "/en",
    },
  },
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="pt">{children}</SiteShell>;
}

