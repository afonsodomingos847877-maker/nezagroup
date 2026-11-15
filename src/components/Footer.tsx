import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Settings } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang, ROUTE_MAP } from "@/lib/routes";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const routes = ROUTE_MAP[lang];

  return (
    <footer className="bg-white text-[#222831] border-t-4 border-[#126B3A]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/brand/neza-logo.jpg"
                alt="NEZA GROUP"
                className="h-11 w-11 rounded object-contain"
              />
              <div>
                <p className="text-lg font-black text-[#222831] tracking-tight">
                  NEZA <span className="text-[#126B3A]">GROUP</span>
                </p>
                <p className="text-[11px] font-bold tracking-widest text-[#126B3A] uppercase">
                  {t.motto}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{t.footer.aboutText}</p>
            <p className="text-xs font-bold tracking-wide text-[#222831] uppercase pt-1">
              {t.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#222831] mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><Link href={routes.about} className="hover:text-[#126B3A] transition-colors">{t.nav.about}</Link></li>
              <li><Link href={routes.business} className="hover:text-[#126B3A] transition-colors">{t.nav.business}</Link></li>
              <li><Link href={routes.projects} className="hover:text-[#126B3A] transition-colors">{t.nav.projects}</Link></li>
              <li><Link href={routes.products} className="hover:text-[#126B3A] transition-colors">{t.nav.products}</Link></li>
              <li><Link href={routes.leadership} className="hover:text-[#126B3A] transition-colors">{t.nav.leadership}</Link></li>
              <li><Link href={routes.partners} className="hover:text-[#126B3A] transition-colors">{t.nav.partners}</Link></li>
              <li><Link href={routes.localContent} className="hover:text-[#126B3A] transition-colors">{t.nav.localContent}</Link></li>
            </ul>
          </div>

          {/* Clusters */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#222831] mb-4">
              {t.footer.clusters}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href={`${routes.business}#design-engenharia`} className="hover:text-[#126B3A] transition-colors">
                  {lang === "pt" ? "01. Design e Engenharia" : "01. Design & Engineering"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#construcao-materiais`} className="hover:text-[#126B3A] transition-colors">
                  {lang === "pt" ? "02. Construção e Materiais" : "02. Construction & Materials"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#operacoes-manutencao`} className="hover:text-[#126B3A] transition-colors">
                  {lang === "pt" ? "03. Operações e Manutenção" : "03. Operations & Maintenance"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#tecnologia-servicos`} className="hover:text-[#126B3A] transition-colors">
                  {lang === "pt" ? "04. Tecnologia e Serviços" : "04. Technology & Services"}
                </Link>
              </li>
              <li>
                <Link href={`${routes.business}#investimentos-concessoes`} className="hover:text-[#126B3A] transition-colors">
                  {lang === "pt" ? "05. Investimentos e Concessões" : "05. Investments & Concessions"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#222831] mb-4">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#126B3A] shrink-0 mt-0.5" />
                <span>{t.contact.hqAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#126B3A] shrink-0" />
                <a href="tel:+258863280431" className="hover:text-[#126B3A]">+258 86 328 0431</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#126B3A] shrink-0" />
                <a href="tel:+258844334829" className="hover:text-[#126B3A]">+258 84 433 4829</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#126B3A] shrink-0" />
                <a href="mailto:adolfo@neza.co.mz" className="hover:text-[#126B3A]">adolfo@neza.co.mz</a>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-200">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#126B3A] transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>{t.footer.cmsLink}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} NEZA GROUP (NEZA Electromecânica e Instalação, Lda). {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://muv.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#126B3A] transition-colors"
            >
              <span>Powered by</span>
              <img
                src="/logo_muv.png"
                alt="MUV"
                className="h-4 w-auto object-contain"
              />
            </a>
            <span className="text-slate-300">•</span>
            <p>
              Designed by{" "}
              <a
                href="https://www.linkedin.com/in/afonso-domingos-6b59361a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#222831] hover:text-[#126B3A] transition-colors"
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
