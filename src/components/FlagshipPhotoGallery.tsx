"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Lang } from "@/lib/routes";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Tag,
  Briefcase,
  Layers,
} from "lucide-react";

export interface GalleryItem {
  id: string;
  category: "all" | "energy" | "solar" | "roads" | "panels" | "tech";
  titlePt: string;
  titleEn: string;
  categoryLabelPt: string;
  categoryLabelEn: string;
  locationPt: string;
  locationEn: string;
  image: string;
  client?: string;
  descPt: string;
  descEn: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "energy",
    titlePt: "Central Eléctrica a Gás Green Field EPC (40,29 MW)",
    titleEn: "Green Field EPC Gas Power Plant (40.29 MW)",
    categoryLabelPt: "Centrais & Energia a Gás",
    categoryLabelEn: "Power & Gas Plants",
    locationPt: "Chókwè, Moçambique",
    locationEn: "Chókwè, Mozambique",
    image: "/images/hero/industrial-plant.png",
    client: "Governo de Moçambique / EDM",
    descPt:
      "Central termoeléctrica a gás em ciclo simples, turbinas e subestação de alta capacidade conectadas à rede eléctrica nacional.",
    descEn:
      "Simple-cycle gas turbine power plant and high-capacity substation connected to the national electrical grid.",
  },
  {
    id: "gal-2",
    category: "energy",
    titlePt: "Central Térmica e Motores de Geração Saldanha Bay",
    titleEn: "Saldanha Bay Thermal Power Plant & Generation Engines",
    categoryLabelPt: "Centrais & Energia a Gás",
    categoryLabelEn: "Power & Gas Plants",
    locationPt: "Saldanha Bay, África Austral",
    locationEn: "Saldanha Bay, Southern Africa",
    image: "/images/projects/saldanha-plant.jpg",
    client: "Operador Regional",
    descPt:
      "Engenharia electromecânica, montagem e comissionamento de motores térmicos e geradores industriais.",
    descEn:
      "Electromechanical engineering, assembly and commissioning of thermal power engines and industrial generators.",
  },
  {
    id: "gal-3",
    category: "energy",
    titlePt: "Subestação de Média e Alta Tensão de Chókwè",
    titleEn: "Chókwè Medium & High Voltage Substation",
    categoryLabelPt: "Centrais & Energia a Gás",
    categoryLabelEn: "Power & Gas Plants",
    locationPt: "Chókwè, Moçambique",
    locationEn: "Chókwè, Mozambique",
    image: "/images/projects/chokwe-substation.jpg",
    client: "EDM / Consórcio de Energia",
    descPt:
      "Transformadores elevadores de tensão, barramentos, protecções digitais e linhas de interligação.",
    descEn:
      "Step-up power transformers, busbars, digital relays and high-voltage grid interconnection lines.",
  },
  {
    id: "gal-4",
    category: "solar",
    titlePt: "Central Solar Fotovoltaica Letsatsi (75 MW)",
    titleEn: "Letsatsi Solar PV Power Plant (75 MW)",
    categoryLabelPt: "Solar & Renováveis",
    categoryLabelEn: "Solar & Renewables",
    locationPt: "Bloemfontein, África Austral",
    locationEn: "Bloemfontein, Southern Africa",
    image: "/images/projects/chokwe-aerial.jpg",
    client: "Produtor Independente de Energia (IPP)",
    descPt:
      "Parque solar fotovoltaico de grande escala com milhares de módulos monocristalinos e estações de inversão.",
    descEn:
      "Large-scale utility solar PV plant with tracking modules and multi-megawatt inverter stations.",
  },
  {
    id: "gal-5",
    category: "solar",
    titlePt: "Central Solar Fotovoltaica Pulida (82,5 MWp)",
    titleEn: "Pulida Solar PV Power Plant (82.5 MWp)",
    categoryLabelPt: "Solar & Renováveis",
    categoryLabelEn: "Solar & Renewables",
    locationPt: "Kimberley, África Austral",
    locationEn: "Kimberley, Southern Africa",
    image: "/images/projects/saldanha-civil.jpg",
    client: "Group Five / Consórcio Solar",
    descPt:
      "Subcontratação especializada para instalação mecânica, cablagem de alta tensão e testes de comissionamento.",
    descEn:
      "Specialised subcontracting for tracker mounting, high-voltage cabling and grid synchronization testing.",
  },
  {
    id: "gal-6",
    category: "solar",
    titlePt: "Linhas de Evacuação e Infraestrutura Solar",
    titleEn: "Evacuation Lines & Solar Infrastructure",
    categoryLabelPt: "Solar & Renováveis",
    categoryLabelEn: "Solar & Renewables",
    locationPt: "Moçambique / Região Austral",
    locationEn: "Mozambique / Regional",
    image: "/images/hero/pipeline-hill.png",
    client: "Projectos Regionais de Energia",
    descPt:
      "Construção de linhas de transmissão e infraestruturas técnicas para evacuação de energias limpas.",
    descEn:
      "Construction of transmission lines and civil engineering for clean energy distribution.",
  },
  {
    id: "gal-7",
    category: "roads",
    titlePt: "Ponte Maputo-Katembe e Estradas de Ligação",
    titleEn: "Maputo-Katembe Bridge & Connecting Roads",
    categoryLabelPt: "Pontes & Estradas",
    categoryLabelEn: "Bridges & Roads",
    locationPt: "Maputo, Moçambique",
    locationEn: "Maputo, Mozambique",
    image: "/images/projects/katembe-bridge.png",
    client: "Governo de Moçambique / ANE / REVIMO",
    descPt:
      "A maior ponte suspensa do continente africano, marcando um marco histórico nas infraestruturas de transporte.",
    descEn:
      "The longest suspension bridge in Africa, marking a historic milestone in national road infrastructure.",
  },
  {
    id: "gal-8",
    category: "roads",
    titlePt: "Montagem do Tabuleiro e Cabos de Suspensão da Ponte",
    titleEn: "Bridge Deck Assembly & Suspension Cables",
    categoryLabelPt: "Pontes & Estradas",
    categoryLabelEn: "Bridges & Roads",
    locationPt: "Baía de Maputo, Moçambique",
    locationEn: "Maputo Bay, Mozambique",
    image: "/images/projects/katembe-deck.png",
    client: "Consórcio Internacional de Construção",
    descPt:
      "Engenharia estrutural pesada, montagem mecânica de aduelas metálicas e tensionamento de cabos mestres.",
    descEn:
      "Heavy structural engineering, steel deck modular erection and high-tensile main cable tensioning.",
  },
  {
    id: "gal-9",
    category: "roads",
    titlePt: "Sistemas Electrónicos de Portagem e Controlo de Tráfego",
    titleEn: "Electronic Toll Collection & Traffic Management",
    categoryLabelPt: "Pontes & Estradas",
    categoryLabelEn: "Bridges & Roads",
    locationPt: "Moçambique (Corredores Rodoviários)",
    locationEn: "Mozambique (Road Corridors)",
    image: "/images/projects/toll-plaza-1.png",
    client: "REVIMO / ANE",
    descPt:
      "Automação de praças de portagem, barreiras automáticas, pesagem dinâmica de eixos e tele-portagens RFID.",
    descEn:
      "Toll plaza automation, rapid optical barriers, dynamic weigh-in-motion and RFID electronic toll collection.",
  },
  {
    id: "gal-10",
    category: "roads",
    titlePt: "Obras Rodoviárias e Pavimentação Asfáltica",
    titleEn: "Road Construction & Asphalt Paving",
    categoryLabelPt: "Pontes & Estradas",
    categoryLabelEn: "Bridges & Roads",
    locationPt: "Moçambique",
    locationEn: "Mozambique",
    image: "/images/hero/road-construction.png",
    client: "Sector Público e Concessionárias",
    descPt:
      "Abertura de vias, nivelamento a laser, terraplanagem, compactação e pavimentação asfáltica de precisão.",
    descEn:
      "Earthworks, laser grading, sub-base compaction and heavy-duty asphalt wearing course paving.",
  },
  {
    id: "gal-11",
    category: "panels",
    titlePt: "Fábrica e Montagem de Painéis Eléctricos de Distribuição",
    titleEn: "Electrical Distribution Panels Manufacturing & Assembly",
    categoryLabelPt: "Painéis & Indústria",
    categoryLabelEn: "Electrical Panels & Industry",
    locationPt: "Unidade de Fabrico NEZA",
    locationEn: "NEZA Manufacturing Facility",
    image: "/images/products/electrical-panels-banner.png",
    client: "Clientes Industriais e Construtoras",
    descPt:
      "Fabrico local certificado de quadros gerais de baixa tensão (QGBT), distribuição eléctrica e barramentos de cobre.",
    descEn:
      "Certified local assembly of main low-voltage switchboards (LV), busbars and industrial distribution panels.",
  },
  {
    id: "gal-12",
    category: "panels",
    titlePt: "Centros de Controlo de Motores (MCC) e Automação",
    titleEn: "Motor Control Centers (MCC) & Automation",
    categoryLabelPt: "Painéis & Indústria",
    categoryLabelEn: "Electrical Panels & Industry",
    locationPt: "Parques Industriais e Minas",
    locationEn: "Industrial Parks & Mining",
    image: "/images/products/mcc-cabling.png",
    client: "Indústria Mineira e Agro-Processamento",
    descPt:
      "Quadros gaveta de comando de motores, arrancadores suaves, variadores de velocidade e integração SCADA.",
    descEn:
      "Draw-out motor control centers, soft starters, variable speed drives and SCADA process integration.",
  },
  {
    id: "gal-13",
    category: "panels",
    titlePt: "Bancadas de Ensaio e Cablagem de Precisão",
    titleEn: "Testing Benches & Precision Panel Cabling",
    categoryLabelPt: "Painéis & Indústria",
    categoryLabelEn: "Electrical Panels & Industry",
    locationPt: "Oficinas Electromecânicas NEZA",
    locationEn: "NEZA Electromechanical Workshops",
    image: "/images/products/panel-technician.png",
    client: "Controlo de Qualidade Interno",
    descPt:
      "Testes dieléctricos, ensaios de continuidade, rotulagem industrial e conformidade com normas IEC 61439.",
    descEn:
      "Dielectric insulation tests, continuity verification, industrial labeling and full IEC 61439 compliance.",
  },
  {
    id: "gal-14",
    category: "tech",
    titlePt: "Sistemas de Vigilância e Câmaras CFTV para Infraestruturas",
    titleEn: "CCTV Surveillance Systems for Critical Infrastructure",
    categoryLabelPt: "Tecnologia & Segurança",
    categoryLabelEn: "Tech & Security",
    locationPt: "Centrais, Portagens e Instalações Críticas",
    locationEn: "Power Plants, Tolls & Facilities",
    image: "/images/technology/cctv-cameras.png",
    client: "Empresas Concessionárias e Industriais",
    descPt:
      "Câmaras PTZ, sensores perimetrais e transmissão por fibra óptica com gravação redundante.",
    descEn:
      "High-definition PTZ optical and thermal cameras, perimeter analytics and redundant fiber recording.",
  },
  {
    id: "gal-15",
    category: "tech",
    titlePt: "Centro de Controlo Integrado e Monitorização 24/7",
    titleEn: "Integrated Control Centre & 24/7 Monitoring",
    categoryLabelPt: "Tecnologia & Segurança",
    categoryLabelEn: "Tech & Security",
    locationPt: "Centro de Operações de Segurança",
    locationEn: "Security Operations Centre",
    image: "/images/technology/remote-monitoring.png",
    client: "Gestão Corporativa e Operacional",
    descPt:
      "Videovigilância contínua, gestão remota de alarmes, controlo de acessos biométricos e resposta a incidentes.",
    descEn:
      "Round-the-clock video surveillance wall, remote intrusion response, biometric access and incident dispatch.",
  },
];

