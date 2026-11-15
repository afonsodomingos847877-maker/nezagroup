import React from "react";
import { Info } from "lucide-react";
import { getPartnersData } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export async function PartnersView({ lang }: { lang: Lang }) {
  const t = getDict(lang).partners;
  const data = await getPartnersData();

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

      {/* Section A: Clients */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-[#222831]">{t.clientsTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.clientsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.clients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="flex h-24 w-full items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 w-full">
                  <p className="text-sm font-bold text-[#222831]">{client.name}</p>
                  <p className="mt-0.5 text-xs text-[#126B3A] font-medium">
                    {lang === "pt" ? client.sectorPt : client.sectorEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Partners & Associates */}
      <section className="bg-[#F4F6F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-[#126B3A]">{t.partnersTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.partnersSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <div className="flex h-20 w-full items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 w-full">
                  <p className="text-sm font-bold text-[#222831]">{partner.name}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      partner.type === "collaborator"
                        ? "bg-[#126B3A]/10 text-[#126B3A]"
                        : "bg-[#F4F6F5] text-[#222831]"
                    }`}
                  >
                    {partner.type === "collaborator" ? t.typeCollaborator : t.typePartner}
                  </span>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {lang === "pt" ? partner.clusterPt : partner.clusterEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-slate-300 bg-white p-4 text-xs text-slate-600 flex items-start gap-3">
            <Info className="h-4 w-4 text-[#126B3A] shrink-0 mt-0.5" />
            <p>{t.transparencyNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

