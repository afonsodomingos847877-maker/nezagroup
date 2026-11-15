import React, { Suspense } from "react";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";
import { ContactForm } from "@/components/ContactForm";

export function ContactView({ lang }: { lang: Lang }) {
  const t = getDict(lang).contact;

  return (
    <div>
      <section className="bg-[#222831] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/75">
            NEZA GROUP
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">{t.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">{t.pageSubtitle}</p>
        </div>
      </section>

      <section className="bg-[#F4F6F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#26368C]">{t.hqTitle}</h2>
                <p className="mt-1 text-sm font-semibold text-[#126B3A] flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{t.hqEntity}</span>
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#126B3A] shrink-0 mt-0.5" />
                  <span>{t.hqAddress}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#126B3A] shrink-0" />
                  <div className="space-y-1">
                    <a href="tel:+258863280431" className="block font-medium text-[#222831] hover:text-[#126B3A]">
                      {t.phoneMain}
                    </a>
                    <a href="tel:+258844334829" className="block font-medium text-[#222831] hover:text-[#126B3A]">
                      {t.phoneAlt}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#126B3A] shrink-0" />
                  <a href={`mailto:${t.email}`} className="font-medium text-[#26368C] hover:underline">
                    {t.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Real Functional Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
              <h2 className="text-xl font-bold text-[#222831] mb-6">{t.formTitle}</h2>
              <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-[#F4F6F5]" />}>
                <ContactForm lang={lang} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
