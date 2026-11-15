import React from "react";
import { getProjects, getServices } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";
import { ClusterTabs } from "@/components/ClusterTabs";

export async function BusinessView({ lang }: { lang: Lang }) {
  const t = getDict(lang).business;
  const [clusters, projects] = await Promise.all([getServices(), getProjects()]);

  return (
    <div>
      <section className="bg-[#222831] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/75">
            NEZA LIMITADA CLUSTERS
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">{t.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">{t.pageSubtitle}</p>
        </div>
      </section>

      <ClusterTabs clusters={clusters} projects={projects} lang={lang} />
    </div>
  );
}
