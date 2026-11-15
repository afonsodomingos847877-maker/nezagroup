import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Settings } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const routes = ROUTE_MAP[lang];

  return (
    <footer className="bg-[#222831] text-slate-300 border-t-4 border-[#126B3A]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded bg-white p-1">
                <img
                  src="/images/brand/neza-logo.jpg"
                  alt="NEZA GROUP"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-white tracking-tight">NEZA GROUP</p>
                <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
                  {t.motto}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{t.footer.aboutText}</p>
            <p className="text-xs font-semibold tracking-wide text-slate-300 uppercase pt-1">
              {t.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={routes.about} className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href={routes.business} className="hover:text-white transition-colors">{t.nav.business}</Link></li>
              <li><Link href={routes.projects} className="hover:text-white transition-colors">{t.nav.projects}</Link></li>
              <li><Link href={routes.products} className="hover:text-white transition-colors">{t.nav.products}</Link></li>
              <li><Link href={routes.leadership} className="hover:text-white transition-colors">{t.nav.leadership}</Link></li>
              <li><Link href={routes.partners} className="hover:text-white transition-colors">{t.nav.partners}</Link></li>
              <li><Link href={routes.localContent} className="hover:text-white transition-colors">{t.nav.localContent}</Link></li>
            </ul>
          </div>

          {/* Clusters */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.clusters}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`${routes.business}#design-engenharia`} className="hover:text-white transition-colors">
                  {lang === "pt" ? "01. Design e Engenharia" : "01. Design & Engineering"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#construcao-materiais`} className="hover:text-white transition-colors">
                  {lang === "pt" ? "02. Construção e Materiais" : "02. Construction & Materials"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#operacoes-manutencao`} className="hover:text-white transition-colors">
                  {lang === "pt" ? "03. Operações e Manutenção" : "03. Operations & Maintenance"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#tecnologia-servicos`} className="hover:text-white transition-colors">
                  {lang === "pt" ? "04. Tecnologia e Serviços" : "04. Technology & Services"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#investimentos-concessoes`} className="hover:text-white transition-colors">
                  {lang === "pt" ? "05. Investimentos e Concessões" : "05. Investments & Concessions"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white/75 shrink-0 mt-0.5" />
                <span>{t.contact.hqAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-white/75 shrink-0" />
                <a href="tel:+258863280431" className="hover:text-white">+258 86 328 0431</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-white/75 shrink-0" />
                <a href="tel:+258844334829" className="hover:text-white">+258 84 433 4829</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-white/75 shrink-0" />
                <a href="mailto:adolfo@neza.co.mz" className="hover:text-white">adolfo@neza.co.mz</a>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-700/80">
              <Link
                href="/cms"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>{t.footer.cmsLink}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} NEZA GROUP (NEZA Electromecânica e Instalação, Lda). {t.footer.rights}
          </p>
          <p className="text-slate-400 font-medium">Maputo, Mozambique</p>
        </div>
      </div>
    </footer>
  );
}

