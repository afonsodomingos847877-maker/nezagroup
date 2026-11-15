import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Lang } from "@/lib/routes";

export function SiteShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}

