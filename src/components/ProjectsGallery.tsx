"use client";

import React, { useState } from "react";
import { MapPin, Building2, Clock, BadgeDollarSign, ShieldCheck, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectItem } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export function ProjectsGallery({
  projects,
  lang,
}: {
  projects: ProjectItem[];
  lang: Lang;
}) {
  const t = getDict(lang).projects;
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filtered =
    selectedSector === "all"
      ? projects
      : projects.filter((p) => p.sector === selectedSector);

  const badgeColor = (type: ProjectItem["responsibilityType"]) => {
    switch (type) {
      case "direct":
        return "bg-[#126B3A]/10 text-[#126B3A] border-[#126B3A]/30";
      case "managed":
        return "bg-[#26368C]/10 text-[#26368C] border-[#26368C]/30";
      case "subcontract":
        return "bg-[#F4F6F5] text-[#222831] border-slate-300";
      case "jv":
        return "bg-[#222831]/5 text-[#222831] border-slate-300";
    }
  };

  return (
    <div>
      {/* Sector Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible mb-6">
        <button
          type="button"
          onClick={() => setSelectedSector("all")}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            selectedSector === "all"
              ? "bg-[#126B3A] text-white shadow-sm"
              : "bg-[#F4F6F5] text-[#222831] hover:bg-slate-200"
          }`}
        >
          {t.allSectors}
        </button>
        {t.sectors.map((sec) => (
          <button
            key={sec.key}
            type="button"
            onClick={() => setSelectedSector(sec.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              selectedSector === sec.key
                ? "bg-[#26368C] text-white shadow-sm"
                : "bg-[#F4F6F5] text-[#222831] hover:bg-slate-200"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Transparency Note */}
      <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-xs leading-relaxed text-[#26368C] flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-[#26368C]" />
        <p>{t.responsibilityNote}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((proj) => {
          const title = lang === "pt" ? proj.titlePt : proj.titleEn;
          const sectorLabel = lang === "pt" ? proj.sectorLabelPt : proj.sectorLabelEn;
          const responsibility = lang === "pt" ? proj.responsibilityPt : proj.responsibilityEn;
          const scope = lang === "pt" ? proj.scopePt : proj.scopeEn;

          return (
            <article
              key={proj.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="relative h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => {
                  setActiveProject(proj);
                  setPhotoIndex(0);
                }}
              >
                <img
                  src={proj.images[0] || "/images/hero/industrial-plant.png"}
                  alt={title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 rounded bg-[#222831]/85 px-2.5 py-1 text-[11px] font-semibold text-white">
                  {sectorLabel}
                </span>
                {proj.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded bg-black/65 px-2 py-0.5 text-[11px] font-medium text-white">
                    +{proj.images.length - 1} {lang === "pt" ? "fotos" : "photos"}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span
                  className={`inline-block w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold mb-3 ${badgeColor(
                    proj.responsibilityType
                  )}`}
                >
                  {responsibility}
                </span>

                <h3 className="text-lg font-bold text-[#222831] leading-snug mb-3">
                  {title}
                </h3>

                <dl className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#126B3A] shrink-0 mt-0.5" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BadgeDollarSign className="h-3.5 w-3.5 text-[#26368C] shrink-0 mt-0.5" />
                    <span className="truncate">
                      <strong>{t.labels.value}:</strong> {proj.value}
                    </span>
                  </div>
                </dl>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1">
                  {scope}
                </p>

                {proj.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(proj);
                      setPhotoIndex(0);
                    }}
                    className="mt-5 inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-[#26368C] hover:bg-[#F4F6F5] transition-colors"
                  >
                    {lang === "pt" ? "Ver Galeria e Detalhes" : "View Gallery & Details"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Gallery */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-72 sm:h-96 bg-slate-900 flex items-center justify-center">
              <img
                src={activeProject.images[photoIndex] || "/images/hero/industrial-plant.png"}
                alt={lang === "pt" ? activeProject.titlePt : activeProject.titleEn}
                className="h-full w-full object-contain"
              />
              {activeProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex(
                        (photoIndex - 1 + activeProject.images.length) %
                          activeProject.images.length
                      )
                    }
                    className="absolute left-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex((photoIndex + 1) % activeProject.images.length)
                    }
                    className="absolute right-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-[#222831]">
                {lang === "pt" ? activeProject.titlePt : activeProject.titleEn}
              </h3>
              <p className="text-xs font-semibold text-[#126B3A]">
                {lang === "pt" ? activeProject.responsibilityPt : activeProject.responsibilityEn}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-[#F4F6F5] rounded-lg p-3">
                <div><strong>{t.labels.location}:</strong> {activeProject.location}</div>
                <div><strong>{t.labels.client}:</strong> {activeProject.client}</div>
                <div><strong>{t.labels.duration}:</strong> {activeProject.duration}</div>
                <div><strong>{t.labels.value}:</strong> {activeProject.value}</div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === "pt" ? activeProject.scopePt : activeProject.scopeEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

