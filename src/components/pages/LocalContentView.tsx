import React from "react";
import Link from "next/link";
import { CheckCircle2, Award, ArrowRight } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export function LocalContentView({ lang }: { lang: Lang }) {
  const t = getDict(lang).localContent;
  const routes = ROUTE_MAP[lang];

  const groupedLocalServices =
    lang === "pt"
      ? [
          {
            title: "Logística e Transporte",
            items: ["Transporte Terrestre", "Transporte de Pessoal", "Logística e Armazenagem", "Logística Portuária", "Fornecimento de Combustível"],
          },
          {
            title: "Obras e Infraestruturas",
            items: ["Obras Civis", "Materiais de Pedreira", "Tratamento de Superfícies", "Limpeza de Terrenos e Vedações", "Aluguer de Instalações e Equipamentos"],
          },
          {
            title: "Gestão e Suporte Operacional",
            items: ["Manutenção e Gestão de Acampamentos", "Gestão de Instalações", "Serviços de Catering", "Gestão de Resíduos", "Serviços de Emergência"],
          },
          {
            title: "TI, Formação e Segurança",
            items: ["Serviços de Tecnologias de Informação", "Consultoria de Recursos Humanos", "Serviços de Segurança", "Serviços de Formação"],
          },
        ]
      : [
          {
            title: "Logistics & Transport",
            items: ["Land Transportation", "Personnel Transport", "Logistics and Warehousing", "Port Logistics", "Fuel Supply"],
          },
          {
            title: "Civil Works & Infrastructure",
            items: ["Civil Works", "Quarry Materials", "Surface Treatment", "Land Clearing and Fencing", "Plant and Equipment Hire"],
          },
          {
            title: "Operations & Facility Support",
            items: ["Camp Maintenance and Management", "Facilities Management", "Catering Services", "Waste Management", "Emergency Services"],
          },
          {
            title: "IT, Training & Security",
            items: ["IT Services", "Manpower Consulting", "Security Services", "Training Services"],
          },
        ];

  return (
    <div>
      <section className="relative overflow-hidden bg-[#222831] py-16 text-white">
        <div className="absolute inset-0 neza-grid-pattern opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#126B3A]" />
            LOCAL CONTENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{t.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">{t.pageSubtitle}</p>
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="bg-[#126B3A] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-9 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-white/85" />
              <h2 className="text-2xl font-bold">{t.badgeTitle}</h2>
            </div>
            <p className="text-base leading-relaxed text-white/90">{t.badgeText}</p>
          </div>
          <div className="md:col-span-3 flex justify-center">
            <img
              src="/images/clusters/mozambique-map.png"
              alt="Mozambique Local Content Coverage"
              className="h-36 w-auto rounded-lg bg-white/10 p-2 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Business Improvement Services */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold text-[#222831]">{t.bizTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.bizSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.bizServices.map((srv) => (
              <div
                key={srv}
                className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-[#F4F6F5] px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-[#126B3A] shrink-0" />
                <span className="text-sm font-medium text-[#222831]">{srv}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grouped Local Services Support */}
      <section className="bg-[#F4F6F5] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold text-[#126B3A]">{t.localTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.localSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {groupedLocalServices.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <h3 className="text-base font-bold text-[#222831] mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-[#F4F6F5] border border-slate-200 px-3 py-1.5 text-xs font-medium text-[#222831]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`${routes.contact}?${lang === "pt" ? "servico=Conte%C3%BAdo%20Local" : "service=Local%20Content"}`}
              className="inline-flex items-center gap-2 rounded-md bg-[#126B3A] px-6 py-3 text-sm font-bold text-white hover:bg-[#0D4F2B] transition-colors"
            >
              <span>{lang === "pt" ? "Falar com a Equipa de Conteúdo Local" : "Contact Our Local Content Team"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
