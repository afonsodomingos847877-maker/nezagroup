import React from "react";
import { Compass, Target, Award, Globe, Layers } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export function AboutView({ lang }: { lang: Lang }) {
  const t = getDict(lang).about;

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#222831] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/75">
            NEZA GROUP
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">{t.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">{t.pageSubtitle}</p>
        </div>
      </section>

      {/* Who We Are & History */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl font-bold text-[#222831]">{t.whoWeAreTitle}</h2>
            <p className="text-base leading-relaxed text-slate-600">{t.whoWeAreP1}</p>
            <p className="text-base leading-relaxed text-slate-600">{t.whoWeAreP2}</p>
            <p className="text-base leading-relaxed text-slate-600">{t.whoWeAreP3}</p>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#26368C] mb-2">{t.historyTitle}</h3>
              <p className="text-base leading-relaxed text-slate-600">{t.historyText}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <img
              src="/images/clusters/civil-engineering.png"
              alt="NEZA Engineering Works"
              className="w-full rounded-xl object-cover shadow-md h-64"
            />
            <div className="rounded-xl border border-slate-200 bg-[#F4F6F5] p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Compass className="h-6 w-6 text-[#126B3A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#222831]">{t.visionTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.visionText}</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4 flex items-start gap-3">
                <Target className="h-6 w-6 text-[#26368C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#222831]">{t.missionTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.missionText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4F6F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Award className="h-5 w-5 text-[#126B3A]" />
            <h2 className="text-2xl font-bold text-[#222831]">{t.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((val) => (
              <div key={val.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#26368C]">{val.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Strategy (8 Pillars) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#222831]">{t.strategyTitle}</h2>

          <div className="mt-6 rounded-xl border border-slate-200 bg-[#F4F6F5] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-[#126B3A]">{t.strategyNarrativeTitle}</h3>
            {t.strategyNarrativeParagraphs.map((para) => (
              <p key={para} className="text-sm sm:text-base leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </div>

          <p className="mt-8 text-base text-slate-600 max-w-3xl">{t.strategyIntro}</p>
          <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {t.strategyPillars.map((pillar) => {
              const [heading, ...rest] = pillar.split(":");
              const body = rest.join(":");
              return (
                <div
                  key={pillar}
                  className="rounded-lg border border-slate-200 bg-[#F4F6F5] p-4 text-sm leading-relaxed text-[#222831]"
                >
                  <strong className="text-[#26368C]">{heading}:</strong>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Model & Geographic Ambition */}
      <section className="bg-[#26368C] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-white/15 bg-white/5 p-7">
            <Layers className="h-6 w-6 text-white/80 mb-3" />
            <h2 className="text-xl font-bold">{t.modelTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{t.modelText}</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-7">
            <Globe className="h-6 w-6 text-white/80 mb-3" />
            <h2 className="text-xl font-bold">{t.geoTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{t.geoText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

