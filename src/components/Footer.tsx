import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowUpRight, ShieldCheck, Settings } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const routes = ROUTE_MAP[lang];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#126B3A] via-[#0E542D] to-[#1B2766] text-white">
      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {/* Main 4-column layout inspired by Image 1 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "pt" ? "NEZA GROUP" : "NEZA GROUP"}
            </h3>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-1.5 shadow-sm shrink-0">
                <img
                  src="/images/brand/neza-logo.jpg"
                  alt="NEZA GROUP"
                  className="h-10 w-10 rounded object-contain"
                />
              </div>
              <div className="leading-tight">
                <p className="text-base font-black tracking-tight text-white">
                  NEZA <span className="text-emerald-300">GROUP</span>
                </p>
                <p className="text-[10px] font-bold tracking-widest text-emerald-200 uppercase">
                  {t.motto}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-200">
              {t.footer.aboutText}
            </p>

            <p className="text-[11px] font-semibold text-white/90 uppercase tracking-wide pt-1">
              {t.tagline}
            </p>
          </div>

          {/* Column 2: HEAD OFFICE (SEDE) */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "pt" ? "SEDE PRINCIPAL (HEAD OFFICE)" : "HEAD OFFICE"}
            </h3>

            <div className="space-y-2 text-xs leading-relaxed text-slate-200">
              <p className="font-semibold text-white">
                Nexo Business Center
              </p>
              <p>Av. 24 de Julho, Polana Cimento</p>
              <p>NR. 1001, porta 12 e 13</p>
              <p className="font-semibold text-emerald-200">
                Maputo — Moçambique
              </p>

              <div className="pt-2 space-y-1.5 border-t border-white/15">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                  <a href="tel:+258863280431" className="hover:text-emerald-300 transition-colors">
                    +258 86 328 0431
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                  <a href="tel:+258844334829" className="hover:text-emerald-300 transition-colors">
                    +258 84 433 4829
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                  <a href="mailto:adolfo@neza.co.mz" className="hover:text-emerald-300 transition-colors font-medium">
                    adolfo@neza.co.mz
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: REGIONAL FOOTPRINT / OPERAÇÕES */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "pt" ? "OPERAÇÕES REGIONAIS" : "REGIONAL FOOTPRINT"}
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-200">
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                  {lang === "pt" ? "Moçambique (Províncias)" : "Mozambique (Provinces)"}
                </p>
                <p className="mt-0.5 text-slate-200">
                  Maputo • Gaza • Inhambane • Sofala • Tete • Cabo Delgado
                </p>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                  {lang === "pt" ? "África Austral & SADC" : "Southern Africa & SADC"}
                </p>
                <p className="mt-0.5 text-slate-200">
                  {lang === "pt"
                    ? "Centrais solares, centrais a gás, subestações e manutenção electromecânica regional."
                    : "Utility-scale solar, gas plants, substations & regional electromechanical maintenance."}
                </p>
              </div>

              <div className="pt-2 border-t border-white/15">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {lang === "pt" ? "Conteúdo Local Moçambicano" : "Mozambican Local Content"}
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: QUICK ACCESS & CLUSTERS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === "pt" ? "LINKS RÁPIDOS" : "QUICK ACCESS"}
            </h3>

            <ul className="space-y-2 text-xs text-slate-200">
              <li>
                <Link
                  href={routes.about}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.about}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href={routes.business}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.business} (5 Clusters)</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href={routes.projects}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.projects}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href={routes.products}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.products}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href={routes.localContent}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.localContent}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href={routes.contact}
                  className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                >
                  <span>{t.nav.contact}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/15">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>{t.footer.cmsLink}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Powered by MUV, Designed by Afonso Domingos */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-200">
          <p>
            © {new Date().getFullYear()} NEZA GROUP (NEZA Electromecânica e Instalação, Lda). {t.footer.rights}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://muv.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-slate-200 hover:bg-white hover:text-[#126B3A] transition-all"
            >
              <span>Powered by</span>
              <img
                src="/logo_muv.png"
                alt="MUV"
                className="h-3.5 w-auto object-contain brightness-0 invert hover:brightness-100"
              />
            </a>

            <span className="text-white/40">•</span>

            <p>
              Designed by{" "}
              <a
                href="https://www.linkedin.com/in/afonso-domingos-6b59361a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline hover:text-emerald-300 transition-colors"
              >
                Afonso Domingos
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
