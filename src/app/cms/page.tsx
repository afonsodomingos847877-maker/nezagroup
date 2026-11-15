"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Save, Plus, Trash2, ArrowLeft, CheckCircle2, Mail, Code2, Edit3 } from "lucide-react";

type CollectionKey =
  | "projects"
  | "services"
  | "products"
  | "leadership"
  | "partners"
  | "news"
  | "messages";

const TABS: { key: CollectionKey; label: string }[] = [
  { key: "messages", label: "Mensagens Recebidas" },
  { key: "projects", label: "Projectos" },
  { key: "services", label: "Clusters / Serviços" },
  { key: "products", label: "Produtos e Tecnologia" },
  { key: "leadership", label: "Liderança" },
  { key: "partners", label: "Clientes e Parceiros" },
  { key: "news", label: "Notícias e Comunicados" },
];

const FIELD_LABELS: Record<string, string> = {
  titlePt: "Título (PT)",
  titleEn: "Título (EN)",
  namePt: "Nome (PT)",
  nameEn: "Nome (EN)",
  name: "Nome",
  rolePt: "Cargo (PT)",
  roleEn: "Cargo (EN)",
  location: "Localização",
  client: "Cliente",
  duration: "Duração",
  value: "Valor Contratual",
  date: "Data",
  summaryPt: "Resumo (PT)",
  summaryEn: "Resumo (EN)",
  scopePt: "Escopo (PT)",
  scopeEn: "Escopo (EN)",
  descPt: "Descrição (PT)",
  descEn: "Descrição (EN)",
  shortDescPt: "Descrição Curta (PT)",
  shortDescEn: "Descrição Curta (EN)",
  bioPt: "Biografia (PT)",
  bioEn: "Biografia (EN)",
  experiencePt: "Experiência (PT)",
  experienceEn: "Experiência (EN)",
  educationPt: "Formação (PT)",
  educationEn: "Formação (EN)",
  image: "Caminho da Imagem",
};

