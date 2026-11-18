import React from "react";
import { Briefcase, GraduationCap, Award, ShieldCheck } from "lucide-react";
import { getLeadership } from "@/lib/cms";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export async function LeadershipView({ lang }: { lang: Lang }) {
  const t = getDict(lang).leadership;
  const members = await getLeadership();

  return (
    <div>
      {/* Page Header */}
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

      {/* Leadership List (Exact sequence and alternating layout from PDF) */}
      <section className="bg-[#F4F6F5] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {members.map((m, idx) => {
            const role = lang === "pt" ? m.rolePt : m.roleEn;
            const bio = lang === "pt" ? m.bioPt : m.bioEn;
            const exp = lang === "pt" ? m.experiencePt : m.experienceEn;
            const edu = lang === "pt" ? m.educationPt : m.educationEn;
            const expertise = lang === "pt" ? m.expertisePt : m.expertiseEn;

            // In the PDF:
            // 0 (Francisco Braz): text left, photo right
            // 1 (Johannes Oelofse): photo left, text right
            // 2 (Adolfo Zunquze): text left, photo right
            // 3 (Carlos Comé): photo left, text right
            // 4 (Furaha Tungande): text left, photo right
            const photoOnLeft = idx % 2 === 1;

            return (
              <div key={m.id} className="relative group">
                {/* Header above card: Name and Role */}
                <div
                  className={`mb-3.5 flex flex-col ${
                    photoOnLeft ? "md:items-start text-left md:pl-6" : "md:items-end text-left md:text-right md:pr-6"
                  }`}
                >
                  <h2 className="text-xl sm:text-2xl font-black text-[#222831] tracking-tight">
                    {m.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#126B3A] mt-0.5">
                    {role}
                  </p>
                </div>

                {/* Main Card with Alternating Layout matching the PDF */}
                <div
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                    photoOnLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Circular Portrait with Concentric Dual Rings from PDF */}
                  <div className="shrink-0 relative">
                    {/* Outer gradient glow / rings matching PDF */}
                    <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#26368C] via-[#38BDF8] to-[#126B3A] shadow-xl">
                      <div className="p-1 rounded-full bg-white">
                        <img
                          src={m.image}
                          alt={m.name}
                          className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Green Pill / Curved Container containing the biography */}
                  <div className="flex-1 w-full">
                    <div
                      className={`relative overflow-hidden bg-gradient-to-r from-[#126B3A] to-[#0E542D] text-white p-6 sm:p-8 shadow-lg ${
                        photoOnLeft
                          ? "rounded-2xl md:rounded-r-full md:rounded-l-2xl"
                          : "rounded-2xl md:rounded-l-full md:rounded-r-2xl"
                      }`}
                    >
                      {/* Subtle background texture */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                      <p className="relative text-xs sm:text-sm leading-relaxed text-white/95 text-justify">
                        {bio}
                      </p>

                      {/* Professional highlights */}
                      <div className="relative mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs text-emerald-100">
                        {edu && (
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-white shrink-0" />
                            <span>
                              <strong className="text-white">
                                {lang === "pt" ? "Qualificação:" : "Education:"}
                              </strong>{" "}
                              {edu}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-white shrink-0" />
                          <span>
                            <strong className="text-white">
                              {lang === "pt" ? "Experiência:" : "Experience:"}
                            </strong>{" "}
                            {exp}
                          </span>
                        </div>
                      </div>

                      {/* Expertise Badges */}
                      {expertise && expertise.length > 0 && (
                        <div className="relative mt-3 flex flex-wrap gap-1.5">
                          {expertise.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-md bg-white/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white tracking-wide"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
