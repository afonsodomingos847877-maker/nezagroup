import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { getLeadership } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export async function LeadershipView({ lang }: { lang: Lang }) {
  const t = getDict(lang).leadership;
  const members = await getLeadership();

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

      <section className="bg-[#F4F6F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {members.map((m) => {
            const role = lang === "pt" ? m.rolePt : m.roleEn;
            const bio = lang === "pt" ? m.bioPt : m.bioEn;
            const exp = lang === "pt" ? m.experiencePt : m.experienceEn;
            const edu = lang === "pt" ? m.educationPt : m.educationEn;
            const expertise = lang === "pt" ? m.expertisePt : m.expertiseEn;

            return (
              <article
                key={m.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm grid grid-cols-1 md:grid-cols-12"
              >
                <div className="md:col-span-3 bg-[#26368C]/5 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-200">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-36 w-36 rounded-full object-cover border-4 border-[#126B3A] shadow-md"
                  />
                  <h2 className="mt-4 text-center text-lg font-bold text-[#222831]">
                    {m.name}
                  </h2>
                  <p className="mt-1 text-center text-xs font-semibold text-[#126B3A]">
                    {role}
                  </p>
                </div>

                <div className="md:col-span-9 p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.bioLabel}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{bio}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                    <div className="flex items-start gap-2.5">
                      <Briefcase className="h-4 w-4 text-[#26368C] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {t.experienceLabel}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">{exp}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="h-4 w-4 text-[#126B3A] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {t.educationLabel}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">{edu}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {t.expertiseLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {expertise.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#F4F6F5] border border-slate-200 px-3 py-1 text-xs font-medium text-[#222831]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