export default function CmsPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<CollectionKey>("messages");
  const [rawJson, setRawJson] = useState("");
  const [parsedItems, setParsedItems] = useState<unknown>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [jsonMode, setJsonMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");

  async function loadCollection(col: CollectionKey, pwd = password) {
    setLoading(true);
    setSavedNotice("");
    setSelectedIndex(0);
    try {
      const res = await fetch(`/api/cms?collection=${col}`, {
        headers: { "x-cms-password": pwd },
      });
      if (!res.ok) {
        setAuthError("Palavra-passe inválida.");
        setAuthed(false);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setAuthed(true);
      setAuthError("");
      setParsedItems(json.data);
      setRawJson(JSON.stringify(json.data, null, 2));
    } catch {
      setAuthError("Erro ao ligar ao servidor CMS.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loadCollection(activeTab, password);
  }

  async function handleTabChange(col: CollectionKey) {
    setActiveTab(col);
    await loadCollection(col);
  }

  async function handleSaveData(dataToSave: unknown) {
    setLoading(true);
    setSavedNotice("");
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cms-password": password,
        },
        body: JSON.stringify({ collection: activeTab, data: dataToSave }),
      });
      if (res.ok) {
        setParsedItems(dataToSave);
        setRawJson(JSON.stringify(dataToSave, null, 2));
        setSavedNotice("Alterações guardadas e publicadas com sucesso!");
      }
    } finally {
      setLoading(false);
    }
  }

  function addItem() {
    if (!Array.isArray(parsedItems)) return;
    let newItem: Record<string, unknown> = { id: `item-${Date.now()}` };
    if (activeTab === "news") {
      newItem = {
        id: `news-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        titlePt: "Novo Comunicado Institucional",
        titleEn: "New Institutional Release",
        summaryPt: "Resumo do comunicado em português.",
        summaryEn: "Release summary in English.",
      };
    } else if (activeTab === "projects") {
      newItem = {
        id: `proj-${Date.now()}`,
        titlePt: "Novo Projecto",
        titleEn: "New Project",
        location: "Moçambique",
        sector: "energia",
        sectorLabelPt: "Energia",
        sectorLabelEn: "Energy",
        client: "Pendente de confirmação",
        duration: "Pendente de confirmação",
        value: "Pendente de confirmação",
        responsibilityType: "direct",
        responsibilityPt: "Execução Directa",
        responsibilityEn: "Direct Execution",
        scopePt: "Descrição do escopo do projecto.",
        scopeEn: "Project scope description.",
        images: ["/images/hero/industrial-plant.png"],
        featured: false,
      };
    } else if (activeTab === "products") {
      newItem = {
        id: `prod-${Date.now()}`,
        category: "industrial",
        namePt: "Novo Produto",
        nameEn: "New Product",
        descPt: "Descrição em português.",
        descEn: "Description in English.",
        appPt: "Aplicação industrial.",
        appEn: "Industrial application.",
        image: "/images/products/electrical-panels-banner.png",
      };
    }
    const updated = [newItem, ...parsedItems];
    setParsedItems(updated);
    setRawJson(JSON.stringify(updated, null, 2));
    setSelectedIndex(0);
  }

  function updateField(index: number, field: string, value: string) {
    if (!Array.isArray(parsedItems)) return;
    const updated = parsedItems.map((item, idx) =>
      idx === index ? { ...(item as Record<string, unknown>), [field]: value } : item
    );
    setParsedItems(updated);
    setRawJson(JSON.stringify(updated, null, 2));
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/brand/neza-logo.jpg"
              alt="NEZA GROUP"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-[#26368C]">NEZA GROUP CMS</h1>
              <p className="text-xs text-slate-500">Gestão de Conteúdos Institucionais</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1.5">
                Palavra-passe de Acesso
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-[#126B3A] focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Predefinição local: <code>neza2026</code> (configurável via <code>CMS_ADMIN_PASSWORD</code>).
              </p>
            </div>

            {authError && (
              <p className="text-xs font-semibold text-red-600">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-[#126B3A] py-2.5 text-sm font-bold text-white hover:bg-[#0D502B] transition-colors"
            >
              Entrar no Painel CMS
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link href="/pt" className="text-xs font-semibold text-[#26368C] hover:underline">
              ← Voltar ao Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeItem =
    Array.isArray(parsedItems) && parsedItems[selectedIndex]
      ? (parsedItems[selectedIndex] as Record<string, unknown>)
      : null;

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <header className="bg-[#222831] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-base">NEZA GROUP — CMS</span>
          <span className="rounded bg-[#126B3A] px-2 py-0.5 text-[11px] font-semibold">
            Activo
          </span>
        </div>
        <Link
          href="/pt"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Ver Website</span>
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`rounded-md px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === tab.key
                  ? "bg-[#26368C] text-white"
                  : "bg-white text-[#222831] border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {savedNotice && (
          <div className="mb-4 rounded-lg border border-[#126B3A]/30 bg-[#126B3A]/10 p-3 text-xs font-semibold text-[#126B3A] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Messages View */}
        {activeTab === "messages" && Array.isArray(parsedItems) && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#222831] flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#126B3A]" />
              <span>Solicitações e Mensagens de Contacto ({parsedItems.length})</span>
            </h2>
            {parsedItems.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                Ainda não existem mensagens submetidas através do formulário de contacto.
              </div>
            ) : (
              <div className="space-y-3">
                {parsedItems.map((m: Record<string, unknown>) => (
                  <div
                    key={String(m.id)}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-[#26368C]">{String(m.subject)}</h3>
                      <span className="text-xs text-slate-500">
                        {new Date(String(m.createdAt)).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      <strong>{String(m.fullName)}</strong> ({String(m.company || "-")}) •{" "}
                      {String(m.email)} • {String(m.phone || "-")} • {String(m.country || "-")}
                    </p>
                    <p className="text-xs font-semibold text-[#126B3A] mb-2">
                      Serviço: {String(m.service)}
                    </p>
                    <p className="text-sm text-[#222831] bg-[#F4F6F5] rounded p-3">
                      {String(m.message)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visual + JSON Editor */}
        {activeTab !== "messages" && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#222831]">
                  {TABS.find((t) => t.key === activeTab)?.label}
                </h2>
                <p className="text-xs text-slate-500">
                  Seleccione um item para editar os seus textos ou adicione um novo registo.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(activeTab === "news" || activeTab === "projects" || activeTab === "products") && (
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#26368C] px-3 py-2 text-xs font-bold text-[#26368C] hover:bg-[#26368C]/5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Adicionar Novo</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setJsonMode(!jsonMode)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-[#222831] hover:bg-slate-50"
                >
                  {jsonMode ? <Edit3 className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
                  <span>{jsonMode ? "Editor Visual" : "Modo JSON"}</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    try {
                      const data = jsonMode ? JSON.parse(rawJson) : parsedItems;
                      handleSaveData(data);
                    } catch {
                      alert("JSON inválido. Verifique a sintaxe antes de guardar.");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#126B3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#0D502B]"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{loading ? "A guardar..." : "Guardar Alterações"}</span>
                </button>
              </div>
            </div>

            {!jsonMode && Array.isArray(parsedItems) ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Item list */}
                <div className="lg:col-span-4 space-y-2">
                  {parsedItems.map((item: Record<string, unknown>, idx: number) => (
                    <div
                      key={String(item.id || idx)}
                      onClick={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs cursor-pointer border transition-colors ${
                        selectedIndex === idx
                          ? "border-[#26368C] bg-[#26368C]/5 font-bold text-[#26368C]"
                          : "border-slate-200 bg-[#F4F6F5] text-[#222831] hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate pr-2">
                        {String(item.titlePt || item.namePt || item.name || item.id)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updated = parsedItems.filter((_, i) => i !== idx);
                          setParsedItems(updated);
                          setRawJson(JSON.stringify(updated, null, 2));
                          setSelectedIndex(0);
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 shrink-0"
                        title="Remover item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Visual Form Fields */}
                <div className="lg:col-span-8 space-y-4">
                  {activeItem &&
                    Object.entries(activeItem).map(([key, val]) => {
                      if (typeof val !== "string" || key === "id") return null;
                      const isLong = val.length > 80 || key.includes("scope") || key.includes("desc") || key.includes("bio") || key.includes("summary") || key.includes("experience");
                      return (
                        <div key={key}>
                          <label className="block text-xs font-semibold text-[#222831] mb-1">
                            {FIELD_LABELS[key] || key}
                          </label>
                          {isLong ? (
                            <textarea
                              rows={3}
                              value={val}
                              onChange={(e) => updateField(selectedIndex, key, e.target.value)}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#126B3A] focus:outline-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => updateField(selectedIndex, key, e.target.value)}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#126B3A] focus:outline-none"
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <textarea
                rows={20}
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-[#222831] focus:border-[#126B3A] focus:outline-none"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
