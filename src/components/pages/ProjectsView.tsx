import React from "react";
import { getProjects } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";
import { ProjectsGallery } from "@/components/ProjectsGallery";

export async function ProjectsView({ lang }: { lang: Lang }) {
  const t = getDict(lang).projects;
  const projects = await getProjects();

  return (
    <div>
      <section className="relative overflow-hidden bg-[#222831] py-16 text-white">
        <div className="absolute inset-0 neza-grid-pattern opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#126B3A]" />
            NEZA GROUP
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{t.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">{t.pageSubtitle}</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsGallery projects={projects} lang={lang} />
        </div>
      </section>
    </div>
  );
}

