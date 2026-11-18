"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Lang } from "@/lib/routes";

export interface HeroSlide {
  id: string;
  image: string;
  badgePt: string;
  badgeEn: string;
  titlePt: string;
  titleEn: string;
  subtitlePt: string;
  subtitleEn: string;
  ctaPrimaryPt: string;
  ctaPrimaryEn: string;
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/bannerneza.jpg",
    badgePt: "Engenharia • Infraestruturas • Energia • Tecnologia",
    badgeEn: "Engineering • Infrastructure • Energy • Technology",
    titlePt: "INSPIRANDO A EXCELÊNCIA EM ENGENHARIA EM ÁFRICA E ALÉM-FRONTEIRAS.",
    titleEn: "INSPIRING ENGINEERING EXCELLENCE ACROSS AFRICA AND BEYOND.",
    subtitlePt:
      "Desenvolvemos soluções profissionais de engenharia, infraestruturas, tecnologia e serviços integrados para impulsionar o desenvolvimento sustentável em Moçambique, África Austral e além-fronteiras.",
    subtitleEn:
      "We deliver professional engineering, infrastructure, technology, and integrated services solutions to drive sustainable development across Mozambique, Southern Africa, and beyond.",
    ctaPrimaryPt: "Explorar os Nossos Serviços",
    ctaPrimaryEn: "Explore Our Services",
    ctaLink: "/business",
  },
  {
    id: "slide-2",
    image: "/images/hero/industrial-plant.png",
    badgePt: "Energia, Gás & Centrais Electroprodutoras",
    badgeEn: "Energy, Gas & Power Generation Plants",
    titlePt: "CAPACIDADE TÉCNICA COMPROVADA EM GRANDES PROJECTOS DE ENERGIA.",
    titleEn: "PROVEN TECHNICAL CAPABILITY IN MAJOR ENERGY & EPC PROJECTS.",
    subtitlePt:
      "Historial de execução de centrais a gás em ciclo simples (40,29 MW em Chókwè), centrais térmicas e subestações com rigorosos padrões internacionais de qualidade.",
    subtitleEn:
      "Proven track record delivering simple-cycle gas power plants (40.29 MW in Chókwè), thermal co-generation and substations under rigorous international quality standards.",
    ctaPrimaryPt: "Ver Portefólio de Energia",
    ctaPrimaryEn: "View Energy Portfolio",
    ctaLink: "/projects",
  },
  {
    id: "slide-3",
    image: "/images/projects/katembe-bridge.png",
    badgePt: "Infraestruturas Rodoviárias, Pontes & Portagens",
    badgeEn: "Road Infrastructure, Bridges & Toll Systems",
    titlePt: "OBRAS ESTRUTURANTES PARA O DESENVOLVIMENTO E CONECTIVIDADE.",
    titleEn: "LANDMARK INFRASTRUCTURE FOR REGIONAL DEVELOPMENT & CONNECTIVITY.",
    subtitlePt:
      "Engenharia estrutural de grandes obras de arte, pavimentação rodoviária e praças de portagem electrónicas automatizadas de elevada capacidade de tráfego.",
    subtitleEn:
      "Heavy structural engineering, highway paving, and automated high-throughput electronic toll collection systems for critical transport corridors.",
    ctaPrimaryPt: "Explorar Infraestruturas",
    ctaPrimaryEn: "Explore Infrastructure",
    ctaLink: "/projects",
  },
  {
    id: "slide-4",
    image: "/images/products/electrical-panels-banner.png",
    badgePt: "Painéis Eléctricos, MCC & Automação Industrial",
    badgeEn: "Switchboards, MCC & Industrial Automation",
    titlePt: "FABRICO E MONTAGEM LOCAL DE QUADROS ELÉCTRICOS DE PRECISÃO.",
    titleEn: "LOCAL CERTIFIED MANUFACTURING OF ELECTRICAL SWITCHBOARDS & MCCs.",
    subtitlePt:
      "Quadros gerais de baixa tensão (QGBT), centros de controlo de motores (MCC), automação e ensaios de conformidade técnica com padrões internacionais IEC.",
    subtitleEn:
      "Main low-voltage switchboards (LV), motor control centers (MCC), process automation and full conformity testing under international IEC standards.",
    ctaPrimaryPt: "Conhecer Linha de Produtos",
    ctaPrimaryEn: "Discover Product Line",
    ctaLink: "/products-technology",
  },
  {
    id: "slide-5",
    image: "/images/projects/chokwe-aerial.jpg",
    badgePt: "Energias Renováveis & Transição Energética",
    badgeEn: "Renewable Energy & Energy Transition",
    titlePt: "PARQUES SOLARES FOTOVOLTAICOS DE GRANDE ESCALA EM ÁFRICA.",
    titleEn: "UTILITY-SCALE SOLAR PHOTOVOLTAIC PARKS ACROSS AFRICA.",
    subtitlePt:
      "Montagem electromecânica, cablagem de alta tensão e comissionamento de parques solares de 75 MW a 82,5 MWp para um futuro energético limpo e sustentável.",
    subtitleEn:
      "Electromechanical mounting, high-voltage cabling and grid commissioning for 75 MW to 82.5 MWp solar PV plants building a clean energy future.",
    ctaPrimaryPt: "Ver Soluções Renováveis",
    ctaPrimaryEn: "View Renewable Solutions",
    ctaLink: "/business",
  },
];

