"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  FolderKanban,
  Layers,
  Cpu,
  Users,
  Handshake,
  Newspaper,
  Lock,
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Edit3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

type TabKey =
  | "dashboard"
  | "messages"
  | "projects"
  | "services"
  | "products"
  | "leadership"
  | "partners"
  | "news";

const NAV_ITEMS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "dashboard", label: "Visão Geral", icon: LayoutDashboard },
  { key: "messages", label: "Mensagens", icon: Mail },
  { key: "projects", label: "Projectos", icon: FolderKanban },
  { key: "services", label: "Clusters / Serviços", icon: Layers },
  { key: "products", label: "Produtos & Tecnologia", icon: Cpu },
  { key: "leadership", label: "Liderança", icon: Users },
  { key: "partners", label: "Clientes & Parceiros", icon: Handshake },
  { key: "news", label: "Notícias & Comunicados", icon: Newspaper },
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
  sector: "Sector (código)",
  sectorLabelPt: "Sector (PT)",
  sectorLabelEn: "Sector (EN)",
  client: "Cliente",
  duration: "Duração",
  value: "Valor Contratual",
  responsibilityType: "Tipo de Responsabilidade (direct / managed / subcontract / jv)",
  responsibilityPt: "Enquadramento (PT)",
  responsibilityEn: "Enquadramento (EN)",
  date: "Data",
  summaryPt: "Resumo (PT)",
  summaryEn: "Resumo (EN)",
  scopePt: "Escopo (PT)",
  scopeEn: "Escopo (EN)",
  descPt: "Descrição (PT)",
  descEn: "Descrição (EN)",
  shortDescPt: "Descrição Curta (PT)",
  shortDescEn: "Descrição Curta (EN)",
  fullDescPt: "Descrição Completa (PT)",
  fullDescEn: "Descrição Completa (EN)",
  appPt: "Aplicação (PT)",
  appEn: "Aplicação (EN)",
  bioPt: "Biografia (PT)",
  bioEn: "Biografia (EN)",
  experiencePt: "Experiência (PT)",
  experienceEn: "Experiência (EN)",
  educationPt: "Formação (PT)",
  educationEn: "Formação (EN)",
  image: "Caminho da Imagem",
  logo: "Caminho do Logótipo",
  clusterPt: "Cluster (PT)",
  clusterEn: "Cluster (EN)",
  category: "Categoria (industrial / technology)",
};

interface SummaryStats {
  projects: number;
  services: number;
  products: number;
  leadership: number;
  clients: number;
  partners: number;
  news: number;
  messages: number;
}

