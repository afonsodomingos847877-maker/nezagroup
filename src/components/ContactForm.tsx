"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { Lang } from "@/lib/routes";

export function ContactForm({ lang }: { lang: Lang }) {
  const t = getDict(lang).contact;
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("servico") || searchParams.get("service");

  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    service: t.serviceOptions[0] as string,
    message: "",
    honeypot: "",
  });

  useEffect(() => {
    if (requestedService) {
      const match = (t.serviceOptions as readonly string[]).find((opt) =>
        opt.toLowerCase().includes(requestedService.toLowerCase())
      );
      if (match) {
        setForm((prev) => ({ ...prev, service: match }));
      }
    }
  }, [requestedService, t.serviceOptions]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || t.errorGeneric);
        return;
      }
      setStatus("success");
      setForm({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        subject: "",
        service: t.serviceOptions[0] as string,
        message: "",
        honeypot: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg(t.errorGeneric);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "success" && (
        <div className="rounded-lg border border-[#126B3A]/30 bg-[#126B3A]/10 p-4 flex items-start gap-3 text-[#222831]">
          <CheckCircle2 className="h-5 w-5 text-[#126B3A] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">{t.successTitle}</p>
            <p className="text-xs mt-1">{t.successDesc}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3 text-red-900">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.fullName} *
          </label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.company}
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.email} *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.phone}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.country}
          </label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#222831] mb-1.5">
            {t.fields.service}
          </label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
          >
            {t.serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#222831] mb-1.5">
          {t.fields.subject} *
        </label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#222831] mb-1.5">
          {t.fields.message} *
        </label>
        <textarea
          rows={5}
          required
          minLength={10}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none focus:ring-1 focus:ring-[#126B3A]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#126B3A] px-7 py-3 text-sm font-bold tracking-wide text-white shadow-sm hover:bg-[#0D502B] disabled:opacity-60 transition-colors cursor-pointer"
      >
        <Send className="h-4 w-4" />
        <span>{status === "loading" ? t.submitting : t.submitBtn}</span>
      </button>
    </form>
  );
}