interface DynamicHeroBannerProps {
  lang: Lang;
  routes: {
    home: string;
    about: string;
    business: string;
    projects: string;
    products: string;
    leadership: string;
    partners: string;
    localContent: string;
    contact: string;
  };
  heroPillars: Array<{ title: string; sub: string }>;
  ctaSecondaryText: string;
}

export function DynamicHeroBanner({
  lang,
  routes,
  heroPillars,
  ctaSecondaryText,
}: DynamicHeroBannerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  const currentSlide = HERO_SLIDES[currentIdx];

  // Resolve ctaLink according to language
  const resolveCtaLink = (rawLink: string) => {
    if (rawLink === "/business") return routes.business;
    if (rawLink === "/projects") return routes.projects;
    if (rawLink === "/products-technology") return routes.products;
    return routes.business;
  };

  return (
    <section
      className="relative overflow-hidden bg-[#222831] text-white"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="NEZA GROUP Hero Banner"
    >
      {/* Background Images Slider with smooth cross-fade */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt=""
                className={`h-full w-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Cinematic Gradient Scrim: Dark on left for text readability, clear on right to showcase imagery */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#222831]/95 via-[#222831]/75 sm:via-[#222831]/60 to-[#222831]/30" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#222831] via-transparent to-transparent opacity-80 sm:opacity-50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          {/* Animated Slide Content */}
          <div key={currentSlide.id} className="animate-fade-in-up">
            {/* Thematic Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-white uppercase mb-5 backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#126B3A]" />
              {lang === "pt" ? currentSlide.badgePt : currentSlide.badgeEn}
            </span>

            {/* Title */}
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-[46px] xl:text-[50px] leading-[1.12] drop-shadow-sm min-h-[70px] sm:min-h-[100px] flex items-center">
              {lang === "pt" ? currentSlide.titlePt : currentSlide.titleEn}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-200 max-w-2xl min-h-[60px] sm:min-h-[72px]">
              {lang === "pt" ? currentSlide.subtitlePt : currentSlide.subtitleEn}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <Link
                href={resolveCtaLink(currentSlide.ctaLink)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#126B3A] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#0D502B] hover:-translate-y-0.5 transition-all"
              >
                <span>
                  {lang === "pt"
                    ? currentSlide.ctaPrimaryPt
                    : currentSlide.ctaPrimaryEn}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={routes.contact}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <span>{ctaSecondaryText}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls: Slide Indicators + Prev/Next Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          {/* Slide Indicator Pills */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`group relative h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 sm:w-10 bg-[#126B3A]"
                      : "w-2.5 sm:w-3 bg-white/35 hover:bg-white/70"
                  }`}
                  aria-label={`Ir para banner ${idx + 1}`}
                >
                  <span className="sr-only">Slide {idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows & Play/Pause */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-white/80 mr-2">
              0{currentIdx + 1} / 0{HERO_SLIDES.length}
            </span>

            <button
              type="button"
              onClick={prevSlide}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 hover:text-white hover:bg-white/25 transition-all cursor-pointer ml-1"
              title={isPlaying ? "Pausar rotação" : "Iniciar rotação"}
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Institutional Pillars Bar */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {heroPillars.map((p) => (
            <div
              key={p.title}
              className="rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-xs hover:bg-white/10 transition-colors"
            >
              <p className="text-sm font-bold text-white">{p.title}</p>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