export function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<Record<string, unknown>[]>([]);
  const [rawJson, setRawJson] = useState("");
  const [parsedItems, setParsedItems] = useState<unknown>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [jsonMode, setJsonMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function loadTab(tab: TabKey, userEmail = email, pwd = password) {
    setLoading(true);
    setSavedNotice("");
    setSelectedIndex(0);
    try {
      const col = tab === "dashboard" ? "summary" : tab;
      const res = await fetch(`/api/cms?collection=${col}`, {
        headers: {
          "x-cms-email": userEmail,
          "x-cms-password": pwd,
        },
      });
      if (!res.ok) {
        setAuthError("Email ou palavra-passe inválidos.");
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setAuthed(true);
      setAuthError("");
      if (tab === "dashboard") {
        setSummary(json.summary);
        setRecentMessages(json.recentMessages || []);
      } else {
        setParsedItems(json.data);
        setRawJson(JSON.stringify(json.data, null, 2));
      }
    } catch {
      setAuthError("Erro ao ligar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loadTab("dashboard", email, password);
  }

  async function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    setSidebarOpen(false);
    await loadTab(tab);
  }

  async function handleSaveData(dataToSave: unknown) {
    if (activeTab === "dashboard") return;
    setLoading(true);
    setSavedNotice("");
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cms-email": email,
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
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/brand/neza-logo.jpg"
              alt="NEZA GROUP"
              className="h-11 w-11 rounded object-contain"
            />
            <div>
              <h1 className="text-lg font-black text-[#26368C]">PAINEL ADMINISTRATIVO</h1>
              <p className="text-xs font-semibold text-[#126B3A]">NEZA GROUP • CMS & Mensagens</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1.5">
                Email de Administrador
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nezagroup.co.mz"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1.5">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:border-[#126B3A] focus:outline-none"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs font-semibold text-red-600">{authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#126B3A] py-2.5 text-sm font-bold text-white hover:bg-[#0D502B] transition-colors cursor-pointer"
            >
              {loading ? "A autenticar..." : "Aceder ao Painel"}
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
    <div className="min-h-screen bg-[#F4F6F5] flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#222831] text-white px-4 py-3 flex items-center justify-between">
        <span className="font-black text-sm tracking-tight">NEZA GROUP ADMIN</span>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-md hover:bg-white/10"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-[#222831] text-slate-200 shrink-0 flex flex-col justify-between`}
      >
        <div className="p-5">
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="rounded bg-white p-1">
              <img
                src="/images/brand/neza-logo.jpg"
                alt="NEZA GROUP"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight">NEZA GROUP</p>
              <p className="text-[10px] font-semibold text-white/60 uppercase">Administração</p>
            </div>
          </div>

          <nav className="mt-5 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleTabChange(item.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#126B3A] text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-5 border-t border-white/10 space-y-2">
          <Link
            href="/pt"
            className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ver Website</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setAuthed(false);
              setPassword("");
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#222831]">
                {NAV_ITEMS.find((n) => n.key === activeTab)?.label}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Gestão centralizada de conteúdos e solicitações (sincronizado com MongoDB).
              </p>
            </div>
          </div>

          {savedNotice && (
            <div className="rounded-lg border border-[#126B3A]/30 bg-[#126B3A]/10 p-3.5 text-xs font-semibold text-[#126B3A] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{savedNotice}</span>
            </div>
          )}

          {/* Dashboard Summary */}
          {activeTab === "dashboard" && summary && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Mensagens", value: summary.messages, tab: "messages" as TabKey, accent: "text-[#126B3A]" },
                  { label: "Projectos", value: summary.projects, tab: "projects" as TabKey, accent: "text-[#26368C]" },
                  { label: "Produtos & Tec.", value: summary.products, tab: "products" as TabKey, accent: "text-[#222831]" },
                  { label: "Clientes & Parceiros", value: summary.clients + summary.partners, tab: "partners" as TabKey, accent: "text-[#126B3A]" },
                  { label: "Clusters", value: summary.services, tab: "services" as TabKey, accent: "text-[#26368C]" },
                  { label: "Liderança", value: summary.leadership, tab: "leadership" as TabKey, accent: "text-[#222831]" },
                  { label: "Notícias", value: summary.news, tab: "news" as TabKey, accent: "text-[#126B3A]" },
                ].map((stat) => (
                  <button
                    key={stat.label}
                    type="button"
                    onClick={() => handleTabChange(stat.tab)}
                    className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-xs hover:border-[#126B3A] transition-all cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                    <p className={`mt-2 text-3xl font-black ${stat.accent}`}>{stat.value}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#222831]">Últimas Mensagens Recebidas</h2>
                  <button
                    type="button"
                    onClick={() => handleTabChange("messages")}
                    className="text-xs font-bold text-[#26368C] hover:underline cursor-pointer"
                  >
                    Ver todas →
                  </button>
                </div>
                {recentMessages.length === 0 ? (
                  <p className="text-sm text-slate-500">Nenhuma mensagem recebida ainda.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentMessages.map((m) => (
                      <div key={String(m.id)} className="py-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-[#222831]">{String(m.subject)}</p>
                          <p className="text-xs text-slate-500">
                            {String(m.fullName)} ({String(m.email)}) • {String(m.service)}
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(String(m.createdAt)).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Inbox */}
          {activeTab === "messages" && Array.isArray(parsedItems) && (
            <div className="space-y-3">
              {parsedItems.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                  Ainda não existem mensagens submetidas através do formulário de contacto.
                </div>
              ) : (
                parsedItems.map((m: Record<string, unknown>, idx: number) => (
                  <div
                    key={String(m.id)}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-[#26368C]">{String(m.subject)}</h3>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#F4F6F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#222831]">
                          {m.emailSent ? "Email SMTP enviado" : "Guardado no sistema"}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(String(m.createdAt)).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = parsedItems.filter((_, i) => i !== idx);
                            handleSaveData(updated);
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Eliminar mensagem"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      <strong>{String(m.fullName)}</strong> ({String(m.company || "-")}) •{" "}
                      {String(m.email)} • {String(m.phone || "-")} • {String(m.country || "-")}
                    </p>
                    <p className="text-xs font-semibold text-[#126B3A] mb-2">
                      Serviço: {String(m.service)}
                    </p>
                    <p className="text-sm text-[#222831] bg-[#F4F6F5] rounded-lg p-3">
                      {String(m.message)}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Collection Editor */}
          {activeTab !== "dashboard" && activeTab !== "messages" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <p className="text-xs text-slate-500">
                  Edite os campos abaixo e clique em &quot;Guardar Alterações&quot; para publicar.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {(activeTab === "news" || activeTab === "projects" || activeTab === "products") && (
                    <button
                      type="button"
                      onClick={addItem}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#26368C] px-3 py-2 text-xs font-bold text-[#26368C] hover:bg-[#26368C]/5 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Adicionar Novo</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setJsonMode(!jsonMode)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-[#222831] hover:bg-slate-50 cursor-pointer"
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
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#126B3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#0D502B] cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>{loading ? "A guardar..." : "Guardar Alterações"}</span>
                  </button>
                </div>
              </div>

              {!jsonMode && Array.isArray(parsedItems) ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
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

                  <div className="lg:col-span-8 space-y-4">
                    {activeItem &&
                      Object.entries(activeItem).map(([key, val]) => {
                        if (typeof val !== "string" || key === "id") return null;
                        const isLong =
                          val.length > 80 ||
                          key.includes("scope") ||
                          key.includes("desc") ||
                          key.includes("Desc") ||
                          key.includes("bio") ||
                          key.includes("summary") ||
                          key.includes("experience");
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
      </main>
    </div>
  );
}

