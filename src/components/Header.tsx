"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { getSwitchLangUrl, Lang, ROUTE_MAP } from "@/lib/routes";

export function Header({ lang }: { lang: Lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = getDict(lang);
  const routes = ROUTE_MAP[lang];
  const otherLang: Lang = lang === "pt" ? "en" : "pt";
  const switchUrl = getSwitchLangUrl(pathname || routes.home, otherLang);

  const navLinks = [
    { label: t.nav.home, href: routes.home },
    { label: t.nav.about, href: routes.about },
    { label: t.nav.business, href: routes.business },
    { label: t.nav.projects, href: routes.projects },
    { label: t.nav.products, href: routes.products },
    { label: t.nav.leadership, href: routes.leadership },
    { label: t.nav.partners, href: routes.partners },
    { label: t.nav.contact, href: routes.contact },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== routes.home && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Institutional Bar (Desktop) */}
      <div className="hidden lg:block bg-[#222831] text-slate-300 text-[11px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-white/70" />
              <span>Rovuma Business Centre, Maputo, Moçambique</span>
            </span>
            <a href="tel:+258863280431" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3 text-white/70" />
              <span>+258 86 328 0431</span>
            </a>
            <a href="mailto:adolfo@neza.co.mz" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3 text-white/70" />
              <span>adolfo@neza.co.mz</span>
            </a>
          </div>
          <span className="font-semibold tracking-widest text-white/80 uppercase">
            {t.motto}
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href={routes.home} className="flex items-center gap-3 shrink-0 group">
          <img
            src="/images/brand/neza-logo.jpg"
            alt="NEZA GROUP Logo"
            className="h-10 w-10 sm:h-11 sm:w-11 rounded object-contain transition-transform group-hover:scale-105"
          />
          <div className="leading-tight">
            <span className="block text-base sm:text-lg font-extrabold tracking-tight text-[#26368C]">
              NEZA <span className="text-[#126B3A]">GROUP</span>
            </span>
            <span className="block text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
              Moving Forward
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap ${
                isActive(item.href)
                  ? "bg-[#126B3A]/10 text-[#126B3A] font-semibold"
                  : "text-[#222831] hover:bg-slate-100 hover:text-[#126B3A]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          <Link
            href={switchUrl}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#222831] hover:border-[#26368C] hover:text-[#26368C] transition-colors"
            title={otherLang === "en" ? "Switch to English" : "Mudar para Português"}
          >
            <Globe className="h-3.5 w-3.5 text-[#126B3A]" />
            <span>{lang.toUpperCase()}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">{otherLang.toUpperCase()}</span>
          </Link>

          <Link
            href={routes.contact}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#126B3A] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0D502B] transition-all"
          >
            <span>{t.nav.requestProposal}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <Link
            href={switchUrl}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-[#222831]"
          >
            <Globe className="h-3.5 w-3.5 text-[#126B3A]" />
            <span>{otherLang.toUpperCase()}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-[#222831] hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1.5 max-h-[80vh] overflow-y-auto shadow-lg">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-[#126B3A]/10 text-[#126B3A] font-semibold"
                  : "text-[#222831] hover:bg-[#F4F6F5]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={routes.localContent}
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#222831] hover:bg-[#F4F6F5]"
          >
            {t.nav.localContent}
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href={routes.contact}
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#126B3A] px-4 py-3 text-sm font-bold text-white shadow-sm"
            >
              <span>{t.nav.requestProposal}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
