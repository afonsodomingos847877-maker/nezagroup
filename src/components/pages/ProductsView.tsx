import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export async function ProductsView({ lang }: { lang: Lang }) {
  const t = getDict(lang).products;
  const routes = ROUTE_MAP[lang];
  const products = await getProducts();

  const industrial = products.filter((p) => p.category === "industrial");
  const technology = products.filter((p) => p.category === "technology");

  const renderGrid = (items: typeof products) => (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const name = lang === "pt" ? item.namePt : item.nameEn;
        const desc = lang === "pt" ? item.descPt : item.descEn;
        const app = lang === "pt" ? item.appPt : item.appEn;
        return (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-44 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-bold text-[#222831]">{name}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                {desc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#126B3A]">
                  {t.applicationLabel}
                </p>
                <p className="mt-0.5 text-xs text-slate-600">{app}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-[#26368C]">{t.industrialTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.industrialSubtitle}</p>
          </div>
          {renderGrid(industrial)}
        </div>
      </section>

      <section className="bg-[#F4F6F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-[#126B3A]">{t.techTitle}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">{t.techSubtitle}</p>
          </div>
          {renderGrid(technology)}

          <div className="mt-12 text-center">
            <Link
              href={`${routes.contact}?${lang === "pt" ? "servico=Produtos" : "service=Products"}`}
              className="inline-flex items-center gap-2 rounded-md bg-[#126B3A] px-6 py-3 text-sm font-bold text-white hover:bg-[#0D502B] transition-colors"
            >
              <span>{t.requestQuote}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

