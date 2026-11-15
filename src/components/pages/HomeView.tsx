import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Shield, Zap, Globe2, Building2, Cpu } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";
import { getNews, getPartnersData, getProjects, getServices } from "@/lib/cms";
import { TypewriterTitle } from "@/components/TypewriterTitle";

export async function HomeView({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const routes = ROUTE_MAP[lang];
  const [services, projects, partnersData, news] = await Promise.all([
    getServices(),
    getProjects(),
    getPartnersData(),
    getNews(),
  ]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const sectorIcons = [Zap, Globe2, Layers, Building2, Cpu, Shield];

  const heroPillars =
    lang === "pt"
      ? [
          { title: "5 Clusters Integrados", sub: "Engenharia, Construção, O&M, Tecnologia e Investimentos" },
          { title: "Actuação Regional", sub: "Moçambique, África Austral e Mercados Internacionais" },
          { title: "Conteúdo Local", sub: "Engenharia qualificada e desenvolvimento de fornecedores" },
        ]
      : [
          { title: "5 Integrated Clusters", sub: "Engineering, Construction, O&M, Technology & Investments" },
          { title: "Regional Footprint", sub: "Mozambique, Southern Africa & International Markets" },
          { title: "Local Content", sub: "Qualified engineering & domestic supplier development" },
        ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#222831] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/bannerneza.jpg"
            alt="NEZA GROUP Engineering & Infrastructure Banner"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/85 via-[#222831]/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-white uppercase mb-5 backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#126B3A]" />
              {t.hero.badge}
            </span>
            <TypewriterTitle
              as="h1"
              text={t.hero.title}
              speedMs={20}
              cursorClassName="bg-white"
              className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-[52px] leading-[1.12]"
            />
            <p className="mt-5 text-sm sm:text-lg leading-relaxed text-slate-200 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <Link
                href={routes.business}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#126B3A] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#0D502B] hover:-translate-y-0.5 transition-all"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={routes.contact}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>
          </div>

          {/* Institutional Pillars Bar */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-white/15 pt-8">
            {heroPillars.map((p) => (
              <div key={p.title} className="rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-xs">
                <p className="text-sm font-bold text-white">{p.title}</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Introduction */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#126B3A]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                  {t.home.introLabel}
                </p>
              </div>
              <TypewriterTitle
                as="h2"
                text={t.home.introTitle}
                className="text-2xl sm:text-3xl font-extrabold text-[#222831] leading-tight"
              />
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {t.home.introText}
              </p>
              <div className="pt-2">
                <Link
                  href={routes.about}
                  className="inline-flex items-center gap-2 rounded-md bg-[#F4F6F5] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#222831] hover:bg-[#126B3A] hover:text-white transition-colors"
                >
                  <span>{t.home.introLink}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <img
                src="/images/clusters/civil-engineering.png"
                alt="NEZA Civil & Electrical Engineering"
                className="h-44 sm:h-52 w-full rounded-xl object-cover shadow-md"
              />
              <img
                src="/images/hero/bridge-highway.png"
                alt="NEZA Infrastructure"
                className="h-44 sm:h-52 w-full rounded-xl object-cover shadow-md sm:mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Five Business Clusters */}
      <section className="bg-[#F4F6F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#126B3A]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                {t.home.clustersLabel}
              </p>
            </div>
            <TypewriterTitle
              as="h2"
              text={t.home.clustersTitle}
              className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#222831]"
            />
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {t.home.clustersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((cluster) => (
              <Link
                key={cluster.id}
                href={`${routes.business}#${cluster.id}`}
                className="group relative overflow-hidden flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#126B3A] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#126B3A] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#222831] text-xs font-bold text-white shadow-xs group-hover:bg-[#126B3A] transition-colors">
                      {cluster.number}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#126B3A] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-[#222831] group-hover:text-[#126B3A] transition-colors">
                    {lang === "pt" ? cluster.titlePt : cluster.titleEn}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {lang === "pt" ? cluster.shortDescPt : cluster.shortDescEn}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {cluster.collaborators.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-[#F4F6F5] px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}

            {/* 6th card: Local Content */}
            <Link
              href={routes.localContent}
              className="group flex flex-col justify-between rounded-xl border border-[#126B3A] bg-[#126B3A] p-6 text-white shadow-sm hover:bg-[#0D502B] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex rounded-md bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                    {lang === "pt" ? "Conteúdo Local" : "Local Content"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold">{t.localContent.bizTitle}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85">
                  {t.localContent.badgeText}
                </p>
              </div>
              <span className="mt-5 text-xs font-bold uppercase tracking-wider text-white/90">
                {t.home.localContentCta} →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Projects */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#126B3A]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                  {t.home.projectsLabel}
                </p>
              </div>
              <TypewriterTitle
                as="h2"
                text={t.home.projectsTitle}
                className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#222831]"
              />
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                {t.home.projectsSubtitle}
              </p>
            </div>
            <Link
              href={routes.projects}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-[#222831] hover:border-[#126B3A] hover:text-[#126B3A] transition-colors shrink-0"
            >
              <span>{t.home.projectsViewAll}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredProjects.map((proj) => (
              <Link
                key={proj.id}
                href={routes.projects}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={proj.images[0]}
                    alt={lang === "pt" ? proj.titlePt : proj.titleEn}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#126B3A]">
                    {lang === "pt" ? proj.sectorLabelPt : proj.sectorLabelEn}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-[#222831] group-hover:text-[#126B3A] transition-colors">
                    {lang === "pt" ? proj.titlePt : proj.titleEn}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{proj.location}</p>
                  <p className="mt-3 inline-block rounded-full bg-[#F4F6F5] border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-[#222831]">
                    {lang === "pt" ? proj.responsibilityPt : proj.responsibilityEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors of Activity */}
      <section className="bg-[#222831] py-14 sm:py-20 text-white relative overflow-hidden">
        <img
          src="/fundao01.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#222831]/75" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-white/75">
              {t.home.sectorsLabel}
            </p>
            <TypewriterTitle
              as="h2"
              text={t.home.sectorsTitle}
              cursorClassName="bg-white"
              className="mt-2 text-2xl sm:text-3xl font-extrabold"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.sectors.map((sec, idx) => {
              const Icon = sectorIcons[idx % sectorIcons.length];
              return (
                <div
                  key={sec.name}
                  className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 mb-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white">{sec.name}</h3>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation & Excellence Highlight */}
      <section className="bg-[#F4F6F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <img
                src="/images/products/electrical-panels-banner.png"
                alt="NEZA Electrical & Automation Panels"
                className="w-full rounded-xl object-cover shadow-md"
              />
            </div>
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#126B3A]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                  {t.home.excellenceLabel}
                </p>
              </div>
              <TypewriterTitle
                as="h2"
                text={t.home.excellenceTitle}
                className="text-2xl sm:text-3xl font-extrabold text-[#222831]"
              />
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {t.home.excellenceText}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <Link
                  href={routes.products}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#126B3A] px-5 py-3 text-xs font-bold text-white hover:bg-[#0D4F2B] transition-colors"
                >
                  <span>{t.home.excellenceCta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={routes.localContent}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-[#222831] hover:border-[#126B3A] transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#126B3A]" />
                  <span>{t.home.localContentCta}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients & Partners Strip */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                {t.home.partnersLabel}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#222831]">
                {t.home.partnersTitle}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                {t.home.partnersSubtitle}
              </p>
            </div>
            <Link
              href={routes.partners}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#222831] hover:text-[#126B3A]"
            >
              <span>{t.home.partnersViewAll}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {partnersData.clients.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-[#126B3A]/40 hover:shadow-sm transition-all"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional News & Releases */}
      {news.length > 0 && (
        <section className="bg-[#F4F6F5] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#126B3A]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#126B3A]">
                  {lang === "pt" ? "Actualidade Institucional" : "Institutional Updates"}
                </p>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-[#222831]">
                {lang === "pt" ? "Notícias e Comunicados" : "News & Releases"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {news.slice(0, 3).map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <time className="text-xs font-semibold text-[#126B3A]">{item.date}</time>
                  <h3 className="mt-2 text-base font-bold text-[#222831]">
                    {lang === "pt" ? item.titlePt : item.titleEn}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {lang === "pt" ? item.summaryPt : item.summaryEn}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Contact CTA */}
      <section className="relative overflow-hidden bg-[#222831] py-14 text-white">
        <img
          src="/fundao01.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#222831]/75" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <TypewriterTitle
              as="h2"
              text={t.home.ctaBannerTitle}
              cursorClassName="bg-white"
              className="text-2xl sm:text-3xl font-extrabold"
            />
            <p className="mt-2 text-sm sm:text-base text-white/90">
              {t.home.ctaBannerText}
            </p>
          </div>
          <Link
            href={routes.contact}
            className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#126B3A] shadow-md hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>{t.home.ctaBannerBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