interface FlagshipPhotoGalleryProps {
  lang: Lang;
}

export function FlagshipPhotoGallery({ lang }: FlagshipPhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const categories = [
    {
      key: "all",
      label: lang === "pt" ? "Todos os Projectos" : "All Flagship",
    },
    {
      key: "energy",
      label: lang === "pt" ? "Energia & Centrais" : "Energy & Gas",
    },
    {
      key: "solar",
      label: lang === "pt" ? "Solar & Renováveis" : "Solar PV",
    },
    {
      key: "roads",
      label: lang === "pt" ? "Pontes & Estradas" : "Bridges & Roads",
    },
    {
      key: "panels",
      label: lang === "pt" ? "Painéis & Indústria" : "Electrical Panels",
    },
    {
      key: "tech",
      label: lang === "pt" ? "Tecnologia & Segurança" : "Tech & Security",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  }, [activeModalIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  }, [activeModalIndex, filteredItems.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, handleCloseModal, handlePrev, handleNext]);

  const activePhoto =
    activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#126B3A] via-[#0E542D] to-[#1B2766] py-16 sm:py-24 text-white">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            {lang === "pt" ? "PORTEFÓLIO DOCUMENTADO" : "DOCUMENTED PORTFOLIO"}
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            FLAGSHIP PROJECTS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200">
            {lang === "pt"
              ? "Galeria fotográfica de centrais energéticas, parques solares, infraestruturas rodoviárias, fábricas de painéis e centros de controlo desenvolvidos e apoiados pela NEZA GROUP."
              : "Photographic gallery of power stations, solar parks, road infrastructures, panel assembly plants and control centers developed and supported by NEZA GROUP."}
          </p>
        </div>

        {/* Filter Bar (Inspired by Image 2) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 sm:flex-wrap mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                  isActive
                    ? "bg-white text-[#126B3A] shadow-md scale-105"
                    : "bg-black/30 text-white/90 hover:bg-white/20 hover:text-white border border-white/15"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid (3 Columns like Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(idx)}
              className="group relative overflow-hidden rounded-xl bg-black/40 shadow-lg border border-white/15 aspect-[4/3] cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={lang === "pt" ? item.titlePt : item.titleEn}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3.5 left-3.5">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#126B3A]" />
                  {lang === "pt" ? item.categoryLabelPt : item.categoryLabelEn}
                </span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white hover:bg-white hover:text-[#126B3A] transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>

              {/* Bottom Meta */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                  {lang === "pt" ? item.titlePt : item.titleEn}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === "pt" ? item.locationPt : item.locationEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-[#222831] border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#126B3A] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  {lang === "pt"
                    ? activePhoto.categoryLabelPt
                    : activePhoto.categoryLabelEn}
                </span>
                <span className="text-xs text-slate-400">
                  {(activeModalIndex ?? 0) + 1} / {filteredItems.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Photo + Details */}
            <div className="overflow-y-auto">
              <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={lang === "pt" ? activePhoto.titlePt : activePhoto.titleEn}
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                />

                {/* Prev / Next Buttons */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Photo Description & Meta */}
              <div className="p-6 space-y-3 bg-[#222831]">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {lang === "pt" ? activePhoto.titlePt : activePhoto.titleEn}
                </h3>

                <p className="text-sm leading-relaxed text-slate-300">
                  {lang === "pt" ? activePhoto.descPt : activePhoto.descEn}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#126B3A]" />
                    <span className="font-semibold text-white">
                      {lang === "pt" ? activePhoto.locationPt : activePhoto.locationEn}
                    </span>
                  </div>

                  {activePhoto.client && (
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-[#126B3A]" />
                      <span>
                        <strong className="text-white">
                          {lang === "pt" ? "Cliente/Contexto:" : "Client/Scope:"}
                        </strong>{" "}
                        {activePhoto.client}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-[#126B3A]" />
                    <span>
                      {lang === "pt"
                        ? activePhoto.categoryLabelPt
                        : activePhoto.categoryLabelEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
