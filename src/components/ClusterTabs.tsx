"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { ProjectItem, ServiceCluster } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export function ClusterTabs({
  clusters,
  projects,
  lang,
}: {
  clusters: ServiceCluster[];
  projects: ProjectItem[];
  lang: Lang;
}) {
  const t = getDict(lang).business;
  const routes = ROUTE_MAP[lang];
  const [activeId, setActiveId] = useState<string>(clusters[0]?.id || "");

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash && clusters.some((c) => c.id === hash)) {
      setActiveId(hash);
    }
  }, [clusters]);

  const cluster = clusters.find((c) => c.id === activeId) || clusters[0];
  if (!cluster) return null;

  const title = lang === "pt" ? cluster.titlePt : cluster.titleEn;
  const desc = lang === "pt" ? cluster.fullDescPt : cluster.fullDescEn;
  const servicesList = lang === "pt" ? cluster.servicesPt : cluster.servicesEn;
  const apps = lang === "pt" ? cluster.applicationsPt : cluster.applicationsEn;
  const relatedProjects = projects.filter((p) =>
    cluster.relatedProjectIds.includes(p.id)
  );

  return (
    <div>
      {/* Cluster Selector Tabs */}
      <div className="bg-[#F4F6F5] border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {clusters.map((c) => {
              const isSelected = c.id === cluster.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#126B3A] text-white shadow-sm"
                      : "bg-white text-[#222831] border border-slate-200 hover:border-[#126B3A] hover:text-[#126B3A]"
                  }`}
                >
                  {c.number}. {lang === "pt" ? c.titlePt : c.titleEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Cluster Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#222831] text-sm font-bold text-white">
                  {cluster.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#222831]">
                  {title}
                </h2>
              </div>

              <p className="text-base leading-relaxed text-slate-600">{desc}</p>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#126B3A] mb-3">
                  {t.servicesHeading}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((srv) => (
                    <span
                      key={srv}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-[#F4F6F5] px-3 py-1.5 text-xs font-medium text-[#222831]"
                    >
                      <Check className="h-3.5 w-3.5 text-[#126B3A] shrink-0" />
                      <span>{srv}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {t.applicationsHeading}
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {apps.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {t.collaboratorsHeading}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cluster.collaborators.map((col) => (
                      <span
                        key={col}
                        className="rounded-md bg-[#F4F6F5] border border-slate-200 px-2.5 py-1 text-xs font-semibold text-[#222831]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`${routes.contact}?${lang === "pt" ? "servico" : "service"}=${encodeURIComponent(title)}`}
                  className="inline-flex items-center gap-2 rounded-md bg-[#126B3A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0D502B] transition-colors"
                >
                  <span>{t.requestInfo}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <img
                src={cluster.image}
                alt={title}
                className="h-64 w-full rounded-xl object-cover shadow-md"
              />

              {relatedProjects.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-[#F4F6F5] p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#126B3A] mb-3">
                    {t.relatedProjectsHeading}
                  </h4>
                  <ul className="space-y-2.5">
                    {relatedProjects.map((rp) => (
                      <li
                        key={rp.id}
                        className="border-b border-slate-200/80 pb-2 last:border-none last:pb-0"
                      >
                        <Link
                          href={routes.projects}
                          className="block text-sm font-semibold text-[#222831] hover:text-[#126B3A]"
                        >
                          {lang === "pt" ? rp.titlePt : rp.titleEn}
                        </Link>
                        <span className="text-xs text-slate-500">{rp.location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

